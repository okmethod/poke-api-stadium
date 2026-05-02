<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import { Tabs } from "@skeletonlabs/skeleton-svelte";
  import StatsRadarChart from "./StatsRadarChart.svelte";
  import StatsBarChart from "./StatsBarChart.svelte";

  interface Props {
    pokeData: PokeData | null;
  }
  let { pokeData }: Props = $props();

  let activeTab = $state("bar");
</script>

<Tabs
  value={activeTab}
  onValueChange={(e) => (activeTab = e.value)}
  orientation="vertical"
  class="flex h-full gap-2 p-2"
>
  <Tabs.List class="flex flex-col gap-1">
    <Tabs.Trigger
      value="bar"
      class="btn preset-tonal data-[selected]:preset-filled-primary rounded-lg px-3 py-1.5 text-xs"
    >
      <Icon icon="mdi:chart-bar" class="size-5 rotate-90" />
    </Tabs.Trigger>
    <Tabs.Trigger
      value="radar"
      class="btn preset-tonal data-[selected]:preset-filled-primary rounded-lg px-3 py-1.5 text-xs"
    >
      <Icon icon="mdi:hexagon-slice-6" class="size-5" />
    </Tabs.Trigger>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Content value="bar" class="flex-1 py-2">
    <StatsBarChart stats={pokeData?.stats ?? null} />
  </Tabs.Content>
  <Tabs.Content value="radar" class="flex flex-1 items-center justify-center">
    <StatsRadarChart stats={pokeData?.stats ?? null} />
  </Tabs.Content>
</Tabs>
