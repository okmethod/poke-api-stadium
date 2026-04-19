<script lang="ts">
  import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import { ALL_GENERATION_NUMBERS, generationData } from "$lib/domain/models/PokeData/generation";
  import type { GenerationNumber } from "$lib/domain/models/PokeData/generation";
  import { generationStore, setSelectedGenerations } from "$lib/application/stores/generationStore";

  let openState = $state(false);
  let selected = $state<GenerationNumber[]>($generationStore);

  // モーダルを開くたびにストアの現在値で初期化
  function handleOpenChange(e: { open: boolean }) {
    openState = e.open;
    if (e.open) selected = [...$generationStore];
  }

  function toggleGeneration(gen: GenerationNumber) {
    if (selected.includes(gen)) {
      // 最後の1つは解除させない
      if (selected.length === 1) return;
      selected = selected.filter((g) => g !== gen);
    } else {
      selected = [...selected, gen].sort((a, b) => a - b);
    }
  }

  function selectAll() {
    selected = [...ALL_GENERATION_NUMBERS];
  }

  function apply() {
    setSelectedGenerations(selected);
    openState = false;
  }

  const isAllSelected = $derived(selected.length === ALL_GENERATION_NUMBERS.length);
</script>

<Dialog open={openState} onOpenChange={handleOpenChange}>
  <Dialog.Trigger class="btn preset-filled h-10 rounded-xl px-3">
    <Icon icon="mdi:pokeball" class="size-4" />
    <span class="ml-1 text-sm">
      {#if $generationStore.length === ALL_GENERATION_NUMBERS.length}
        全世代
      {:else}
        {$generationStore.length}世代
      {/if}
    </span>
  </Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
    <Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Content class="card bg-surface-100-900 mx-auto w-11/12 max-w-md space-y-4 p-4 shadow-xl">
        <header class="flex items-center justify-between">
          <h2 class="text-xl font-bold">世代フィルター</h2>
          <button type="button" class="btn preset-tonal rounded-full" onclick={() => (openState = false)}>
            <Icon icon="mdi:close" class="size-4" />
          </button>
        </header>

        <ul class="grid grid-cols-3 gap-2">
          {#each ALL_GENERATION_NUMBERS as gen (gen)}
            {@const data = generationData(gen)}
            <li>
              <button
                type="button"
                onclick={() => toggleGeneration(gen)}
                class={`btn flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left text-sm ${
                  selected.includes(gen) ? "preset-outlined-primary-500" : "preset-filled-surface-200-800"
                }`}
                aria-pressed={selected.includes(gen)}
              >
                <span class="font-bold">{data?.label ?? `第${gen}世代`}</span>
                <span class="text-xs opacity-60">{data?.titles ?? ""}</span>
              </button>
            </li>
          {/each}
        </ul>

        <footer class="flex items-center justify-between gap-2">
          <button
            type="button"
            onclick={selectAll}
            disabled={isAllSelected}
            class="btn preset-tonal rounded-lg text-sm disabled:opacity-40"
          >
            すべて選択
          </button>
          <button type="button" onclick={apply} class="btn preset-filled-primary-500 rounded-lg text-sm"> 決定 </button>
        </footer>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
