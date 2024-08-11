<script lang="ts">
  import { onMount } from "svelte";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/poke";
  import type { TypeName, TypeData, DamageRatio } from "$lib/types/type";
  import PokeTile from "$lib/components/cards/PokeTile.svelte";
  import TypeRelationsModal from "$lib/components/modals/TypeRelationsModal.svelte";
  import HelpJankenModal from "$lib/components/modals/HelpJankenModal.svelte";
  import getDamageRatio from "$lib/utils/getDamageRatio";
  import { getRandomNumber, pickRandomNumbers } from "$lib/utils/numerics";
  import { LATEST_POKE_ID } from "$lib/constants/common";
  import { TYPE_COLOR_DICT } from "$lib/constants/staticTypeData";

  interface PokeItem {
    jaName: string;
    imageUrl: string;
    type1Name: TypeName;
    type2Name: TypeName | null;
    speed: number;
  }

  // staticデータロード
  let POKE_DICT: Record<number, PokeItem>;
  let TYPE_DICT: Record<TypeName, TypeData>;
  onMount(async () => {
    // 利用スコープを局所化してガベージコレクションされるようにする
    const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");
    POKE_DICT = _initPokeDict(STATIC_POKE_DICT);
    function _initPokeDict(staticPokeDict: Record<number, StaticPokeData>): Record<number, PokeItem> {
      const pokeDict: Record<number, PokeItem> = {};
      Object.entries(staticPokeDict).forEach(([pokeId, staticPokeData]) => {
        pokeDict[Number(pokeId)] = {
          jaName: staticPokeData.jaName,
          imageUrl: staticPokeData.imageUrl ?? "not_found",
          type1Name: staticPokeData.type1Name as TypeName,
          type2Name: staticPokeData.type2Name ? (staticPokeData.type2Name as TypeName) : null,
          speed: staticPokeData.stats.speed,
        };
      });
      return pokeDict;
    }

    const { STATIC_TYPE_DICT } = await import("$lib/constants/staticTypeData");
    TYPE_DICT = STATIC_TYPE_DICT as Record<TypeName, TypeData>;
  });

  // ゲームデータ管理
  let ownPokeIds: number[] = [];
  let opoPokeIds: number[] = [];
  const pokeCountByPlayer = 3;
  function pickPokeIds(): void {
    resetState();
    const pokeIndexes = Array.from({ length: LATEST_POKE_ID }, (_, i) => i + 1);
    const pickedPokeIds = pickRandomNumbers(pokeIndexes, pokeCountByPlayer * 2);
    ownPokeIds = pickedPokeIds.slice(0, pokeCountByPlayer);
    opoPokeIds = pickedPokeIds.slice(pokeCountByPlayer, pokeCountByPlayer * 2);
    phase = "select_poke";
  }

  let selectedOwnPokeIndex = -1;
  let selectedOpoPokeIndex = -1;
  function commitOwnPoke(): void {
    phase = "select_type";
    selectedOpoPokeIndex = getRandomNumber(pokeCountByPlayer);
  }

  function fetchPokeTypeNameArray(pokeId: number): TypeName[] {
    const pokeItem = POKE_DICT[pokeId];
    return pokeItem.type2Name ? [pokeItem.type1Name, pokeItem.type2Name] : [pokeItem.type1Name];
  }

  // じゃんけんルール管理とメッセージ更新
  let attackPokeName: string;
  let attackTypeName: TypeName;
  let defenseTypeName: TypeName;
  let efficacyMessage: string;
  let resultMessage: string;
  function commitOwnType(selectedOwnPokeTypeName: TypeName): void {
    const selectedOpoPokeId = opoPokeIds[selectedOpoPokeIndex];
    const opoTypeNameArray = fetchPokeTypeNameArray(selectedOpoPokeId);
    const selectedOpoPokeTypeName =
      opoTypeNameArray.length === 1 ? opoTypeNameArray[0] : opoTypeNameArray[getRandomNumber(2)];

    let isOwnAttack: boolean;
    ({ isOwnAttack, attackPokeName, attackTypeName, defenseTypeName } = _judgeAttackSide(
      ownPokeIds[selectedOwnPokeIndex],
      selectedOpoPokeId,
      selectedOwnPokeTypeName,
      selectedOpoPokeTypeName,
    ));
    ({ efficacyMessage, resultMessage } = _judgeJankenResult(isOwnAttack, attackTypeName, defenseTypeName));
    phase = "term";

    function _judgeAttackSide(
      ownPokeId: number,
      opoPokeId: number,
      ownPokeTypeName: TypeName,
      opoPokeTypeName: TypeName,
    ): {
      isOwnAttack: boolean;
      attackPokeName: string;
      attackTypeName: TypeName;
      defenseTypeName: TypeName;
    } {
      const isOwnAttack = POKE_DICT[ownPokeId].speed >= POKE_DICT[opoPokeId].speed;
      return {
        isOwnAttack,
        attackPokeName: isOwnAttack ? POKE_DICT[ownPokeId].jaName : POKE_DICT[opoPokeId].jaName,
        attackTypeName: isOwnAttack ? ownPokeTypeName : opoPokeTypeName,
        defenseTypeName: isOwnAttack ? opoPokeTypeName : ownPokeTypeName,
      };
    }

    function _judgeJankenResult(isOwnAttack: boolean, attackTypeName: TypeName, defenseTypeName: TypeName) {
      const resultMap: Record<DamageRatio, { efficacyMessage: string; resultMessage: string }> = {
        double: {
          efficacyMessage: "ばつぐん だ！",
          resultMessage: isOwnAttack ? "あなた の かち！" : "あなた の まけ...",
        },
        half: {
          efficacyMessage: "いまひとつ...",
          resultMessage: isOwnAttack ? "あなた の まけ..." : "あなた の かち！",
        },
        no: {
          efficacyMessage: "こうかは なし...",
          resultMessage: isOwnAttack ? "あなた の まけ..." : "あなた の かち！",
        },
        default: { efficacyMessage: "まずまず だ", resultMessage: "あいこ" },
      };
      const damageRatio = getDamageRatio(attackTypeName, defenseTypeName);
      return resultMap[damageRatio] || resultMap.default;
    }
  }

  // フェーズ進行とメッセージ更新
  type Phase = "init" | "select_poke" | "select_type" | "term";
  let phase: Phase = "init";
  let guideMessage: string;
  function updateGuideMessage(): void {
    const messages: Record<Phase, string> = {
      init: "ポケモン を よびだしてね",
      select_poke:
        selectedOwnPokeIndex == -1
          ? "ポケモン をえらんでね"
          : `${POKE_DICT[ownPokeIds[selectedOwnPokeIndex]].jaName} で しょうぶ する？`,
      select_type: "タイプ をえらんでね",
      term: resultMessage,
    };
    guideMessage = messages[phase];
  }
  $: if (phase || selectedOwnPokeIndex) {
    updateGuideMessage();
  }

  // 状態リセット
  function resetState(): void {
    ownPokeIds = [];
    opoPokeIds = [];
    selectedOwnPokeIndex = -1;
    selectedOpoPokeIndex = -1;
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

  function showHelpModal(): void {
    const modalComponent: ModalComponent = {
      ref: HelpJankenModal,
      props: {},
    };
    const m = modalSettings(modalComponent);
    modalStore.trigger(m);
  }

  function showTypeRelationsModal(): void {
    const modalComponent: ModalComponent = {
      ref: TypeRelationsModal,
      props: {},
    };
    const m = modalSettings(modalComponent);
    modalStore.trigger(m);
  }

  // スタイル
  const cPokeFieldStyle = "min-h-[220px] min-w-[300px] border bg-white rounded-xl";
  const cPokeArrayStyle = "flex flex-wrap justify-between gap-y-1 p-4";
  const cTypeChipStyle = "px-2 py-1 rounded h-full";
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
        <form on:submit|preventDefault={pickPokeIds}>
          <button type="submit" class="cIconButtonStyle">
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
        {#each opoPokeIds as pokeId, index}
          <div class="rounded-2xl border-2 {index == selectedOpoPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <PokeTile
              name={POKE_DICT[pokeId].jaName}
              type1Name={POKE_DICT[pokeId].type1Name}
              type2Name={POKE_DICT[pokeId].type2Name}
              imageUrl={POKE_DICT[pokeId].imageUrl}
            />
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
          <span class="block sm:inline">{attackPokeName} の こうげき！</span>
          <span class="block sm:inline">
            <span class="inline">
              <span
                style="
                  background-color: {TYPE_COLOR_DICT[attackTypeName].themeColor};
                  color: {TYPE_COLOR_DICT[attackTypeName].textColor};
                "
                class={cTypeChipStyle}
              >
                {TYPE_DICT[attackTypeName].jaName}
              </span>
              は
              <span
                style="
                  background-color: {TYPE_COLOR_DICT[defenseTypeName].themeColor};
                  color: {TYPE_COLOR_DICT[defenseTypeName].textColor};
                "
                class={cTypeChipStyle}
              >
                {TYPE_DICT[defenseTypeName].jaName}
              </span>
              に {efficacyMessage}
            </span></span
          >
        {/if}
      </p>
    </div>

    <!-- 自分のポケモン -->
    <div class={cPokeFieldStyle}>
      <span class="block mt-1 ml-2">あなた</span>
      <div class={cPokeArrayStyle}>
        {#each ownPokeIds as pokeId, index}
          <div class="rounded-2xl border-2 {index == selectedOwnPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <button
              type="button"
              disabled={phase !== "select_poke"}
              on:click={() => (selectedOwnPokeIndex = index)}
              on:keydown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  selectedOwnPokeIndex = index;
                }
              }}
            >
              <PokeTile
                name={POKE_DICT[pokeId].jaName}
                type1Name={POKE_DICT[pokeId].type1Name}
                type2Name={POKE_DICT[pokeId].type2Name}
                imageUrl={POKE_DICT[pokeId].imageUrl}
              />
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- メッセージ -->
    <div class="ml-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">{guideMessage}</span>
        {#if phase == "select_poke" && selectedOwnPokeIndex !== -1}
          <!-- ポケモン選択済み、決定前のとき-->
          <button type="button" class="cIconButtonStyle" on:click={commitOwnPoke}>
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        {:else if phase == "select_type"}
          <!-- ポケモン選択済み、タイプ選択中のとき-->
          {#each fetchPokeTypeNameArray(ownPokeIds[selectedOwnPokeIndex]) as typeName}
            <button
              style="
                background-color: {TYPE_COLOR_DICT[typeName].themeColor};
                color: {TYPE_COLOR_DICT[typeName].textColor};
              "
              class="{cTypeChipStyle} flex items-center hover:brightness-85"
              on:click={() => commitOwnType(typeName)}
            >
              {TYPE_DICT[typeName].jaName}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
