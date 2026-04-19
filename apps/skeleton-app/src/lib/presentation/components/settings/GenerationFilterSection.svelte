<script lang="ts">
  import { Listbox, useListCollection } from "@skeletonlabs/skeleton-svelte";
  import { ALL_GENERATION_NUMBERS, generationData } from "$lib/domain/models/PokeData/generation";
  import type { GenerationNumber } from "$lib/domain/models/PokeData/generation";
  import { generationStore, setSelectedGenerations } from "$lib/application/stores/generationStore";

  const items = ALL_GENERATION_NUMBERS.map((gen) => ({
    value: String(gen),
    gen,
    label: generationData(gen)?.label ?? `第${gen}世代`,
    titles: generationData(gen)?.titles ?? "",
  }));

  const collection = useListCollection({
    items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const isAllSelected = $derived($generationStore.length === ALL_GENERATION_NUMBERS.length);

  function handleValueChange(values: string[]) {
    // 最後の1つは解除させない
    if (values.length === 0) return;
    const gens = values.map(Number).sort((a, b) => a - b) as GenerationNumber[];
    setSelectedGenerations(gens);
  }

  function selectAll() {
    setSelectedGenerations([...ALL_GENERATION_NUMBERS]);
  }

  function resetToFirst() {
    setSelectedGenerations([1]);
  }
</script>

<div class="space-y-2">
  <div class="flex justify-end">
    <button
      type="button"
      onclick={isAllSelected ? resetToFirst : selectAll}
      class="btn preset-tonal rounded-lg text-sm"
    >
      {isAllSelected ? "選択解除" : "すべて選択"}
    </button>
  </div>
  <Listbox
    class="w-full"
    {collection}
    selectionMode="multiple"
    value={$generationStore.map(String)}
    onValueChange={(e) => handleValueChange(e.value)}
  >
    <Listbox.Content>
      {#each collection.items as item (item.value)}
        <Listbox.Item {item} class="data-[selected]:preset-tonal-primary">
          <Listbox.ItemText>
            <span class="font-bold">{item.label}</span>
            <span class="ml-2 text-xs opacity-60">{item.titles}</span>
          </Listbox.ItemText>
          <Listbox.ItemIndicator />
        </Listbox.Item>
      {/each}
    </Listbox.Content>
  </Listbox>
</div>
