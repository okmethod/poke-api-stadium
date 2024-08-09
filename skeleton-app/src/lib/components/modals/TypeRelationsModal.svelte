<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

  export let parent;

  const modalStore = getModalStore();

  function closeModal() {
    modalStore.close();
  }

  const imageUrl = "https://www.pokemon.co.jp/ex/sun_moon/common/images/fight/161215_01/img_01.png";
</script>

{#if $modalStore[0]}
  <div class="min-w-[400px]" data-parent={parent}>
    <div class="relative">
      <img src={imageUrl} alt="type_relations" class="w-96 h-96" />
      <button on:click={closeModal} class="absolute top-1 right-6 z-10">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>
  </div>
{/if}
