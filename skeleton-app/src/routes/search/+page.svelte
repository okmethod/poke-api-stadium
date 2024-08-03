<script lang="ts">
  //import { fetchImageUrlToBlob } from "$lib/utils/request.client";
  import { onMount } from "svelte";
  import getPoke from "$lib/api/getPoke.client";
  import type { ResponsePokeJson } from "$lib/types/poke";
  import { page } from "$app/stores";
  import { get } from "svelte/store";

  let pokeId = "";
  let pokeData: ResponsePokeJson | null = null;
  let error: string | null = null;

  async function fetchPoke() {
    try {
      error = null;
      pokeData = await getPoke(fetch, pokeId);
    } catch (err) {
      pokeData = null;
    }
  }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-5">
    <h1 class="text-3xl font-bold">ポケモン検索</h1>
    <form on:submit|preventDefault={fetchPoke} class="flex items-center space-x-3">
      <label for="pokeId" class="text-lg">全国図鑑番号:</label>
      <input type="text" id="pokeId" bind:value={pokeId} class="border border-gray-300 rounded px-2 py-1" />
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">検索</button>
    </form>

    {#if error}
      <p class="text-red-500">エラー: {error}</p>
    {/if}

    {#if pokeData}
      <div>
        <h2 class="text-2xl font-semibold">{pokeData.name} (ID: {pokeData.id})</h2>
        <!-- 他のポケモンデータを表示 -->
      </div>
    {/if}
  </div>
</div>
