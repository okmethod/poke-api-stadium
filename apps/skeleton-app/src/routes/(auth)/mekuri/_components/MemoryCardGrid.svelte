<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { MemoryCard } from "$lib/application/usecases/MemoryGame/store";

  interface Props {
    cards: MemoryCard[];
    onSelectCard: (index: number) => void;
  }

  let { cards, onSelectCard }: Props = $props();
</script>

<div class="grid grid-cols-4 gap-2">
  {#each cards as card, index (card.cardId)}
    <button
      type="button"
      class="card flex aspect-square items-center justify-center rounded-lg p-1 shadow transition-all
        {card.isMatched
        ? 'pointer-events-none opacity-50'
        : card.isFlipped
          ? 'preset-filled-primary-500 pointer-events-none'
          : 'preset-tonal hover:preset-filled-surface-200-800 cursor-pointer'}"
      onclick={() => onSelectCard(index)}
      disabled={card.isMatched}
    >
      {#if card.isFlipped || card.isMatched}
        <img src={card.pokeData.imageUrls.artwork.front} alt={card.pokeData.jaName} class="size-full object-contain" />
      {:else}
        <Icon icon="mdi:pokeball" class="size-8 opacity-50" />
      {/if}
    </button>
  {/each}
</div>
