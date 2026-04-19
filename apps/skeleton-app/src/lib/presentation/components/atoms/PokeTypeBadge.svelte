<script lang="ts">
  import type { PokeTypeName } from "$lib/domain/models/PokeData";
  import { pokeTypeJaName, pokeTypeColor } from "$lib/domain/models/PokeData";

  interface Props {
    type: PokeTypeName;
  }
  let { type }: Props = $props();
</script>

<span class="badge rounded-full px-3 py-1 text-sm text-white" style="background-color: {pokeTypeColor(type)};">
  {pokeTypeJaName(type)}
</span>
