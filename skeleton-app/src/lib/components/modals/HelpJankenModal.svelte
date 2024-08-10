<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

  export let parent;

  const modalStore = getModalStore();

  function closeModal() {
    modalStore.close();
  }
</script>

{#if $modalStore[0]}
  <div class="" data-parent={parent}>
    <div class="relative">
      <div class="w-full h-full bg-white">
        <div class="p-4">
          <h2 class="text-2xl font-bold">ルール</h2>
          <p class="mt-4">
            まず ポケモン を 1たい えらぶ。
            <br />
            つぎに タイプ を どちらか 1つ えらぶ。
            <br />
            すばやさ が たかい ほうが こうげきする。
          </p>
          <ul class="mt-4 list-disc list-inside">
            <li>ばつぐん なら かち。</li>
            <li>いまひとつ か こうかなし なら まけ。</li>
            <li>どちらでもない なら あいこ。</li>
          </ul>
        </div>
      </div>
      <button on:click={closeModal} class="absolute top-1 right-6 z-10">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>
  </div>
{/if}
