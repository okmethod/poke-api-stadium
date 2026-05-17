<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeLocation, PokeSpeciesMeta } from "$lib/domain/models/PokeRegion";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { pokeSpriteUrl } from "$lib/infrastructure/api/pokeSprites";

  const PAGE_SIZE = 20;

  let { data } = $props();

  type LocationState = {
    data: PokeLocation | null;
    isLoading: boolean;
    speciesLoadedCount: number;
    isSpeciesLoading: boolean;
  };

  let locationExpanded = $state<Record<number, boolean>>({});
  let locationStates = $state<Record<number, LocationState>>({});
  // speciesMap のキーはエンカウントデータの pokemon.name（英語）
  let speciesMap = $state<Record<string, PokeSpeciesMeta | "error">>({});

  async function fetchSpeciesBatch(names: readonly string[]): Promise<void> {
    await Promise.all(
      names
        .filter((name) => !speciesMap[name])
        .map(async (name) => {
          try {
            speciesMap[name] = await getPokeRepository().getPokemonSpeciesMeta(fetch, name);
          } catch {
            speciesMap[name] = "error";
          }
        }),
    );
  }

  async function toggleLocation(id: number) {
    locationExpanded[id] = !locationExpanded[id];
    if (!locationExpanded[id]) return;
    const current = locationStates[id];
    if (current?.data || current?.isLoading) return;

    locationStates[id] = { data: null, isLoading: true, speciesLoadedCount: 0, isSpeciesLoading: false };
    try {
      const location = await getPokeRepository().getLocation(fetch, id);
      // 初回バッチをロケーション取得と合算してローディングを1回に抑える
      const firstBatch = location.encounterSpeciesNames.slice(0, PAGE_SIZE);
      await fetchSpeciesBatch(firstBatch);
      locationStates[id] = {
        data: location,
        isLoading: false,
        speciesLoadedCount: firstBatch.length,
        isSpeciesLoading: false,
      };
    } catch (err) {
      console.error(`Failed to load location ${id}:`, err);
      locationStates[id] = { ...locationStates[id], isLoading: false };
    }
  }

  async function loadNextSpecies(locationId: number) {
    const state = locationStates[locationId];
    if (!state?.data || state.isSpeciesLoading) return;

    const names = state.data.encounterSpeciesNames;
    const slice = names.slice(state.speciesLoadedCount, state.speciesLoadedCount + PAGE_SIZE);
    if (slice.length === 0) return;

    const loadedCountAtStart = state.speciesLoadedCount;
    locationStates[locationId] = { ...state, isSpeciesLoading: true };
    await fetchSpeciesBatch(slice);
    locationStates[locationId] = {
      ...locationStates[locationId],
      isSpeciesLoading: false,
      speciesLoadedCount: loadedCountAtStart + slice.length,
    };
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-4 p-4">
  <h1 class="h3 sm:h2">地方図鑑</h1>
  <h2 class="w-full max-w-4xl text-lg font-bold">{data.region.jaName}</h2>

  <div class="flex w-full max-w-4xl flex-col gap-2">
    {#each data.locations as location (location.id)}
      {@const isLocOpen = !!locationExpanded[location.id]}
      {@const locState = locationStates[location.id]}

      <div class="card bg-surface-50-950 overflow-hidden rounded-xl shadow">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-2 p-4 text-left"
          onclick={() => toggleLocation(location.id)}
        >
          <span class="font-bold">{location.enName}</span>
          <Icon icon={isLocOpen ? "mdi:chevron-up" : "mdi:chevron-down"} class="size-5 shrink-0" />
        </button>

        {#if isLocOpen}
          <div class="border-surface-200-800 border-t px-4 pt-3 pb-4">
            {#if !locState || locState.isLoading}
              <div class="flex justify-center p-4">
                <Icon icon="mdi:loading" class="text-surface-400 size-6 animate-spin" />
              </div>
            {:else if !locState.data}
              <p class="text-surface-400 text-sm">読み込みに失敗しました</p>
            {:else if locState.data.encounterSpeciesNames.length === 0}
              <p class="text-surface-400 text-sm">ポケモンなし</p>
            {:else}
              <div class="grid grid-cols-4 gap-2 sm:grid-cols-6">
                {#each locState.data.encounterSpeciesNames.slice(0, locState.speciesLoadedCount) as name (name)}
                  {@const meta = speciesMap[name]}
                  {#if meta && meta !== "error"}
                    <div class="flex flex-col items-center gap-0.5">
                      <img src={pokeSpriteUrl(meta.id)} alt={meta.jaName} class="h-12 w-12 object-contain" />
                      <span class="text-center text-xs leading-tight">{meta.jaName}</span>
                    </div>
                  {:else if meta === "error"}
                    <div class="flex flex-col items-center gap-0.5">
                      <Icon icon="mdi:image-off-outline" class="text-surface-300 size-12" />
                      <span class="text-surface-400 text-center text-xs leading-tight">{name}</span>
                    </div>
                  {:else}
                    <div class="flex flex-col items-center gap-0.5">
                      <Icon icon="mdi:loading" class="text-surface-400 size-12 animate-spin" />
                    </div>
                  {/if}
                {/each}
              </div>

              {#if locState.isSpeciesLoading}
                <div class="flex justify-center pt-2">
                  <Icon icon="mdi:loading" class="text-surface-400 size-5 animate-spin" />
                </div>
              {:else if locState.speciesLoadedCount < locState.data.encounterSpeciesNames.length}
                <div class="flex justify-center pt-2">
                  <button
                    type="button"
                    class="btn preset-tonal btn-sm text-xs"
                    onclick={() => loadNextSpecies(location.id)}
                  >
                    さらに読み込む ({locState.speciesLoadedCount}/{locState.data.encounterSpeciesNames.length})
                  </button>
                </div>
              {:else}
                <p class="text-surface-400 pt-1 text-center text-xs">
                  {locState.speciesLoadedCount}件
                </p>
              {/if}
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
