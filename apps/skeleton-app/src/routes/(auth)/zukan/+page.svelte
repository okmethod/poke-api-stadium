<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";
  import MenuCard from "$lib/presentation/components/atoms/MenuCard.svelte";

  const { menuItems } = buildMenuLoad([
    {
      label: "ポケモン図鑑",
      description: "ポケモンを条件で検索し、情報を確認できます",
      iconItemKey: "poke-ball",
      action: "navigate",
      target: "/zukan/poke",
    },
    {
      label: "わざ図鑑",
      description: "各タイプのわざの一覧を表示し、情報を確認できます",
      iconItemKey: "tm-normal",
      action: "navigate",
      target: "/zukan/move",
    },
    {
      label: "アイテム図鑑",
      description: "各ポケットのアイテムの一覧を表示し、情報を確認できます",
      iconItemKey: "rare-candy",
      action: "navigate",
      target: "/zukan/item",
    },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">ずかんメニュー</h2>

  <div class="grid w-full max-w-xl grid-cols-1 gap-4">
    {#each menuItems as item (item.label)}
      <MenuCard label={item.label} description={item.description} iconSrc={item.iconItemKey} onclick={item.onClick} />
    {/each}
  </div>
</div>
