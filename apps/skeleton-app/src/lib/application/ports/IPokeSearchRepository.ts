/**
 * IPokeSearchRepository - ポケモン検索専用 Port
 *
 * @remarks
 * - GraphQL 実装（PokeGraphQLAdapter）が具象クラスとして実装する
 * - テスト時はモック実装への差し替えが可能
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: インフラ層が実装すべき抽象インターフェース（契約）の定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { PokeTypeName } from "$lib/domain/models/PokeData/pokeType";
import type { GenerationNumber } from "$lib/domain/models/PokeData/generation";

/** ポケモン検索条件 */
export interface SearchQuery {
  /** 日本語名の部分一致フィルター（空文字列は全件マッチ） */
  readonly nameQuery: string;
  /** タイプフィルター（空配列は全タイプ対象） */
  readonly types: readonly PokeTypeName[];
  /** 世代フィルター（空配列は全世代対象） */
  readonly generationIds: readonly GenerationNumber[];
  /** 最大取得件数 */
  readonly limit: number;
  /** オフセット（ページング用） */
  readonly offset: number;
}

/** 検索結果の軽量モデル（詳細表示は PokeData を別途取得する） */
export interface PokemonSearchResult {
  readonly id: number;
  readonly jaName: string;
  readonly enName: string;
  readonly type1: PokeTypeName;
  readonly type2: PokeTypeName | null;
  /** ピクセルスプライト画像 URL */
  readonly thumbnailUrl: string;
}

/** ポケモン検索の抽象インターフェース */
export interface IPokeSearchRepository {
  /** 検索条件に合致するポケモンの一覧を返す */
  searchPokemon(fetchFunction: typeof fetch, query: SearchQuery): Promise<PokemonSearchResult[]>;
}
