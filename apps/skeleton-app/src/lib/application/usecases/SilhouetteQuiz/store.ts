/**
 * シルエットクイズのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

const pokeDataStore = writable<PokeData | null>(null);
const isOpenStore = writable<boolean>(false);
const isLoadingStore = writable<boolean>(false);
const hintTextStore = writable<string | null>(null);

/** 現在の出題ポケモン（読み取り専用） */
export const pokeData = readonly(pokeDataStore);

/** こたえ表示中かどうか（読み取り専用） */
export const isOpen = readonly(isOpenStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** ヒントテキスト（null のとき非表示）（読み取り専用） */
export const hintText = readonly(hintTextStore);

/** Facade からのみ使用するストア書き込みAPI */
export const storeWriter = {
  setPokeData: (value: PokeData | null) => pokeDataStore.set(value),
  setIsOpen: (value: boolean) => isOpenStore.set(value),
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setHintText: (value: string | null) => hintTextStore.set(value),
};
