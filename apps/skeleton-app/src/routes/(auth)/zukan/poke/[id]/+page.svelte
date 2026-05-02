<script lang="ts">
  import { goto } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page, navigating } from "$app/state";

  // 現在のタブを保持したまま指定 ID のページへ遷移する
  function gotoId(id: number) {
    const tab = page.url.searchParams.get("tab");
    const query = tab ? `?tab=${tab}` : "";
    const segments = page.url.pathname.split("/");
    segments[segments.length - 1] = String(id);
    return goto(segments.join("/") + query);
  }
  import Icon from "@iconify/svelte";
  import { resolvedCryUrl } from "$lib/domain/models/PokeData";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import PokeDexCard from "./_components/PokeDexCard.svelte";

  let { data } = $props();

  $effect(() => {
    if (data.fetchError) showErrorToast(data.fetchError);
  });

  // フォームが切り替わったときだけ鳴き声を再生（リージョンフォームも個別に検知するため pokeId を使用）
  let prevPokeId = $state<number | null>(null);
  $effect(() => {
    if (data.pokeData && data.pokeData.pokeId !== prevPokeId) {
      prevPokeId = data.pokeData.pokeId;
      playCry();
    }
  });

  async function navigatePrev() {
    // 前後ナビゲーションは図鑑番号（speciesId）基準
    const currentId = data.pokeData?.speciesId ?? parseInt(page.params.id ?? "", 10);
    if (isNaN(currentId) || currentId <= 1) return;
    await gotoId(currentId - 1);
  }

  async function navigateNext() {
    const currentId = data.pokeData?.speciesId ?? parseInt(page.params.id ?? "", 10);
    if (isNaN(currentId)) return;
    await gotoId(currentId + 1);
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

  <div class="flex items-center justify-between gap-4">
    <!-- 左向き矢印 -->
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={navigatePrev}
      disabled={navigating.to !== null || !data.pokeData || data.pokeData.speciesId <= 1}
    >
      <Icon icon="mdi:chevron-left" class="size-5" />
    </button>

    <button type="button" class="btn preset-tonal btn-sm" onclick={() => goto(resolve("/zukan"))}>
      <Icon icon="mdi:magnify" class="size-5" />
      検索
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
    formVariants={data.formVariants ?? null}
    activeTab={data.tab}
    ontabchange={handleTabChange}
    onpokeselect={gotoId}
  />
</div>
