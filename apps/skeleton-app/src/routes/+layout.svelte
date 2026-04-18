<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { Portal, Toast } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import ThemeSwitchModal from "$lib/presentation/components/modals/ThemeSwitchModal.svelte";
  import AudioToggle from "$lib/presentation/components/buttons/AudioToggle.svelte";
  import { applyTheme } from "$lib/presentation/stores/themeStore";
  import { toaster } from "$lib/presentation/utils/toaster";

  let { children } = $props();

  let isLoaded = $state(false);
  onMount(async () => {
    function wait(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await Promise.all([applyTheme(), wait(500)]);
    isLoaded = true;
  });
</script>

<svelte:head>
  <title>PokeAPI スタジアム</title>
</svelte:head>

<Portal>
  <Toast.Group {toaster} class="fixed top-4 right-4 flex flex-col gap-2 z-50">
    {#snippet children(toast)}
      <Toast {toast} class="card p-4 rounded-lg w-64 md:w-96 shadow-lg">
        <div class="flex items-center gap-2 w-full">
          <Toast.Title class="flex-1">{toast.title}</Toast.Title>
          <Toast.CloseTrigger class="btn-icon btn-icon-sm preset-tonal shrink-0 ml-auto">
            <Icon icon="mdi:close" class="size-4" />
          </Toast.CloseTrigger>
        </div>
      </Toast>
    {/snippet}
  </Toast.Group>
</Portal>

{#if isLoaded}
  <div class="h-screen flex flex-col">
    <header class="shrink-0 p-2 shadow-md bg-surface-100-900">
      <div class="flex justify-between items-center">
        <!-- 左寄り -->
        <nav>
          <ul class="flex space-x-4 items-center justify-center">
            <li>
              <a class="btn preset-filled flex items-center gap-1 rounded-xl h-10 w-28" href="./">
                <Icon icon="mdi:home-outline" class="size-5" />
                <span>Home</span>
              </a>
            </li>
          </ul>
        </nav>
        <!-- 右寄り -->
        <nav>
          <ul class="flex space-x-4 items-center justify-center">
            <li>
              <AudioToggle />
            </li>
            <li>
              <ThemeSwitchModal />
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main
      class="flex-1 overflow-y-auto mx-auto w-full [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.25)_transparent]"
    >
      {@render children()}
    </main>
  </div>
{:else}
  <div class="h-screen flex items-center justify-center">
    <div class="font-mono text-3xl">Now Loading...</div>
  </div>
{/if}
