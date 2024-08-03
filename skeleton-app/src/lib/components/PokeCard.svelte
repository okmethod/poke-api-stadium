<script lang="ts">
  import type { PokeData } from "$lib/types/poke";

  export let pokeData: PokeData | null = null;
</script>

<div class="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="p-4">
      <h1 class="text-2xl font-bold text-gray-900">{pokeData?.jaName} : {pokeData?.enName}</h1>
      <img src={pokeData?.imageUrl} alt={pokeData?.jaName} class="w-48 h-48 mx-auto my-4" />

      <h2 class="text-xl font-semibold text-gray-700 mt-4">タイプ</h2>
      <ul class="list-decimal list-inside">
        <li class="text-gray-600">{pokeData?.type1Name}</li>
        <li class="text-gray-600">{pokeData?.type2Name !== null ? pokeData?.type2Name : "なし"}</li>
      </ul>

      <h2 class="text-xl font-semibold text-gray-700 mt-4">たかさ</h2>
      <p class="text-gray-600">{(pokeData?.height * 0.1).toFixed(1)} m</p>

      <h2 class="text-xl font-semibold text-gray-700 mt-4">おもさ</h2>
      <p class="text-gray-600">{(pokeData?.weight * 0.1).toFixed(1)} kg</p>
    </div>
  </div>
</div>
