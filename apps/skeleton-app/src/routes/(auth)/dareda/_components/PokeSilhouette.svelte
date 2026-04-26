<script lang="ts">
  import type { PokeData } from "$lib/domain/models/PokeData";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";

  interface Props {
    pokeData: PokeData | null;
    isOpen: boolean;
  }
  let { pokeData, isOpen }: Props = $props();

  // GIF優先、なければ公式アートワーク
  const imageUrl = $derived(pokeData?.imageUrls.gif.front ?? pokeData?.imageUrls.artwork.front ?? null);
</script>

<div class="flex flex-col items-center gap-3">
  {#if pokeData === null || imageUrl === null}
    <!-- プレースホルダー -->
    <div class="text-surface-400 border-surface-300 flex size-48 items-center justify-center rounded-xl text-4xl"></div>
    <p class="text-surface-400 h-16 text-2xl font-bold">？？？</p>
  {:else}
    <img
      src={imageUrl}
      alt={isOpen ? pokeData.jaName : "???"}
      class="size-48 object-contain transition-all duration-700"
      style={isOpen ? "" : "filter: brightness(0);"}
    />
    {#if isOpen}
      <div class="h-16 space-y-1 text-center">
        <p class="text-2xl font-bold">No.{pokeData.id} {pokeData.jaName}</p>
        <div class="flex justify-center gap-2">
          <PokeTypeBadge type={pokeData.type1} />
          {#if pokeData.type2}
            <PokeTypeBadge type={pokeData.type2} />
          {/if}
        </div>
      </div>
    {:else}
      <p class="text-surface-400 h-16 text-2xl font-bold">？？？</p>
    {/if}
  {/if}
</div>
