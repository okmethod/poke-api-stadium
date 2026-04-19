<script lang="ts">
  import type { PokeTypeName } from "$lib/domain/models/PokeData";
  import { pokeTypeColor } from "$lib/domain/models/PokeData";

  interface Props {
    /** ポケモン名（表示名） */
    name: string;
    /** 画像URL（null の場合はプレースホルダー） */
    imageUrl: string | null;
    /** タイプ1（ヘッダー帯の色） */
    type1: PokeTypeName;
    /** タイプ2（フッター帯の色。null の場合は type1 と同色） */
    type2: PokeTypeName | null;
  }
  let { name, imageUrl, type1, type2 }: Props = $props();

  const headerColor = $derived(pokeTypeColor(type1));
  const footerColor = $derived(pokeTypeColor(type2 ?? type1));

  let isImageLoaded = $state(false);
  $effect(() => {
    // 画像URLが変わったらローディング状態をリセット
    if (imageUrl) isImageLoaded = false;
  });
</script>

<div class="relative size-40 overflow-hidden rounded-2xl border bg-gray-50 shadow-lg select-none">
  <!-- ヘッダー帯（タイプ1カラー）-->
  <header
    class="absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-center px-1 drop-shadow"
    style="background-color: {headerColor};"
  ></header>

  <!-- フッター帯（タイプ2カラー、null の場合はタイプ1カラー） -->
  <footer class="absolute inset-x-0 bottom-0 z-10 h-8" style="background-color: {footerColor};"></footer>

  <!-- ポケモン名（ヘッダー帯内に収める） -->
  <div class="absolute inset-x-0 top-0 z-30 flex h-10 items-center justify-center px-1">
    <span class="max-w-full truncate rounded bg-white/80 px-1 py-0 text-lg font-bold text-gray-900">
      {name ?? "???"}
    </span>
  </div>

  <!-- 円形画像エリア（中央固定、ヘッダー・フッターに少し重なる） -->
  <div
    class="border-surface-200 absolute inset-4 z-20 flex items-center justify-center overflow-hidden rounded-full border bg-white"
  >
    {#if imageUrl !== null}
      <img
        src={imageUrl}
        alt={name}
        class="size-full object-contain p-4 transition-opacity duration-300"
        class:opacity-0={!isImageLoaded}
        onload={() => (isImageLoaded = true)}
      />
    {:else}
      <span class="text-surface-300 text-xl">？</span>
    {/if}
  </div>
</div>
