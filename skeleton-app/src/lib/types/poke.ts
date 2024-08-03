import type { Sprites } from "$lib/types/sprites";
import { makeSpritesArray } from "$lib/types/sprites";

// https://pokeapi.co/api/v2/pokemon の count の値
// と思いきや、図鑑番号がついていないポケモンがいるので count より小さい値になる
export const LATEST_POKEMON_ID = 1025;

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

export interface ResponseTypeJson {
  names: Array<{
    language: {
      name: string;
    };
    name: string;
  }>;
}

export interface PokeData {
  id: number;
  enName: string;
  jaName: string;
  imageUrlArray: string[];
  jaGenus: string;
  type1: {
    enName: string;
    jaName: string;
  };
  type2: {
    enName: string;
    jaName: string;
  } | null;
  height: number;
  weight: number;
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
      enName: pokemonJson.types[0].type.name,
      jaName: type1Json.names.find((type) => type.language.name === "ja")?.name ?? "???",
    },
    type2:
      type2Json !== null
        ? {
            enName: pokemonJson.types[1].type.name,
            jaName: type2Json.names.find((type) => type.language.name === "ja")?.name ?? "???",
          }
        : null,
    height: pokemonJson.height,
    weight: pokemonJson.weight,
  };
}
