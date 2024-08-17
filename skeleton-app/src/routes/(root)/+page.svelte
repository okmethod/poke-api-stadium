<script lang="ts">
  import type { ButtonConfig } from "./+page";

  export let data: {
    buttonConfigs: ButtonConfig[];
    idolUrl: string;
  };
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">PokeAPI スタジアムへようこそ !</h1>
  </div>

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
    <div class="absolute -bottom-1 -right-14 w-20 h-20">
      <img src={data.idolUrl} alt="idol" class="w-full h-full object-contain" />
    </div>
  </div>
</div>
