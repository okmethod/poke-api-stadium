export interface ResponsePokemonJson {
  id: number;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
  };
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
}

export interface PokeData {
  id: number;
  enName: string;
  jaName: string;
  imageUrl: string;
  type1Name: string;
  type2Name: string | null;
  height: number;
  weight: number;
}

export function makePokeData(pokemonJson: ResponsePokemonJson, speciesJson: ResponseSpeciesJson): PokeData {
  const jaName = speciesJson.names.find((name) => name.language.name === "ja")?.name ?? "";

  return {
    id: pokemonJson.id,
    enName: pokemonJson.species.name,
    jaName: jaName,
    imageUrl: pokemonJson.sprites.front_default,
    type1Name: pokemonJson.types[0].type.name,
    type2Name: pokemonJson.types[1]?.type.name ?? null,
    height: pokemonJson.height,
    weight: pokemonJson.weight,
  };
}
