<script lang="ts">
  import { resolveImageUrl } from "$lib/domain/models/PokeData";
  import { TypeJanken } from "$lib/application/usecases/TypeJanken";
  import { TOTAL_ROUNDS } from "$lib/application/usecases/TypeJanken/facade";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { watchResultSE } from "$lib/presentation/utils/watchEffect.svelte";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import DifficultyButton from "$lib/presentation/components/buttons/DifficultyButton.svelte";
  import type { StarterType } from "$lib/application/usecases/TypeJanken/store";

  const facade = new TypeJanken.Facade(getPokeRepository());
  const {
    isLoading,
    buttonPokemons,
    currentPokemon,
    roundCount,
    score,
    roundResult,
    isGameOver,
    gameStartTime,
    finalElapsedMs,
  } = TypeJanken.Store;

  const STARTER_TYPES: StarterType[] = ["grass", "fire", "water"];
  const TYPE_LABELS: Record<StarterType, string> = { grass: "くさ", fire: "ほのお", water: "みず" };
  const JUDGMENT_LABELS: Record<"win" | "lose" | "draw", string> = {
    win: "勝ち",
    lose: "負け",
    draw: "あいこ",
  };
  const STAGE_LABELS: Record<string, string> = {
    basic: "負けて！",
    stage2: "勝って！",
  };

  type Difficulty = "easy" | "hard";
  let difficulty = $state<Difficulty>("easy");
  // ゲームが開始済み（進行中 or 終了）かどうか
  const isGameStarted = $derived($buttonPokemons !== null);
  // ゲーム進行中（難易度変更不可）
  const isGameActive = $derived(isGameStarted && !$isGameOver);

  // ライブタイマー（100ms 更新）
  let liveElapsedMs = $state(0);
  $effect(() => {
    if ($gameStartTime === null || $isGameOver) return;
    const interval = setInterval(() => {
      liveElapsedMs = Date.now() - $gameStartTime!;
    }, 100);
    return () => clearInterval(interval);
  });

  function formatTime(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    if (minutes > 0) return `${minutes}:${String(seconds).padStart(2, "0")}.${tenths}`;
    return `${seconds}.${tenths}秒`;
  }

  async function handleStart(): Promise<void> {
    liveElapsedMs = 0;
    const result = await facade.startGame(fetch, difficulty);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleReset(): void {
    facade.resetGame();
  }

  function handleSelectType(type: StarterType): void {
    facade.selectType(type);
  }

  watchResultSE(() => $roundResult, playSE);
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">あとだしタイプじゃんけん</h1>

  <!-- スタートボタン + タイマー / スコア表示 -->
  <div class="flex flex-wrap items-center justify-center gap-4">
    <SpawnButton onclick={isGameStarted ? handleReset : handleStart} isLoading={$isLoading} started={isGameStarted} />
    <DifficultyButton
      value={difficulty}
      levels={["easy", "hard"]}
      onchange={(v) => (difficulty = v as Difficulty)}
      disabled={isGameActive}
    />
    {#if $buttonPokemons !== null}
      <span class="text-surface-600 dark:text-surface-300 text-sm">
        {formatTime($isGameOver ? ($finalElapsedMs ?? 0) : liveElapsedMs)}
        &nbsp;｜&nbsp; 正解: {$score} / {TOTAL_ROUNDS} &nbsp; 試行: {$roundCount}
      </span>
    {/if}
  </div>

  {#if $isGameOver}
    <!-- ゲーム終了 -->
    <div class="flex flex-col items-center gap-4 py-8">
      <p class="h3">10問正解！ クリア！</p>
      <p class="text-5xl font-bold">{formatTime($finalElapsedMs ?? 0)}</p>
      <p class="text-surface-500 text-sm">試行回数: {$roundCount} 回</p>
    </div>
  {:else if $currentPokemon !== null && $buttonPokemons !== null}
    {@const imageUrl = resolveImageUrl($currentPokemon.pokeData.imageUrls)}
    <!-- 出現ポケモン -->
    <div class="flex flex-col items-center gap-1">
      <div class="border-surface-200 relative size-40 overflow-hidden rounded-2xl border bg-gray-50 shadow-lg">
        {#if imageUrl}
          <img src={imageUrl} alt={$currentPokemon.pokeData.jaName} class="size-full object-contain p-2" />
        {/if}
        <!-- 進化段階バッジ（むずかしいのみ表示） -->
        {#if difficulty === "hard"}
          <span
            class="absolute top-1 right-1 rounded px-1 py-0.5 text-xs font-bold text-white
              {$currentPokemon.stage === 'stage2'
              ? 'bg-warning-500'
              : $currentPokemon.stage === 'basic'
                ? 'bg-success-500'
                : 'bg-surface-500'}"
          >
            {STAGE_LABELS[$currentPokemon.stage]}
          </span>
        {/if}
      </div>
      <p class="text-lg font-bold">{$currentPokemon.pokeData.jaName}</p>
    </div>

    <!-- 判定結果 or 選択ボタン -->
    {#if $roundResult !== null}
      <!-- 結果表示（0.5秒後に自動進行） -->
      <div class="flex flex-col items-center gap-2">
        <p class="text-3xl font-bold {$roundResult.isCorrect ? 'text-success-500' : 'text-error-500'}">
          {JUDGMENT_LABELS[$roundResult.judgment]}
          {$roundResult.isCorrect ? "⭕" : "❌"}
        </p>
        <p class="text-surface-500 text-sm">
          正解: <strong>{TYPE_LABELS[$currentPokemon.correctType]}</strong>（{$currentPokemon.correctType ===
          $currentPokemon.starterType
            ? "あいこ"
            : $roundResult.judgment === "win"
              ? "勝つ手"
              : "負ける手"}）
        </p>
      </div>
    {:else}
      <!-- 選択ボタン（中間進化3体） -->
      <p class="text-surface-500 text-sm">どのタイプで勝負する？</p>
      <div class="flex gap-3">
        {#each STARTER_TYPES as type (type)}
          {@const btnPoke = $buttonPokemons[type]}
          {@const btnImageUrl = resolveImageUrl(btnPoke.imageUrls)}
          <button
            type="button"
            class="btn preset-tonal flex h-auto flex-col items-center gap-1 px-4 py-3"
            onclick={() => handleSelectType(type)}
          >
            {#if btnImageUrl}
              <img src={btnImageUrl} alt={btnPoke.jaName} class="size-16 object-contain" />
            {/if}
            <span class="text-xs font-bold">{btnPoke.jaName}</span>
          </button>
        {/each}
      </div>
    {/if}
  {:else if !$isLoading}
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-1 border-dashed"
    >
      <p class="text-sm">はじめるボタン を おしてね</p>
    </div>
  {/if}
</div>
