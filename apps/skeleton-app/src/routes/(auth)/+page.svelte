<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

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
      <MenuCard
        label={menuItem.label}
        description={menuItem.description}
        iconSrc={menuItem.iconItemKey}
        onclick={menuItem.onClick}
      />
    {/each}
  </div>
</div>
