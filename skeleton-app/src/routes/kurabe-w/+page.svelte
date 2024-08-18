<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Icon from "@iconify/svelte";
  import { initMatterBase, runMatterBase, cleanupMatterBase, type MatterBase } from "$lib/matters/initMatterBase";
  import { initEventHandlers } from "$lib/matters/initEventHandlers";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { createSeesawComposite } from "$lib/matters/createSeesawComposite";
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
  let matterBase: MatterBase;
  let seesaw: Matter.Composite; // eslint-disable-line no-undef
  let seesawStick: Matter.Body; // eslint-disable-line no-undef
  let removeEventHandlers: () => void;
  let isHolding = false;
  onMount(async () => {
    matterBase = initMatterBase(renderContainer);

    centerX = renderContainer.clientWidth * 0.5;
    centerY = renderContainer.clientHeight * 0.5;
    const SeesawWidth = renderContainer.clientWidth * 0.9;
    ({ seesaw, seesawStick } = createSeesawComposite(SeesawWidth, 20, { x: centerX, y: centerY * 1.4 }));

    if (browser) {
      runMatterBase(matterBase);
      Matter.Composite.add(matterBase.engine.world, seesaw);
      removeEventHandlers = initEventHandlers(matterBase.engine.world, matterBase.mouseConstraint, renderContainer, {
        isHolding,
      });
    }
  });

  onDestroy(() => {
    if (browser) {
      cleanupMatterBase(matterBase);
      if (removeEventHandlers) {
        removeEventHandlers();
      }
    }
  });

  // ゲームデータ管理
  let isReady = true;
  let isOpen = false;
  let pokeCount = 2;
  let pickedPokeItems: PokeItem[] = [];
  let pickedPokeBodies: Matter.Body[] = []; // eslint-disable-line no-undef
  async function pickPokeItems(): Promise<void> {
    isReady = false;
    guideMessage = "じゅんびちゅう...";
    resetState();

    const pokeItems = filterArrayByGeneration(data.pokeItems, "pokeId");
    pickedPokeItems = pickRandomElementsFromArray(pokeItems, pokeCount);
    const bodyPromises = pickedPokeItems.map(
      // 位置はbody作成後に再調整する
      (pokeItem) => createPokeBody(pokeItem.imageUrl, false, { x: 0, y: 0 }),
    );
    const bodies = await Promise.all(bodyPromises);
    bodies.forEach((body, index) => {
      const bounds = body.bounds;
      const bodyHeight = bounds.max.y - bounds.min.y;
      Matter.Body.setPosition(body, {
        x: centerX + (index === 0 ? -centerX * 0.6 : centerX * 0.6),
        y: centerY * 0.8 - bodyHeight * 0.5,
      });
      Matter.Body.setMass(body, pickedPokeItems[index].weight / 10);
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
      pickedPokeBodies.forEach((body) => {
        Matter.Body.setStatic(body, false); // 動かす
        Matter.Body.applyForce(body, body.position, { x: 0, y: body.mass * 0.01 });
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

    if (seesawStick) {
      Matter.Body.setAngle(seesawStick, 0);
      Matter.Body.setAngularVelocity(seesawStick, 0);
      Matter.Body.setPosition(seesawStick, { x: centerX, y: centerY * 1.5 });
    }
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンおもさくらべ 改</h1>
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
        <span class="text-lg">こたえをみる</span>
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
              <span class="text-xl bold">{formatHeightWeight(pokeItem.weight, "weight")}</span>
            </div>
          {/each}
        {:else}
          <span class="text-lg">{guideMessage}</span>
        {/if}
      </div>
    </div>
  </div>
</div>
