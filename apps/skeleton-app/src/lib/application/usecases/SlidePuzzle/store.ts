/**
 * スライドパズルのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const pokeDataStore = writable<PokeData | null>(null);
/** グリッドの各セル（0〜15）に置かれたタイルID。null = 空マス、0〜14 = タイルID */
const boardStore = writable<(number | null)[]>([]);
const moveCountStore = writable<number>(0);
const isGameClearStore = writable<boolean>(false);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 現在のポケモン（読み取り専用） */
export const pokeData = readonly(pokeDataStore);

/** ボード状態（読み取り専用） */
export const board = readonly(boardStore);

/** 手数（読み取り専用） */
export const moveCount = readonly(moveCountStore);

/** ゲームクリア済みかどうか（読み取り専用） */
export const isGameClear = readonly(isGameClearStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    pokeDataStore.set(null);
    boardStore.set([]);
    moveCountStore.set(0);
    isGameClearStore.set(false);
  },
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setPokeData: (v: PokeData | null) => pokeDataStore.set(v),
  setBoard: (v: (number | null)[]) => boardStore.set(v),
  incrementMoveCount: () => moveCountStore.update((n) => n + 1),
  setIsGameClear: (v: boolean) => isGameClearStore.set(v),
};
