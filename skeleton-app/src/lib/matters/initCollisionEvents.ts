declare const Matter: typeof import("matter-js");

function createCollisionEvents(engine: Matter.Engine, event: Matter.IEventCollision<Matter.Engine>) {
  const pairs = event.pairs;

  pairs.forEach((pair) => {
    const { bodyA, bodyB } = pair;

    if (bodyA.collisionFilter.category === 0b1 || bodyB.collisionFilter.category === 0b1) return;

    /**
    console.debug(
      "Collision detected:",
      `0b${bodyA.collisionFilter.category?.toString(2).padStart(6, "0")}`,
      `0b${bodyB.collisionFilter.category?.toString(2).padStart(6, "0")}`,
    );
    **/

    // 同じカテゴリのもの同士が衝突した場合は削除する
    if (bodyA.collisionFilter.category === bodyB.collisionFilter.category) {
      Matter.Composite.remove(engine.world, bodyA);
      Matter.Composite.remove(engine.world, bodyB);
    }
  });
}

export function initCollisionEvents(engine: Matter.Engine) {
  const collisionEvents = (event: Matter.IEventCollision<Matter.Engine>) => createCollisionEvents(engine, event);
  Matter.Events.on(engine, "collisionStart", collisionEvents);

  return () => {
    Matter.Events.off(engine, "collisionStart", collisionEvents);
  };
}
