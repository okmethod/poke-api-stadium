<script lang="ts">
  import type { TransitionButtonConfig } from "$lib/utils/transitions";

  export let data: {
    buttonConfigs: TransitionButtonConfig[];
  };
</script>

<div class="cRouteBodyStyle !relative">
  <!-- タイトル部 -->
  <header class="sticky absolute top-0 flex justify-center w-full bg-white z-10">
    <div class="cTitlePartStyle !m-0 !mt-2 !mb-2 md:!mt-4 md:!mb-4">
      <h1 class="cTitleStyle md:!text-3xl">
        <span class="block xs:inline">PokeAPI スタジアム</span>
        <span class="block text-right xs:inline">へようこそ !</span>
      </h1>
    </div>
  </header>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !mt-4 !relative">
    {#each data.buttonConfigs as config}
      <div class="">
        <button on:click|preventDefault={config.onClick} class="flex items-center">
          <img src={config.imageUrl} alt={config.alt} class="w-6 h-6 mr-2" />
          <span class="cLinkButtonStyle md:!text-2xl">{config.title}</span>
        </button>
      </div>
    {/each}
  </div>
</div>
