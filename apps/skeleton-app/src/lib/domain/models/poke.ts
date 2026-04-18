/**
 * PokeData - アプリ内部のポケモン表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

import type { Stats } from "./stats";
import type { TypeName } from "./type";

/**
 * アプリ内部のポケモン統合モデル
 *
 * PokeAPI の複数エンドポイント（/pokemon, /pokemon-species）を統合した表現。
 * PokeAPI レスポンス型（外部）とは明確に区別する。
 */
export interface PokeData {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
  /** 公式アートワーク画像URL */
  readonly imageUrl: string;
  readonly type1: TypeName;
  /** 単タイプの場合は null */
  readonly type2: TypeName | null;
  readonly stats: Stats;
  /** 初登場世代（第 1〜9 世代） */
  readonly generation: number;
}
