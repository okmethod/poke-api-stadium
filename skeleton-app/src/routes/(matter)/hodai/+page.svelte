<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import type { MatterBase } from "$lib/matters/initMatterBase";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { filterArrayByGeneration } from "$lib/stores/generation";
  import { playAudio } from "$lib/stores/audio";
  import { getRandomNumber } from "$lib/utils/numerics";
  import { pickRandomElementsFromArray } from "$lib/utils/collections";
  import IconButton from "$lib/components/IconButton.svelte";
  import MatterRenderContainer from "$lib/components/matters/MatterRenderContainer.svelte";
  import type { PokeItem } from "../+layout";

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
    playAudio(pickedPokeItem.oggUrl);
    const spawnPosX = getRandomNumber(100);
    const body = await createPokeBody(pickedPokeItem.imageUrl, null, false, 1, { x: 50 + spawnPosX * 2, y: 20 });
    Matter.Composite.add(matterBase.engine.world, [body]);
  }
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンとりほうだい</h1>
  </div>

  <div class="cContentPartStyle">
    <!-- 上部ボタン -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">ポケモン ゲットだぜ！</span>
        <IconButton icon="mdi:pokeball" cButton="btn-sm" onClick={spawnPokeBody} />
      </div>
    </div>

    <!-- Render -->
    <div class="m-4">
      <MatterRenderContainer bind:renderContainer bind:matterBase />
    </div>

    <!-- 下部メッセージ -->
    <div class="m-4">
      <div class="flex items-center justify-center">
        <strong>{pickedPokeItem ? pickedPokeItem.jaName : ""}</strong>
      </div>
    </div>
  </div>
</div>
