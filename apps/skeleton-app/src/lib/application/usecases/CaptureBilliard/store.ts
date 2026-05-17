/**
 * ポケモンゲットビリヤードのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { Point2d, RectBody2dConfig } from "$lib/domain/models/2dPhysics";
import type { PokeData } from "$lib/domain/models/PokeData";

/** ゲームフェーズ */
export type BilliardPhase = "waiting" | "aiming" | "flying" | "caught" | "missed" | "result";

/** キャンバス描画用のポケモンの状態 */
export interface BilliardCanvasPokemon {
  readonly pokeData: PokeData;
  readonly position: Point2d;
  readonly caught: boolean;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const phaseStore = writable<BilliardPhase>("waiting");
const isLoadingStore = writable<boolean>(false);
const pokemonsStore = writable<BilliardCanvasPokemon[]>([]);
const obstaclesStore = writable<RectBody2dConfig[]>([]);
const ballsRemainingStore = writable<number>(0);
const caughtPokemonsStore = writable<PokeData[]>([]);
const aimOriginStore = writable<Point2d | null>(null);
const aimTargetStore = writable<Point2d | null>(null);

/** ゲームフェーズ（読み取り専用） */
export const phase = readonly(phaseStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** フィールド上のポケモン一覧（読み取り専用） */
export const pokemons = readonly(pokemonsStore);

/** フィールド障害物一覧（読み取り専用・`RectBody2dConfig`、`spawnPoint` は center 座標） */
export const obstacles = readonly(obstaclesStore);

/** 残りボール数（読み取り専用） */
export const ballsRemaining = readonly(ballsRemainingStore);

/** ゲット済みポケモン一覧（読み取り専用） */
export const caughtPokemons = readonly(caughtPokemonsStore);

/** エイム開始点（読み取り専用） */
export const aimOrigin = readonly(aimOriginStore);

/** エイム現在点（読み取り専用） */
export const aimTarget = readonly(aimTargetStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    phaseStore.set("waiting");
    isLoadingStore.set(false);
    pokemonsStore.set([]);
    obstaclesStore.set([]);
    ballsRemainingStore.set(0);
    caughtPokemonsStore.set([]);
    aimOriginStore.set(null);
    aimTargetStore.set(null);
  },
  setPhase: (v: BilliardPhase) => phaseStore.set(v),
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setPokemons: (v: BilliardCanvasPokemon[]) => pokemonsStore.set(v),
  setObstacles: (v: RectBody2dConfig[]) => obstaclesStore.set(v),
  setBallsRemaining: (v: number) => ballsRemainingStore.set(v),
  setCaughtPokemons: (v: PokeData[]) => caughtPokemonsStore.set(v),
  setAimOrigin: (v: Point2d | null) => aimOriginStore.set(v),
  setAimTarget: (v: Point2d | null) => aimTargetStore.set(v),
};
