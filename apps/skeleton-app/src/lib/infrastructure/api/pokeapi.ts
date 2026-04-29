/**
 * pokeapi - PokeAPI への生アクセスと Zod バリデーション
 *
 * @architecture レイヤー間依存ルール - インフラ層
 * - ROLE: 外部APIとの通信と、レスポンスの型安全な検証
 * - ALLOWED: インフラ層ユーティリティへの依存
 * - FORBIDDEN: ドメイン層・アプリ層への依存（変換はAdapterに委譲）
 *
 * @cache エンドポイントごとにモジュールスコープの Map でメモリキャッシュを保持する。
 * ライフサイクルはページリロードまで（SSR ではサーバー起動中は永続）。
 * 同一 idOrName への重複 API コールを抑制し、外部 API への通信量を最小化する。
 */

import { z } from "zod";
import { fetchApi } from "$lib/infrastructure/utils/request";

const BASE_URL = "https://pokeapi.co/api/v2";

// --- Zod スキーマ ---

const NamedResourceSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const PokemonResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  base_experience: z.number().nullable(),
  abilities: z.array(
    z.object({
      ability: NamedResourceSchema,
      is_hidden: z.boolean(),
      slot: z.number(),
    }),
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: NamedResourceSchema,
    }),
  ),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      stat: NamedResourceSchema,
    }),
  ),
  sprites: z.looseObject({
    front_default: z.string().nullish(),
    front_shiny: z.string().nullish(),
    back_default: z.string().nullish(),
    back_shiny: z.string().nullish(),
    other: z.looseObject({
      "official-artwork": z.looseObject({
        front_default: z.string().nullable(),
        front_shiny: z.string().nullish(),
        // PokeAPI は official-artwork に back_default を含まない場合がある
        back_default: z.string().nullish(),
      }),
      // showdown スプライトが存在しない Pokemon もある
      showdown: z
        .looseObject({
          front_default: z.string().nullish(),
          back_default: z.string().nullish(),
        })
        .optional(),
    }),
  }),
  cries: z.object({
    latest: z.string().nullable(),
    // 新世代 Pokemon は legacy cry がない場合がある
    legacy: z.string().nullish(),
  }),
});

export const PokemonSpeciesResponseSchema = z.object({
  id: z.number(),
  names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
  genera: z.array(
    z.object({
      genus: z.string(),
      language: NamedResourceSchema,
    }),
  ),
  gender_rate: z.number(),
  capture_rate: z.number(),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
  is_baby: z.boolean(),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: NamedResourceSchema,
      version: NamedResourceSchema,
    }),
  ),
  evolution_chain: z.object({ url: z.string() }),
  varieties: z.array(
    z.object({
      is_default: z.boolean(),
      pokemon: NamedResourceSchema,
    }),
  ),
  generation: NamedResourceSchema,
});

// --- Evolution Chain スキーマ（再帰構造） ---

const EvolutionDetailSchema = z.object({
  trigger: NamedResourceSchema,
  min_level: z.number().nullable(),
  item: NamedResourceSchema.nullable(),
  min_happiness: z.number().nullable(),
  time_of_day: z.string(),
  held_item: NamedResourceSchema.nullable(),
  known_move: NamedResourceSchema.nullable(),
});

type EvolutionChainNodeType = {
  species: { name: string; url: string };
  evolution_details: z.infer<typeof EvolutionDetailSchema>[];
  evolves_to: EvolutionChainNodeType[];
};

const EvolutionChainNodeSchema: z.ZodType<EvolutionChainNodeType> = z.lazy(() =>
  z.object({
    species: NamedResourceSchema,
    evolution_details: z.array(EvolutionDetailSchema),
    evolves_to: z.array(EvolutionChainNodeSchema),
  }),
);

export const EvolutionChainResponseSchema = z.object({
  id: z.number(),
  chain: EvolutionChainNodeSchema,
});

export const TypeResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
  damage_relations: z.object({
    no_damage_to: z.array(NamedResourceSchema),
    half_damage_to: z.array(NamedResourceSchema),
    double_damage_to: z.array(NamedResourceSchema),
    no_damage_from: z.array(NamedResourceSchema),
    half_damage_from: z.array(NamedResourceSchema),
    double_damage_from: z.array(NamedResourceSchema),
  }),
});

// --- 推論型エクスポート ---

export type PokemonResponse = z.infer<typeof PokemonResponseSchema>;
export type PokemonSpeciesResponse = z.infer<typeof PokemonSpeciesResponseSchema>;
export type TypeResponse = z.infer<typeof TypeResponseSchema>;
export type EvolutionChainResponse = z.infer<typeof EvolutionChainResponseSchema>;

// --- メモリキャッシュ ---

/**
 * エンドポイント別レスポンスのメモリキャッシュ
 *
 * ライフサイクル: ページリロードまで（メモリ上のみ）
 * キー: idOrName を文字列化したもの（数値・文字列の両方を統一）
 */
const pokemonCache = new Map<string, PokemonResponse>();
const speciesCache = new Map<string, PokemonSpeciesResponse>();
const typeCache = new Map<string, TypeResponse>();
const evolutionChainCache = new Map<string, EvolutionChainResponse>();

/** キャッシュをすべてクリアする（テスト用） */
export function clearCache(): void {
  pokemonCache.clear();
  speciesCache.clear();
  typeCache.clear();
  evolutionChainCache.clear();
}

// --- API 呼び出し関数 ---

/** /pokemon/{idOrName} を取得 */
export async function fetchPokemon(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokemonResponse> {
  const key = String(idOrName);
  const cached = pokemonCache.get(key);
  if (cached) return cached;

  const response = await fetchApi(fetchFunction, `${BASE_URL}/pokemon/${idOrName}`, {
    method: "GET",
  });
  const data = PokemonResponseSchema.parse(await response.json());
  pokemonCache.set(key, data);
  return data;
}

/** /pokemon-species/{idOrName} を取得 */
export async function fetchPokemonSpecies(
  fetchFunction: typeof fetch,
  idOrName: number | string,
): Promise<PokemonSpeciesResponse> {
  const key = String(idOrName);
  const cached = speciesCache.get(key);
  if (cached) return cached;

  const response = await fetchApi(fetchFunction, `${BASE_URL}/pokemon-species/${idOrName}`, {
    method: "GET",
  });
  const data = PokemonSpeciesResponseSchema.parse(await response.json());
  speciesCache.set(key, data);
  return data;
}

/** /type/{idOrName} を取得 */
export async function fetchType(fetchFunction: typeof fetch, idOrName: number | string): Promise<TypeResponse> {
  const key = String(idOrName);
  const cached = typeCache.get(key);
  if (cached) return cached;

  const response = await fetchApi(fetchFunction, `${BASE_URL}/type/${idOrName}`, {
    method: "GET",
  });
  const data = TypeResponseSchema.parse(await response.json());
  typeCache.set(key, data);
  return data;
}

/** /evolution-chain/{id} または絶対 URL を取得 */
export async function fetchEvolutionChain(
  fetchFunction: typeof fetch,
  idOrUrl: number | string,
): Promise<EvolutionChainResponse> {
  const key = String(idOrUrl);
  const cached = evolutionChainCache.get(key);
  if (cached) return cached;

  const url = typeof idOrUrl === "number" ? `${BASE_URL}/evolution-chain/${idOrUrl}` : idOrUrl;
  const response = await fetchApi(fetchFunction, url, { method: "GET" });
  const data = EvolutionChainResponseSchema.parse(await response.json());
  evolutionChainCache.set(key, data);
  return data;
}
