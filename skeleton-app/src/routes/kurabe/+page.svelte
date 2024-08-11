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
    id: number; // dndzone で使用するため id という命名にしている
    jaName: string;
    imageUrl: string;
    type1Name: TypeName;
    type2Name: TypeName | null;
    height: number;
    weight: number;
    stats: Stats;
  }

  // staticデータロード
  let POKE_DICT: Record<number, PokeItem>;
  onMount(async () => {
    // 利用スコープを局所化してガベージコレクションされるようにする
    const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");

    POKE_DICT = _initPokeDict(STATIC_POKE_DICT);
    function _initPokeDict(staticPokeDict: Record<number, StaticPokeData>): Record<number, PokeItem> {
      const pokeDict: Record<number, PokeItem> = {};
      Object.entries(staticPokeDict).forEach(([pokeId, staticPokeData]) => {
        pokeDict[Number(pokeId)] = {
          id: Number(pokeId),
          jaName: staticPokeData.jaName,
          imageUrl: staticPokeData.imageUrl,
          type1Name: staticPokeData.type1Name as TypeName,
          type2Name: staticPokeData.type2Name ? (staticPokeData.type2Name as TypeName) : null,
          height: staticPokeData.height,
          weight: staticPokeData.weight,
          stats: staticPokeData.stats,
        };
      });
      return pokeDict;
    }
  });

  // 選択可能な比較対象
  interface Mode {
    name: string;
    value: (value: PokeItem) => number;
    formatValue: (value: PokeItem) => string;
  }

  let modeId = "height";
  const modes: Record<string, Mode> = {
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

  // ゲームデータ管理
  let isOpen = false;
  let pickedPokeItems: PokeItem[] = [];
  let pokeCount = 3;
  function pickPokeItems(): void {
    resetState();
    const allPokeIds = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
    pickedPokeItems = _convertIdsToItems(pickRandomNumbers(allPokeIds, pokeCount));

    function _convertIdsToItems(pokeIds: number[]): PokeItem[] {
      return pokeIds.map((pokeId) => ({
        id: pokeId,
        jaName: POKE_DICT[pokeId].jaName,
        imageUrl: POKE_DICT[pokeId].imageUrl,
        type1Name: POKE_DICT[pokeId].type1Name,
        type2Name: POKE_DICT[pokeId].type2Name,
        height: POKE_DICT[pokeId].height,
        weight: POKE_DICT[pokeId].weight,
        stats: POKE_DICT[pokeId].stats,
      }));
    }
  }

  // 比較実行とメッセージ更新
  let comprareResult = "";
  function compareValues(): void {
    if (pickedPokeItems.length == 0) {
      comprareResult = "さきに ポケモンを よびだしてね";
      return;
    }
    isOpen = true;
    const values = pickedPokeItems.map((pokeItem) => modes[modeId].value(POKE_DICT[pokeItem.id]));
    if (_isSortedDesc(values)) {
      const messages: { [key: string]: string } = {
        3: "せいかい！",
        4: "すごい！",
        5: "すごすぎる！！",
        6: "ポケモンマスター！！！！",
      };
      comprareResult = messages[pokeCount] || "せいかい！";
    } else {
      comprareResult = "ざんねん...";
    }

    function _isSortedDesc(array: number[]): boolean {
      return array.every((value, index) => index === 0 || array[index - 1] >= value);
    }
  }

  // 状態リセット
  function resetState(): void {
    isOpen = false;
    comprareResult = "";
  }
  $: if (modeId || pokeCount) {
    resetState();
  }

  // ドラッグアンドドロップ
  function handleDndConsider(event: CustomEvent<{ items: PokeItem[] }>): void {
    const { items } = event.detail;
    pickedPokeItems = items;
  }
  function handleDndFinalize(event: CustomEvent<{ items: PokeItem[] }>): void {
    const { items } = event.detail;
    pickedPokeItems = items;
  }
  const flipDurationMs = 300;
  const dropTargetStyle = { outline: "0px" };

  // スタイル
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
        <select bind:value={modeId} class="border rounded px-10 py-1">
          {#each Object.entries(modes) as [key, value]}
            <option value={key}>{value.name}</option>
          {/each}
        </select>
        <span class="text-lg">で くらべる</span>
      </div>
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を </span>
        <input type="number" min="3" max="6" bind:value={pokeCount} class="border rounded px-4 py-1 h-full" />
        <span class="text-lg">たい よびだす</span>
        <form on:submit|preventDefault={pickPokeItems}>
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
        use:dndzone={{ items: pickedPokeItems, flipDurationMs, dropTargetStyle }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}
      >
        {#each pickedPokeItems as pokeItem, index (pokeItem.id)}
          <div>
            <PokeTile
              name={pokeItem.jaName}
              type1Name={pokeItem.type1Name}
              type2Name={pokeItem.type2Name}
              imageUrl={pokeItem.imageUrl}
            />
            <p class="text-center">{isOpen ? modes[modeId].formatValue(pokeItem) : "???"}</p>
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
