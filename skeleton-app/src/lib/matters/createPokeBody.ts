declare const Matter: typeof import("matter-js");
import type { Point } from "$lib/types/matter";
import { getVertices } from "$lib/matters/getVertices";

export async function createPokeBody(
  imageUrl: string,
  normalizeSize: number | false,
  spawnPoint: Point,
): Promise<Matter.Body> {
  const vertices = await getVertices(imageUrl, 0.9); // 当たり判定を画像よりも少し小さくする

  let normalizeRatio = 1;
  if (normalizeSize) {
    // 頂点のバウンディングボックスを計算
    const bounds = Matter.Bounds.create(vertices);
    const width = bounds.max.x - bounds.min.x;
    const height = bounds.max.y - bounds.min.y;

    // 目標サイズを設定（例: 100x100）
    normalizeRatio = normalizeSize / Math.max(width, height);
  }
  const scaledVertices = Matter.Vertices.scale(vertices, normalizeRatio, normalizeRatio, { x: 0, y: 0 });

  // don't use poly-decomp
  return Matter.Bodies.fromVertices(spawnPoint.x, spawnPoint.y, [scaledVertices], {
    restitution: 0.2, // 反発係数
    friction: 0.1, // 摩擦係数
    density: 0.001, // 密度
    // mass:  // 質量は密度と面積から自動計算される
    render: {
      sprite: {
        texture: imageUrl,
        xScale: normalizeRatio,
        yScale: normalizeRatio,
      },
    },
  });
}
