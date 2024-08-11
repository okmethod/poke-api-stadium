import type { TypeData, ResponseTypeJson } from "$lib/types/type";
import { convertToTypeData } from "$lib/types/type";
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
  imageUrl: string;
  gifUrl: string | null;
  imageUrlArray: string[];
  jaGenus: string;
  type1: TypeData;
  type2: TypeData | null;
  height: number;
  weight: number;
  stats: Stats;
}

export function convertToPokeData(
  pokemonJson: ResponsePokemonJson,
  speciesJson: ResponseSpeciesJson,
  type1Json: ResponseTypeJson,
  type2Json: ResponseTypeJson | null,
): PokeData {
  return {
    id: pokemonJson.id,
    enName: pokemonJson.species.name,
    jaName: speciesJson.names.find((name) => name.language.name === "ja")?.name ?? "???",
    imageUrl: pokemonJson.sprites.front_default,
    gifUrl: pokemonJson.sprites.other.showdown.front_default,
    imageUrlArray: makeSpritesArray(pokemonJson.sprites),
    jaGenus: speciesJson.genera.find((genus) => genus.language.name === "ja")?.genus ?? "???",
    type1: convertToTypeData(type1Json),
    type2: type2Json ? convertToTypeData(type2Json) : null,
    height: pokemonJson.height,
    weight: pokemonJson.weight,
    stats: transformStats(pokemonJson.stats),
  };
}

export interface StaticPokeData {
  jaName: string;
  imageUrl: string;
  gifUrl: string | null;
  type1Name: string; // 期待する値は TypeName だが、jsonファイルからstaticデータを作るためにstringにしている
  type2Name: string | null;
  height: number;
  weight: number;
  stats: Stats;
}

export function convertToStaticPokeData(pokeData: PokeData): StaticPokeData {
  return {
    jaName: pokeData.jaName,
    imageUrl: pokeData.imageUrl,
    gifUrl: pokeData.gifUrl,
    type1Name: pokeData.type1.enName,
    type2Name: pokeData.type2?.enName ?? null,
    height: pokeData.height,
    weight: pokeData.weight,
    stats: pokeData.stats,
  };
}
