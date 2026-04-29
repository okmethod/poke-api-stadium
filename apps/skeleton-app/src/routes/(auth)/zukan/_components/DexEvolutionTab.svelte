<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import type { EvolutionChain, EvolutionNode } from "$lib/domain/models/EvolutionChain";
  import { describeCondition } from "$lib/domain/models/EvolutionChain";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";

  interface Props {
    pokeData: PokeData | null;
  }
  let { pokeData }: Props = $props();

  let evolutionChain = $state<EvolutionChain | null>(null);
  let isLoading = $state(false);
  let fetchError = $state<string | null>(null);

  $effect(() => {
    if (!pokeData) {
      evolutionChain = null;
      return;
    }

    const chainUrl = pokeData.evolutionChainRef.url;
    let cancelled = false;

    isLoading = true;
    fetchError = null;
    evolutionChain = null;

    getPokeRepository()
      .getEvolutionChain(fetch, chainUrl)
      .then((data) => {
        if (!cancelled) evolutionChain = data;
      })
      .catch((err) => {
        if (!cancelled) {
          fetchError = "進化データを取得できませんでした";
          console.error("Failed to fetch evolution chain:", err);
        }
      })
      .finally(() => {
        if (!cancelled) isLoading = false;
      });

    return () => {
      cancelled = true;
    };
  });
</script>

{#if !pokeData}
  <p class="text-surface-400 p-2 text-sm">???</p>
{:else if isLoading}
  <div class="flex h-full items-center justify-center p-4">
    <Icon icon="mdi:loading" class="text-surface-400 size-6 animate-spin" />
  </div>
{:else if fetchError}
  <p class="text-error-500 p-2 text-sm">{fetchError}</p>
{:else if evolutionChain}
  {#snippet chainNode(node: EvolutionNode)}
    <div class="flex flex-col items-center justify-center gap-1 sm:flex-row">
      <div
        class="flex flex-col items-center gap-0.5 rounded-lg p-1 {node.speciesId === pokeData?.id
          ? 'bg-primary-500/20'
          : ''}"
      >
        <img src={node.imageUrl} alt={node.jaName} class="size-12 object-contain" />
        <span class="text-xs {node.speciesId === pokeData?.id ? 'text-primary-500 font-bold' : ''}">
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
