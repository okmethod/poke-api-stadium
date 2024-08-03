<script lang="ts">
  import "../app.postcss";
  import { AppBar } from "@skeletonlabs/skeleton";
  import { Toast, Modal, initializeStores } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

  initializeStores();

  // Highlight JS
  import hljs from "highlight.js/lib/core";
  import "highlight.js/styles/github-dark.css";
  import { storeHighlightJs } from "@skeletonlabs/skeleton";
  import xml from "highlight.js/lib/languages/xml"; // for HTML
  import css from "highlight.js/lib/languages/css";
  import javascript from "highlight.js/lib/languages/javascript";
  import typescript from "highlight.js/lib/languages/typescript";

  hljs.registerLanguage("xml", xml); // for HTML
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("typescript", typescript);
  storeHighlightJs.set(hljs);

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import { base } from "$app/paths";
  import { goto } from "$app/navigation";
  let breadcrumbs: { segment: string; href: string }[] = [];
  onMount(() => {
    function updateBreadcrumbs(url: URL) {
      const path = url.pathname.replace(base, "");
      breadcrumbs = path
        .split("/")
        .filter(Boolean)
        .map((segment, index, array) => {
          const href = `${base}/${array.slice(0, index + 1).join("/")}`;
          return { segment, href };
        });
    }
    const unsubscribe = page.subscribe(($page) => {
      updateBreadcrumbs($page.url);
    });
    updateBreadcrumbs(get(page).url);
    return () => {
      unsubscribe();
    };
  });
</script>

<svelte:head>
  <title>PokeAPI Stadium</title>
</svelte:head>

<Modal />
<Toast position="tr" rounded="rounded-lg" />

<div class="flex min-h-screen flex-col">
  <div class="border-b border-gray-400">
    <AppBar class="!p-2">
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <div class="text-lg">top</div>
        </a>
        {#if breadcrumbs.length > 0}
          <div class="mx-2">/</div>
          {#each breadcrumbs as { segment, href }, i}
            <a {href} class="flex items-center" on:click|preventDefault={() => goto(href)}>
              <div class="text-lg">{segment}</div>
            </a>
            {#if i < breadcrumbs.length - 1}
              <div class="mx-2">/</div>
            {/if}
          {/each}
        {/if}
      </div>
    </AppBar>
  </div>

  <div class="container mx-auto flex-1 overflow-auto mt-4">
    <slot />
  </div>
</div>
