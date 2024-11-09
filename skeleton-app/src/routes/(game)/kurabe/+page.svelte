<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { filterArrayByGeneration } from "$lib/stores/generation";
  import { formatHeightWeight, formatStat } from "$lib/utils/numerics";
  import { pickRandomElementsFromArray } from "$lib/utils/collections";
  import IconButton from "$lib/components/IconButton.svelte";
  import PokeTile from "$lib/components/cards/PokeTile.svelte";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeItems: PokeItem[];
  };

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
  let pokeCount = 3;
  let pickedPokeItems: PokeItem[] = [];
  async function pickPokeItems(): Promise<void> {
    resetState();
    const pokeItems = filterArrayByGeneration(data.pokeItems, "id");
    pickedPokeItems = pickRandomElementsFromArray(pokeItems, pokeCount);
  }

  // 比較実行とメッセージ更新
  let comprareResult = "";
  function compareValues(): void {
    if (pickedPokeItems.length == 0) {
      comprareResult = "さきに ポケモンを よびだしてね";
      return;
    }
    isOpen = true;
    const values = pickedPokeItems.map((pokeItem) => modes[modeId].value(pokeItem));
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
  const cPokeFieldStyle = "min-h-[200px] sm:min-h-[250px] min-w-[300px] md:min-w-[600px] border bg-white rounded-xl";
  const cPokeArrayStyle = "flex flex-wrap justify-between gap-y-1 p-4";
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンXXくらべ</h1>
  </div>

  <div class="cContentPartStyle">
    <!-- 上部ボタン -->
    <div class="m-4 space-y-2">
      <div class="cInputFormAndMessagePartStyle">
        <select bind:value={modeId} id="modeId" class="border rounded px-10 py-1">
          {#each Object.entries(modes) as [key, value]}
            <option value={key}>{value.name}</option>
          {/each}
        </select>
        <span class="cSpanTextStyle">で くらべる</span>
      </div>
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">ポケモン を </span>
        <input
          type="number"
          id="pokeCount"
          min="3"
          max="6"
          bind:value={pokeCount}
          class="border rounded px-4 py-1 h-full"
        />
        <span class="cSpanTextStyle">たい よびだす</span>
        <IconButton icon="mdi:pokeball" cButton="btn-sm" onClick={pickPokeItems} />
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
              pokeId={pokeItem.id}
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

    <!-- 下部ボタン -->
    <div class="m-4 mt-2">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">こたえあわせ</span>
        <IconButton icon="mdi:eye" cButton="btn-sm" onClick={compareValues} />
        <span class="cSpanTextStyle">{comprareResult}</span>
      </div>
    </div>
  </div>
</div>
