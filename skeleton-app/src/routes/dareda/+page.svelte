<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import type { StaticPokeData } from "$lib/types/poke";
  //import type { TypeName, TypeData } from "$lib/types/type";
  import { pickRandomKey } from "$lib/utils/numerics";

  interface PokeItem {
    jaName: string;
    gifUrl: string;
  }

  // staticデータロード
  let POKE_DICT: Record<number, PokeItem>;
  //let TYPE_DICT: Record<TypeName, TypeData>;
  onMount(async () => {
    // 利用スコープを局所化してガベージコレクションされるようにする
    const { STATIC_POKE_DICT } = await import("$lib/constants/staticPokeData");
    POKE_DICT = _initPokeDict(STATIC_POKE_DICT);
    function _initPokeDict(staticPokeDict: Record<number, StaticPokeData>): Record<number, PokeItem> {
      const pokeDict: Record<number, PokeItem> = {};
      Object.entries(staticPokeDict).forEach(([pokeId, staticPokeData]) => {
        if (staticPokeData.gifUrl !== null) {
          pokeDict[Number(pokeId)] = {
            jaName: staticPokeData.jaName,
            gifUrl: staticPokeData.gifUrl,
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
    pickedPokeId = pickRandomKey(POKE_DICT);
  }

  // 状態リセット
  function resetState(): void {}
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
    <div>
      {#if pickedPokeId !== 0}
        <img
          src={POKE_DICT[pickedPokeId].gifUrl}
          alt="???"
          class="w-60 h-60 object-contain"
          style="filter: brightness(0);"
        />
      {/if}
    </div>
  </div>
</div>
