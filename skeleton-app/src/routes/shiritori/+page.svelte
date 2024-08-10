<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeChip from "$lib/components/cards/PokeChip.svelte";
  import PokeListModal from "$lib/components/modals/PokeListModal.svelte";
  import { getRandomNumber, pickRandomNumbers } from "$lib/utils/numerics";
  import {
    cRouteBodyStyle,
    cTitlePartStyle,
    cTitleStyle,
    cContentPartStyle,
    cIconButtonStyle,
    cIconDivStyle,
    cIconStyle,
  } from "$lib/constants";

  interface PokeItem {
    data: PokeData;
    isUsed: boolean;
  }

  let isLoading = false;
  let pokeIds: number[] = [];
  let pokeArray: PokeItem[] = [];
  const numPoke = 12;
  async function fetchPokeDataArray(): Promise<void> {
    isLoading = true;
    try {
      const numbers = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
      pokeIds = pickRandomNumbers(numbers, numPoke);
      const pokeDataArray = await Promise.all(pokeIds.slice(0, numPoke).map((id) => getPokeData(fetch, id.toString())));
      pokeArray = pokeDataArray.map((pokeData) => ({
        data: pokeData,
        isUsed: false,
      }));
    } catch {
      // do nothing
    }
    isLoading = false;
  }

  let pushedPokeArray: Array<PokeItem | null> = [null, null];
  async function setFirstPokeData(): Promise<void> {
    isLoading = true;
    try {
      const numbers = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
      const pokeId = pickRandomNumbers(numbers, numPoke)[0];
      const pokeData = await getPokeData(fetch, pokeId.toString());
      const pokeItem: PokeItem = {
        data: pokeData,
        isUsed: false,
      };
      pushedPokeArray = [...pushedPokeArray, pokeItem];
    } catch {
      // do nothing
    }
    isLoading = false;
  }

  function normalizeChar(char: string): string {
    // prettier-ignore
    const normalizationMap: { [key: string]: string } = {
      'ガ': 'カ', 'ギ': 'キ', 'グ': 'ク', 'ゲ': 'ケ', 'ゴ': 'コ',
      'ザ': 'サ', 'ジ': 'シ', 'ズ': 'ス', 'ゼ': 'セ', 'ゾ': 'ソ',
      'ダ': 'タ', 'ヂ': 'チ', 'ヅ': 'ツ', 'デ': 'テ', 'ド': 'ト',
      'バ': 'ハ', 'ビ': 'ヒ', 'ブ': 'フ', 'ベ': 'ヘ', 'ボ': 'ホ', 
      'パ': 'ハ', 'ピ': 'ヒ', 'プ': 'フ', 'ペ': 'ヘ', 'ポ': 'ホ',
      'ァ': 'ア', 'ィ': 'イ', 'ゥ': 'ウ', 'ェ': 'エ', 'ォ': 'オ',
      'ャ': 'ヤ', 'ュ': 'ユ', 'ョ': 'ヨ', 'ッ': 'ツ'
    };
    return normalizationMap[char] || char;
  }

  function getHeadChar(name: string): string {
    return normalizeChar(name.slice(0, 1));
  }

  function getTailChar(name: string): string {
    let tailChar = name.slice(-1);
    if (tailChar === "ー" && name.length > 1) {
      tailChar = name.slice(-2, -1);
    }
    return normalizeChar(tailChar);
  }

  function judgeShiritoriRule(tailPokeName: string | null, nextPokeName: string): boolean {
    if (tailPokeName === null) {
      return true; // 最初はなんでもOK
    }
    const tailChar = getTailChar(tailPokeName);
    const nextChar = getHeadChar(nextPokeName);
    return tailChar === nextChar;
  }

  function pushPokeChip(index: number) {
    return () => {
      const tailPokeName = pushedPokeArray.slice(-1)[0]?.data.jaName ?? null;
      const nextPokeName = pokeArray[index].data.jaName;
      if (!judgeShiritoriRule(tailPokeName, nextPokeName)) {
        message = `「${getTailChar(tailPokeName ?? "")}」 から はじまる ポケモン を えらんでね`;
        return;
      }
      pokeArray[index].isUsed = true;
      pushedPokeArray = [...pushedPokeArray, pokeArray[index]];
    };
  }

  let message: string;
  function updateMessage(): void {
    if (pushedPokeArray.length < 3) {
      message = "ポケモン を よびだしてね";
      return;
    }
    const tailPokeName = pushedPokeArray.slice(-1)[0]?.data.jaName ?? "";
    const tailChar = getTailChar(tailPokeName);
    if (tailChar === "ン") {
      message = "ン で おわっちゃった...";
      return;
    }
    if (pushedPokeArray.length - 2 == 1) {
      message = `はじめは 「${getTailChar(tailChar)}」`;
    } else {
      const messages = ["そのちょうし！", "いいぞ！", "がんばれ！", "すごい！", "いけいけ！"];
      message = `${messages[getRandomNumber(messages.length)]} つぎは 「${getTailChar(tailChar)}」`;
    }
  }

  $: if (pushedPokeArray) {
    updateMessage();
  }

  function resetState(): void {
    pokeArray = [];
    setFirstPokeData();
    fetchPokeDataArray();
    pushedPokeArray = [null, null];
    updateMessage();
  }

  const modalStore = getModalStore();
  function showPokeListModal(): void {
    const modalComponent: ModalComponent = {
      ref: PokeListModal,
      props: {
        title: "しりとりリスト",
        pokeDataArray: pushedPokeArray.filter((pokeItem) => pokeItem !== null).map((pokeItem) => pokeItem.data),
      },
    };
    const modal: ModalSettings = {
      type: "component",
      component: modalComponent,
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
    modalStore.trigger(modal);
  }

  const cPokeFieldStyle = "min-h-[150px] md:min-w-[750px] border bg-white rounded-xl";
  const cPokeArrayStyle = "flex flex-wrap justify-between gap-y-1 p-4";
  const cBlankPokeBoxStyle = "h-[100px] w-[100px] bg-gray-100 rounded-2xl";
</script>

<div class={cRouteBodyStyle}>
  <!-- タイトル部 -->
  <div class={cTitlePartStyle}>
    <h1 class={cTitleStyle}>ポケモンしりとり</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="{cContentPartStyle} min-w-[300px] max-w-[600px]">
    <!-- 入力フォーム -->
    <div class="ml-4 space-y-2">
      <div class="flex items-center space-x-3">
        <span class="text-lg">
          {#if pokeArray.length === 0}
            しりとり スタート
          {:else}
            しりとり リセット
          {/if}
        </span>
        <form on:submit|preventDefault={resetState}>
          <button type="submit" disabled={isLoading} class="{cIconButtonStyle} {isLoading ? 'bg-gray-500' : ''}">
            <div class={cIconDivStyle}>
              <Icon icon="mdi:pokeball" class={cIconStyle} />
            </div>
          </button>
        </form>
        <div class="flex-grow"><!-- spacer --></div>
        <p class="text-lg">{pushedPokeArray.length - 2}</p>
        <form on:submit|preventDefault={showPokeListModal}>
          <button type="submit" class={cIconButtonStyle}>
            <div class={cIconDivStyle}>
              <Icon icon="mdi:format-list-numbered" class={cIconStyle} />
            </div>
          </button>
        </form>
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <!-- 候補ポケモン -->
    <div class={cPokeFieldStyle}>
      <div class={cPokeArrayStyle}>
        {#each pokeArray as pokeItem, index}
          <div class="rounded-2xl border-2">
            {#if !pokeItem.isUsed}
              <button type="button" on:click={pushPokeChip(index)}>
                <PokeChip pokeData={pokeItem.data} />
              </button>
            {:else}
              <div class={cBlankPokeBoxStyle}></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- いれかえボタン -->
    <div class="ml-4 space-y-2">
      <div class="flex items-center space-x-3">
        <span class="text-lg">ポケモン を いれかえる</span>
        <form on:submit|preventDefault={fetchPokeDataArray}>
          <button type="submit" disabled={isLoading} class="{cIconButtonStyle} {isLoading ? 'bg-gray-500' : ''}">
            <div class={cIconDivStyle}>
              <Icon icon="mdi:pokeball" class={cIconStyle} />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- しりとりポケモン列 -->
    <div class={cPokeFieldStyle}>
      <div class="{cPokeArrayStyle} md:ml-16 md:mr-16">
        {#each pushedPokeArray.slice(-2) as pokeItem, index}
          <div class="rounded-2xl border-2">
            {#if pokeItem}
              <PokeChip pokeData={pokeItem.data} />
            {:else}
              <div class={cBlankPokeBoxStyle}></div>
            {/if}
          </div>
          {#if index < 2}
            <span>→</span>
          {/if}
        {/each}
        <div class="rounded-2xl border-2">
          <div class={cBlankPokeBoxStyle}>
            <span class="block text-center text-xl">？</span>
          </div>
        </div>
      </div>
    </div>

    <!-- メッセージ -->
    <div class="ml-4">
      <div class="flex items-center space-x-3 mb-2">
        <span class="text-lg">{message}</span>
      </div>
    </div>
  </div>
</div>
