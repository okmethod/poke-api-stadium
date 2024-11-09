<script lang="ts">
  import { isImageConfig, type TransitionButtonConfig } from "$lib/utils/transitions";

  export let data: {
    buttonConfigs: TransitionButtonConfig[];
  };
</script>

<div class="cRouteBodyStyle !relative">
  <div class="cTitlePartStyle !m-0 !mt-2 !mb-2 md:!mt-4 md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">
      <span class="block xs:inline">PokeAPI スタジアム</span>
      <span class="block text-right xs:inline">へようこそ !</span>
    </h1>
  </div>

  <div class="cContentPartStyle !mt-4 !relative">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {#each data.buttonConfigs as config}
        <div class="">
          <button type="button" class="btn variant-ghost flex items-center" on:click={config.onClick}>
            <div class="w-6 h-6 mr-1">
              {#if config.symbol === null}
                <!-- no symbol -->
              {:else if isImageConfig(config.symbol)}
                <img src={config.symbol.src} alt={config.symbol.alt} class="w-full h-full" />
              {/if}
            </div>
            <span class="hover:underline text-left text-xl md:text-2xl w-64 md:w-72">{config.label}</span>
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>
