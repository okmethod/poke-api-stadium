<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { WeightBalance } from "$lib/application/usecases/WeightBalance";
  import { getMatterJsSpringScaleAdapter } from "$lib/infrastructure/adapters/MatterJsSpringScaleAdapter";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import SpringScaleCanvas from "$lib/presentation/components/physics/SpringScaleCanvas.svelte";

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 320;

  const engine = getMatterJsSpringScaleAdapter();
  const facade = new WeightBalance.Facade(engine, getPokeRepository());
  const {
    targetWeight,
    toleranceWeight,
    currentPokeData,
    placedPokeDataList,
    isRevealed,
    isLoading,
    isBalanced,
    isSpringBroken,
  } = WeightBalance.Store;

  let isReady = $state(false);

  const totalWeight = $derived($placedPokeDataList.reduce((sum, p) => sum + p.weight, 0));

  // 結果確定時に SE を鳴らす（初回スキップパターン）
  let seEffectReady = false;
  $effect(() => {
    const balanced = $isBalanced;
    if (!seEffectReady) {
      seEffectReady = true;
      return;
    }
    if (balanced === true) playSE.correct();
    else if (balanced === false) playSE.incorrect();
  });

  onMount(async () => {
    await facade.initialize({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, gravity: 1 });
    isReady = true;
  });

  onDestroy(() => {
    facade.dispose();
  });

  async function handleStart(): Promise<void> {
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  async function handlePlace(): Promise<void> {
    const result = await facade.placePokemon(fetch);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  async function handleSkip(): Promise<void> {
    const result = await facade.skipPokemon(fetch);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  function handleDiscard(index: number): void {
    facade.discardPokemon(index);
  }

  async function handleCompare(): Promise<void> {
    const result = await facade.compare();
    if (!result.success && result.error) showErrorToast(result.error);
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ピッタリ 100kg</h1>

  <!-- バネばかりキャンバス -->
  <div class="flex w-full max-w-lg flex-col items-center gap-2">
    {#if isReady}
      <SpringScaleCanvas {engine} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    {:else}
      <div
        class="border-surface-400 flex items-center justify-center rounded border"
        style="width:{CANVAS_WIDTH}px; height:{CANVAS_HEIGHT}px"
      >
        <Icon icon="mdi:loading" class="text-surface-400 size-8 animate-spin" />
      </div>
    {/if}
  </div>

  <!-- ゲーム開始前 -->
  {#if !isReady || $targetWeight === 0}
    <button type="button" class="btn preset-filled" onclick={handleStart} disabled={!isReady || $isLoading}>
      {#if $isLoading}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
      {:else}
        はじめる
      {/if}
    </button>

    <!-- バネ破断 -->
  {:else if $isSpringBroken}
    <div class="flex flex-col items-center gap-2 text-center">
      <p class="text-error-600 text-2xl font-bold">ちぎれた！</p>
      <p class="text-surface-600 text-sm">合計 {totalWeight.toFixed(1)} kg — 200kg を超えました</p>
    </div>
    <button type="button" class="btn preset-tonal" onclick={handleStart}>
      <Icon icon="mdi:reload" class="size-5" />
      もう一度
    </button>

    <!-- 結果表示 -->
  {:else if $isRevealed}
    <div class="flex flex-col items-center gap-2 text-center">
      {#if $isBalanced}
        <p class="text-success-600 text-2xl font-bold">ピッタリ！</p>
      {:else}
        <p class="text-error-600 text-2xl font-bold">惜しい...</p>
      {/if}
      <p class="text-surface-600 text-sm">
        合計 {totalWeight.toFixed(1)} kg / 目標 {$targetWeight} kg (± {$toleranceWeight} kg)
      </p>
    </div>
    <button type="button" class="btn preset-tonal" onclick={handleStart}>
      <Icon icon="mdi:reload" class="size-5" />
      もう一度
    </button>

    <!-- ゲーム中 -->
  {:else}
    <!-- 目標重量 + 乗せた合計 -->
    <!-- 乗せたポケモン一覧（×ボタンで捨てられる） -->
    {#if $placedPokeDataList.length > 0}
      <div class="flex flex-wrap justify-center gap-2">
        {#each $placedPokeDataList as poke, i (i)}
          <span class="chip preset-tonal flex items-center gap-1 text-sm">
            {poke.jaName}
            <button
              type="button"
              class="hover:text-error-500 ml-1 leading-none"
              onclick={() => handleDiscard(i)}
              aria-label="{poke.jaName}を捨てる"
            >
              <Icon icon="mdi:close" class="size-3.5" />
            </button>
          </span>
        {/each}
      </div>
    {/if}

    <!-- 候補ポケモンカード -->
    <div class="card w-full max-w-sm p-4">
      {#if $isLoading}
        <div class="flex h-32 items-center justify-center">
          <Icon icon="mdi:loading" class="text-surface-400 size-8 animate-spin" />
        </div>
      {:else if $currentPokeData}
        <div class="flex flex-col items-center gap-3">
          <img
            src={$currentPokeData.imageUrls.artwork.front ?? $currentPokeData.imageUrls.pixel.front ?? ""}
            alt={$currentPokeData.jaName}
            class="h-24 w-24 object-contain"
          />
          <p class="text-lg font-semibold">{$currentPokeData.jaName}</p>
          <div class="flex gap-4">
            <button type="button" class="btn preset-filled-primary-500" onclick={handlePlace}>
              <Icon icon="mdi:scale-balance" class="size-5" />
              のせる
            </button>
            <button type="button" class="btn preset-tonal" onclick={handleSkip}>
              <Icon icon="mdi:skip-next" class="size-5" />
              パス
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- 比べるボタン（1体以上乗せた後に表示） -->
    {#if $placedPokeDataList.length > 0 && !$isLoading}
      <button type="button" class="btn preset-filled-warning-500" onclick={handleCompare}>
        <Icon icon="mdi:scale" class="size-5" />
        比べる
      </button>
    {/if}
  {/if}
</div>
