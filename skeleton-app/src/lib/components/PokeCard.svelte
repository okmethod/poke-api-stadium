<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/types/poke";
  import { TYPES } from "$lib/types/type";
  import { formatHW } from "$lib/utils/numerics";

  export let pokeData: PokeData | null = null;

  const nullColor = "#888888";

  let headerColor = nullColor;
  let footerColor = nullColor;
  $: if (pokeData !== null) {
    headerColor = TYPES[pokeData.type1.enName]?.color ?? nullColor;
    footerColor = pokeData.type2 !== null ? (TYPES[pokeData.type2.enName]?.color ?? nullColor) : headerColor;
  }

  let currentImageIndex = 0;
  function toggleImage() {
    currentImageIndex = (currentImageIndex + 1) % 2;
  }
</script>

<div class="grid border bg-gray-50 rounded-2xl shadow max-w-[500px] overflow-hidden">
  <header class="p-4 bg-transparent" style="background-color: {headerColor};"></header>

  <!-- タイトル部分 -->
  <div class="p-2 bg-transparent">
    <h1 class="text-2xl font-bold text-gray-900">
      {#if pokeData !== null}
        <div class="flex flex-col sm:flex-row items-start sm:items-center">
          <div>{pokeData.jaName} : {pokeData.enName}</div>
          <span class="text-lg font-normal text-gray-700 ml-0 sm:ml-4">
            {pokeData !== null ? pokeData.jaGenus : "???"}
          </span>
        </div>
      {:else}
        ???
      {/if}
    </h1>
  </div>

  <div class="grid md:grid-cols-2 w-full mb-2 bg-transparent">
    <!-- 画像部分 -->
    <div class="p-2 flex justify-center">
      <div class="w-48 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
        {#if pokeData !== null}
          <button type="button" on:click={toggleImage} aria-label="Toggle Image">
            <img src={pokeData.imageUrl[currentImageIndex]} alt={pokeData.jaName} class="w-48 h-48" />
          </button>
        {:else}
          <Icon icon="mdi:image-off-outline" height="40" />
        {/if}
      </div>
    </div>

    <!-- 情報部分 -->
    <div class="p-2">
      <div class="mb-2 flex items-center space-x-4">
        <h2 class="text-l font-semibold text-gray-700">[タイプ]</h2>
        <ul class="list-inside flex space-x-4">
          {#if pokeData !== null}
            <li class="text-gray-600">{pokeData?.type1.jaName}</li>
            <li class="text-gray-600">{pokeData?.type2 !== null ? pokeData?.type2.jaName : ""}</li>
          {:else}
            <li class="text-gray-600">???</li>
          {/if}
        </ul>
      </div>
      <div class="mb-2 flex items-center space-x-4">
        <h2 class="text-l font-semibold text-gray-700">[たかさ]</h2>
        <p class="text-gray-600">{formatHW(pokeData?.height)} m</p>
      </div>
      <div class="mb-2 flex items-center space-x-4">
        <h2 class="text-l font-semibold text-gray-700">[おもさ]</h2>
        <p class="text-gray-600">{formatHW(pokeData?.weight)} kg</p>
      </div>
    </div>
  </div>

  <footer class="p-4 bg-transparent" style="background-color: {footerColor};"></footer>
</div>
