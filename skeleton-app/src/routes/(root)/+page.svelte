<script>
  import { navigateTo } from "$lib/utils/navigation.client";
  import { BALLS } from "$lib/types/ball";

  const githubRepoUrl = "https://github.com/okmethod/poke-api-stadium";
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-6">
    <h1 class="text-3xl font-bold">PokeAPI スタジアムへようこそ !</h1>
  </div>
  <div class="flex flex-col space-y-2 items-start">
    <button
      on:click|preventDefault={() => navigateTo("/search")}
      class="text-2xl text-blue-500 hover:underline font-bold py-2 px-4 flex items-center"
    >
      <img src={BALLS["poke-ball"].imageUrl} alt="poke-ball" class="w-6 h-6 mr-2" />
      ポケモンずかん
    </button>
    <button
      on:click|preventDefault={() => navigateTo("/compare")}
      class="text-2xl text-blue-500 hover:underline font-bold py-2 px-4 flex items-center"
    >
      <img src={BALLS["great-ball"].imageUrl} alt="great-ball" class="w-6 h-6 mr-2" />
      ポケモンXXくらべ
    </button>
    <button
      on:click|preventDefault={() => navigateTo("/janken")}
      class="text-2xl text-blue-500 hover:underline font-bold py-2 px-4 flex items-center"
    >
      <img src={BALLS["ultra-ball"].imageUrl} alt="great-ball" class="w-6 h-6 mr-2" />
      ポケモンタイプじゃんけん (制作中)
    </button>
    <button
      on:click|preventDefault={() => window.open(githubRepoUrl, "_blank")}
      class="text-2xl text-blue-500 hover:underline font-bold py-2 px-4 flex items-center"
    >
      <img src={BALLS["premier-ball"].imageUrl} alt="premier-ball" class="w-6 h-6 mr-2" />
      ソースコード
    </button>
  </div>
</div>
