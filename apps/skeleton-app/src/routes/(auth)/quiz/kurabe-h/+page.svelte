<script lang="ts">
  import { get } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import DndSortablePokeTiles, {
    toDndItems,
    type DndPokeData,
  } from "$lib/presentation/components/atoms/DndSortablePokeTiles.svelte";
  import { HeightComparison } from "$lib/application/usecases/HeightComparison";
  import { getMatterJsSimpleDragAdapter } from "$lib/infrastructure/adapters/MatterJsSimpleDragAdapter";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { watchResultSE } from "$lib/presentation/utils/watchEffect.svelte";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import SimpleDragCanvas from "$lib/presentation/components/physics/SimpleDragCanvas.svelte";

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 160;
  const POKE_COUNT = 3;

  const engine = getMatterJsSimpleDragAdapter();
  const facade = new HeightComparison.Facade(engine, getPokeRepository());
  const { pokeDataList, isRevealed, isLoading, result } = HeightComparison.Store;

  let isReady = $state(false);
  let isRevealing = $state(false);
  let orderedList = $state<DndPokeData[]>([]);

  onMount(async () => {
    await facade.initialize({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, gravity: 0.5 });
    isReady = true;
  });

  onDestroy(() => {
    facade.dispose();
  });

  async function handlePick(): Promise<void> {
    const result = await facade.pickPokemons(fetch, POKE_COUNT);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    } else {
      orderedList = toDndItems(get(pokeDataList));
    }
  }

  async function handleReveal(): Promise<void> {
    isRevealing = true;
    const result = await facade.reveal(orderedList);
    isRevealing = false;
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  watchResultSE(() => $result, playSE);
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンたかさくらべ 改</h1>

  <!-- スタートボタン -->
  <SpawnButton onclick={handlePick} isLoading={$isLoading} started={$pokeDataList.length > 0} />

  <!-- ポケモン並べ替えエリア（公開前のみ表示） -->
  {#if orderedList.length > 0 && !$isRevealed}
    <DndSortablePokeTiles bind:items={orderedList} class="max-w-2xl" />

    <!-- 回答ボタン -->
    <button type="button" class="btn preset-tonal" onclick={handleReveal} disabled={isRevealing}>
      {#if isRevealing}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
      {/if}
      <Icon icon="mdi:eye-outline" class="size-5" />
      こたえをみる
    </button>
  {:else if !$isRevealed && !$isLoading}
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-1 border-dashed"
    >
      <p class="text-sm">はじめるボタン を おしてね</p>
    </div>
  {/if}

  <!-- 物理キャンバス＋結果一覧（公開後） -->
  {#if $isRevealed}
    {#if isReady}
      <SimpleDragCanvas {engine} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    {:else}
      <div
        class="border-surface-400 flex items-center justify-center rounded border"
        style="width:{CANVAS_WIDTH}px; height:{CANVAS_HEIGHT}px"
      >
        <Icon icon="mdi:loading" class="text-surface-400 size-8 animate-spin" />
      </div>
    {/if}

    <!-- たかさ一覧（dnd 順） -->
    <div class="flex flex-wrap justify-center gap-2">
      {#each orderedList as pokeData, index (pokeData.speciesId)}
        <div class="flex flex-col items-center gap-0.5 text-center">
          <span class="text-base font-bold">{pokeData.jaName}</span>
          <span class="text-base font-bold">{pokeData.height.toFixed(1)}m</span>
          <span class="text-surface-500 text-sm">{index + 1} ばんめ</span>
        </div>
      {/each}
    </div>

    <!-- 結果メッセージ -->
    {#if $result !== null}
      <p class="text-xl font-bold">{$result.message}</p>
    {/if}
  {/if}
</div>
