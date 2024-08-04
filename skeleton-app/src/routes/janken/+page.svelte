<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import getDamageRatio from "$lib/api/getDamageRatio.client";
  import type { PokeData } from "$lib/types/poke";
  import type { Type } from "$lib/types/type";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import TypeRelationsModal from "$lib/components/TypeRelationsModal.svelte";
  import HelpJankenModal from "$lib/components/HelpJankenModal.svelte";
  import { pickRandomNumbers } from "$lib/utils/numerics";

  const modalStore = getModalStore();

  let isLoading = false;
  let pokeIds: number[] = [];
  let ownPokeArray: PokeData[] = [];
  let opoPokeArray: PokeData[] = [];
  const numPokeByPlayer = 3;
  async function fetchPokeDataArray(): Promise<void> {
    isLoading = true;
    phase = "summonning_poke";
    resetState();
    try {
      const numbers = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
      pokeIds = pickRandomNumbers(numbers, numPokeByPlayer * 2);
      const pokeDataArray = await Promise.all(
        pokeIds.slice(0, numPokeByPlayer * 2).map((id) => getPokeData(fetch, id.toString())),
      );
      ownPokeArray = pokeDataArray.slice(0, numPokeByPlayer);
      opoPokeArray = pokeDataArray.slice(numPokeByPlayer, numPokeByPlayer * 2);
    } catch {
      // do nothing
    }
    isLoading = false;
    phase = "select_poke";
  }

  let selectedOwnPokeIndex = -1;
  let selectedOpoPokeIndex = -1;
  const pokeIndexes = Array.from({ length: numPokeByPlayer }, (_, i) => i);

  type Phase = "init" | "summonning_poke" | "select_poke" | "select_type" | "result";
  let phase: Phase = "init";
  let announceMessage: string;
  function updateAnnounceMessage(): void {
    switch (phase) {
      case "init":
        announceMessage = "ポケモン を よびだしてね";
        break;
      case "summonning_poke":
        announceMessage = "ポケモン を よびだしちゅう...";
        break;
      case "select_poke":
        if (!pokeIndexes.includes(selectedOwnPokeIndex)) {
          announceMessage = "ポケモン をえらんでね";
        } else {
          announceMessage = `${ownPokeArray[selectedOwnPokeIndex].jaName} で しょうぶ？`;
        }
        break;
      case "select_type":
        announceMessage = "タイプ をえらんでね";
        break;
      case "result":
        announceMessage = result;
        break;
    }
  }
  $: if (phase || selectedOwnPokeIndex) {
    updateAnnounceMessage();
  }

  function updatePhaseToSelectType(): void {
    phase = "select_type";
    selectedOpoPokeIndex = pickRandomNumbers(pokeIndexes, 1)[0];
  }

  function fetchPokeType(pokeData: PokeData): Type[] {
    const type1 = pokeData.type1;
    const type2 = pokeData.type2;
    return type2 ? [type1, type2] : [type1];
  }

  async function judgeJankenResult(
    ownPokeData: PokeData,
    opoPokeData: PokeData,
    ownPokeType: Type,
    opoPokeType: Type,
  ): Promise<{ result: string; resultMessage: string }> {
    let attackPoke, attackType, defenseType;
    let isOwnAttack: boolean;

    if (ownPokeData.stats.speed >= opoPokeData.stats.speed) {
      isOwnAttack = true;
      attackPoke = ownPokeData;
      attackType = ownPokeType;
      defenseType = opoPokeType;
    } else {
      isOwnAttack = false;
      attackPoke = opoPokeData;
      attackType = opoPokeType;
      defenseType = ownPokeType;
    }

    const damageRatio = await getDamageRatio(fetch, attackType, defenseType);
    let result: string;
    let resultMessage = `${attackPoke.jaName} の こうげき！ ${attackType.jaName} は ${defenseType.jaName} に`;
    switch (damageRatio) {
      case "double":
        result = isOwnAttack ? "あなた の かち！" : "あなた の まけ...";
        resultMessage = `${resultMessage} ばつぐん だ！`;
        break;
      case "half":
        result = isOwnAttack ? "あなた の まけ..." : "あなた の かち！";
        resultMessage = `${resultMessage} いまひとつ...`;
        break;
      case "no":
        result = isOwnAttack ? "あなた の まけ..." : "あなた の かち！";
        resultMessage = `${resultMessage} こうかは なし...`;
        break;
      default:
        result = "あいこ";
        resultMessage = `${resultMessage} まずまず だ`;
        break;
    }
    return { result, resultMessage };
  }

  let selectedOwnType: Type;
  let selectedOpoType: Type;
  let result: string;
  let resultMessage: string;
  async function selectType(type: Type): Promise<void> {
    selectedOwnType = type;
    const opoTypes = fetchPokeType(opoPokeArray[selectedOpoPokeIndex]);
    selectedOpoType = opoTypes.length === 1 ? opoTypes[0] : opoTypes[pickRandomNumbers([0, 1], 1)[0]];

    ({ result, resultMessage } = await judgeJankenResult(
      ownPokeArray[selectedOwnPokeIndex],
      opoPokeArray[selectedOpoPokeIndex],
      selectedOwnType,
      selectedOpoType,
    ));
    phase = "result";
  }

  function resetState(): void {
    selectedOwnPokeIndex = -1;
    selectedOpoPokeIndex = -1;
  }

  function showHelpModal(): void {
    const modalComponent: ModalComponent = {
      ref: HelpJankenModal,
      props: {},
    };
    const modal: ModalSettings = {
      type: "component",
      component: modalComponent,
      backdropClasses: "fixed inset-0 !bg-gray-300/90",
    };
    modalStore.trigger(modal);
  }

  function showTypeRelationsModal(): void {
    const modalComponent: ModalComponent = {
      ref: TypeRelationsModal,
      props: {},
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
    <h1 class="text-2xl font-bold">ポケモンタイプじゃんけん</h1>
  </div>
  <div class="space-y-5 min-w-[300px] max-w-[600px]">
    <div class="ml-4 space-y-4">
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
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:pokeball" class="w-5 h-5" />
            </div>
          </button>
        </form>
        <div class="flex-grow"><!-- spacer --></div>
        <form on:submit|preventDefault={showHelpModal}>
          <button
            type="submit"
            class="px-2 py-1 text-white rounded h-full flex items-center bg-blue-500 hover:bg-blue-600"
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:head-question-outline" class="w-5 h-5" />
            </div>
          </button>
        </form>
        <form on:submit|preventDefault={showTypeRelationsModal}>
          <button
            type="submit"
            class="px-2 py-1 text-white rounded h-full flex items-center bg-blue-500 hover:bg-blue-600"
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:table-question" class="w-5 h-5" />
            </div>
          </button>
        </form>
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <!-- 相手のポケモン -->
    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      あいて
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each opoPokeArray as pokeData, index (pokeData.id)}
          <div class="rounded-2xl border-2 {index == selectedOpoPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <PokeCardCompact {pokeData} />
          </div>
        {/each}
      </div>
    </div>

    <!-- 中央分離帯 -->
    <div>
      {#if phase !== "result"}
        <p class="text-center text-xl">vs</p>
      {:else}
        <p class="text-center text-xl">
          {resultMessage}
        </p>
      {/if}
    </div>

    <!-- 自分のポケモン -->
    <div class="space-y-5 border bg-white rounded-xl min-h-[200px] min-w-[300px]">
      あなた
      <div class="flex flex-wrap justify-between p-4 space-x-2 bg-transparent">
        {#each ownPokeArray as pokeItem, index (pokeItem.id)}
          <div class="rounded-2xl border-2 {index == selectedOwnPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <button
              type="button"
              on:click={() => (selectedOwnPokeIndex = index)}
              on:keydown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  selectedOwnPokeIndex = index;
                }
              }}
            >
              <PokeCardCompact pokeData={pokeItem} />
            </button>
          </div>
        {/each}
      </div>
    </div>

    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">{announceMessage}</span>
        {#if phase == "select_poke" && pokeIndexes.includes(selectedOwnPokeIndex)}
          <!-- ポケモン選択済み、決定前のとき-->
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-white rounded h-full flex items-center"
            on:click={updatePhaseToSelectType}
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:pokeball" class="w-5 h-5" />
            </div>
          </button>
        {:else if phase == "select_type"}
          <!-- ポケモン選択済み、タイプ選択中のとき-->
          {#each fetchPokeType(ownPokeArray[selectedOwnPokeIndex]) as type}
            <button
              class="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-white rounded h-full flex items-center"
              on:click={() => selectType(type)}>{type.jaName}</button
            >
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
