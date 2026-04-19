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
    <div
      class="size-48 flex items-center justify-center text-4xl text-surface-400 border-2 border-dashed border-surface-300 rounded-xl"
    >
      ？
    </div>
  {:else}
    <img
      src={imageUrl}
      alt={isOpen ? pokeData.jaName : "???"}
      class="size-48 object-contain transition-all duration-700"
      style={isOpen ? "" : "filter: brightness(0);"}
    />
    {#if isOpen}
      <div class="text-center space-y-1">
        <p class="text-2xl font-bold">No.{pokeData.id} {pokeData.jaName}</p>
        <div class="flex gap-2 justify-center">
          <PokeTypeBadge type={pokeData.type1} />
          {#if pokeData.type2}
            <PokeTypeBadge type={pokeData.type2} />
          {/if}
        </div>
      </div>
    {:else}
      <p class="text-2xl font-bold text-surface-400">？？？</p>
    {/if}
  {/if}
</div>
