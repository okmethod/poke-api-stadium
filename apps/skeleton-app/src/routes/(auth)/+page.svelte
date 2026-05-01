<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";

  const { menuItems } = buildMenuLoad([
    {
      label: "ずかん",
      description: "さがす・しらべる",
      iconItemKey: "poke-radar",
      action: "navigate",
      target: "/zukan",
    },
    {
      label: "クイズ",
      description: "くらべる・あてる",
      iconItemKey: "wide-lens",
      action: "navigate",
      target: "/quiz",
    },
    {
      label: "パズル",
      description: "カード・ゲーム",
      iconItemKey: "exp-share",
      action: "navigate",
      target: "/puzzle",
    },
    {
      label: "その他",
      description: "サウンド・ソースコード",
      iconItemKey: "gb-sounds",
      action: "navigate",
      target: "/other",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">
    <span class="block sm:inline">PokeAPI スタジアム</span>
    <span class="block text-right sm:inline">へようこそ !</span>
  </h2>

  <div class="grid w-full max-w-sm grid-cols-2 gap-4 sm:max-w-xl">
    {#each menuItems as menuItem (menuItem.label)}
      <button onclick={menuItem.onClick} class="btn preset-tonal flex h-auto flex-col items-center gap-3 border py-6">
        <div class="flex items-center gap-1">
          <img src={menuItem.iconItemKey} alt="" class="h-12 w-12 object-contain" />
          <span class="text-xl font-semibold">{menuItem.label}</span>
        </div>
        <span class="text-xs opacity-70 sm:text-sm">{menuItem.description}</span>
      </button>
    {/each}
  </div>
</div>
