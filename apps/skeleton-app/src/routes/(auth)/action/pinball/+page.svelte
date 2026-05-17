<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { PokePinball } from "$lib/application/usecases/PokePinball";
  import { getMatterJsPinballAdapter } from "$lib/infrastructure/adapters/MatterJsPinballAdapter";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import PinballCanvas from "$lib/presentation/components/physics/PinballCanvas.svelte";

  const engine = getMatterJsPinballAdapter();
  const facade = new PokePinball.Facade(getPokeRepository(), engine);
  const { phase, isLoading, score, livesRemaining, bumpers } = PokePinball.Store;
  const { initialLives } = PokePinball.GAME_CONFIG;

  const livesArr = Array.from({ length: initialLives }, (_, i) => i);

  let isReady = $state(false);

  // フェーズ変化時の SE（初回スキップ）
  let seReady = false;
  $effect(() => {
    const p = $phase;
    if (!seReady) {
      seReady = true;
      return;
    }
    if (p === "lost") playSE.incorrect();
    else if (p === "gameover") playSE.incorrect();
  });

  // キーボードでフリッパー操作
  $effect(() => {
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "z" || e.key === "Z" || e.key === "ArrowLeft") facade.flipLeft(true);
      if (e.key === "x" || e.key === "X" || e.key === "ArrowRight") facade.flipRight(true);
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        facade.launch();
      }
    }
    function onKeyUp(e: KeyboardEvent): void {
      if (e.key === "z" || e.key === "Z" || e.key === "ArrowLeft") facade.flipLeft(false);
      if (e.key === "x" || e.key === "X" || e.key === "ArrowRight") facade.flipRight(false);
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  });

  onMount(async () => {
    isReady = true;
    await handleStart();
  });

  onDestroy(() => {
    facade.dispose();
  });

  async function handleStart(): Promise<void> {
    const result = await facade.startGame(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleLaunch(): void {
    facade.launch();
  }

  function handleNextBall(): void {
    facade.nextBall();
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-4 p-4">
  <h1 class="h3 sm:h2">ポケモンピンボール(WIP)</h1>

  {#if $phase === "gameover"}
    <!-- ゲームオーバー画面 -->
    <div class="flex flex-col items-center gap-6 py-4">
      <p class="text-error-500 text-xl font-bold">ゲームオーバー</p>
      <p class="text-surface-300 text-2xl font-bold">スコア: {$score}</p>
      <button type="button" class="btn preset-filled" onclick={handleStart} disabled={$isLoading}>
        <Icon icon="mdi:reload" class="size-5" />
        もう一度あそぶ
      </button>
    </div>
  {:else if isReady && $bumpers.length > 0}
    <!-- スコア・ライフ表示 -->
    <div class="flex items-center justify-between gap-8">
      <div class="flex items-center gap-1">
        {#each livesArr as i (i)}
          <Icon icon="mdi:heart" class="size-6 {i < $livesRemaining ? 'text-error-500' : 'text-surface-700'}" />
        {/each}
      </div>
      <p class="text-surface-200 text-lg font-bold tabular-nums">{$score} pt</p>
    </div>

    <!-- キャンバス -->
    <PinballCanvas {engine} onFrame={() => facade.tick()} />

    <!-- フェーズメッセージ -->
    <div class="h-8">
      {#if $phase === "lost"}
        <div class="flex items-center gap-3">
          <p class="text-error-500 font-bold">ボールをなくした...</p>
          <button type="button" class="btn btn-sm preset-filled" onclick={handleNextBall}>
            <Icon icon="mdi:chevron-right" class="size-5" />
            つぎのボール
          </button>
        </div>
      {:else if $isLoading}
        <p class="text-surface-400 text-sm">よみこみちゅう...</p>
      {:else}
        <p class="text-surface-400 text-sm">Z / ← : 左フリッパー &nbsp; X / → : 右フリッパー &nbsp; スペース : 発射</p>
      {/if}
    </div>

    <!-- タッチ操作ボタン（モバイル向け） -->
    <div class="flex w-full max-w-sm items-center justify-between gap-4">
      <button
        type="button"
        class="btn preset-filled-primary-500 w-32 select-none"
        onpointerdown={() => facade.flipLeft(true)}
        onpointerup={() => facade.flipLeft(false)}
        onpointerleave={() => facade.flipLeft(false)}
      >
        ← フリッパー
      </button>
      <button type="button" class="btn preset-filled-secondary-500 select-none" onpointerdown={handleLaunch}>
        発射
      </button>
      <button
        type="button"
        class="btn preset-filled-primary-500 w-32 select-none"
        onpointerdown={() => facade.flipRight(true)}
        onpointerup={() => facade.flipRight(false)}
        onpointerleave={() => facade.flipRight(false)}
      >
        フリッパー →
      </button>
    </div>
  {:else}
    <!-- ロード中プレースホルダー -->
    <div
      class="border-surface-300 flex items-center justify-center rounded-lg border-2 border-dashed"
      style="width: {PokePinball.GAME_CONFIG.canvasWidth}px; height: {PokePinball.GAME_CONFIG.canvasHeight}px;"
    >
      <Icon icon="mdi:loading" class="text-surface-400 size-10 animate-spin" />
    </div>
  {/if}
</div>
