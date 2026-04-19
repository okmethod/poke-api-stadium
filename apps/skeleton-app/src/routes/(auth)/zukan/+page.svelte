<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import PokeCard from "./_components/PokeCard.svelte";

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
  }
</script>

<div class="container mx-auto p-4 flex flex-col items-center gap-6">
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
      class="border rounded px-3 py-1 w-24 text-center"
    />
    <button type="button" class="btn preset-filled-surface-500 btn-sm" onclick={fetchPokeData} disabled={isLoading}>
      <Icon icon="mdi:search" class="size-5" />
    </button>
  </div>

  <!-- ポケモンデータカード -->
  <PokeCard {pokeData} />
</div>
