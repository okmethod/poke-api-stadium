<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import { getRandomNumbers, formatHW, formatStat } from "$lib/utils/numerics";

  let paramId = "height";
  interface Param {
    name: string;
    calcValue: (value: PokeData) => string;
  }
  const params: { [key: string]: Param } = {
    height: { name: "たかさ", calcValue: (value: PokeData) => formatHW(value.height, "height") },
    weight: { name: "おもさ", calcValue: (value: PokeData) => formatHW(value.weight, "weight") },
    hp: { name: "HP", calcValue: (value: PokeData) => formatStat(value.stats.hp) },
    attack: { name: "こうげき", calcValue: (value: PokeData) => formatStat(value.stats.attack) },
    defense: { name: "ぼうぎょ", calcValue: (value: PokeData) => formatStat(value.stats.defense) },
    specialAttack: { name: "とくこう", calcValue: (value: PokeData) => formatStat(value.stats.specialAttack) },
    specialDefense: { name: "とくぼう", calcValue: (value: PokeData) => formatStat(value.stats.specialDefense) },
  };

  let isOpen = false;
  let pokeIds: number[] = [];
  let pokeDataArray: PokeData[] = [];
  async function fetchPokeDataArray() {
    isOpen = false;
    try {
      pokeIds = getRandomNumbers(1, LATEST_POKEMON_ID, 3);
      pokeDataArray = await Promise.all(pokeIds.slice(0, 3).map((id) => getPokeData(fetch, id.toString())));
    } catch {
      // do nothing
    }
  }

  function handleDndConsider(event: CustomEvent<{ items: PokeData[] }>) {
    const { items } = event.detail;
    pokeDataArray = items;
  }

  function handleDndFinalize(event: CustomEvent<{ items: PokeData[] }>) {
    const { items } = event.detail;
    pokeDataArray = items;
  }

  const flipDurationMs = 300;
  const dropTargetStyle = { outline: "0px" };
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-2">
    <h1 class="text-2xl font-bold">ポケモン XX くらべ</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[1200px]">
    <div class="ml-4">
      <form on:submit|preventDefault={fetchPokeDataArray} class="flex items-center space-x-3">
        <select id="params" bind:value={paramId} class="border rounded px-12 py-1">
          {#each Object.entries(params) as [key, value]}
            <option value={key}>{value.name}</option>
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
    </div>

    <div class="space-y-5 border bg-white rounded-xl min-h-[300px] min-w-[300px]">
      <div
        class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent"
        use:dndzone={{ items: pokeDataArray, flipDurationMs, dropTargetStyle }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each pokeDataArray as pokeData (pokeData.id)}
          <div>
            <PokeCardCompact {pokeData} />
            <p class="text-center">{isOpen ? params[paramId].calcValue(pokeData) : "???"}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="ml-4">
      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded h-full flex items-center"
        on:click={() => (isOpen = !isOpen)}
      >
        <Icon icon="mdi:eye" class="w-5 h-5" />
      </button>
    </div>
  </div>
</div>
