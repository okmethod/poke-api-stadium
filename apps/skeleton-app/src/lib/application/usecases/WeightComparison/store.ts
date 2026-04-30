/**
 * おもさくらべのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const pokeDataListStore = writable<PokeData[]>([]);
const isRevealedStore = writable<boolean>(false);
const isLoadingStore = writable<boolean>(false);

/** 選出された2体のポケモンリスト（読み取り専用） */
export const pokeDataList = readonly(pokeDataListStore);

/** 結果表示中かどうか（読み取り専用） */
export const isRevealed = readonly(isRevealedStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** Facade からのみ使用するストア書き込みAPI */
export const storeWriter = {
  reset: () => {
    pokeDataListStore.set([]);
    isRevealedStore.set(false);
    isLoadingStore.set(false);
  },
  setPokeDataList: (value: PokeData[]) => pokeDataListStore.set(value),
  setIsRevealed: (value: boolean) => isRevealedStore.set(value),
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
};
