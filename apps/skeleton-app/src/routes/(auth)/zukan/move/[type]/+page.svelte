<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { navigateTo } from "$lib/presentation/utils/navigation";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import type { PokeMove } from "$lib/domain/models/PokeMove";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";
  import MoveCategoryBadge from "$lib/presentation/components/atoms/MoveCategoryBadge.svelte";

  const PAGE_SIZE = 20;

  let { data } = $props();

  let moves = $state<PokeMove[]>([]);
  let loadedCount = $state(0);
  let isLoading = $state(false);

  onMount(() => {
    void loadNextPage();
  });

  async function loadNextPage() {
    if (isLoading) return;
    isLoading = true;
    const slice = data.moveNames.slice(loadedCount, loadedCount + PAGE_SIZE);
    try {
      const newMoves = await Promise.all(slice.map((name) => getPokeRepository().getMove(fetch, name)));
      moves = [...moves, ...newMoves];
      loadedCount += slice.length;
    } catch (err) {
      console.error("Failed to load moves:", err);
    } finally {
      isLoading = false;
    }
  }

  const hasMore = $derived(loadedCount < data.moveNames.length);
</script>

<div class="container mx-auto flex flex-col items-center gap-4 p-4">
  <h1 class="h3 sm:h2">わざ図鑑</h1>

  <div class="flex w-full max-w-4xl items-center gap-3">
    <button type="button" class="btn preset-tonal btn-sm" onclick={() => navigateTo("/zukan/move")}>
      <Icon icon="mdi:arrow-left" class="size-4" />
      タイプ一覧
    </button>
    <h2 class="text-lg font-bold" style="color: {data.color};">{data.jaName}タイプのわざ</h2>
    <span class="text-surface-400 text-sm">全{data.moveNames.length}件</span>
  </div>

  <div class="w-full max-w-4xl">
    {#if moves.length === 0 && isLoading}
      <div class="flex justify-center p-8">
        <Icon icon="mdi:loading" class="text-surface-400 size-8 animate-spin" />
      </div>
    {:else}
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {#each moves as move (move.id)}
          <div class="card bg-surface-50-950 flex flex-col gap-3 rounded-xl p-4 shadow">
            <p class="border-surface-200-800 text-md border-b font-bold">{move.jaName}</p>

            <dl class="grid grid-cols-4 gap-2 text-center">
              {#snippet stat(label: string, value: string)}
                <div class="bg-surface-100-900 rounded p-1.5">
                  <dt class="text-surface-500-400 text-xs">{label}</dt>
                  <dd class="text-sm font-bold">{value}</dd>
                </div>
              {/snippet}
              <div class="items my-1 flex flex-col gap-2">
                <PokeTypeBadge type={move.type} size="xs" />
                <MoveCategoryBadge category={move.category} />
              </div>

              {@render stat("威力", move.power != null ? String(move.power) : "—")}
              {@render stat("命中", move.accuracy != null ? `${move.accuracy}%` : "—")}
              {@render stat("PP", String(move.pp))}
            </dl>

            {#if move.flavorText}
              <p class="text-surface-600-400 border-surface-200-800 border-t pt-2 text-xs leading-relaxed">
                {move.flavorText}
              </p>
            {/if}
          </div>
        {/each}
      </div>

      {#if isLoading}
        <div class="flex justify-center p-4">
          <Icon icon="mdi:loading" class="text-surface-400 size-6 animate-spin" />
        </div>
      {:else if hasMore}
        <div class="flex justify-center pt-2">
          <button type="button" class="btn preset-tonal btn-sm text-xs" onclick={() => void loadNextPage()}>
            さらに読み込む ({loadedCount}/{data.moveNames.length})
          </button>
        </div>
      {:else if moves.length > 0}
        <p class="text-surface-400 pt-2 text-center text-xs">{loadedCount}件</p>
      {/if}
    {/if}
  </div>
</div>
