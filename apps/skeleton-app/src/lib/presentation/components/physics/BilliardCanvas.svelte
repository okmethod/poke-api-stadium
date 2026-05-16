<script lang="ts">
  import { GAME_CONFIG } from "$lib/application/usecases/CaptureBilliard/facade";
  import type {
    BilliardObstacle,
    BilliardPhase,
    BilliardPokemon,
  } from "$lib/application/usecases/CaptureBilliard/store";
  import type { Point2d } from "$lib/domain/models/2dPhysics";

  const {
    canvasWidth: W,
    canvasHeight: H,
    ballRadius: BALL_R,
    pokemonRadius: POKE_R,
    ballStartX: BALL_X0,
    ballStartY: BALL_Y0,
  } = GAME_CONFIG;

  // エイムラインの最大引き距離表示（視覚的なフィードバック用）
  const MAX_AIM_DISPLAY = 80;

  interface Props {
    phase: BilliardPhase;
    ballSpriteUrl: string;
    ballPosition: Point2d;
    pokemons: BilliardPokemon[];
    obstacles: BilliardObstacle[];
    aimOrigin: Point2d | null;
    aimTarget: Point2d | null;
    onPointerDown: (point: Point2d) => void;
    onPointerMove: (point: Point2d) => void;
    onPointerUp: (point: Point2d) => void;
  }

  let {
    phase,
    ballSpriteUrl,
    ballPosition,
    pokemons,
    obstacles,
    aimOrigin,
    aimTarget,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }: Props = $props();

  let canvas = $state<HTMLCanvasElement | null>(null);
  let isPointerDown = $state(false);

  // 障害物・エイムラインのみキャンバスで描画する
  $effect(() => {
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);

    // フィールド枠
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, W - 2, H - 2);

    // 障害物
    for (const obs of obstacles) {
      ctx.fillStyle = "#475569";
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 1;
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
    }

    // エイムライン（スリングショット方向を矢印で表示）
    if (phase === "aiming" && aimOrigin && aimTarget) {
      const dx = aimOrigin.x - aimTarget.x;
      const dy = aimOrigin.y - aimTarget.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 5) {
        const ratio = Math.min(dist, MAX_AIM_DISPLAY) / dist;
        const arrowEndX = aimOrigin.x + dx * ratio;
        const arrowEndY = aimOrigin.y + dy * ratio;

        // 発射方向の矢印
        ctx.beginPath();
        ctx.moveTo(aimOrigin.x, aimOrigin.y);
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
        ctx.moveTo(aimOrigin.x, aimOrigin.y);
        ctx.lineTo(aimTarget.x, aimTarget.y);
        ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // ボール発射開始エリアのヒント（waiting 時のみ）
    if (phase === "waiting") {
      ctx.beginPath();
      ctx.arc(BALL_X0, BALL_Y0, BALL_R + 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(251, 191, 36, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // ゲット成功エフェクト
    if (phase === "caught") {
      ctx.beginPath();
      ctx.arc(ballPosition.x, ballPosition.y, BALL_R + 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 197, 94, 0.25)";
      ctx.fill();
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });

  function getCanvasPoint(e: PointerEvent): Point2d {
    const rect = canvas!.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  }

  function handlePointerDown(e: PointerEvent): void {
    e.preventDefault();
    isPointerDown = true;
    onPointerDown(getCanvasPoint(e));
  }

  function handlePointerMove(e: PointerEvent): void {
    if (!isPointerDown) return;
    e.preventDefault();
    onPointerMove(getCanvasPoint(e));
  }

  function handlePointerUp(e: PointerEvent): void {
    if (!isPointerDown) return;
    e.preventDefault();
    isPointerDown = false;
    onPointerUp(getCanvasPoint(e));
  }
</script>

<div
  class="relative touch-none overflow-hidden rounded-lg border-2 border-slate-600 bg-slate-900 select-none"
  style="width: {W}px; height: {H}px;"
>
  <!-- 障害物・エイムライン描画キャンバス -->
  <canvas
    bind:this={canvas}
    width={W}
    height={H}
    class="absolute inset-0"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointerleave={handlePointerUp}
  ></canvas>

  <!-- ポケモン画像（キャッチ済み以外を常時表示） -->
  {#each pokemons.filter((p) => !p.caught) as poke (poke.pokeData.pokeId)}
    <img
      src={poke.pokeData.imageUrls.artwork.front ?? poke.pokeData.imageUrls.pixel.front ?? ""}
      alt={poke.pokeData.jaName}
      draggable="false"
      class="pointer-events-none absolute transition-none"
      style="width: {POKE_R * 2}px; height: {POKE_R * 2}px; left: {poke.x - POKE_R}px; top: {poke.y - POKE_R}px;"
    />
  {/each}

  <!-- ボール（常時表示） -->
  <img
    src={ballSpriteUrl}
    alt="ボール"
    draggable="false"
    class="pointer-events-none absolute transition-none"
    style="width: {BALL_R * 2}px; height: {BALL_R * 2}px; left: {ballPosition.x - BALL_R}px; top: {ballPosition.y -
      BALL_R}px;"
  />
</div>
