<script lang="ts">
  import type { PokeData } from "$lib/domain/models/PokeData";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";

  interface Props {
    pokeData: PokeData | null;
  }
  let { pokeData }: Props = $props();
</script>

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
