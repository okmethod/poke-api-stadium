<script lang="ts">
  import Icon from "@iconify/svelte";
  import { FloatingPanel, Portal } from "@skeletonlabs/skeleton-svelte";
  import { WordChain, type ShiritoriPokeItem } from "$lib/application/usecases/WordChain";
  import { generationStore } from "$lib/application/stores/generationStore";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import PokeChip from "$lib/presentation/components/atoms/PokeChip.svelte";

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

<FloatingPanel open={showList} onOpenChange={(e) => (showList = e.open)}>
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
      <FloatingPanel.Trigger class="btn preset-tonal btn-sm" disabled={$pushedPokeItems.length === 0}>
        <Icon icon="mdi:format-list-numbered" class="size-5" />
        リスト
      </FloatingPanel.Trigger>
    </div>

    <!-- 候補ポケモン -->
    {#if $pickedPokeItems.length > 0}
      <div class="flex flex-wrap justify-center gap-2 rounded-xl border bg-white p-3">
        {#each $pickedPokeItems as item (item.id)}
          <PokeChip
            name={item.jaName}
            imageUrl={item.imageUrl}
            closed={$usedids.has(item.id)}
            onclick={() => handleChallenge(item)}
          />
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
  </div>

  <Portal>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content class="card bg-surface-50-950 flex min-w-48 flex-col shadow-xl">
        <FloatingPanel.Header class="flex items-center gap-2 border-b p-2">
          <FloatingPanel.DragTrigger class="flex flex-1 cursor-grab items-center gap-1 active:cursor-grabbing">
            <Icon icon="mdi:drag" class="text-surface-400 size-4" />
            <FloatingPanel.Title class="text-sm font-bold">
              しりとりリスト（{$pushedPokeItems.length} 体）
            </FloatingPanel.Title>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.CloseTrigger class="btn-icon btn-icon-sm preset-ghost">
            <Icon icon="mdi:close" class="size-4" />
          </FloatingPanel.CloseTrigger>
        </FloatingPanel.Header>
        <FloatingPanel.Body class="overflow-y-auto p-3">
          <ol class="space-y-1 text-sm">
            {#each $pushedPokeItems as item, i (item.id)}
              <li>{i + 1}. {item.jaName}</li>
            {/each}
          </ol>
        </FloatingPanel.Body>
        <FloatingPanel.ResizeTrigger axis="se" class="absolute right-0 bottom-0 size-3 cursor-se-resize" />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </Portal>
</FloatingPanel>
