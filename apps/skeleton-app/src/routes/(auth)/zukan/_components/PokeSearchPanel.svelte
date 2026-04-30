<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Icon from "@iconify/svelte";
  import { Pagination } from "@skeletonlabs/skeleton-svelte";
  import { ALL_TYPE_NAMES, pokeTypeJaName, pokeTypeColor } from "$lib/domain/models/PokeData/pokeType";
  import type { PokeTypeName } from "$lib/domain/models/PokeData/pokeType";
  import { ALL_GENERATION_NUMBERS, generationData } from "$lib/domain/models/PokeData/generation";
  import type { GenerationNumber } from "$lib/domain/models/PokeData/generation";
  import type { PokemonSearchResult } from "$lib/application/ports/IPokeSearchRepository";
  import { getPokeSearchRepository } from "$lib/infrastructure/adapters/PokeGraphQLAdapter";

  let isOpen = $state(false);

  let nameQuery = $state("");
  let selectedTypes = $state<PokeTypeName[]>([]);
  let selectedGenerations = $state<GenerationNumber[]>([]);
  let results = $state<PokemonSearchResult[]>([]);
  let isLoading = $state(false);
  let hasSearched = $state(false);
  let currentPage = $state(1);

  function toggleType(type: PokeTypeName) {
    if (selectedTypes.includes(type)) {
      selectedTypes = selectedTypes.filter((t) => t !== type);
    } else {
      selectedTypes = [...selectedTypes, type];
    }
  }

  function toggleGeneration(gen: GenerationNumber) {
    if (selectedGenerations.includes(gen)) {
      selectedGenerations = selectedGenerations.filter((g) => g !== gen);
    } else {
      selectedGenerations = [...selectedGenerations, gen];
    }
  }

  function clearFilters() {
    nameQuery = "";
    selectedTypes = [];
    selectedGenerations = [];
  }

  const PAGE_SIZE = 20;
  const LIMIT_SIZE = 100;

  async function handleSearch() {
    isLoading = true;
    try {
      results = await getPokeSearchRepository().searchPokemon(fetch, {
        nameQuery,
        types: selectedTypes,
        generationIds: selectedGenerations,
        limit: LIMIT_SIZE,
        offset: 0,
      });
      currentPage = 1;
    } catch (e) {
      console.error("Pokemon search failed:", e);
      results = [];
    } finally {
      isLoading = false;
      hasSearched = true;
    }
  }

  function selectPokemon(id: number) {
    const url = new URL(page.url);
    url.searchParams.set("id", String(id));
    url.searchParams.set("tab", "basic");
    goto(url.toString());
  }

  const paginatedResults = $derived(results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE));

  const hasActiveFilter = $derived(
    nameQuery.trim() !== "" || selectedTypes.length > 0 || selectedGenerations.length > 0,
  );
</script>

<div class="w-full max-w-xl rounded shadow">
  <!-- トグルボタン -->
  <button
    type="button"
    onclick={() => (isOpen = !isOpen)}
    class="btn preset-tonal btn-sm flex w-full items-center justify-between gap-2"
  >
    <span class="flex items-center gap-1">
      <Icon icon="mdi:filter-variant" class="size-4" />
      ポケモン検索
    </span>
    <Icon icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="size-4" />
  </button>

  {#if isOpen}
    <div class="card mt-1 space-y-3 p-4">
      <!-- 日本語名検索 -->
      <div class="flex gap-2">
        <input
          type="text"
          placeholder="名前で検索"
          bind:value={nameQuery}
          onkeydown={(e) => e.key === "Enter" && handleSearch()}
          class="flex-1 rounded border px-3 py-1 text-sm"
        />
      </div>

      <!-- タイプフィルター -->
      <div>
        <p class="mb-1 text-xs font-semibold opacity-60">タイプ（未選択=すべて）</p>
        <div class="flex flex-wrap gap-1">
          {#each ALL_TYPE_NAMES as type (type)}
            {@const isSelected = selectedTypes.includes(type)}
            {@const isDimmed = !isSelected && selectedTypes.length > 0}
            <button
              type="button"
              onclick={() => toggleType(type)}
              class="rounded-full px-2 py-0.5 text-xs text-white transition-opacity"
              class:opacity-30={isDimmed}
              style="background-color: {pokeTypeColor(type)};"
            >
              {pokeTypeJaName(type)}
            </button>
          {/each}
        </div>
      </div>

      <!-- 世代フィルター -->
      <div>
        <p class="mb-1 text-xs font-semibold opacity-60">世代（未選択=すべて）</p>
        <div class="flex flex-wrap gap-1">
          {#each ALL_GENERATION_NUMBERS as gen (gen)}
            {@const isSelected = selectedGenerations.includes(gen)}
            {@const isDimmed = !isSelected && selectedGenerations.length > 0}
            <button
              type="button"
              onclick={() => toggleGeneration(gen)}
              class="btn btn-sm rounded text-xs transition-opacity"
              class:preset-filled-primary-500={isSelected}
              class:preset-tonal={!isSelected}
              class:opacity-30={isDimmed}
            >
              {generationData(gen)?.label ?? `第${gen}世代`}
            </button>
          {/each}
        </div>
      </div>

      <!-- 操作ボタン -->
      <div class="flex gap-2">
        <button type="button" onclick={handleSearch} disabled={isLoading} class="btn preset-filled btn-sm flex-1">
          {#if isLoading}
            <Icon icon="mdi:loading" class="size-4 animate-spin" />
            検索中...
          {:else}
            <Icon icon="mdi:magnify" class="size-4" />
            検索
          {/if}
        </button>
        {#if hasActiveFilter}
          <button type="button" onclick={clearFilters} class="btn preset-tonal btn-sm">
            <Icon icon="mdi:close" class="size-4" />
          </button>
        {/if}
      </div>

      <!-- 検索結果 -->
      {#if hasSearched}
        <div>
          <p class="mb-2 text-xs opacity-60">{results.length}件</p>
          {#if results.length === 0}
            <p class="text-sm opacity-60">該当するポケモンがいません</p>
          {:else}
            <div class="grid grid-cols-4 gap-1 sm:grid-cols-6">
              {#each paginatedResults as result (result.id)}
                <button
                  type="button"
                  onclick={() => selectPokemon(result.id)}
                  class="hover:bg-surface-100-900 flex flex-col items-center rounded p-1 text-center"
                >
                  <img src={result.thumbnailUrl} alt={result.jaName} class="size-10 object-contain" />
                  <span class="w-full truncate text-xs leading-tight">{result.jaName}</span>
                  <span class="text-xs opacity-40">#{result.id}</span>
                </button>
              {/each}
            </div>
            <div class="mt-2 flex items-center justify-center gap-1">
              <Pagination
                count={results.length}
                pageSize={PAGE_SIZE}
                page={currentPage}
                onPageChange={(e) => (currentPage = e.page)}
              >
                <Pagination.PrevTrigger>
                  <Icon icon="mdi:chevron-left" class="size-4" />
                </Pagination.PrevTrigger>
                <Pagination.Context>
                  {#snippet children(pagination)}
                    {#each pagination().pages as p, index (p)}
                      {#if p.type === "page"}
                        <Pagination.Item {...p}>{p.value}</Pagination.Item>
                      {:else}
                        <Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
                      {/if}
                    {/each}
                  {/snippet}
                </Pagination.Context>
                <Pagination.NextTrigger>
                  <Icon icon="mdi:chevron-right" class="size-4" />
                </Pagination.NextTrigger>
              </Pagination>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>
