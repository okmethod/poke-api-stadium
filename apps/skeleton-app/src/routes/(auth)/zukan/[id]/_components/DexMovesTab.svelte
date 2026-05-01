<script lang="ts">
  import { untrack } from "svelte";
  import Icon from "@iconify/svelte";
  import type { MoveLearnDetail } from "$lib/domain/models/Move";
  import type { Move } from "$lib/domain/models/Move";
  import { MOVE_CATEGORY_JA, MOVE_LEARN_METHOD_JA } from "$lib/domain/models/Move";
  import type { MoveLearnMethodName } from "$lib/domain/models/Move";

  const MOVE_LEARN_METHOD_ICON: Record<MoveLearnMethodName, string> = {
    "level-up": "mdi:trending-up",
    machine: "mdi:disc",
    tutor: "mdi:school",
    egg: "mdi:egg-outline",
  };
  import { pokeTypeColor, pokeTypeJaName } from "$lib/domain/models/PokeData";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";

  interface DexMovesTabProps {
    moveLearnDetails: readonly MoveLearnDetail[];
  }
  let { moveLearnDetails }: DexMovesTabProps = $props();

  const PAGE_SIZE = 20;

  interface MoveRow {
    detail: MoveLearnDetail;
    move: Move;
  }

  let loadedRows = $state<MoveRow[]>([]);
  let loadedCount = $state(0);
  let isLoading = $state(false);

  async function loadNextPage() {
    if (isLoading) return;
    isLoading = true;
    const slice = moveLearnDetails.slice(loadedCount, loadedCount + PAGE_SIZE);
    try {
      const moves = await getPokeRepository().getMoves(fetch, slice);
      const newRows = slice.flatMap((detail, i) => {
        const move = moves[i];
        return move ? [{ detail, move }] : [];
      });
      loadedRows = [...loadedRows, ...newRows];
      loadedCount += slice.length;
    } catch (err) {
      console.error("Failed to fetch moves:", err);
    } finally {
      isLoading = false;
    }
  }

  $effect(() => {
    // moveLearnDetails のみを追跡し、内部の state 読み取りは untrack で遮断
    const details = moveLearnDetails;
    untrack(() => {
      loadedRows = [];
      loadedCount = 0;
      if (details.length > 0) {
        loadNextPage();
      }
    });
  });

  const hasMore = $derived(loadedCount < moveLearnDetails.length);

  function levelLabel(row: MoveRow): string {
    if (row.detail.learnMethod !== "level-up") return "—";
    return row.detail.levelLearnedAt === 0 ? "進化" : String(row.detail.levelLearnedAt);
  }
</script>

{#if moveLearnDetails.length === 0}
  <p class="text-surface-400 p-4 text-sm">習得可能なわざなし</p>
{:else}
  <div class="overflow-x-auto">
    <table class="w-full text-xs sm:text-sm">
      <thead>
        <tr class="border-surface-300-700 border-b text-left">
          <th class="px-1 py-1.5 font-semibold">習得</th>
          <th class="px-1 py-1.5 font-semibold">Lv</th>
          <th class="px-1 py-1.5 font-semibold">わざ名</th>
          <th class="px-1 py-1.5 font-semibold">タイプ</th>
          <th class="px-1 py-1.5 font-semibold">分類</th>
          <th class="px-1 py-1.5 text-right font-semibold">威力</th>
          <th class="px-1 py-1.5 text-right font-semibold">命中</th>
          <th class="px-1 py-1.5 text-right font-semibold">PP</th>
        </tr>
      </thead>
      <tbody>
        {#each loadedRows as row (row.detail.enName)}
          <tr class="border-surface-200-800 hover:bg-surface-100-900 border-b">
            <td class="px-1 py-1">
              <span title={MOVE_LEARN_METHOD_JA[row.detail.learnMethod]}>
                <Icon icon={MOVE_LEARN_METHOD_ICON[row.detail.learnMethod]} class="size-4" />
              </span>
            </td>
            <td class="px-1 py-1 text-center text-xs">{levelLabel(row)}</td>
            <td class="px-1 py-1 font-medium">{row.move.jaName}</td>
            <td class="px-1 py-1">
              <span
                class="rounded px-1.5 py-0.5 text-xs font-bold text-white"
                style="background-color: {pokeTypeColor(row.move.type)};"
              >
                {pokeTypeJaName(row.move.type)}
              </span>
            </td>
            <td class="px-1 py-1 text-xs">{MOVE_CATEGORY_JA[row.move.category]}</td>
            <td class="px-1 py-1 text-right">{row.move.power ?? "—"}</td>
            <td class="px-1 py-1 text-right">{row.move.accuracy != null ? `${row.move.accuracy}%` : "—"}</td>
            <td class="px-1 py-1 text-right">{row.move.pp}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  {#if isLoading}
    <div class="flex items-center justify-center p-3">
      <Icon icon="mdi:loading" class="text-surface-400 size-5 animate-spin" />
    </div>
  {:else if hasMore}
    <div class="flex justify-center p-2">
      <button type="button" class="btn preset-tonal btn-sm text-xs" onclick={loadNextPage}>
        さらに読み込む ({loadedCount}/{moveLearnDetails.length})
      </button>
    </div>
  {:else}
    <p class="text-surface-400 p-2 text-center text-xs">{moveLearnDetails.length} 件</p>
  {/if}
{/if}
