import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import type { ResponsePokeJson } from "$lib/types/poke";

async function getPoke(fetchFunction: typeof window.fetch, idOrName: string): Promise<ResponsePokeJson> {
  const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponsePokeJson;
}

export default getPoke;
