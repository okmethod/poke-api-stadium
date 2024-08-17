import type { LoadEvent } from "@sveltejs/kit";
import type { StaticPokeData } from "$lib/types/poke";
import type { TypeName } from "$lib/types/type";
import type { Stats } from "$lib/types/stats";
import { fetchStaticPokeData } from "$lib/constants/fetchStaticData";
import { FIRST_POKE_ID, POKE_COUNT } from "$lib/constants/common";

export interface PokeItem {
  id: number; // dndzone で使用するため id という命名にしている
  jaName: string;
  imageUrl: string;
  type1Name: TypeName;
  type2Name: TypeName | null;
  height: number;
  weight: number;
  stats: Stats;
}

export async function load({ fetch }: LoadEvent): Promise<{ pokeItems: PokeItem[] }> {
  // 並列実行の前にキャッシュに読み込む
  await fetchStaticPokeData(fetch, "load to cache");
  const pokeItems = await _getPokeItems();

  async function _getPokeItems(): Promise<PokeItem[]> {
    const keys = Array.from({ length: POKE_COUNT }, (_, i) => FIRST_POKE_ID + i);
    const pokeItemPromises = keys.map(async (key) => {
      const pickedPokeData = await fetchStaticPokeData(window.fetch, key.toString());
      return pickedPokeData && pickedPokeData.imageUrl !== null ? _convertToPokeItem(key, pickedPokeData) : null;
    });
    const pokeItems = await Promise.all(pokeItemPromises);
    return pokeItems.filter((item) => item !== null);
  }

  function _convertToPokeItem(pokeId: number, staticPokeData: StaticPokeData): PokeItem {
    return {
      id: pokeId,
      jaName: staticPokeData.jaName,
      imageUrl: staticPokeData.imageUrl ?? "not_found",
      type1Name: staticPokeData.type1Name as TypeName,
      type2Name: staticPokeData.type2Name ? (staticPokeData.type2Name as TypeName) : null,
      height: staticPokeData.height,
      weight: staticPokeData.weight,
      stats: staticPokeData.stats,
    };
  }

  return { pokeItems };
}
