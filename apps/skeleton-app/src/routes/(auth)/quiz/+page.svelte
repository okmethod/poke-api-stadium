<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "ポケモンだ〜れだ？",
      description: "シルエットを見てポケモンを当てよう",
      iconItemKey: "dusk-ball",
      action: "navigate",
      target: "/quiz/dareda",
    },
    {
      label: "ポケモンだ〜れだ？改",
      description: "ポケモンに質問して正体を当てよう",
      iconItemKey: "luxury-ball",
      action: "navigate",
      target: "/quiz/dareda-kai",
    },
    {
      label: "なきごえならべ",
      description: "ポケモンのなきごえを聞いて順番に並べよう",
      iconItemKey: "dream-ball",
      action: "navigate",
      target: "/quiz/nakigoe",
    },
    {
      label: "ポケモンXXくらべ",
      description: "ポケモンのいろいろな値を比べて順番に並べよう",
      iconItemKey: "great-ball",
      action: "navigate",
      target: "/quiz/kurabe",
    },
    {
      label: "たかさくらべ 改",
      description: "ポケモンのたかさを実際の大きさにして比べてみよう",
      iconItemKey: "ultra-ball",
      action: "navigate",
      target: "/quiz/kurabe-h",
    },
    {
      label: "おもさくらべ 改",
      description: "ポケモンのおもさをシーソーで比べてみよう",
      iconItemKey: "heavy-ball",
      action: "navigate",
      target: "/quiz/kurabe-w",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">ポケモンクイズ</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} description={item.description} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
