declare const Matter: typeof import("matter-js");
import type { Point } from "$lib/types/matter";

export function createSeesawComposite(
  width: number,
  height: number,
  pos: Point,
): {
  seesaw: Matter.Composite;
  seesawStick: Matter.Body;
} {
  const { Bodies, Composite, Constraint } = Matter;

  const seesaw = Composite.create();
  const seesawStick = Bodies.rectangle(pos.x, pos.y, width, height, {
    label: "seesawStick",
    mass: 10,
    render: { fillStyle: "#888888" },
  });
  const seesawConstraint = Constraint.create({
    pointA: { x: pos.x, y: pos.y },
    bodyB: seesawStick,
    pointB: { x: 0, y: 0 },
    stiffness: 1,
    length: 0,
  });

  Composite.add(seesaw, seesawStick);
  Composite.add(seesaw, seesawConstraint);

  return { seesaw, seesawStick };
}
