/**
 * imageVertexExtractor - 画像の輪郭頂点を抽出するユーティリティ
 *
 * @remarks
 * Canvas API を使用するためブラウザ専用。
 * インフラ層のアダプターからのみ呼び出すこと。
 */

import type { Point2d } from "$lib/domain/models/2dPhysics";

/**
 * 画像URLから輪郭頂点を抽出し、指定半径に正規化して返す。
 * 失敗時（CORS エラー・透過ピクセルなし等）は null を返す。
 */
export async function extractNormalizedVertices(imageUrl: string, targetRadius: number): Promise<Point2d[] | null> {
  try {
    const img = await loadImage(imageUrl);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const edge = findEdgePixels(data, width, height);
    if (edge.length < 3) return null;
    return normalizeToRadius(edge, targetRadius);
  } catch {
    return null;
  }
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// 非透過ピクセルのうち上下左右に透過ピクセルが隣接する輪郭ピクセルを収集する
function findEdgePixels(data: Uint8ClampedArray, width: number, height: number): Point2d[] {
  const pixels: Point2d[] = [];
  const seen = new Set<number>();

  function isTransparent(x: number, y: number): boolean {
    return data[(y * width + x) * 4 + 3] === 0;
  }

  function add(x: number, y: number): void {
    const key = y * width + x;
    if (!seen.has(key)) {
      seen.add(key);
      pixels.push({ x, y });
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!isTransparent(x, y)) {
        if (y === 0 || isTransparent(x, y - 1)) add(x, y);
        if (y === height - 1 || isTransparent(x, y + 1)) add(x, y);
        if (x === 0 || isTransparent(x - 1, y)) add(x, y);
        if (x === width - 1 || isTransparent(x + 1, y)) add(x, y);
      }
    }
  }
  return pixels;
}

// 頂点群を中心 (0,0) に移動し、targetRadius * 2 の正方形に収まるようスケールする
function normalizeToRadius(vertices: Point2d[], targetRadius: number): Point2d[] {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  for (const v of vertices) {
    if (v.x < minX) minX = v.x;
    if (v.x > maxX) maxX = v.x;
    if (v.y < minY) minY = v.y;
    if (v.y > maxY) maxY = v.y;
  }
  const span = Math.max(maxX - minX, maxY - minY);
  if (span === 0) return [];
  const scale = (targetRadius * 2) / span;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return vertices.map((v) => ({
    x: (v.x - cx) * scale,
    y: (v.y - cy) * scale,
  }));
}
