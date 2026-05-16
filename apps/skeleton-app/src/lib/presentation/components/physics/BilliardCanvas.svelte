<script lang="ts">
  import { SvelteMap } from "svelte/reactivity";
  import { GAME_CONFIG } from "$lib/application/usecases/CaptureBilliard/facade";
  import type { IBilliardGameEngine } from "$lib/application/ports/IBilliardPhysicsEngine";
  import type { Point2d } from "$lib/domain/models/2dPhysics";

  const { ballRadius: BALL_R, ballStartX: BALL_X0, ballStartY: BALL_Y0 } = GAME_CONFIG;

  // エイムラインの最大引き距離表示（視覚的なフィードバック用）
  const MAX_AIM_DISPLAY = 80;

  interface Props {
    engine: IBilliardGameEngine;
    width: number;
    height: number;
  }

  let { engine, width, height }: Props = $props();

  let canvas: HTMLCanvasElement;
  let isPointerDown = $state(false);
  let rafId: number;
  const imageCache = new SvelteMap<string, HTMLImageElement>();

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
    const state = engine.getState();

    ctx.clearRect(0, 0, width, height);

    // フィールド枠
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // 障害物
    for (const obs of state.obstacles) {
      ctx.fillStyle = "#475569";
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    }

    // エイムライン（スリングショット方向を矢印で表示）
    if (state.phase === "aiming" && state.aimOrigin && state.aimTarget) {
      const dx = state.aimOrigin.x - state.aimTarget.x;
      const dy = state.aimOrigin.y - state.aimTarget.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        const ratio = Math.min(dist, MAX_AIM_DISPLAY) / dist;
        const arrowEndX = state.aimOrigin.x + dx * ratio;
        const arrowEndY = state.aimOrigin.y + dy * ratio;

        // 発射方向の矢印
        ctx.beginPath();
        ctx.moveTo(state.aimOrigin.x, state.aimOrigin.y);
        ctx.lineTo(arrowEndX, arrowEndY);
        ctx.strokeStyle = "rgba(251, 191, 36, 0.85)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // 矢印先端
        const angle = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.moveTo(arrowEndX, arrowEndY);
        ctx.lineTo(arrowEndX - 10 * Math.cos(angle - 0.4), arrowEndY - 10 * Math.sin(angle - 0.4));
        ctx.lineTo(arrowEndX - 10 * Math.cos(angle + 0.4), arrowEndY - 10 * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = "rgba(251, 191, 36, 0.85)";
        ctx.fill();

        // 引っ張り線（ドラッグ位置まで）
        ctx.beginPath();
        ctx.moveTo(state.aimOrigin.x, state.aimOrigin.y);
        ctx.lineTo(state.aimTarget.x, state.aimTarget.y);
        ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // ボール発射開始エリアのヒント（waiting 時のみ）
    if (state.phase === "waiting") {
      ctx.beginPath();
      ctx.arc(BALL_X0, BALL_Y0, BALL_R + 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ゲット成功エフェクト
    if (state.phase === "caught") {
      ctx.beginPath();
      ctx.arc(state.ballPosition.x, state.ballPosition.y, BALL_R + 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 197, 94, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // ポケモン画像（caught 以外）
    for (const poke of state.pokemons) {
      if (poke.caught) continue;
      const img = loadImage(poke.imageUrl);
      if (!img.complete || img.naturalWidth === 0) continue;
      const size = poke.radius * 2;
      ctx.save();
      ctx.translate(poke.x, poke.y);
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    // ボール
    const ballImg = loadImage(state.ballSpriteUrl);
    if (ballImg.complete && ballImg.naturalWidth > 0) {
      const size = BALL_R * 2;
      ctx.save();
      ctx.translate(state.ballPosition.x, state.ballPosition.y);
      ctx.rotate(state.ballAngle);
      ctx.drawImage(ballImg, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  function loop(): void {
    engine.tick();
    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  $effect(() => {
    if (!canvas) return;
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  });

  function getCanvasPoint(e: PointerEvent): Point2d {
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function handlePointerDown(e: PointerEvent): void {
    e.preventDefault();
    isPointerDown = true;
    engine.startAim(getCanvasPoint(e));
  }

  function handlePointerMove(e: PointerEvent): void {
    if (!isPointerDown) return;
    e.preventDefault();
    engine.updateAim(getCanvasPoint(e));
  }

  function handlePointerUp(e: PointerEvent): void {
    if (!isPointerDown) return;
    e.preventDefault();
    isPointerDown = false;
    engine.launch(getCanvasPoint(e));
  }
</script>

<canvas
  bind:this={canvas}
  {width}
  {height}
  class="touch-none rounded-lg border-2 border-slate-600 bg-slate-900 select-none"
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerUp}
  onpointerleave={handlePointerUp}
></canvas>
