import { browser } from "$app/environment";
import { base } from "$app/paths";

const isDevelopment = (import.meta.env.MODE as string) === "development";

async function decompressBlob(compressedBlob: Blob): Promise<string> {
  const decompressedStream = compressedBlob.stream().pipeThrough(new DecompressionStream("gzip"));
  const decompressedBlob = await new Response(decompressedStream).blob();
  const text = await decompressedBlob.text();
  return text;
}

export async function loadCompressedFile(
  fetchFunction: typeof window.fetch,
  fileName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ [key: string]: any }> {
  console.debug("loading: ", fileName);
  try {
    if (isDevelopment) {
      if (browser) {
        console.debug("isDevelopment browser");
        const filePath = `${base}/${fileName}`;
        const response = await fetchFunction(filePath);
        const blob = await response.blob();
        const jsonData = await blob.text();
        return JSON.parse(jsonData);
      } else {
        console.debug("isDevelopment not browser");
        const { loadFileByNode } = await import("$lib/utils/fileload.server");
        const blob = await loadFileByNode(fileName);
        const jsonData = await decompressBlob(blob);
        return JSON.parse(jsonData);
      }
    } else {
      console.debug("isProduction");
      const filePath = `${base}/${fileName}`;
      const response = await fetchFunction(filePath);
      const blob = await response.blob();
      const jsonData = await decompressBlob(blob);
      return JSON.parse(jsonData);
    }
  } catch (error) {
    console.error(`failed to load ${fileName}:`, error);
    throw error;
  }
}
