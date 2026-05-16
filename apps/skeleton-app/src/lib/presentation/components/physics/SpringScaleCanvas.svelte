<script lang="ts">
  import { SvelteMap } from "svelte/reactivity";
  import type { ISpringScaleEngine } from "$lib/application/ports/ISpringScaleEngine";

  interface Props {
    engine: ISpringScaleEngine;
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

  /** 破断したバネを描画する（上部に少しコイルを残して切れた表現） */
  function drawBrokenSpring(ctx: CanvasRenderingContext2D, centerX: number, y1: number): void {
    const breakY = y1 + 40;
    // 上部の短いコイル
    const COILS = 2;
    const COIL_WIDTH = 10;
    const segH = 36 / (COILS * 2);
    ctx.beginPath();
    ctx.moveTo(centerX, y1);
    ctx.lineTo(centerX, y1 + 4);
    for (let i = 0; i < COILS * 2; i++) {
      const yp = y1 + 4 + (i + 1) * segH;
      ctx.lineTo(centerX + (i % 2 === 0 ? COIL_WIDTH : -COIL_WIDTH), yp);
    }
    ctx.lineTo(centerX, breakY);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  /** バネのコイル（ジグザグ）を描画する */
  function drawSpring(ctx: CanvasRenderingContext2D, centerX: number, y1: number, y2: number): void {
    const COILS = 7;
    const COIL_WIDTH = 10;
    const END_STRAIGHT = 6;

    const springLen = y2 - y1 - END_STRAIGHT * 2;
    if (springLen <= 0) return;

    const segH = springLen / (COILS * 2);

    ctx.beginPath();
    ctx.moveTo(centerX, y1);
    ctx.lineTo(centerX, y1 + END_STRAIGHT);

    for (let i = 0; i < COILS * 2; i++) {
      const yPos = y1 + END_STRAIGHT + (i + 1) * segH;
      const xPos = centerX + (i % 2 === 0 ? COIL_WIDTH : -COIL_WIDTH);
      ctx.lineTo(xPos, yPos);
    }

    ctx.lineTo(centerX, y2);
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  /** 台と返しを一体のトレー形状として描画する */
  function drawPlatformTray(
    ctx: CanvasRenderingContext2D,
    state: ReturnType<ISpringScaleEngine["getState"]>,
    canvasWidth: number,
  ): void {
    const GUARD_W = 10;
    const GUARD_H = 24;
    const R = 3;
    const cx = canvasWidth / 2;
    const pw = state.platformWidth;
    const lgLeft = cx - pw / 2 - GUARD_W / 2;
    const lgRight = cx - pw / 2 + GUARD_W / 2;
    const rgLeft = cx + pw / 2 - GUARD_W / 2;
    const rgRight = cx + pw / 2 + GUARD_W / 2;
    const pTop = state.platformY - state.platformThickness / 2;
    const pBottom = pTop + state.platformThickness;
    const gTop = pTop - GUARD_H;

    ctx.fillStyle = "#374151";
    ctx.beginPath();
    // 外周を時計回りにトレース（凸角はR丸め、内側の凹角はシャープ）
    ctx.moveTo(lgLeft + R, gTop);
    ctx.arcTo(lgLeft, gTop, lgLeft, gTop + R, R);
    ctx.lineTo(lgLeft, pBottom - R);
    ctx.arcTo(lgLeft, pBottom, lgLeft + R, pBottom, R);
    ctx.lineTo(rgRight - R, pBottom);
    ctx.arcTo(rgRight, pBottom, rgRight, pBottom - R, R);
    ctx.lineTo(rgRight, gTop + R);
    ctx.arcTo(rgRight, gTop, rgRight - R, gTop, R);
    ctx.lineTo(rgLeft, gTop);
    ctx.lineTo(rgLeft, pTop);
    ctx.lineTo(lgRight, pTop);
    ctx.lineTo(lgRight, gTop);
    ctx.closePath();
    ctx.fill();
  }

  /** 右側のゲージ（目標マーカー付き）を描画する */
  function drawGauge(
    ctx: CanvasRenderingContext2D,
    state: ReturnType<ISpringScaleEngine["getState"]>,
    canvasWidth: number,
  ): void {
    const gaugeX = canvasWidth - 18;
    const gaugeTop = state.emptyY - 20;
    const gaugeBottom = Math.min(height - 16, state.targetY + 80);
    const clampedPlatformY = Math.max(gaugeTop, Math.min(gaugeBottom, state.platformY));

    // ゲージの縦線
    ctx.strokeStyle = "#d1d5db";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gaugeX, gaugeTop);
    ctx.lineTo(gaugeX, gaugeBottom);
    ctx.stroke();

    // 目標ラインのマーカー（オレンジ）
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(gaugeX - 6, state.targetY - 2, 12, 4);
    ctx.font = "bold 10px sans-serif";
    ctx.fillStyle = "#d97706";
    ctx.textAlign = "right";
    ctx.fillText("100kg", gaugeX + 16, state.targetY + 16);

    // 現在位置のポインター（青い三角）
    ctx.fillStyle = "#3b82f6";
    ctx.beginPath();
    ctx.moveTo(gaugeX - 12, clampedPlatformY - 6);
    ctx.lineTo(gaugeX - 12, clampedPlatformY + 6);
    ctx.lineTo(gaugeX - 2, clampedPlatformY);
    ctx.closePath();
    ctx.fill();
  }

  function drawFrame(): void {
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    const state = engine.getState();

    const platformTop = state.platformY - state.platformThickness / 2;
    const springBottomY = platformTop;

    // アンカーフック（天井の固定点）
    ctx.fillStyle = "#4b5563";
    ctx.beginPath();
    ctx.arc(state.platformWidth / 2 + (width - state.platformWidth) / 2, state.anchorY, 5, 0, Math.PI * 2);
    ctx.fill();

    // バネ（破断時は破断ビジュアル）
    const anchorX = width / 2;
    if (state.isBroken) {
      drawBrokenSpring(ctx, anchorX, state.anchorY + 5);
    } else {
      drawSpring(ctx, anchorX, state.anchorY + 5, springBottomY);
    }

    // 台と返し（一体トレー形状）
    drawPlatformTray(ctx, state, width);

    // ポケモン画像
    for (const body of state.pokeBodies) {
      if (!body.imageUrl) continue;
      const img = loadImage(body.imageUrl);
      if (!img.complete || img.naturalWidth === 0) continue;
      const size = body.radius * 2;
      ctx.save();
      ctx.translate(body.position.x, body.position.y);
      ctx.rotate(body.angle);
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    // 右側ゲージ
    drawGauge(ctx, state, width);
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
