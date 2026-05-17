<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { REGIONS } from "$lib/domain/models/PokeRegion";
  import { itemSpriteUrl } from "$lib/infrastructure/api/pokeSprites";

  /** 地方 enName をキーとするアイコン用アイテムキー辞書 */
  const REGION_ICONS: Record<string, string> = {
    kanto: "poke-flute",
    johto: "rainbow-wing",
    hoenn: "wailmer-pail",
    sinnoh: "explorer-kit",
    unova: "xtransceiver",
    kalos: "mega-bracelet",
    alola: "z-ring",
    galar: "tamato-berry",
    hisui: "insect-plate",
    paldea: "rule-book",
    orre: "silver-wing",
  };

  function gotoRegionDetail(enName: string) {
    const base = page.url.pathname.replace(/\/$/, "");
    return goto(`${base}/${enName}`);
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">地方図鑑</h1>

  <div class="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
    {#each REGIONS as region (region.id)}
      <button
        onclick={() => gotoRegionDetail(region.enName)}
        class="btn preset-tonal flex items-center justify-start gap-1 border pl-1 sm:pl-4"
      >
        <img src={itemSpriteUrl(REGION_ICONS[region.enName] ?? "")} alt="" class="h-8 w-8 object-contain" />
        <span class="text-base font-bold">{region.jaName}</span>
      </button>
    {/each}
  </div>
</div>
