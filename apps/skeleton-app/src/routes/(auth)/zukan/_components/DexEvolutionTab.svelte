<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { EvolutionChain, EvolutionNode } from "$lib/domain/models/EvolutionChain";
  import { describeCondition } from "$lib/domain/models/EvolutionChain";

  interface Props {
    evolutionChain: EvolutionChain | null;
    currentPokemonId: number | null;
  }
  let { evolutionChain, currentPokemonId }: Props = $props();
</script>

{#if !evolutionChain}
  <p class="text-surface-400 p-2 text-sm">???</p>
{:else}
  {#snippet chainNode(node: EvolutionNode)}
    <div class="flex flex-col items-center justify-center gap-1 sm:flex-row">
      <div
        class="flex flex-col items-center gap-0.5 rounded-lg p-1 {node.speciesId === currentPokemonId
          ? 'bg-primary-500/20'
          : ''}"
      >
        <img src={node.imageUrl} alt={node.jaName} class="size-12 object-contain" />
        <span class="text-xs {node.speciesId === currentPokemonId ? 'text-primary-500 font-bold' : ''}">
          {node.jaName}
        </span>
      </div>
      {#if node.evolvesTo.length > 0}
        <div class="flex flex-col items-center gap-2">
          {#each node.evolvesTo as step (step.next.speciesName)}
            <div class="flex flex-col items-center gap-3 sm:flex-row">
              <div class="flex flex-col items-center gap-0.5">
                <Icon icon="mdi:arrow-down-thin" class="text-surface-400 size-4 sm:hidden" />
                <Icon icon="mdi:arrow-right-thin" class="text-surface-400 hidden size-4 sm:block" />
                <span class="text-surface-500 text-xs">{describeCondition(step.condition)}</span>
              </div>
              {@render chainNode(step.next)}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/snippet}

  <div class="p-2">
    {@render chainNode(evolutionChain.root)}
  </div>
{/if}
