<script lang="ts">
  import type { ISeesawPhysicsEngine } from "$lib/application/ports/ISeesawPhysicsEngine";
  import { createImageLoader, drawBody } from "$lib/presentation/utils/canvasUtils";
  import PhysicsCanvas from "./2dPhysicsBaseCanvas.svelte";

  interface Props {
    engine: ISeesawPhysicsEngine;
    width: number;
    height: number;
  }

  let { engine, width, height }: Props = $props();

  const loadImage = createImageLoader();

  function drawFrame(ctx: CanvasRenderingContext2D): void {
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
      drawBody(ctx, body, loadImage);
    }
  }
</script>

<PhysicsCanvas {drawFrame} {width} {height} class="border-surface-400 rounded border" />
