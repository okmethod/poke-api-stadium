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
  moves: z.array(
    z.object({
      move: NamedResourceSchema,
      version_group_details: z.array(
        z.object({
          level_learned_at: z.number(),
          move_learn_method: NamedResourceSchema,
          order: z.number().nullable(),
          version_group: NamedResourceSchema,
        }),
      ),
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
  species: NamedResourceSchema,
});

export const PokemonSpeciesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
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

export const ItemResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
  sprites: z.object({
    default: z.string().nullable(),
  }),
  category: NamedResourceSchema,
  flavor_text_entries: z.array(
    z.object({
      text: z.string(),
      language: NamedResourceSchema,
      version_group: NamedResourceSchema,
    }),
  ),
});

export const ItemPocketResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  categories: z.array(NamedResourceSchema),
  names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
});

export const ItemCategoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
  items: z.array(NamedResourceSchema),
  pocket: NamedResourceSchema,
});

export const PokemonFormResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  form_name: z.string(),
  is_default: z.boolean(),
  is_battle_only: z.boolean(),
  is_mega: z.boolean(),
  form_names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: NamedResourceSchema,
    }),
  ),
  sprites: z.looseObject({
    front_default: z.string().nullish(),
    back_default: z.string().nullish(),
  }),
  pokemon: NamedResourceSchema,
});

export const AbilityResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: NamedResourceSchema,
      version_group: NamedResourceSchema,
    }),
  ),
});

export const MoveResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  names: z.array(
    z.object({
      language: NamedResourceSchema,
      name: z.string(),
    }),
  ),
  type: NamedResourceSchema,
  damage_class: NamedResourceSchema,
  power: z.number().nullable(),
  accuracy: z.number().nullable(),
  pp: z.number(),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: NamedResourceSchema,
      version_group: NamedResourceSchema,
    }),
  ),
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
  moves: z.array(NamedResourceSchema),
});

// --- 推論型エクスポート ---

export type PokemonResponse = z.infer<typeof PokemonResponseSchema>;
export type PokemonSpeciesResponse = z.infer<typeof PokemonSpeciesResponseSchema>;
export type PokemonFormResponse = z.infer<typeof PokemonFormResponseSchema>;
export type ItemResponse = z.infer<typeof ItemResponseSchema>;
export type ItemPocketResponse = z.infer<typeof ItemPocketResponseSchema>;
export type ItemCategoryResponse = z.infer<typeof ItemCategoryResponseSchema>;
export type AbilityResponse = z.infer<typeof AbilityResponseSchema>;
export type MoveResponse = z.infer<typeof MoveResponseSchema>;
export type TypeResponse = z.infer<typeof TypeResponseSchema>;
export type EvolutionChainResponse = z.infer<typeof EvolutionChainResponseSchema>;

// --- メモリキャッシュ ---

/** ライフサイクル: ページリロードまで（メモリ上のみ）。キー: リクエスト URL */
const pokemonCache = new Map<string, PokemonResponse>();
const speciesCache = new Map<string, PokemonSpeciesResponse>();
const pokemonFormCache = new Map<string, PokemonFormResponse>();
const itemCache = new Map<string, ItemResponse>();
const itemCategoryCache = new Map<string, ItemCategoryResponse>();
const itemPocketCache = new Map<string, ItemPocketResponse>();
const abilityCache = new Map<string, AbilityResponse>();
const moveCache = new Map<string, MoveResponse>();
const typeCache = new Map<string, TypeResponse>();
const evolutionChainCache = new Map<string, EvolutionChainResponse>();

/** キャッシュをすべてクリアする（テスト用） */
export function clearCache(): void {
  pokemonCache.clear();
  speciesCache.clear();
  pokemonFormCache.clear();
  itemCache.clear();
  itemCategoryCache.clear();
  itemPocketCache.clear();
  abilityCache.clear();
  moveCache.clear();
  typeCache.clear();
  evolutionChainCache.clear();
}

// --- 汎用フェッチヘルパー ---

