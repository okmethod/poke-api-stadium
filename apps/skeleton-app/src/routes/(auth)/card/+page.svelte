<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "ポケモンめくり",
      description: "カードをめくって同じポケモンを揃えよう",
      iconItemKey: "nest-ball",
      action: "navigate",
      target: "/card/mekuri",
    },
    {
      label: "ポケモンめくり 改",
      description: "カードをめくって同じタイプのポケモンを揃えよう",
      iconItemKey: "net-ball",
      action: "navigate",
      target: "/card/mekuri-kai",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">カードゲーム</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} description={item.description} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
