<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import { getRandomNumbers, formatHW, formatStat } from "$lib/utils/numerics";

  let optionId = "height";
  interface Option {
    name: string;
    value: (value: PokeData) => number;
    formatValue: (value: PokeData) => string;
  }
  const options: { [key: string]: Option } = {
    height: {
      name: "たかさ",
      value: (value: PokeData) => value.height,
      formatValue: (value: PokeData) => formatHW(value.height, "height"),
    },
    weight: {
      name: "おもさ",
      value: (value: PokeData) => value.weight,
      formatValue: (value: PokeData) => formatHW(value.weight, "weight"),
    },
    hp: {
      name: "HP",
      value: (value: PokeData) => value.stats.hp,
      formatValue: (value: PokeData) => formatStat(value.stats.hp),
    },
    attack: {
      name: "こうげき",
      value: (value: PokeData) => value.stats.attack,
      formatValue: (value: PokeData) => formatStat(value.stats.attack),
    },
    defense: {
      name: "ぼうぎょ",
      value: (value: PokeData) => value.stats.defense,
      formatValue: (value: PokeData) => formatStat(value.stats.defense),
    },
    specialAttack: {
      name: "とくこう",
      value: (value: PokeData) => value.stats.specialAttack,
      formatValue: (value: PokeData) => formatStat(value.stats.specialAttack),
    },
    specialDefense: {
      name: "とくぼう",
      value: (value: PokeData) => value.stats.specialDefense,
      formatValue: (value: PokeData) => formatStat(value.stats.specialDefense),
    },
  };

  let isOpen = false;
  let pokeIds: number[] = [];
  let pokeDataArray: PokeData[] = [];
  async function fetchPokeDataArray() {
    resetState();
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

  let comprareResult = "";
  function compareValues() {
    isOpen = true;
    const values = pokeDataArray.map((pokeData) => options[optionId].value(pokeData));
    if (isSortedDesc(values)) {
      comprareResult = "せいかい！";
    } else {
      comprareResult = "ざんねん...";
    }
  }
  function isSortedDesc(array: number[]) {
    return array.every((value, index) => index === 0 || array[index - 1] >= value);
  }

  function resetState() {
    isOpen = false;
    comprareResult = "";
  }

  $: if (optionId) {
    resetState();
  }
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-2">
    <h1 class="text-2xl font-bold">ポケモンXXくらべ</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[600px]">
    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <select bind:value={optionId} class="border rounded px-10 py-1">
          {#each Object.entries(options) as [key, value]}
            <option value={key}>{value.name}</option>
          {/each}
        </select>
        <span class="text-lg">でくらべる</span>
      </div>
      <div class="flex items-center space-x-3">
        <span class="text-lg">ポケモンをよぶ</span>
        <form on:submit|preventDefault={fetchPokeDataArray}>
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded h-full flex items-center"
          >
            <Icon icon="mdi:pokemon-go" class="w-5 h-5" />
          </button>
        </form>
      </div>
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
            <p class="text-center">{isOpen ? options[optionId].formatValue(pokeData) : "???"}</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">こたえあわせ</span>
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded h-full flex items-center"
          on:click={compareValues}
        >
          <Icon icon="mdi:pokemon-go" class="w-5 h-5" />
        </button>
        <span class="text-lg">{comprareResult}</span>
      </div>
    </div>
  </div>
</div>
