<script lang="ts">
  import type { PokeStats } from "$lib/domain/models/PokeData";
  import { pokeStatJaName } from "$lib/domain/models/PokeData";
  import { Progress } from "@skeletonlabs/skeleton-svelte";

  interface StatsBarChartProps {
    stats: PokeStats | null;
  }
  let { stats }: StatsBarChartProps = $props();

  const MAX_STAT = 255;
  const STAT_KEYS: (keyof PokeStats)[] = ["hp", "attack", "defense", "spAtk", "spDef", "speed"];

  const statItems = $derived(STAT_KEYS.map((k) => ({ label: pokeStatJaName(k), value: stats?.[k] ?? 0 })));
</script>

<div class="flex w-full flex-col gap-2">
  {#each statItems as { label, value } (label)}
    <div class="flex items-center gap-2">
      <span class="w-16 shrink-0 text-right text-xs">{label}</span>
      <Progress {value} max={MAX_STAT} class="flex-1">
        <Progress.Track class="h-3 rounded-full">
          <Progress.Range class="bg-primary-500 rounded-full" />
        </Progress.Track>
      </Progress>
      <span class="w-8 shrink-0 text-right text-xs tabular-nums">{value}</span>
    </div>
  {/each}
</div>
