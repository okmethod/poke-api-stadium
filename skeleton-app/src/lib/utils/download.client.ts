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

async function compressBlob(data: string, mimeType: string): Promise<Blob> {
  const blob = new Blob([data], { type: mimeType });
  const compressedStream = blob.stream().pipeThrough(new CompressionStream("gzip"));
  const compressedBlob = await new Response(compressedStream).blob();
  return compressedBlob;
}

export async function downloadFile(
  dataString: string,
  fileName: string,
  mimeType: string,
  useCompression: boolean,
): Promise<void> {
  console.debug("downloading:", fileName);
  try {
    let blob: Blob;
    if (useCompression) {
      blob = await compressBlob(dataString, mimeType);
      fileName += ".gz";
    } else {
      blob = new Blob([dataString], { type: mimeType });
    }
    clickDownloadLink(blob, fileName);
  } catch (error) {
    console.error(`failed to download ${fileName}:`, error);
    throw error;
  }
}
