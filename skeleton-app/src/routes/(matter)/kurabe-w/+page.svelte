<script context="module" lang="ts">
  // UMDグローバルとして読み込んだ Matter を宣言
  declare const Matter: typeof import("matter-js");
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import type { MatterBase } from "$lib/matters/initMatterBase";
  import { createPokeBody } from "$lib/matters/createPokeBody";
  import { createSeesawComposite } from "$lib/matters/createSeesawComposite";
  import { filterArrayByGeneration } from "$lib/stores/generation";
  import { pickRandomElementsFromArray } from "$lib/utils/pickRandom";
  import { formatHeightWeight } from "$lib/utils/numerics";
  import IconButton from "$lib/components/IconButton.svelte";
  import MatterRenderContainer from "$lib/components/matters/MatterRenderContainer.svelte";
  import type { PokeItem } from "../+layout";

  export let data: {
    pokeItems: PokeItem[];
  };

  let renderContainer: HTMLDivElement;
  let centerX: number;
  let centerY: number;
  let matterBase: MatterBase;
  let seesaw: Matter.Composite; // eslint-disable-line no-undef
  let seesawStick: Matter.Body; // eslint-disable-line no-undef
  if (browser) {
    onMount(async () => {
      centerX = renderContainer.clientWidth * 0.5;
      centerY = renderContainer.clientHeight * 0.5;
      const SeesawWidth = renderContainer.clientWidth * 0.9;
      ({ seesaw, seesawStick } = createSeesawComposite(SeesawWidth, 20, { x: centerX, y: centerY * 1.4 }));

      Matter.Composite.add(matterBase.engine.world, seesaw);
    });
  }

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
      (pokeItem) => createPokeBody(pokeItem.imageUrl, null, false, 1, { x: 0, y: 0 }),
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
  function compareWeight(): void {
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
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンおもさくらべ 改</h1>
  </div>

  <div class="cContentPartStyle">
    <!-- 上部ボタン -->
    <div class="flex items-center justify-center">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">ポケモン を よびだす</span>
        <IconButton icon="mdi:pokeball" cButton="btn-sm" onClick={pickPokeItems} disabled={!isReady} />
      </div>
    </div>

    <!-- Render -->
    <div class="m-4">
      <MatterRenderContainer bind:renderContainer bind:matterBase />
    </div>

    <!-- 下部ボタン -->
    <div class="m-4 mt-2 space-y-4">
      <div class="flex justify-center">
        <button
          type="button"
          on:click={compareWeight}
          class="btn variant-filled"
          disabled={pickedPokeItems.length == 0}
        >
          こたえをみる
        </button>
      </div>
      <div class="flex justify-center">
        {#if isOpen}
          {#each pickedPokeItems as pokeItem}
            <div class="flex flex-col items-center">
              <span class="text-base">[{pokeItem.jaName}]</span>
              <span class="text-xl bold">{formatHeightWeight(pokeItem.weight, "weight")}</span>
            </div>
          {/each}
        {:else}
          <span class="cSpanTextStyle">{guideMessage}</span>
        {/if}
      </div>
    </div>
  </div>
</div>
