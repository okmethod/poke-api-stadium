import type { LoadEvent } from "@sveltejs/kit";
import { generations } from "$lib/stores/generation";
import { pickRandomNumbers } from "$lib/utils/collections";
import { fetchStaticPokeData, fetchStaticAddPokeData } from "$lib/constants/fetchStaticData";

// prettier-ignore
const footerSymbolPokeIds = [
    10080, 10081, 10082, 10083, 10084, 10085,
    10094, 10095, 10096, 10097, 10098, 10099,
    10148, 10158, 10160,
  ];

export async function load({ fetch }: LoadEvent): Promise<{
  generationSymbolUrlDict: Record<number, string>;
  footerSymbolUrl: string;
}> {
  // 並列実行の前にキャッシュに読み込む
  await fetchStaticPokeData(fetch, "load to cache");
  const generationSymbolUrlDict = await _generationSymbolUrlDict();

  async function _generationSymbolUrlDict(): Promise<Record<number, string>> {
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

  const footerSymbolId = pickRandomNumbers(footerSymbolPokeIds, 1)[0];
  const footerSymbolUrl = (await fetchStaticAddPokeData(fetch, footerSymbolId.toString())).gifUrl ?? "not_found";

  return { generationSymbolUrlDict, footerSymbolUrl };
}
