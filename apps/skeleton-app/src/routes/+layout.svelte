<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { Portal, Toast } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import { applyTheme } from "$lib/presentation/stores/themeStore";
  import { toaster } from "$lib/presentation/utils/toaster";
  import { starterIconUrlStore } from "$lib/application/stores/generationStore";
  import AudioToggle from "$lib/presentation/components/buttons/AudioToggle.svelte";
  import SettingsModal from "$lib/presentation/components/modals/SettingsModal.svelte";

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
  <Toast.Group {toaster} class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    {#snippet children(toast)}
      <Toast {toast} class="card w-64 rounded-lg p-4 shadow-lg md:w-96">
        <div class="flex w-full items-center gap-2">
          <Toast.Title class="flex-1">{toast.title}</Toast.Title>
          <Toast.CloseTrigger class="btn-icon btn-icon-sm preset-tonal ml-auto shrink-0">
            <Icon icon="mdi:close" class="size-4" />
          </Toast.CloseTrigger>
        </div>
      </Toast>
    {/snippet}
  </Toast.Group>
</Portal>

{#if isLoaded}
  <div class="flex h-screen flex-col">
    <header class="bg-surface-100-900 shrink-0 p-2 shadow-md">
      <div class="flex items-center justify-between">
        <!-- 左寄り -->
        <nav>
          <ul class="flex items-center justify-center space-x-4">
            <li>
              <a class="btn preset-filled flex h-10 w-28 items-center gap-1 rounded-xl" href="./">
                <Icon icon="mdi:home-outline" class="size-5" />
                <span>Home</span>
              </a>
            </li>
            <li>
              <AudioToggle />
            </li>
          </ul>
        </nav>
        <!-- 右寄り -->
        <nav>
          <ul class="flex items-center justify-center space-x-4">
            <li>
              <div class="size-10 overflow-hidden rounded-full bg-white shadow-md">
                <img src={$starterIconUrlStore} alt="starter" class="size-full scale-150 object-contain" />
              </div>
            </li>
            <li>
              <SettingsModal />
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main
      class="mx-auto w-full flex-1 overflow-y-auto [scrollbar-color:rgba(0,0,0,0.25)_transparent] [scrollbar-width:thin]"
    >
      {@render children()}
    </main>
  </div>
{:else}
  <div class="flex h-screen items-center justify-center">
    <div class="font-mono text-3xl">Now Loading...</div>
  </div>
{/if}
