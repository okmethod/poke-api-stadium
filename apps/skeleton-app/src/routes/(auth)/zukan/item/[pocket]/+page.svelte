<script lang="ts">
  import Icon from "@iconify/svelte";
  import { navigateTo } from "$lib/presentation/utils/navigation";
  import type { PokeItem } from "$lib/domain/models/PokeItem";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";

  const PAGE_SIZE = 20;

  let { data } = $props();

  type CategoryState = { items: PokeItem[]; loadedCount: number; isLoading: boolean };

  let expanded = $state<Record<string, boolean>>({});
  let categoryStates = $state<Record<string, CategoryState>>({});

  function toggle(enName: string) {
    expanded[enName] = !expanded[enName];
    if (expanded[enName] && !categoryStates[enName]) {
      loadNextPage(enName);
    }
  }

  async function loadNextPage(enName: string) {
    const category = data.categories.find((c) => c.enName === enName);
    if (!category) return;

    const current = categoryStates[enName] ?? { items: [], loadedCount: 0, isLoading: false };
    if (current.isLoading) return;

    categoryStates[enName] = { ...current, isLoading: true };
    const slice = category.items.slice(current.loadedCount, current.loadedCount + PAGE_SIZE);
    try {
      const newItems = await Promise.all(slice.map((name) => getPokeRepository().getItem(fetch, name)));
      categoryStates[enName] = {
        items: [...current.items, ...newItems],
        loadedCount: current.loadedCount + slice.length,
        isLoading: false,
      };
    } catch (err) {
      console.error(`Failed to load items for category ${enName}:`, err);
      categoryStates[enName] = { ...categoryStates[enName], isLoading: false };
    }
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-4 p-4">
  <h1 class="h3 sm:h2">アイテム図鑑</h1>

  <div class="flex w-full max-w-4xl items-center gap-3">
    <button type="button" class="btn preset-tonal btn-sm" onclick={() => navigateTo("/zukan/item")}>
      <Icon icon="mdi:arrow-left" class="size-4" />
      ポケット一覧
    </button>
    <h2 class="text-lg font-bold">{data.pocket.jaName}</h2>
  </div>

  <div class="flex w-full max-w-4xl flex-col gap-2">
    {#each data.categories as category (category.enName)}
      {@const isOpen = !!expanded[category.enName]}
      {@const state = categoryStates[category.enName]}
      {@const hasMore = state ? state.loadedCount < category.items.length : false}
      <div class="card bg-surface-50-950 overflow-hidden rounded-xl shadow">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-2 p-4 text-left"
          onclick={() => toggle(category.enName)}
        >
          <div>
            <span class="font-bold">{category.jaName}</span>
            <span class="text-surface-400 ml-2 text-xs">{category.items.length}件</span>
          </div>
          <Icon icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="size-5 shrink-0" />
        </button>

        {#if isOpen}
          <div class="border-surface-200-800 border-t px-4 pt-3 pb-4">
            {#if category.items.length === 0}
              <p class="text-surface-400 text-sm">アイテムなし</p>
            {:else if !state || (state.items.length === 0 && state.isLoading)}
              <div class="flex justify-center p-4">
                <Icon icon="mdi:loading" class="text-surface-400 size-6 animate-spin" />
              </div>
            {:else}
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {#each state.items as item (item.id)}
                  <div class="bg-surface-100-900 flex items-center gap-2 rounded-lg p-2">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white p-0.5">
                      {#if item.imageUrl}
                        <img src={item.imageUrl} alt={item.jaName} class="h-full w-full object-contain" />
                      {:else}
                        <Icon icon="mdi:image-off-outline" class="text-surface-300 size-8" />
                      {/if}
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-semibold">{item.jaName}</p>
                      <p class="text-surface-500 line-clamp-2 text-xs leading-relaxed">
                        {item.flavorText || "（データがありません）"}
                      </p>
                    </div>
                  </div>
                {/each}
              </div>

              {#if state.isLoading}
                <div class="flex justify-center pt-3">
                  <Icon icon="mdi:loading" class="text-surface-400 size-5 animate-spin" />
                </div>
              {:else if hasMore}
                <div class="flex justify-center pt-3">
                  <button
                    type="button"
                    class="btn preset-tonal btn-sm text-xs"
                    onclick={() => loadNextPage(category.enName)}
                  >
                    さらに読み込む ({state.loadedCount}/{category.items.length})
                  </button>
                </div>
              {:else}
                <p class="text-surface-400 pt-2 text-center text-xs">{state.loadedCount}件</p>
              {/if}
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
