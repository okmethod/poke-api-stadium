import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import type { ResponseTypeJson } from "$lib/types/type";

export async function getType(fetchFunction: typeof window.fetch, idOrName: string): Promise<ResponseTypeJson> {
  const url = `https://pokeapi.co/api/v2/type/${idOrName}`;
  return getTypeByUrl(fetchFunction, url);
}

export async function getTypeByUrl(fetchFunction: typeof window.fetch, url: string): Promise<ResponseTypeJson> {
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseTypeJson;
}
