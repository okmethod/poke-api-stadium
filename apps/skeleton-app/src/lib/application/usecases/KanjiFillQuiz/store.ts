/**
 * KanjiFillQuiz のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData, FlavorTextPair } from "$lib/domain/models/PokeData";

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const pokeDataStore = writable<PokeData | null>(null);
const textPairStore = writable<FlavorTextPair | null>(null);
const isRevealedStore = writable<boolean>(false);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 現在の出題ポケモン（読み取り専用） */
export const pokeData = readonly(pokeDataStore);

/** 漢字・かなテキストペア（読み取り専用） */
export const textPair = readonly(textPairStore);

/** よみかた表示中かどうか（読み取り専用） */
export const isRevealed = readonly(isRevealedStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    pokeDataStore.set(null);
    textPairStore.set(null);
    isRevealedStore.set(false);
  },
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setPokeData: (value: PokeData | null) => pokeDataStore.set(value),
  setTextPair: (value: FlavorTextPair | null) => textPairStore.set(value),
  setIsRevealed: (value: boolean) => isRevealedStore.set(value),
};
