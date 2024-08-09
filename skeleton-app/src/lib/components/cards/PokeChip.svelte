<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/types/poke";

  export let pokeData: PokeData | null = null;

  const currentImageIndex = 0;
</script>

<div class="flex flex-col bg-gray-50 rounded-2xl shadow border h-[100px] w-[100px] overflow-hidden select-none">
  <div class="relative p-2 bg-transparent">
    <!-- タイトル部分 -->
    <div class="absolute inset-0 m-1 flex justify-center">
      <h1 class="text-xs font-bold text-gray-900">
        <div>{pokeData !== null ? pokeData.jaName : "???"}</div>
      </h1>
    </div>
    <!-- 画像部分 -->
    <div class="flex justify-center">
      <div class="flex items-center justify-center bg-white rounded-full border border-gray-200 h-[80px] w-[80px]">
        {#if pokeData !== null}
          <img
            src={pokeData.imageUrlArray[currentImageIndex]}
            alt={pokeData.jaName}
            class="w-full h-full object-cover"
          />
        {:else}
          <Icon icon="mdi:image-off-outline" class="w-8 h-8" />
        {/if}
      </div>
    </div>
  </div>
</div>
