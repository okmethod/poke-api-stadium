/**
 * PokeGraphQLAdapter - IPokeSearchRepository の GraphQL 実装
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: Port に従った具体的な技術実装（GraphQL 通信 + ドメイン変換）
 * - ALLOWED: アプリ層の Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import { parsePokeTypeName } from "$lib/domain/models/PokeData/pokeType";
import type {
  IPokeSearchRepository,
  SearchQuery,
  PokemonSearchResult,
} from "$lib/application/ports/IPokeSearchRepository";
import { fetchGraphQLSearch, buildThumbnailUrl, type GraphQLSearchResponse } from "$lib/infrastructure/api/pokeGraphQL";

function convertToSearchResults(response: GraphQLSearchResponse): PokemonSearchResult[] {
  return response.data.pokemon_v2_pokemonspecies.map((species) => {
    const jaName = species.pokemon_v2_pokemonspeciesnames[0]?.name ?? "";
    const pokeForm = species.pokemon_v2_pokemons[0];
    const types = pokeForm?.pokemon_v2_pokemontypes ?? [];
    const type1Str = types[0]?.pokemon_v2_type.name ?? "normal";
    const type2Str = types[1]?.pokemon_v2_type.name;

    return {
      id: species.id,
      jaName,
      enName: pokeForm?.name ?? "",
      type1: parsePokeTypeName(type1Str),
      type2: type2Str ? parsePokeTypeName(type2Str) : null,
      thumbnailUrl: buildThumbnailUrl(species.id),
    };
  });
}

/** PokeAPI GraphQL beta を使ったポケモン検索の具象実装 */
class PokeGraphQLAdapter implements IPokeSearchRepository {
  async searchPokemon(fetchFunction: typeof fetch, query: SearchQuery): Promise<PokemonSearchResult[]> {
    const response = await fetchGraphQLSearch(fetchFunction, query);
    return convertToSearchResults(response);
  }
}

// Singleton インスタンス
let searchRepositoryInstance: IPokeSearchRepository | null = null;

/**
 * Singleton getter
 *
 * アプリ層から利用する統一アクセスポイント。
 */
export function getPokeSearchRepository(): IPokeSearchRepository {
  if (!searchRepositoryInstance) {
    searchRepositoryInstance = new PokeGraphQLAdapter();
  }
  return searchRepositoryInstance;
}
