<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/cards/PokeCardCompact.svelte";
  import PokeListModal from "$lib/components/modals/PokeListModal.svelte";
  import { getRandomNumber, pickRandomNumbers } from "$lib/utils/numerics";

  const modalStore = getModalStore();

  interface PokeItem {
    data: PokeData;
    isUsed: boolean;
  }

  let isLoading = false;
  let pokeIds: number[] = [];
  let pokeArray: PokeItem[] = [];
  const numPoke = 3;
  async function fetchPokeDataArray(): Promise<void> {
    isLoading = true;
    try {
      const numbers = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
      pokeIds = pickRandomNumbers(numbers, numPoke);
      const pokeDataArray = await Promise.all(pokeIds.slice(0, numPoke).map((id) => getPokeData(fetch, id.toString())));
      pokeArray = pokeDataArray.map((pokeData, index) => ({
        id: index,
        data: pokeData,
        isUsed: false,
      }));
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

  let pushedPokeArray: Array<PokeItem | null> = [null, null];
  function clickPokeCard(index: number) {
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
    const messages = ["そのちょうし！", "いいぞ！", "がんばれ！", "すごい！", "いけいけ！"];
    message = `${messages[getRandomNumber(messages.length)]} つぎは 「${getTailChar(tailChar)}」`;
  }

  $: if (pushedPokeArray) {
    updateMessage();
  }

  function resetState(): void {
    pokeArray = [];
    pushedPokeArray = [null, null];
    updateMessage();
  }

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
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-2">
    <h1 class="text-2xl font-bold">ポケモンしりとり</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[600px]">
    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">はじめから</span>
        <form on:submit|preventDefault={resetState}>
          <button
            type="submit"
            disabled={isLoading}
            class="px-2 py-1 text-white rounded h-full flex items-center bg-blue-500 hover:bg-blue-600"
          >
            <Icon icon="mdi:pokeball" class="w-5 h-5" />
          </button>
        </form>
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
        <div class="flex-grow"><!-- spacer --></div>
        <p class="text-lg">{pushedPokeArray.length - 2}</p>
        <form on:submit|preventDefault={showPokeListModal}>
          <button
            type="submit"
            class="px-2 py-1 text-white rounded h-full flex items-center bg-blue-500 hover:bg-blue-600"
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:format-list-numbered" class="w-5 h-5" />
            </div>
          </button>
        </form>
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each pokeArray as pokeItem, index}
          <div class="rounded-2xl border-2">
            {#if !pokeItem.isUsed}
              <button type="button" on:click={clickPokeCard(index)}>
                <PokeCardCompact pokeData={pokeItem.data} />
              </button>
            {:else}
              <p class="h-[150px] w-[150px]"></p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each pushedPokeArray.slice(-2) as pokeItem, index}
          <div class="rounded-2xl border-2">
            {#if pokeItem}
              <PokeCardCompact pokeData={pokeItem.data} />
            {:else}
              <p class="h-[150px] w-[150px]"></p>
            {/if}
          </div>
          {#if index < 2}
            <span class="mx-2">→</span>
          {/if}
        {/each}
        <div class="h-[150px] w-[150px] text-center text-xl rounded-2xl border-2">？</div>
      </div>
    </div>
    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">{message}</span>
      </div>
    </div>
  </div>
</div>
