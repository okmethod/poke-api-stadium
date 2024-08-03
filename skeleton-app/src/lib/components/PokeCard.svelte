<script lang="ts">
  import type { PokeData } from "$lib/types/poke";
  import Icon from "@iconify/svelte";

  export let pokeData: PokeData | null = null;

  let currentImageIndex = 0;
  function toggleImage() {
    currentImageIndex = (currentImageIndex + 1) % 2;
  }

  function formatValue(value: number | undefined): string {
    return value !== undefined ? (value * 0.1).toFixed(1) : "??";
  }
</script>

<div class="grid border bg-gray-50 border-gray-300 rounded-lg shadow-lg max-w-[600px]">
  <header class="p-4 bg-red-100"></header>
  <!-- タイトル部分 -->
  <div class="p-2">
    <h1 class="text-2xl font-bold text-gray-900">
      {pokeData?.jaName} : {pokeData?.enName}
      <span class="text-lg font-normal text-gray-700 ml-4">{pokeData?.jaGenus}</span>
    </h1>
  </div>
  <div class="grid md:grid-cols-2 w-full">
    <!-- 画像部分 -->
    <div class="p-2 flex justify-center">
      <div class="w-48 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
        {#if pokeData !== null}
          <button type="button" on:click={toggleImage} aria-label="Toggle Image">
            <img src={pokeData?.imageUrl[currentImageIndex]} alt={pokeData?.jaName} class="w-48 h-48" />
          </button>
        {:else}
          <Icon icon="mdi:image-off-outline" height="40" />
        {/if}
      </div>
    </div>
    <!-- 情報部分 -->
    <div class="p-2">
      <div class="mb-2">
        <h2 class="text-xl font-semibold text-gray-700">タイプ</h2>
        <ul class="list-inside flex space-x-4">
          <li class="text-gray-600">{pokeData?.type1Name}</li>
          <li class="text-gray-600">{pokeData?.type2Name !== null ? pokeData?.type2Name : "なし"}</li>
        </ul>
      </div>
      <div class="mb-2">
        <h2 class="text-xl font-semibold text-gray-700">たかさ</h2>
        <p class="text-gray-600">{formatValue(pokeData?.height)} m</p>
      </div>
      <div class="mb-2">
        <h2 class="text-xl font-semibold text-gray-700">おもさ</h2>
        <p class="text-gray-600">{formatValue(pokeData?.weight)} kg</p>
      </div>
    </div>
  </div>
  <footer class="p-4 bg-red-100"></footer>
</div>
