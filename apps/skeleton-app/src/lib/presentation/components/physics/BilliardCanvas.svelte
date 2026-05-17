<script lang="ts">
  import type { IBilliardGameEngine } from "$lib/application/ports/IBilliardPhysicsEngine";
  import { createImageLoader, drawBody } from "$lib/presentation/utils/canvasUtils";
  import PhysicsCanvas from "./2dPhysicsBaseCanvas.svelte";

  // エイムラインの最大引き距離表示（視覚的なフィードバック用）
  const MAX_AIM_DISPLAY = 80;

  interface Props {
    engine: IBilliardGameEngine;
    width: number;
    height: number;
  }

  let { engine, width, height }: Props = $props();

  const loadImage = createImageLoader();

  function drawFrame(ctx: CanvasRenderingContext2D): void {
    engine.tick();
    ctx.clearRect(0, 0, width, height);
    const state = engine.getState();

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
      ctx.arc(state.ballPosition.x, state.ballPosition.y, state.ballRadius + 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ゲット成功エフェクト
    if (state.phase === "caught") {
      ctx.beginPath();
      ctx.arc(state.ballPosition.x, state.ballPosition.y, state.ballRadius + 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 197, 94, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // ポケモン画像（caught 以外）
    for (const poke of state.pokemons) {
      if (poke.caught) continue;
      drawBody(
        ctx,
        { imageUrl: poke.imageUrl, position: { x: poke.x, y: poke.y }, angle: 0, radius: poke.radius },
        loadImage,
      );
    }

    // ボール
    drawBody(
      ctx,
      { imageUrl: state.ballSpriteUrl, position: state.ballPosition, angle: state.ballAngle, radius: state.ballRadius },
      loadImage,
    );
  }
</script>

<PhysicsCanvas
  {drawFrame}
  {width}
  {height}
  class="touch-none rounded-lg border-2 border-slate-600 bg-slate-900 select-none"
  onPointerDown={(p) => engine.startAim(p)}
  onPointerMove={(p) => engine.updateAim(p)}
  onPointerUp={(p) => engine.launch(p)}
/>
