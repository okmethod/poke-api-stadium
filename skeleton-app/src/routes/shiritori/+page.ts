import { fetchPokeData } from "$lib/constants/fetchStaticData";
import { getHeadChar } from "$lib/internals/shiritoriRule";
import { FIRST_POKE_ID, POKE_COUNT } from "$lib/constants/common";

export interface PokeItem {
  pokeId: number; // dictにとっては冗長だが、listで使えるようにidを持たせる
  jaName: string;
  imageUrl: string;
  isUsed: boolean; // しりとり進行中に更新されるフラグ
}

export async function load() {
  const pokeDict = await _initPokeDict();
  const groupByHeadCharDict = _groupByHeadChar(pokeDict);

  async function _initPokeDict(): Promise<Record<number, PokeItem>> {
    const keys = Array.from({ length: POKE_COUNT }, (_, i) => FIRST_POKE_ID + i);
    const pokeDict: Record<number, PokeItem> = {};
    const pokeDataPromises = keys.map(async (key) => {
      const pokeData = await fetchPokeData(key.toString());
      return {
        pokeId: key,
        jaName: pokeData.jaName,
        imageUrl: pokeData.imageUrl ?? "not_found",
        isUsed: false,
      };
    });
    const pokeDataArray = await Promise.all(pokeDataPromises);
    pokeDataArray.forEach((pokeData) => {
      pokeDict[pokeData.pokeId] = pokeData;
    });
    return pokeDict;
  }

  function _groupByHeadChar(pokeDict: Record<number, PokeItem>): Record<string, number[]> {
    return Object.entries(pokeDict).reduce(
      (acc, [pokeId, pokeData]) => {
        const firstChar = getHeadChar(pokeData.jaName);
        if (!acc[firstChar]) {
          acc[firstChar] = [];
        }
        acc[firstChar].push(Number(pokeId));
        return acc;
      },
      {} as Record<string, number[]>,
    );
  }

  return { pokeDict, groupByHeadCharDict };
}
