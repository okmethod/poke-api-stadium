<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import { pickRandomNumbers, formatHW, formatStat } from "$lib/utils/numerics";

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
    speed: {
      name: "すばやさ",
      value: (value: PokeData) => value.stats.speed,
      formatValue: (value: PokeData) => formatStat(value.stats.speed),
    },
  };

  interface PokeItem {
    id: number;
    data: PokeData;
  }

  let isOpen = false;
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
      }));
    } catch {
      // do nothing
    }
    isLoading = false;
  }

  function handleDndConsider(event: CustomEvent<{ items: PokeItem[] }>): void {
    const { items } = event.detail;
    pokeArray = items;
  }

  function handleDndFinalize(event: CustomEvent<{ items: PokeItem[] }>): void {
    const { items } = event.detail;
    pokeArray = items;
  }

  const flipDurationMs = 300;
  const dropTargetStyle = { outline: "0px" };

  let comprareResult = "";
  function compareValues(): void {
    if (pokeArray.length == 0) {
      comprareResult = "さきに ポケモンを よびだしてね";
      return;
    }
    isOpen = true;
    const values = pokeArray.map((pokeItem) => options[optionId].value(pokeItem.data));
    if (isSortedDesc(values)) {
      comprareResult = "せいかい！";
    } else {
      comprareResult = "ざんねん...";
    }
  }
  function isSortedDesc(array: number[]): boolean {
    return array.every((value, index) => index === 0 || array[index - 1] >= value);
  }

  function resetState(): void {
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
        <span class="text-lg">で くらべる</span>
      </div>
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
      </div>
    </div>

    <div class="space-y-5 border bg-white rounded-xl min-h-[250px] min-w-[300px]">
      <div
        class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent"
        use:dndzone={{ items: pokeArray, flipDurationMs, dropTargetStyle }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each pokeArray as pokeItem, index (pokeItem.id)}
          <div>
            <PokeCardCompact pokeData={pokeItem.data} />
            <p class="text-center">{isOpen ? options[optionId].formatValue(pokeItem.data) : "???"}</p>
            <p class="text-center">{index + 1} ばんめ</p>
          </div>
        {/each}
      </div>
    </div>
    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">こたえあわせ</span>
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-white rounded h-full flex items-center"
          on:click={compareValues}
        >
          <div class="w-5 h-5 flex-shrink-0">
            <Icon icon="mdi:pokeball" class="w-5 h-5" />
          </div>
        </button>
        <span class="text-lg">{comprareResult}</span>
      </div>
    </div>
  </div>
</div>
