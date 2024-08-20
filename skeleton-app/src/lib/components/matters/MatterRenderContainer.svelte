<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { initMatterBase, runMatterBase, cleanupMatterBase, type MatterBase } from "$lib/matters/initMatterBase";
  import { initPointerEvents } from "$lib/matters/initPointerEvents";

  export let renderContainer: HTMLDivElement;
  export let matterBase: MatterBase;

  let isHolding = false;

  if (browser) {
    let removePointerEvents: () => void;
    onMount(async () => {
      matterBase = initMatterBase(renderContainer);
      runMatterBase(matterBase);
      removePointerEvents = initPointerEvents(matterBase.engine.world, matterBase.mouseConstraint, renderContainer, {
        isHolding,
      });
    });
    onDestroy(() => {
      cleanupMatterBase(matterBase);
      if (removePointerEvents) {
        removePointerEvents();
      }
    });
  }
</script>

<div bind:this={renderContainer} class="w-80 h-80 bg-gray-300 border border-black"></div>
