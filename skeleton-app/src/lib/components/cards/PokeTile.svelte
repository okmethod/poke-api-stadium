<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { TypeName } from "$lib/types/type";
  import { TYPE_COLOR_DICT } from "$lib/constants/staticTypeData";

  export let name: string | null = null;
  export let type1Name: TypeName | null = null;
  export let type2Name: TypeName | null = null;
  export let imageUrl: string | null = null;

  let headerColor = TYPE_COLOR_DICT["unknown"];
  let footerColor = TYPE_COLOR_DICT["unknown"];
  $: if (name) {
    headerColor = type1Name ? TYPE_COLOR_DICT[type1Name] : TYPE_COLOR_DICT["unknown"];
    footerColor = type2Name ? TYPE_COLOR_DICT[type2Name] : headerColor;
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
  class="relative flex flex-col bg-gray-50 rounded-2xl shadow border h-[150px] w-[150px] overflow-hidden select-none"
>
  <header class="absolute top-0 w-full z-10 p-4 bg-transparent" style="background-color: {headerColor};"></header>

  <div class="p-2 bg-transparent z-20">
    <!-- タイトル部分 -->
    <div class="flex justify-center">
      <h1 class="bg-white bg-opacity-50 text-xl font-bold text-gray-900">
        <div>{name ?? "???"}</div>
      </h1>
    </div>
    <!-- 画像部分 -->
    <div class="flex justify-center">
      <div class="flex items-center justify-center bg-white rounded-full border border-gray-200">
        {#if imageUrl !== null}
          <img
            src={imageUrl}
            alt={name ?? "???"}
            class="w-full h-full object-cover"
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

  <footer class="absolute bottom-0 w-full z-10 p-4 bg-transparent" style="background-color: {footerColor};"></footer>
</div>
