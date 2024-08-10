<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import getDamageRatio from "$lib/api/getDamageRatio.client";
  import type { PokeData } from "$lib/types/poke";
  import type { Type, DamageRatio } from "$lib/types/type";
  import PokeTile from "$lib/components/cards/PokeTile.svelte";
  import TypeRelationsModal from "$lib/components/modals/TypeRelationsModal.svelte";
  import HelpJankenModal from "$lib/components/modals/HelpJankenModal.svelte";
  import { pickRandomNumbers } from "$lib/utils/numerics";
  import { LATEST_POKEMON_ID } from "$lib/constants/poke";
  import { TYPE_DICT } from "$lib/constants/type";

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
  let attackMessage: string;
  let compatibilityMessage: string;
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

    ({ attackMessage, compatibilityMessage, resultMessage } = await judgeJankenResult(
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
  ): Promise<{ attackMessage: string; compatibilityMessage: string; resultMessage: string }> {
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
    const attackMessage = `${attackPoke.jaName} の こうげき！`;
    const compatibilityMessage = `${attackType.jaName} は ${defenseType.jaName} に ${efficacyMessage}`;
    return { attackMessage, compatibilityMessage, resultMessage };
  }

  function resetState(): void {
    ownPokeArray = [];
    opoPokeArray = [];
    selectedOwnPokeIndex = -1;
    selectedOpoPokeIndex = -1;
  }

  const modalStore = getModalStore();

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

  const cPokeFieldStyle = "min-h-[220px] min-w-[300px] border bg-white rounded-xl";
  const cPokeArrayStyle = "flex flex-wrap justify-between gap-y-1 p-4";
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンタイプじゃんけん</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !min-w-[300px] !max-w-[600px]">
    <!-- 入力フォーム -->
    <div class="ml-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を よびだす</span>
        <form on:submit|preventDefault={fetchPokeDataArray}>
          <button type="submit" disabled={isLoading} class="cIconButtonStyle {isLoading ? '!bg-gray-500' : ''}">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
        <div class="flex-grow"><!-- spacer --></div>
        <form on:submit|preventDefault={showHelpModal}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:head-question-outline" class="cIconStyle" />
            </div>
          </button>
        </form>
        <form on:submit|preventDefault={showTypeRelationsModal}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:table-question" class="cIconStyle" />
            </div>
          </button>
        </form>
        <div class="mr-4"><!-- spacer --></div>
      </div>
    </div>

    <!-- 相手のポケモン -->
    <div class={cPokeFieldStyle}>
      <span class="block mt-1 ml-2">あいて</span>
      <div class={cPokeArrayStyle}>
        {#each opoPokeArray as pokeData, index (pokeData.id)}
          <div class="rounded-2xl border-2 {index == selectedOpoPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <PokeTile {pokeData} />
          </div>
        {/each}
      </div>
    </div>

    <!-- 中央分離帯 -->
    <div>
      <p class="text-center text-lg">
        {#if phase !== "term"}
          <span class="block">VS</span>
        {:else}
          <span class="block sm:inline">{attackMessage}</span>
          <span class="block sm:inline">{compatibilityMessage}</span>
        {/if}
      </p>
    </div>

    <!-- 自分のポケモン -->
    <div class={cPokeFieldStyle}>
      <span class="block mt-1 ml-2">あなた</span>
      <div class={cPokeArrayStyle}>
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
              <PokeTile pokeData={pokeItem} />
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- メッセージ -->
    <div class="ml-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">{guideMessage}</span>
        {#if phase == "select_poke" && pokeIndexes.includes(selectedOwnPokeIndex)}
          <!-- ポケモン選択済み、決定前のとき-->
          <button type="button" class="cIconButtonStyle" on:click={commitOwnPoke}>
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        {:else if phase == "select_type"}
          <!-- ポケモン選択済み、タイプ選択中のとき-->
          {#each fetchPokeType(ownPokeArray[selectedOwnPokeIndex]) as type}
            <button
              style="background-color: {TYPE_DICT[type.enName]?.color || 'blue'};"
              class="px-2 py-1 hover:brightness-85 text-white rounded h-full flex items-center"
              on:click={() => commitOwnType(type)}
            >
              {type.jaName}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
