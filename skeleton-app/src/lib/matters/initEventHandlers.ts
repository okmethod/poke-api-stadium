declare const Matter: typeof import("matter-js");

interface PointerEventHandlersMap {
  pointerdown: () => void;
  pointerup: () => void;
  pointerleave: () => void;
  pointermove: (event: PointerEvent) => void;
}

function createPointerEventHandlers(
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
    Matter.Composite.remove(world, mouseConstraint);
  }

  function handlePointerLeave() {
    flags.isHolding = false;
    mouseConstraint.constraint.bodyA = null;
    mouseConstraint.constraint.bodyB = null;
    mouseConstraint.mouse.position = { x: -1, y: -1 };
    Matter.Composite.remove(world, mouseConstraint);
  }

  function handlePointerMove(event: PointerEvent) {
    const rect = renderContainer.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      Matter.Composite.remove(world, mouseConstraint);
    }
  }

  return {
    pointerdown: handlePointerDown,
    pointerup: handlePointerUp,
    pointerleave: handlePointerLeave,
    pointermove: handlePointerMove,
  };
}

export function initEventHandlers(
  world: Matter.World,
  mouseConstraint: Matter.MouseConstraint,
  renderContainer: HTMLDivElement,
  flags: { isHolding: boolean },
) {
  const eventHandlers = createPointerEventHandlers(world, mouseConstraint, renderContainer, flags);

  Object.entries(eventHandlers).forEach(([event, handler]) => {
    renderContainer.addEventListener(event, handler);
  });

  return () => {
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      renderContainer.removeEventListener(event, handler);
    });
  };
}
