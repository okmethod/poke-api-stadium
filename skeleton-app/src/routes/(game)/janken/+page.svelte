<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { TypeName, TypeData, TypeColors, DamageRatio } from "$lib/types/type";
  import { filterArrayByGeneration } from "$lib/stores/generation";
  import { playAudio } from "$lib/stores/audio";
  import { getRandomNumber } from "$lib/utils/numerics";
  import { pickRandomElementsFromArray } from "$lib/utils/collections";
  import PokeTile from "$lib/components/cards/PokeTile.svelte";
  import TypeRelationsModal from "$lib/components/modals/TypeRelationsModal.svelte";
  import HelpJankenModal from "$lib/components/modals/HelpJankenModal.svelte";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeItems: PokeItem[];
  };

  type Result = "win" | "lose" | "draw";

  // ポケモン抽選
  const pokeCountByPlayer = 3;
  let ownPokeItems: PokeItem[] = [];
  let opoPokeItems: PokeItem[] = [];
  async function pickPokeItems(): Promise<void> {
    resetState();
    const pokeItems = filterArrayByGeneration(data.pokeItems, "pokeId");
    const pickedPokeItems = pickRandomElementsFromArray(pokeItems, pokeCountByPlayer * 2);
    ownPokeItems = pickedPokeItems.slice(0, pokeCountByPlayer);
    opoPokeItems = pickedPokeItems.slice(pokeCountByPlayer, pokeCountByPlayer * 2);
    phase = "select_poke";
  }

  // 勝負ポケモン決定 -> 相手ポケモン抽選
  let selectedOwnPokeIndex = -1;
  let selectedOpoPokeIndex = -1;
  let selectedOwnPokeItem: PokeItem;
  let selectedOpoPokeItem: PokeItem;
  function commitOwnPoke(): void {
    selectedOpoPokeIndex = getRandomNumber(pokeCountByPlayer);
    selectedOwnPokeItem = ownPokeItems[selectedOwnPokeIndex];
    playAudio(selectedOwnPokeItem.oggUrl);

    selectedOpoPokeItem = opoPokeItems[selectedOpoPokeIndex];
    phase = "select_type";
  }

  // 勝負タイプ決定 -> 相手タイプ抽選 -> 攻守/勝敗判定
  let attackPokeName: string;
  let attackType: TypeData & TypeColors;
  let defenseType: TypeData & TypeColors;
  let damageRatio: DamageRatio;
  let result: Result;
  function commitOwnType(selectedOwnPokeType: TypeData & TypeColors): void {
    const selectedOpoPokeType =
      selectedOpoPokeItem.type.length === 1
        ? selectedOpoPokeItem.type[0]
        : selectedOpoPokeItem.type[getRandomNumber(2)];

    let isOwnAttack: boolean;
    ({ isOwnAttack, attackPokeName, attackType, defenseType } = _judgeAttackSide(
      selectedOwnPokeItem,
      selectedOpoPokeItem,
      selectedOwnPokeType,
      selectedOpoPokeType,
    ));
    ({ damageRatio, result } = _judgeJankenResult(isOwnAttack, attackType, defenseType));

    if (result === "win") {
      playAudio(selectedOwnPokeItem.oggUrl);
    } else if (result === "lose") {
      playAudio(selectedOpoPokeItem.oggUrl);
    } else {
      // draw
    }
    phase = "term";

    function _judgeAttackSide(
      ownPokeItem: PokeItem,
      opoPokeItem: PokeItem,
      ownPokeType: TypeData & TypeColors,
      opoPokeType: TypeData & TypeColors,
    ): {
      isOwnAttack: boolean;
      attackPokeName: string;
      attackType: TypeData & TypeColors;
      defenseType: TypeData & TypeColors;
    } {
      const isOwnAttack = ownPokeItem.speed >= opoPokeItem.speed;
      return {
        isOwnAttack,
        attackPokeName: isOwnAttack ? ownPokeItem.jaName : opoPokeItem.jaName,
        attackType: isOwnAttack ? ownPokeType : opoPokeType,
        defenseType: isOwnAttack ? opoPokeType : ownPokeType,
      };
    }

    function _judgeJankenResult(
      isOwnAttack: boolean,
      attackType: TypeData & TypeColors,
      defenseType: TypeData & TypeColors,
    ): {
      damageRatio: DamageRatio;
      result: Result;
    } {
      const damageRatio = _getDamageRatio(attackType, defenseType.enName);
      const resultMap: Record<DamageRatio, Result> = {
        double: isOwnAttack ? "win" : "lose",
        half: isOwnAttack ? "lose" : "win",
        no: isOwnAttack ? "lose" : "win",
        default: "draw",
      };
      return {
        damageRatio,
        result: resultMap[damageRatio],
      };
    }

    function _getDamageRatio(attackType: TypeData, defenseTypeName: TypeName): DamageRatio {
      const { doubleDamageTo, halfDamageTo, noDamageTo } = attackType.damageRelations;
      const damageRelations = {
        double: doubleDamageTo,
        half: halfDamageTo,
        no: noDamageTo,
      };
      for (const [ratio, types] of Object.entries(damageRelations)) {
        if (types.includes(defenseTypeName)) {
          return ratio as DamageRatio;
        }
      }
      return "default";
    }
  }

  // フェーズ進行とメッセージ更新
  type Phase = "init" | "select_poke" | "select_type" | "term";
  let phase: Phase = "init";
  let guideMessage: string;
  let damageRatioMessage: string;
  function updateGuideMessage(): void {
    const resultMessageMap: Record<Result, string> = {
      win: "あなた の かち！",
      lose: "あなた の まけ...",
      draw: "あいこ",
    };
    const guideMessageMap: Record<Phase, string> = {
      init: "ポケモン を よびだしてね",
      select_poke:
        selectedOwnPokeIndex == -1
          ? "ポケモン をえらんでね"
          : `${ownPokeItems[selectedOwnPokeIndex].jaName} で しょうぶ する？`,
      select_type: "タイプ をえらんでね",
      term: resultMessageMap[result],
    };
    guideMessage = guideMessageMap[phase];

    const damageRatioMessageMap: Record<DamageRatio, string> = {
      double: "ばつぐん だ！",
      half: "いまひとつ...",
      no: "こうかは なし...",
      default: "まずまず だ",
    };
    damageRatioMessage = damageRatioMessageMap[damageRatio];
  }
  $: if (phase || selectedOwnPokeIndex) {
    updateGuideMessage();
  }

  // 状態リセット
  function resetState(): void {
    ownPokeItems = [];
    opoPokeItems = [];
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
  const cPokeFieldStyle = "min-h-[180px] sm:min-h-[220px] min-w-[300px] md:min-w-[600px] border bg-white rounded-xl";
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
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">ポケモン を よびだす</span>
        <form on:submit|preventDefault={pickPokeItems}>
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
        {#each opoPokeItems as pokeItem, index}
          <div class="rounded-2xl border-2 {index == selectedOpoPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <PokeTile
              pokeId={pokeItem.pokeId}
              name={pokeItem.jaName}
              type1Name={pokeItem.type[0].enName}
              type2Name={pokeItem.type.length > 1 ? pokeItem.type[1].enName : null}
              imageUrl={pokeItem.imageUrl}
            />
          </div>
        {/each}
      </div>
    </div>

    <!-- 中央分離帯 -->
    <div>
      <p class="text-center cSpanTextStyle">
        {#if phase !== "term"}
          <span class="block">VS</span>
        {:else}
          <span class="block sm:inline">{attackPokeName} の こうげき！</span>
          <span class="block sm:inline">
            <span class="inline">
              <span
                style="
                  background-color: {attackType.themeColor};
                  color: {attackType.textColor};
                "
                class={cTypeChipStyle}
              >
                {attackType.jaName}
              </span>
              は
              <span
                style="
                  background-color: {defenseType.themeColor};
                  color: {defenseType.textColor};
                "
                class={cTypeChipStyle}
              >
                {defenseType.jaName}
              </span>
              に {damageRatioMessage}
            </span></span
          >
        {/if}
      </p>
    </div>

    <!-- 自分のポケモン -->
    <div class={cPokeFieldStyle}>
      <span class="block mt-1 ml-2">あなた</span>
      <div class={cPokeArrayStyle}>
        {#each ownPokeItems as pokeItem, index}
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
                pokeId={pokeItem.pokeId}
                name={pokeItem.jaName}
                type1Name={pokeItem.type[0].enName}
                type2Name={pokeItem.type.length > 1 ? pokeItem.type[1].enName : null}
                imageUrl={pokeItem.imageUrl}
              />
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- メッセージ -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">{guideMessage}</span>
        {#if phase == "select_poke" && selectedOwnPokeIndex !== -1}
          <!-- ポケモン選択済み、決定前のとき-->
          <button type="button" class="cIconButtonStyle" on:click={commitOwnPoke}>
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        {:else if phase == "select_type"}
          <!-- ポケモン選択済み、タイプ選択中のとき-->
          {#each selectedOwnPokeItem.type as type}
            <button
              style="
                background-color: {type.themeColor};
                color: {type.textColor};
              "
              class="{cTypeChipStyle} flex items-center hover:brightness-85"
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
