/**
 * imageVertexExtractor 純粋関数のテスト
 */

import { describe, it, expect } from "vitest";
import { findEdgePixels, normalizeToRadius } from "$lib/infrastructure/adapters/imageVertexExtractor";

// width×height の Uint8ClampedArray を生成する。pixelFn は (x, y) → alpha 値を返す
function makePixelData(width: number, height: number, pixelFn: (x: number, y: number) => number): Uint8ClampedArray {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      data[(y * width + x) * 4 + 3] = pixelFn(x, y);
    }
  }
  return data;
}

describe("findEdgePixels", () => {
  it("1×1 の不透明ピクセルは輪郭として返る", () => {
    const data = makePixelData(1, 1, () => 255);
    const result = findEdgePixels(data, 1, 1);
    expect(result).toEqual([{ x: 0, y: 0 }]);
  });

  it("1×1 の透明ピクセルは空配列を返す", () => {
    const data = makePixelData(1, 1, () => 0);
    const result = findEdgePixels(data, 1, 1);
    expect(result).toEqual([]);
  });

  it("3×3 全不透明のとき中央ピクセルを除く8ピクセルが輪郭になる", () => {
    const data = makePixelData(3, 3, () => 255);
    const result = findEdgePixels(data, 3, 3);
    expect(result).toHaveLength(8);
    expect(result).not.toContainEqual({ x: 1, y: 1 }); // 中央は輪郭でない
  });

  it("3×3 で中央のみ不透明のとき中央ピクセルだけが輪郭になる", () => {
    const data = makePixelData(3, 3, (x, y) => (x === 1 && y === 1 ? 255 : 0));
    const result = findEdgePixels(data, 3, 3);
    expect(result).toEqual([{ x: 1, y: 1 }]);
  });

  it("境界ピクセルが複数条件を満たしても重複せず1回だけ含まれる（Set による重複排除）", () => {
    // 1×1 の不透明 → y=0かつx=0かつy=height-1かつx=width-1 の4条件を同時に満たすが1件だけ
    const data = makePixelData(1, 1, () => 255);
    const result = findEdgePixels(data, 1, 1);
    expect(result).toHaveLength(1);
  });

  it("完全透明の画像は空配列を返す", () => {
    const data = makePixelData(4, 4, () => 0);
    const result = findEdgePixels(data, 4, 4);
    expect(result).toEqual([]);
  });

  it("透明/不透明の混在で内部の不透明ピクセルは輪郭にならない", () => {
    // 5×5: 外枠を透明、内側3×3を不透明
    const data = makePixelData(5, 5, (x, y) => (x >= 1 && x <= 3 && y >= 1 && y <= 3 ? 255 : 0));
    const result = findEdgePixels(data, 5, 5);
    // 内側3×3の外周8ピクセルが輪郭。中央(2,2)は輪郭でない
    expect(result).toHaveLength(8);
    expect(result).not.toContainEqual({ x: 2, y: 2 });
  });
});

describe("normalizeToRadius", () => {
  it("正方形の頂点群を radius=5 でスケールすると端点の絶対値が 5 になる", () => {
    const verts = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 4 },
      { x: 0, y: 4 },
    ];
    const result = normalizeToRadius(verts, 5);
    // span=4, scale=10/4=2.5, cx=cy=2 → 端点は ±5
    expect(result).toContainEqual({ x: -5, y: -5 });
    expect(result).toContainEqual({ x: 5, y: 5 });
  });

  it("正規化後の中心が (0, 0) になる", () => {
    const verts = [
      { x: 10, y: 20 },
      { x: 30, y: 20 },
      { x: 30, y: 40 },
      { x: 10, y: 40 },
    ];
    const result = normalizeToRadius(verts, 10);
    const xs = result.map((v) => v.x);
    const ys = result.map((v) => v.y);
    // 中心 = (min+max)/2 が 0 になる
    expect((Math.min(...xs) + Math.max(...xs)) / 2).toBeCloseTo(0);
    expect((Math.min(...ys) + Math.max(...ys)) / 2).toBeCloseTo(0);
  });

  it("横長の頂点群は長辺（x方向）基準でスケールし、y方向はアスペクト比を保つ", () => {
    // 幅8, 高さ2 → span=8
    const verts = [
      { x: 0, y: 0 },
      { x: 8, y: 0 },
      { x: 8, y: 2 },
      { x: 0, y: 2 },
    ];
    const result = normalizeToRadius(verts, 4); // scale = 8/8 = 1
    const xs = result.map((v) => v.x);
    const ys = result.map((v) => v.y);
    expect(Math.max(...xs)).toBeCloseTo(4); // x方向がradius
    expect(Math.max(...ys)).toBeCloseTo(1); // y方向はアスペクト比(2/8*4=1)
  });

  it("全頂点が同一座標（span=0）のとき空配列を返す", () => {
    const verts = [
      { x: 5, y: 5 },
      { x: 5, y: 5 },
    ];
    const result = normalizeToRadius(verts, 10);
    expect(result).toEqual([]);
  });

  it("空配列を渡すと空配列を返す", () => {
    const result = normalizeToRadius([], 10);
    expect(result).toEqual([]);
  });

  it("頂点数が保持される", () => {
    const verts = Array.from({ length: 10 }, (_, i) => ({ x: i, y: i % 3 }));
    const result = normalizeToRadius(verts, 5);
    expect(result).toHaveLength(10);
  });
});
