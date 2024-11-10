<script lang="ts">
  import { isImageConfig, type TransitionButtonConfig } from "$lib/utils/transitions";

  export let data: {
    buttonConfigs: TransitionButtonConfig[];
  };
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle !m-0 !mt-2 !mb-2 md:!mt-4 md:!mb-4">
    <h1 class="cTitleStyle">
      <span class="block xs:inline">PokeAPI スタジアム</span>
      <span class="block text-right xs:inline">へようこそ !</span>
    </h1>
  </div>

  <div class="cContentPartStyle !mt-4">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {#each data.buttonConfigs as config}
        <button type="button" class="btn variant-ghost flex items-center" on:click={config.onClick}>
          <div class="w-6 h-6 mr-1">
            {#if config.symbol === null}
              <!-- no symbol -->
            {:else if isImageConfig(config.symbol)}
              <img src={config.symbol.src} alt={config.symbol.alt} class="w-full h-full" />
            {/if}
          </div>
          <span class="cRouteButtonStyle">{config.label}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
