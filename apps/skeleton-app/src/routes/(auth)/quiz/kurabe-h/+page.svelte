<script lang="ts">
  import { get } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import { HeightComparison } from "$lib/application/usecases/HeightComparison";
  import { getMatterJs2dPhysicsAdapter } from "$lib/infrastructure/adapters/MatterJs2dPhysicsAdapter";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import PokeTile from "$lib/presentation/components/atoms/PokeTile.svelte";
  import PhysicsCanvas2d from "$lib/presentation/components/physics/PhysicsCanvas2d.svelte";

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 160;
  const POKE_COUNT = 3;

  const engine = getMatterJs2dPhysicsAdapter();
  const facade = new HeightComparison.Facade(engine, getPokeRepository());
  const { pokeDataList, isRevealed, isLoading, result } = HeightComparison.Store;

  let isReady = $state(false);
  let isRevealing = $state(false);
  // svelte-dnd-action は id フィールドを必要とするため PokeData（id あり）をそのまま利用
  let orderedList = $state<PokeData[]>([]);

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
      orderedList = [...get(pokeDataList)];
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

  // $effect は初回マウント時にも実行されるため、初回はスキップして変化時のみ SE を鳴らす
  let seEffectReady = false;
  $effect(() => {
    const currentResult = $result;
    if (!seEffectReady) {
      seEffectReady = true;
      return;
    }
    if (currentResult !== null) {
      if (currentResult.isCorrect) playSE.correct();
      else playSE.incorrect();
    }
  });

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
  <h1 class="h3 sm:h2">ポケモンたかさくらべ 改</h1>

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

  <!-- ポケモン並べ替えエリア（公開前のみ表示） -->
  {#if orderedList.length > 0 && !$isRevealed}
    <!-- dndzone がコンテナを管理するため flex ラッパーとして使用 -->
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl justify-center gap-4 overflow-x-auto rounded-xl border-2 border-dashed pb-1"
      use:dndzone={{ items: orderedList, flipDurationMs: 200, dropTargetStyle: {} }}
      onconsider={handleConsider}
      onfinalize={handleFinalize}
    >
      {#each orderedList as pokeData, index (pokeData.speciesId)}
        {@const imageUrl = pokeData.imageUrls.pixel.front ?? pokeData.imageUrls.artwork.front ?? null}
        <div class="flex size-64 cursor-grab flex-col items-center justify-center gap-1 select-none">
          <PokeTile name={pokeData.jaName} {imageUrl} type1={pokeData.type1} type2={pokeData.type2} />
          <p class="min-h-5 text-center font-bold">???</p>
          <p class="text-surface-500 text-center">{index + 1} ばんめ</p>
        </div>
      {/each}
    </div>

    <!-- 回答ボタン -->
    <button type="button" class="btn preset-tonal" onclick={handleReveal} disabled={isRevealing}>
      {#if isRevealing}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
      {/if}
      <Icon icon="mdi:eye-outline" class="size-5" />
      こたえをみる
    </button>
  {:else if !$isRevealed && !$isLoading}
    <!-- 未選出プレースホルダー -->
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed"
    >
      <p>よびだすボタン を おしてね</p>
    </div>
  {/if}

  <!-- 物理キャンバス＋結果一覧（公開後） -->
  {#if $isRevealed}
    {#if isReady}
      <PhysicsCanvas2d {engine} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
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
