/**
 * ポケモンしりとりのベースデータ・セッション状態ストア
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: Facade がロードしたポケモン辞書とゲームセッション状態を保持（Facade のみが書き込む）
 * - ALLOWED: ドメイン層への依存
 * - FORBIDDEN: インフラ層への依存、プレゼン層への依存
 */

import { writable, readonly, derived } from "svelte/store";
import type { PokeTypeName } from "$lib/domain/models/PokeData";

/** しりとりゲーム内で使うポケモンデータ */
export interface ShiritoriPokeItem {
  readonly id: number;
  readonly jaName: string;
  readonly imageUrl: string | null;
  readonly cryUrl: string | null;
  readonly type1: PokeTypeName;
  readonly type2: PokeTypeName | null;
}

// --- ストア定義（書き込みはすべて storeWriter 経由） ---

const isLoadingStore = writable<boolean>(false);
const pokeDictStore = writable<Record<number, ShiritoriPokeItem>>({});
const groupByHeadCharDictStore = writable<Record<string, number[]>>({});

/** ポケモンデータ読み込み中かどうか（読み取り専用） */
export const isLoading = readonly(isLoadingStore);

/** 図鑑ID → ShiritoriPokeItem の辞書（読み取り専用） */
export const pokeDict = readonly(pokeDictStore);

/** 先頭文字 → 図鑑IDリスト の辞書（読み取り専用） */
export const groupByHeadCharDict = readonly(groupByHeadCharDictStore);

// セッション状態
const usedidsStore = writable<Set<number>>(new Set());
const pickedPokeItemsStore = writable<ShiritoriPokeItem[]>([]);
const pushedPokeItemsStore = writable<ShiritoriPokeItem[]>([]);
const messageStore = writable<string>("しりとり スタート");

/** 使用済みポケモンIDセット（読み取り専用） */
export const usedids = readonly(usedidsStore);

/** 現在の候補ポケモン一覧（読み取り専用） */
export const pickedPokeItems = readonly(pickedPokeItemsStore);

/** しりとりチェーンに積まれたポケモン一覧（読み取り専用） */
export const pushedPokeItems = readonly(pushedPokeItemsStore);

/** ゲーム進行メッセージ（読み取り専用） */
export const message = readonly(messageStore);

/** しりとり列の表示用データ（最後の2体、不足分は null でパディング） */
export const chainDisplay = derived(pushedPokeItemsStore, ($items): Array<ShiritoriPokeItem | null> => {
  if ($items.length === 0) return [null, null];
  if ($items.length === 1) return [null, $items[0]!];
  return $items.slice(-2) as ShiritoriPokeItem[];
});

/** Facade からのみ使用するストア書き込みAPI */
export const storeWriter = {
  reset: () => {
    isLoadingStore.set(false);
    pokeDictStore.set({});
    groupByHeadCharDictStore.set({});
    usedidsStore.set(new Set());
    pickedPokeItemsStore.set([]);
    pushedPokeItemsStore.set([]);
    messageStore.set("しりとり スタート");
  },
  resetSession: () => {
    usedidsStore.set(new Set());
    pickedPokeItemsStore.set([]);
    pushedPokeItemsStore.set([]);
    messageStore.set("しりとり スタート");
  },
  setIsLoading: (v: boolean) => isLoadingStore.set(v),
  setPokeDict: (v: Record<number, ShiritoriPokeItem>) => pokeDictStore.set(v),
  setGroupByHeadCharDict: (v: Record<string, number[]>) => groupByHeadCharDictStore.set(v),
  setUsedids: (v: Set<number>) => usedidsStore.set(v),
  setPickedPokeItems: (v: ShiritoriPokeItem[]) => pickedPokeItemsStore.set(v),
  setPushedPokeItems: (v: ShiritoriPokeItem[]) => pushedPokeItemsStore.set(v),
  setMessage: (v: string) => messageStore.set(v),
};
