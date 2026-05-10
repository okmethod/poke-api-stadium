<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { TypingGame } from "$lib/application/usecases/TypingGame";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";

  const facade = new TypingGame.Facade(getPokeRepository());
  const {
    isLoading,
    phase,
    currentPokeData,
    currentIndex,
    targetRomaji,
    typedCount,
    totalCorrectChars,
    totalErrors,
    accuracy,
    gameStartMs,
    elapsedMs,
  } = TypingGame.Store;

  const TOTAL_ROUNDS = TypingGame.Store.TOTAL_ROUNDS;

  let displayMs = $state(0);
  let isError = $state(false);
  let timerInterval: ReturnType<typeof setInterval> | null = null;

  function startTimer(): void {
    if (timerInterval !== null) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      const startMs = get(gameStartMs);
      if (startMs !== null) displayMs = Date.now() - startMs;
    }, 100);
  }

  function stopTimer(): void {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function formatTime(ms: number): string {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    const tenth = Math.floor((ms % 1000) / 100);
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${tenth}`;
  }

  function handleKeyDown(e: KeyboardEvent): void {
    const char = e.key.toLowerCase();
    if (!/^[a-z-]$/.test(char)) return;
    const result = facade.processChar(char);
    if (!result.correct) {
      isError = true;
      setTimeout(() => (isError = false), 150);
    }
  }

  async function handleStart(): Promise<void> {
    displayMs = 0;
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    const unsubPhase = phase.subscribe((p) => {
      if (p === "playing") startTimer();
      else stopTimer();
    });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unsubPhase();
      stopTimer();
    };
  });
</script>

{#snippet charSpan(char: string, state: "typed" | "current" | "error" | "pending")}
  {#if state === "typed"}
    <span class="text-success-500">{char}</span>
  {:else if state === "error"}
    <span class="text-error-500 underline underline-offset-4">{char}</span>
  {:else if state === "current"}
    <span class="text-primary-300 underline underline-offset-4">{char}</span>
  {:else}
    <span class="text-surface-400 dark:text-surface-500">{char}</span>
  {/if}
{/snippet}

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">タイピングゲーム</h1>

  <div class="flex flex-wrap items-center justify-center gap-3">
    <SpawnButton onclick={handleStart} isLoading={$isLoading} started={$phase !== "idle"} />
  </div>

  {#if $phase === "playing" && $currentPokeData}
    <!-- 進捗・タイマー -->
    <div class="text-surface-600 dark:text-surface-300 flex items-center gap-6 text-sm">
      <span>{$currentIndex + 1} / {TOTAL_ROUNDS}</span>
      <span class="font-mono text-lg">{formatTime(displayMs)}</span>
    </div>

    <!-- ポケモン画像 -->
    {#if $currentPokeData.imageUrls.artwork.front}
      <img
        src={$currentPokeData.imageUrls.artwork.front}
        alt={$currentPokeData.jaName}
        class="h-40 w-40 object-contain"
      />
    {/if}

    <!-- ポケモン名 -->
    <p class="text-surface-700 dark:text-surface-200 text-xl font-bold">{$currentPokeData.jaName}</p>

    <!-- タイピング対象テキスト -->
    <div class="bg-surface-100 dark:bg-surface-800 rounded-xl px-6 py-4 font-mono text-4xl tracking-widest">
      {#each $targetRomaji.split("") as char, i (i)}
        {#if i < $typedCount}
          {@render charSpan(char, "typed")}
        {:else if i === $typedCount && isError}
          {@render charSpan(char, "error")}
        {:else if i === $typedCount}
          {@render charSpan(char, "current")}
        {:else}
          {@render charSpan(char, "pending")}
        {/if}
      {/each}
    </div>

    <!-- 誤打数 -->
    <p class="text-error-500 text-sm">ミス: {$totalErrors}</p>
  {:else if $phase === "idle"}
    <!-- プレースホルダー -->
    <div
      class="border-surface-300 text-surface-400 dark:border-surface-600 flex h-64 w-72 items-center justify-center rounded-xl border border-dashed"
    >
      <p class="text-sm">はじめる を おしてね</p>
    </div>
  {/if}

  {#if $phase === "result"}
    <!-- 結果表示 -->
    <div class="card preset-outlined-surface-200-800 flex flex-col items-center gap-4 rounded-2xl p-8">
      <h2 class="h4">結果</h2>
      <dl class="grid grid-cols-2 gap-x-8 gap-y-2 text-center">
        <dt class="text-surface-500 text-sm">合計タイム</dt>
        <dd class="font-mono text-lg font-bold">{formatTime($elapsedMs)}</dd>
        <dt class="text-surface-500 text-sm">正打数</dt>
        <dd class="text-success-500 font-mono text-lg font-bold">{$totalCorrectChars}</dd>
        <dt class="text-surface-500 text-sm">誤打数</dt>
        <dd class="text-error-500 font-mono text-lg font-bold">{$totalErrors}</dd>
        <dt class="text-surface-500 text-sm">精度</dt>
        <dd class="font-mono text-lg font-bold">{$accuracy}%</dd>
      </dl>
    </div>
  {/if}
</div>
