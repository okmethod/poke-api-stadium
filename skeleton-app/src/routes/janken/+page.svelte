<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import getDamageRatio from "$lib/api/getDamageRatio.client";
  import type { PokeData } from "$lib/types/poke";
  import type { Type, DamageRatio } from "$lib/types/type";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import { TYPE_DICT } from "$lib/types/type";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import TypeRelationsModal from "$lib/components/TypeRelationsModal.svelte";
  import HelpJankenModal from "$lib/components/HelpJankenModal.svelte";
  import { pickRandomNumbers } from "$lib/utils/numerics";

  const modalStore = getModalStore();

  const numPokeByPlayer = 3;
  const pokeIndexes = Array.from({ length: numPokeByPlayer }, (_, i) => i);

  let isLoading = false;
  let ownPokeArray: PokeData[] = [];
  let opoPokeArray: PokeData[] = [];
  async function fetchPokeDataArray(): Promise<void> {
    isLoading = true;
    phase = "summonning_poke";
    resetState();
    try {
      const numbers = Array.from({ length: LATEST_POKEMON_ID }, (_, i) => i + 1);
      const pokeIds = pickRandomNumbers(numbers, numPokeByPlayer * 2);
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

  type Phase = "init" | "summonning_poke" | "select_poke" | "select_type" | "term";
  let phase: Phase = "init";
  let selectedOwnPokeIndex = -1;
  let selectedOpoPokeIndex = -1;
  let selectedOwnType: Type;
  let selectedOpoType: Type;
  let guideMessage: string;
  let battleMessage: string;
  let resultMessage: string;
  function updateGuideMessage(): void {
    const messages: Record<Phase, string> = {
      init: "ポケモン を よびだしてね",
      summonning_poke: "ポケモン を よびだしちゅう...",
      select_poke: !pokeIndexes.includes(selectedOwnPokeIndex)
        ? "ポケモン をえらんでね"
        : `${ownPokeArray[selectedOwnPokeIndex].jaName} で しょうぶ する？`,
      select_type: "タイプ をえらんでね",
      term: resultMessage,
    };
    guideMessage = messages[phase];
  }
  $: if (phase || selectedOwnPokeIndex) {
    updateGuideMessage();
  }

  function commitOwnPoke(): void {
    phase = "select_type";
    selectedOpoPokeIndex = pickRandomNumbers(pokeIndexes, 1)[0];
  }

  async function commitOwnType(type: Type): Promise<void> {
    selectedOwnType = type;
    const opoTypes = fetchPokeType(opoPokeArray[selectedOpoPokeIndex]);
    selectedOpoType = opoTypes.length === 1 ? opoTypes[0] : opoTypes[pickRandomNumbers([0, 1], 1)[0]];

    ({ battleMessage, resultMessage } = await judgeJankenResult(
      ownPokeArray[selectedOwnPokeIndex],
      opoPokeArray[selectedOpoPokeIndex],
      selectedOwnType,
      selectedOpoType,
    ));
    phase = "term";
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
  ): Promise<{ resultMessage: string; battleMessage: string }> {
    const isOwnAttack = ownPokeData.stats.speed >= opoPokeData.stats.speed;
    const attackPoke = isOwnAttack ? ownPokeData : opoPokeData;
    const attackType = isOwnAttack ? ownPokeType : opoPokeType;
    const defenseType = isOwnAttack ? opoPokeType : ownPokeType;

    const resultMap: Record<DamageRatio, { efficacyMessage: string; resultMessage: string }> = {
      double: {
        efficacyMessage: "ばつぐん だ！",
        resultMessage: isOwnAttack ? "あなた の かち！" : "あなた の まけ...",
      },
      half: { efficacyMessage: "いまひとつ...", resultMessage: isOwnAttack ? "あなた の まけ..." : "あなた の かち！" },
      no: {
        efficacyMessage: "こうかは なし...",
        resultMessage: isOwnAttack ? "あなた の まけ..." : "あなた の かち！",
      },
      default: { efficacyMessage: "まずまず だ", resultMessage: "あいこ" },
    };
    const damageRatio = await getDamageRatio(fetch, attackType, defenseType);
    const { efficacyMessage, resultMessage } = resultMap[damageRatio] || resultMap.default;
    const battleMessage = `${attackPoke.jaName} の こうげき！ ${attackType.jaName} は ${defenseType.jaName} に ${efficacyMessage}`;
    return { battleMessage, resultMessage };
  }

  function resetState(): void {
    ownPokeArray = [];
    opoPokeArray = [];
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
      {#if phase !== "term"}
        <p class="text-center text-xl">vs</p>
      {:else}
        <p class="text-center text-xl">
          {battleMessage}
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
        <span class="text-lg">{guideMessage}</span>
        {#if phase == "select_poke" && pokeIndexes.includes(selectedOwnPokeIndex)}
          <!-- ポケモン選択済み、決定前のとき-->
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-white rounded h-full flex items-center"
            on:click={commitOwnPoke}
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:pokeball" class="w-5 h-5" />
            </div>
          </button>
        {:else if phase == "select_type"}
          <!-- ポケモン選択済み、タイプ選択中のとき-->
          {#each fetchPokeType(ownPokeArray[selectedOwnPokeIndex]) as type}
            <button
              style="background-color: {TYPE_DICT[type.enName]?.color || 'blue'};"
              class="px-2 py-1 hover:brightness-85 text-white rounded h-full flex items-center"
              on:click={() => commitOwnType(type)}>{type.jaName}</button
            >
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
