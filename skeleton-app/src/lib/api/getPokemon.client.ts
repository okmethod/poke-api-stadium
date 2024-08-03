import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import type { ResponsePokemonJson } from "$lib/types/poke";

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

export default getPokemon;
