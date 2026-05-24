<script lang="ts">
  import Icon from "@iconify/svelte";
  import { toInfixString } from "$lib/domain/models/Arithmetic";
  import { BattleCalcQuiz } from "$lib/application/usecases/BattleCalcQuiz";
  import type { Difficulty } from "$lib/application/usecases/BattleCalcQuiz";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import DifficultyButton from "$lib/presentation/components/buttons/DifficultyButton.svelte";

  const facade = new BattleCalcQuiz.Facade(getPokeRepository());
  const { isLoading, pokeDataPair, problem, difficulties } = BattleCalcQuiz.Store;

  let revealed = $state(false);

  // 問題が変わったら答えを隠す
  $effect(() => {
    void $problem;
    revealed = false;
  });

  async function handleStart(): Promise<void> {
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  async function handleNext(): Promise<void> {
    const result = await facade.nextProblem(fetch);
    if (!result.success && result.error) showErrorToast(result.error);
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">バトル計算ドリル</h1>

  <!-- スタートボタン + 難易度選択 -->
  <div class="flex flex-wrap items-center justify-center gap-4">
    <SpawnButton onclick={handleStart} isLoading={$isLoading} started={$pokeDataPair !== null} />
    <DifficultyButton
      value={$difficulties[0] ?? "easy"}
      levels={["easy", "normal", "hard"]}
      onchange={(v) => facade.setDifficulty(v as Difficulty)}
    />
  </div>

  {#if $pokeDataPair !== null && $problem !== null}
    <!-- ポケモン画像 -->
    <div class="flex items-end justify-center gap-6">
      <div class="flex flex-col items-center gap-1">
        <img
          src={$pokeDataPair[0].imageUrls.artwork.front}
          alt={$pokeDataPair[0].jaName}
          class="h-24 w-24 object-contain"
        />
        <span class="text-sm font-medium">{$pokeDataPair[0].jaName}</span>
      </div>
      <span class="text-surface-400 pb-8 text-xl font-bold">VS</span>
      <div class="flex flex-col items-center gap-1">
        <img
          src={$pokeDataPair[1].imageUrls.artwork.front}
          alt={$pokeDataPair[1].jaName}
          class="h-24 w-24 object-contain"
        />
        <span class="text-sm font-medium">{$pokeDataPair[1].jaName}</span>
      </div>
    </div>

    <!-- バトル状況 + 計算式カード -->
    <div class="card preset-tonal w-full max-w-lg p-6 text-center">
      <p class="text-primary-500 mb-3 font-bold">{$problem.situation}</p>
      <p class="overflow-x-auto text-base font-semibold whitespace-nowrap sm:text-lg">
        {toInfixString($problem.expr)} = ?
      </p>
      <p class="text-surface-400 mt-2 text-sm">「{$problem.answerLabel}」は？</p>
    </div>

    <!-- 答え表示エリア -->
    {#if !revealed}
      <button type="button" class="btn preset-tonal" onclick={() => (revealed = true)}> こたえをみる </button>
    {:else}
      <div class="flex flex-col items-center gap-4">
        <div class="bg-primary-200-800 rounded-xl px-8 py-3 text-center">
          <p class="text-surface-500 text-xs">{$problem.answerLabel}</p>
          <p class="text-3xl font-bold">{$problem.answer}</p>
        </div>
        <button type="button" class="btn preset-filled" onclick={handleNext} disabled={$isLoading}>
          <Icon icon="mdi:arrow-right" class="size-5" />
          つぎへ
        </button>
      </div>
    {/if}
  {/if}
</div>
