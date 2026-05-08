<script lang="ts" module>
  import type { PokeData } from "$lib/domain/models/PokeData";

  /** svelte-dnd-action が必須とする id フィールドを付与した PokeData */
  export type DndPokeData = PokeData & { id: number };

  /** PokeData[] を dndzone で扱える DndPokeData[] に変換する */
  export function toDndItems(list: PokeData[]): DndPokeData[] {
    return list.map((p) => ({ ...p, id: p.speciesId }));
  }
</script>

<script lang="ts">
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { resolveImageUrl } from "$lib/domain/models/PokeData";
  import PokeTile from "$lib/presentation/components/atoms/PokeTile.svelte";

  interface Props {
    items: DndPokeData[];
    /** アイテムサイズ: sm=size-48(responsive), lg=size-64 */
    itemSize?: "sm" | "lg";
    /** 値行の生成関数（省略時は行なし）*/
    labelFn?: (item: DndPokeData) => string;
    /** true のとき labelFn の結果を表示、false のとき "???" を表示 */
    isOpen?: boolean;
    /** コンテナへの追加クラス（max-w-2xl など） */
    class?: string;
    flipDurationMs?: number;
  }

  let {
    items = $bindable(),
    itemSize = "lg",
    labelFn,
    isOpen = false,
    class: className = "",
    flipDurationMs = 200,
  }: Props = $props();

  function handleConsider(event: CustomEvent<DndEvent<DndPokeData>>): void {
    items = event.detail.items;
  }

  function handleFinalize(event: CustomEvent<DndEvent<DndPokeData>>): void {
    items = event.detail.items;
  }
</script>

<div
  class="border-surface-300 text-surface-400 flex min-h-48 w-full justify-center gap-4 overflow-x-auto rounded-xl border-2 border-dashed pb-1 {className}"
  use:dndzone={{ items, flipDurationMs, dropTargetStyle: {} }}
  onconsider={handleConsider}
  onfinalize={handleFinalize}
>
  {#each items as item, i (item.id)}
    {@const imageUrl = resolveImageUrl(item.imageUrls)}
    <div
      class="flex cursor-grab flex-col items-center justify-center gap-1 select-none {itemSize === 'sm'
        ? 'size-48 sm:size-56'
        : 'size-64'}"
    >
      <PokeTile name={item.jaName} {imageUrl} type1={item.type1} type2={item.type2} />
      {#if labelFn}
        <p class="min-h-5 text-center font-bold">{isOpen ? labelFn(item) : "???"}</p>
      {/if}
      <p class="text-surface-500 text-center text-sm">{i + 1} ばんめ</p>
    </div>
  {/each}
</div>
