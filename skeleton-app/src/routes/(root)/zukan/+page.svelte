<script lang="ts">
  import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
  import makePokeData from "$lib/api/makePokeData.client";
  import { playAudio } from "$lib/stores/audio";
  import type { PokeData } from "$lib/types/poke";
  import IconButton from "$lib/components/IconButton.svelte";
  import PokeCard from "$lib/components/cards/PokeCard.svelte";

  let pokeId = "";
  let pokeData: PokeData | null = null;

  let isLoading = false;
  async function fetchPokeData(): Promise<void> {
    isLoading = true;
    try {
      pokeData = await makePokeData(fetch, pokeId);
      playAudio(pokeData.oggUrl);
    } catch {
      showWaringToast();
      pokeData = null;
    }
    isLoading = false;
  }

  // トースト表示
  const toastStore = getToastStore();
  function toastSettings(message: string): ToastSettings {
    return {
      message: message,
      background: "bg-red-100 select-none",
      timeout: 2000,
    };
  }
  function showWaringToast(): void {
    const t = toastSettings("みはっけんのポケモン");
    toastStore.trigger(t);
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
      </div>
    </div>

    <!-- ポケモン情報 -->
    <div class="">
      <PokeCard {pokeData} />
    </div>
  </div>
</div>
