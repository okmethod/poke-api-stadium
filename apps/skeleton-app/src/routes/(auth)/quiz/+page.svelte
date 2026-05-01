<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";

  const { menuItems } = buildMenuLoad([
    { label: "ポケモンだ〜れだ？", iconItemKey: "dusk-ball", action: "navigate", target: "/quiz/dareda" },
    { label: "ポケモンだ〜れだ？改", iconItemKey: "luxury-ball", action: "navigate", target: "/quiz/dareda-kai" },
    { label: "たかさくらべ 改", iconItemKey: "ultra-ball", action: "navigate", target: "/quiz/kurabe-h" },
    { label: "おもさくらべ 改", iconItemKey: "heavy-ball", action: "navigate", target: "/quiz/kurabe-w" },
    { label: "ポケモンXXくらべ", iconItemKey: "great-ball", action: "navigate", target: "/quiz/kurabe" },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">ポケモンクイズ</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <button onclick={item.onClick} class="btn preset-tonal flex items-center justify-start gap-2 border">
        <img src={item.iconItemKey} alt="" class="h-6 w-6 object-contain" />
        <span class="text-lg">{item.label}</span>
      </button>
    {/each}
  </div>
</div>
