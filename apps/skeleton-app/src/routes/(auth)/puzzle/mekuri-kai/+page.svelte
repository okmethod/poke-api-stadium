<script lang="ts">
  import Icon from "@iconify/svelte";
  import { TypeMemoryGame } from "$lib/application/usecases/TypeMemoryGame";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { watchResultSE } from "$lib/presentation/utils/watchEffect.svelte";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import PokeChip from "$lib/presentation/components/atoms/PokeChip.svelte";

  const facade = new TypeMemoryGame.Facade(getPokeRepository());
  const { isLoading, cards, isChecking, matchedPairCount, moveCount, totalPairCount, isGameClear, lastMatchResult } =
    TypeMemoryGame.Store;

  type Difficulty = "easy" | "hard";
  let difficulty = $state<Difficulty>("easy");

  watchResultSE(() => $lastMatchResult, playSE);

  async function handleStart(): Promise<void> {
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleSelectCard(index: number): void {
    facade.selectCard(index);
  }

  function handleReset(): void {
    facade.resetGame();
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンめくり 改</h1>

  <!-- スタートボタン / やり直しボタン -->
  <div class="flex gap-2">
    <SpawnButton onclick={handleStart} isLoading={$isLoading} disabled={$isChecking} started={$cards.length > 0} />
    {#if $cards.length > 0 && !$isGameClear}
      <button type="button" class="btn preset-tonal btn-sm" onclick={handleReset} disabled={$isChecking}>
        <Icon icon="mdi:arrow-u-down-left" class="size-5" />
        裏返す
      </button>
    {/if}
    <button
      type="button"
      class="btn btn-sm {difficulty === 'easy' ? 'preset-filled-success-500' : 'preset-filled-error-500'}"
      onclick={() => (difficulty = difficulty === "easy" ? "hard" : "easy")}
    >
      {difficulty === "easy" ? "かんたん" : "むずかしい"}
    </button>
  </div>

  <!-- カードグリッド -->
  {#if $cards.length > 0}
    <div class="h-full w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow sm:max-w-md">
      <div class="grid grid-cols-4 gap-2">
        {#each $cards as card, index (card.cardId)}
          <PokeChip
            imageUrl={card.pokeData.imageUrls.pixel.front}
            name={card.pokeData.jaName}
            type1={difficulty === "easy" ? card.pokeData.type1 : undefined}
            type2={difficulty === "easy" ? card.pokeData.type2 : undefined}
            face={card.isMatched ? "dimmed" : card.isFlipped ? "front" : "back"}
            onclick={!card.isFlipped && !card.isMatched && !$isChecking ? () => handleSelectCard(index) : undefined}
          />
        {/each}
      </div>
    </div>
  {:else}
    <div class="text-surface-400 h-full w-full max-w-sm rounded-lg border-1 border-dashed bg-white p-4 sm:max-w-md">
      <p class="text-center text-sm">はじめるボタン を おしてね</p>
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
