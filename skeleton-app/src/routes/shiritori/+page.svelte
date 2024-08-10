<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/staticPoke";
  import PokeChip from "$lib/components/cards/PokeChip.svelte";
  import PokeListModal from "$lib/components/modals/PokeListModal.svelte";
  import { getRandomNumber, pickRandomNumbers } from "$lib/utils/numerics";
  import { STATIC_POKE_DICT } from "$lib/constants/staticPoke";

  interface PokeItem {
    id: number;
    jaName: string;
    imageUrl: string;
    isUsed: boolean;
  }

  let pokeArray: PokeItem[] = Object.entries(STATIC_POKE_DICT).map(([pokeId, staticPokeData]) => ({
    id: Number(pokeId),
    jaName: staticPokeData.jaName,
    imageUrl: staticPokeData.imageUrl,
    isUsed: false,
  }));

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
    const ignoreChars = ["ー", "♀", "♂", "２", "Ｚ"];
    if (ignoreChars.includes(tailChar) && name.length > 1) {
      tailChar = name.slice(-2, -1);
    }
    return normalizeChar(tailChar);
  }

  interface GroupedByHeadCharPokeData {
    [headChar: string]: {
      [pokeId: number]: {
        pokeName: string;
        imageUrl: string;
      };
    };
  }

  function groupByHeadChar(staticPokeDict: { [pokeId: number]: StaticPokeData }): GroupedByHeadCharPokeData {
    return Object.entries(staticPokeDict).reduce((acc, [pokeId, staticPokeData]) => {
      const firstChar = getHeadChar(staticPokeData.jaName);
      if (!acc[firstChar]) {
        acc[firstChar] = {};
      }
      acc[firstChar][Number(pokeId)] = { pokeName: staticPokeData.jaName, imageUrl: staticPokeData.imageUrl };
      return acc;
    }, {} as GroupedByHeadCharPokeData);
  }
  const groupedByHeadCharPokeData = groupByHeadChar(STATIC_POKE_DICT);
  console.log(groupedByHeadCharPokeData);

  function getUnusedIds(array: PokeItem[]): number[] {
    return array.filter((item) => !item.isUsed).map((item) => Number(item.id));
  }

  let candidatedPokeIds: number[] = [];
  const numPoke = 12;
  function pickUnusedPokeIds(): void {
    const unusedIds = getUnusedIds(pokeArray);
    candidatedPokeIds = pickRandomNumbers(unusedIds, numPoke);
  }

  let pushedPokeIds: number[] = [];
  function setFirstPokeData(): void {
    const unusedIds = getUnusedIds(pokeArray);
    const candidatedPokeId = pickRandomNumbers(unusedIds, numPoke)[0];
    pokeArray[candidatedPokeId].isUsed = true;
    pushedPokeIds = [...pushedPokeIds, candidatedPokeId];
  }

  function judgeShiritoriRule(tailPokeName: string | null, nextPokeName: string): boolean {
    if (tailPokeName === null) {
      return true; // 最初はなんでもOK
    }
    const tailChar = getTailChar(tailPokeName);
    const nextChar = getHeadChar(nextPokeName);
    return tailChar === nextChar;
  }

  function pushPokeId(nextPokeId: number) {
    return () => {
      const tailPokeId = pushedPokeIds.slice(-1)[0] ?? null;
      const tailPokeName = !tailPokeId ? pokeArray[tailPokeId].jaName : null;
      const nextPokeName = pokeArray[nextPokeId].jaName;
      if (!judgeShiritoriRule(tailPokeName, nextPokeName)) {
        message = `「${getTailChar(tailPokeName ?? "")}」 から はじまる ポケモン を えらんでね`;
        return;
      }
      pokeArray[nextPokeId].isUsed = true;
      pushedPokeIds = [...pushedPokeIds, nextPokeId];
    };
  }

  let message: string;
  function updateMessage(): void {
    const tailPokeId = pushedPokeIds.slice(-1)[0] ?? null;
    if (tailPokeId === null) {
      message = "ポケモン を よびだしてね";
      return;
    }
    const tailPokeName = pokeArray[tailPokeId].jaName;
    const tailChar = getTailChar(tailPokeName);
    if (tailChar === "ン") {
      message = "ン で おわっちゃった...";
      return;
    }
    if (pushedPokeIds.length == 1) {
      message = `はじめは 「${getTailChar(tailChar)}」`;
    } else {
      const messages = ["そのちょうし！", "いいぞ！", "がんばれ！", "すごい！", "いけいけ！"];
      message = `${messages[getRandomNumber(messages.length)]} つぎは 「${getTailChar(tailChar)}」`;
    }
  }

  $: if (pushedPokeIds) {
    updateMessage();
  }

  function resetState(): void {
    pokeArray = pokeArray.map((item) => ({ ...item, isUsed: false }));
    pushedPokeIds = [];
    setFirstPokeData();
    pickUnusedPokeIds();
    updateMessage();
  }

  const modalStore = getModalStore();
  function showPokeListModal(): void {
    const modalComponent: ModalComponent = {
      ref: PokeListModal,
      props: {
        title: "しりとりリスト",
        pokeDataArray: pushedPokeIds.map((pokeId) => pokeArray[pokeId].jaName),
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

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンしりとり</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !min-w-[300px] !max-w-[750px]">
    <!-- 入力フォーム -->
    <div class="ml-4 space-y-2">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">
          {#if candidatedPokeIds.length === 0}
            しりとり スタート
          {:else}
            しりとり リセット
          {/if}
        </span>
        <form on:submit|preventDefault={resetState}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
        <div class="flex-grow"><!-- spacer --></div>
        <p class="text-lg">{pushedPokeIds.length}</p>
        <form on:submit|preventDefault={showPokeListModal}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:format-list-numbered" class="cIconStyle" />
            </div>
          </button>
        </form>
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <!-- 候補ポケモン -->
    <div class={cPokeFieldStyle}>
      <div class={cPokeArrayStyle}>
        {#each candidatedPokeIds as pokeId}
          <div class="rounded-2xl border-2">
            {#if !pokeArray[pokeId].isUsed}
              <button type="button" on:click={pushPokeId(pokeId)}>
                <PokeChip name={pokeArray[pokeId].jaName} imageUrl={pokeArray[pokeId].imageUrl} />
              </button>
            {:else}
              <div class={cBlankPokeBoxStyle}></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- いれかえボタン -->
    <div class="ml-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を いれかえる</span>
        <form on:submit|preventDefault={pickUnusedPokeIds}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- しりとりポケモン列 -->
    <div class={cPokeFieldStyle}>
      <div class="{cPokeArrayStyle} md:ml-16 md:mr-16">
        <!-- 要素が足りない場合は null埋めする -->
        {#each [...Array(2 - pushedPokeIds.length).fill(null), ...pushedPokeIds].slice(-2) as pokeId, index}
          <div class="rounded-2xl border-2">
            {#if pokeId}
              <PokeChip name={pokeArray[pokeId].jaName} imageUrl={pokeArray[pokeId].imageUrl} />
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
      <div class="cInputFormAndMessagePartStyle mb-2">
        <span class="text-lg">{message}</span>
      </div>
    </div>
  </div>
</div>
