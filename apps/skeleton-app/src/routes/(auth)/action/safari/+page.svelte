<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { CaptureBilliard } from "$lib/application/usecases/CaptureBilliard";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { getMatterJsBilliardAdapter } from "$lib/infrastructure/adapters/MatterJsBilliardAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import BilliardCanvas from "$lib/presentation/components/physics/BilliardCanvas.svelte";
  import PokeChip from "$lib/presentation/components/atoms/PokeChip.svelte";

  const engine = getMatterJsBilliardAdapter();
  const facade = new CaptureBilliard.Facade(getPokeRepository(), engine);
  const { phase, isLoading, pokemons, ballsRemaining, caughtPokemons } = CaptureBilliard.Store;

  const {
    canvasWidth: W,
    canvasHeight: H,
    ballCount: BALL_COUNT,
    ballSpriteUrl: BALL_URL,
  } = CaptureBilliard.GAME_CONFIG;
  const ballCountArr = Array.from({ length: BALL_COUNT }, (_, i) => i);

  let isReady = $state(false);

  // フェーズ変化時に SE を鳴らす（初回スキップ）
  let seReady = false;
  $effect(() => {
    const p = $phase;
    if (!seReady) {
      seReady = true;
      return;
    }
    if (p === "caught") playSE.correct();
    else if (p === "missed") playSE.incorrect();
  });

  onMount(async () => {
    isReady = true;
    await handleStart();
  });

  onDestroy(() => {
    facade.dispose();
  });

  async function handleStart(): Promise<void> {
    const result = await facade.startRound(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleNextBall(): void {
    facade.nextBall();
  }

  function handleGiveUp(): void {
    facade.giveUp();
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-4 p-4">
  <h1 class="h3 sm:h2">サファリゲーム</h1>

  {#if $phase === "result"}
    <!-- リザルト画面 -->
    <div class="flex flex-col items-center gap-6 py-4">
      {#if $caughtPokemons.length === 0}
        <p class="text-error-500 text-xl font-bold">ゲットできなかった...</p>
      {:else}
        <p class="text-success-500 text-lg font-bold">{$caughtPokemons.length} 体 ゲット！</p>
        <div class="flex flex-wrap justify-center gap-4">
          {#each $caughtPokemons as poke (poke.pokeId)}
            <PokeChip name={poke.jaName} imageUrl={poke.imageUrls.pixel.front} face="front" />
          {/each}
        </div>
      {/if}
      <button type="button" class="btn preset-filled" onclick={handleStart} disabled={$isLoading}>
        <Icon icon="mdi:reload" class="size-5" />
        もう一度あそぶ
      </button>
    </div>
  {:else if isReady && $pokemons.length > 0}
    <!-- キャンバス -->
    <BilliardCanvas
      {engine}
      width={W}
      height={H}
      onFrame={() => facade.tick()}
      onPointerDown={(p) => facade.startAim(p)}
      onPointerMove={(p) => facade.updateAim(p)}
      onPointerUp={(p) => facade.launch(p)}
    />

    <!-- 結果・操作ボタン -->
    <div class="h-8">
      {#if $phase === "caught" || $phase === "missed"}
        {@const activeCount = $pokemons.filter((p) => !p.caught).length}
        <div class="flex items-center gap-3">
          {#if $phase === "caught"}
            <p class="text-success-500 text-2xl font-bold">ゲットだぜ！</p>
          {:else}
            <p class="text-error-500 text-2xl font-bold">のがした...</p>
          {/if}
          <button type="button" class="btn btn-sm preset-filled" onclick={handleNextBall}>
            <Icon icon="mdi:chevron-right" class="size-5" />
            {activeCount === 0 || $ballsRemaining === 0 ? "けっかをみる" : "つぎのボール"}
          </button>
        </div>
      {:else if $phase === "flying"}
        <button type="button" class="btn btn-sm preset-tonal-error" onclick={handleGiveUp}> あきらめる </button>
      {:else if $phase === "aiming"}
        <p class="text-sm text-yellow-400">はなしてはっしゃ！</p>
      {:else if $phase === "waiting"}
        <p class="text-surface-400 text-sm">ボールをひっぱってねらいをさだめよう</p>
      {/if}
    </div>
    <!-- ボール残数 -->
    <div class="flex items-center gap-1">
      {#each ballCountArr as i (i)}
        <img src={BALL_URL} alt="" class="size-7 {i < $ballsRemaining ? '' : 'opacity-25 grayscale'}" />
      {/each}
    </div>
  {:else}
    <!-- ロード中プレースホルダー -->
    <div
      class="border-surface-300 flex items-center justify-center rounded-lg border-2 border-dashed"
      style="width: {W}px; height: {H}px;"
    >
      {#if $isLoading}
        <Icon icon="mdi:loading" class="text-surface-400 size-10 animate-spin" />
      {:else}
        <p class="text-surface-400 text-sm">よみこみちゅう...</p>
      {/if}
    </div>
  {/if}
</div>
