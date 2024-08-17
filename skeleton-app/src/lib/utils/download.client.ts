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
