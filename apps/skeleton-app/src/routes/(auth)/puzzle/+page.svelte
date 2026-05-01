<script lang="ts">
  import { buildMenuLoad } from "$lib/presentation/utils/menuLoad";

  const { menuItems } = buildMenuLoad([
    { label: "ポケモンえあわせ", iconItemKey: "repeat-ball", action: "navigate", target: "/puzzle/eawase" },
    { label: "ポケモンめくり", iconItemKey: "timer-ball", action: "navigate", target: "/puzzle/mekuri" },
    { label: "ポケモンしりとり", iconItemKey: "heal-ball", action: "navigate", target: "/puzzle/shiritori" },
  ]);
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">ポケモンパズル</h2>

  <div class="grid w-full max-w-sm grid-cols-1 gap-4 md:max-w-xl md:grid-cols-2">
    {#each menuItems as item (item.label)}
      <button onclick={item.onClick} class="btn preset-tonal flex items-center justify-start gap-2 border">
        <img src={item.iconItemKey} alt="" class="h-6 w-6 object-contain" />
        <span class="text-lg">{item.label}</span>
      </button>
    {/each}
  </div>
</div>
