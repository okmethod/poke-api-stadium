import type { LoadEvent } from "@sveltejs/kit";
import { fetchStaticPokeData } from "$lib/constants/fetchStaticData";
import { FIRST_POKE_ID, POKE_COUNT } from "$lib/constants/common";

export async function load({ fetch }: LoadEvent): Promise<{ imageUrls: string[] }> {
  await fetchStaticPokeData(fetch, "load to cache"); //並列実行の前にキャッシュに読み込む
  const imageUrls = await _getPokeImageUrlStrings();

  async function _getPokeImageUrlStrings(): Promise<string[]> {
    const keys = Array.from({ length: POKE_COUNT }, (_, i) => FIRST_POKE_ID + i);
    const pokeDataPromises = keys.map(async (key) => {
      const pokeData = await fetchStaticPokeData(fetch, key.toString());
      return pokeData.imageUrl ?? null;
    });
    const imageUrls = await Promise.all(pokeDataPromises);
    return imageUrls.filter((url) => url !== null);
  }

  return { imageUrls };
}
