/**
 * generationStore - 世代フィルターの状態管理ストア
 *
 * 選択中の世代番号リストを localStorage に永続化し、ページ再訪時に復元する。
 * 複数世代を同時選択可能で、全世代選択が「すべて」に相当する。
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Store)
 * - ROLE: ゲームで使用する図鑑IDプールの絞り込み設定を保持
 * - ALLOWED: ドメイン層への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存（Svelte/DOM/UIライブラリ）
 */

import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import { ALL_GENERATION_NUMBERS, generationData, getPokeIdRanges } from "$lib/domain/models/PokeData/generation";
import type { GenerationNumber } from "$lib/domain/models/PokeData/generation";

const SPRITE_BASE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

/** 選択世代のうち最新世代の御三家からランダムに1体のスプライトURLを生成する */
function computeStarterIconUrl(gens: GenerationNumber[]): string {
  const newest = Math.max(...gens) as GenerationNumber;
  const data = generationData(newest);
  const pokeId = data ? data.starters[Math.floor(Math.random() * 3)] : 1;
  return `${SPRITE_BASE_URL}/${pokeId}.png`;
}

const STORAGE_KEY = "selectedGenerations";

function loadFromStorage(): GenerationNumber[] {
  if (!browser) return [...ALL_GENERATION_NUMBERS];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...ALL_GENERATION_NUMBERS];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...ALL_GENERATION_NUMBERS];
    // 有効な GenerationNumber のみ残す
    const valid = parsed.filter((v): v is GenerationNumber => ALL_GENERATION_NUMBERS.includes(v as GenerationNumber));
    return valid.length > 0 ? valid : [...ALL_GENERATION_NUMBERS];
  } catch {
    return [...ALL_GENERATION_NUMBERS];
  }
}

/** 選択中の世代番号リスト。全世代選択が「すべて」に相当する */
export const generationStore = writable<GenerationNumber[]>(loadFromStorage());

/** 選択世代の最新世代御三家スプライトURL */
export const starterIconUrlStore = writable<string>(computeStarterIconUrl(loadFromStorage()));

/** 現在の選択世代リストを返す */
export function getSelectedGenerations(): GenerationNumber[] {
  return get(generationStore);
}

/** 選択世代リストを更新し localStorage に永続化する */
export function setSelectedGenerations(gens: GenerationNumber[]): void {
  // 少なくとも1世代は選択状態を保つ
  const next = gens.length > 0 ? gens : [...ALL_GENERATION_NUMBERS];
  generationStore.set(next);
  starterIconUrlStore.set(computeStarterIconUrl(next));
  if (browser) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      console.error("Failed to save selectedGenerations to localStorage");
    }
  }
}

/**
 * 現在の選択世代から有効な図鑑IDの一覧を返す。
 * Facade の pickPokemon / pickPokemons で利用する。
 */
export function getSelectedPokeIds(): number[] {
  const ranges = getPokeIdRanges(getSelectedGenerations());
  const ids: number[] = [];
  for (const { first, last } of ranges) {
    for (let i = first; i <= last; i++) {
      ids.push(i);
    }
  }
  return ids;
}
