<script lang="ts">
  import type { PokeData } from "$lib/domain/models/PokeData";
  import StatsRadarChart from "./StatsRadarChart.svelte";

  interface Props {
    pokeData: PokeData | null;
  }
  let { pokeData }: Props = $props();
</script>

<div class="flex items-center justify-center p-2">
  <!-- ステータスレーダーチャート -->
  <StatsRadarChart stats={pokeData?.stats ?? null} />
</div>
