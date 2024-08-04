<script lang="ts">
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import { getRandomNumbers } from "$lib/utils/numerics";

  interface PokeItem {
    id: number;
    data: PokeData;
  }

  let isLoading = false;
  let pokeIds: number[] = [];
  let ownPokeArray: PokeItem[] = [];
  let opoPokeArray: PokeItem[] = [];
  const numPokeByPlayer = 3;
  async function fetchPokeDataArray(): Promise<void> {
    isLoading = true;
    resetState();
    try {
      pokeIds = getRandomNumbers(1, LATEST_POKEMON_ID, numPokeByPlayer * 2);
      const pokeDataArray = await Promise.all(
        pokeIds.slice(0, numPokeByPlayer * 2).map((id) => getPokeData(fetch, id.toString())),
      );
      ownPokeArray = pokeDataArray.slice(0, numPokeByPlayer).map((pokeData, index) => ({
        id: index,
        data: pokeData,
      }));
      opoPokeArray = pokeDataArray.slice(numPokeByPlayer, numPokeByPlayer * 2).map((pokeData, index) => ({
        id: index,
        data: pokeData,
      }));
    } catch {
      // do nothing
    }
    isLoading = false;
  }

  function showModal(): void {
    // TODO: later
  }

  function resetState(): void {
    // TODO: later
  }
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-2">
    <h1 class="text-2xl font-bold">ポケモンタイプじゃんけん</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[600px]">
    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">ポケモン をよぶ</span>
        <form on:submit|preventDefault={fetchPokeDataArray}>
          <button
            type="submit"
            disabled={isLoading}
            class="px-2 py-1 text-white rounded h-full flex items-center {isLoading
              ? 'bg-gray-500'
              : 'bg-blue-500 hover:bg-blue-600'}"
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:pokemon-go" class="w-5 h-5" />
            </div>
          </button>
        </form>
        <div class="flex-grow"><!-- spacer --></div>
        <form on:submit|preventDefault={showModal}>
          <button
            type="submit"
            class="px-2 py-1 text-white rounded h-full flex items-center bg-blue-500 hover:bg-blue-600"
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:head-question-outline" class="w-5 h-5" />
            </div>
          </button>
        </form>
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <!-- 相手のポケモン -->
    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each ownPokeArray as pokeItem (pokeItem.id)}
          <PokeCardCompact pokeData={pokeItem.data} />
        {/each}
      </div>
    </div>

    <p class="text-center text-xl">vs</p>

    <!-- 自分のポケモン -->
    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each opoPokeArray as pokeItem (pokeItem.id)}
          <PokeCardCompact pokeData={pokeItem.data} />
        {/each}
      </div>
    </div>
  </div>
</div>
