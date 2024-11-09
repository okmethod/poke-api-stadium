<script lang="ts">
  import { getToastStore } from "@skeletonlabs/skeleton";
  import type { ToastSettings } from "@skeletonlabs/skeleton";
  import type { Stats } from "$lib/types/stats";
  import { filterArrayByGeneration } from "$lib/stores/generation";
  import { playAudio } from "$lib/stores/audio";
  import { formatHeightWeight } from "$lib/utils/numerics";
  import { getRandomNumber, pickRandomElementsFromArray } from "$lib/utils/pickRandom";
  import IconButton from "$lib/components/IconButton.svelte";
  import PokeSilhouette from "$lib/components/cards/PokeSilhouette.svelte";
  import type { PokeItem } from "./+page";

  export let data: {
    pokeItems: PokeItem[];
  };

  // ポケモン抽選
  let pickedPokeItem: PokeItem | null = null;
  async function pickPokeItem(): Promise<void> {
    resetState();
    const pokeItems = filterArrayByGeneration(data.pokeItems, "pokeId");
    pickedPokeItem = pickRandomElementsFromArray(pokeItems, 1)[0];
  }

  let isOpen = false;
  function toggleSilhouette(): void {
    isOpen = !isOpen; // 隠しコマンドで、もう一度押せば閉じる
    if (isOpen && pickedPokeItem !== null) playAudio(pickedPokeItem.oggUrl);
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
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンだ〜れだ？</h1>
  </div>

  <div class="cContentPartStyle">
    <!-- 上部ボタン -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">ポケモン を よびだす</span>
        <IconButton icon="mdi:pokeball" cButton="btn-sm" onClick={pickPokeItem} />
        <div class="w-4"><!-- spacer --></div>
        <IconButton icon="mdi:lightbulb-on-outline" cButton="btn-sm" onClick={showHintToast} />
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
          imageBackUrl={pickedPokeItem?.gifBackUrl ?? null}
          {isOpen}
        />
      </div>
    </div>

    <!-- 下部ボタン -->
    <div class="m-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="cSpanTextStyle">こたえをみる</span>
        <IconButton icon="mdi:eye" cButton="btn-sm" onClick={toggleSilhouette} />
      </div>
    </div>
  </div>
</div>
