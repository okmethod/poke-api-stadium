<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { MatterBase } from "$lib/matters/initMatterBase";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { filterArrayByGeneration } from "$lib/stores/generation";
  import { pickRandomElementsFromArray } from "$lib/utils/collections";
  import { formatHeightWeight } from "$lib/utils/numerics";
  import MatterRenderContainer from "$lib/components/matters/MatterRenderContainer.svelte";
  import type { PokeItem } from "../+layout";

  export let data: {
    pokeItems: PokeItem[];
  };

  let renderContainer: HTMLDivElement;
  let matterBase: MatterBase;

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
      const centerX = renderContainer.clientWidth * 0.5;
      const centerY = renderContainer.clientHeight * 0.5;
      return createPokeBody(pokeItem.imageUrl, null, normalizeSize, 1, {
        x: centerX + centerX * 0.6 * (index - 1),
        y: centerY * 1.5,
      });
    });
    const bodies = await Promise.all(bodyPromises);
    bodies.forEach((body) => {
      Matter.Body.setStatic(body, true); // 静止状態
      Matter.Composite.add(matterBase.engine.world, [body]);
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
    pickedPokeBodies.forEach((body) => Matter.Composite.remove(matterBase.engine.world, body));
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
        <span class="cSpanTextStyle">ポケモン を よびだす</span>
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
      <MatterRenderContainer bind:renderContainer bind:matterBase />
    </div>

    <!-- メッセージ -->
    <div class="m-4 mt-2 space-y-4">
      <div class="cInputFormAndMessagePartStyle justify-center">
        <span class="cSpanTextStyle">こたえをみる</span>
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
          <span class="cSpanTextStyle">{guideMessage}</span>
        {/if}
      </div>
    </div>
  </div>
</div>
