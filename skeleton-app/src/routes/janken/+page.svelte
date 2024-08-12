<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import type { ModalSettings, ModalComponent } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/poke";
  import type { TypeName, DamageRatio } from "$lib/types/type";
  import PokeTile from "$lib/components/cards/PokeTile.svelte";
  import TypeRelationsModal from "$lib/components/modals/TypeRelationsModal.svelte";
  import HelpJankenModal from "$lib/components/modals/HelpJankenModal.svelte";
  import { fetch as fetchTypeData } from "$lib/constants/staticTypeData";
  import getDamageRatio from "$lib/utils/getDamageRatio";
  import { getRandomNumber, pickRandomElementsFromArray } from "$lib/utils/numerics";

  interface PokeItem {
    pokeId: number;
    jaName: string;
    imageUrl: string;
    type1Name: TypeName;
    type2Name: TypeName | null;
    speed: number;
  }

  // ゲームデータ管理
  let ownPokeItems: PokeItem[] = [];
  let opoPokeItems: PokeItem[] = [];
  const pokeCountByPlayer = 3;
  async function pickPokeIds(): Promise<void> {
    resetState();
    const staticPokeData = await import("$lib/constants/staticPokeData");
    const keys = staticPokeData.keys();
    const pickedKeys = pickRandomElementsFromArray(keys, pokeCountByPlayer * 2);
    const pickedPokeItems = pickedKeys.map((key) => _convertToPokeItem(key, staticPokeData.fetch(key)));
    ownPokeItems = pickedPokeItems.slice(0, pokeCountByPlayer);
    opoPokeItems = pickedPokeItems.slice(pokeCountByPlayer, pokeCountByPlayer * 2);
    phase = "select_poke";

    function _convertToPokeItem(pokeId: string, staticPokeData: StaticPokeData): PokeItem {
      return {
        pokeId: Number(pokeId),
        jaName: staticPokeData.jaName,
        imageUrl: staticPokeData.imageUrl ?? "not_found",
        type1Name: staticPokeData.type1Name as TypeName,
        type2Name: staticPokeData.type2Name ? (staticPokeData.type2Name as TypeName) : null,
        speed: staticPokeData.stats.speed,
      };
    }
  }

  let selectedOwnPokeIndex = -1;
  let selectedOpoPokeIndex = -1;
  function commitOwnPoke(): void {
    phase = "select_type";
    selectedOpoPokeIndex = getRandomNumber(pokeCountByPlayer);
  }

  function fetchPokeTypeNameArray(pokeItem: PokeItem): TypeName[] {
    return pokeItem.type2Name ? [pokeItem.type1Name, pokeItem.type2Name] : [pokeItem.type1Name];
  }

  // じゃんけんルール管理とメッセージ更新
  let attackPokeName: string;
  let attackTypeName: TypeName;
  let defenseTypeName: TypeName;
  let efficacyMessage: string;
  let resultMessage: string;
  function commitOwnType(selectedOwnPokeTypeName: TypeName): void {
    const selectedOpoPokeItem = opoPokeItems[selectedOpoPokeIndex];
    const opoTypeNameArray = fetchPokeTypeNameArray(selectedOpoPokeItem);
    const selectedOpoPokeTypeName =
      opoTypeNameArray.length === 1 ? opoTypeNameArray[0] : opoTypeNameArray[getRandomNumber(2)];

    let isOwnAttack: boolean;
    ({ isOwnAttack, attackPokeName, attackTypeName, defenseTypeName } = _judgeAttackSide(
      ownPokeItems[selectedOwnPokeIndex],
      selectedOpoPokeItem,
      selectedOwnPokeTypeName,
      selectedOpoPokeTypeName,
    ));
    ({ efficacyMessage, resultMessage } = _judgeJankenResult(isOwnAttack, attackTypeName, defenseTypeName));
    phase = "term";

    function _judgeAttackSide(
      ownPokeItem: PokeItem,
      opoPokeItem: PokeItem,
      ownPokeTypeName: TypeName,
      opoPokeTypeName: TypeName,
    ): {
      isOwnAttack: boolean;
      attackPokeName: string;
      attackTypeName: TypeName;
      defenseTypeName: TypeName;
    } {
      const isOwnAttack = ownPokeItem.speed >= opoPokeItem.speed;
      return {
        isOwnAttack,
        attackPokeName: isOwnAttack ? ownPokeItem.jaName : opoPokeItem.jaName,
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
          : `${ownPokeItems[selectedOwnPokeIndex].jaName} で しょうぶ する？`,
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
        {#each opoPokeItems as pokeItem, index}
          <div class="rounded-2xl border-2 {index == selectedOpoPokeIndex ? 'border-red-500' : 'border-transparent'}">
            <PokeTile
              name={pokeItem.jaName}
              type1Name={pokeItem.type1Name}
              type2Name={pokeItem.type2Name}
              imageUrl={pokeItem.imageUrl}
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
                  background-color: {fetchTypeData(attackTypeName).themeColor};
                  color: {fetchTypeData(attackTypeName).textColor};
                "
                class={cTypeChipStyle}
              >
                {fetchTypeData(attackTypeName).jaName}
              </span>
              は
              <span
                style="
                  background-color: {fetchTypeData(defenseTypeName).themeColor};
                  color: {fetchTypeData(defenseTypeName).textColor};
                "
                class={cTypeChipStyle}
              >
                {fetchTypeData(defenseTypeName).jaName}
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
                name={pokeItem.jaName}
                type1Name={pokeItem.type1Name}
                type2Name={pokeItem.type2Name}
                imageUrl={pokeItem.imageUrl}
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
          {#each fetchPokeTypeNameArray(ownPokeItems[selectedOwnPokeIndex]) as typeName}
            <button
              style="
                background-color: {fetchTypeData(typeName).themeColor};
                color: {fetchTypeData(typeName).textColor};
              "
              class="{cTypeChipStyle} flex items-center hover:brightness-85"
              on:click={() => commitOwnType(typeName)}
            >
              {fetchTypeData(typeName).jaName}
            </button>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>
