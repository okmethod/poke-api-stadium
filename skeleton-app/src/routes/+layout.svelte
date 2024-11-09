<script lang="ts">
  import "../app.postcss";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { Toast, Modal, initializeStores, storePopup } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { setTheme } from "$lib/stores/theme";
  import { audioOn } from "$lib/stores/audio";
  import { generations, generationId, type GenerationId } from "$lib/stores/generation";
  import { pickRandomNumbers } from "$lib/utils/collections";
  import { loadFFmpeg } from "$lib/utils/convertOggToMp3.client";
  import { navigateTo } from "$lib/utils/navigation.client";
  import IconButton from "$lib/components/IconButton.svelte";

  export let data: {
    generationSymbolUrlDict: Record<number, string>;
    footerSymbolUrl: string;
  };

  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  let options = [
    { value: "", label: "" },
    ...Object.entries(generations).map(([value, { label }]) => ({ value, label })),
  ];

  let isLoaded = false;
  let currentAudioOn = false;
  let currentGenerationId: GenerationId | null = null;
  let currentGenerationImageUrl: string | null = null;
  onMount(async () => {
    currentAudioOn = get(audioOn);
    currentGenerationId = get(generationId);
    currentGenerationImageUrl = getSymbolImageUrl(currentGenerationId);
    options = options.filter((option) => option.value !== "");
    const audio = document.createElement("audio");
    const isSupportedOgg = !!audio.canPlayType('audio/ogg; codecs="vorbis"');

    function wait(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await Promise.all([setTheme({ name: "hamlindigo", dark: false }), loadFFmpeg(isSupportedOgg), wait(500)]);
    isLoaded = true;
  });

  function getSymbolImageUrl(generationId: GenerationId): string {
    const symbolPokeId = pickRandomNumbers(generations[generationId].symbolPokeIds, 1)[0];
    return data.generationSymbolUrlDict[symbolPokeId];
  }

  function toggleAudioOn() {
    currentAudioOn = !currentAudioOn;
    audioOn.set(currentAudioOn);
  }

  function handleGenerationChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    currentGenerationId = target.value as GenerationId;
    currentGenerationImageUrl = getSymbolImageUrl(currentGenerationId);
    generationId.set(currentGenerationId);
  }

  $: currentPath = $page.url.pathname;
  const visibleFooterPaths = [`${base}/`, `${base}/prototype`];
</script>

<svelte:head>
  <title>PokeAPI Stadium</title>
  <script src="https://cdn.jsdelivr.net/npm/matter-js@0.17.1/build/matter.min.js"></script>
</svelte:head>

<Modal />
<Toast position="tr" rounded="rounded-lg" />

{#if isLoaded}
  <div class="flex flex-col h-screen">
    <div class="relative border-b border-gray-400 bg-primary-300 p-1">
      <div class="flex items-center justify-between h-full space-x-2">
        <IconButton
          icon="mdi:home-outline"
          label="Home"
          cButton="variant-ghost bg-white text-gray-600 !space-x-0 !py-1 !px-2"
          onClick={() => navigateTo("/")}
        />
        <button
          type="button"
          class="btn-icon btn-icon-sm variant-ghost bg-white text-gray-500"
          on:click={toggleAudioOn}
        >
          <Icon icon={$audioOn ? "mdi:volume-high" : "mdi:volume-off"} class="w-6 h-6" />
        </button>
        <div class="flex-grow"><!--spacer--></div>
        <div class="w-9 h-9 variant-ghost bg-white border rounded-full">
          <img
            src={currentGenerationImageUrl}
            alt="generationSymbol"
            class="w-full h-full object-contain transform scale-150"
          />
        </div>
        <select
          id="generationId"
          bind:value={currentGenerationId}
          on:change={handleGenerationChange}
          class="w-24 h-8 py-1 px-2 m-1 text-sm variant-ghost bg-white text-gray-600 border border-0 rounded-sm"
        >
          {#each options as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="w-screen mx-auto overflow-y-scroll scrollbar-gutter-stable sm:ml-2 pb-24 sm:pb-10">
      <slot />
    </div>

    <footer class="absolute bottom-0 w-full h-2 flex items-center justify-end bg-transparent pointer-events-none">
      <div class="absolute bottom-0 mb-10 mr-4 w-20 h-20">
        {#if visibleFooterPaths.includes(currentPath)}
          <img src={data.footerSymbolUrl} alt="footerSymbol" />
        {/if}
      </div>
    </footer>
  </div>
{:else}
  <div class="flex items-center justify-center h-screen bg-gray-200 space-x-2">
    <div class="font-mono text-black text-2xl">Now Loading...</div>
    <img src={data.footerSymbolUrl} alt="footerSymbol" />
  </div>
{/if}
