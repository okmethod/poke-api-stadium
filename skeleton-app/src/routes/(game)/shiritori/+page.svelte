<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import { filterDictByGeneration } from "$lib/stores/generation";
  import { playAudio } from "$lib/stores/audio";
  import { getRandomNumber } from "$lib/utils/numerics";
  import { pickRandomKey, pickRandomElementsFromObject, shuffleArray } from "$lib/utils/collections";
  import IconButton from "$lib/components/IconButton.svelte";
  import PokeChip from "$lib/components/cards/PokeChip.svelte";
  import PokeListModal from "$lib/components/modals/PokeListModal.svelte";
  import { getTailChar, solveShiritoriRule } from "./logic";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeDict: Record<number, PokeItem>; // 利用状況を管理するため全ポケモン情報を保持
    groupByHeadCharDict: Record<string, number[]>; // key: headChar, value: PokeIds
  };
  let pokeDict = data.pokeDict;
  const groupByHeadCharDict = data.groupByHeadCharDict;

  // 候補ポケモン抽選
  const pokeCount = 12;
  const possiblePokeCount = 4;
  let pickedPokeItems: PokeItem[] = [];
  function pickPokeItems(): void {
    if (pushedPokeItems.length === 0) {
      pushFirstPokeData();
    }
    const tailChar = getTailChar(pushedPokeItems[pushedPokeItems.length - 1].jaName);
    const unusedDict = _getUnusedDict(pokeDict);
    const unusedPossiblePokeDict = _getPossiblePokeDict(unusedDict, groupByHeadCharDict, tailChar);
    const pickedUnusedPokeItems =
      Object.keys(unusedDict).length > pokeCount
        ? pickRandomElementsFromObject(unusedDict, pokeCount)
        : Object.values(unusedDict);
    const pickedUnusedPossiblePokeItems =
      Object.keys(unusedPossiblePokeDict).length > possiblePokeCount
        ? pickRandomElementsFromObject(unusedPossiblePokeDict, possiblePokeCount)
        : Object.values(unusedPossiblePokeDict);
    pickedPokeItems = shuffleArray([...new Set([...pickedUnusedPokeItems, ...pickedUnusedPossiblePokeItems])]).slice(
      0,
      pokeCount,
    );

    function _getUnusedDict(pokeDict: Record<string, PokeItem>): Record<string, PokeItem> {
      return Object.fromEntries(Object.entries(pokeDict).filter(([, value]) => !value.isUsed));
    }

    function _getPossiblePokeDict(
      pokeDict: Record<string, PokeItem>,
      groupByHeadCharDict: Record<string, number[]>,
      tailChar: string,
    ): Record<string, PokeItem> {
      const possiblePokeIds = groupByHeadCharDict[tailChar] ?? [];
      return Object.fromEntries(
        possiblePokeIds.filter((pokeId) => pokeId in pokeDict).map((pokeId) => [pokeId, pokeDict[pokeId]]),
      );
    }
  }

  function markAsUsed(key: number): void {
    pokeDict[key].isUsed = true;
    pickedPokeItems = pickedPokeItems.map((pokeItem) =>
      pokeItem.pokeId === key ? { ...pokeItem, isUsed: true } : pokeItem,
    );
  }

  // しりとりに並んだポケモン管理
  let pushedPokeItems: PokeItem[] = [];
  function pushFirstPokeData(): void {
    const pickedKey = pickRandomKey(pokeDict); // 最初はすべて未使用の前提
    markAsUsed(pickedKey);
    const firstPokeItem = pokeDict[pickedKey];
    playAudio(firstPokeItem.oggUrl);
    pushedPokeItems = [firstPokeItem];
  }

  // しりとりルール解決
  function challengeShiritori(nextPokeItem: PokeItem): void {
    if (pushedPokeItems.length === 0) {
      message = "ポケモン を よびだしてね";
      return;
    }
    const tailPokeName = pushedPokeItems[pushedPokeItems.length - 1].jaName;
    const nextPokeName = nextPokeItem.jaName;
    if (!solveShiritoriRule(tailPokeName, nextPokeName)) {
      message = `「${getTailChar(tailPokeName ?? "")}」 から はじまる ポケモン を えらんでね`;
      return;
    }
    markAsUsed(nextPokeItem.pokeId);
    playAudio(nextPokeItem.oggUrl);
    pushedPokeItems = [...pushedPokeItems, nextPokeItem];
  }

  // メッセージ更新
  let message: string;
  function updateMessage(): void {
    const tailPokeItem = pushedPokeItems.slice(-1)[0] ?? null;
    if (tailPokeItem === null) {
      message = "ポケモン を よびだしてね";
      return;
    }
    const tailPokeName = tailPokeItem.jaName;
    const tailChar = getTailChar(tailPokeName);
    if (tailChar === "ン") {
      message = "ン で おわっちゃった...";
      return;
    }
    if (pushedPokeItems.length == 1) {
      message = `はじめは 「${getTailChar(tailChar)}」`;
    } else {
      const messages = ["そのちょうし！", "いいぞ！", "がんばれ！", "すごい！", "いけいけ！"];
      message = `${messages[getRandomNumber(messages.length)]} つぎは 「${getTailChar(tailChar)}」`;
    }
  }
  $: if (pushedPokeItems) {
    updateMessage();
  }

  // 状態リセット
  function resetState(): void {
    pokeDict = _resetPokeDictUsedFlag(filterDictByGeneration(data.pokeDict, "pokeId"));
    pushedPokeItems = [];
    pushFirstPokeData();
    pickPokeItems();
    updateMessage();

    function _resetPokeDictUsedFlag(pokeDict: Record<number, PokeItem>): Record<number, PokeItem> {
      return Object.fromEntries(Object.entries(pokeDict).map(([key, item]) => [key, { ...item, isUsed: false }]));
    }
  }

  // モーダル表示
  const modalStore = getModalStore();
  function modalSettings(modalComponent: ModalComponent): ModalSettings {
    return {
      type: "component",
      component: modalComponent,
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
  }

  function showPokeListModal(): void {
    const modalComponent: ModalComponent = {
      ref: PokeListModal,
      props: {
        title: "しりとりリスト",
        stringArray: pushedPokeItems.map((pokeItem) => pokeItem.jaName),
      },
    };
    const m = modalSettings(modalComponent);
    modalStore.trigger(m);
  }

  // スタイル
  const cPokeFieldStyle = "min-h-[150px] md:min-w-[750px] border bg-white rounded-xl";
  const cPokeArrayStyle = "flex flex-wrap justify-between gap-y-1 p-4";
  const cBlankPokeBoxStyle = "h-[100px] w-[100px] bg-gray-100 rounded-2xl";
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンしりとり</h1>
  </div>

  <div class="cContentPartStyle !min-w-[300px] !max-w-[750px]">
    <!-- 上部ボタン -->
    <div class="m-4 space-y-2">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">
          {#if pickedPokeItems.length === 0}
            しりとり スタート
          {:else}
            しりとり リセット
          {/if}
        </span>
        <IconButton icon="mdi:pokeball" cButton="btn-sm" onClick={resetState} />
        <div class="flex-grow"><!-- spacer --></div>
        <p class="cSpanTextStyle">{pushedPokeItems.length}</p>
        <IconButton icon="mdi:format-list-numbered" cButton="btn-sm" onClick={showPokeListModal} />
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <!-- 候補ポケモン -->
    <div class={cPokeFieldStyle}>
      <div class={cPokeArrayStyle}>
        {#each pickedPokeItems as pokeItem}
          <div class="rounded-2xl border-2">
            {#if !pokeItem.isUsed}
              <button type="button" on:click={() => challengeShiritori(pokeItem)}>
                <PokeChip name={pokeItem.jaName} imageUrl={pokeItem.imageUrl} />
              </button>
            {:else}
              <div class={cBlankPokeBoxStyle}></div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- いれかえボタン -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">ポケモン を いれかえる</span>
        <IconButton
          icon="mdi:pokeball"
          cButton="btn-sm"
          onClick={pickPokeItems}
          disabled={pushedPokeItems.length == 0}
        />
      </div>
    </div>

    <!-- しりとりポケモン列 -->
    <div class={cPokeFieldStyle}>
      <div class="{cPokeArrayStyle} md:ml-16 md:mr-16">
        <!-- 要素が足りない場合は null埋めする -->
        {#each pushedPokeItems.length >= 2 ? pushedPokeItems.slice(-2) : [...Array(2 - pushedPokeItems.length).fill(null), ...pushedPokeItems] as pokeItem, index}
          <div class="rounded-2xl border-2">
            {#if pokeItem}
              <PokeChip name={pokeItem.jaName} imageUrl={pokeItem.imageUrl} />
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

    <!-- 下部メッセージ -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle mb-2">
        <span class="cSpanTextStyle">{message}</span>
      </div>
    </div>
  </div>
</div>
