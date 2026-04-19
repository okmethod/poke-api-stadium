<script lang="ts">
  import { ALL_GENERATION_NUMBERS, generationData } from "$lib/domain/models/PokeData/generation";
  import type { GenerationNumber } from "$lib/domain/models/PokeData/generation";
  import { generationStore, setSelectedGenerations } from "$lib/application/stores/generationStore";

  const isAllSelected = $derived($generationStore.length === ALL_GENERATION_NUMBERS.length);

  function toggle(gen: GenerationNumber) {
    const current = $generationStore;
    if (current.includes(gen)) {
      // 最後の1つは解除させない
      if (current.length === 1) return;
      setSelectedGenerations(current.filter((g) => g !== gen));
    } else {
      setSelectedGenerations([...current, gen].sort((a, b) => a - b));
    }
  }

  function selectAll() {
    setSelectedGenerations([...ALL_GENERATION_NUMBERS]);
  }
</script>

<div class="space-y-2">
  <ul class="grid grid-cols-3 gap-2">
    {#each ALL_GENERATION_NUMBERS as gen (gen)}
      {@const data = generationData(gen)}
      <li>
        <button
          type="button"
          onclick={() => toggle(gen)}
          class={`btn flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left text-sm ${
            $generationStore.includes(gen) ? "preset-outlined-primary-500" : "preset-filled-surface-200-800"
          }`}
          aria-pressed={$generationStore.includes(gen)}
        >
          <span class="font-bold">{data?.label ?? `第${gen}世代`}</span>
          <span class="text-xs opacity-60">{data?.titles ?? ""}</span>
        </button>
      </li>
    {/each}
  </ul>
  <button
    type="button"
    onclick={selectAll}
    disabled={isAllSelected}
    class="btn preset-tonal rounded-lg text-sm disabled:opacity-40"
  >
    すべて選択
  </button>
</div>
