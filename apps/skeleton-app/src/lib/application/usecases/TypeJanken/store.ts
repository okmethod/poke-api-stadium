/**
 * あとだしタイプじゃんけんのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";

/** 御三家のタイプカテゴリ（三すくみの軸） */
export type StarterType = "grass" | "fire" | "water";

/** 進化段階 */
export type EvolutionStage = "basic" | "stage1" | "stage2";

/** 操作ボタン用ポケモン（中間進化3体） */
export interface ButtonPokemons {
  readonly grass: PokeData;
  readonly fire: PokeData;
  readonly water: PokeData;
}

/** 現在出現しているポケモンの情報 */
export interface CurrentPokemon {
  readonly pokeData: PokeData;
  readonly starterType: StarterType;
  readonly stage: EvolutionStage;
  /** 正解のタイプ（選択後に開示） */
  readonly correctType: StarterType;
}

/** 1ラウンドの判定結果 */
export interface RoundResult {
  readonly playerType: StarterType;
  readonly judgment: "win" | "lose" | "draw";
  readonly isCorrect: boolean;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const buttonPokemonsStore = writable<ButtonPokemons | null>(null);
const currentPokemonStore = writable<CurrentPokemon | null>(null);
const roundCountStore = writable<number>(0);
const scoreStore = writable<number>(0);
const roundResultStore = writable<RoundResult | null>(null);
const isGameOverStore = writable<boolean>(false);
const gameStartTimeStore = writable<number | null>(null);
const finalElapsedMsStore = writable<number | null>(null);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 操作ボタン用ポケモン（中間進化3体）（読み取り専用） */
export const buttonPokemons = readonly(buttonPokemonsStore);

/** 現在出現しているポケモン（読み取り専用） */
export const currentPokemon = readonly(currentPokemonStore);

/** 完了したラウンド数（読み取り専用） */
export const roundCount = readonly(roundCountStore);

/** 現在のスコア（正解数）（読み取り専用） */
export const score = readonly(scoreStore);

/** 直前のラウンド判定結果（null = 未選択）（読み取り専用） */
export const roundResult = readonly(roundResultStore);

/** ゲーム終了フラグ（読み取り専用） */
export const isGameOver = readonly(isGameOverStore);

/** ゲーム開始時刻（ms、null = 未開始）（読み取り専用） */
export const gameStartTime = readonly(gameStartTimeStore);

/** ゲームクリアまでの経過時間（ms、null = 未クリア）（読み取り専用） */
export const finalElapsedMs = readonly(finalElapsedMsStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    buttonPokemonsStore.set(null);
    currentPokemonStore.set(null);
    roundCountStore.set(0);
    scoreStore.set(0);
    roundResultStore.set(null);
    isGameOverStore.set(false);
    gameStartTimeStore.set(null);
    finalElapsedMsStore.set(null);
  },
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setButtonPokemons: (v: ButtonPokemons | null) => buttonPokemonsStore.set(v),
  setCurrentPokemon: (v: CurrentPokemon | null) => currentPokemonStore.set(v),
  setRoundResult: (v: RoundResult | null) => roundResultStore.set(v),
  incrementScore: () => scoreStore.update((n) => n + 1),
  incrementRoundCount: () => roundCountStore.update((n) => n + 1),
  setIsGameOver: (v: boolean) => isGameOverStore.set(v),
  setGameStartTime: (v: number) => gameStartTimeStore.set(v),
  setFinalElapsedMs: (v: number) => finalElapsedMsStore.set(v),
};
