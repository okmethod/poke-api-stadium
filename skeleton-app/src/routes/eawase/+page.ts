import type { LoadEvent } from "@sveltejs/kit";
import type { StaticPokeData } from "$lib/types/poke";
import { fetchStaticPokeData } from "$lib/constants/fetchStaticData";

export interface PokeItem {
  pokeId: number;
  imageUrl: string;
  category: number;
}

// prettier-ignore
const symbolPokeIds = [
  1, 4, 7,
  152, 155, 158,
  252, 255, 258,
  387, 390, 393,
  495, 498, 501,
  650, 653, 656,
  722, 725, 728,
  810, 813, 816,
  906, 909, 912,
  25, 133, 1024,
];

export async function load({ fetch }: LoadEvent): Promise<{ pokeItems: PokeItem[] }> {
  // 並列実行の前にキャッシュに読み込む
  await fetchStaticPokeData(fetch, "load to cache");
  const pokeItems = await _getPokeItems();

  async function _getPokeItems(): Promise<PokeItem[]> {
    const keys = symbolPokeIds;
    const pokeItemPromises = keys.map(async (key, index) => {
      const pickedPokeData = await fetchStaticPokeData(fetch, key.toString());
      return pickedPokeData && pickedPokeData.imageUrl !== null ? _convertToPokeItem(index, key, pickedPokeData) : null;
    });
    const pokeItems = await Promise.all(pokeItemPromises);
    return pokeItems.filter((item) => item !== null);
  }

  function _convertToPokeItem(index: number, pokeId: number, staticPokeData: StaticPokeData): PokeItem {
    return {
      pokeId,
      category: 1 << (index + 2), // カテゴリ2 以降を使う
      imageUrl: staticPokeData.imageUrl ?? "not_found",
    };
  }

  return { pokeItems };
}
