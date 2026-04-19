/**
 * statsSortingQuizStore - ステータス並べ替えクイズのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（StatsSortingQuizFacade のみが書き込む）
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

const pokeDataListStore = writable<PokeData[]>([]);
const isOpenStore = writable<boolean>(false);
const isLoadingStore = writable<boolean>(false);
const resultStore = writable<string | null>(null);

/** 選出されたポケモンリスト（読み取り専用） */
export const pokeDataList = readonly(pokeDataListStore);

/** 結果表示中かどうか（読み取り専用） */
export const isOpen = readonly(isOpenStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 正解/不正解メッセージ（null のとき非表示）（読み取り専用） */
export const result = readonly(resultStore);

/** StatsSortingQuizFacade からのみ使用するストア書き込みAPI */
export const statsSortingQuizStoreWriter = {
  setPokeDataList: (value: PokeData[]) => pokeDataListStore.set(value),
  setIsOpen: (value: boolean) => isOpenStore.set(value),
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setResult: (value: string | null) => resultStore.set(value),
};
