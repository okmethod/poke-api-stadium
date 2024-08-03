import getPokemon from "$lib/api/getPokemon.client";
import getSpecies from "$lib/api/getSpecies.client";
import getType from "$lib/api/getType.client";
import { makePokeData } from "$lib/types/poke";
import type { PokeData } from "$lib/types/poke";

async function getPokeData(fetchFunction: typeof window.fetch, id: string): Promise<PokeData> {
  const pokemonJson = await getPokemon(fetchFunction, id);
  const speciesJson = await getSpecies(fetchFunction, pokemonJson.species.url);
  const type1Json = await getType(fetchFunction, pokemonJson.types[0].type.url);
  const type2Json = pokemonJson.types[1] ? await getType(fetchFunction, pokemonJson.types[1].type.url) : null;

  return makePokeData(pokemonJson, speciesJson, type1Json, type2Json);
}

export default getPokeData;
