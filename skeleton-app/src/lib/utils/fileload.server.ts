import path from "path";
import fs from "fs/promises";

export async function loadFileByNode(fileName: string): Promise<Blob> {
  // node.js専用処理
  const filePath = path.resolve("static", fileName);
  const fileBuffer = await fs.readFile(filePath);
  return new Blob([fileBuffer]);
}
