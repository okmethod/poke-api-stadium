import type { PokeData } from "$lib/types/poke";
import { formatHeightWeight } from "$lib/utils/numerics";

export interface TuningPokeData {
  名前: string;
  分類: string | null;
  // imageUrl: string | null;
  // imageBackUrl: string | null;
  // gifUrl: string | null;
  // gifBackUrl: string | null;
  // generation: string;
  タイプ1: string;
  タイプ2: string | null;
  高さ: string;
  重さ: string;
  // evolveTo: string;
  // evolveFrom: string;
  姿: string | null;
  // isBaby: boolean;
  伝説である: boolean;
}

export function convertToTuningPokeData(pokeData: PokeData): TuningPokeData {
  return {
    名前: pokeData.jaName,
    分類: pokeData.jaGenus,
    タイプ1: pokeData.type1.jaName,
    タイプ2: pokeData.type2?.jaName ?? null,
    高さ: formatHeightWeight(pokeData.height, "height"),
    重さ: formatHeightWeight(pokeData.weight, "weight"),
    姿: pokeData.shape,
    伝説である: pokeData.isLegendary || pokeData.isMythical,
  };
}
