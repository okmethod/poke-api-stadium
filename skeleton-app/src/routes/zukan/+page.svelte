<script lang="ts">
  import Icon from "@iconify/svelte";
  import makePokeData from "$lib/api/makePokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import PokeCard from "$lib/components/cards/PokeCard.svelte";
  import { LATEST_POKEMON_ID } from "$lib/constants/staticPokeData";

  let pokeId = "";
  let pokeData: PokeData | null = null;

  let isLoading = false;
  async function fetchPokeData(): Promise<void> {
    isLoading = true;
    try {
      pokeData = await makePokeData(fetch, pokeId);
    } catch {
      pokeData = null;
    }
    isLoading = false;
  }
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンずかん</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle">
    <!-- 入力フォーム -->
    <div class="ml-4">
      <form on:submit|preventDefault={fetchPokeData} class="cInputFormAndMessagePartStyle">
        <label for="pokeId" class="text-lg">
          <span class="hidden sm:inline">全国図鑑</span>
          No:
        </label>
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="number"
            min="1"
            max={LATEST_POKEMON_ID}
            id="pokeId"
            bind:value={pokeId}
            class="border rounded px-4 py-1 h-full"
          />
          <button type="submit" disabled={isLoading} class="cIconButtonStyle {isLoading ? '!bg-gray-500' : ''}">
            <div class="cIconDivStyle">
              <Icon icon="mdi:search" class="cIconStyle" />
            </div>
          </button>
        </div>
      </form>
    </div>

    <!-- ポケモン情報 -->
    <div>
      <PokeCard
        {pokeId}
        jaName={pokeData?.jaName ?? null}
        enName={pokeData?.enName ?? null}
        jaGenus={pokeData?.jaGenus ?? null}
        imageUrlArray={pokeData?.imageUrlArray ?? []}
        type1JaName={pokeData?.type1.jaName ?? null}
        type1EnName={pokeData?.type1.enName ?? null}
        type2JaName={pokeData?.type2?.jaName ?? null}
        type2EnName={pokeData?.type2?.enName ?? null}
        height={pokeData?.height ?? null}
        weight={pokeData?.weight ?? null}
        stats={pokeData?.stats ?? null}
      />
    </div>
  </div>
</div>
