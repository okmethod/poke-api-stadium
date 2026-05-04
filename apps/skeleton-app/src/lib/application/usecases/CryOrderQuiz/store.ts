/**
 * CryOrderQuiz のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { GameResult } from "$lib/application/usecases/facadeTypes";

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const pokeDataListStore = writable<PokeData[]>([]);
// 鳴き声の再生順: pokeDataList のインデックス配列（これが正解）
const crySequenceStore = writable<number[]>([]);
const isLoadingStore = writable<boolean>(false);
const resultStore = writable<GameResult | null>(null);

/** 選出された3体のポケモン（読み取り専用） */
export const pokeDataList = readonly(pokeDataListStore);

/** 鳴き声の再生順（pokeDataList のインデックス列、読み取り専用） */
export const crySequence = readonly(crySequenceStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 正誤判定結果（null のとき非表示、読み取り専用） */
export const result = readonly(resultStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    pokeDataListStore.set([]);
    crySequenceStore.set([]);
    isLoadingStore.set(false);
    resultStore.set(null);
  },
  setPokeDataList: (value: PokeData[]) => pokeDataListStore.set(value),
  setCrySequence: (value: number[]) => crySequenceStore.set(value),
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setResult: (value: GameResult | null) => resultStore.set(value),
};
