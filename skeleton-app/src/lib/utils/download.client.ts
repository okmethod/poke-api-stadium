function clickDownloadLink(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadFile(data: string, fileName: string, mimeType: string) {
  const blob = new Blob([data], { type: mimeType });
  clickDownloadLink(blob, fileName);
}

async function compressData(data: string, mimeType: string): Promise<Blob> {
  const blob = new Blob([data], { type: mimeType });
  const compressedStream = blob.stream().pipeThrough(new CompressionStream("gzip"));
  const compressedBlob = await new Response(compressedStream).blob();
  return compressedBlob;
}

export async function decompressBlob(compressedBlob: Blob): Promise<string> {
  const decompressedStream = compressedBlob.stream().pipeThrough(new DecompressionStream("gzip"));
  const decompressedBlob = await new Response(decompressedStream).blob();
  const text = await decompressedBlob.text();
  return text;
}

export async function downloadCompressedFile(data: string, fileName: string, mimeType: string) {
  const compressedBlob = await compressData(data, mimeType);
  clickDownloadLink(compressedBlob, fileName + ".gz");
}

export async function downloadJsonFile(jsonData: string, fileName: string, useCompression: boolean) {
  if (useCompression) {
    await downloadCompressedFile(jsonData, fileName, "application/json");
  } else {
    downloadFile(jsonData, fileName, "application/json");
  }
}
