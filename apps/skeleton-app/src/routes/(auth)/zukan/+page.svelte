<script lang="ts">
  import Icon from "@iconify/svelte";
  import { navigateTo } from "$lib/presentation/utils/navigation";
  import PokeSearchPanel from "./_components/PokeSearchPanel.svelte";

  let idInputEl: HTMLInputElement | null = $state(null);

  function handleIdSearch() {
    const id = parseInt(idInputEl?.value ?? "", 10);
    if (isNaN(id) || id < 1) return;
    navigateTo(`/zukan/${id}` as Parameters<typeof navigateTo>[0]);
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンずかん</h1>

  <!-- No.指定 -->
  <div class="flex items-center gap-2">
    <label for="pokeId" class="shrink-0 font-semibold">No:</label>
    <input
      bind:this={idInputEl}
      id="pokeId"
      type="number"
      min="1"
      max="9999"
      onkeydown={(e) => e.key === "Enter" && handleIdSearch()}
      class="w-32 rounded border px-3 py-1 text-center text-sm"
    />
    <button type="button" class="btn preset-tonal btn-sm" onclick={handleIdSearch}>
      で検索
      <Icon icon="mdi:magnify" class="size-5" />
    </button>
  </div>

  <div class="flex w-full max-w-xl flex-col space-y-3 rounded p-4 shadow">
    <span>条件で検索</span>

    <PokeSearchPanel />
  </div>
</div>
