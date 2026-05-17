<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "あとだしタイプじゃんけん",
      description: "タイプの三すくみでじゃんけんしよう",
      iconItemKey: "poke-ball",
      action: "navigate",
      target: "/action/type-janken",
    },

    {
      label: "ばつぐんラッシュ",
      description: "出現するポケモンに効果ばつぐんな技を素早く選ぼう",
      iconItemKey: "lure-ball",
      action: "navigate",
      target: "/action/move-rush",
    },
    {
      label: "ポケモンえあわせ",
      description: "ポケモンのペアをくっつけて消そう",
      iconItemKey: "repeat-ball",
      action: "navigate",
      target: "/action/eawase",
    },
    {
      label: "サファリゲーム",
      description: "ボールを弾いてポケモンにあてよう",
      iconItemKey: "safari-ball",
      action: "navigate",
      target: "/action/safari",
    },
    {
      label: "タイピングゲーム",
      description: "ポケモンの名前をローマ字でタイピングしよう",
      iconItemKey: "quick-ball",
      action: "navigate",
      target: "/action/typing",
    },
    {
      label: "ポケモンピンボール",
      description: "モンスターボールでポケモンバンパーをはじこう",
      iconItemKey: "poke-ball",
      action: "navigate",
      target: "/action/pinball",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">アクションゲーム</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} description={item.description} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
