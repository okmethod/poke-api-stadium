declare const Matter: typeof import("matter-js");

export interface PointerEventHandlersMap {
  pointerdown: () => void;
  pointerup: () => void;
  pointerleave: () => void;
  pointermove: (event: PointerEvent) => void;
}

export function createPointerEventHandlers(
  world: Matter.World,
  mouseConstraint: Matter.MouseConstraint,
  renderContainer: HTMLDivElement,
  flags: { isHolding: boolean },
): PointerEventHandlersMap {
  function handlePointerDown() {
    flags.isHolding = true;
    Matter.Composite.add(world, mouseConstraint);
  }

  function handlePointerUp() {
    flags.isHolding = false;
    Matter.World.remove(world, mouseConstraint);
  }

  function handlePointerLeave() {
    flags.isHolding = false;
    mouseConstraint.constraint.bodyA = null;
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.mouse.position = { x: -1, y: -1 };
    Matter.World.remove(world, mouseConstraint);
  }

  function handlePointerMove(event: PointerEvent) {
    const rect = renderContainer.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      Matter.World.remove(world, mouseConstraint);
    }
  }

  return {
    pointerdown: handlePointerDown,
    pointerup: handlePointerUp,
    pointerleave: handlePointerLeave,
    pointermove: handlePointerMove,
  };
}
