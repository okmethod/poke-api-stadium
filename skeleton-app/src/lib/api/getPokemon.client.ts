import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import type { ResponsePokemonJson } from "$lib/types/poke";

export async function getPokemon(fetchFunction: typeof window.fetch, idOrName: string): Promise<ResponsePokemonJson> {
  const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  return getPokemonByUrl(fetchFunction, url);
}

export async function getPokemonByUrl(fetchFunction: typeof window.fetch, url: string): Promise<ResponsePokemonJson> {
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponsePokemonJson;
}
