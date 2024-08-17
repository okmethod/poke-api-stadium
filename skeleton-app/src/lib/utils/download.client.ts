import { base } from "$app/paths";

const isDevelopment = (import.meta.env.MODE as string) === "development";

function clickDownloadLink(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadFile(data: string, fileName: string, mimeType: string): void {
  const blob = new Blob([data], { type: mimeType });
  clickDownloadLink(blob, fileName);
}

async function compressData(data: string, mimeType: string): Promise<Blob> {
  const blob = new Blob([data], { type: mimeType });
  const compressedStream = blob.stream().pipeThrough(new CompressionStream("gzip"));
  const compressedBlob = await new Response(compressedStream).blob();
  return compressedBlob;
}

async function decompressBlob(compressedBlob: Blob): Promise<string> {
  const decompressedStream = compressedBlob.stream().pipeThrough(new DecompressionStream("gzip"));
  const decompressedBlob = await new Response(decompressedStream).blob();
  const text = await decompressedBlob.text();
  return text;
}

async function downloadCompressedFile(data: string, fileName: string, mimeType: string): Promise<void> {
  const compressedBlob = await compressData(data, mimeType);
  clickDownloadLink(compressedBlob, fileName + ".gz");
}

export async function downloadJsonFile(jsonData: string, fileName: string, useCompression: boolean): Promise<void> {
  console.log("downloading:", fileName);
  try {
    if (useCompression) {
      await downloadCompressedFile(jsonData, fileName, "application/json");
    } else {
      downloadFile(jsonData, fileName, "application/json");
    }
  } catch (error) {
    console.error(`failed to download ${fileName}:`, error);
    throw error;
  }
}

export async function loadCompressedFile(
  fetchFunction: typeof window.fetch,
  fileName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ [key: string]: any }> {
  const filePath = `${base}/${fileName}`;
  console.log("loading: ", filePath);
  try {
    const response = await fetchFunction(filePath);
    const blob = await response.blob();
    let jsonData: string;
    if (isDevelopment) {
      jsonData = await blob.text();
    } else {
      jsonData = await decompressBlob(blob);
    }
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`failed to load ${filePath}:`, error);
    throw error;
  }
}
