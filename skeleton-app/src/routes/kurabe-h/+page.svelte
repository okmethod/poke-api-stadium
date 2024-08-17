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
  import { pickRandomElementsFromArray } from "$lib/utils/collections";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeItems: PokeItem[];
  };

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

  // ゲームデータ管理
  let isOpen = false;
  let pokeCount = 3;
  let pickedPokeItems: PokeItem[] = [];
  let pickedPokeBodies: Matter.Body[] = [];
  async function pickPokeItems(): Promise<void> {
    resetState();
    pickedPokeItems = pickRandomElementsFromArray(data.pokeItems, pokeCount);
    const bodyPromises = pickedPokeItems.map((pokeItem: PokeItem, index: number) =>
      createPokeBody(pokeItem.imageUrl, 1, { x: 50 + index * 100, y: 20 }),
    );
    const bodies = await Promise.all(bodyPromises);
    bodies.forEach((body) => {
      Matter.World.add(engine.world, [body]);
      pickedPokeBodies.push(body); // 追加した Body を追跡
    });
  }

  // 比較実行とメッセージ更新
  let comprareResult = "";
  function compareHeight(): void {
    if (pickedPokeItems.length == 0) {
      comprareResult = "さきに ポケモンを よびだしてね";
      return;
    }
    isOpen = true;
  }

  // 状態リセット
  function resetState(): void {
    isOpen = false;
    pickedPokeBodies.forEach((body) => Matter.World.remove(engine.world, body));
    pickedPokeBodies = [];
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンたかさくらべ 改</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle">
    <!-- 入力フォーム -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を よびだす</span>
        <form on:submit|preventDefault={pickPokeItems}>
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

    <!-- メッセージ -->
    <div class="m-4 mt-2">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">こたえあわせ</span>
        <button type="button" class="cIconButtonStyle" on:click={compareHeight}>
          <div class="cIconDivStyle">
            <Icon icon="mdi:pokeball" class="cIconStyle" />
          </div>
        </button>
        <span class="text-lg">{comprareResult}</span>
      </div>
    </div>
  </div>
</div>
