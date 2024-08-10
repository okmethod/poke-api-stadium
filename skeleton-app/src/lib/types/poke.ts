import type { TypeName, TypeData, ResponseTypeJson } from "$lib/types/type";
import type { Sprites } from "$lib/types/sprites";
import { makeSpritesArray } from "$lib/types/sprites";
import type { Stat, Stats } from "$lib/types/stats";
import { transformStats } from "$lib/types/stats";

export interface ResponsePokemonJson {
  id: number;
  species: {
    name: string;
    url: string;
  };
  sprites: Sprites;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  weight: number;
  stats: Array<Stat>;
}

export interface ResponseSpeciesJson {
  names: Array<{
    language: {
      name: string;
    };
    name: string;
  }>;
  genera: Array<{
    language: {
      name: string;
    };
    genus: string;
  }>;
}

export interface PokeData {
  id: number;
  enName: string;
  jaName: string;
  imageUrlArray: string[];
  jaGenus: string;
  type1: TypeData;
  type2: TypeData | null;
  height: number;
  weight: number;
  stats: Stats;
}

export function makePokeData(
  pokemonJson: ResponsePokemonJson,
  speciesJson: ResponseSpeciesJson,
  type1Json: ResponseTypeJson,
  type2Json: ResponseTypeJson | null,
): PokeData {
  return {
    id: pokemonJson.id,
    enName: pokemonJson.species.name,
    jaName: speciesJson.names.find((name) => name.language.name === "ja")?.name ?? "???",
    imageUrlArray: makeSpritesArray(pokemonJson.sprites),
    jaGenus: speciesJson.genera.find((genus) => genus.language.name === "ja")?.genus ?? "???",
    type1: {
      id: type1Json.id,
      enName: pokemonJson.types[0].type.name as TypeName,
      jaName: type1Json.names.find((type) => type.language.name === "ja")?.name ?? "???",
    },
    type2:
      type2Json !== null
        ? {
            id: type2Json.id,
            enName: pokemonJson.types[1].type.name as TypeName,
            jaName: type2Json.names.find((type) => type.language.name === "ja")?.name ?? "???",
          }
        : null,
    height: pokemonJson.height,
    weight: pokemonJson.weight,
    stats: transformStats(pokemonJson.stats),
  };
}

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
