/**
 * pokeGraphQL - PokeAPI GraphQL v1beta へのアクセスと Zod バリデーション
 *
 * @remarks
 * 検索条件が未指定の変数には「全件マッチ」のデフォルト値を渡すことで、
 * 単一の静的クエリで全フィルターパターンに対応する。
 * - nameFilter: "%%" → 全件マッチ
 * - typeNames: 全18タイプ → 全件マッチ
 * - generationIds: [1..9] → 全件マッチ
 *
 * @architecture レイヤー間依存ルール - インフラ層
 * - ROLE: 外部 GraphQL API との通信とレスポンスの型安全な検証
 * - ALLOWED: インフラ層ユーティリティ、ドメイン層定数への依存
 * - FORBIDDEN: ドメイン変換ロジック（Adapter に委譲）
 */

import { z } from "zod";
import { ALL_TYPE_NAMES } from "$lib/domain/models/PokeData/pokeType";
import { ALL_GENERATION_NUMBERS } from "$lib/domain/models/PokeData/generation";
import type { SearchQuery } from "$lib/application/ports/IPokeSearchRepository";

const GRAPHQL_ENDPOINT = "https://beta.pokeapi.co/graphql/v1beta";

const SPRITE_BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

// ポケモン種族名（日本語）・タイプを取得するクエリ。
// スプライトは JSON フィールドのパースを避けるため ID から URL を直接構築する。
const SEARCH_QUERY = `
  query SearchPokemon(
    $nameFilter: String!
    $typeNames: [String!]!
    $generationIds: [Int!]!
    $limit: Int!
    $offset: Int!
  ) {
    pokemon_v2_pokemonspecies(
      where: {
        _and: [
          {
            pokemon_v2_pokemonspeciesnames: {
              pokemon_v2_language: { name: { _eq: "ja" } }
              name: { _ilike: $nameFilter }
            }
          }
          {
            pokemon_v2_pokemons: {
              is_default: { _eq: true }
              pokemon_v2_pokemontypes: {
                pokemon_v2_type: { name: { _in: $typeNames } }
              }
            }
          }
          { generation_id: { _in: $generationIds } }
        ]
      }
      order_by: { id: asc }
      limit: $limit
      offset: $offset
    ) {
      id
      pokemon_v2_pokemonspeciesnames(
        where: { pokemon_v2_language: { name: { _eq: "ja" } } }
      ) {
        name
      }
      pokemon_v2_pokemons(limit: 1, where: { is_default: { _eq: true } }) {
        name
        pokemon_v2_pokemontypes(order_by: { slot: asc }) {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

// --- Zod スキーマ ---

const GraphQLSearchResponseSchema = z.object({
  data: z.object({
    pokemon_v2_pokemonspecies: z.array(
      z.object({
        id: z.number(),
        pokemon_v2_pokemonspeciesnames: z.array(z.object({ name: z.string() })),
        pokemon_v2_pokemons: z.array(
          z.object({
            name: z.string(),
            pokemon_v2_pokemontypes: z.array(
              z.object({
                pokemon_v2_type: z.object({ name: z.string() }),
              }),
            ),
          }),
        ),
      }),
    ),
  }),
});

export type GraphQLSearchResponse = z.infer<typeof GraphQLSearchResponseSchema>;

// --- API 呼び出し関数 ---

/** PokeAPI GraphQL beta に検索クエリを送信し、生レスポンスを返す */
export async function fetchGraphQLSearch(
  fetchFunction: typeof fetch,
  query: SearchQuery,
): Promise<GraphQLSearchResponse> {
  const variables = {
    nameFilter: query.nameQuery.trim() ? `%${query.nameQuery.trim()}%` : "%%",
    typeNames: query.types.length > 0 ? [...query.types] : [...ALL_TYPE_NAMES],
    generationIds: query.generationIds.length > 0 ? [...query.generationIds] : [...ALL_GENERATION_NUMBERS],
    limit: query.limit,
    offset: query.offset,
  };

  const response = await fetchFunction(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: SEARCH_QUERY, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
  }

  const json: unknown = await response.json();
  return GraphQLSearchResponseSchema.parse(json);
}

/** GraphQL レスポンスから種族 ID に対応するスプライト URL を構築する */
export function buildThumbnailUrl(speciesId: number): string {
  return `${SPRITE_BASE_URL}/${speciesId}.png`;
}
