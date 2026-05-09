<script lang="ts">
  import Icon from "@iconify/svelte";

  interface Props {
    /** ポケモン名（表示名） */
    name: string;
    /** 画像URL（null の場合はプレースホルダー） */
    imageUrl: string | null;
    /** 表示状態: front=表面 / back=裏面（ポケボール） / dimmed=表面半透明 */
    face?: "front" | "back" | "dimmed";
    /** クリックハンドラー（指定時は button、省略時は div として描画） */
    onclick?: () => void;
  }
  let { name, imageUrl, face = "front", onclick }: Props = $props();

  // チップ全状態共通のベースクラス（ここを変えれば全状態に反映される）
  const baseClass =
    "border-surface-300 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-2xl border-1 shadow bg-white p-1 select-none";

  let isImageLoaded = $state(false);
  let imgEl: HTMLImageElement | undefined = $state();

  $effect(() => {
    if (!imageUrl) return;
    isImageLoaded = false;
    // キャッシュ済み画像は onload 発火前に $effect が上書きするため complete で補完
    if (imgEl?.complete) isImageLoaded = true;
  });
</script>

{#snippet frontContent()}
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

{#if face === "back"}
  {#if onclick}
    <button type="button" class="{baseClass} hover:border-primary-500 cursor-pointer active:scale-95" {onclick}>
      <Icon icon="mdi:pokeball" class="size-10 opacity-50" />
    </button>
  {:else}
    <div class={baseClass}>
      <Icon icon="mdi:pokeball" class="size-10 opacity-50" />
    </div>
  {/if}
{:else if face === "dimmed"}
  <div class="{baseClass} opacity-50">
    {@render frontContent()}
  </div>
{:else if onclick}
  <button type="button" class="{baseClass} hover:border-primary-500 cursor-pointer active:scale-95" {onclick}>
    {@render frontContent()}
  </button>
{:else}
  <div class={baseClass}>
    {@render frontContent()}
  </div>
{/if}
