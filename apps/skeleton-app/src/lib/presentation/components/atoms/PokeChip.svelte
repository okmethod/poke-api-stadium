<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeTypeName } from "$lib/domain/models/PokeType";
  import PokeTypeBadge from "$lib/presentation/components/atoms/PokeTypeBadge.svelte";

  interface Props {
    /** ポケモン名 */
    name: string;
    /** 画像URL（null の場合はプレースホルダー） */
    imageUrl: string | null;
    /** タイプ1（指定時は名前ラベルの代わりにタイプアイコンを表示する） */
    type1?: PokeTypeName;
    /** タイプ2 */
    type2?: PokeTypeName | null;
    /** 表示状態: front=表面 / back=裏面（ポケボール） / dimmed=表面半透明 */
    face?: "front" | "back" | "dimmed";
    /** クリックハンドラー（指定時は button、省略時は div として描画） */
    onclick?: () => void;
  }
  let { name, imageUrl, type1, type2, face = "front", onclick }: Props = $props();

  const baseClass =
    "border-surface-300 flex h-24 w-24 flex-col items-center rounded-2xl border-1 shadow bg-white p-1 select-none";

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
  <!-- flex-1 で残余高さをすべて画像に割り当てる（バッジ h-5 + gap-1 を除いた最大サイズ） -->
  <div class="flex min-h-0 w-full flex-1 items-center justify-center">
    {#if imageUrl !== null}
      <img
        bind:this={imgEl}
        src={imageUrl}
        alt={name}
        class="max-h-full max-w-full object-contain transition-opacity duration-300"
        class:opacity-0={!isImageLoaded}
        onload={() => (isImageLoaded = true)}
      />
    {/if}
  </div>
  {#if type1}
    <div class="flex h-5 items-center gap-0.5">
      <PokeTypeBadge type={type1} size="xs" iconOnly />
      {#if type2}
        <PokeTypeBadge type={type2} size="xs" iconOnly />
      {/if}
    </div>
  {:else}
    <span class="flex h-5 max-w-full items-center truncate px-1 text-xs font-bold">{name}</span>
  {/if}
{/snippet}

{#if face === "back"}
  {#if onclick}
    <button
      type="button"
      class="{baseClass} hover:border-primary-500 cursor-pointer justify-center active:scale-95"
      {onclick}
    >
      <Icon icon="mdi:pokeball" class="size-10 opacity-50" />
    </button>
  {:else}
    <div class="{baseClass} justify-center">
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
