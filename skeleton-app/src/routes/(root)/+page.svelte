<script>
  import { navigateTo } from "$lib/utils/navigation.client";
</script>

<div class="h-full w-full mx-auto container">
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">PokeAPI スタジアムへようこそ !</h1>
    <button
      on:click|preventDefault={() => navigateTo("/search")}
      class="text-2xl text-blue-500 hover:underline font-bold py-2 px-4"
    >
      ポケモン検索
    </button>
  </div>
</div>
