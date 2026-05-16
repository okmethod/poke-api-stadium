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
import type { Point2d } from "$lib/domain/models/2dPhysics";

export type BilliardPhase = "waiting" | "aiming" | "flying" | "caught" | "missed" | "result";

export interface BilliardObstacle {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/** フィールド上のポケモン1体の状態 */
export interface BilliardPokemon {
  readonly pokeData: PokeData;
  readonly x: number;
  readonly y: number;
  readonly caught: boolean;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const phaseStore = writable<BilliardPhase>("waiting");
const isLoadingStore = writable<boolean>(false);
const pokemonsStore = writable<BilliardPokemon[]>([]);
const ballPositionStore = writable<Point2d>({ x: 0, y: 0 });
const ballsRemainingStore = writable<number>(0);
const caughtPokemonsStore = writable<PokeData[]>([]);
const obstaclesStore = writable<BilliardObstacle[]>([]);
const aimOriginStore = writable<Point2d | null>(null);
const aimTargetStore = writable<Point2d | null>(null);

/** ゲームフェーズ（読み取り専用） */
export const phase = readonly(phaseStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** フィールド上のポケモン一覧（読み取り専用） */
export const pokemons = readonly(pokemonsStore);

/** モンスターボールの現在位置（読み取り専用） */
export const ballPosition = readonly(ballPositionStore);

/** 残りボール数（読み取り専用） */
export const ballsRemaining = readonly(ballsRemainingStore);

/** ゲット済みポケモン一覧（読み取り専用） */
export const caughtPokemons = readonly(caughtPokemonsStore);

/** 障害物リスト（読み取り専用） */
export const obstacles = readonly(obstaclesStore);

/** エイム開始点（ボール位置）（読み取り専用） */
export const aimOrigin = readonly(aimOriginStore);

/** エイム現在点（ドラッグ位置）（読み取り専用） */
export const aimTarget = readonly(aimTargetStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    phaseStore.set("waiting");
    isLoadingStore.set(false);
    pokemonsStore.set([]);
    ballPositionStore.set({ x: 0, y: 0 });
    ballsRemainingStore.set(0);
    caughtPokemonsStore.set([]);
    obstaclesStore.set([]);
    aimOriginStore.set(null);
    aimTargetStore.set(null);
  },
  setPhase: (v: BilliardPhase) => phaseStore.set(v),
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setPokemons: (v: BilliardPokemon[]) => pokemonsStore.set(v),
  setBallPosition: (v: Point2d) => ballPositionStore.set(v),
  setBallsRemaining: (v: number) => ballsRemainingStore.set(v),
  setCaughtPokemons: (v: PokeData[]) => caughtPokemonsStore.set(v),
  setObstacles: (v: BilliardObstacle[]) => obstaclesStore.set(v),
  setAimOrigin: (v: Point2d | null) => aimOriginStore.set(v),
  setAimTarget: (v: Point2d | null) => aimTargetStore.set(v),
};
