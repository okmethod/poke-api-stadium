import type { PokeData } from "$lib/types/poke";

export interface StaticPokeData {
  jaName: string;
  imageUrl: string;
}

export function convertToStaticPokeData(pokeData: PokeData): StaticPokeData {
  return {
    jaName: pokeData.jaName,
    imageUrl: pokeData.imageUrlArray[0],
  };
}
