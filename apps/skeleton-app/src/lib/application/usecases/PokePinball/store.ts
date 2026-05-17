/**
 * PokePinball のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { Point2d } from "$lib/domain/models/2dPhysics";
import type { PokeData } from "$lib/domain/models/PokeData";

/** ゲームフェーズ */
export type PinballPhase = "idle" | "playing" | "lost" | "gameover";

/** テーブル上のバンパーポケモン情報 */
export interface PinballBumper {
  /** ポケモン ID（文字列、物理エンジンのバンパー ID と対応） */
  readonly id: string;
  readonly pokeData: PokeData;
  /** テーブル上の固定位置 */
  readonly tablePosition: Point2d;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const phaseStore = writable<PinballPhase>("idle");
const isLoadingStore = writable<boolean>(false);
const bumpersStore = writable<PinballBumper[]>([]);
const scoreStore = writable<number>(0);
const livesRemainingStore = writable<number>(0);

/** ゲームフェーズ（読み取り専用） */
export const phase = readonly(phaseStore);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** テーブル上のバンパーポケモン一覧（読み取り専用） */
export const bumpers = readonly(bumpersStore);

/** スコア（読み取り専用） */
export const score = readonly(scoreStore);

/** 残りライフ数（読み取り専用） */
export const livesRemaining = readonly(livesRemainingStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    phaseStore.set("idle");
    isLoadingStore.set(false);
    bumpersStore.set([]);
    scoreStore.set(0);
    livesRemainingStore.set(0);
  },
  setPhase: (v: PinballPhase) => phaseStore.set(v),
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setBumpers: (v: PinballBumper[]) => bumpersStore.set(v),
  setScore: (v: number) => scoreStore.set(v),
  setLivesRemaining: (v: number) => livesRemainingStore.set(v),
};
