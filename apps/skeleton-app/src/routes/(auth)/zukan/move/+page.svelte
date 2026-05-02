<script lang="ts">
  import { ALL_TYPE_NAMES } from "$lib/domain/models/PokeData/pokeType";
  import { navigateTo } from "$lib/presentation/utils/navigation";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">わざ図鑑</h1>

  <div class="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
    {#each ALL_TYPE_NAMES as typeName (typeName)}
      <button onclick={() => navigateTo(`/zukan/move/${typeName}`)}>
        <PokeTypeBadge type={typeName} size="md" />
      </button>
    {/each}
  </div>
</div>
