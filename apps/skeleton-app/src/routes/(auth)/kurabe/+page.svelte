<script lang="ts">
  import { get } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { dndzone } from "svelte-dnd-action";
  import type { DndEvent } from "svelte-dnd-action";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { StatsSortingQuiz } from "$lib/application/usecases/StatsSortingQuiz";
  import type { CompareModeName } from "$lib/application/usecases/StatsSortingQuiz";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import PokeTile from "$lib/presentation/components/atoms/PokeTile.svelte";

  const facade = new StatsSortingQuiz.Facade(getPokeRepository());
  const { COMPARE_MODES, POKE_COUNT_MIN, POKE_COUNT_MAX } = StatsSortingQuiz;
  const { pokeDataList, isOpen, isLoading, result } = StatsSortingQuiz.Store;

  // ゲーム設定
  let compareMode = $state<CompareModeName>("height");
  let pokeCount = $state<number>(3);

  // svelte-dnd-action は id フィールドを必要とするため PokeData（id あり）をそのまま利用
  let orderedList = $state<PokeData[]>([]);

  async function handlePick(): Promise<void> {
    const facadeResult = await facade.pickPokemons(fetch, pokeCount);
    if (!facadeResult.success && facadeResult.error) {
      showErrorToast(facadeResult.error);
    } else {
      orderedList = [...get(pokeDataList)];
    }
  }

  function handleReveal(): void {
    facade.revealResult(orderedList, compareMode);
  }

  function handleCompareModeChange(): void {
    // 比較モード変更時はリセットして、既存リストの並び順も元に戻す
    facade.reset();
    orderedList = [...get(pokeDataList)];
  }

  function handlePokeCountChange(): void {
    facade.reset();
  }

  // ドラッグ中の仮並び順を反映（確定前）
  function handleConsider(event: CustomEvent<DndEvent<PokeData>>): void {
    orderedList = event.detail.items;
  }

  // ドロップ確定時に並び順を確定
  function handleFinalize(event: CustomEvent<DndEvent<PokeData>>): void {
    orderedList = event.detail.items;
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンXXくらべ</h1>

  <!-- ゲーム設定 -->
  <div class="flex flex-wrap items-center justify-center gap-4">
    <div class="flex items-center gap-2">
      <select bind:value={compareMode} onchange={handleCompareModeChange} class="select w-auto px-3 py-1">
        {#each Object.entries(COMPARE_MODES) as [key, mode] (key)}
          <option value={key}>{mode.name}</option>
        {/each}
      </select>
      <span class="text-sm">で くらべる</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm">ポケモン を</span>
      <input
        type="number"
        min={POKE_COUNT_MIN}
        max={POKE_COUNT_MAX}
        bind:value={pokeCount}
        onchange={handlePokeCountChange}
        class="input w-16 px-2 py-1 text-center"
      />
      <span class="text-sm">たい よびだす</span>
    </div>

    <!-- よびだすボタン -->
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

  <!-- ポケモン並べ替えエリア -->
  {#if orderedList.length > 0}
    <!-- dndzone がコンテナを管理するため flex ラッパーとして使用 -->
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full justify-center gap-4 overflow-x-auto rounded-xl border-2 border-dashed pb-1"
      use:dndzone={{ items: orderedList, flipDurationMs: 200, dropTargetStyle: {} }}
      onconsider={handleConsider}
      onfinalize={handleFinalize}
    >
      {#each orderedList as pokeData, index (pokeData.id)}
        {@const imageUrl = pokeData.imageUrls.pixel.front ?? pokeData.imageUrls.artwork.front ?? null}
        <div class="flex size-64 cursor-grab flex-col items-center justify-center gap-1 select-none">
          <PokeTile name={pokeData.jaName} {imageUrl} type1={pokeData.type1} type2={pokeData.type2} />
          <p class="min-h-5 text-center font-bold">
            {$isOpen ? COMPARE_MODES[compareMode].formatValue(pokeData) : "???"}
          </p>
          <p class="text-surface-500 text-center">{index + 1} ばんめ</p>
        </div>
      {/each}
    </div>

    <!-- こたえあわせボタン -->
    <div class="flex flex-col items-center gap-3">
      <button type="button" class="btn preset-filled btn-lg" onclick={handleReveal} disabled={$isOpen}>
        こたえあわせ
      </button>

      <!-- 結果メッセージ -->
      {#if $result !== null}
        <p class="text-xl font-bold">{$result}</p>
      {/if}
    </div>
  {:else}
    <!-- 未選出状態のプレースホルダー -->
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed"
    >
      <p>よびだすボタン を おしてね</p>
    </div>
  {/if}
</div>
