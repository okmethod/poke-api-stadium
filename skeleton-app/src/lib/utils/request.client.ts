export function constructRequestInit(): RequestInit {
  const requestInit = {
    credentials: "same-origin",
  } as RequestInit;
  return requestInit;
}

export async function fetchApi(
  fetchFunction: typeof fetch,
  url: string,
  requestConfig: RequestInit,
): Promise<Response> {
  try {
    const response = await fetchFunction(url, requestConfig);
    if (!response.ok) {
      console.error("API response:", response.status);
      throw new Error(`Failed to fetch: ${requestConfig.method} ${url}`);
    }
    return response;
  } catch (e) {
    console.error("API error:", e);
    throw new Error(`Failed to fetch: ${requestConfig.method} ${url}`);
  }
}

export async function fetchImageUrlToBlob(fetchFunction: typeof fetch, imageUrl: string) {
  try {
    const response = await fetchFunction(imageUrl);
    if (!response.ok) {
      console.error("fetch image response:", response.status);
      throw new Error("Failed to fetch image");
    }
    const blob = await response.blob();
    return blob;
  } catch (e) {
    console.error("fetch image error:", e);
    throw e;
  }
}
