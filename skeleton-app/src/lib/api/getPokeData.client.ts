import { getPokemon } from "$lib/api/getPokemon.client";
import { getSpeciesByUrl } from "$lib/api/getSpecies.client";
import { getTypeByUrl } from "$lib/api/getType.client";
import { convertToPokeData } from "$lib/types/poke";
import type { PokeData } from "$lib/types/poke";

async function getPokeData(fetchFunction: typeof window.fetch, id: string): Promise<PokeData> {
  const pokemonJson = await getPokemon(fetchFunction, id);
  const speciesJson = await getSpeciesByUrl(fetchFunction, pokemonJson.species.url);
  const type1Json = await getTypeByUrl(fetchFunction, pokemonJson.types[0].type.url);
  const type2Json = pokemonJson.types[1] ? await getTypeByUrl(fetchFunction, pokemonJson.types[1].type.url) : null;

  return convertToPokeData(pokemonJson, speciesJson, type1Json, type2Json);
}

export default getPokeData;
