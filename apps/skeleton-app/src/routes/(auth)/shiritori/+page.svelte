<script lang="ts">
  import Icon from "@iconify/svelte";
  import PokeChip from "$lib/presentation/components/atoms/PokeChip.svelte";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { WordChain } from "$lib/application/usecases/WordChain";
  import type { ShiritoriPokeItem } from "$lib/application/usecases/WordChain";
  import { generationStore } from "$lib/application/stores/generationStore";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";

  const facade = new WordChain.Facade(getPokeRepository());
  const { isLoading, pickedPokeItems, pushedPokeItems, usedids, message, chainDisplay } = WordChain.Store;

  let showList = $state(false);

  // 世代変更時および初回マウント時に再初期化
  $effect(() => {
    const _ = $generationStore;
    void handleInitialize();
  });

  async function handleInitialize(): Promise<void> {
    const result = await facade.initialize(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
      return;
    }
    handleStartNewGame();
  }

  function handleStartNewGame(): void {
    showList = false;
    playCry(facade.startNewGame());
  }

  function handleChallenge(item: ShiritoriPokeItem): void {
    playCry(facade.challenge(item));
  }

  function playCry(cryUrl: string | null): void {
    if (cryUrl && getAudioOn()) {
      new Audio(cryUrl).play().catch(() => {});
    }
  }
</script>

<div class="container mx-auto flex max-w-2xl flex-col items-center gap-4 p-4">
  <h1 class="h3 sm:h2">ポケモンしりとり</h1>

  <!-- ヘッダー操作 -->
  <div class="flex flex-wrap items-center justify-center gap-3">
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={$pickedPokeItems.length === 0 ? handleInitialize : handleStartNewGame}
      disabled={$isLoading}
    >
      {#if $isLoading}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
        よみこみ中...
      {:else if $pickedPokeItems.length === 0}
        <Icon icon="mdi:pokeball" class="size-5" />
        スタート
      {:else}
        <Icon icon="mdi:restart" class="size-5" />
        リセット
      {/if}
    </button>
    <span class="text-sm">{$pushedPokeItems.length} 体</span>
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={() => (showList = !showList)}
      disabled={$pushedPokeItems.length === 0}
    >
      <Icon icon="mdi:format-list-numbered" class="size-5" />
      リスト
    </button>
  </div>

  <!-- 候補ポケモン -->
  {#if $pickedPokeItems.length > 0}
    <div class="flex flex-wrap justify-center gap-2 rounded-xl border bg-white p-3">
      {#each $pickedPokeItems as item (item.id)}
        {#if $usedids.has(item.id)}
          <div class="h-24 w-24 rounded-2xl bg-gray-100"></div>
        {:else}
          <PokeChip name={item.jaName} imageUrl={item.imageUrl} onclick={() => handleChallenge(item)} />
        {/if}
      {/each}
    </div>
  {/if}

  <!-- いれかえボタン -->
  {#if $pickedPokeItems.length > 0}
    <button type="button" class="btn preset-tonal btn-sm" onclick={() => facade.refreshCandidates()}>
      <Icon icon="mdi:shuffle" class="size-5" />
      ポケモン を いれかえる
    </button>
  {/if}

  <!-- しりとりチェーン表示（最後の2体 + ？） -->
  {#if $pushedPokeItems.length > 0}
    <div class="flex items-center gap-3 rounded-xl border bg-white p-4">
      {#each $chainDisplay as item, i (item?.id ?? i)}
        {#if item}
          <PokeChip name={item.jaName} imageUrl={item.imageUrl} />
        {:else}
          <div class="h-24 w-24 rounded-2xl bg-gray-100"></div>
        {/if}
        {#if i < $chainDisplay.length - 1}
          <Icon icon="mdi:arrow-right" class="text-surface-400 size-5" />
        {/if}
      {/each}
      <Icon icon="mdi:arrow-right" class="text-surface-400 size-5" />
      <div class="border-surface-300 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed">
        <span class="text-surface-400 text-2xl">？</span>
      </div>
    </div>
  {/if}

  <!-- メッセージ -->
  <p class="text-surface-600 dark:text-surface-300 text-center text-sm">{$message}</p>

  <!-- しりとりリスト（トグル表示） -->
  {#if showList && $pushedPokeItems.length > 0}
    <div class="w-full max-w-md rounded-xl border bg-white p-4">
      <h2 class="mb-2 text-center font-bold">しりとりリスト（{$pushedPokeItems.length} 体）</h2>
      <ol class="space-y-1 text-sm">
        {#each $pushedPokeItems as item, i (item.id)}
          <li>{i + 1}. {item.jaName}</li>
        {/each}
      </ol>
    </div>
  {/if}
</div>
