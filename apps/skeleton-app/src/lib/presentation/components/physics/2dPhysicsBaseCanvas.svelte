<script lang="ts">
  import { toCanvasPoint } from "$lib/presentation/utils/canvasUtils";
  import type { Point2d } from "$lib/domain/models/2dPhysics";

  interface Props {
    drawFrame: (ctx: CanvasRenderingContext2D) => void;
    width: number;
    height: number;
    class?: string;
    onPointerDown?: (point: Point2d) => void;
    onPointerMove?: (point: Point2d) => void;
    onPointerUp?: (point: Point2d) => void;
  }

  let { drawFrame, width, height, class: className = "", onPointerDown, onPointerMove, onPointerUp }: Props = $props();

  let canvas: HTMLCanvasElement;
  let isPointerDown = $state(false);

  function canvasLoop(canvas: HTMLCanvasElement, drawFrame: (ctx: CanvasRenderingContext2D) => void) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return { destroy() {} };

    let fn = drawFrame;
    let rafId: number;

    function loop(): void {
      fn(ctx!);
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return {
      update(newFn: (ctx: CanvasRenderingContext2D) => void): void {
        fn = newFn;
      },
      destroy(): void {
        cancelAnimationFrame(rafId);
      },
    };
  }

  function handlePointerDown(e: PointerEvent): void {
    canvas.setPointerCapture(e.pointerId);
    isPointerDown = true;
    onPointerDown?.(toCanvasPoint(e, canvas, width, height));
  }

  function handlePointerMove(e: PointerEvent): void {
    if (!isPointerDown) return;
    onPointerMove?.(toCanvasPoint(e, canvas, width, height));
  }

  // pointerup / pointerleave / pointercancel を同一ハンドラで集約する
  function handlePointerEnd(e: PointerEvent): void {
    if (!isPointerDown) return;
    isPointerDown = false;
    onPointerUp?.(toCanvasPoint(e, canvas, width, height));
  }
</script>

<canvas
  bind:this={canvas}
  use:canvasLoop={drawFrame}
  {width}
  {height}
  class={className}
  onpointerdown={handlePointerDown}
  onpointermove={handlePointerMove}
  onpointerup={handlePointerEnd}
  onpointerleave={handlePointerEnd}
  onpointercancel={handlePointerEnd}
></canvas>
