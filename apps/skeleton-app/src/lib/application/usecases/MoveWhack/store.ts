/**
 * MoveWhack のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { PokeData } from "$lib/domain/models/PokeData";
import type { PokeTypeName } from "$lib/domain/models/PokeType";

export type GamePhase = "idle" | "playing" | "result";

/** ゲームで使用するわざ（タイプ名 + 実在のわざ名） */
export interface ActiveMove {
  readonly type: PokeTypeName;
  readonly moveName: string;
}

/** ゲームに出現するポケモンスロット（MAX_ACTIVE_SLOTS 個の固定ポジション） */
export interface ActiveSlot {
  readonly position: number;
  readonly pokeData: PokeData;
  readonly expiresAt: number;
}

/** 技選択のフィードバック */
export interface MoveResult {
  readonly isHit: boolean;
  readonly message: string;
}

export const GAME_DURATION_MS = 30_000;
export const MAX_ACTIVE_SLOTS = 4;

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const phaseStore = writable<GamePhase>("idle");
const activeSlotsStore = writable<ActiveSlot[]>([]);
const activeMovesStore = writable<ActiveMove[]>([]);
const scoreStore = writable<number>(0);
const missesStore = writable<number>(0);
const gameEndMsStore = writable<number | null>(null);
const moveResultStore = writable<MoveResult | null>(null);

/** ローディング中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);
/** ゲームフェーズ（読み取り専用） */
export const phase = readonly(phaseStore);
/** アクティブスロット一覧（読み取り専用） */
export const activeSlots = readonly(activeSlotsStore);
/** 今回のゲームで使用するわざ一覧（読み取り専用） */
export const activeMoves = readonly(activeMovesStore);
/** スコア（読み取り専用） */
export const score = readonly(scoreStore);
/** おてつき回数（読み取り専用） */
export const misses = readonly(missesStore);
/** ゲーム終了タイムスタンプ ms（読み取り専用） */
export const gameEndMs = readonly(gameEndMsStore);
/** 直前の技選択結果（読み取り専用） */
export const moveResult = readonly(moveResultStore);

/** Facade からのみ使用するストア書き込み API */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    phaseStore.set("idle");
    activeSlotsStore.set([]);
    activeMovesStore.set([]);
    scoreStore.set(0);
    missesStore.set(0);
    gameEndMsStore.set(null);
    moveResultStore.set(null);
  },
  setIsLoading: (value: boolean) => isLoadingStore.set(value),
  setPhase: (value: GamePhase) => phaseStore.set(value),
  setActiveSlots: (value: ActiveSlot[]) => activeSlotsStore.set(value),
  setActiveMoves: (value: ActiveMove[]) => activeMovesStore.set(value),
  addSlot: (slot: ActiveSlot) => activeSlotsStore.update((slots) => [...slots, slot]),
  removeSlotAt: (position: number) => activeSlotsStore.update((slots) => slots.filter((s) => s.position !== position)),
  incrementScore: () => scoreStore.update((n) => n + 1),
  incrementMisses: () => missesStore.update((n) => n + 1),
  setGameEndMs: (value: number | null) => gameEndMsStore.set(value),
  setMoveResult: (value: MoveResult | null) => moveResultStore.set(value),
};
