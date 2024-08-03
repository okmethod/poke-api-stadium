import getPokemon from "$lib/api/getPokemon.client";
import getSpecies from "$lib/api/getSpecies.client";
import { makePokeData } from "$lib/types/poke";
import type { PokeData } from "$lib/types/poke";

async function getPokeData(fetchFunction: typeof window.fetch, id: string): Promise<PokeData> {
  const pokemon = await getPokemon(fetchFunction, id);
  const species = await getSpecies(fetchFunction, pokemon.species.url);
  return makePokeData(pokemon, species);
}

export default getPokeData;
