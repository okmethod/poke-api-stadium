/**
 * 進化トリガーごとの進化条件
 */

import type { PokeItem } from "$lib/domain/models/PokeItem";

// SSoT: TRIGGER_JA のキーから EvolutionTrigger を派生させる
const TRIGGER_JA = {
  "level-up": "レベルアップ",
  trade: "通信交換",
  "use-item": "どうぐ使用",
  "use-move": "技を使う",
  "agile-style-move": "ハヤワザを使う",
  "strong-style-move": "チカラワザを使う",
  shed: "脱皮", // ツチニン -> テッカニン
  spin: "クルクル回る", // マホミル -> マホイップ
  "tower-of-darkness": "あくの塔", // ダクマ -> ウーラオス（いちげきのかた）
  "tower-of-waters": "みずの塔", // ダクマ -> ウーラオス（れんげきのかた）
  "three-critical-hits": "急所3回", // ガラルカモネギ -> ネギガナイト
  "take-damage": "ダメージ", // ガラルデスマス -> デスバーン
  "recoil-damage": "反動ダメージ", // バスラオ -> ダイトウ
  "three-defeated-bisharp": "キリキザン3体撃破", // キリキザン -> ドドゲザン
  "gimmmighoul-coins": "コレクレーのコイン", // コレクレー -> サーフゴー
  other: "その他",
} as const;

export type EvolutionTrigger = keyof typeof TRIGGER_JA;

/** 進化トリガーに対応する日本語ラベルを返す */
export function triggerJaLabel(trigger: EvolutionTrigger): string {
  return TRIGGER_JA[trigger];
}

/**
 * 文字列を EvolutionTrigger に変換する（未知の値は "other" にフォールバック）
 *
 * `as` アサーションの代替として、バウンダリで一度だけ検証するために使う。
 */
export function parseEvolutionTrigger(name: string): EvolutionTrigger {
  return name in TRIGGER_JA ? (name as EvolutionTrigger) : "other";
}

interface LevelUpCondition {
  readonly trigger: "level-up";
  readonly minLevel: number | null;
  readonly minHappiness: number | null;
  /** "" | "day" | "night" */
  readonly timeOfDay: string;
  readonly knownMove: string | null;
}

interface UseItemCondition {
  readonly trigger: "use-item";
  /** アイテムマップ未登録の場合 null */
  readonly useItem: PokeItem | null;
}

interface TradeCondition {
  readonly trigger: "trade";
  /** 持ちものなし交換の場合 null */
  readonly heldItem: PokeItem | null;
}

type SimpleConditionTrigger = Exclude<EvolutionTrigger, "level-up" | "use-item" | "trade">;

interface SimpleCondition {
  readonly trigger: SimpleConditionTrigger;
}

/** 進化の条件（判別共用体） */
export type EvolutionCondition = LevelUpCondition | UseItemCondition | TradeCondition | SimpleCondition;

/** 進化条件を日本語の短いラベルに変換する */
export const conditionDescription = (condition: EvolutionCondition): string => {
  switch (condition.trigger) {
    case "level-up":
      if (condition.minLevel) return `Lv.${condition.minLevel}`;
      if (condition.minHappiness) {
        if (condition.timeOfDay === "day") return "なつき（昼）";
        if (condition.timeOfDay === "night") return "なつき（夜）";
        return "なつき";
      }
      if (condition.knownMove) return `${condition.knownMove} 習得`;
      if (condition.timeOfDay === "day") return "LvUp（昼）";
      if (condition.timeOfDay === "night") return "LvUp（夜）";
      return "LvUp";
    case "use-item":
      return condition.useItem?.jaName ?? triggerJaLabel("use-item");
    case "trade":
      return condition.heldItem ? `通信交換（${condition.heldItem.jaName}）` : triggerJaLabel("trade");
    default:
      return triggerJaLabel(condition.trigger);
  }
};
