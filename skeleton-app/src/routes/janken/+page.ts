import type { LoadEvent } from "@sveltejs/kit";
import type { StaticPokeData } from "$lib/types/poke";
import type { TypeName, TypeData, TypeColors } from "$lib/types/type";
import { fetchStaticPokeData, fetchTypeData } from "$lib/constants/fetchStaticData";
import { FIRST_POKE_ID, POKE_COUNT } from "$lib/constants/common";

export interface PokeItem {
  pokeId: number;
  jaName: string;
  imageUrl: string;
  type: (TypeData & TypeColors)[]; // 1コ or 2コ
  speed: number;
}

export async function load({ fetch }: LoadEvent): Promise<{ pokeItems: PokeItem[] }> {
  const keys = Array.from({ length: POKE_COUNT }, (_, i) => FIRST_POKE_ID + i);

  //並列実行の前にキャッシュに読み込む
  await fetchStaticPokeData(fetch, "load to cache");
  const pokeItems = await _getPokeItems();

  async function _getPokeItems(): Promise<PokeItem[]> {
    const pokeItemPromises = keys.map(async (key) => {
      const pickedPokeData = await fetchStaticPokeData(window.fetch, key.toString());
      return pickedPokeData && pickedPokeData.imageUrl !== null ? _convertToPokeItem(key, pickedPokeData) : null;
    });
    const pokeItems = await Promise.all(pokeItemPromises);
    return pokeItems.filter((item) => item !== null);
  }

  async function _convertToPokeItem(pokeId: number, staticPokeData: StaticPokeData): Promise<PokeItem> {
    const type1 = await fetchTypeData(staticPokeData.type1Name as TypeName);
    return {
      pokeId,
      jaName: staticPokeData.jaName,
      imageUrl: staticPokeData.imageUrl ?? "not_found",
      type: staticPokeData.type2Name ? [type1, await fetchTypeData(staticPokeData.type2Name as TypeName)] : [type1],
      speed: staticPokeData.stats.speed,
    };
  }

  return { pokeItems };
}
