/**
 * TypingGame のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly, derived } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

export type GamePhase = "idle" | "playing" | "result";

export const TOTAL_ROUNDS = 10;

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const phaseStore = writable<GamePhase>("idle");
const pokeListStore = writable<PokeData[]>([]);
const currentIndexStore = writable<number>(0);
const targetRomajiStore = writable<string>("");
const typedCountStore = writable<number>(0);
const totalCorrectCharsStore = writable<number>(0);
const totalErrorsStore = writable<number>(0);
const gameStartMsStore = writable<number | null>(null);
const elapsedMsStore = writable<number>(0);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** ゲームフェーズ（読み取り専用） */
export const phase = readonly(phaseStore);

/** ポケモンリスト（読み取り専用） */
export const pokeList = readonly(pokeListStore);

/** 現在のラウンドインデックス（読み取り専用） */
export const currentIndex = readonly(currentIndexStore);

/** 現在のポケモン（派生） */
export const currentPokeData = derived([pokeListStore, currentIndexStore], ([$list, $idx]) => $list[$idx] ?? null);

/** タイピング対象のローマ字（読み取り専用） */
export const targetRomaji = readonly(targetRomajiStore);

/** 正しく入力済みの文字数（読み取り専用） */
export const typedCount = readonly(typedCountStore);

/** 合計正打数（読み取り専用） */
export const totalCorrectChars = readonly(totalCorrectCharsStore);

/** 合計誤打数（読み取り専用） */
export const totalErrors = readonly(totalErrorsStore);

/** ゲーム開始時刻 ms（読み取り専用） */
export const gameStartMs = readonly(gameStartMsStore);

/** 合計経過時間 ms（ゲーム終了後に確定、読み取り専用） */
export const elapsedMs = readonly(elapsedMsStore);

/** 入力精度 %（小数第1位まで） */
export const accuracy = derived([totalCorrectCharsStore, totalErrorsStore], ([$correct, $errors]) => {
  const total = $correct + $errors;
  return total === 0 ? 100 : Math.round(($correct / total) * 1000) / 10;
});

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    phaseStore.set("idle");
    pokeListStore.set([]);
    currentIndexStore.set(0);
    targetRomajiStore.set("");
    typedCountStore.set(0);
    totalCorrectCharsStore.set(0);
    totalErrorsStore.set(0);
    gameStartMsStore.set(null);
    elapsedMsStore.set(0);
  },
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setPhase: (value: GamePhase) => phaseStore.set(value),
  setPokeList: (value: PokeData[]) => pokeListStore.set(value),
  setCurrentIndex: (value: number) => currentIndexStore.set(value),
  setTargetRomaji: (value: string) => targetRomajiStore.set(value),
  setTypedCount: (value: number) => typedCountStore.set(value),
  incrementTotalCorrectChars: () => totalCorrectCharsStore.update((n) => n + 1),
  incrementTotalErrors: () => totalErrorsStore.update((n) => n + 1),
  setGameStartMs: (value: number) => gameStartMsStore.set(value),
  setElapsedMs: (value: number) => elapsedMsStore.set(value),
};
