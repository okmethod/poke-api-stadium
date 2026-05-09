<script lang="ts">
  import type { PokeTypeName } from "$lib/domain/models/PokeType";
  import { pokeTypeJaName, pokeTypeColor, pokeTypeId } from "$lib/domain/models/PokeType";
  import { pokeTypeSymbolUrl } from "$lib/infrastructure/api/pokeSprites";

  interface Props {
    type: PokeTypeName;
    size?: "xs" | "sm" | "md";
    iconOnly?: boolean;
  }
  let { type, size = "sm", iconOnly = false }: Props = $props();

  const badgeClass = $derived(
    size === "xs"
      ? "h-5 rounded px-1.5 py-0.5 text-xs"
      : size === "sm"
        ? "h-6 rounded-full px-3 py-1 text-sm"
        : "h-full w-full rounded px-4 py-2 text-base",
  );

  const iconSizeClass = $derived(size === "xs" ? "size-5" : size === "sm" ? "size-6" : "size-8");
</script>

{#if iconOnly}
  <img
    src={pokeTypeSymbolUrl(pokeTypeId(type))}
    alt={pokeTypeJaName(type)}
    title={pokeTypeJaName(type)}
    class={iconSizeClass}
  />
{:else}
  <span class="badge {badgeClass} text-white" style="background-color: {pokeTypeColor(type)};">
    {pokeTypeJaName(type)}
  </span>
{/if}
