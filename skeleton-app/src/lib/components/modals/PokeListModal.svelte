<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/types/poke";

  export let title: string;
  export let pokeDataArray: PokeData[] = [];

  export let parent; // eslint-disable-line svelte/valid-compile -- unused-export-let
  // MEMO: parent は未使用だが、定義しないとブラウザに下記のワーニングが出る
  // <FirebaseAuthModal> was created with unknown prop 'parent'

  const modalStore = getModalStore();

  function closeModal() {
    modalStore.close();
  }
</script>

{#if $modalStore[0]}
  <div class="min-w-[400px]">
    <div class="relative">
      <div class="w-96 h-96 bg-white">
        <div class="p-4 flex flex-col h-full">
          <h2 class="text-2xl font-bold">{title}</h2>
          <div class="overflow-y-auto flex-grow">
            <ul class="mt-4 list-decimal list-inside">
              {#each pokeDataArray as pokeData}
                <li>{pokeData.jaName}</li>
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
