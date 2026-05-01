<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { FormVariant } from "$lib/domain/models/FormVariant";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";

  interface Props {
    formVariants: readonly FormVariant[] | null;
  }
  let { formVariants }: Props = $props();
</script>

{#if !formVariants}
  <p class="text-surface-400 p-2 text-sm">???</p>
{:else}
  <div class="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
    {#each formVariants as form (form.enName)}
      <div
        class="border-surface-200-800 flex flex-col items-center gap-1 rounded-lg border p-2 {form.isDefault
          ? 'bg-primary-500/10'
          : ''}"
      >
        <div class="flex h-20 w-20 items-center justify-center">
          {#if form.imageUrl}
            <img src={form.imageUrl} alt={form.jaName} class="h-full w-full object-contain" />
          {:else}
            <Icon icon="mdi:image-off-outline" class="text-surface-400 size-8" />
          {/if}
        </div>
        <span class="text-center text-sm font-bold">{form.jaName}</span>
        <div class="flex flex-wrap justify-center gap-1">
          <PokeTypeBadge type={form.type1} />
          {#if form.type2}
            <PokeTypeBadge type={form.type2} />
          {/if}
        </div>
        <div class="flex flex-wrap justify-center gap-1">
          {#if form.isMega}
            <span class="badge preset-tonal-warning text-xs">メガ</span>
          {/if}
          {#if form.isBattleOnly}
            <span class="badge preset-tonal-secondary text-xs">バトルのみ</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{/if}
