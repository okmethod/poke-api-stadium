/**
 * ポケモン対消滅のゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";

const matchedCountStore = writable<number>(0);
const activeBodyCountStore = writable<number>(0);

/**
 * マッチ成立時に更新される鳴き声URL
 *
 * プレゼン層が購読して音声再生する。matchedCount の変化をトリガーとして使うため、
 * null リセットは不要（matchedCount が増えるたびに上書きされる）。
 */
const lastMatchCryUrlStore = writable<string | null>(null);

/** マッチ成立数（ペア数）（読み取り専用） */
export const matchedCount = readonly(matchedCountStore);

/** フィールド上のボディ数（読み取り専用） */
export const activeBodyCount = readonly(activeBodyCountStore);

/** 最後にマッチしたポケモンの鳴き声URL（読み取り専用） */
export const lastMatchCryUrl = readonly(lastMatchCryUrlStore);

/** Facade からのみ使用するストア書き込みAPI */
export const storeWriter = {
  reset: () => {
    matchedCountStore.set(0);
    activeBodyCountStore.set(0);
    lastMatchCryUrlStore.set(null);
  },
  addMatchedCount: (delta: number) => matchedCountStore.update((n) => n + delta),
  setActiveBodyCount: (count: number) => activeBodyCountStore.set(count),
  addActiveBodyCount: (delta: number) => activeBodyCountStore.update((n) => n + delta),
  setLastMatchCryUrl: (url: string | null) => lastMatchCryUrlStore.set(url),
};
