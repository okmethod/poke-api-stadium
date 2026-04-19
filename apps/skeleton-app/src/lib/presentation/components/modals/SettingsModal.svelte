<script lang="ts">
  import type { Component } from "svelte";
  import { Accordion, Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
  import Icon from "@iconify/svelte";
  import GenerationFilterSection from "$lib/presentation/components/settings/GenerationFilterSection.svelte";
  import ThemeSwitchSection from "$lib/presentation/components/settings/ThemeSwitchSection.svelte";

  interface AccordionItemConfig {
    readonly label: string;
    readonly component: Component;
  }

  const accordionItems: Record<string, AccordionItemConfig> = {
    generation: {
      label: "ポケモン世代選択",
      component: GenerationFilterSection,
    },
    theme: {
      label: "UIテーマ選択",
      component: ThemeSwitchSection,
    },
  };

  let openState = $state(false);
  // 世代フィルターをデフォルトで展開
  let accordionValue = $state(["generation"]);
</script>

<Dialog open={openState} onOpenChange={(e) => (openState = e.open)}>
  <Dialog.Trigger class="btn preset-filled h-10 w-10 rounded-xl p-2">
    <Icon icon="mdi:cog-outline" class="size-5" />
  </Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
    <Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Content class="card bg-surface-100-900 mx-auto w-11/12 max-w-lg p-2 shadow-xl">
        <div class="flex items-center justify-between p-4 pb-2">
          <h2 class="text-xl font-bold">設定</h2>
          <button type="button" class="btn preset-tonal rounded-full" onclick={() => (openState = false)}>
            <Icon icon="mdi:close" class="size-4" />
          </button>
        </div>

        <Accordion value={accordionValue} onValueChange={(e) => (accordionValue = e.value)}>
          {#each Object.entries(accordionItems) as [key, item] (key)}
            <Accordion.Item value={key}>
              <Accordion.ItemTrigger class="px-4 py-3 text-sm font-semibold">
                <span>{item.label}</span>
                <Accordion.ItemIndicator>
                  <Icon icon="mdi:chevron-down" class="size-4" />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent class="px-4 pb-3">
                <item.component />
              </Accordion.ItemContent>
            </Accordion.Item>
          {/each}
        </Accordion>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog>
