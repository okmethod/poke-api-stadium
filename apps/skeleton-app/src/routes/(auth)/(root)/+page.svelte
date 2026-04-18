<script lang="ts">
  import type { MenuButtonConfig } from "./+page.js";

  interface PageProps {
    data: {
      menuItems: MenuButtonConfig[];
    };
  }

  let { data }: PageProps = $props();
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">
    <span class="block sm:inline">PokeAPI スタジアム</span>
    <span class="block text-right sm:inline">へようこそ !</span>
  </h2>

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-sm md:max-w-xl xl:max-w-3xl">
    {#each data.menuItems as item (item.label)}
      <button onclick={item.onClick} class="btn preset-tonal border flex items-center gap-2 justify-start">
        <img src={item.ballImageUrl} alt="" class="w-6 h-6 object-contain" />
        <span class="text-lg">{item.label}</span>
      </button>
    {/each}
  </div>
</div>
