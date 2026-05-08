<script lang="ts">
  import { get } from "svelte/store";
  import Icon from "@iconify/svelte";
  import DndSortablePokeTiles, {
    toDndItems,
    type DndPokeData,
  } from "$lib/presentation/components/atoms/DndSortablePokeTiles.svelte";
  import { StatsSortingQuiz, type CompareModeName } from "$lib/application/usecases/StatsSortingQuiz";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { watchResultSE } from "$lib/presentation/utils/watchEffect.svelte";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";

  const facade = new StatsSortingQuiz.Facade(getPokeRepository());
  const { COMPARE_MODES, POKE_COUNT_MIN, POKE_COUNT_MAX } = StatsSortingQuiz;
  const { pokeDataList, isOpen, isLoading, result } = StatsSortingQuiz.Store;

  // ゲーム設定
  let compareMode = $state<CompareModeName>("height");
  let pokeCount = $state<number>(3);

  let orderedList = $state<DndPokeData[]>([]);

  async function handlePick(): Promise<void> {
    const facadeResult = await facade.pickPokemons(fetch, pokeCount);
    if (!facadeResult.success && facadeResult.error) {
      showErrorToast(facadeResult.error);
    } else {
      orderedList = toDndItems(get(pokeDataList));
    }
  }

  function handleReveal(): void {
    facade.revealResult(orderedList, compareMode);
  }

  function handleCompareModeChange(): void {
    // 比較モード変更時はリセットして、既存リストの並び順も元に戻す
    facade.reset();
    orderedList = toDndItems(get(pokeDataList));
  }

  function handlePokeCountChange(): void {
    facade.reset();
  }

  watchResultSE(() => $result, playSE);
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンXXくらべ</h1>

  <!-- ゲーム設定 -->
  <div class="flex flex-wrap items-center justify-center gap-4">
    <div class="flex items-center gap-2">
      <span class="text-sm"></span>
      <input
        type="number"
        min={POKE_COUNT_MIN}
        max={POKE_COUNT_MAX}
        bind:value={pokeCount}
        onchange={handlePokeCountChange}
        class="input w-16 px-2 py-1 text-center"
      />
      <span class="text-sm">たいの ポケモンを</span>
    </div>
    <div class="flex items-center gap-2">
      <select bind:value={compareMode} onchange={handleCompareModeChange} class="select w-auto px-3 py-1">
        {#each Object.entries(COMPARE_MODES) as [key, mode] (key)}
          <option value={key}>{mode.name}</option>
        {/each}
      </select>
      <span class="text-sm">で くらべる</span>
    </div>
    <SpawnButton onclick={handlePick} isLoading={$isLoading} started={$pokeDataList.length > 0} />
  </div>

  <!-- ポケモン並べ替えエリア -->
  {#if orderedList.length > 0}
    <DndSortablePokeTiles
      bind:items={orderedList}
      labelFn={(p) => COMPARE_MODES[compareMode].formatValue(p)}
      isOpen={$isOpen}
    />

    <!-- 回答ボタン -->
    <div class="flex flex-col items-center gap-3">
      <button type="button" class="btn preset-tonal" onclick={handleReveal} disabled={$isOpen}>
        <Icon icon="mdi:eye-outline" class="size-5" />
        こたえをみる
      </button>

      <!-- 結果メッセージ -->
      {#if $result !== null}
        <p class="text-xl font-bold">{$result.message}</p>
      {/if}
    </div>
  {:else}
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed"
    >
      <p class="text-sm">はじめるボタン を おしてね</p>
    </div>
  {/if}
</div>
