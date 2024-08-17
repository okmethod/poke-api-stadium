declare const Matter: typeof import("matter-js");
import type { Point } from "$lib/types/matter";
import { getVertices } from "$lib/matters/getVertices";

export async function createPokeBody(imageUrl: string, scale: number, spawnPoint: Point): Promise<Matter.Body> {
  const vertices = await getVertices(imageUrl, scale * 0.9);
  // don't use poly-decomp
  return Matter.Bodies.fromVertices(spawnPoint.x, spawnPoint.y, [vertices], {
    restitution: 0.2, // 反発係数
    friction: 0.1, // 摩擦係数
    density: 0.001, // 密度
    // mass:  // 質量は密度と面積から自動計算される
    render: {
      sprite: {
        texture: imageUrl,
        xScale: scale,
        yScale: scale,
      },
    },
  });
}
