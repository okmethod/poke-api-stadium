<script lang="ts">
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCard from "$lib/components/PokeCard.svelte";

  let pokeId = "";
  let pokeData: PokeData | null = null;

  async function fetchPokeData(): Promise<void> {
    try {
      pokeData = await getPokeData(fetch, pokeId);
    } catch {
      pokeData = null;
    }
  }
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-2">
    <h1 class="text-2xl font-bold">ポケモンずかん</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[1200px]">
    <div class="ml-4">
      <form on:submit|preventDefault={fetchPokeData} class="flex items-center space-x-3">
        <label for="pokeId" class="text-lg">
          <span class="hidden sm:inline">全国図鑑</span>
          No:
        </label>
        <div class="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max={LATEST_POKEMON_ID}
            id="pokeId"
            bind:value={pokeId}
            class="border rounded px-2 py-1 h-full"
          />
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded h-full flex items-center"
          >
            <Icon icon="mdi:search" class="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>

    <PokeCard {pokeData} />
  </div>
</div>
