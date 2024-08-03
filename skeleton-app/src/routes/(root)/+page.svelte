<script>
  import { navigateTo } from "$lib/utils/navigation.client";
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-5">
    <h1 class="text-3xl font-bold">PokeAPI スタジアムへようこそ !</h1>
    <button
      on:click|preventDefault={() => navigateTo("/search")}
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      [search] ポケモン検索
    </button>
  </div>
</div>
