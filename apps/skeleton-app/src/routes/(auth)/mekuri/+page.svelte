<script lang="ts">
  import Icon from "@iconify/svelte";
  import { MemoryGame } from "$lib/application/usecases/MemoryGame";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
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
  <button type="button" class="btn preset-tonal btn-sm" onclick={handleStart} disabled={$isLoading || $isChecking}>
    {#if $isLoading}
      <Icon icon="mdi:loading" class="size-5 animate-spin" />
      よみこみ中...
    {:else if $cards.length > 0}
      <Icon icon="mdi:restart" class="size-5" />
      もう一度
    {:else}
      <Icon icon="mdi:pokeball" class="size-5" />
      スタート
    {/if}
  </button>

  <!-- カードグリッド -->
  <div class="h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow sm:max-w-md">
    {#if $cards.length > 0}
      <MemoryCardGrid cards={$cards} onSelectCard={handleSelectCard} />
    {:else}
      <p class="text-center text-gray-500">スタートボタンを押してね</p>
    {/if}
  </div>

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
