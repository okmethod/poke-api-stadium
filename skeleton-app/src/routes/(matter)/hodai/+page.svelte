<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { MatterBase } from "$lib/matters/initMatterBase";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { filterArrayByGeneration } from "$lib/stores/generation.js";
  import { getRandomNumber } from "$lib/utils/numerics";
  import { pickRandomElementsFromArray } from "$lib/utils/collections";
  import MatterRenderContainer from "$lib/components/matters/MatterRenderContainer.svelte";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeItems: PokeItem[];
  };

  let renderContainer: HTMLDivElement;
  let matterBase: MatterBase;

  // ポケモン召喚
  let pickedPokeItem: PokeItem;
  async function spawnPokeBody(): Promise<void> {
    const pokeItems = filterArrayByGeneration(data.pokeItems, "pokeId");
    pickedPokeItem = pickRandomElementsFromArray(pokeItems, 1)[0];
    const spawnPosX = getRandomNumber(100);
    const body = await createPokeBody(pickedPokeItem.imageUrl, false, 1, { x: 50 + spawnPosX * 2, y: 20 });
    Matter.Composite.add(matterBase.engine.world, [body]);
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
      <MatterRenderContainer bind:renderContainer bind:matterBase />
    </div>
  </div>
</div>
