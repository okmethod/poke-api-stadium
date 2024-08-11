<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { TypeName } from "$lib/types/type";
  import { TYPE_COLOR_DICT } from "$lib/constants/staticTypeData";

  export let name: string | null = null;
  export let type1Name: TypeName | null = null;
  export let type2Name: TypeName | null = null;
  export let imageUrl: string | null = null;
  export let isOpen: boolean = false;

  const unknownColor = TYPE_COLOR_DICT["unknown"].themeColor;
  let headerColor = unknownColor;
  let footerColor = unknownColor;
  $: if (name) {
    headerColor = type1Name ? TYPE_COLOR_DICT[type1Name].themeColor : unknownColor;
    footerColor = type2Name ? TYPE_COLOR_DICT[type2Name].themeColor : headerColor;
  }

  let isImageLoaded = false;
  function handleImageLoad() {
    isImageLoaded = true;
  }
  $: if (imageUrl) {
    isImageLoaded = false;
  }
</script>

<div
  class="relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[300px] w-[300px] overflow-hidden select-none"
>
  <header
    class="absolute top-0 w-full z-10 p-4 bg-transparent"
    style="background-color: {isOpen ? headerColor : unknownColor};"
  ></header>

  <div class="p-2 bg-transparent z-20">
    <!-- タイトル部分 -->
    <div class="flex justify-center">
      <h1 class="mt-6 bg-white bg-opacity-50 text-xl font-bold text-gray-900">
        <div>{isOpen ? (name ?? "???") : "???"}</div>
      </h1>
    </div>
    <!-- 画像部分 -->
    <div class="flex justify-center">
      <div class="flex items-center h-[200px] w-[200px] justify-center bg-white rounded-2xl border border-gray-200">
        {#if imageUrl !== null}
          <img
            src={imageUrl}
            alt={name ?? "???"}
            class="w-full h-full object-contain"
            style={isOpen ? "" : "filter: brightness(0);"}
            class:image={!isImageLoaded}
            class:loaded={isImageLoaded}
            on:load={handleImageLoad}
          />
          {#if !isImageLoaded}
            <div class="absolute inset-0 flex items-center justify-center h-full">
              <Icon icon="mdi:progress-download" class="w-full h-full text-white bg-gray-100 object-cover" />
            </div>
          {/if}
        {:else}
          <div class="absolute inset-0 flex items-center justify-center h-full">
            <Icon icon="mdi:image-off-outline" class="w-8 h-8 bg-white" />
          </div>
        {/if}
      </div>
    </div>
  </div>

  <footer
    class="absolute bottom-0 w-full z-10 p-4 bg-transparent"
    style="background-color: {isOpen ? footerColor : unknownColor};"
  ></footer>
</div>
