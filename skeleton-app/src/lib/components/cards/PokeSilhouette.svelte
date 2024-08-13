<script lang="ts">
  import Icon from "@iconify/svelte";
  import { TypeName } from "$lib/types/type";
  import { fetchTypeData } from "$lib/constants/fetchStaticData";
  import { FIRST_ADDITIONAL_POKE_ID } from "$lib/constants/common";

  export let pokeId: number | null = null;
  export let name: string | null = null;
  export let type1Name: TypeName | null = null;
  export let type2Name: TypeName | null = null;
  export let imageUrl: string | null = null;
  export let imageBackUrl: string | null = null;
  export let isOpen: boolean = false;

  let unknownColor = "";
  let headerColor = "";
  let footerColor = "";
  async function updateColors() {
    if (unknownColor === "") unknownColor = (await fetchTypeData(TypeName.Unknown)).themeColor;
    headerColor = type1Name ? (await fetchTypeData(type1Name)).themeColor : unknownColor;
    footerColor = type2Name ? (await fetchTypeData(type2Name)).themeColor : headerColor;
  }

  let isImageLoaded: boolean = false;
  let viewName = "???";
  $: if (pokeId) {
    isImageLoaded = false;
    currentImageBoolean = true;
    if (imageBackUrl) {
      // 背面画像も事前に読み込んでおく
      const img = new Image();
      img.src = imageBackUrl;
    }
    if (name !== null) {
      if (pokeId < FIRST_ADDITIONAL_POKE_ID) {
        viewName = name;
      } else {
        viewName = `とくべつな ${name}`;
      }
    }
    void updateColors();
  }

  let imageElement: HTMLImageElement;
  let cPadding = "";
  function handleImageLoad() {
    if (cPadding === "") cPadding = _adjustImagePadding(imageElement.naturalWidth, imageElement.naturalHeight);
    isImageLoaded = true;

    function _adjustImagePadding(imageWidth: number, imageHeight: number): string {
      const aspectRatio = imageWidth / imageHeight;

      function _isAspectRatioInRange(aspectRatio: number): boolean {
        const threshold = 0.3;
        return aspectRatio >= 1 - threshold && aspectRatio <= 1 + threshold;
      }

      if (_isAspectRatioInRange(aspectRatio)) {
        // 縦横比が小さい場合は余白を追加
        return "p-4";
      }
      // 縦横比が大きい場合はそのまま
      return "p-0";
    }
  }

  let currentImageBoolean = true; // true: 表面画像, false: 背面画像
  function toggleImage(): void {
    currentImageBoolean = !currentImageBoolean;
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
        <div>{isOpen ? viewName : "???"}</div>
      </h1>
    </div>
    <!-- 画像部分 -->
    <div class="flex justify-center">
      <div class="flex items-center h-[200px] w-[200px] justify-center bg-white rounded-2xl border border-gray-200">
        {#if imageUrl !== null}
          <button
            type="button"
            on:click={toggleImage}
            class="w-full h-full {cPadding}"
            style="-webkit-tap-highlight-color: transparent;"
          >
            <img
              src={currentImageBoolean ? imageUrl : imageBackUrl}
              alt={viewName}
              class="w-full h-full object-contain"
              style={isOpen ? "" : "filter: brightness(0);"}
              class:image={!isImageLoaded}
              class:loaded={isImageLoaded}
              bind:this={imageElement}
              on:load={handleImageLoad}
            />
          </button>
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
