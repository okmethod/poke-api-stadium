<script lang="ts">
  import { KanjiFillQuiz, parseFlavorTextPair } from "$lib/application/usecases/KanjiFillQuiz";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import KanjiQuizCard from "./_components/KanjiQuizCard.svelte";

  const facade = new KanjiFillQuiz.Facade(getPokeRepository());
  const { isLoading, pokeData, textPair } = KanjiFillQuiz.Store;

  let isKakiMode = $state(false);
  const mode = $derived(isKakiMode ? "kaki" : "yomi");
  const quizItems = $derived($textPair ? parseFlavorTextPair($textPair) : []);

  async function handleStart(): Promise<void> {
    const result = await facade.start(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <div class="flex flex-wrap items-center justify-center gap-3">
    <h1 class="h3 sm:h2">ポケモン漢字ドリル</h1>
    <span class="text-surface-400">:</span>
    <label class="flex cursor-pointer items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={isKakiMode}
        aria-label="{isKakiMode ? '書き' : '読み'}問題モード切り替え"
        class="relative h-6 w-11 rounded-full transition-colors {isKakiMode ? 'bg-primary-500' : 'bg-surface-400-600'}"
        onclick={() => (isKakiMode = !isKakiMode)}
      >
        <span
          class="absolute inset-y-1 h-4 w-4 rounded-full bg-white shadow transition-[left] {isKakiMode
            ? 'left-6'
            : 'left-1'}"
        ></span>
      </button>
      <span class="text-sm">{isKakiMode ? "書き" : "読み"}問題モード</span>
    </label>
  </div>

  <SpawnButton onclick={handleStart} isLoading={$isLoading} started={$pokeData !== null} />

  {#if $pokeData && $textPair}
    <div class="flex w-full max-w-3xl flex-col items-center gap-4">
      <!-- ポケモン情報 -->
      <div class="flex flex-col items-center gap-1">
        <img
          src={$pokeData.imageUrls.pixel.front ?? $pokeData.imageUrls.artwork.front}
          alt={$pokeData.jaName}
          class="h-24 w-24 object-contain"
        />
        <p class="text-surface-500 text-sm">{$pokeData.jaName}</p>
      </div>

      <!-- クイズカード一覧 -->
      {#if quizItems.length > 0}
        <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {#each quizItems as item, i (i)}
            <KanjiQuizCard {item} {mode} />
          {/each}
        </div>
      {:else}
        <p class="text-surface-400 text-sm">漢字が含まれるテキストがありませんでした</p>
      {/if}
    </div>
  {/if}
</div>
