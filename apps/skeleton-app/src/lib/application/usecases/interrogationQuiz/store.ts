/**
 * ポケモン尋問クイズのゲーム状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲーム状態の保持・更新（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存、アプリ層の Port 型への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly } from "svelte/store";
import type { ChatMessage } from "$lib/application/ports/ILLMServiceRepository";

/** ゲームの進行状態 */
export type GameStatus = "init" | "playing" | "finished";

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const gameStatusStore = writable<GameStatus>("init");
const currentPokeNameStore = writable<string | null>(null);
const pokeImageUrlStore = writable<string>("");
const pokeCryUrlStore = writable<string | null>(null);
const chatHistoryStore = writable<ChatMessage[]>([]);
const streamingTextStore = writable<string>("");
const isStreamingStore = writable<boolean>(false);
const isAnswerRevealedStore = writable<boolean>(false);

/** ゲームの進行状態（読み取り専用） */
export const gameStatus = readonly(gameStatusStore);

/** 現在の出題ポケモン名（読み取り専用） */
export const currentPokeName = readonly(currentPokeNameStore);

/** 出題ポケモンの画像URL（読み取り専用） */
export const pokeImageUrl = readonly(pokeImageUrlStore);

/** 出題ポケモンの鳴き声URL（読み取り専用） */
export const pokeCryUrl = readonly(pokeCryUrlStore);

/** チャット履歴（読み取り専用） */
export const chatHistory = readonly(chatHistoryStore);

/** ストリーミング中の蓄積テキスト（読み取り専用） */
export const streamingText = readonly(streamingTextStore);

/** ストリーミング受信中かどうか（読み取り専用） */
export const isStreaming = readonly(isStreamingStore);

/** こたえ表示済みかどうか（読み取り専用） */
export const isAnswerRevealed = readonly(isAnswerRevealedStore);

/** Facade からのみ使用するストア書き込みAPI */
export const storeWriter = {
  reset: () => {
    gameStatusStore.set("init");
    currentPokeNameStore.set(null);
    pokeImageUrlStore.set("");
    pokeCryUrlStore.set(null);
    chatHistoryStore.set([]);
    streamingTextStore.set("");
    isStreamingStore.set(false);
    isAnswerRevealedStore.set(false);
  },
  setGameStatus: (value: GameStatus) => gameStatusStore.set(value),
  setCurrentPokeName: (value: string | null) => currentPokeNameStore.set(value),
  setPokeImageUrl: (value: string) => pokeImageUrlStore.set(value),
  setPokeCryUrl: (value: string | null) => pokeCryUrlStore.set(value),
  setChatHistory: (value: ChatMessage[]) => chatHistoryStore.set(value),
  setStreamingText: (value: string) => streamingTextStore.set(value),
  appendStreamingText: (chunk: string) => streamingTextStore.update((prev) => prev + chunk),
  setIsStreaming: (value: boolean) => isStreamingStore.set(value),
  setIsAnswerRevealed: (value: boolean) => isAnswerRevealedStore.set(value),
};
