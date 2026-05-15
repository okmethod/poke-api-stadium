<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { ALL_TYPE_NAMES, type PokeTypeName } from "$lib/domain/models/PokeType";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";

  // 指定タイプのわざページへ遷移する
  function gotoMoveZukanByType(type: PokeTypeName) {
    const segments = page.url.pathname.split("/");
    segments[segments.length] = String(type);
    return goto(segments.join("/"));
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">わざ図鑑</h1>

  <div class="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
    {#each ALL_TYPE_NAMES as typeName (typeName)}
      <button onclick={() => gotoMoveZukanByType(typeName)}>
        <PokeTypeBadge type={typeName} size="md" />
      </button>
    {/each}
  </div>
</div>
