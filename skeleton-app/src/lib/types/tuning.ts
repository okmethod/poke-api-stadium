import type { PokeData } from "$lib/types/poke";

export interface TuningPokeData {
  jaName: string;
  jaGenus: string | null;
  //imageUrl: string | null;
  //imageBackUrl: string | null;
  //gifUrl: string | null;
  //gifBackUrl: string | null;
  // generation: string;
  type1Name: string;
  type2Name: string | null;
  height: number;
  weight: number;
  // evolveTo: string;
  // evolveFrom: string;
  shape: string;
  // isBaby: boolean;
  isLegendary: boolean;
}

export function convertToTuningPokeData(pokeData: PokeData): TuningPokeData {
  return {
    名前: pokeData.jaName,
    分類: pokeData.jaGenus,
    タイプ1: pokeData.type1.jaName,
    タイプ2: pokeData.type2?.jaName ?? null,
    たかさ: pokeData.height,
    おもさ: pokeData.weight,
    すがた: pokeData.shape,
    伝説: pokeData.isLegendary || pokeData.isMythical,
  };
}
