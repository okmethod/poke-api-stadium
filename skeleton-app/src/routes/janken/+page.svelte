<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import getPokeData from "$lib/api/getPokeData.client";
  import { getType } from "$lib/api/getType.client";
  import type { PokeData } from "$lib/types/poke";
  import { LATEST_POKEMON_ID } from "$lib/types/poke";
  import PokeCardCompact from "$lib/components/PokeCardCompact.svelte";
  import TypeRelationsModal from "$lib/components/TypeRelationsModal.svelte";
  import HelpJankenModal from "$lib/components/HelpJankenModal.svelte";
  import { pickRandomNumbers } from "$lib/utils/numerics";

  const modalStore = getModalStore();

  interface TypeRelation {
    winTo: string[];
    loseTo: string[];
  }

  interface PokeItem {
    id: number;
    data: PokeData;
    type1Relation: TypeRelation;
    type2Relation: TypeRelation | null;
  }

  async function getWinToTypes(typeId: number): Promise<string[]> {
    const typeData = await getType(fetch, typeId.toString());
    if (!typeData) {
      return [];
    }
    const doubleDamageTo = typeData.damage_relations.double_damage_to.map((type) => type.name);
    return doubleDamageTo;
  }

  async function getLoseToTypes(typeId: number): Promise<string[]> {
    const typeData = await getType(fetch, typeId.toString());
    if (!typeData) {
      return [];
    }
    const halfDamageTo = typeData.damage_relations.half_damage_to.map((type) => type.name);
    const noDamageTo = typeData.damage_relations.no_damage_to.map((type) => type.name);
    return [...halfDamageTo, ...noDamageTo];
  }

  async function createPokePromises(pokeDataArray: PokeData[], from: number, to: number) {
    const promises = pokeDataArray.slice(from, to).map(async (pokeData, index) => ({
      id: index,
      data: pokeData,
      type1Relation: {
        winTo: await getWinToTypes(pokeData.type1.id),
        loseTo: await getLoseToTypes(pokeData.type1.id),
      },
      type2Relation:
        pokeData.type2 !== null
          ? {
              winTo: await getWinToTypes(pokeData.type2.id),
              loseTo: await getLoseToTypes(pokeData.type2.id),
            }
          : null,
    }));
    return Promise.all(promises);
  }

  let isLoading = false;
  let pokeIds: number[] = [];
  let ownPokeArray: PokeItem[] = [];
  let opoPokeArray: PokeItem[] = [];
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
      ownPokeArray = await createPokePromises(pokeDataArray, 0, numPokeByPlayer);
      opoPokeArray = await createPokePromises(pokeDataArray, numPokeByPlayer, numPokeByPlayer * 2);
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

  let message: string;
  function updateMessage(): void {
    switch (phase) {
      case "init":
        message = "ポケモン を よびだしてね";
        break;
      case "summonning_poke":
        message = "ポケモン を よびだしちゅう...";
        break;
      case "select_poke":
        if (!pokeIndexes.includes(selectedOwnPokeIndex)) {
          message = "ポケモン をえらんでね";
        } else {
          message = `${ownPokeArray[selectedOwnPokeIndex].data.jaName} で しょうぶ？`;
        }
        break;
      case "select_type":
        message = "タイプ をえらんでね";
        break;
      case "result":
        message = "じゃんけん しよう！";
        break;
    }
  }

  $: if (phase || selectedOwnPokeIndex) {
    updateMessage();
  }

  function updatePhaseToSelectType(): void {
    phase = "select_type";
    selectedOpoPokeIndex = pickRandomNumbers(pokeIndexes, 1)[0];
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
        {#each opoPokeArray as pokeItem, index (pokeItem.id)}
          <div class="rounded-2xl border-2 {index == selectedOpoPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <PokeCardCompact pokeData={pokeItem.data} />
          </div>
        {/each}
      </div>
    </div>

    <p class="text-center text-xl">vs</p>

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
              <PokeCardCompact pokeData={pokeItem.data} />
            </button>
          </div>
        {/each}
      </div>
    </div>

    <div class="ml-4 space-y-4">
      <div class="flex items-center space-x-3">
        <span class="text-lg">{message}</span>
        <!-- ポケモン選択済みのとき-->
        {#if phase == "select_poke" && pokeIndexes.includes(selectedOwnPokeIndex)}
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-600 px-2 py-1 text-white rounded h-full flex items-center"
            on:click={updatePhaseToSelectType}
          >
            <div class="w-5 h-5 flex-shrink-0">
              <Icon icon="mdi:pokeball" class="w-5 h-5" />
            </div>
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>
