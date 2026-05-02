<script lang="ts">
  import type { PokeTypeName } from "$lib/domain/models/PokeData";
  import { pokeTypeJaName, pokeTypeColor } from "$lib/domain/models/PokeData";

  interface Props {
    type: PokeTypeName;
    size?: "sm" | "xs";
  }
  let { type, size = "sm" }: Props = $props();

  const badgeClass = $derived(
    size === "xs" ? "h-5 rounded px-1.5 py-0.5 text-xs" : "h-6 rounded-full px-3 py-1 text-sm",
  );
</script>

<span class="badge {badgeClass} text-white" style="background-color: {pokeTypeColor(type)};">
  {pokeTypeJaName(type)}
</span>
