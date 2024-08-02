<script lang="ts">
  import "../app.postcss";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
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
</script>

<svelte:head>
  <title>OK SITE</title>
</svelte:head>

<Modal />
<Toast position="tr" rounded="rounded-lg" />

<div class="flex min-h-screen flex-col">
  <div class="border-b border-gray-400">
    <AppBar class="!p-2">
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <Icon icon="mdi-light:home" height="20" />
          <div class="text-lg">Top</div>
        </a>
      </div>
    </AppBar>
  </div>

  <div class="container mx-auto flex-1 overflow-auto mt-4">
    <slot />
  </div>
</div>
