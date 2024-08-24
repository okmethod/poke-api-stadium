import makePokeData from "$lib/api/makePokeData.client";
import type { TuningPokeData } from "$lib/types/tuning";
import { convertToTuningPokeData } from "$lib/types/tuning";

async function makePokenatorTuningDict(
  fetchFunction: typeof window.fetch,
  pokeIds: number[],
): Promise<{ [pokeId: string]: TuningPokeData }> {
  const tuningPokeDict: { [pokeId: string]: TuningPokeData } = {};

  const promises = pokeIds.map(async (pokeId) => {
    try {
      const pokeData = await makePokeData(fetchFunction, pokeId.toString());
      const tuningPokeData = convertToTuningPokeData(pokeData);
      tuningPokeDict[pokeId.toString()] = tuningPokeData;
    } catch (error) {
      console.error(`Failed to fetch data for pokeId ${pokeId}:`, error);
      // エラーが発生した場合でも処理を続行するため、何もしない
    }
  });

  await Promise.all(promises);
  return tuningPokeDict;
}

export default makePokenatorTuningDict;
