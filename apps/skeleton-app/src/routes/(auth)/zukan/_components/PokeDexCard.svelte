<script lang="ts">
  import type { Component } from "svelte";
  import { Tabs } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import { pokeTypeColor, resolvedCryUrl } from "$lib/domain/models/PokeData";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import DexBasicTab from "./DexBasicTab.svelte";
  import DexStatusTab from "./DexStatusTab.svelte";
  import DexFlavorTab from "./DexFlavorTab.svelte";

  interface PokeDexCardProps {
    pokeData: PokeData | null;
  }
  let { pokeData }: PokeDexCardProps = $props();

  const headerColor = $derived(pokeData ? pokeTypeColor(pokeData.type1) : "#ccc");
  const footerColor = $derived(pokeData ? pokeTypeColor(pokeData.type2 ?? pokeData.type1) : "#ccc");

  // pokeData が切り替わったらインデックスをリセット
  let imageIndex = $state(0);
  $effect(() => {
    void pokeData;
    imageIndex = 0;
  });

  const currentImageUrl = $derived(
    pokeData ? (pokeData.imageUrls.all[imageIndex] ?? pokeData.imageUrls.artwork.front) : null,
  );

  function nextImage() {
    if (!pokeData || pokeData.imageUrls.all.length <= 1) return;
    imageIndex = (imageIndex + 1) % pokeData.imageUrls.all.length;
  }

  const availableCryUrls = $derived(
    pokeData ? [pokeData.cryUrls.latest, pokeData.cryUrls.legacy].filter((url): url is string => url !== null) : [],
  );

  function playCry() {
    if (!pokeData || !getAudioOn()) return;
    const cryUrl = resolvedCryUrl(pokeData.cryUrls);
    if (cryUrl) {
      new Audio(cryUrl).play();
    }
  }

  interface TabDef {
    value: string;
    label: string;
    icon: string;
    component: Component<{ pokeData: PokeData | null }>;
  }
  const tabs: TabDef[] = [
    { value: "basic", label: "基本", icon: "mdi:information-slab-circle-outline", component: DexBasicTab },
    { value: "status", label: "ステータス", icon: "mdi:chart-bar", component: DexStatusTab },
    { value: "flavor", label: "図鑑", icon: "mdi:book-open-outline", component: DexFlavorTab },
  ];
</script>

<div class="card bg-surface-50-950 w-full max-w-2xl overflow-hidden rounded-2xl shadow">
  <header class="h-4" style="background-color: {headerColor};"></header>

  <!-- タイトル部 -->
  <div class="px-4 pt-2 pb-2 text-center">
    {#if pokeData}
      <h2 class="flex h-16 flex-col items-center gap-1 font-bold sm:h-10 sm:flex-row sm:justify-between">
        <span class="text-surface-400 hidden sm:block">No. {pokeData.id}</span>
        <div class="flex items-center justify-center gap-2">
          <span class="text-2xl"> {pokeData.jaName} </span>
          {#if pokeData}
            {#if pokeData.isLegendary}
              <span class="badge preset-tonal-warning text-xs">伝説</span>
            {/if}
            {#if pokeData.isMythical}
              <span class="badge preset-tonal-error text-xs">幻</span>
            {/if}
          {/if}
        </div>
        <span class="text-surface-400">{pokeData.genus}</span>
      </h2>
    {:else}
      <h2 class="flex h-16 items-center justify-center sm:h-10 sm:justify-between">
        <span class="text-surface-400 hidden sm:block">No. ?</span>
        <span class="text-surface-400">???</span>
        <span class="text-surface-400 hidden sm:block">??????</span>
      </h2>
    {/if}
    <hr class="hr" />
  </div>

  <!-- メインコンテンツ: 画像（固定） + タブ -->
  <div class="flex flex-col items-center gap-4 px-4 pb-4 sm:flex-row">
    <!-- 画像セクション -->
    <div class="flex flex-shrink-0 flex-col items-center gap-2">
      <div class="border-surface-200-800 flex h-48 w-48 items-center justify-center rounded-lg border bg-white">
        {#if currentImageUrl}
          <img src={currentImageUrl} alt={pokeData?.jaName} class="h-full w-full object-contain" />
        {:else}
          <Icon icon="mdi:image-off-outline" class="text-surface-400 size-12" />
        {/if}
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="btn preset-tonal btn-sm"
          onclick={nextImage}
          disabled={!pokeData || pokeData.imageUrls.all.length <= 1}
          title="画像を切り替え ({pokeData ? imageIndex + 1 : 0}/{pokeData?.imageUrls.all.length ?? 0})"
        >
          <Icon icon="mdi:image-multiple-outline" class="size-4" />
          {pokeData ? imageIndex + 1 : 0}/{pokeData?.imageUrls.all.length ?? 0}
        </button>
        <button
          type="button"
          class="btn preset-tonal btn-sm"
          onclick={playCry}
          disabled={availableCryUrls.length === 0}
          title="なきごえを再生"
        >
          <Icon icon="mdi:volume-high" class="size-4" />
          なきごえ
        </button>
      </div>
    </div>

    <!-- タブセクション: pokeData が切り替わるたびに基本タブへリセット -->
    {#key pokeData?.id}
      <div class="w-full min-w-0 flex-1">
        <Tabs defaultValue="basic">
          <Tabs.List class="flex">
            {#each tabs as tab (tab.value)}
              <Tabs.Trigger
                value={tab.value}
                class="data-[selected]:border-primary-500 px-3 py-1 text-sm data-[selected]:font-bold"
              >
                <Icon icon={tab.icon} class="inline size-4 sm:hidden" />
                <span class="hidden sm:inline">{tab.label}</span>
              </Tabs.Trigger>
            {/each}
            <Tabs.Indicator />
          </Tabs.List>

          {#each tabs as tab (tab.value)}
            <Tabs.Content value={tab.value}>
              {@const Comp = tab.component}
              <div class="h-full overflow-y-auto pb-4 sm:h-64 sm:pb-0"><Comp {pokeData} /></div>
            </Tabs.Content>
          {/each}
        </Tabs>
      </div>
    {/key}
  </div>

  <footer class="h-4" style="background-color: {footerColor};"></footer>
</div>
