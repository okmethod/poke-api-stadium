<script lang="ts">
  import { getToastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/poke";
  import type { TypeName, TypeData } from "$lib/types/type";
  import type { Stats } from "$lib/types/stats";
  import PokeSilhouette from "$lib/components/cards/PokeSilhouette.svelte";
  import { fetchStaticPokeData, fetchStaticAddPokeData, fetchTypeData } from "$lib/constants/fetchStaticData";
  import { getRandomNumber, formatHeightWeight } from "$lib/utils/numerics";
  import { FIRST_POKE_ID, POKE_COUNT, FIRST_ADDITIONAL_POKE_ID, ADDITIONAL_POKE_COUNT } from "$lib/constants/common";

  interface PokeItem {
    pokeId: number;
    jaName: string;
    gifUrl: string;
    backGifUrl: string;
    jaGenus: string | null;
    type1: TypeData;
    type2: TypeData | null;
    height: number;
    weight: number;
    stats: Stats;
  }

  // ポケモン抽選
  let pickedPokeItem: PokeItem | null = null;
  async function pickPokeId(): Promise<void> {
    const keys = [
      ...Array.from({ length: POKE_COUNT }, (_, i) => FIRST_POKE_ID + i),
      ...Array.from({ length: ADDITIONAL_POKE_COUNT }, (_, i) => FIRST_ADDITIONAL_POKE_ID + i),
    ];

    let pickedPokeId;
    let pickedPokeData;
    do {
      pickedPokeId = keys[getRandomNumber(keys.length)];
      if (Number(pickedPokeId) < FIRST_ADDITIONAL_POKE_ID) {
        pickedPokeData = await fetchStaticPokeData(window.fetch, pickedPokeId.toString());
      } else {
        pickedPokeData = await fetchStaticAddPokeData(window.fetch, pickedPokeId.toString());
      }
      // キー無し または gifUrl無し の場合は再抽選
    } while (!pickedPokeData || pickedPokeData.gifUrl === null);
    pickedPokeItem = await _convertToPokeItem(pickedPokeId, pickedPokeData);
    resetState();

    async function _convertToPokeItem(pokeId: number, staticPokeData: StaticPokeData): Promise<PokeItem> {
      return {
        pokeId,
        jaName: staticPokeData.jaName,
        gifUrl: staticPokeData.gifUrl ?? "",
        backGifUrl: staticPokeData.gifBackUrl ?? "",
        jaGenus: staticPokeData.jaGenus,
        type1: await fetchTypeData(staticPokeData.type1Name as TypeName),
        type2: staticPokeData.type2Name ? await fetchTypeData(staticPokeData.type2Name as TypeName) : null,
        height: staticPokeData.height,
        weight: staticPokeData.weight,
        stats: staticPokeData.stats,
      };
    }
  }

  let isOpen = false;
  function toggleSilhouette(): void {
    isOpen = !isOpen; // 隠しコマンドで、もう一度押せば閉じる
  }

  // 状態リセット
  function resetState(): void {
    isOpen = false;
  }

  // トースト表示
  const toastStore = getToastStore();
  function toastSettings(message: string): ToastSettings {
    return {
      message: message,
      background: "bg-green-100 select-none",
      timeout: 2000,
    };
  }

  function showHintToast(): void {
    const t = toastSettings(`ヒント: ${_getRandomHint()}`);
    toastStore.trigger(t);

    function _getRandomHint(): string {
      if (pickedPokeItem === null) {
        return "よびだすボタン を おしてね";
      }
      const { pros, cons } = _getProsCons(_sortDescStats(pickedPokeItem.stats));
      const hints = [
        pickedPokeItem.jaName[0] + "○".repeat(pickedPokeItem.jaName.length - 1),
        pickedPokeItem.jaGenus,
        `${pickedPokeItem.type1.jaName}タイプ`,
        pickedPokeItem.type2 ? `${pickedPokeItem.type2.jaName}タイプ` : "タイプは1つだけ",
        `たかさ${formatHeightWeight(pickedPokeItem.height, "height")}`,
        `おもさ${formatHeightWeight(pickedPokeItem.weight, "weight")}`,
        pros ? `${pros}が たかい` : null,
        cons ? `${cons}は ひくい` : null,
      ];
      const hint = hints[getRandomNumber(hints.length)];
      return hint ?? "がんばれ！";
    }

    function _sortDescStats(stats: Stats): Record<string, number>[] {
      const statsArray: Record<string, number>[] = [
        { HP: stats.hp },
        { こうげき: stats.attack },
        { ぼうぎょ: stats.defense },
        { とくこう: stats.specialAttack },
        { とくぼう: stats.specialDefense },
        { すばやさ: stats.speed },
      ];
      return statsArray.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
    }

    function _getProsCons(sortedDescStats: Record<string, number>[]): { pros: string | null; cons: string | null } {
      const pros =
        Object.values(sortedDescStats[0])[0] > Object.values(sortedDescStats[1])[0]
          ? Object.keys(sortedDescStats[0])[0]
          : null;
      const tailIndex = sortedDescStats.length - 1;
      const cons =
        Object.values(sortedDescStats[tailIndex])[0] < Object.values(sortedDescStats[tailIndex - 1])[0]
          ? Object.keys(sortedDescStats[tailIndex])[0]
          : null;
      return { pros, cons };
    }
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンだ〜れだ？</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle">
    <!-- 入力フォーム -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を よびだす</span>
        <form on:submit|preventDefault={pickPokeId}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
        <div class="w-4"><!-- spacer --></div>
        <form on:submit|preventDefault={showHintToast}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:lightbulb-on-outline" class="cIconStyle" />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- ポケモン情報 -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <PokeSilhouette
          pokeId={pickedPokeItem?.pokeId ?? null}
          name={pickedPokeItem?.jaName ?? null}
          type1Name={pickedPokeItem?.type1.enName ?? null}
          type2Name={pickedPokeItem?.type2?.enName ?? null}
          imageUrl={pickedPokeItem?.gifUrl ?? null}
          imageBackUrl={pickedPokeItem?.backGifUrl ?? null}
          {isOpen}
        />
      </div>
    </div>

    <!-- メッセージ -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">こたえをみる</span>
        <button type="button" class="cIconButtonStyle" on:click={toggleSilhouette}>
          <div class="cIconDivStyle">
            <Icon icon="mdi:pokeball" class="cIconStyle" />
          </div>
        </button>
      </div>
    </div>
  </div>
</div>
