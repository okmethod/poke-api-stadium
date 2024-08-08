<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/types/poke";
  import { TYPE_DICT, nullColor } from "$lib/types/type";

  export let pokeData: PokeData | null = null;

  let headerColor = nullColor;
  let footerColor = nullColor;
  $: if (pokeData !== null) {
    headerColor = TYPE_DICT[pokeData.type1.enName]?.color ?? nullColor;
    footerColor = pokeData.type2 !== null ? (TYPE_DICT[pokeData.type2.enName]?.color ?? nullColor) : headerColor;
  }

  const currentImageIndex = 0;
</script>

<div class="select-none relative grid border bg-gray-50 rounded-2xl shadow h-[150px] w-[150px] overflow-hidden">
  <header class="absolute top-0 p-4 bg-transparent w-full z-10" style="background-color: {headerColor};"></header>

  <div class="relative p-2 bg-transparent z-20">
    <!-- タイトル部分 -->
    <div class="flex justify-center">
      <h1 class="bg-white bg-opacity-50 text-xl font-bold text-gray-900">
        <div>{pokeData !== null ? pokeData.jaName : "???"}</div>
      </h1>
    </div>
    <!-- 画像部分 -->
    <div class="flex justify-center">
      <div class="bg-white rounded-full border border-gray-200 flex items-center justify-center">
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

  <footer class="absolute bottom-0 p-4 bg-transparent w-full z-10" style="background-color: {footerColor};"></footer>
</div>
