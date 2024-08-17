<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import { initEngine, initRunner, initRender, initMouse, initWalls } from "$lib/matters/initMatter";
  import { createPointerEventHandlers, type PointerEventHandlersMap } from "$lib/matters/createEventHandlers";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { getRandomNumber } from "$lib/utils/numerics";

  const imageUrls = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
  ];

  let renderContainer: HTMLDivElement;
  let engine: Matter.Engine; // eslint-disable-line no-undef
  let runner: Matter.Runner; // eslint-disable-line no-undef
  let render: Matter.Render; // eslint-disable-line no-undef
  let mouseConstraint: Matter.MouseConstraint; // eslint-disable-line no-undef
  let eventHandlers: PointerEventHandlersMap;
  let isHolding = false;
  onMount(async () => {
    engine = initEngine();
    runner = initRunner();
    render = initRender(engine, renderContainer);
    mouseConstraint = initMouse(engine, render);
    const walls = await initWalls(renderContainer);
    if (browser) {
      Matter.World.add(engine.world, walls);
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);

      let eventHandlers = createPointerEventHandlers(engine.world, mouseConstraint, renderContainer, { isHolding });
      if (!eventHandlers) return;
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        renderContainer.addEventListener(event, handler);
      });
    }
  });

  onDestroy(() => {
    if (browser) {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);

      if (!eventHandlers) return;
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        renderContainer.removeEventListener(event, handler);
      });
    }
  });

  // ポケモン召喚
  let spawnPokeIndex;
  async function spawnPokeBody(): Promise<void> {
    spawnPokeIndex = getRandomNumber(imageUrls.length);
    const spawnPosX = getRandomNumber(100);
    const body = await createPokeBody(imageUrls[spawnPokeIndex], 1, { x: 50 + spawnPosX * 2, y: 20 });
    Matter.World.add(engine.world, [body]);
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンとりほうだい</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle">
    <!-- 入力フォーム -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン ゲットだぜ！</span>
        <form on:submit|preventDefault={spawnPokeBody}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- Render -->
    <div class="m-4">
      <div bind:this={renderContainer} class="w-80 h-80 bg-gray-300 border border-black"></div>
    </div>
  </div>
</div>
