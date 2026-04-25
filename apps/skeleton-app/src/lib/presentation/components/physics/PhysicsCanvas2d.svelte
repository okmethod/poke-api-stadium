<script lang="ts">
  import { SvelteMap } from "svelte/reactivity";
  import type { I2dPhysicsEngine } from "$lib/application/ports/I2dPhysicsEngine";
  import type { Point2d } from "$lib/domain/models/2dPhysics";

  interface Props {
    engine: I2dPhysicsEngine;
    width: number;
    height: number;
  }

  let { engine, width, height }: Props = $props();

  let canvas: HTMLCanvasElement;
  // 画像キャッシュ（URL → HTMLImageElement）
  const imageCache = new SvelteMap<string, HTMLImageElement>();
  let rafId: number;

  function loadImage(url: string): HTMLImageElement {
    let img = imageCache.get(url);
    if (!img) {
      img = new Image();
      img.src = url;
      imageCache.set(url, img);
    }
    return img;
  }

  function drawFrame(): void {
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    for (const body of engine.getBodies()) {
      const img = loadImage(body.imageUrl);
      if (!img.complete || img.naturalWidth === 0) continue;

      const size = body.radius * 2;
      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  function loop(): void {
    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  $effect(() => {
    if (!canvas) return;
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  });

  // ポインターイベントをエンジンのドラッグ操作に変換する
  function toPoint(e: PointerEvent): Point2d {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e: PointerEvent): void {
    canvas.setPointerCapture(e.pointerId);
    engine.startDrag(toPoint(e));
  }

  function onPointerMove(e: PointerEvent): void {
    engine.moveDrag(toPoint(e));
  }

  function onPointerUp(): void {
    engine.endDrag();
  }
</script>

<canvas
  bind:this={canvas}
  {width}
  {height}
  onpointerdown={onPointerDown}
  onpointermove={onPointerMove}
  onpointerup={onPointerUp}
  onpointercancel={onPointerUp}
  class="border-surface-400 cursor-grab touch-none rounded border active:cursor-grabbing"
></canvas>
