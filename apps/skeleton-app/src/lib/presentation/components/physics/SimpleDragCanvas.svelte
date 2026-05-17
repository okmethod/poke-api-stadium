<script lang="ts">
  import type { I2dPhysicsEngine } from "$lib/application/ports/I2dPhysicsEngine";
  import { createImageLoader, drawBody } from "$lib/presentation/utils/canvasUtils";
  import PhysicsCanvas from "./2dPhysicsBaseCanvas.svelte";

  interface Props {
    engine: I2dPhysicsEngine;
    width: number;
    height: number;
  }

  let { engine, width, height }: Props = $props();

  const loadImage = createImageLoader();

  function drawFrame(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, width, height);
    for (const body of engine.getBodies()) {
      drawBody(ctx, body, loadImage);
    }
  }
</script>

<PhysicsCanvas
  {drawFrame}
  {width}
  {height}
  class="border-surface-400 cursor-grab touch-none rounded border active:cursor-grabbing"
  onPointerDown={(p) => engine.startDrag(p)}
  onPointerMove={(p) => engine.moveDrag(p)}
  onPointerUp={() => engine.endDrag()}
/>
