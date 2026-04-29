<script lang="ts">
  import Icon from "@iconify/svelte";
  import { resolvedCryUrl, type PokeData } from "$lib/domain/models/PokeData";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import PokeDexCard from "./_components/PokeDexCard.svelte";

  let pokeIdInput = $state("1");
  let pokeData = $state<PokeData | null>(null);
  let isLoading = $state(false);

  async function fetchPokeData() {
    const id = parseInt(pokeIdInput);
    if (isNaN(id) || id < 1) return;
    isLoading = true;
    try {
      pokeData = await getPokeRepository().getPokemon(fetch, id);
    } catch {
      showErrorToast("みはっけんのポケモン");
      pokeData = null;
    } finally {
      isLoading = false;
    }
    playCry();
  }

  function playCry() {
    if (!pokeData || !getAudioOn()) return;
    const cryUrl = resolvedCryUrl(pokeData.cryUrls);
    if (cryUrl) {
      new Audio(cryUrl).play();
    }
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンずかん</h1>

  <!-- 検索フォーム -->
  <div class="flex items-center gap-2">
    <label for="pokeId" class="font-semibold">No:</label>
    <input
      id="pokeId"
      type="number"
      min="1"
      max="9999"
      bind:value={pokeIdInput}
      onkeydown={(e) => e.key === "Enter" && fetchPokeData()}
      class="w-24 rounded border px-3 py-1 text-center"
    />
    <button type="button" class="btn preset-tonal btn-sm" onclick={fetchPokeData} disabled={isLoading}>
      <Icon icon="mdi:search" class="size-5" />
    </button>
  </div>

  <!-- ポケモンデータカード -->
  <PokeDexCard {pokeData} />
</div>
