<script lang="ts">
  import { onMount } from "svelte";
  import { dndzone } from "svelte-dnd-action";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/poke";
  import type { TypeName } from "$lib/types/type";
  import type { Stats } from "$lib/types/stats";
  import PokeTile from "$lib/components/cards/PokeTile.svelte";
  import { pickRandomNumbers, formatHeightWeight, formatStat } from "$lib/utils/numerics";
  import { LATEST_POKEMON_ID } from "$lib/constants/staticPokeData";

  interface PokeItem {
    jaName: string;
    imageUrl: string;
    type1Name: TypeName;
    type2Name: TypeName | null;
    height: number;
    weight: number;
    stats: Stats;
  }

  let pokeArray: PokeItem[];
  onMount(async () => {
    // staticデータの容量が大きいので、利用スコープを局所化してガベージコレクションされるようにする
    const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");
    pokeArray = initPokeArray(STATIC_POKE_DICT);
  });

  function initPokeArray(staticPokeDict: { [pokeId: number]: StaticPokeData }): PokeItem[] {
    const dummyPokeItem: PokeItem = {
      jaName: "dummy",
      imageUrl: "",
      type1Name: "unknown" as TypeName,
      type2Name: null,
      height: 0,
      weight: 0,
      stats: { hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0 },
    };
    return [
      dummyPokeItem, // index と pokeId を一致させるために、先頭にダミーデータを追加している
      ...Object.entries(staticPokeDict).map(([, staticPokeData]) => ({
        jaName: staticPokeData.jaName,
        imageUrl: staticPokeData.imageUrl,
        type1Name: staticPokeData.type1Name as TypeName,
        type2Name: staticPokeData.type2Name ? (staticPokeData.type2Name as TypeName) : null,
        height: staticPokeData.height,
        weight: staticPokeData.weight,
        stats: staticPokeData.stats,
      })),
    ];
  }

  let optionId = "height";
  interface Option {
    name: string;
    value: (value: PokeItem) => number;
    formatValue: (value: PokeItem) => string;
  }
  const options: Record<string, Option> = {
    height: {
      name: "たかさ",
      value: (value: PokeItem) => value.height,
      formatValue: (value: PokeItem) => formatHeightWeight(value.height, "height"),
    },
    weight: {
      name: "おもさ",
      value: (value: PokeItem) => value.weight,
      formatValue: (value: PokeItem) => formatHeightWeight(value.weight, "weight"),
    },
    hp: {
      name: "HP",
      value: (value: PokeItem) => value.stats.hp,
      formatValue: (value: PokeItem) => formatStat(value.stats.hp),
    },
    attack: {
      name: "こうげき",
      value: (value: PokeItem) => value.stats.attack,
      formatValue: (value: PokeItem) => formatStat(value.stats.attack),
    },
    defense: {
      name: "ぼうぎょ",
      value: (value: PokeItem) => value.stats.defense,
      formatValue: (value: PokeItem) => formatStat(value.stats.defense),
    },
    specialAttack: {
      name: "とくこう",
      value: (value: PokeItem) => value.stats.specialAttack,
      formatValue: (value: PokeItem) => formatStat(value.stats.specialAttack),
    },
    specialDefense: {
      name: "とくぼう",
      value: (value: PokeItem) => value.stats.specialDefense,
      formatValue: (value: PokeItem) => formatStat(value.stats.specialDefense),
    },
    speed: {
      name: "すばやさ",
      value: (value: PokeItem) => value.stats.speed,
      formatValue: (value: PokeItem) => formatStat(value.stats.speed),
    },
  };

  // dndzone 用の表示用データ
  interface DndItem {
    id: number; // pokeId が入る
    jaName: string;
    type1Name: TypeName;
    type2Name: TypeName | null;
    imageUrl: string;
  }
  function convertIdsToDndItems(pokeIds: number[]): DndItem[] {
    return pokeIds.map((pokeId) => ({
      id: pokeId,
      jaName: pokeArray[pokeId].jaName,
      type1Name: pokeArray[pokeId].type1Name,
      type2Name: pokeArray[pokeId].type2Name,
      imageUrl: pokeArray[pokeId].imageUrl,
    }));
  }

  let isOpen = false;
  let pickedPokeIdDndItems: DndItem[] = [];
  let numPoke = 3;
  function pickPokeIds(): void {
    resetState();
    const pokeIndexes = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
    pickedPokeIdDndItems = convertIdsToDndItems(pickRandomNumbers(pokeIndexes, numPoke));
  }

  let comprareResult = "";
  function compareValues(): void {
    if (pickedPokeIdDndItems.length == 0) {
      comprareResult = "さきに ポケモンを よびだしてね";
      return;
    }
    isOpen = true;
    const values = pickedPokeIdDndItems.map((dndItem) => options[optionId].value(pokeArray[dndItem.id]));
    if (isSortedDesc(values)) {
      const messages: { [key: string]: string } = {
        3: "せいかい！",
        4: "すごい！",
        5: "すごすぎる！！",
        6: "ポケモンマスター！！！！",
      };
      comprareResult = messages[numPoke] || "せいかい！";
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

  $: if (optionId || numPoke) {
    resetState();
  }

  function handleDndConsider(event: CustomEvent<{ items: DndItem[] }>): void {
    const { items } = event.detail;
    pickedPokeIdDndItems = items;
  }
  function handleDndFinalize(event: CustomEvent<{ items: DndItem[] }>): void {
    const { items } = event.detail;
    pickedPokeIdDndItems = items;
  }
  const flipDurationMs = 300;
  const dropTargetStyle = { outline: "0px" };

  const cPokeFieldStyle = "min-h-[250px] min-w-[300px] border bg-white rounded-xl";
  const cPokeArrayStyle = "flex flex-wrap justify-between gap-y-1 p-4";
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンXXくらべ</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle">
    <!-- 入力フォーム -->
    <div class="ml-4 space-y-2">
      <div class="cInputFormAndMessagePartStyle">
        <select bind:value={optionId} class="border rounded px-10 py-1">
          {#each Object.entries(options) as [key, value]}
            <option value={key}>{value.name}</option>
          {/each}
        </select>
        <span class="text-lg">で くらべる</span>
      </div>
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を </span>
        <input type="number" min="3" max="6" bind:value={numPoke} class="border rounded px-4 py-1 h-full" />
        <span class="text-lg">たい よびだす</span>
        <form on:submit|preventDefault={pickPokeIds}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- ポケモン並べ替え -->
    <div class={cPokeFieldStyle}>
      <div
        class={cPokeArrayStyle}
        use:dndzone={{ items: pickedPokeIdDndItems, flipDurationMs, dropTargetStyle }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each pickedPokeIdDndItems as dndItem, index (dndItem.id)}
          <div>
            <PokeTile
              name={dndItem.jaName}
              type1Name={dndItem.type1Name}
              type2Name={dndItem.type2Name}
              imageUrl={dndItem.imageUrl}
            />
            <p class="text-center">{isOpen ? options[optionId].formatValue(pokeArray[dndItem.id]) : "???"}</p>
            <p class="text-center">{index + 1} ばんめ</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- メッセージ -->
    <div class="ml-4 mt-2">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">こたえあわせ</span>
        <button type="button" class="cIconButtonStyle" on:click={compareValues}>
          <div class="cIconDivStyle">
            <Icon icon="mdi:pokeball" class="cIconStyle" />
          </div>
        </button>
        <span class="text-lg">{comprareResult}</span>
      </div>
    </div>
  </div>
</div>
