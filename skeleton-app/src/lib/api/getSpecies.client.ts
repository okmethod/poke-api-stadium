import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import type { ResponseSpeciesJson } from "$lib/types/poke";

export async function getSpecies(fetchFunction: typeof window.fetch, idOrName: string): Promise<ResponseSpeciesJson> {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`;
  return getSpeciesByUrl(fetchFunction, url);
}

export async function getSpeciesByUrl(fetchFunction: typeof window.fetch, url: string): Promise<ResponseSpeciesJson> {
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseSpeciesJson;
}
