<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/poke";
  import PokeSilhouette from "$lib/components/cards/PokeSilhouette.svelte";
  import type { TypeName } from "$lib/types/type";
  import { pickRandomKey } from "$lib/utils/numerics";

  interface PokeItem {
    jaName: string;
    gifUrl: string;
    type1Name: TypeName;
    type2Name: TypeName | null;
  }

  // staticデータロード
  let TOTAL_POKE_DICT: Record<number, PokeItem>;
  //let TYPE_DICT: Record<TypeName, TypeData>;
  onMount(async () => {
    // 利用スコープを局所化してガベージコレクションされるようにする
    const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");
    const POKE_DICT = _initPokeDict(STATIC_POKE_DICT);

    const { STATIC_ADDITIONAL_POKE_DICT } = await import("$lib/constants/staticAddPokeData");
    const ADDITIONAL_POKE_DICT = _initPokeDict(STATIC_ADDITIONAL_POKE_DICT);

    TOTAL_POKE_DICT = { ...POKE_DICT, ...ADDITIONAL_POKE_DICT };

    function _initPokeDict(staticPokeDict: Record<number, StaticPokeData>): Record<number, PokeItem> {
      const pokeDict: Record<number, PokeItem> = {};
      Object.entries(staticPokeDict).forEach(([pokeId, staticPokeData]) => {
        if (staticPokeData.gifUrl !== null) {
          pokeDict[Number(pokeId)] = {
            jaName: staticPokeData.jaName,
            gifUrl: staticPokeData.gifUrl,
            type1Name: staticPokeData.type1Name as TypeName,
            type2Name: staticPokeData.type2Name ? (staticPokeData.type2Name as TypeName) : null,
          };
        }
      });
      return pokeDict;
    }

    //const { STATIC_TYPE_DICT } = await import("$lib/constants/staticTypeData");
    //TYPE_DICT = STATIC_TYPE_DICT as Record<TypeName, TypeData>;
  });

  let pickedPokeId = 0;
  function pickPokeId(): void {
    resetState();
    pickedPokeId = pickRandomKey(TOTAL_POKE_DICT);
  }

  let isOpen = false;
  function toggleSilhouette(): void {
    isOpen = !isOpen; // 隠しコマンドで、もう一度押せば閉じる
  }

  // 状態リセット
  function resetState(): void {
    isOpen = false;
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
    <div class="ml-4">
      <div class="cInputFormAndMessagePartStyle">
        <span class="text-lg">ポケモン を よびだす</span>
        <form on:submit|preventDefault={pickPokeId}>
          <button type="submit" class="cIconButtonStyle">
            <div class="cIconDivStyle">
              <Icon icon="mdi:pokeball" class="cIconStyle" />
            </div>
          </button>
        </form>
      </div>
    </div>

    <!-- ポケモン情報 -->
    <div class="ml-4">
      <div class="cInputFormAndMessagePartStyle">
        <PokeSilhouette
          pokeId={pickedPokeId}
          name={pickedPokeId > 0 ? TOTAL_POKE_DICT[pickedPokeId]?.jaName : null}
          type1Name={pickedPokeId > 0 ? TOTAL_POKE_DICT[pickedPokeId]?.type1Name : null}
          type2Name={pickedPokeId > 0 ? TOTAL_POKE_DICT[pickedPokeId]?.type2Name : null}
          imageUrl={pickedPokeId > 0 ? TOTAL_POKE_DICT[pickedPokeId]?.gifUrl : null}
          {isOpen}
        />
      </div>
    </div>

    <!-- メッセージ -->
    <div class="ml-4">
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
