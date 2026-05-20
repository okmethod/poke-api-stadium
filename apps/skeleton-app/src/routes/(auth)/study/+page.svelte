<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "ポケモン漢字ドリル",
      description: "図鑑テキストの漢字の読み・書きを確認しよう",
      iconItemKey: "master-ball",
      action: "navigate",
      target: "/study/kanji-drill",
    },
    {
      label: "タイピングゲーム",
      description: "ポケモンの名前をローマ字でタイピングしよう",
      iconItemKey: "quick-ball",
      action: "navigate",
      target: "/study/typing",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">べんきょう</h2>

  <div class="grid w-full max-w-xl grid-cols-1 gap-4">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} description={item.description} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
