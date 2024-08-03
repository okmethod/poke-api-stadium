import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import type { ResponseSpeciesJson } from "$lib/types/poke";

async function getSpecies(fetchFunction: typeof window.fetch, url: string): Promise<ResponseSpeciesJson> {
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseSpeciesJson;
}

export default getSpecies;
