import type { TypeData, ResponseTypeJson } from "$lib/types/type";
import { convertToTypeData } from "$lib/types/type";
import type { Sprites } from "$lib/types/sprites";
import { makeSpritesArray } from "$lib/types/sprites";
import type { Stat, Stats } from "$lib/types/stats";
import { transformStats } from "$lib/types/stats";

// https://pokeapi.co/api/v2/pokemon/${idOrName}
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
  is_default: boolean; // true:通常フォルム、false:別フォルム
}

// https://pokeapi.co/api/v2/pokemon-species/${idOrName}
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
  varieties: Array<{
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
  generation: {
    name: string;
    url: string;
  };
  shape: {
    name: string;
    url: string;
  };
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface PokeData {
  id: number;
  enName: string;
  jaName: string;
  imageUrl: string | null;
  imageBackUrl: string | null;
  gifUrl: string | null;
  gifBackUrl: string | null;
  imageUrlArray: string[];
  jaGenus: string | null;
  type1: TypeData;
  type2: TypeData | null;
  height: number;
  weight: number;
  stats: Stats;
  varieties: string[];
  generation: string;
  shape: string;
  isDefault: boolean;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
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
    imageBackUrl: pokemonJson.sprites.back_default ?? null,
    gifUrl: pokemonJson.sprites.other.showdown.front_default ?? null,
    gifBackUrl: pokemonJson.sprites.other.showdown.back_default ?? null,
    imageUrlArray: makeSpritesArray(pokemonJson.sprites),
    jaGenus: speciesJson.genera.find((genus) => genus.language.name === "ja")?.genus ?? null,
    type1: convertToTypeData(type1Json),
    type2: type2Json ? convertToTypeData(type2Json) : null,
    height: pokemonJson.height,
    weight: pokemonJson.weight,
    stats: transformStats(pokemonJson.stats),
    varieties: speciesJson.varieties
      .filter((variety) => variety.pokemon.name !== pokemonJson.species.name)
      .map((variety) => variety.pokemon.name),
    generation: speciesJson.generation.name,
    shape: speciesJson.shape.name,
    isDefault: pokemonJson.is_default,
    isBaby: speciesJson.is_baby,
    isLegendary: speciesJson.is_legendary,
    isMythical: speciesJson.is_mythical,
  };
}

export interface StaticPokeData {
  jaName: string;
  jaGenus: string | null;
  imageUrl: string | null;
  imageBackUrl: string | null;
  gifUrl: string | null;
  gifBackUrl: string | null;
  type1Name: string; // 期待する値は TypeName だが、jsonファイルからstaticデータを作るためにstringにしている
  type2Name: string | null;
  height: number;
  weight: number;
  stats: Stats;
}

export function convertToStaticPokeData(pokeData: PokeData): StaticPokeData {
  return {
    jaName: pokeData.jaName,
    jaGenus: pokeData.jaGenus,
    imageUrl: pokeData.imageUrl,
    imageBackUrl: pokeData.imageBackUrl,
    gifUrl: pokeData.gifUrl,
    gifBackUrl: pokeData.gifBackUrl,
    type1Name: pokeData.type1.enName,
    type2Name: pokeData.type2?.enName ?? null,
    height: pokeData.height,
    weight: pokeData.weight,
    stats: pokeData.stats,
  };
}
