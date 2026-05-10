<script lang="ts">
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";
  import { MoveWhack } from "$lib/application/usecases/MoveWhack";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { pokeTypeColor } from "$lib/domain/models/PokeType";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import { playSE } from "$lib/presentation/sounds/soundEffects";

  const facade = new MoveWhack.Facade(getPokeRepository());
  const { isLoading, phase, activeSlots, score, misses, gameEndMs, moveResult } = MoveWhack.Store;
  const { GAME_DURATION_MS, MAX_ACTIVE_SLOTS } = MoveWhack.Store;

  let timeRemaining = $state(GAME_DURATION_MS);
  let displayTimer: ReturnType<typeof setInterval> | null = null;

  function startDisplayTimer(): void {
    if (displayTimer !== null) clearInterval(displayTimer);
    displayTimer = setInterval(() => {
      const endMs = get(gameEndMs);
      if (endMs !== null) timeRemaining = Math.max(0, endMs - Date.now());
    }, 100);
  }

  function stopDisplayTimer(): void {
    if (displayTimer !== null) {
      clearInterval(displayTimer);
      displayTimer = null;
    }
  }

  $effect(() => {
    const currentPhase = $phase;
    if (currentPhase === "playing") startDisplayTimer();
    else stopDisplayTimer();
  });

  // SE再生（初回スキップ）
  let seEffectReady = false;
  $effect(() => {
    const result = $moveResult;
    if (!seEffectReady) {
      seEffectReady = true;
      return;
    }
    if (result?.isHit) playSE.correct();
    else if (result) playSE.incorrect();
  });

  async function handleStart(): Promise<void> {
    timeRemaining = GAME_DURATION_MS;
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  function handleSelectMove(moveType: "fire" | "water" | "grass" | "electric"): void {
    facade.selectMove(moveType);
  }

  onDestroy(() => {
    stopDisplayTimer();
    facade.dispose();
  });
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ばつぐんラッシュ</h1>

  <div class="flex flex-wrap items-center justify-center gap-4">
    <SpawnButton onclick={handleStart} isLoading={$isLoading} started={$phase !== "idle"} />
    {#if $phase === "playing"}
      <span class="font-mono text-3xl font-bold tabular-nums">{Math.ceil(timeRemaining / 1000)}</span>
      <span class="text-surface-500 text-sm">秒</span>
    {/if}
  </div>

  {#if $phase === "playing"}
    <div class="text-surface-600 dark:text-surface-300 flex gap-6 text-sm">
      <span>スコア: <strong class="text-success-500 text-base">{$score}</strong></span>
      <span>おてつき: <strong class="text-error-500 text-base">{$misses}</strong></span>
    </div>
  {/if}

  <!-- フィードバックメッセージ（高さ固定でレイアウトシフトを防ぐ） -->
  <div class="h-8 text-center">
    {#if $moveResult}
      <p class="text-xl font-bold" class:text-warning-500={$moveResult.isHit} class:text-error-500={!$moveResult.isHit}>
        {$moveResult.message}
      </p>
    {/if}
  </div>

  {#if $phase === "playing"}
    <!-- ポケモンスロット（2×2 グリッド） -->
    <div class="grid grid-cols-2 gap-4">
      {#each Array.from({ length: MAX_ACTIVE_SLOTS }, (_, i) => i) as pos (pos)}
        {@const slot = $activeSlots.find((s) => s.position === pos) ?? null}
        <div
          class="bg-surface-100 dark:bg-surface-800 border-surface-300 dark:border-surface-600 flex h-36 w-36 flex-col items-center justify-center rounded-2xl border border-dashed"
        >
          {#if slot}
            {#if slot.pokeData.imageUrls.artwork.front}
              <img
                src={slot.pokeData.imageUrls.artwork.front}
                alt={slot.pokeData.jaName}
                class="h-24 w-24 object-contain"
              />
            {/if}
            <p class="text-surface-600 dark:text-surface-300 text-xs">{slot.pokeData.jaName}</p>
          {:else}
            <span class="text-surface-300 dark:text-surface-600 text-4xl select-none">？</span>
          {/if}
        </div>
      {/each}
    </div>

    <!-- わざボタン（2×2） -->
    <div class="grid grid-cols-2 gap-3">
      {#each MoveWhack.FIXED_MOVES as move (move.type)}
        <button
          class="rounded-xl px-8 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95"
          style="background-color: {pokeTypeColor(move.type)};"
          onclick={() => handleSelectMove(move.type)}
        >
          {move.jaName}
        </button>
      {/each}
    </div>
  {:else if $phase === "idle"}
    <div
      class="border-surface-300 text-surface-400 dark:border-surface-600 flex h-64 w-72 items-center justify-center rounded-xl border border-dashed"
    >
      <p class="text-sm">はじめる を おしてね</p>
    </div>
  {/if}

  {#if $phase === "result"}
    <div class="card preset-outlined-surface-200-800 flex flex-col items-center gap-4 rounded-2xl p-8">
      <h2 class="h4">結果</h2>
      <dl class="grid grid-cols-2 gap-x-8 gap-y-2 text-center">
        <dt class="text-surface-500 text-sm">スコア</dt>
        <dd class="text-success-500 font-mono text-lg font-bold">{$score}</dd>
        <dt class="text-surface-500 text-sm">おてつき</dt>
        <dd class="text-error-500 font-mono text-lg font-bold">{$misses}</dd>
      </dl>
    </div>
  {/if}
</div>
