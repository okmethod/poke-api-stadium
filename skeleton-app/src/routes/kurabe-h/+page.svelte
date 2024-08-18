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
  import { filterArrayByGeneration } from "$lib/stores/generation.js";
  import { pickRandomElementsFromArray } from "$lib/utils/collections";
  import { formatHeightWeight } from "$lib/utils/numerics";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeItems: PokeItem[];
  };

  let renderContainer: HTMLDivElement;
  let centerX: number;
  let centerY: number;
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
    centerX = renderContainer.clientWidth * 0.5;
    centerY = renderContainer.clientHeight * 0.5;

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
  let isReady = true;
  let isOpen = false;
  let pokeCount = 3;
  let pickedPokeItems: PokeItem[] = [];
  let pickedPokeBodies: Matter.Body[] = []; // eslint-disable-line no-undef
  async function pickPokeItems(): Promise<void> {
    isReady = false;
    guideMessage = "じゅんびちゅう...";
    resetState();

    const pokeItems = filterArrayByGeneration(data.pokeItems, "pokeId");
    pickedPokeItems = pickRandomElementsFromArray(pokeItems, pokeCount);
    const bodyPromises = pickedPokeItems.map((pokeItem, index) => {
      const normalizeSize = 100;
      return createPokeBody(pokeItem.imageUrl, normalizeSize, {
        x: centerX + centerX * 0.6 * (index - 1),
        y: centerY * 1.5,
      });
    });
    const bodies = await Promise.all(bodyPromises);
    bodies.forEach((body) => {
      Matter.Body.setStatic(body, true); // 静止状態
      Matter.World.add(engine.world, [body]);
      pickedPokeBodies.push(body); // 追加した Body を追跡
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    guideMessage = "じゅんび かんりょう！";
    isReady = true;
  }

  // 比較実行とメッセージ更新
  let guideMessage = "";
  function compareHeight(): void {
    if (pickedPokeItems.length == 0) {
      guideMessage = "さきに ポケモンを よびだしてね";
      return;
    }
    if (isReady === false) {
      guideMessage = "じゅんびちゅう...";
      return;
    }
    if (isOpen === false) {
      pickedPokeBodies.forEach((body, index) => {
        const scaleRatio = pickedPokeItems[index].height / 10;
        Matter.Body.scale(body, scaleRatio, scaleRatio);
        if (body.render.sprite) {
          body.render.sprite.xScale = body.render.sprite.xScale * scaleRatio;
          body.render.sprite.yScale = body.render.sprite.yScale * scaleRatio;
        }
        Matter.Body.setStatic(body, false); // 動かす
        Matter.Body.applyForce(body, body.position, { x: 0, y: -body.mass * 0.02 });
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(body, 0);
      });
    }
    isOpen = true;
  }

  // 状態リセット
  function resetState(): void {
    guideMessage = "";
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
          <button type="submit" disabled={!isReady} class="cIconButtonStyle">
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
    <div class="m-4 mt-2 space-y-4">
      <div class="cInputFormAndMessagePartStyle justify-center">
        <span class="text-lg">こたえあわせ</span>
        <button type="button" class="cIconButtonStyle" on:click={compareHeight}>
          <div class="cIconDivStyle">
            <Icon icon="mdi:pokeball" class="cIconStyle" />
          </div>
        </button>
      </div>
      <div class="cInputFormAndMessagePartStyle justify-center">
        {#if isOpen}
          {#each pickedPokeItems as pokeItem}
            <div class="flex flex-col items-center">
              <span class="text-base">[{pokeItem.jaName}]</span>
              <span class="text-xl bold">{formatHeightWeight(pokeItem.height, "height")}</span>
            </div>
          {/each}
        {:else}
          <span class="text-lg">{guideMessage}</span>
        {/if}
      </div>
    </div>
  </div>
</div>
