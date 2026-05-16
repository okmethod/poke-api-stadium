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

export type BilliardPhase = "waiting" | "aiming" | "flying" | "caught" | "missed";

export interface BilliardObstacle {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const phaseStore = writable<BilliardPhase>("waiting");
const isLoadingStore = writable<boolean>(false);
const pokeDataStore = writable<PokeData | null>(null);
const ballPositionStore = writable<Point2d>({ x: 0, y: 0 });
const pokemonPositionStore = writable<Point2d>({ x: 0, y: 0 });
const obstaclesStore = writable<BilliardObstacle[]>([]);
const aimOriginStore = writable<Point2d | null>(null);
const aimTargetStore = writable<Point2d | null>(null);

/** ゲームフェーズ（読み取り専用） */
export const phase = readonly(phaseStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 対象ポケモン（読み取り専用） */
export const pokeData = readonly(pokeDataStore);

/** モンスターボールの現在位置（読み取り専用） */
export const ballPosition = readonly(ballPositionStore);

/** ポケモンの位置（読み取り専用） */
export const pokemonPosition = readonly(pokemonPositionStore);

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
    pokeDataStore.set(null);
    ballPositionStore.set({ x: 0, y: 0 });
    pokemonPositionStore.set({ x: 0, y: 0 });
    obstaclesStore.set([]);
    aimOriginStore.set(null);
    aimTargetStore.set(null);
  },
  setPhase: (v: BilliardPhase) => phaseStore.set(v),
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setPokeData: (v: PokeData | null) => pokeDataStore.set(v),
  setBallPosition: (v: Point2d) => ballPositionStore.set(v),
  setPokemonPosition: (v: Point2d) => pokemonPositionStore.set(v),
  setObstacles: (v: BilliardObstacle[]) => obstaclesStore.set(v),
  setAimOrigin: (v: Point2d | null) => aimOriginStore.set(v),
  setAimTarget: (v: Point2d | null) => aimTargetStore.set(v),
};
