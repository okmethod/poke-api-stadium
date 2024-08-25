declare const Matter: typeof import("matter-js");
import type { Point } from "$lib/types/matter";
import { getVertices, scaleVertices, convertToConvex } from "$lib/matters/calcVertices";

export async function createPokeBody(
  imageUrl: string,
  label: string | null,
  normalizeSize: number | false,
  scale: number,
  spawnPoint: Point,
): Promise<Matter.Body> {
  const vertices = await getVertices(imageUrl);

  let normalizeRatio = 1;
  let scaledVertices = vertices;
  if (normalizeSize) {
    const bounds = Matter.Bounds.create(vertices);
    const width = bounds.max.x - bounds.min.x;
    const height = bounds.max.y - bounds.min.y;
    normalizeRatio = normalizeSize / Math.max(width, height);
  }
  const adjustScale = 0.8; // 当たり判定を少し小さくする
  scaledVertices = scaleVertices(vertices, normalizeRatio * scale * adjustScale);

  const convexVertices = convertToConvex(scaledVertices);
  const pokeBody = Matter.Bodies.fromVertices(spawnPoint.x, spawnPoint.y, [convexVertices], {
    restitution: 0.2, // 反発係数
    friction: 0.1, // 摩擦係数
    // density:  // 密度
    // mass:  // 質量
    render: {
      sprite: {
        texture: imageUrl,
        xScale: normalizeRatio * scale,
        yScale: normalizeRatio * scale,
      },
    },
  });
  if (label) pokeBody.label = label;
  console.log("pokeBody", pokeBody.label);
  return pokeBody;
}
