/**
 * Move - アプリ内部のわざ表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

import type { PokeTypeName } from "$lib/domain/models/PokeData/pokeType";

/** わざ分類 */
export type MoveCategory = "physical" | "special" | "status";

export const MOVE_CATEGORY_JA: Record<MoveCategory, string> = {
  physical: "物理",
  special: "特殊",
  status: "変化",
};

/** わざ習得方法 */
export type MoveLearnMethodName = "level-up" | "machine" | "tutor" | "egg";

export const MOVE_LEARN_METHOD_JA: Record<MoveLearnMethodName, string> = {
  "level-up": "レベルアップ",
  machine: "わざマシン",
  tutor: "技教え",
  egg: "タマゴわざ",
};

/**
 * PokeData が保持する習得わざ参照
 *
 * 詳細（日本語名・タイプ・威力等）は /move/{id} で別途取得する。
 */
export interface MoveLearnDetail {
  readonly enName: string;
  readonly url: string;
  /** 習得レベル（レベルアップ以外は 0） */
  readonly levelLearnedAt: number;
  readonly learnMethod: MoveLearnMethodName;
}

/**
 * わざ詳細モデル（遅延ロード対象）
 *
 * PokeAPI /move/{id} から取得し、Adapter で変換する。
 */
export interface PokeMove {
  readonly id: number;
  readonly enName: string;
  readonly jaName: string;
  readonly type: PokeTypeName;
  readonly category: MoveCategory;
  readonly power: number | null;
  readonly accuracy: number | null;
  readonly pp: number;
  readonly flavorText: string | null;
}
