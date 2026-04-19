<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import { pokeTypeColor, pokeTypeJaName } from "$lib/domain/models/PokeData";
  import StatsRadarChart from "./StatsRadarChart.svelte";

  interface PokeCardProps {
    pokeData: PokeData | null;
  }
  let { pokeData }: PokeCardProps = $props();

  const headerColor = $derived(pokeData ? pokeTypeColor(pokeData.type1) : "#ccc");
  const footerColor = $derived(pokeData ? pokeTypeColor(pokeData.type2 ?? pokeData.type1) : "#ccc");

  // pokeData が切り替わったらインデックスをリセット
  let imageIndex = $state(0);
  let cryIndex = $state(0);
  $effect(() => {
    void pokeData;
    imageIndex = 0;
    cryIndex = 0;
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
    if (availableCryUrls.length === 0) return;
    new Audio(availableCryUrls[cryIndex]).play();
    cryIndex = (cryIndex + 1) % availableCryUrls.length;
  }
</script>

<div class="card bg-surface-50-950 rounded-2xl shadow w-full max-w-2xl overflow-hidden">
  <header class="h-4" style="background-color: {headerColor};"></header>

  <!-- タイトル部 -->
  <div class="px-4 pt-4 pb-2 text-center">
    <h2 class="text-2xl font-bold">
      {#if pokeData}
        {pokeData.jaName} : <span class="font-normal">{pokeData.enName}</span>
      {:else}
        ???
      {/if}
    </h2>
  </div>

  <!-- データ部 -->
  <div class="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 px-6 pb-4">
    <!-- 画像 -->
    <div class="flex flex-col items-center gap-2 flex-shrink-0">
      <div class="w-48 h-48 bg-white rounded-lg border border-surface-200-800 flex items-center justify-center">
        {#if currentImageUrl}
          <img src={currentImageUrl} alt={pokeData?.jaName} class="w-full h-full object-contain" />
        {:else}
          <Icon icon="mdi:image-off-outline" class="size-12 text-surface-400" />
        {/if}
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="btn preset-filled-surface-500 btn-sm"
          onclick={nextImage}
          disabled={!pokeData || pokeData.imageUrls.all.length <= 1}
          title="画像を切り替え ({pokeData ? imageIndex + 1 : 0}/{pokeData?.imageUrls.all.length ?? 0})"
        >
          <Icon icon="mdi:image-multiple-outline" class="size-4" />
          {pokeData ? imageIndex + 1 : 0}/{pokeData?.imageUrls.all.length ?? 0}
        </button>
        <button
          type="button"
          class="btn preset-filled-surface-500 btn-sm"
          onclick={playCry}
          disabled={availableCryUrls.length === 0}
          title="なきごえを再生（クリックで種類切り替え）"
        >
          <Icon icon="mdi:volume-high" class="size-4" />
          なきごえ
        </button>
      </div>
    </div>

    <!-- 数値情報 -->
    <div class="flex flex-col gap-3 min-w-28">
      <div>
        <p class="font-bold text-sm">[タイプ]</p>
        <p class="text-sm">
          {#if pokeData}
            {pokeTypeJaName(pokeData.type1)}{pokeData.type2 ? "　" + pokeTypeJaName(pokeData.type2) : ""}
          {:else}
            ???
          {/if}
        </p>
      </div>
      <div>
        <p class="font-bold text-sm">[たかさ]</p>
        <p class="text-sm">
          {#if pokeData}
            {pokeData.height} m
          {:else}
            ???
          {/if}
        </p>
      </div>
      <div>
        <p class="font-bold text-sm">[おもさ]</p>
        <p class="text-sm">
          {#if pokeData}
            {pokeData.weight} kg
          {:else}
            ???
          {/if}
        </p>
      </div>
      <div>
        <p class="font-bold text-sm">[せだい]</p>
        <p class="text-sm">
          {#if pokeData}
            {pokeData.generationData?.label ?? "不明"}
            <br />
            <span class="text-surface-400">({pokeData.generationData?.titles})</span>
          {:else}
            ???
          {/if}
        </p>
      </div>
    </div>

    <!-- レーダーチャート -->
    <div class="flex flex-col items-center">
      <p class="font-bold text-sm mb-1">[ステータス]</p>
      <StatsRadarChart stats={pokeData?.stats ?? null} />
    </div>
  </div>

  <footer class="h-4" style="background-color: {footerColor};"></footer>
</div>
