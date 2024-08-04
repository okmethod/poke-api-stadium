<script lang="ts">
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/types/poke";
  import { TYPES, nullColor } from "$lib/types/type";
  import { formatHW, formatStat } from "$lib/utils/numerics";

  export let pokeData: PokeData | null = null;

  let spritesLength = 0;
  let headerColor = nullColor;
  let footerColor = nullColor;
  $: if (pokeData !== null) {
    spritesLength = pokeData.imageUrlArray.length;
    headerColor = TYPES[pokeData.type1.enName]?.color ?? nullColor;
    footerColor = pokeData.type2 !== null ? (TYPES[pokeData.type2.enName]?.color ?? nullColor) : headerColor;
  }

  let currentImageIndex = 0;
  function toggleImage(): void {
    if (spritesLength > 1) {
      currentImageIndex = (currentImageIndex + 1) % spritesLength;
    }
  }

  const indexStyle = "text-l font-semibold text-gray-700";
  const textStyle = "text-s text-gray-600";
  const indexAndTextDivStyle = "flex items-center space-x-1";
</script>

<div class="select-none grid border bg-gray-50 rounded-2xl shadow max-w-[600px] overflow-hidden">
  <header class="p-4 bg-transparent" style="background-color: {headerColor};"></header>

  <!-- タイトル部分 -->
  <div class="p-2 bg-transparent">
    <h1 class="text-2xl font-bold text-gray-900">
      {#if pokeData !== null}
        <div class="flex flex-col sm:flex-row items-start sm:items-center">
          <div>{pokeData.jaName} : {pokeData.enName}</div>
          <span class="text-lg font-normal text-gray-700 ml-0 sm:ml-4">
            {pokeData !== null ? pokeData.jaGenus : "???"}
          </span>
        </div>
      {:else}
        ???
      {/if}
    </h1>
  </div>

  <div class="grid md:grid-cols-2 md:grid-cols-[1fr_2fr] w-full mb-2 bg-transparent">
    <!-- 画像部分 -->
    <div class="p-2 flex justify-center">
      <div class="w-48 h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
        {#if pokeData !== null}
          <button type="button" on:click={toggleImage} aria-label="Toggle Image" class="relative">
            <img src={pokeData.imageUrlArray[currentImageIndex]} alt={pokeData.jaName} class="w-48 h-48" />
            <div class="absolute bottom-0 right-0 m-2">
              <Icon icon="mdi:image-refresh-outline" class="w-4 h-4" />
            </div>
          </button>
        {:else}
          <Icon icon="mdi:image-off-outline" class="w-8 h-8" />
        {/if}
      </div>
    </div>

    <!-- 情報部分 -->
    <div class="p-2">
      <!-- タイプ -->
      <div class="mb-2 flex items-center space-x-4">
        <h2 class={indexStyle}>[タイプ]</h2>
        <ul class="list-inside flex space-x-4">
          {#if pokeData !== null}
            <li class={textStyle}>{pokeData?.type1.jaName}</li>
            <li class={textStyle}>{pokeData?.type2 !== null ? pokeData?.type2.jaName : ""}</li>
          {:else}
            <li class={textStyle}>???</li>
          {/if}
        </ul>
      </div>

      <!-- たかさ / おもさ -->
      <div class="mb-2 grid grid-cols-2 gap-1">
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[たかさ]</h2>
          <p class={textStyle}>{formatHW(pokeData?.height, "height")}</p>
        </div>
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[おもさ]</h2>
          <p class={textStyle}>{formatHW(pokeData?.weight, "weight")}</p>
        </div>
      </div>

      <!-- ステータス -->
      <div class="mb-2 grid grid-cols-3 gap-1">
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[HP]</h2>
          <p class={textStyle}>{formatStat(pokeData?.stats.hp)}</p>
        </div>
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[こうげき]</h2>
          <p class={textStyle}>{formatStat(pokeData?.stats.attack)}</p>
        </div>
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[ぼうぎょ]</h2>
          <p class={textStyle}>{formatStat(pokeData?.stats.defense)}</p>
        </div>
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[すばやさ]</h2>
          <p class={textStyle}>{formatStat(pokeData?.stats.speed)}</p>
        </div>
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[とくこう]</h2>
          <p class={textStyle}>{formatStat(pokeData?.stats.specialAttack)}</p>
        </div>
        <div class={indexAndTextDivStyle}>
          <h2 class={indexStyle}>[とくぼう]</h2>
          <p class={textStyle}>{formatStat(pokeData?.stats.specialDefense)}</p>
        </div>
      </div>
    </div>
  </div>

  <footer class="p-4 bg-transparent" style="background-color: {footerColor};"></footer>
</div>
