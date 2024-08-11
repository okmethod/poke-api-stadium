<script lang="ts">
  import { onMount } from "svelte";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/poke";
  import PokeChip from "$lib/components/cards/PokeChip.svelte";
  import PokeListModal from "$lib/components/modals/PokeListModal.svelte";
  import { getRandomNumber, pickRandomNumbers, shuffleArray } from "$lib/utils/numerics";

  interface PokeItem {
    jaName: string;
    imageUrl: string;
    isUsed: boolean; // しりとり進行中に更新されるフラグ
  }

  // staticデータロード
  let pokeDict: Record<number, PokeItem>; // 進行中にデータ更新される
  let GROUPBY_HEADCHAR_POKEID_DICT: Record<string, number[]>; // key: headChar, value: pokeIds
  onMount(async () => {
    // 利用スコープを局所化してガベージコレクションされるようにする
    const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");

    pokeDict = _initPokeDict(STATIC_POKE_DICT);
    function _initPokeDict(staticPokeDict: Record<number, StaticPokeData>): Record<number, PokeItem> {
      const pokeDict: Record<number, PokeItem> = {};
      Object.entries(staticPokeDict).forEach(([pokeId, staticPokeData]) => {
        pokeDict[Number(pokeId)] = {
          jaName: staticPokeData.jaName,
          imageUrl: staticPokeData.imageUrl,
          isUsed: false,
        };
      });
      return pokeDict;
    }

    GROUPBY_HEADCHAR_POKEID_DICT = _groupByHeadChar(STATIC_POKE_DICT);
    function _groupByHeadChar(staticPokeDict: { [pokeId: number]: StaticPokeData }): Record<string, number[]> {
      return Object.entries(staticPokeDict).reduce(
        (acc, [pokeId, staticPokeData]) => {
          const firstChar = getHeadChar(staticPokeData.jaName);
          if (!acc[firstChar]) {
            acc[firstChar] = [];
          }
          acc[firstChar].push(Number(pokeId));
          return acc;
        },
        {} as Record<string, number[]>,
      );
    }
  });

  // ゲームデータ管理（しりとりに並んだポケモン）
  let pushedPokeIds: number[] = [];
  function setFirstPokeData(): void {
    const unusedIds = getUnusedIds(pokeDict);
    const candidatedPokeId = pickRandomNumbers(unusedIds, pokeCount)[0];
    pokeDict[candidatedPokeId].isUsed = true;
    pushedPokeIds = [...pushedPokeIds, candidatedPokeId];
  }

  function getUnusedIds(pokeDict: Record<number, PokeItem>): number[] {
    return Object.entries(pokeDict)
      .filter(([, item]) => !item.isUsed)
      .map(([key]) => Number(key));
  }

  // ゲームデータ管理（候補ポケモン）
  const pokeCount = 12;
  const possiblePokeCount = 4;
  let candidatedPokeIds: number[] = [];
  function candidatePokeIds(): void {
    const tailChar = getTailChar(getTailPokeName());
    const possiblePokeIds = GROUPBY_HEADCHAR_POKEID_DICT[tailChar] ?? [];
    const unusedIds = getUnusedIds(pokeDict);

    // 次に選択可能なポケモンから possiblePokeCount の数だけ抽出する（不足する場合がある＆数が少ないのでシャッフル方式）
    const possibleUnusedIds = possiblePokeIds.filter((pokeId) => unusedIds.includes(pokeId));
    const slicedPossiblePokeIds = shuffleArray(possibleUnusedIds).slice(0, possiblePokeCount);

    // 次に選択可能でないポケモンから pokeCount の数だけ抽出する
    const slicedPossiblePokeIdsSet = new Set(slicedPossiblePokeIds);
    const additionalPokeIds = pickRandomNumbers(
      unusedIds.filter((pokeId) => !slicedPossiblePokeIdsSet.has(pokeId)),
      pokeCount,
    );

    // 候補ポケモンから pokeCount の数だけ抽出する（数が少ないのでシャッフル方式）
    candidatedPokeIds = shuffleArray([...slicedPossiblePokeIds, ...additionalPokeIds]).slice(0, pokeCount);
  }

  // しりとりルール管理
  function challengeShiritori(nextPokeId: number) {
    const tailPokeName = getTailPokeName();
    const nextPokeName = pokeDict[nextPokeId].jaName;
    if (!_judgeShiritoriRule(tailPokeName, nextPokeName)) {
      message = `「${getTailChar(tailPokeName ?? "")}」 から はじまる ポケモン を えらんでね`;
      return;
    }
    pokeDict[nextPokeId].isUsed = true;
    pushedPokeIds = [...pushedPokeIds, nextPokeId];

    function _judgeShiritoriRule(tailPokeName: string, nextPokeName: string): boolean {
      const tailChar = getTailChar(tailPokeName);
      const nextChar = getHeadChar(nextPokeName);
      return tailChar === nextChar;
    }
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
    const ignoreChars = ["ー", "♀", "♂", "２", "Ｚ"];
    if (ignoreChars.includes(tailChar) && name.length > 1) {
      tailChar = name.slice(-2, -1);
    }
    return normalizeChar(tailChar);
  }

  function getTailPokeName(): string {
    const tailPokeId = pushedPokeIds.slice(-1)[0] ?? null;
    if (tailPokeId === null) {
      // 発生しないはずだが、念のため
      setFirstPokeData();
      candidatePokeIds();
      return "";
    }
    return pokeDict[tailPokeId].jaName;
  }

  // メッセージ更新
  let message: string;
  function updateMessage(): void {
    const tailPokeId = pushedPokeIds.slice(-1)[0] ?? null;
    if (tailPokeId === null) {
      message = "ポケモン を よびだしてね";
      return;
    }
    const tailPokeName = pokeDict[tailPokeId].jaName;
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

  // 状態リセット
  function resetState(): void {
    pokeDict = _resetPokeDictUsedFlag(pokeDict);
    pushedPokeIds = [];
    setFirstPokeData();
    candidatePokeIds();
    updateMessage();

    function _resetPokeDictUsedFlag(pokeDict: Record<number, PokeItem>): Record<number, PokeItem> {
      return Object.fromEntries(Object.entries(pokeDict).map(([key, item]) => [key, { ...item, isUsed: false }]));
    }
  }

  // モーダル表示
  const modalStore = getModalStore();
  function showPokeListModal(): void {
    const modalComponent: ModalComponent = {
      ref: PokeListModal,
      props: {
        title: "しりとりリスト",
        stringArray: pushedPokeIds.map((pokeId) => pokeDict[pokeId].jaName),
      },
    };
    const modal: ModalSettings = {
      type: "component",
      component: modalComponent,
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
    modalStore.trigger(modal);
  }

  // スタイル
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
            {#if !pokeDict[pokeId].isUsed}
              <button type="button" on:click={() => challengeShiritori(pokeId)}>
                <PokeChip name={pokeDict[pokeId].jaName} imageUrl={pokeDict[pokeId].imageUrl} />
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
        <form on:submit|preventDefault={candidatePokeIds}>
          <button
            type="submit"
            disabled={pushedPokeIds.length == 0}
            class="cIconButtonStyle {pushedPokeIds.length == 0 ? '!bg-gray-500' : ''}"
          >
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
        {#each pushedPokeIds.length >= 2 ? pushedPokeIds.slice(-2) : [...Array(2 - pushedPokeIds.length).fill(null), ...pushedPokeIds] as pokeId, index}
          <div class="rounded-2xl border-2">
            {#if pokeId}
              <PokeChip name={pokeDict[pokeId].jaName} imageUrl={pokeDict[pokeId].imageUrl} />
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
