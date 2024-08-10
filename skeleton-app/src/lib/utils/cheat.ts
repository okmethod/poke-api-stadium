import getPokeData from "$lib/api/getPokeData.client";
import type { StaticPokeData } from "$lib/types/poke";
import { convertToStaticPokeData } from "$lib/types/poke";

export async function generateStaticPokeDict(
  fetchFunction: typeof window.fetch,
  pokeIds: number[],
): Promise<{ [pokeId: string]: StaticPokeData }> {
  const staticPokeDict: { [pokeId: string]: StaticPokeData } = {};

  const promises = pokeIds.map(async (pokeId) => {
    const pokeData = await getPokeData(fetchFunction, pokeId.toString());
    const staticPokeData = convertToStaticPokeData(pokeData);
    staticPokeDict[pokeId.toString()] = staticPokeData;
  });

  await Promise.all(promises);
  return staticPokeDict;
}
