import type { LoadEvent } from "@sveltejs/kit";
import type { StaticPokeData } from "$lib/types/poke";
import type { TypeName, TypeData } from "$lib/types/type";
import type { Stats } from "$lib/types/stats";
import { fetchStaticPokeData, fetchStaticAddPokeData, fetchTypeData } from "$lib/constants/fetchStaticData";
import { FIRST_POKE_ID, POKE_COUNT, FIRST_ADDITIONAL_POKE_ID, ADDITIONAL_POKE_COUNT } from "$lib/constants/common";

export interface PokeItem {
  pokeId: number;
  jaName: string;
  gifUrl: string;
  gifBackUrl: string;
  jaGenus: string | null;
  type1: TypeData;
  type2: TypeData | null;
  height: number;
  weight: number;
  stats: Stats;
}

export async function load({ fetch }: LoadEvent): Promise<{ pokeItems: PokeItem[] }> {
  // 並列実行の前にキャッシュに読み込む
  await fetchStaticPokeData(fetch, "load to cache");
  await fetchStaticAddPokeData(fetch, "load to cache");
  const pokeItems = await _getPokeItems();

  async function _getPokeItems(): Promise<PokeItem[]> {
    const keys = [
      ...Array.from({ length: POKE_COUNT }, (_, i) => FIRST_POKE_ID + i),
      ...Array.from({ length: ADDITIONAL_POKE_COUNT }, (_, i) => FIRST_ADDITIONAL_POKE_ID + i),
    ];
    const pokeItemPromises = keys.map(async (key) => {
      let pickedPokeData;
      if (key < FIRST_ADDITIONAL_POKE_ID) {
        pickedPokeData = await fetchStaticPokeData(window.fetch, key.toString());
      } else {
        pickedPokeData = await fetchStaticAddPokeData(window.fetch, key.toString());
      }
      return pickedPokeData && pickedPokeData.gifUrl !== null && pickedPokeData.gifBackUrl !== null
        ? _convertToPokeItem(key, pickedPokeData)
        : null;
    });
    const pokeItems = await Promise.all(pokeItemPromises);
    return pokeItems.filter((item) => item !== null);
  }

  async function _convertToPokeItem(pokeId: number, staticPokeData: StaticPokeData): Promise<PokeItem> {
    return {
      pokeId,
      jaName: staticPokeData.jaName,
      gifUrl: staticPokeData.gifUrl ?? "",
      gifBackUrl: staticPokeData.gifBackUrl ?? "",
      jaGenus: staticPokeData.jaGenus,
      type1: await fetchTypeData(staticPokeData.type1Name as TypeName),
      type2: staticPokeData.type2Name ? await fetchTypeData(staticPokeData.type2Name as TypeName) : null,
      height: staticPokeData.height,
      weight: staticPokeData.weight,
      stats: staticPokeData.stats,
    };
  }

  return { pokeItems };
}
