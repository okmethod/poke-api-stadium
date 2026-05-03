<script lang="ts">
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { ITEM_POCKETS } from "$lib/domain/models/PokeItem";
  import { itemSpriteUrl } from "$lib/infrastructure/api/pokeSprites";
  import { navigateToParent } from "$lib/presentation/utils/navigation";

  // 指定ポケットのアイテムページへ遷移する
  function gotoItemZukanByPocket(pocketEnName: string) {
    const segments = page.url.pathname.split("/");
    segments[segments.length] = pocketEnName;
    return goto(segments.join("/"));
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">アイテム図鑑</h1>

  <button type="button" class="btn preset-tonal btn-sm" onclick={() => navigateToParent()}>
    <Icon icon="mdi:arrow-left" class="size-4" />
    図鑑メニュー
  </button>

  <div class="grid w-full max-w-2xl grid-cols-2 gap-3">
    {#each ITEM_POCKETS as pocket (pocket.enName)}
      <button
        onclick={() => gotoItemZukanByPocket(pocket.enName)}
        class="btn preset-tonal flex items-center justify-start gap-1 border pl-1 sm:pl-4"
      >
        <img src={itemSpriteUrl(pocket.iconItemKey)} alt="" class="h-6 w-6 object-contain" />
        <span class="text-base">{pocket.jaName}</span>
      </button>
    {/each}
  </div>
</div>
