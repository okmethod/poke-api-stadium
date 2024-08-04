<script lang="ts">
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import { getRandomNumbers } from "$lib/utils/numerics";

  let paramId = "";
  const params = {
    height: "たかさ",
    weight: "おもさ",
  };

  let pokeIds: number[] = [];
  let pokeDataArray: PokeData[] = [];
  async function fetchPokeDataArray() {
    try {
      pokeIds = getRandomNumbers(1, LATEST_POKEMON_ID, 3);
      pokeDataArray = await Promise.all(pokeIds.slice(0, 3).map((id) => getPokeData(fetch, id.toString())));
    } catch {
      // do nothing
    }
  }
</script>

<div class="h-full w-full mx-auto container">
  <div class="mb-2">
    <h1 class="text-2xl font-bold">ポケモン XX くらべ</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[1200px]">
    <form on:submit|preventDefault={fetchPokeDataArray} class="flex items-center space-x-3">
      <select id="params" bind:value={paramId} class="border rounded px-12 py-1">
        {#each Object.entries(params) as [key, value]}
          <option value={key}>{value}</option>
        {/each}
      </select>
      <div class="flex items-center space-x-2">
        <label for="params" class="text-lg"> でくらべる </label>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded h-full flex items-center"
        >
          <Icon icon="mdi:pokemon-go" class="w-5 h-5" />
        </button>
      </div>
    </form>

    <div class="flex flex-wrap space-x-1">
      {#each pokeDataArray as pokeData}
        <PokeCardCompact {pokeData} />
      {/each}
    </div>
  </div>
</div>
