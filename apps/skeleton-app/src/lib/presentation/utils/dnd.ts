import type { PokeData } from "$lib/domain/models/PokeData";

/** svelte-dnd-action が必須とする id フィールドを付与した PokeData */
export type DndPokeData = PokeData & { id: number };

/** PokeData[] を dndzone で扱える DndPokeData[] に変換する */
export function toDndItems(list: PokeData[]): DndPokeData[] {
  return list.map((p) => ({ ...p, id: p.speciesId }));
}
