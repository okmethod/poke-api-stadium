<script lang="ts">
  import { getModalStore } from "@skeletonlabs/skeleton";
  import Icon from "@iconify/svelte";

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
        <div class="p-4">
          <h2 class="text-2xl font-bold">ルール</h2>
          <p class="mt-4">
            まず ポケモン をえらぶ。
            <br />
            つぎに タイプ を えらぶ。
            <br />
            すばやさ が たかい ほうが こうげきする。
          </p>
          <ul class="mt-4 list-disc list-inside">
            <li>ばつぐん なら かち。</li>
            <li>いまひとつ か こうかなし なら まけ。</li>
            <li>どちらでもない なら あいこ。</li>
          </ul>
          <p class="mt-4">3 たい の かちまけ で しょうぶ が きまる。</p>
        </div>
      </div>
      <button on:click={closeModal} class="absolute top-1 right-6 z-10">
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>
  </div>
{/if}
