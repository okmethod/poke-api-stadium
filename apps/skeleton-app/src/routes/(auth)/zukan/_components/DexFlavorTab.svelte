<script lang="ts">
  import type { PokeData } from "$lib/domain/models/PokeData";

  interface Props {
    pokeData: PokeData | null;
  }
  let { pokeData }: Props = $props();
</script>

{#if !pokeData}
  <p class="text-surface-400 p-2 text-sm">???</p>
{:else if pokeData.flavorTexts.length === 0}
  <p class="text-surface-400 p-2 text-sm">図鑑テキストなし</p>
{:else}
  <ul class="space-y-3 p-2">
    {#each pokeData.flavorTexts as entry (entry.version)}
      <li class="bg-surface-100 rounded p-2 text-sm">
        <span class="text-surface-500 font-semibold">{entry.version}</span>
        <p class="mt-0.5">{entry.text}</p>
      </li>
    {/each}
  </ul>
{/if}
