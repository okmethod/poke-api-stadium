import { constructRequestInit, fetchApi } from "$lib/utils/request.client";
import type { ResponseTypeJson } from "$lib/types/poke";

async function getType(fetchFunction: typeof window.fetch, url: string): Promise<ResponseTypeJson> {
  const requestInit = constructRequestInit();
  const requestConfig = {
    ...requestInit,
    method: "GET",
  };
  const response = await fetchApi(fetchFunction, url, requestConfig);
  return (await response.json()) as ResponseTypeJson;
}

export default getType;
