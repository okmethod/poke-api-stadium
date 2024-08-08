<script lang="ts">
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import { pickRandomNumbers } from "$lib/utils/numerics";

  interface PokeItem {
    data: PokeData;
    isUsed: boolean;
  }

  let isLoading = false;
  let pokeIds: number[] = [];
  let pokeArray: PokeItem[] = [];
  const numPoke = 3;
  async function fetchPokeDataArray(): Promise<void> {
    isLoading = true;
    resetState();
    try {
      const numbers = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
      pokeIds = pickRandomNumbers(numbers, numPoke);
      const pokeDataArray = await Promise.all(pokeIds.slice(0, numPoke).map((id) => getPokeData(fetch, id.toString())));
      pokeArray = pokeDataArray.map((pokeData, index) => ({
        id: index,
        data: pokeData,
        isUsed: false,
      }));
    } catch {
      // do nothing
    }
    isLoading = false;
  }

  let pushedPokeArray: Array<PokeItem | null> = [null, null];
  function clickPokeCard(index: number) {
    return () => {
      pokeArray[index].isUsed = true;
      pushedPokeArray = [...pushedPokeArray, pokeArray[index]];
    };
  }

  function resetState(): void {
    pokeArray = [];
  }
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-2">
    <h1 class="text-2xl font-bold">ポケモンしりとり</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[600px]">
    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">ポケモン を よびだす</span>
        <form on:submit|preventDefault={fetchPokeDataArray}>
          <button
            type="submit"
            disabled={isLoading}
            class="px-2 py-1 text-white rounded h-full flex items-center {isLoading
              ? 'bg-gray-500'
              : 'bg-blue-500 hover:bg-blue-600'}"
          >
            <Icon icon="mdi:pokeball" class="w-5 h-5" />
          </button>
        </form>
        <div class="flex-grow"><!-- spacer --></div>
        <p class="text-lg">{pushedPokeArray.length - 2}</p>
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each pokeArray as pokeItem, index}
          <div class="rounded-2xl border-2">
            {#if !pokeItem.isUsed}
              <button type="button" on:click={clickPokeCard(index)}>
                <PokeCardCompact pokeData={pokeItem.data} />
              </button>
            {:else}
              <p class="h-[150px] w-[150px]"></p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each pushedPokeArray.slice(-2) as pokeItem, index}
          <div class="rounded-2xl border-2">
            {#if pokeItem}
              <PokeCardCompact pokeData={pokeItem.data} />
            {:else}
              <p class="h-[150px] w-[150px]"></p>
            {/if}
          </div>
          {#if index < 2}
            <span class="mx-2">→</span>
          {/if}
        {/each}
        <div class="h-[150px] w-[150px] text-center text-xl rounded-2xl border-2">？</div>
      </div>
    </div>
  </div>
</div>
