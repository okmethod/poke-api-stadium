<script lang="ts">
  import Icon from "@iconify/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { generationData, ALL_GENERATION_NUMBERS } from "$lib/domain/models/PokeData/generation";
  import PokeSearchPanel from "./_components/PokeSearchPanel.svelte";

  // 最新世代の最後のポケモンIDを取得
  const POKEMON_MAX_ID = generationData(ALL_GENERATION_NUMBERS.at(-1)!)?.lastPokeId ?? 1025;

  let idInputEl: HTMLInputElement | null = $state(null);

  // page.url.pathname は base path 込みの実 URL なので resolve() を経由しない
  function gotoPokeId(id: number) {
    goto(`${page.url.pathname}/${id}`);
  }

  function handleIdSearch() {
    const id = parseInt(idInputEl?.value ?? "", 10);
    if (isNaN(id) || id < 1) return;
    gotoPokeId(id);
  }

  // 日付文字列から決定的なハッシュ値を生成し、ポケモンIDに変換する
  function getTodaysPokemonId(): number {
    const now = new Date();
    const seed = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    let hash = 0;
    for (const char of seed) {
      hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }
    return hash % POKEMON_MAX_ID;
  }

  function handleTodaysPokemon() {
    gotoPokeId(getTodaysPokemonId());
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンずかん</h1>

  <div class="grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2">
    <!-- No.指定 -->
    <div class="flex items-center justify-between gap-2 rounded p-4 shadow">
      <span class="flex items-center gap-1 text-sm font-semibold">
        <Icon icon="mdi:notebook" class="size-5" />
        No.検索
      </span>
      <input
        bind:this={idInputEl}
        id="pokeId"
        type="number"
        value="1"
        min="1"
        max={POKEMON_MAX_ID}
        onkeydown={(e) => e.key === "Enter" && handleIdSearch()}
        class="w-20 rounded border px-3 py-1 text-center text-sm"
      />
      <button type="button" class="btn preset-filled btn-sm" onclick={handleIdSearch}>
        <Icon icon="mdi:magnify" class="size-5" />
      </button>
    </div>

    <!-- 今日のポケモン -->
    <div class="flex items-center justify-between gap-1 rounded p-4 shadow">
      <span class="flex items-center gap-1 text-sm font-semibold">
        <Icon icon="mdi:calendar-today" class="size-5" />
        今日のポケモン
      </span>
      <button type="button" class="btn preset-filled btn-sm" onclick={handleTodaysPokemon}>
        <Icon icon="mdi:magnify" class="size-5" />
      </button>
    </div>
  </div>

  <!-- 条件検索 -->
  <div class="flex w-full max-w-xl flex-col space-y-3 rounded p-4 shadow">
    <span class="flex items-center gap-1 text-sm font-semibold">
      <Icon icon="mdi:database" class="size-5" />
      条件検索
    </span>

    <PokeSearchPanel onpokeselect={gotoPokeId} />
  </div>
</div>
