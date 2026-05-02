<script lang="ts">
  import { untrack } from "svelte";
  import Icon from "@iconify/svelte";
  import { FloatingPanel, Portal } from "@skeletonlabs/skeleton-svelte";
  import type { MoveLearnDetail, MoveLearnMethodName } from "$lib/domain/models/PokeMove";
  import type { PokeMove } from "$lib/domain/models/PokeMove";
  import { MOVE_LEARN_METHOD_JA } from "$lib/domain/models/PokeMove";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";
  import MoveCategoryBadge from "$lib/presentation/components/atoms/MoveCategoryBadge.svelte";

  const MOVE_LEARN_METHOD_ICON: Record<MoveLearnMethodName, string> = {
    "level-up": "mdi:trending-up",
    machine: "mdi:disc",
    tutor: "mdi:school",
    egg: "mdi:dna",
  };

  interface DexMovesTabProps {
    moveLearnDetails: readonly MoveLearnDetail[];
  }
  let { moveLearnDetails }: DexMovesTabProps = $props();

  const PAGE_SIZE = 20;

  interface MoveRow {
    detail: MoveLearnDetail;
    move: PokeMove;
  }

  let loadedRows = $state<MoveRow[]>([]);
  let loadedCount = $state(0);
  let isLoading = $state(false);

  let panelOpen = $state(false);
  let selectedRow = $state<MoveRow | null>(null);

  function openPanel(row: MoveRow): void {
    selectedRow = row;
    panelOpen = true;
  }

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
      panelOpen = false;
      selectedRow = null;
      if (details.length > 0) {
        loadNextPage();
      }
    });
  });

  const hasMore = $derived(loadedCount < moveLearnDetails.length);

  function levelLabel(row: MoveRow): string {
    if (row.detail.learnMethod !== "level-up") return "—";
    return row.detail.levelLearnedAt === 0 ? "しんか" : "Lv." + String(row.detail.levelLearnedAt);
  }
</script>

<FloatingPanel open={panelOpen} onOpenChange={(e) => (panelOpen = e.open)}>
  {#if moveLearnDetails.length === 0}
    <p class="text-surface-400 p-4 text-sm">習得可能なわざなし</p>
  {:else}
    <div class="overflow-x-auto px-3">
      <table class="w-full text-xs sm:text-sm">
        <thead>
          <tr class="border-surface-300-700 border-b text-left">
            <th class="px-1 py-1.5 text-center font-semibold">習得</th>
            <th class="px-1 py-1.5 font-semibold">わざ名</th>
            <th class="px-1 py-1.5 text-center font-semibold">タイプ</th>
            <th class="px-1 py-1.5 text-center font-semibold">分類</th>
          </tr>
        </thead>
        <tbody>
          {#each loadedRows as row (row.detail.enName)}
            <tr
              class="border-surface-200-800 hover:bg-surface-100-900 cursor-pointer border-b"
              onclick={() => openPanel(row)}
            >
              <td class="px-1 py-1 text-center">
                <span
                  title={MOVE_LEARN_METHOD_JA[row.detail.learnMethod]}
                  class="flex items-center justify-center gap-1 text-xs"
                >
                  {#if row.detail.learnMethod === "level-up"}
                    {levelLabel(row)}
                  {:else}
                    <Icon icon={MOVE_LEARN_METHOD_ICON[row.detail.learnMethod]} class="size-4" />
                  {/if}
                </span>
              </td>
              <td class="px-1 py-1 font-medium">{row.move.jaName}</td>
              <td class="px-1 py-1 text-center">
                <PokeTypeBadge type={row.move.type} size="xs" />
              </td>
              <td class="w-16 px-1 py-1 text-center">
                <MoveCategoryBadge category={row.move.category} />
              </td>
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

  <Portal>
    <FloatingPanel.Positioner>
      <FloatingPanel.Content class="card bg-surface-50-950 flex w-64 flex-col shadow-xl">
        <FloatingPanel.Header class="border-surface-200-800 flex items-center gap-2 border-b p-2">
          <FloatingPanel.DragTrigger class="flex flex-1 cursor-grab items-center gap-1 active:cursor-grabbing">
            <Icon icon="mdi:drag" class="text-surface-400 size-4" />
            <FloatingPanel.Title class="text-sm font-bold">
              {selectedRow?.move.jaName ?? "わざ詳細"}
            </FloatingPanel.Title>
          </FloatingPanel.DragTrigger>
          <FloatingPanel.CloseTrigger class="btn-icon btn-icon-sm preset-ghost">
            <Icon icon="mdi:close" class="size-4" />
          </FloatingPanel.CloseTrigger>
        </FloatingPanel.Header>

        <FloatingPanel.Body class="space-y-3 p-3 text-sm">
          {#if selectedRow}
            {@const row = selectedRow}
            <!-- タイプ・分類 -->
            <div class="mx-3 flex items-center justify-between gap-2">
              <PokeTypeBadge type={row.move.type} size="xs" />
              <MoveCategoryBadge category={row.move.category} />

              <!-- 習得方法 -->
              <span class="badge items-center gap-1 text-xs">
                <Icon icon={MOVE_LEARN_METHOD_ICON[row.detail.learnMethod]} class="size-3.5" />
                {#if row.detail.learnMethod === "level-up"}
                  {levelLabel(row)}
                {:else}
                  {MOVE_LEARN_METHOD_JA[row.detail.learnMethod]}
                {/if}
              </span>
            </div>

            <!-- ステータス -->
            <dl class="grid grid-cols-3 gap-2 text-center">
              {#snippet stat(label: string, value: string)}
                <div class="bg-surface-100-900 rounded p-1.5">
                  <dt class="text-surface-500-400 text-xs">{label}</dt>
                  <dd class="font-bold">{value}</dd>
                </div>
              {/snippet}
              {@render stat("威力", row.move.power != null ? String(row.move.power) : "—")}
              {@render stat("命中", row.move.accuracy != null ? `${row.move.accuracy}%` : "—")}
              {@render stat("PP", String(row.move.pp))}
            </dl>

            <!-- 説明文 -->
            {#if row.move.flavorText}
              <p class="text-surface-600-400 border-surface-200-800 border-t pt-2 text-xs leading-relaxed">
                {row.move.flavorText}
              </p>
            {/if}
          {/if}
        </FloatingPanel.Body>

        <FloatingPanel.ResizeTrigger axis="se" class="absolute right-0 bottom-0 size-3 cursor-se-resize" />
      </FloatingPanel.Content>
    </FloatingPanel.Positioner>
  </Portal>
</FloatingPanel>
