<script lang="ts">
  import type { PokeData } from "$lib/types/poke";

  export let pokeData: PokeData | null = null;

  function formatValue(value: number | undefined): string {
    return value !== undefined ? (value * 0.1).toFixed(1) : "??";
  }
</script>

<div class="grid border border-gray-300 rounded-lg shadow-lg max-w-[600px]">
  <header class="p-4 bg-red-100"></header>
  <!-- 名前 -->
  <div class="p-2">
    <h1 class="text-2xl font-bold text-gray-900">{pokeData?.jaName} : {pokeData?.enName}</h1>
  </div>
  <div class="grid md:grid-cols-2 w-full">
    <!-- 画像 -->
    <div class="p-2 flex justify-center">
      <img src={pokeData?.imageUrl} alt={pokeData?.jaName} class="w-48 h-48 rounded-lg border border-gray-200" />
    </div>

    <!-- その他情報 -->
    <div class="p-2">
      <div class="mb-2">
        <h2 class="text-xl font-semibold text-gray-700">タイプ</h2>
        <ul class="list-inside flex space-x-4">
          <li class="text-gray-600">{pokeData?.type1Name}</li>
          <li class="text-gray-600">{pokeData?.type2Name !== null ? pokeData?.type2Name : "なし"}</li>
        </ul>
      </div>
      <div class="mb-2">
        <h2 class="text-xl font-semibold text-gray-700">たかさ</h2>
        <p class="text-gray-600">{formatValue(pokeData?.height)} m</p>
      </div>
      <div class="mb-2">
        <h2 class="text-xl font-semibold text-gray-700">おもさ</h2>
        <p class="text-gray-600">{formatValue(pokeData?.weight)} kg</p>
      </div>
    </div>
  </div>
  <footer class="p-4 bg-red-100"></footer>
</div>
