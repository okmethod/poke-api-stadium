<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import type { Point } from "$lib/types/matter";
  import type { MatterBase } from "$lib/matters/initMatterBase";
  import { initCollisionEvents } from "$lib/matters/initCollisionEvents";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { filterArrayByGeneration } from "$lib/stores/generation";
  import { getRandomNumber, pickRandomElementsFromArray } from "$lib/utils/pickRandom";
  import IconButton from "$lib/components/IconButton.svelte";
  import MatterRenderContainer from "$lib/components/matters/MatterRenderContainer.svelte";
  import type { PokeItem } from "../+layout";

  export let data: {
    pokeItems: PokeItem[];
  };

  let renderContainer: HTMLDivElement;
  let matterBase: MatterBase;

  if (browser) {
    let removeCollisionEvents: () => void;
    onMount(async () => {
      removeCollisionEvents = initCollisionEvents(matterBase.engine);
    });
    onDestroy(() => {
      if (removeCollisionEvents) {
        removeCollisionEvents();
      }
    });
  }

  // ポケモン召喚
  const pokeCount = 30;
  async function spawnPokeBodies(): Promise<void> {
    const pokeItems = filterArrayByGeneration(data.pokeItems, "pokeId");
    const pickedPokeItems = pickRandomElementsFromArray(pokeItems, pokeCount * 2);

    const totalBodies = pickedPokeItems.length * 2;
    const pokeBodyPromises = Promise.all(
      Array.from({ length: totalBodies }, async (_, i) => {
        const spawnPokeIndex = i % pickedPokeItems.length;
        const spawnPosX = getRandomNumber(100); // 出現直後に消えないようにランダム化する
        await _spawnSpriteBody(
          pickedPokeItems[spawnPokeIndex],
          spawnPokeIndex + 2, // カテゴリは 2以降を使う
          { x: spawnPosX * 3, y: 50 },
        );
      }),
    );
    await pokeBodyPromises;

    async function _spawnSpriteBody(pokeItem: PokeItem, category: number, spawnPoint: Point): Promise<void> {
      const body = await createPokeBody(pokeItem.imageUrl, pokeItem.oggUrl, false, 1.0, spawnPoint);
      body.collisionFilter.category = category;
      console.debug(body.collisionFilter);
      Matter.Composite.add(matterBase.engine.world, [body]);
    }
  }
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンえあわせ</h1>
  </div>

  <div class="cContentPartStyle">
    <!-- 上部ボタン -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">ポケモン を よびだす</span>
        <IconButton icon="mdi:pokeball" cButton="btn-sm" onClick={spawnPokeBodies} />
      </div>
    </div>

    <!-- Render -->
    <div class="m-4">
      <MatterRenderContainer bind:renderContainer bind:matterBase />
    </div>
  </div>
</div>
