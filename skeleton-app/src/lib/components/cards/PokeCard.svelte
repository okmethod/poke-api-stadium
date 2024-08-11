<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { Chart, registerables } from "chart.js";
  import type { PokeData } from "$lib/types/poke";
  import { formatHeightWeight } from "$lib/utils/numerics";
  import { TYPE_COLOR_DICT } from "$lib/constants/staticTypeData";

  export let pokeData: PokeData | null;

  let spritesLength = 0;
  let headerColor = TYPE_COLOR_DICT["unknown"].themeColor;
  let footerColor = TYPE_COLOR_DICT["unknown"].themeColor;
  $: if (pokeData !== null) {
    spritesLength = pokeData.imageUrlArray.length;
    headerColor = TYPE_COLOR_DICT[pokeData.type1.enName].themeColor;
    footerColor = pokeData.type2 !== null ? TYPE_COLOR_DICT[pokeData.type2.enName].themeColor : headerColor;
    statsData = [
      pokeData?.stats.hp,
      pokeData?.stats.attack,
      pokeData?.stats.defense,
      pokeData?.stats.speed,
      pokeData?.stats.specialDefense,
      pokeData?.stats.specialAttack,
    ];
    if (chartInstance) {
      chartInstance.data.datasets[0].data = statsData;
      chartInstance.update();
    }
  }

  let currentImageIndex = 0;
  function toggleImage(): void {
    if (spritesLength > 1) {
      currentImageIndex = (currentImageIndex + 1) % spritesLength;
    }
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
        {#if pokeData !== null}
          <div>{pokeData.jaName} : {pokeData.enName}</div>
          <span class="text-lg font-normal text-gray-700 md:ml-4">
            {pokeData !== null ? pokeData.jaGenus : "???"}
          </span>
        {:else}
          ???
        {/if}
      </div>
    </h1>
  </div>

  <!-- データ部 -->
  <div class="flex flex-wrap md:flex-nowrap w-full min-h-[280px] items-center justify-center">
    <!-- 画像 -->
    <div class="md:w-2/5 m-2 md:p-4">
      <div class="relative w-48 h-48 bg-white rounded-lg border border-gray-200">
        {#if pokeData !== null}
          <button type="button" on:click={toggleImage}>
            <img
              src={pokeData.imageUrlArray[currentImageIndex]}
              alt={pokeData.jaName}
              class="absolute top-0 left-0 w-full h-full object-contain"
            />
            <div class="absolute bottom-0 right-0 m-2">
              <Icon icon="mdi:image-refresh-outline" class="w-4 h-4" />
            </div>
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
          {#if pokeData !== null}
            <li class={cTextStyle}>{pokeData?.type1.jaName}</li>
            <li class={cTextStyle}>{pokeData?.type2 !== null ? pokeData?.type2.jaName : ""}</li>
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
            <li class={cTextStyle}>{formatHeightWeight(pokeData?.height, "height")}</li>
          </ul>
        </div>
        <div class="flex flex-row md:flex-col mb-2 mr-2 md:mr-4">
          <h2 class={cIndexStyle}>[おもさ]</h2>
          <ul class="flex space-x-2 md:space-x-4 list-inside ml-2">
            <li class={cTextStyle}>{formatHeightWeight(pokeData?.weight, "weight")}</li>
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
