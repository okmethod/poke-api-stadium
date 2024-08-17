<script lang="ts">
  import type { ButtonConfig } from "./+page";

  export let data: {
    buttonConfigs: ButtonConfig[];
  };
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">PokeAPI スタジアムへようこそ !</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !m-4">
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
