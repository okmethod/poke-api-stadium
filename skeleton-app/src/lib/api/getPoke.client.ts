import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import { makePokeData } from "$lib/types/poke";
import type { ResponsePokemonJson, ResponseSpeciesJson, PokeData } from "$lib/types/poke";

async function getPoke(fetchFunction: typeof window.fetch, id: string): Promise<PokeData> {
  const pokemon = await getPokemon(fetchFunction, id);
  const species = await getSpecies(fetchFunction, pokemon.species.url);
  return makePokeData(pokemon, species);
}

async function getPokemon(fetchFunction: typeof window.fetch, idOrName: string): Promise<ResponsePokemonJson> {
  const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponsePokemonJson;
}

async function getSpecies(fetchFunction: typeof window.fetch, url: string): Promise<ResponseSpeciesJson> {
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseSpeciesJson;
}

export default getPoke;
