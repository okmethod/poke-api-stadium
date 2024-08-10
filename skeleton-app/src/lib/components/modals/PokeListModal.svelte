<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

  export let title: string;
  export let stringArray: string[] = [];

  export let parent;

  const modalStore = getModalStore();

  function closeModal() {
    modalStore.close();
  }
</script>

{#if $modalStore[0]}
  <div class="" data-parent={parent}>
    <div class="relative">
      <div class="h-full h-full bg-white">
        <div class="p-4 flex flex-col h-full">
          <h2 class="text-2xl font-bold">{title}</h2>
          <div class="overflow-y-auto flex-grow">
            <ul class="mt-4 list-decimal list-inside">
              {#each stringArray as str}
                <li>{str}</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
      <button on:click={closeModal} class="absolute top-1 right-6 z-10">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>
  </div>
{/if}
