/**
 * PokeEvolution - アプリ内部の進化チェーン表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

import type { EvolutionCondition } from "./condition";

/** 進化チェーン参照（詳細は /evolution-chain/{id} で別途取得） */
export interface EvolutionChainRef {
  readonly url: string;
}

/** 進化ツリーの1ノード（1種族） */
export interface EvolutionNode {
  readonly speciesId: number;
  /** PokeAPI 英語名 */
  readonly speciesName: string;
  readonly jaName: string;
  readonly imageUrl: string;
  readonly evolvesTo: readonly EvolutionStep[];
}

/** 進化ステップ（親→子の条件とノード） */
export interface EvolutionStep {
  readonly condition: EvolutionCondition;
  readonly next: EvolutionNode;
}

/** 進化チェーン全体 */
export interface EvolutionChain {
  readonly id: number;
  readonly root: EvolutionNode;
}

export type { EvolutionTrigger, EvolutionCondition } from "./condition";
export { triggerJaLabel, parseEvolutionTrigger, conditionDescription } from "./condition";
