<script lang="ts">
  import { MemoryGame } from "$lib/application/usecases/MemoryGame";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import MemoryCardGrid from "./_components/MemoryCardGrid.svelte";

  const facade = new MemoryGame.Facade(getPokeRepository());
  const { isLoading, cards, isChecking, matchedPairCount, moveCount, totalPairCount, isGameClear } = MemoryGame.Store;

  // クリア時に正解音を鳴らす（初回マウント時はスキップ）
  let seEffectReady = false;
  $effect(() => {
    const cleared = $isGameClear;
    if (!seEffectReady) {
      seEffectReady = true;
      return;
    }
    if (cleared) playSE.correct();
  });

  async function handleStart(): Promise<void> {
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleSelectCard(index: number): void {
    facade.selectCard(index);
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンめくり</h1>

  <!-- スタートボタン -->
  <SpawnButton onclick={handleStart} isLoading={$isLoading} disabled={$isChecking} started={$cards.length > 0} />

  <!-- カードグリッド -->
  {#if $cards.length > 0}
    <div class="h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow sm:max-w-md">
      <MemoryCardGrid cards={$cards} onSelectCard={handleSelectCard} />
    </div>
  {:else}
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed"
    >
      <p class="text-sm">はじめるボタン を おしてね</p>
    </div>
  {/if}

  <!-- スコア表示 -->
  {#if $cards.length > 0}
    <div class="flex gap-6 text-sm">
      <span>手数: <strong>{$moveCount}</strong></span>
      <span>ペア: <strong>{$matchedPairCount} / {$totalPairCount}</strong></span>
    </div>
  {/if}

  <!-- クリアメッセージ -->
  {#if $isGameClear}
    <p class="text-success-500 font-bold">{$moveCount} 手 で クリア 🎉</p>
  {/if}
</div>
