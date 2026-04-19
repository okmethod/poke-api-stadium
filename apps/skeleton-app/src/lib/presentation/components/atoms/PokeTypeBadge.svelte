<script lang="ts">
  import type { PokeTypeName } from "$lib/domain/models/PokeData";
  import { pokeTypeJaName, pokeTypeColor } from "$lib/domain/models/PokeData";

  interface Props {
    type: PokeTypeName;
  }
  let { type }: Props = $props();
</script>

<span class="badge text-white text-sm px-3 py-1 rounded-full" style="background-color: {pokeTypeColor(type)};">
  {pokeTypeJaName(type)}
</span>
