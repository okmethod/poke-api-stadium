declare const Matter: typeof import("matter-js");

const isDevelopment = (import.meta.env.MODE as string) === "development";

export function initEngine(): Matter.Engine {
  return Matter.Engine.create({
    enableSleeping: true,
    positionIterations: 6, // 位置の解決の反復回数(default=6)
    velocityIterations: 4, // 速度の解決の反復回数(default=4)
    constraintIterations: 6, // 制約の解決の反復回数(default=2)
  });
}

export function initRunner(): Matter.Runner {
  return Matter.Runner.create();
}

export function initRender(engine: Matter.Engine, renderContainer: HTMLDivElement): Matter.Render {
  const render = Matter.Render.create({
    element: renderContainer,
    engine: engine,
    options: {
      width: renderContainer.clientWidth,
      height: renderContainer.clientHeight,
      pixelRatio: 1,
      background: "transparent", // ここでは透明にし、style側で指定する
      hasBounds: false,
      wireframes: false,
      showSleeping: false,
    },
  });
  return render;
}

export function initMouse(engine: Matter.Engine, render: Matter.Render): Matter.MouseConstraint {
  const mouse = Matter.Mouse.create(render.canvas);
  render.mouse = mouse;

  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    // マウスとボディを結ぶバネを召喚する
    constraint: {
      stiffness: 0.2, // 剛性
      damping: 0, // 減衰
      length: 0,
      render: {
        visible: isDevelopment ? true : false,
        lineWidth: 2,
        strokeStyle: "#00ff00",
      },
    },
  });
  return mouseConstraint;
}

export async function initWalls(renderContainer: HTMLDivElement): Promise<Matter.Composite> {
  const width = renderContainer.clientWidth;
  const height = renderContainer.clientHeight;

  function _createWallConfig(width: number, height: number, thickness: number, overlap: number) {
    return [
      { x: width / 2 - overlap, y: -thickness / 2, w: width + overlap * 2, h: thickness }, // 上辺
      { x: width / 2 - overlap, y: height + thickness / 2, w: width + overlap * 2, h: thickness }, // 下辺
      { x: -thickness / 2, y: height / 2 - overlap, w: thickness, h: height + overlap * 2 }, // 左辺
      { x: width + thickness / 2, y: height / 2 - overlap, w: thickness, h: height + overlap * 2 }, // 右辺
    ];
  }

  const walls = _createWallConfig(width, height, 2000, 0).map((config) =>
    Matter.Bodies.rectangle(config.x, config.y, config.w, config.h, {
      isStatic: true,
      render: {
        visible: false,
      },
    }),
  );

  return Matter.Composite.add(Matter.Composite.create(), walls);
}
