<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "ポケモンえあわせ",
      description: "ポケモンのペアをくっつけて消そう",
      iconItemKey: "repeat-ball",
      action: "navigate",
      target: "/puzzle/eawase",
    },
    {
      label: "ポケモンめくり",
      description: "同じポケモンのカードをめくって揃えよう",
      iconItemKey: "timer-ball",
      action: "navigate",
      target: "/puzzle/mekuri",
    },
    {
      label: "ポケモンしりとり",
      description: "ポケモンの名前でしりとりしよう",
      iconItemKey: "heal-ball",
      action: "navigate",
      target: "/puzzle/shiritori",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">ポケモンパズル</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} description={item.description} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
