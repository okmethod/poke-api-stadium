<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "サウンドテスト",
      iconItemKey: "premier-ball",
      action: "navigate",
      target: "/other/sound-test",
    },
    {
      label: "ソースコード",
      iconItemKey: "master-ball",
      action: "redirectNewTab",
      target: "https://github.com/okmethod/poke-api-stadium",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">その他</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
