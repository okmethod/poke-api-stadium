<script lang="ts">
  import type { CategoryCardConfig } from "./+page.js";

  interface PageProps {
    data: {
      categories: CategoryCardConfig[];
    };
  }

  let { data }: PageProps = $props();
</script>

<div class="flex flex-col items-center p-4">
  <h2 class="h3 sm:h2 my-4">
    <span class="block sm:inline">PokeAPI スタジアム</span>
    <span class="block text-right sm:inline">へようこそ !</span>
  </h2>

  <div class="grid w-full max-w-sm grid-cols-2 gap-4 sm:max-w-xl">
    {#each data.categories as category (category.label)}
      <button onclick={category.onClick} class="btn preset-tonal flex h-auto flex-col items-center gap-3 border py-6">
        <div class="flex items-center gap-1">
          <img src={category.ballImageUrl} alt="" class="h-12 w-12 object-contain" />
          <span class="text-xl font-semibold">{category.label}</span>
        </div>
        <span class="text-xs opacity-70 sm:text-sm">{category.description}</span>
      </button>
    {/each}
  </div>
</div>
