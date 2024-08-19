<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import type { Point } from "$lib/types/matter";
  import { initMatterBase, runMatterBase, cleanupMatterBase, type MatterBase } from "$lib/matters/initMatterBase";
  import { initPointerEvents } from "$lib/matters/initPointerEvents";
  import { initCollisionEvents } from "$lib/matters/initCollisionEvents";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { getRandomNumber } from "$lib/utils/numerics";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeItems: PokeItem[];
  };

  const pokeItems = data.pokeItems;

  let renderContainer: HTMLDivElement;
  let matterBase: MatterBase;
  let isHolding = false;
  let removePointerEvents: () => void;
  let removeCollisionEvents: () => void;
  onMount(async () => {
    matterBase = initMatterBase(renderContainer);
    if (browser) {
      runMatterBase(matterBase);
      removePointerEvents = initPointerEvents(matterBase.engine.world, matterBase.mouseConstraint, renderContainer, {
        isHolding,
      });
      removeCollisionEvents = initCollisionEvents(matterBase.engine);
    }
  });

  onDestroy(() => {
    if (browser) {
      cleanupMatterBase(matterBase);
      if (removePointerEvents) {
        removePointerEvents();
      }
      if (removeCollisionEvents) {
        removeCollisionEvents();
      }
    }
  });

  // ポケモン召喚
  async function spawnPokeBodies(): Promise<void> {
    const totalBodies = pokeItems.length * 2;

    const pokeBodyPromises = Promise.all(
      Array.from({ length: totalBodies }, async (_, i) => {
        const spawnPokeIndex = i % pokeItems.length;
        const spawnPosX = getRandomNumber(100); // 出現直後に消えないようにランダム化する
        await _spawnSpriteBody(pokeItems[spawnPokeIndex], { x: spawnPosX * 3, y: 20 });
      }),
    );
    await pokeBodyPromises;

    async function _spawnSpriteBody(pokeItem: PokeItem, spawnPoint: Point): Promise<void> {
      const body = await createPokeBody(pokeItem.imageUrl, false, 1.8, spawnPoint);
      body.collisionFilter.category = pokeItem.category;
      console.debug(body.collisionFilter);
      Matter.Composite.add(matterBase.engine.world, [body]);
    }
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンえあわせ</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle">
    <!-- 入力フォーム -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を よびだす</span>
        <form on:submit|preventDefault={spawnPokeBodies}>
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
