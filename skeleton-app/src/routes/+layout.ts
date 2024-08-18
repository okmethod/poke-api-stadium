import type { LoadEvent } from "@sveltejs/kit";
import { generations } from "$lib/stores/generation.js";
import { fetchStaticPokeData } from "$lib/constants/fetchStaticData";

export async function load({ fetch }: LoadEvent): Promise<{ symbolUrlDict: Record<number, string> }> {
  // 並列実行の前にキャッシュに読み込む
  await fetchStaticPokeData(fetch, "load to cache");
  const symbolUrlDict = await _symbolUrlDict();

  async function _symbolUrlDict(): Promise<Record<number, string>> {
    const keys = Object.values(generations).flatMap((generation) => generation.symbolPokeIds);
    const pokeItemPromises = keys.map(async (key) => {
      const pickedPokeData = await fetchStaticPokeData(fetch, key.toString());
      return { key, url: pickedPokeData && pickedPokeData.imageUrl !== null ? pickedPokeData.imageUrl : null };
    });
    const imageUrls = await Promise.all(pokeItemPromises);
    return imageUrls.reduce(
      (acc, { key, url }) => {
        if (url !== null) {
          acc[key] = url;
        }
        return acc;
      },
      {} as Record<number, string>,
    );
  }

  return { symbolUrlDict };
}
