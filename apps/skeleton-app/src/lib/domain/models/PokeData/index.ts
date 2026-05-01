/**
 * PokeData - アプリ内部のポケモン表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

import type { PokeTypeName, PokeTypeData } from "./pokeType";
import { ALL_TYPE_NAMES, pokeTypeColor, pokeTypeJaName, parsePokeTypeName } from "./pokeType";
import type { PokeStats } from "./pokeStats";
import { pokeStatJaName } from "./pokeStats";
import type { GenerationData } from "./generation";
import { generationData } from "./generation";
import type { PokeImageUrls } from "./pokeImages";
import type { PokeCryUrls } from "./pokeCries";
import { resolvedCryUrl } from "./pokeCries";
import type { FlavorText } from "./flavorText";
import type { AbilityRef, EvolutionChainRef, VarietyRef } from "./pokeRefs";
import type { VersionName } from "./version";
import { versionJaLabel } from "./version";
import type { MoveLearnDetail } from "$lib/domain/models/Move";

// 各ドメインモデルを再エクスポート
export type { PokeTypeName, PokeTypeData, PokeStats, GenerationData, PokeImageUrls, PokeCryUrls };
export type { AbilityRef, EvolutionChainRef, VarietyRef, FlavorText };
export type { VersionName };
export type { MoveLearnDetail };
export {
  ALL_TYPE_NAMES,
  pokeTypeColor,
  pokeTypeJaName,
  parsePokeTypeName,
  generationData,
  resolvedCryUrl,
  pokeStatJaName,
  versionJaLabel,
};

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

  /** 画像URLコレクション */
  readonly imageUrls: PokeImageUrls;

  /** 鳴き声URLコレクション */
  readonly cryUrls: PokeCryUrls;

  /** 初登場世代（不明な場合は null） */
  readonly generationData: GenerationData | null;

  /** 分類（例: "ねずみポケモン"） */
  readonly genus: string;

  /** 伝説のポケモンかどうか */
  readonly isLegendary: boolean;

  /** 幻のポケモンかどうか */
  readonly isMythical: boolean;

  /** 図鑑テキスト（日本語・バージョン別・重複除去済み） */
  readonly flavorTexts: readonly FlavorText[];

  /** 特性参照リスト（詳細は /ability/{id} で別途取得） */
  readonly abilities: readonly AbilityRef[];

  /** 進化チェーン参照 */
  readonly evolutionChainRef: EvolutionChainRef;

  /** バリエーション（フォーム）参照リスト */
  readonly varieties: readonly VarietyRef[];

  /** 習得可能なわざ参照リスト（詳細は /move/{id} で別途取得） */
  readonly moveLearnDetails: readonly MoveLearnDetail[];
}
