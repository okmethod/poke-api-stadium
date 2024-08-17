<script lang="ts">
  import Icon from "@iconify/svelte";
  import makePokeData from "$lib/api/makePokeData.client";
  import type { PokeData } from "$lib/types/poke";
  import PokeCard from "$lib/components/cards/PokeCard.svelte";

  let pokeId = "";
  let pokeData: PokeData | null = null;

  let isLoading = false;
  let isUnkown = false;
  async function fetchPokeData(): Promise<void> {
    isLoading = true;
    try {
      isUnkown = false;
      pokeData = await makePokeData(fetch, pokeId);
    } catch {
      isUnkown = true;
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
    <div class="flex items-center justify-center">
      <form on:submit|preventDefault={fetchPokeData} class="cInputFormAndMessagePartStyle">
        <label for="pokeId" class="text-lg">
          <span>No:</span>
        </label>
        <div class="cInputFormAndMessagePartStyle">
          <input
            type="number"
            min="1"
            max="99999"
            id="pokeId"
            bind:value={pokeId}
            class="border rounded px-5 py-1 h-full"
          />
          <button type="submit" disabled={isLoading} class="cIconButtonStyle {isLoading ? '!bg-gray-500' : ''}">
            <div class="cIconDivStyle">
              <Icon icon="mdi:search" class="cIconStyle" />
            </div>
          </button>
          <div>
            {#if isUnkown}
              <span class="text-red-500">みはっけんのポケモン</span>
            {/if}
          </div>
        </div>
      </form>
    </div>

    <!-- ポケモン情報 -->
    <div class="">
      <PokeCard {pokeData} />
    </div>
  </div>
</div>
