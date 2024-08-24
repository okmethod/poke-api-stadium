<script lang="ts">
  import "../app.postcss";
  import { onMount } from "svelte";
  import { Toast, Modal, initializeStores, storePopup } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { generations, generationId, type GenerationId } from "$lib/stores/generation.js";
  import { pickRandomNumbers } from "$lib/utils/collections";
  import { navigateTo } from "$lib/utils/navigation.client";

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

  let currentGenerationId: GenerationId | null = null;
  let currentGenerationImageUrl: string | null = null;
  onMount(() => {
    if (typeof localStorage !== "undefined") {
      const savedGenerationId = localStorage.getItem("generationId") as GenerationId;
      if (savedGenerationId) generationId.set(savedGenerationId);
      options = options.filter((option) => option.value !== "");
    }
  });

  generationId.subscribe((value: GenerationId) => {
    currentGenerationId = value;
    const currentSymbolPokeId = pickRandomNumbers(generations[value].symbolPokeIds, 1)[0];
    currentGenerationImageUrl = data.generationSymbolUrlDict[currentSymbolPokeId];
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("generationId", value);
    }
  });

  function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    generationId.set(target.value as GenerationId);
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

<div class="flex flex-col h-screen">
  <div class="relative border-b border-gray-400 bg-gray-100">
    <div class="flex items-center justify-between h-full">
      <a
        href="/"
        class="flex flex-row items-center space-x-1 pt-1 pb-1 pl-1 pr-2 m-1 text-sm text-gray-500 bg-white border border-gray-400 rounded-md"
        on:click|preventDefault={() => navigateTo("/")}
      >
        <div class="w-5 h-5">
          <Icon icon="mdi:home-outline" class="text-gray-500 w-full h-full" />
        </div>
        <span class="">HOME</span>
      </a>
      <div class="flex-grow"><!--spacer--></div>
      <div class="w-8 h-8 bg-white border border-gray-400 rounded-full">
        <img
          src={currentGenerationImageUrl}
          alt="generationSymbol"
          class="w-full h-full object-contain transform scale-150"
        />
      </div>
      <select
        id="generationId"
        bind:value={currentGenerationId}
        on:change={handleChange}
        class="w-24 pt-1 pb-1 pl-2 pr-2 m-1 text-sm text-gray-500 border-gray-400 rounded-md"
      >
        {#each options as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="container mx-auto overflow-y-auto pb-16">
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
