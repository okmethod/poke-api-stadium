/**
 * EvolutionChain - アプリ内部の進化チェーン表現
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** 進化の条件 */
export interface EvolutionCondition {
  readonly trigger: string;
  readonly minLevel: number | null;
  /** use-item の場合のアイテム名 */
  readonly item: string | null; // TODO: 日本語名にする
  readonly minHappiness: number | null;
  /** "" | "day" | "night" */
  readonly timeOfDay: string;
  /** trade 時の持ちもの名 */
  readonly heldItem: string | null;
  readonly knownMove: string | null;
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

/** 進化条件を日本語の短いラベルに変換する */
export function describeCondition(condition: EvolutionCondition): string {
  switch (condition.trigger) {
    case "level-up":
      if (condition.minLevel) return `Lv.${condition.minLevel}`;
      if (condition.minHappiness) return "なつき度";
      if (condition.knownMove) return `${condition.knownMove}を覚える`;
      if (condition.timeOfDay === "day") return "昼レベルアップ";
      if (condition.timeOfDay === "night") return "夜レベルアップ";
      return "レベルアップ";
    case "use-item":
      return condition.item ?? "どうぐ使用";
    case "trade":
      return condition.heldItem ? `こうかん（${condition.heldItem}）` : "こうかん";
    default:
      return condition.trigger;
  }
}
