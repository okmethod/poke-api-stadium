<script lang="ts">
  import { goto } from "$app/navigation";
  import { page, navigating } from "$app/state";
  import Icon from "@iconify/svelte";
  import { resolvedCryUrl } from "$lib/domain/models/PokeData";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import PokeDexCard from "./_components/PokeDexCard.svelte";
  import PokeSearchPanel from "./_components/PokeSearchPanel.svelte";

  let { data } = $props();

  let pokeIdInput = $state(page.url.searchParams.get("id") ?? "");

  // ブラウザバック時など URL が変わったら入力欄も追従
  $effect(() => {
    const id = page.url.searchParams.get("id");
    if (id) pokeIdInput = id;
  });

  $effect(() => {
    if (data.fetchError) showErrorToast(data.fetchError);
  });

  // ポケモンが切り替わったときだけ鳴き声を再生
  let prevPokeDataId = $state<number | null>(null);
  $effect(() => {
    if (data.pokeData && data.pokeData.id !== prevPokeDataId) {
      prevPokeDataId = data.pokeData.id;
      playCry();
    }
  });

  async function handleSearch() {
    const id = parseInt(pokeIdInput, 10);
    if (isNaN(id) || id < 1) return;
    const url = new URL(page.url);
    url.searchParams.set("id", String(id));
    await goto(url.toString());
  }

  async function navigatePrev() {
    const currentId = data.pokeData?.id ?? parseInt(pokeIdInput, 10);
    if (isNaN(currentId) || currentId <= 1) return;
    const url = new URL(page.url);
    url.searchParams.set("id", String(currentId - 1));
    await goto(url.toString());
  }

  async function navigateNext() {
    const currentId = data.pokeData?.id ?? parseInt(pokeIdInput, 10);
    if (isNaN(currentId)) return;
    const url = new URL(page.url);
    url.searchParams.set("id", String(currentId + 1));
    await goto(url.toString());
  }

  function handleTabChange(tab: string) {
    const url = new URL(page.url);
    url.searchParams.set("tab", tab);
    goto(url.toString(), { replaceState: true, noScroll: true });
  }

  function playCry() {
    if (!data.pokeData || !getAudioOn()) return;
    const cryUrl = resolvedCryUrl(data.pokeData.cryUrls);
    if (cryUrl) new Audio(cryUrl).play();
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンずかん</h1>

  <div class="flex items-center gap-2">
    <!-- 左向き矢印 -->
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={navigatePrev}
      disabled={navigating.to !== null || !data.pokeData || data.pokeData.id <= 1}
    >
      <Icon icon="mdi:chevron-left" class="size-5" />
    </button>

    <!-- 番号指定 -->
    <label for="pokeId" class="font-semibold">No:</label>
    <input
      id="pokeId"
      type="number"
      min="1"
      max="9999"
      bind:value={pokeIdInput}
      onkeydown={(e) => e.key === "Enter" && handleSearch()}
      class="w-24 rounded border px-3 py-1 text-center"
    />
    <button type="button" class="btn preset-tonal btn-sm" onclick={handleSearch} disabled={navigating.to !== null}>
      <Icon icon="mdi:search" class="size-5" />
    </button>

    <!-- 右向き矢印 -->
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={navigateNext}
      disabled={navigating.to !== null || !data.pokeData}
    >
      <Icon icon="mdi:chevron-right" class="size-5" />
    </button>
  </div>

  <!-- ポケモンデータカード -->
  <PokeDexCard
    pokeData={data.pokeData}
    evolutionChain={data.evolutionChain}
    activeTab={data.tab}
    ontabchange={handleTabChange}
  />

  <!-- ポケモン検索パネル -->
  <PokeSearchPanel />
</div>
