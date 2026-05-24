/**
 * バトル計算ドリルのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { ExprNode } from "$lib/domain/models/Arithmetic";
import type { Difficulty } from "./problemTemplates";

/** 計算問題の定義 */
export type CalcProblem = {
  /** バトル状況の説明（例: "ピカチュウがフシギダネにこうげき！"） */
  readonly situation: string;
  /** 計算式ツリー（表示・評価に使う） */
  readonly expr: ExprNode;
  /** evalNode(expr) の結果（正の整数） */
  readonly answer: number;
  /** 答えの意味（例: "ダメージ" / "のこりHP"） */
  readonly answerLabel: string;
};

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const pokeDataPairStore = writable<readonly [PokeData, PokeData] | null>(null);
const problemStore = writable<CalcProblem | null>(null);
const difficultiesStore = writable<Difficulty[]>(["easy"]);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 出題中の2体のポケモン（読み取り専用） */
export const pokeDataPair = readonly(pokeDataPairStore);

/** 現在の計算問題（読み取り専用） */
export const problem = readonly(problemStore);

/** 選択中の難易度フィルター（読み取り専用） */
export const difficulties = readonly(difficultiesStore);

/** Facade からのみ使用するストア書き込みAPI */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    pokeDataPairStore.set(null);
    problemStore.set(null);
    // difficulties はユーザー設定のため reset では変更しない
  },
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setPokeDataPair: (value: readonly [PokeData, PokeData] | null) => pokeDataPairStore.set(value),
  setProblem: (value: CalcProblem | null) => problemStore.set(value),
  setDifficulties: (value: Difficulty[]) => difficultiesStore.set(value),
};
