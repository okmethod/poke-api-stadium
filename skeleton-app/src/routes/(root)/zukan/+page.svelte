<script lang="ts">
  import makePokeData from "$lib/api/makePokeData.client";
  import { playAudio } from "$lib/stores/audio";
  import type { PokeData } from "$lib/types/poke";
  import IconButton from "$lib/components/IconButton.svelte";
  import PokeCard from "$lib/components/cards/PokeCard.svelte";

  let pokeId = "";
  let pokeData: PokeData | null = null;

  let isLoading = false;
  let isUnknown = false;
  async function fetchPokeData(): Promise<void> {
    isLoading = true;
    try {
      isUnknown = false;
      pokeData = await makePokeData(fetch, pokeId);
      playAudio(pokeData.oggUrl);
    } catch {
      isUnknown = true;
      pokeData = null;
    }
    isLoading = false;
  }
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle">
    <h1 class="cTitleStyle">ポケモンずかん</h1>
  </div>

  <div class="cContentPartStyle">
    <!-- 上部ボタン -->
    <div class="flex items-center justify-center space-x-1">
      <label for="pokeId" class="cSpanTextStyle">
        <span>No:</span>
      </label>
      <div class="cInputFormAndMessagePartStyle">
        <input type="number" min="1" max="99999" id="pokeId" bind:value={pokeId} class="border rounded px-5 py-1 h-9" />
        <IconButton icon="mdi:search" cButton="btn-sm" onClick={fetchPokeData} disabled={isLoading} />
        <div>
          {#if isUnknown}
            <span class="text-red-500">みはっけんのポケモン</span>
          {/if}
        </div>
      </div>
    </div>

    <!-- ポケモン情報 -->
    <div class="">
      <PokeCard {pokeData} />
    </div>
  </div>
</div>
