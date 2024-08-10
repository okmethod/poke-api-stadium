<script lang="ts">
  import Icon from "@iconify/svelte";

  export let name: string | null = null;
  export let imageUrl: string | null = null;
</script>

<div class="flex flex-col bg-gray-50 rounded-2xl shadow border h-[100px] w-[100px] overflow-hidden select-none">
  <div class="relative p-2 bg-transparent">
    <!-- タイトル部分 -->
    <div class="absolute inset-0 m-1 flex justify-center">
      <h1 class="text-xs font-bold text-gray-900">
        <div>{name ?? "???"}</div>
      </h1>
    </div>
    <!-- 画像部分 -->
    <div class="flex justify-center">
      <div class="flex items-center justify-center bg-white rounded-full border border-gray-200 h-[80px] w-[80px]">
        {#if imageUrl !== null}
          <img src={imageUrl} alt={name ?? "???"} class="w-full h-full object-cover" />
        {:else}
          <Icon icon="mdi:image-off-outline" class="w-8 h-8" />
        {/if}
      </div>
    </div>
  </div>
</div>
