<script lang="ts">
  import { isImageConfig, type TransitionButtonConfig } from "$lib/utils/transitions";

  export let data: {
    buttonConfigs: TransitionButtonConfig[];
  };
</script>

<div class="cRouteBodyStyle">
  <div class="cTitlePartStyle !m-0 !mt-2 !mb-2 md:!mt-4 md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">試作品</h1>
  </div>

  <div class="cContentPartStyle !mt-4">
    {#each data.buttonConfigs as config}
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
    {/each}
  </div>
</div>
