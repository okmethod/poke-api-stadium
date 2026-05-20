/**
 * PokeData - アプリ内部のポケモン表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

import type { PokeTypeName } from "$lib/domain/models/PokeType";
import type { GenerationData } from "$lib/domain/models/PokeGeneration";
import type { AbilityRef } from "$lib/domain/models/PokeAbility";
import type { EvolutionChainRef } from "$lib/domain/models/PokeEvolution";
import type { VarietyRef } from "$lib/domain/models/PokeForm";
import type { MoveLearnRef } from "$lib/domain/models/PokeMove";
import type { PokeStats } from "./pokeStats";
import type { PokeImageUrls } from "./pokeImages";
import type { PokeCryUrls } from "./pokeCries";
import type { FlavorText, FlavorTextPair } from "$lib/domain/models/FlavorText";

/**
 * アプリ内部のポケモン統合モデル
 *
 * PokeAPI の複数エンドポイント（/pokemon, /pokemon-species）を統合した表現。
 * PokeAPI レスポンス型（外部）とは明確に区別する。
 *
 * @remarks
 * - `pokeId`:  フォーム（すがた）を一意に識別（例: アローラライチュウ=10100）
 * - `speciesId`: 図鑑番号に対応。リージョンフォームも基本種族と同値（例: アローラライチュウ=26）
 */
export interface PokeData {
  /** フォーム固有ID（基本フォームは speciesId と一致する） */
  readonly pokeId: number;

  /** 図鑑番号 */
  readonly speciesId: number;

  /** フォーム固有名（例: "raichu-alola" / "アローラライチュウ"） */
  readonly enName: string;
  readonly jaName: string;

  /** 種族名（例: "raichu" / "ライチュウ"） */
  readonly speciesEnName: string;
  readonly speciesJaName: string;

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
  readonly abilityRefs: readonly AbilityRef[];

  /** 進化チェーン参照 */
  readonly evolutionChainRef: EvolutionChainRef;

  /** バリエーション（フォーム）参照リスト */
  readonly varietyRefs: readonly VarietyRef[];

  /** 習得可能なわざ参照リスト（詳細は /move/{id} で別途取得） */
  readonly learnableMoveRefs: readonly MoveLearnRef[];
}

// 各ドメインモデルを再エクスポート
export type { PokeStats, PokeImageUrls, PokeCryUrls, FlavorText, FlavorTextPair };
export { pokeStatJaName } from "./pokeStats";
export { resolveImageUrl } from "./pokeImages";
export { resolvedCryUrl } from "./pokeCries";
