import makePokeData from "$lib/api/makePokeData.client";
import type { StaticPokeData } from "$lib/types/poke";
import { convertToStaticPokeData } from "$lib/types/poke";

async function makeStaticPokeDict(
  fetchFunction: typeof window.fetch,
  pokeIds: number[],
): Promise<{ [pokeId: string]: StaticPokeData }> {
  const staticPokeDict: { [pokeId: string]: StaticPokeData } = {};

  const promises = pokeIds.map(async (pokeId) => {
    const pokeData = await makePokeData(fetchFunction, pokeId.toString());
    const staticPokeData = convertToStaticPokeData(pokeData);
    staticPokeDict[pokeId.toString()] = staticPokeData;
  });

  await Promise.all(promises);
  return staticPokeDict;
}

export default makeStaticPokeDict;
