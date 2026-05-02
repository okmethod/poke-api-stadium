<script lang="ts">
  import { untrack } from "svelte";
  import Icon from "@iconify/svelte";
  import { FloatingPanel, Portal } from "@skeletonlabs/skeleton-svelte";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import type { PokeAbility } from "$lib/domain/models/PokeAbility";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";

  interface Props {
    pokeData: PokeData | null;
  }
  let { pokeData }: Props = $props();

  let loadedAbilities = $state<PokeAbility[]>([]);
  let isLoadingAbilities = $state(false);

  let panelOpen = $state(false);
  let selectedAbility = $state<PokeAbility | null>(null);

  function openPanel(ability: PokeAbility): void {
    selectedAbility = ability;
    panelOpen = true;
  }

  $effect(() => {
    const refs = pokeData?.abilities;
    untrack(() => {
      loadedAbilities = [];
      panelOpen = false;
      selectedAbility = null;
      if (refs && refs.length > 0) {
        isLoadingAbilities = true;
        getPokeRepository()
          .getAbilities(fetch, refs)
          .then((abilities) => {
            loadedAbilities = [...abilities];
          })
          .catch((err) => {
            console.error("Failed to fetch abilities:", err);
          })
          .finally(() => {
            isLoadingAbilities = false;
          });
      }
    });
  });
</script>

<FloatingPanel open={panelOpen} onOpenChange={(e) => (panelOpen = e.open)}>
  <div class="p-2">
    <table class="text-sm">
      <tbody>
        <tr class="align-middle">
          <td class="text-surface-400 h-12 pr-4 whitespace-nowrap">タイプ</td>
          <td>
            <div class="flex gap-2">
              {#if pokeData}
                <PokeTypeBadge type={pokeData.type1} />
                {#if pokeData.type2}
                  <PokeTypeBadge type={pokeData.type2} />
                {/if}
              {:else}
                <span>???</span>
              {/if}
            </div>
          </td>
        </tr>

        <tr class="align-middle">
          <td class="text-surface-400 h-12 pr-4 whitespace-nowrap">たかさ・おもさ</td>
          <td>
            {#if pokeData}
              <div class="flex gap-4">
                <span>{pokeData.height} m</span>
                <span>{pokeData.weight} kg</span>
              </div>
            {:else}
              ???
            {/if}
          </td>
        </tr>

        <tr class="align-middle">
          <td class="text-surface-400 h-12 pt-3 pr-4 align-top whitespace-nowrap">とくせい</td>
          <td class="py-2">
            {#if isLoadingAbilities}
              <Icon icon="mdi:loading" class="text-surface-400 size-4 animate-spin" />
            {:else if loadedAbilities.length > 0}
              <div class="flex flex-col gap-1">
                {#each loadedAbilities as ability (ability.id)}
                  <button
                    type="button"
                    class="hover:text-primary-500 flex cursor-pointer items-center gap-2 text-left"
                    onclick={() => openPanel(ability)}
                  >
                    <span>{ability.jaName}</span>
                  </button>
                {/each}
              </div>
            {:else}
              <span>???</span>
            {/if}
          </td>
        </tr>

        <tr class="align-middle">
          <td class="text-surface-400 h-12 pr-4 whitespace-nowrap">せだい</td>
          <td>
            {#if pokeData}
              <div class="flex flex-col gap-2 sm:flex-row">
                <span>{pokeData.generationData?.label ?? "不明"}</span>
                <span>({pokeData.generationData?.titles})</span>
              </div>
            {:else}
              ???
            {/if}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Portal>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content class="card bg-surface-50-950 flex w-64 flex-col shadow-xl">
        <FloatingPanel.Header class="border-surface-200-800 flex items-center gap-2 border-b p-2">
          <FloatingPanel.DragTrigger class="flex flex-1 cursor-grab items-center gap-1 active:cursor-grabbing">
            <Icon icon="mdi:drag" class="text-surface-400 size-4" />
            <FloatingPanel.Title class="text-sm font-bold">
              {selectedAbility?.jaName ?? "とくせい詳細"}
            </FloatingPanel.Title>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.CloseTrigger class="btn-icon btn-icon-sm preset-ghost">
            <Icon icon="mdi:close" class="size-4" />
          </FloatingPanel.CloseTrigger>
        </FloatingPanel.Header>

        <FloatingPanel.Body class="space-y-2 p-3 text-sm">
          {#if selectedAbility}
            {#if selectedAbility.isHidden}
              <span class="badge preset-tonal text-xs">夢特性</span>
            {/if}
            {#if selectedAbility.flavorText}
              <p class="text-surface-600-400 text-xs leading-relaxed">
                {selectedAbility.flavorText}
              </p>
            {:else}
              <p class="text-surface-400 text-xs">説明文なし</p>
            {/if}
          {/if}
        </FloatingPanel.Body>

        <FloatingPanel.ResizeTrigger axis="se" class="absolute right-0 bottom-0 size-3 cursor-se-resize" />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </Portal>
</FloatingPanel>
