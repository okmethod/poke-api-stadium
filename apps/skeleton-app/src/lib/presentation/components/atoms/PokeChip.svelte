<script lang="ts">
  interface Props {
    /** ポケモン名（表示名） */
    name: string;
    /** 画像URL（null の場合はプレースホルダー） */
    imageUrl: string | null;
    /** クリックハンドラー（指定時は button、省略時は div として描画） */
    onclick?: () => void;
    /** 使用済みスロットとして空の矩形を描画する */
    closed?: boolean;
    /** closed=true 時に適用する Tailwind クラス（bg・border 等を上書き可能） */
    closedClass?: string;
  }
  let { name, imageUrl, onclick, closed = false, closedClass = "bg-gray-100" }: Props = $props();

  let isImageLoaded = $state(false);
  let imgEl: HTMLImageElement | undefined = $state();

  $effect(() => {
    if (!imageUrl) return;
    isImageLoaded = false;
    // キャッシュ済み画像は onload 発火前に $effect が上書きするため complete で補完
    if (imgEl?.complete) isImageLoaded = true;
  });
</script>

{#snippet content()}
  {#if imageUrl !== null}
    <img
      bind:this={imgEl}
      src={imageUrl}
      alt={name}
      class="h-14 w-14 object-contain transition-opacity duration-300"
      class:opacity-0={!isImageLoaded}
      onload={() => (isImageLoaded = true)}
    />
  {:else}
    <div class="h-14 w-14"></div>
  {/if}
  <span class="max-w-full truncate px-1 text-xs font-bold">{name}</span>
{/snippet}

{#if closed}
  <div class="h-24 w-24 rounded-2xl {closedClass}"></div>
{:else if onclick}
  <button
    type="button"
    class="border-surface-300 hover:border-primary-500 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-white p-1 select-none active:scale-95"
    {onclick}
  >
    {@render content()}
  </button>
{:else}
  <div
    class="border-surface-300 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-white p-1 select-none"
  >
    {@render content()}
  </div>
{/if}
