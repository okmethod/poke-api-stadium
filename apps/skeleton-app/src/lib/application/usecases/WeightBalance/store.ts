/**
 * 重さ測りゲームのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const targetWeightStore = writable<number>(0);
const toleranceWeightStore = writable<number>(0);
const currentPokeDataStore = writable<PokeData | null>(null);
const placedPokeDataListStore = writable<PokeData[]>([]);
const isRevealedStore = writable<boolean>(false);
const isLoadingStore = writable<boolean>(false);
const isBalancedStore = writable<boolean | null>(null);
const isSpringBrokenStore = writable<boolean>(false);

/** 目標重量 kg（読み取り専用） */
export const targetWeight = readonly(targetWeightStore);

/** 釣り合い判定の許容誤差 kg（読み取り専用） */
export const toleranceWeight = readonly(toleranceWeightStore);

/** 現在の候補ポケモン（読み取り専用） */
export const currentPokeData = readonly(currentPokeDataStore);

/** 天秤に乗せたポケモンリスト（読み取り専用） */
export const placedPokeDataList = readonly(placedPokeDataListStore);

/** 比べた後かどうか（読み取り専用） */
export const isRevealed = readonly(isRevealedStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 釣り合ったかどうか（null = 未判定、読み取り専用） */
export const isBalanced = readonly(isBalancedStore);

/** バネが破断したかどうか（読み取り専用） */
export const isSpringBroken = readonly(isSpringBrokenStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    targetWeightStore.set(0);
    toleranceWeightStore.set(0);
    currentPokeDataStore.set(null);
    placedPokeDataListStore.set([]);
    isRevealedStore.set(false);
    isLoadingStore.set(false);
    isBalancedStore.set(null);
    isSpringBrokenStore.set(false);
  },
  setTargetWeight: (value: number) => targetWeightStore.set(value),
  setToleranceWeight: (value: number) => toleranceWeightStore.set(value),
  setCurrentPokeData: (value: PokeData | null) => currentPokeDataStore.set(value),
  setPlacedPokeDataList: (value: PokeData[]) => placedPokeDataListStore.set(value),
  setIsRevealed: (value: boolean) => isRevealedStore.set(value),
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setIsBalanced: (value: boolean | null) => isBalancedStore.set(value),
  setIsSpringBroken: (value: boolean) => isSpringBrokenStore.set(value),
};
