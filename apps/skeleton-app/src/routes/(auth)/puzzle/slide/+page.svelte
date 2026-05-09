<script lang="ts">
  import { get } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { SlidePuzzle } from "$lib/application/usecases/SlidePuzzle";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { resolvedCryUrl } from "$lib/domain/models/PokeData";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { watchEffect } from "$lib/presentation/utils/watchEffect.svelte";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";

  const TILE_SIZE = 80;
  const GRID_SIZE = 4;

  const facade = new SlidePuzzle.Facade(getPokeRepository());
  const { isLoading, pokeData, board, moveCount, isGameClear } = SlidePuzzle.Store;

  const AUTO_SOLVE_DELAY_MS = 50;

  let showHint = $state(false);
  let hoveredPos = $state<number | null>(null);
  let isAutoSolving = $state(false);
  let isComputing = $state(false);
  let autoSolveQueue: number[] = [];
  let autoSolveTimer: ReturnType<typeof setTimeout> | null = null;

  function clearAutoSolve(): void {
    if (autoSolveTimer !== null) {
      clearTimeout(autoSolveTimer);
      autoSolveTimer = null;
    }
    isAutoSolving = false;
    autoSolveQueue = [];
  }

  function scheduleNextSlide(): void {
    if (autoSolveQueue.length === 0) {
      isAutoSolving = false;
      return;
    }
    autoSolveTimer = setTimeout(() => {
      const pos = autoSolveQueue.shift();
      if (pos !== undefined) facade.slideTitle(pos);
      if (autoSolveQueue.length === 0) {
        isAutoSolving = false;
      } else {
        scheduleNextSlide();
      }
    }, AUTO_SOLVE_DELAY_MS);
  }

  async function handleAutoSolve(): Promise<void> {
    isComputing = true;
    // 描画に処理を譲渡してから計算を開始する
    await new Promise<void>((resolve) => setTimeout(resolve, 16));

    const solution = facade.computeSolution();
    isComputing = false;

    if (!solution) {
      showErrorToast("解法の計算に失敗しました");
      return;
    }
    if (solution.length === 0) return;

    autoSolveQueue = solution;
    isAutoSolving = true;
    scheduleNextSlide();
  }

  // クリア時に鳴き声を再生する
  watchEffect(
    () => $isGameClear,
    (cleared) => {
      if (!cleared) return;
      clearAutoSolve();
      const poke = get(pokeData);
      if (!poke) return;
      const cryUrl = resolvedCryUrl(poke.cryUrls);
      if (cryUrl && getAudioOn()) {
        new Audio(cryUrl).play().catch(() => {});
      }
    },
  );

  async function handleStart(): Promise<void> {
    clearAutoSolve();
    showHint = false;
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleSlide(pos: number): void {
    if (isAutoSolving) return;
    facade.slideTitle(pos);
  }

  /** スライド可能な場合の矢印アイコン名を返す */
  function getSlideArrow(pos: number, emptyPos: number): string | null {
    const row = Math.floor(pos / GRID_SIZE);
    const col = pos % GRID_SIZE;
    const emptyRow = Math.floor(emptyPos / GRID_SIZE);
    const emptyCol = emptyPos % GRID_SIZE;
    if (emptyRow === row - 1 && emptyCol === col) return "mdi:arrow-up";
    if (emptyRow === row + 1 && emptyCol === col) return "mdi:arrow-down";
    if (emptyRow === row && emptyCol === col - 1) return "mdi:arrow-left";
    if (emptyRow === row && emptyCol === col + 1) return "mdi:arrow-right";
    return null;
  }
</script>

{#snippet puzzleTile(tileId: number, pos: number, imageUrl: string, emptyPos: number)}
  {@const col = tileId % GRID_SIZE}
  {@const row = Math.floor(tileId / GRID_SIZE)}
  {@const arrow = hoveredPos === pos ? getSlideArrow(pos, emptyPos) : null}
  <button
    class="border-surface-300 dark:border-surface-600 relative border transition-[filter] hover:brightness-110 active:brightness-90"
    style="width:{TILE_SIZE}px; height:{TILE_SIZE}px; background-image:url('{imageUrl}'); background-size:{TILE_SIZE *
      GRID_SIZE}px {TILE_SIZE * GRID_SIZE}px; background-position:-{col * TILE_SIZE}px -{row * TILE_SIZE}px;"
    onclick={() => handleSlide(pos)}
    onmouseenter={() => (hoveredPos = pos)}
    onmouseleave={() => (hoveredPos = null)}
    title="{tileId + 1}番のピース"
  >
    <!-- ヒント: タイル番号オーバーレイ -->
    {#if showHint}
      <span
        class="pointer-events-none absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-500 opacity-50 drop-shadow-md"
      >
        {tileId + 1}
      </span>
    {/if}
    <!-- ホバー時スライド方向矢印 -->
    {#if arrow}
      <span class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60">
        <Icon icon={arrow} class="size-10 text-gray-500 drop-shadow-md" />
      </span>
    {/if}
  </button>
{/snippet}

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">スライドパズル</h1>

  <div class="flex flex-wrap items-center justify-center gap-3">
    <SpawnButton onclick={handleStart} isLoading={$isLoading} started={$board.length > 0} />

    {#if $board.length > 0 && !$isGameClear}
      <button
        type="button"
        class="btn btn-sm {showHint ? 'preset-filled' : 'preset-tonal'}"
        onclick={() => (showHint = !showHint)}
        title="タイル番号の表示/非表示"
      >
        <Icon icon="mdi:help-circle-outline" class="size-5" />
        ヒント
      </button>

      {#if isAutoSolving}
        <span class="btn btn-sm preset-tonal-surface pointer-events-none">
          <Icon icon="mdi:loading" class="size-5 animate-spin" />
          解決中...
        </span>
      {:else}
        <button
          type="button"
          class="btn btn-sm preset-tonal-secondary"
          onclick={handleAutoSolve}
          disabled={isComputing}
        >
          <Icon
            icon={isComputing ? "mdi:loading" : "mdi:flag-variant-outline"}
            class="size-5 {isComputing ? 'animate-spin' : ''}"
          />
          {isComputing ? "計算中..." : "ギブアップ"}
        </button>
      {/if}
    {/if}
  </div>

  {#if $board.length > 0 && $pokeData}
    {@const imageUrl = $pokeData.imageUrls.artwork.front}

    {#if $isGameClear}
      <!-- クリア後: グリッド線なしで完全な画像を表示 -->
      <img
        src={imageUrl}
        alt={$pokeData.jaName}
        class="rounded-lg object-contain shadow"
        style="width:{TILE_SIZE * GRID_SIZE}px; height:{TILE_SIZE * GRID_SIZE}px;"
      />
    {:else}
      {@const emptyPos = $board.indexOf(null)}
      <!-- パズルグリッド -->
      <div class="border-surface-300 dark:border-surface-600 overflow-hidden rounded-lg border shadow">
        <div class="grid grid-cols-4">
          {#each $board as tileId, pos (pos)}
            {#if tileId !== null}
              {@render puzzleTile(tileId, pos, imageUrl, emptyPos)}
            {:else}
              <div class="bg-surface-200 dark:bg-surface-700" style="width:{TILE_SIZE}px; height:{TILE_SIZE}px;"></div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  {:else}
    <!-- プレースホルダー -->
    <div
      class="border-surface-300 text-surface-400 dark:border-surface-600 flex items-center justify-center rounded-lg border border-dashed"
      style="width:{TILE_SIZE * GRID_SIZE}px; height:{TILE_SIZE * GRID_SIZE}px;"
    >
      <p class="text-sm">はじめる を おしてね</p>
    </div>
  {/if}

  {#if $isGameClear && $pokeData}
    <div class="flex flex-col items-center gap-1">
      <p class="text-surface-600 dark:text-surface-300 text-sm">{$pokeData.jaName}</p>
      <p class="text-success-500 text-lg font-bold">{$moveCount} 手でクリア！</p>
    </div>
  {/if}
</div>
