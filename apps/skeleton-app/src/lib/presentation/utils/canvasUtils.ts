/**
 * canvasUtils - canvas 描画に共通するユーティリティ
 *
 * @architecture レイヤー間依存ルール - プレゼン層
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte コンポーネント / インフラ層への依存
 */

import { SvelteMap } from "svelte/reactivity";
import type { Point2d } from "$lib/domain/models/2dPhysics";

/** canvas に描画できる物理ボディの最小インターフェース */
export interface DrawableBody {
  readonly imageUrl: string;
  readonly position: Point2d;
  readonly angle: number;
  readonly radius: number;
}

/** 画像ローダーを生成する。コンポーネントごとに独立したキャッシュを持つ */
export function createImageLoader(): (url: string) => HTMLImageElement {
  const cache = new SvelteMap<string, HTMLImageElement>();
  return (url: string): HTMLImageElement => {
    let img = cache.get(url);
    if (!img) {
      img = new Image();
      img.src = url;
      cache.set(url, img);
    }
    return img;
  };
}

/** PointerEvent の座標を canvas 論理座標（CSS スケール補正済み）に変換する */
export function toCanvasPoint(e: PointerEvent, canvas: HTMLCanvasElement, width: number, height: number): Point2d {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (width / rect.width),
    y: (e.clientY - rect.top) * (height / rect.height),
  };
}

/** 物理ボディを canvas に1体分描画する */
export function drawBody(
  ctx: CanvasRenderingContext2D,
  body: DrawableBody,
  loadImage: (url: string) => HTMLImageElement,
): void {
  if (!body.imageUrl) return;
  const img = loadImage(body.imageUrl);
  if (!img.complete || img.naturalWidth === 0) return;
  const size = body.radius * 2;
  ctx.save();
  ctx.translate(body.position.x, body.position.y);
  ctx.rotate(body.angle);
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
}
