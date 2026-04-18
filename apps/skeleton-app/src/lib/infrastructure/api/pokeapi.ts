/**
 * pokeapi - PokeAPI への生アクセスと Zod バリデーション
 *
 * @architecture レイヤー間依存ルール - インフラ層
 * - ROLE: 外部APIとの通信と、レスポンスの型安全な検証
 * - ALLOWED: インフラ層ユーティリティへの依存
 * - FORBIDDEN: ドメイン層・アプリ層への依存（変換はAdapterに委譲）
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
  sprites: z.object({
    other: z.object({
      "official-artwork": z.object({
        front_default: z.string().nullable(),
      }),
    }),
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
  generation: NamedResourceSchema,
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

// --- API 呼び出し関数 ---

/** /pokemon/{idOrName} を取得 */
export async function fetchPokemon(fetchFunction: typeof fetch, idOrName: number | string): Promise<PokemonResponse> {
  const response = await fetchApi(fetchFunction, `${BASE_URL}/pokemon/${idOrName}`, {
    method: "GET",
  });
  return PokemonResponseSchema.parse(await response.json());
}

/** /pokemon-species/{idOrName} を取得 */
export async function fetchPokemonSpecies(
  fetchFunction: typeof fetch,
  idOrName: number | string,
): Promise<PokemonSpeciesResponse> {
  const response = await fetchApi(fetchFunction, `${BASE_URL}/pokemon-species/${idOrName}`, {
    method: "GET",
  });
  return PokemonSpeciesResponseSchema.parse(await response.json());
}

/** /type/{idOrName} を取得 */
export async function fetchType(fetchFunction: typeof fetch, idOrName: number | string): Promise<TypeResponse> {
  const response = await fetchApi(fetchFunction, `${BASE_URL}/type/${idOrName}`, {
    method: "GET",
  });
  return TypeResponseSchema.parse(await response.json());
}
