<script lang="ts">
  import type { IBilliardPhysicsEngine } from "$lib/application/ports/IBilliardPhysicsEngine";
  import type { Point2d } from "$lib/domain/models/2dPhysics";
  import { CaptureBilliard } from "$lib/application/usecases/CaptureBilliard";
  import { createImageLoader, drawBody } from "$lib/presentation/utils/canvasUtils";
  import PhysicsCanvas from "./2dPhysicsBaseCanvas.svelte";

  // エイムラインの最大引き距離表示（視覚的なフィードバック用）
  const MAX_AIM_DISPLAY = 80;

  const { BALL_R, POKE_R } = {
    BALL_R: CaptureBilliard.GAME_CONFIG.ballRadius,
    POKE_R: CaptureBilliard.GAME_CONFIG.pokemonRadius,
  };

  interface Props {
    engine: IBilliardPhysicsEngine;
    width: number;
    height: number;
    onFrame?: () => void;
    onPointerDown?: (point: Point2d) => void;
    onPointerMove?: (point: Point2d) => void;
    onPointerUp?: (point: Point2d) => void;
  }

  let { engine, width, height, onFrame, onPointerDown, onPointerMove, onPointerUp }: Props = $props();

  const { phase, pokemons, aimOrigin, aimTarget, obstacles } = CaptureBilliard.Store;

  const loadImage = createImageLoader();

  function drawFrame(ctx: CanvasRenderingContext2D): void {
    onFrame?.();
    ctx.clearRect(0, 0, width, height);

    const ballState = engine.getState();
    const currentPhase = $phase;
    const currentAimOrigin = $aimOrigin;
    const currentAimTarget = $aimTarget;

    // フィールド枠
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);

    // 障害物（spawnPoint は center 座標）
    for (const obs of $obstacles) {
      const left = obs.spawnPoint.x - obs.width / 2;
      const top = obs.spawnPoint.y - obs.height / 2;
      ctx.fillStyle = "#475569";
      ctx.fillRect(left, top, obs.width, obs.height);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.strokeRect(left, top, obs.width, obs.height);
    }

    // エイムライン（スリングショット方向を矢印で表示）
    if (currentPhase === "aiming" && currentAimOrigin && currentAimTarget) {
      const dx = currentAimOrigin.x - currentAimTarget.x;
      const dy = currentAimOrigin.y - currentAimTarget.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        const ratio = Math.min(dist, MAX_AIM_DISPLAY) / dist;
        const arrowEndX = currentAimOrigin.x + dx * ratio;
        const arrowEndY = currentAimOrigin.y + dy * ratio;

        // 発射方向の矢印
        ctx.beginPath();
        ctx.moveTo(currentAimOrigin.x, currentAimOrigin.y);
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
        ctx.moveTo(currentAimOrigin.x, currentAimOrigin.y);
        ctx.lineTo(currentAimTarget.x, currentAimTarget.y);
        ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // ボール発射開始エリアのヒント（waiting 時のみ）
    if (currentPhase === "waiting") {
      ctx.beginPath();
      ctx.arc(ballState.position.x, ballState.position.y, BALL_R + 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ゲット成功エフェクト
    if (currentPhase === "caught") {
      ctx.beginPath();
      ctx.arc(ballState.position.x, ballState.position.y, BALL_R + 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 197, 94, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // ポケモン画像（caught 以外）
    for (const poke of $pokemons) {
      if (poke.caught) continue;
      drawBody(
        ctx,
        {
          imageUrl: poke.pokeData.imageUrls.pixel.front ?? "",
          position: poke.position,
          angle: 0,
          renderWidth: POKE_R * 2,
          renderHeight: POKE_R * 2,
        },
        loadImage,
      );
    }

    // ボール
    drawBody(
      ctx,
      {
        imageUrl: CaptureBilliard.GAME_CONFIG.ballSpriteUrl,
        position: ballState.position,
        angle: ballState.angle,
        renderWidth: BALL_R * 2,
        renderHeight: BALL_R * 2,
      },
      loadImage,
    );
  }
</script>

<PhysicsCanvas
  {drawFrame}
  {width}
  {height}
  class="touch-none rounded-lg border-2 border-slate-600 bg-slate-900 select-none"
  {onPointerDown}
  {onPointerMove}
  {onPointerUp}
/>
