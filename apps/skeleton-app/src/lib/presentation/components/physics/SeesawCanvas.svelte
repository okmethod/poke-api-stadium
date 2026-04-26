<script lang="ts">
  import { SvelteMap } from "svelte/reactivity";
  import type { ISeesawPhysicsEngine } from "$lib/application/ports/ISeesawPhysicsEngine";

  interface Props {
    engine: ISeesawPhysicsEngine;
    width: number;
    height: number;
  }

  let { engine, width, height }: Props = $props();

  let canvas: HTMLCanvasElement;
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
    const state = engine.getState();

    // 支点（三角形）
    const { x: px, y: py } = state.pivotPoint;
    const halfBase = 16;
    const triHeight = 22;
    ctx.beginPath();
    ctx.moveTo(px, py + state.plankThickness / 2);
    ctx.lineTo(px - halfBase, py + state.plankThickness / 2 + triHeight);
    ctx.lineTo(px + halfBase, py + state.plankThickness / 2 + triHeight);
    ctx.closePath();
    ctx.fillStyle = "#6b7280";
    ctx.fill();

    // プランク（シーソーの板）
    ctx.save();
    ctx.translate(state.plankPosition.x, state.plankPosition.y);
    ctx.rotate(state.plankAngle);
    ctx.fillStyle = "#374151";
    ctx.fillRect(-state.plankWidth / 2, -state.plankThickness / 2, state.plankWidth, state.plankThickness);
    ctx.restore();

    // ポケモン画像
    for (const body of state.pokeBodies) {
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
</script>

<canvas bind:this={canvas} {width} {height} class="border-surface-400 rounded border"></canvas>
