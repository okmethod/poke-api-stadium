<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { Chart, registerables } from "chart.js";
  import { TypeName } from "$lib/types/type";
  import type { Stats } from "$lib/types/stats";
  import { formatHeightWeight } from "$lib/utils/numerics";
  import { TYPE_COLOR_DICT } from "$lib/constants/staticTypeData";

  export let pokeId = "";
  export let jaName: string | null = null;
  export let enName: string | null = null;
  export let jaGenus: string | null = null;
  export let imageUrlArray: string[] = [];
  export let type1JaName: string | null = null;
  export let type1EnName: TypeName | null = null;
  export let type2JaName: string | null = null;
  export let type2EnName: TypeName | null = null;
  export let height: number | null = null;
  export let weight: number | null = null;
  export let stats: Stats | null = null;

  let headerColor = TYPE_COLOR_DICT["unknown"].themeColor;
  let footerColor = TYPE_COLOR_DICT["unknown"].themeColor;
  $: if (pokeId) {
    imageUrlCount = imageUrlArray.length;
    headerColor = type1EnName ? TYPE_COLOR_DICT[type1EnName].themeColor : TYPE_COLOR_DICT["unknown"].themeColor;
    footerColor = type2EnName ? TYPE_COLOR_DICT[type2EnName].themeColor : headerColor;
    statsData = stats
      ? [stats.hp, stats.attack, stats.defense, stats.speed, stats.specialDefense, stats.specialAttack]
      : [0, 0, 0, 0, 0, 0];
    if (chartInstance) {
      chartInstance.data.datasets[0].data = statsData;
      chartInstance.update();
    }
  }

  let imageUrlCount = 0;
  let currentImageIndex = 0;
  function toggleImage(): void {
    if (imageUrlCount > 1) {
      currentImageIndex = (currentImageIndex + 1) % imageUrlCount;
    }
  }

  let isImageLoaded = false;
  function handleImageLoad() {
    isImageLoaded = true;
  }
  $: if (imageUrlArray.length > 0) {
    isImageLoaded = false;
  }

  Chart.register(...registerables);
  let chartCanvas: HTMLCanvasElement;
  let chartInstance: Chart | null = null;
  let statsData: number[] = [];
  onMount(() => {
    const ctx = chartCanvas.getContext("2d");
    if (!ctx) return;
    chartInstance = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["HP", "こうげき", "ぼうぎょ", "すばやさ", "とくぼう", "とくこう"],
        datasets: [
          {
            label: "",
            data: statsData,
            fill: true,
            backgroundColor: "#ff638420",
            borderColor: "#ff6384",
            pointBackgroundColor: "#ff6384",
            pointBorderColor: "#ffffff",
            pointHoverBackgroundColor: "#ffffff",
            pointHoverBorderColor: "#ff6384",
          },
        ],
      },
      options: {
        scales: {
          r: {
            min: 0,
            max: 200,
            ticks: {
              stepSize: 50,
              display: false,
            },
            pointLabels: {
              font: {
                size: 10,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          line: {
            borderWidth: 1,
          },
          point: {
            radius: 2,
            hoverRadius: 3,
          },
        },
      },
    });
  });

  const cIndexStyle = "text-l font-semibold text-gray-700";
  const cTextStyle = "text-s text-gray-600";
</script>

<div class="flex flex-col bg-gray-50 rounded-2xl shadow border min-w-[300px] max-w-[600px] overflow-hidden select-none">
  <header class="p-4 bg-transparent" style="background-color: {headerColor};"></header>

  <!-- タイトル部 -->
  <div class="m-2 bg-transparent">
    <h1 class="text-2xl font-bold text-gray-900">
      <div class="flex flex-col md:flex-row justify-center items-center">
        {#if jaName !== null}
          <span>{jaName} : {enName ?? "???"}</span>
          <span class="text-lg font-normal text-gray-700 md:ml-4">
            {jaGenus ?? "???"}
          </span>
        {:else}
          <span>???</span>
        {/if}
      </div>
    </h1>
  </div>

  <!-- データ部 -->
  <div class="flex flex-wrap md:flex-nowrap w-full min-h-[280px] items-center justify-center">
    <!-- 画像 -->
    <div class="md:w-2/5 m-2 md:p-4">
      <div class="relative w-48 h-48 bg-white rounded-lg border border-gray-200">
        {#if imageUrlCount > 0}
          <button type="button" on:click={toggleImage}>
            <img
              src={imageUrlArray[currentImageIndex]}
              alt={jaName ?? "???"}
              class="absolute top-0 left-0 w-full h-full object-contain"
              class:image={!isImageLoaded}
              class:loaded={isImageLoaded}
              on:load={handleImageLoad}
            />
            {#if !isImageLoaded}
              <div class="absolute inset-0 flex items-center justify-center h-full">
                <Icon icon="mdi:progress-download" class="w-full h-full text-white bg-gray-100 object-cover" />
              </div>
            {:else}
              <div class="absolute bottom-0 right-0 m-2">
                <Icon icon="mdi:image-refresh-outline" class="w-4 h-4" />
              </div>
            {/if}
          </button>
        {:else}
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Icon icon="mdi:image-off-outline" class="w-8 h-8" />
          </div>
        {/if}
      </div>
    </div>

    <!-- 数値 -->
    <div class="md:w-1/5 m-2 md:m-0">
      <!-- タイプ -->
      <div class="flex flex-row md:flex-col mb-2 mr-2 md:mr-4">
        <h2 class={cIndexStyle}>[タイプ]</h2>
        <ul class="flex flex-row md:flex-col space-x-2 md:space-x-0 list-inside ml-1">
          {#if type1JaName !== null}
            <li class={cTextStyle}>{type1JaName}</li>
            <li class={cTextStyle}>{type2JaName !== null ? type2JaName : ""}</li>
          {:else}
            <li class={cTextStyle}>???</li>
          {/if}
        </ul>
      </div>
      <!-- たかさ / おもさ -->
      <div class="grid grid-cols-2 md:grid-cols-1 gap-1">
        <div class="flex flex-row md:flex-col mb-2 mr-2 md:mr-4">
          <h2 class={cIndexStyle}>[たかさ]</h2>
          <ul class="flex space-x-2 md:space-x-4 list-inside ml-2">
            <li class={cTextStyle}>{formatHeightWeight(height, "height")}</li>
          </ul>
        </div>
        <div class="flex flex-row md:flex-col mb-2 mr-2 md:mr-4">
          <h2 class={cIndexStyle}>[おもさ]</h2>
          <ul class="flex space-x-2 md:space-x-4 list-inside ml-2">
            <li class={cTextStyle}>{formatHeightWeight(weight, "weight")}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- レーダーチャート -->
    <div class="md:w-2/5 m-2">
      <div class="flex flex-col items-center justify-center">
        <h2 class={cIndexStyle}>[ステータス]</h2>
        <canvas bind:this={chartCanvas}></canvas>
      </div>
    </div>
  </div>

  <footer class="p-4 bg-transparent" style="background-color: {footerColor};"></footer>
</div>
