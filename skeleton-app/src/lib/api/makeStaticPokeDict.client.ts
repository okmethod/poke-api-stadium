import makePokeData from "$lib/api/makePokeData.client";
import type { StaticPokeData } from "$lib/types/poke";
import { convertToStaticPokeData } from "$lib/types/poke";

async function makeStaticPokeDict(
  fetchFunction: typeof window.fetch,
  pokeIds: number[],
): Promise<{ [pokeId: string]: StaticPokeData }> {
  const staticPokeDict: { [pokeId: string]: StaticPokeData } = {};

  const promises = pokeIds.map(async (pokeId) => {
    try {
      const pokeData = await makePokeData(fetchFunction, pokeId.toString());
      const staticPokeData = convertToStaticPokeData(pokeData);
      staticPokeDict[pokeId.toString()] = staticPokeData;
    } catch (error) {
      console.error(`Failed to fetch data for pokeId ${pokeId}:`, error);
      // エラーが発生した場合でも処理を続行するため、何もしない
    }
  });

  await Promise.all(promises);
  return staticPokeDict;
}

export default makeStaticPokeDict;
