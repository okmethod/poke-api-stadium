<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { WeightComparison } from "$lib/application/usecases/WeightComparison";
  import { getMatterJsSeesawAdapter } from "$lib/infrastructure/adapters/MatterJsSeesawAdapter";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import SeesawCanvas from "$lib/presentation/components/physics/SeesawCanvas.svelte";

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 220;

  const engine = getMatterJsSeesawAdapter();
  const facade = new WeightComparison.Facade(engine, getPokeRepository());
  const { pokeDataList, isRevealed, isLoading } = WeightComparison.Store;

  let isReady = $state(false);

  onMount(async () => {
    await facade.initialize({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, gravity: 1 });
    isReady = true;
  });

  onDestroy(() => {
    facade.dispose();
  });

  async function handlePick(): Promise<void> {
    const result = await facade.pickPokemons(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleReveal(): void {
    facade.reveal();
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンおもさくらべ 改</h1>

  <!-- よびだすボタン -->
  <div class="flex flex-wrap items-center justify-center gap-4">
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={handlePick}
      disabled={$isLoading}
      title="ポケモンをよびだす"
    >
      {#if $isLoading}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
      {:else}
        <Icon icon="mdi:pokeball" class="size-5" />
      {/if}
      よびだす
    </button>
  </div>

  <!-- ポケモン情報（左右） + シーソーキャンバス -->
  <div class="flex w-full max-w-2xl flex-col items-center gap-4">
    <!-- シーソーキャンバス -->
    {#if isReady}
      <SeesawCanvas {engine} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    {:else}
      <div
        class="border-surface-400 flex items-center justify-center rounded border"
        style="width:{CANVAS_WIDTH}px; height:{CANVAS_HEIGHT}px"
      >
        <Icon icon="mdi:loading" class="text-surface-400 size-8 animate-spin" />
      </div>
    {/if}
  </div>

  <!-- ポケモン名（左右） -->
  <div class="flex w-72 justify-between px-4">
    {#if $pokeDataList.length === 2}
      {#each $pokeDataList as pokeData, key (key)}
        <div class="flex flex-col items-center gap-1">
          {#if $isRevealed}
            <span class="text-lg font-bold">{pokeData.jaName}</span>
            <span class="text-lg font-bold">{pokeData.weight.toFixed(1)}kg</span>
          {:else}
            <span class="text-surface-400 text-lg">???</span>
          {/if}
        </div>
      {/each}
    {:else}
      <!-- 未選出プレースホルダー -->
      <span class="text-surface-400 w-full text-lg">よびだすボタン を おしてね</span>
    {/if}
  </div>

  <!-- 回答ボタン（選出後・公開前のみ） -->
  {#if $pokeDataList.length > 0 && !$isRevealed}
    <button type="button" class="btn preset-tonal" onclick={handleReveal}>
      <Icon icon="mdi:eye-outline" class="size-5" />
      こたえをみる
    </button>
  {/if}
</div>