async function fetchWithCache<T>(
  cache: Map<string, T>,
  fetchFn: typeof fetch,
  url: string,
  schema: z.ZodType<T>,
): Promise<T> {
  const cached = cache.get(url);
  if (cached) return cached;
  const data = schema.parse(await (await fetchApi(fetchFn, url, { method: "GET" })).json());
  cache.set(url, data);
  return data;
}

// --- API 呼び出し関数 ---

/** /pokemon/{idOrName} を取得 */
export function fetchPokemon(fetchFn: typeof fetch, idOrName: number | string): Promise<PokemonResponse> {
  return fetchWithCache(pokemonCache, fetchFn, `${BASE_URL}/pokemon/${idOrName}`, PokemonResponseSchema);
}

/** /pokemon-species/{idOrName} を取得 */
export function fetchPokemonSpecies(fetchFn: typeof fetch, idOrName: number | string): Promise<PokemonSpeciesResponse> {
  return fetchWithCache(speciesCache, fetchFn, `${BASE_URL}/pokemon-species/${idOrName}`, PokemonSpeciesResponseSchema);
}

/** /pokemon-species を URL で直接取得（リージョンフォームなど species ID ≠ pokemon ID の場合に使用） */
export function fetchPokemonSpeciesByUrl(fetchFn: typeof fetch, url: string): Promise<PokemonSpeciesResponse> {
  return fetchWithCache(speciesCache, fetchFn, url, PokemonSpeciesResponseSchema);
}

/** /pokemon-form/{name} を取得 */
export function fetchPokemonForm(fetchFn: typeof fetch, name: string): Promise<PokemonFormResponse> {
  return fetchWithCache(pokemonFormCache, fetchFn, `${BASE_URL}/pokemon-form/${name}`, PokemonFormResponseSchema);
}

/** /ability/{idOrName} を取得 */
export function fetchAbility(fetchFn: typeof fetch, idOrName: number | string): Promise<AbilityResponse> {
  return fetchWithCache(abilityCache, fetchFn, `${BASE_URL}/ability/${idOrName}`, AbilityResponseSchema);
}

/** /move/{idOrName} を取得 */
export function fetchMove(fetchFn: typeof fetch, idOrName: number | string): Promise<MoveResponse> {
  return fetchWithCache(moveCache, fetchFn, `${BASE_URL}/move/${idOrName}`, MoveResponseSchema);
}

/** /item/{idOrName} を取得 */
export function fetchItem(fetchFn: typeof fetch, idOrName: number | string): Promise<ItemResponse> {
  return fetchWithCache(itemCache, fetchFn, `${BASE_URL}/item/${idOrName}`, ItemResponseSchema);
}

/** /item-pocket/{name} を取得 */
export function fetchItemPocket(fetchFn: typeof fetch, name: string): Promise<ItemPocketResponse> {
  return fetchWithCache(itemPocketCache, fetchFn, `${BASE_URL}/item-pocket/${name}`, ItemPocketResponseSchema);
}

/** /item-category/{idOrName} を取得 */
export function fetchItemCategory(fetchFn: typeof fetch, idOrName: number | string): Promise<ItemCategoryResponse> {
  return fetchWithCache(
    itemCategoryCache,
    fetchFn,
    `${BASE_URL}/item-category/${idOrName}`,
    ItemCategoryResponseSchema,
  );
}

/** /type/{idOrName} を取得 */
export function fetchType(fetchFn: typeof fetch, idOrName: number | string): Promise<TypeResponse> {
  return fetchWithCache(typeCache, fetchFn, `${BASE_URL}/type/${idOrName}`, TypeResponseSchema);
}

/** /evolution-chain/{id} または絶対 URL を取得 */
export function fetchEvolutionChain(fetchFn: typeof fetch, idOrUrl: number | string): Promise<EvolutionChainResponse> {
  const url = typeof idOrUrl === "number" ? `${BASE_URL}/evolution-chain/${idOrUrl}` : idOrUrl;
  return fetchWithCache(evolutionChainCache, fetchFn, url, EvolutionChainResponseSchema);
}
