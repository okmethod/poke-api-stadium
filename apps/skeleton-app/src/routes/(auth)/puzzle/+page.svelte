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
      label: "ポケモンしりとり",
      description: "ポケモンの名前でしりとりしよう",
      iconItemKey: "heal-ball",
      action: "navigate",
      target: "/puzzle/shiritori",
    },
    {
      label: "ポケモンめくり",
      description: "カードをめくって同じポケモンを揃えよう",
      iconItemKey: "nest-ball",
      action: "navigate",
      target: "/puzzle/mekuri",
    },
    {
      label: "ポケモンめくり 改",
      description: "カードをめくって同じタイプのポケモンを揃えよう",
      iconItemKey: "net-ball",
      action: "navigate",
      target: "/puzzle/mekuri-kai",
    },
    {
      label: "スライドパズル",
      description: "アートワークを15のピースに分けてスライドで完成させよう",
      iconItemKey: "timer-ball",
      action: "navigate",
      target: "/puzzle/slide",
    },
    {
      label: "タイピングゲーム",
      description: "ポケモンの名前をローマ字でタイピングしよう",
      iconItemKey: "quick-ball",
      action: "navigate",
      target: "/puzzle/typing",
    },
    {
      label: "あとだしタイプじゃんけん",
      description: "タイプの三すくみでじゃんけんしよう",
      iconItemKey: "poke-ball",
      action: "navigate",
      target: "/puzzle/type-janken",
    },
    {
      label: "ばつぐんラッシュ",
      description: "出現するポケモンに効果ばつぐんな技を素早く選ぼう",
      iconItemKey: "lure-ball",
      action: "navigate",
      target: "/puzzle/move-rush",
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
