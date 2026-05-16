/**
 * ポケモンゲットビリヤードのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";
export type { BilliardPhase } from "$lib/application/ports/IBilliardPhysicsEngine";

/** フィールド上のポケモン1体の状態 */
export interface BilliardPokemon {
  readonly pokeData: PokeData;
  readonly x: number;
  readonly y: number;
  readonly caught: boolean;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const phaseStore = writable<import("$lib/application/ports/IBilliardPhysicsEngine").BilliardPhase>("waiting");
const isLoadingStore = writable<boolean>(false);
const pokemonsStore = writable<BilliardPokemon[]>([]);
const ballsRemainingStore = writable<number>(0);
const caughtPokemonsStore = writable<PokeData[]>([]);

/** ゲームフェーズ（読み取り専用） */
export const phase = readonly(phaseStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** フィールド上のポケモン一覧（読み取り専用） */
export const pokemons = readonly(pokemonsStore);

/** 残りボール数（読み取り専用） */
export const ballsRemaining = readonly(ballsRemainingStore);

/** ゲット済みポケモン一覧（読み取り専用） */
export const caughtPokemons = readonly(caughtPokemonsStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    phaseStore.set("waiting");
    isLoadingStore.set(false);
    pokemonsStore.set([]);
    ballsRemainingStore.set(0);
    caughtPokemonsStore.set([]);
  },
  setPhase: (v: import("$lib/application/ports/IBilliardPhysicsEngine").BilliardPhase) => phaseStore.set(v),
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setPokemons: (v: BilliardPokemon[]) => pokemonsStore.set(v),
  setBallsRemaining: (v: number) => ballsRemainingStore.set(v),
  setCaughtPokemons: (v: PokeData[]) => caughtPokemonsStore.set(v),
};
