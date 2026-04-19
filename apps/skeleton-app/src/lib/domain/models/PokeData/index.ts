/**
 * PokeData - アプリ内部のポケモン表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

import type { PokeTypeName, PokeTypeData } from "./pokeType";
import { pokeTypeColor, pokeTypeJaName } from "./pokeType";
import type { PokeStats } from "./pokeStats";
import type { GenerationData } from "./generation";
import { generationData } from "./generation";

// 各ドメインモデルを再エクスポート
export type { PokeTypeName, PokeTypeData, PokeStats, GenerationData };
export { pokeTypeColor, pokeTypeJaName, generationData };

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

  /** たかさ（m） */
  readonly height: number;
  /** おもさ（kg） */
  readonly weight: number;

  /** タイプ1 */
  readonly type1: PokeTypeName;
  /** タイプ2（単タイプの場合は null） */
  readonly type2: PokeTypeName | null;

  /** ステータス */
  readonly stats: PokeStats;

  /** 公式アートワーク画像URL */
  readonly imageUrl: string;

  /** 鳴き声音声URL（存在しない場合は null） */
  readonly cryUrl: string | null;

  /** 初登場世代（不明な場合は null） */
  readonly generationData: GenerationData | null;
}
