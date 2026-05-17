<script lang="ts">
  import type { IPinballPhysicsEngine } from "$lib/application/ports/IPinballPhysicsEngine";
  import { PokePinball } from "$lib/application/usecases/PokePinball";
  import { createImageLoader, drawBody } from "$lib/presentation/utils/canvasUtils";
  import PhysicsCanvas from "./2dPhysicsBaseCanvas.svelte";

  const { GAME_CONFIG, FLIPPER_CONFIG } = PokePinball;
  const { canvasWidth: W, canvasHeight: H, ballRadius: BALL_R, bumperRadius: BUMPER_R, ballSpriteUrl } = GAME_CONFIG;
  const { leftPivot: L_PIVOT, rightPivot: R_PIVOT, length: F_LEN, height: F_H } = FLIPPER_CONFIG;

  interface Props {
    engine: IPinballPhysicsEngine;
    onFrame?: () => void;
  }

  let { engine, onFrame }: Props = $props();

  const loadImage = createImageLoader();

  function drawFlipper(ctx: CanvasRenderingContext2D, pivot: { x: number; y: number }, angle: number): void {
    ctx.save();
    ctx.translate(pivot.x, pivot.y);
    ctx.rotate(angle);

    // ピボットを起点に angle 方向へ F_LEN 延びる（左右共通）
    const startX = 0;
    const r = F_H / 2;

    ctx.beginPath();
    ctx.moveTo(startX, -r);
    ctx.lineTo(startX + F_LEN, -r);
    ctx.arc(startX + F_LEN, 0, r, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(startX, r);
    ctx.arc(startX, 0, r, Math.PI / 2, -Math.PI / 2);
    ctx.closePath();
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
    ctx.strokeStyle = "#93c5fd";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();
  }

  function drawFrame(ctx: CanvasRenderingContext2D): void {
    onFrame?.();

    const state = engine.getState();
    ctx.clearRect(0, 0, W, H);

    // 背景
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, W, H);

    // テーブル枠（左・右・上辺のみ、下は開放）
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(1, H);
    ctx.lineTo(1, 1);
    ctx.lineTo(W - 1, 1);
    ctx.lineTo(W - 1, H);
    ctx.stroke();

    // コーナーガイド線（視覚的なヒント）
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 490);
    ctx.lineTo(L_PIVOT.x, L_PIVOT.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(W, 490);
    ctx.lineTo(R_PIVOT.x, R_PIVOT.y);
    ctx.stroke();

    // バンパー（ポケモン画像 + 外枠）
    for (const bumper of state.bumpers) {
      // 外枠（命中時は明るく光る演出としてスピン速度が高いときに色を変える）
      ctx.beginPath();
      ctx.arc(bumper.position.x, bumper.position.y, BUMPER_R + 2, 0, Math.PI * 2);
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 2;
      ctx.stroke();

      drawBody(
        ctx,
        {
          imageUrl: bumper.imageUrl,
          position: bumper.position,
          angle: bumper.angle,
          renderWidth: BUMPER_R * 2,
          renderHeight: BUMPER_R * 2,
        },
        loadImage,
      );
    }

    // フリッパー
    drawFlipper(ctx, L_PIVOT, state.leftFlipperAngle);
    drawFlipper(ctx, R_PIVOT, state.rightFlipperAngle);

    // ボール
    if (!state.isBallLost) {
      drawBody(
        ctx,
        {
          imageUrl: ballSpriteUrl,
          position: state.ballPosition,
          angle: state.ballAngle,
          renderWidth: BALL_R * 2,
          renderHeight: BALL_R * 2,
        },
        loadImage,
      );
    }
  }
</script>

<PhysicsCanvas
  {drawFrame}
  width={W}
  height={H}
  class="touch-none rounded-lg border-2 border-slate-700 bg-slate-900 select-none"
/>
