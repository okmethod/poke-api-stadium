<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/cards/PokeCardCompact.svelte";
  import { pickRandomNumbers, formatHeightWeight, formatStat } from "$lib/utils/numerics";
  import {
    cRouteBodyStyle,
    cTitlePartStyle,
    cTitleStyle,
    cContentPartStyle,
    cIconButtonStyle,
    cIconDivStyle,
    cIconStyle,
  } from "$lib/constants";

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
      formatValue: (value: PokeData) => formatHeightWeight(value.height, "height"),
    },
    weight: {
      name: "おもさ",
      value: (value: PokeData) => value.weight,
      formatValue: (value: PokeData) => formatHeightWeight(value.weight, "weight"),
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
  const numPoke = 4;
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

<div class={cRouteBodyStyle}>
  <!-- タイトル部 -->
  <div class={cTitlePartStyle}>
    <h1 class={cTitleStyle}>ポケモンXXくらべ</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class={cContentPartStyle}>
    <!-- 入力フォーム -->
    <div class="ml-4 space-y-2">
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
          <button type="submit" disabled={isLoading} class="{cIconButtonStyle} {isLoading ? 'bg-gray-500' : ''}">
            <div class={cIconDivStyle}>
              <Icon icon="mdi:pokeball" class={cIconStyle} />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- ポケモン並べ替え -->
    <div class="min-h-[250px] min-w-[300px] border bg-white rounded-xl">
      <div
        class="flex flex-wrap justify-between p-4"
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

    <!-- メッセージ -->
    <div class="ml-4 mt-2">
      <div class="flex items-center space-x-3 mb-2">
        <span class="text-lg">こたえあわせ</span>
        <button type="button" class={cIconButtonStyle} on:click={compareValues}>
          <div class={cIconDivStyle}>
            <Icon icon="mdi:pokeball" class={cIconStyle} />
          </div>
        </button>
        <span class="text-lg">{comprareResult}</span>
      </div>
    </div>
  </div>
</div>
