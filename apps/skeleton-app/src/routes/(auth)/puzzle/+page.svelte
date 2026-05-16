<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "ポケモンしりとり",
      description: "ポケモンの名前でしりとりしよう",
      iconItemKey: "heal-ball",
      action: "navigate",
      target: "/puzzle/shiritori",
    },
    {
      label: "スライドパズル",
      description: "アートワークを15のピースに分けてスライドで完成させよう",
      iconItemKey: "timer-ball",
      action: "navigate",
      target: "/puzzle/slide",
    },
    {
      label: "ピッタリ100kg",
      description: "目標の重さにピッタリ合わせよう",
      iconItemKey: "heavy-ball",
      action: "navigate",
      target: "/puzzle/pittari",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">パズルゲーム</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} description={item.description} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
