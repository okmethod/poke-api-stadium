<script lang="ts">
  import { onDestroy } from "svelte";
  import { get } from "svelte/store";
  import type { PokeTypeName } from "$lib/domain/models/PokeType";
  import type { ActiveMove } from "$lib/application/usecases/MoveWhack/store";
  import { MoveWhack } from "$lib/application/usecases/MoveWhack";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { pokeTypeColor } from "$lib/domain/models/PokeType";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";
  import { playSE } from "$lib/presentation/sounds/soundEffects";

  const facade = new MoveWhack.Facade(getPokeRepository());
  const { isLoading, phase, activeSlots, activeMoves, score, misses, gameEndMs, moveResult } = MoveWhack.Store;
  const { GAME_DURATION_MS, MAX_ACTIVE_SLOTS } = MoveWhack.Store;

  // デフォルトはプールの先頭 MAX_ACTIVE_SLOTS 種を選択済みにする
  let selectedMoves = $state<ActiveMove[]>(MoveWhack.MOVE_POOL.slice(0, MAX_ACTIVE_SLOTS) as ActiveMove[]);

  function toggleMove(move: ActiveMove): void {
    const idx = selectedMoves.findIndex((m) => m.type === move.type);
    if (idx >= 0) {
      selectedMoves = selectedMoves.filter((m) => m.type !== move.type);
    } else if (selectedMoves.length < MAX_ACTIVE_SLOTS) {
      selectedMoves = [...selectedMoves, move];
    }
  }

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
    if (selectedMoves.length < MAX_ACTIVE_SLOTS) return;
    timeRemaining = GAME_DURATION_MS;
    const result = await facade.startGame(fetch, selectedMoves);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  function handleReset(): void {
    facade.resetGame();
  }

  function handleSelectMove(moveType: PokeTypeName): void {
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
    <SpawnButton
      onclick={$phase !== "idle" ? handleReset : handleStart}
      isLoading={$isLoading}
      started={$phase !== "idle"}
      disabled={$phase === "idle" && selectedMoves.length < MAX_ACTIVE_SLOTS}
    />
  </div>

  {#if $phase === "idle"}
    <!-- わざ選択UI: タイプアイコン＋わざ名 -->
    <div class="flex flex-col items-center gap-3">
      <p class="text-surface-500 text-sm">
        使うわざを {MAX_ACTIVE_SLOTS} つ選んでね（{selectedMoves.length} / {MAX_ACTIVE_SLOTS}）
      </p>
      <div class="flex max-w-md flex-wrap justify-center gap-3">
        {#each MoveWhack.MOVE_POOL as move (move.type)}
          {@const selected = selectedMoves.some((m) => m.type === move.type)}
          {@const disabled = !selected && selectedMoves.length >= MAX_ACTIVE_SLOTS}
          <button
            class="flex w-16 flex-col items-center gap-0.5 rounded-lg p-1 transition-opacity"
            class:opacity-20={disabled}
            class:opacity-50={!selected && !disabled}
            class:opacity-100={selected}
            onclick={() => toggleMove(move)}
            {disabled}
          >
            <PokeTypeBadge type={move.type} size="md" iconOnly={true} />
            <span class="text-xs leading-tight">{move.moveName}</span>
          </button>
        {/each}
      </div>
    </div>
  {:else if $phase === "playing"}
    <div class="text-surface-600 dark:text-surface-300 flex items-center gap-6 text-sm">
      <span class="text-surface-500 text-sm">のこり</span>
      <span class="font-mono text-3xl font-bold tabular-nums">{Math.ceil(timeRemaining / 1000)}</span>
      <span class="text-surface-500 text-sm">秒</span>
      <span>スコア: <strong class="text-success-500 text-base">{$score}</strong></span>
      <span>おてつき: <strong class="text-error-500 text-base">{$misses}</strong></span>
    </div>

    <!-- ポケモンスロット -->
    <div class="grid grid-cols-4 gap-4">
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

    <!-- フィードバックメッセージ（高さ固定でレイアウトシフトを防ぐ） -->
    <div class="h-8 text-center">
      {#if $moveResult}
        <p
          class="text-xl font-bold"
          class:text-warning-500={$moveResult.isHit}
          class:text-error-500={!$moveResult.isHit}
        >
          {$moveResult.message}
        </p>
      {/if}
    </div>

    <!-- わざスロット -->
    <div class="grid grid-cols-2 gap-3">
      {#each $activeMoves as move (move.type)}
        <button
          class="flex flex-col items-center gap-1 rounded-xl px-6 py-3 font-bold text-white shadow-md transition-transform active:scale-95"
          style="background-color: {pokeTypeColor(move.type)};"
          onclick={() => handleSelectMove(move.type)}
        >
          <PokeTypeBadge type={move.type} size="sm" iconOnly={true} />
          <span class="text-sm">{move.moveName}</span>
        </button>
      {/each}
    </div>
  {:else if $phase === "result"}
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
