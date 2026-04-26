<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Icon from "@iconify/svelte";
  import { getMatterJs2dPhysicsAdapter } from "$lib/infrastructure/adapters/MatterJs2dPhysicsAdapter";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { PairCollisionDetection } from "$lib/application/usecases/PairCollisionDetection";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import PhysicsCanvas2d from "$lib/presentation/components/physics/PhysicsCanvas2d.svelte";

  const CANVAS_WIDTH = 360;
  const CANVAS_HEIGHT = 360;
  const SPAWN_COUNT = 100;

  const engine = getMatterJs2dPhysicsAdapter();
  const facade = new PairCollisionDetection.Facade(engine, getPokeRepository());
  const { matchedCount, activeBodyCount, lastMatchJaName, lastMatchCryUrl } = PairCollisionDetection.Store;

  let isReady = $state(false);
  let isSpawning = $state(false);

  // matchedCount が増えるたびに鳴き声を再生する
  let prevMatchedCount = 0;
  $effect(() => {
    const current = $matchedCount;
    if (current > prevMatchedCount) {
      prevMatchedCount = current;
      const url = $lastMatchCryUrl;
      if (url && getAudioOn()) {
        new Audio(url).play().catch(() => {});
      }
    }
  });

  onMount(async () => {
    await facade.initialize({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
    isReady = true;
  });

  onDestroy(() => {
    facade.dispose();
  });

  async function handleSpawn(): Promise<void> {
    isSpawning = true;
    const result = await facade.spawnPokemons(fetch, SPAWN_COUNT);
    isSpawning = false;
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-4 p-4">
  <h1 class="h3 sm:h2">ポケモンえあわせ</h1>

  <!-- 操作ボタン -->
  <div class="flex items-center gap-4">
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={handleSpawn}
      disabled={!isReady || isSpawning}
      title="ポケモンをよびだす"
    >
      {#if isSpawning}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
      {:else}
        <Icon icon="mdi:pokeball" class="size-5" />
      {/if}
      よびだす
    </button>
  </div>

  <!-- スコア -->
  <p class="text-surface-600 dark:text-surface-300 flex items-center gap-3 text-sm">
    フィールド: {$activeBodyCount} 体
    <Icon icon="mdi:transfer-right" class="size-5" />
    マッチ: {$matchedCount} ペア
  </p>

  <!-- Canvas -->
  {#if isReady}
    <PhysicsCanvas2d {engine} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
  {:else}
    <div
      class="border-surface-400 flex items-center justify-center rounded border"
      style="width:{CANVAS_WIDTH}px; height:{CANVAS_HEIGHT}px"
    >
      <Icon icon="mdi:loading" class="text-surface-400 size-8 animate-spin" />
    </div>
  {/if}
  <p class="text-surface-600 dark:text-surface-300 text-lg">
    {$lastMatchJaName}
  </p>
</div>
