<script lang="ts">
  //import { fetchImageUrlToBlob } from "$lib/utils/request.client";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import PokeCard from "$lib/components/PokeCard.svelte";

  let pokeId = "";
  let pokeData: PokeData | null = null;

  async function fetchPokeData() {
    try {
      pokeData = await getPokeData(fetch, pokeId);
    } catch {
      pokeData = null;
    }
  }
</script>

<div class="h-full w-full mx-auto container">
  <h1 class="text-3xl font-bold">ポケモン検索</h1>
  <div class="space-y-5 min-w-[300px] max-w-[1200px]">
    <form on:submit|preventDefault={fetchPokeData} class="flex items-center space-x-3">
      <label for="pokeId" class="text-lg">全国図鑑No:</label>
      <input type="text" id="pokeId" bind:value={pokeId} class="border border-gray-300 rounded px-2 py-1" />
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">検索</button>
    </form>

    <PokeCard {pokeData} />
  </div>
</div>
