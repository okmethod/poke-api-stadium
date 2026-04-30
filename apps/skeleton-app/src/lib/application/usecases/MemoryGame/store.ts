/**
 * ポケモン神経衰弱のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

/** グリッド上の1枚のカード */
export interface MemoryCard {
  readonly cardId: number;
  readonly pairId: number;
  readonly pokeData: PokeData;
  readonly isFlipped: boolean;
  readonly isMatched: boolean;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const cardsStore = writable<MemoryCard[]>([]);
const firstSelectedIndexStore = writable<number | null>(null);
const isCheckingStore = writable<boolean>(false);
const matchedPairCountStore = writable<number>(0);
const moveCountStore = writable<number>(0);
const totalPairCountStore = writable<number>(0);
const isGameClearStore = writable<boolean>(false);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** カード一覧（読み取り専用） */
export const cards = readonly(cardsStore);

/** 1枚目に選択したカードのインデックス（null = 未選択）（読み取り専用） */
export const firstSelectedIndex = readonly(firstSelectedIndexStore);

/** ペア判定中かどうか（連打防止フラグ）（読み取り専用） */
export const isChecking = readonly(isCheckingStore);

/** マッチしたペア数（読み取り専用） */
export const matchedPairCount = readonly(matchedPairCountStore);

/** 手数（読み取り専用） */
export const moveCount = readonly(moveCountStore);

/** 総ペア数（読み取り専用） */
export const totalPairCount = readonly(totalPairCountStore);

/** ゲームクリア済みかどうか（読み取り専用） */
export const isGameClear = readonly(isGameClearStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    cardsStore.set([]);
    firstSelectedIndexStore.set(null);
    isCheckingStore.set(false);
    matchedPairCountStore.set(0);
    moveCountStore.set(0);
    totalPairCountStore.set(0);
    isGameClearStore.set(false);
  },
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setCards: (v: MemoryCard[]) => cardsStore.set(v),
  updateCard: (index: number, updates: { isFlipped?: boolean; isMatched?: boolean }) =>
    cardsStore.update((all) => all.map((c, i) => (i === index ? { ...c, ...updates } : c))),
  setFirstSelectedIndex: (v: number | null) => firstSelectedIndexStore.set(v),
  setIsChecking: (v: boolean) => isCheckingStore.set(v),
  incrementMatchedPairCount: () => matchedPairCountStore.update((n) => n + 1),
  incrementMoveCount: () => moveCountStore.update((n) => n + 1),
  setTotalPairCount: (v: number) => totalPairCountStore.set(v),
  setIsGameClear: (v: boolean) => isGameClearStore.set(v),
};
