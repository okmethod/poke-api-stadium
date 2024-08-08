<script>
  import { navigateTo } from "$lib/utils/navigation.client";
  import { BALL_DICT } from "$lib/types/ball";

  const githubRepoUrl = "https://github.com/okmethod/poke-api-stadium";

  const contents = [
    {
      text: "ポケモンずかん",
      imageUrl: BALL_DICT["poke-ball"].imageUrl,
      alt: "poke-ball",
      onClick: () => navigateTo("/search"),
    },
    {
      text: "ポケモンXXくらべ",
      imageUrl: BALL_DICT["great-ball"].imageUrl,
      alt: "great-ball",
      onClick: () => navigateTo("/compare"),
    },
    {
      text: "ポケモンタイプじゃんけん",
      imageUrl: BALL_DICT["ultra-ball"].imageUrl,
      alt: "great-ball",
      onClick: () => navigateTo("/janken"),
    },
    {
      text: "ポケモンしりとり (制作中)",
      imageUrl: BALL_DICT["safari-ball"].imageUrl,
      alt: "safari-ball",
      onClick: () => navigateTo("/shiritori"),
    },
    {
      text: "ソースコード",
      imageUrl: BALL_DICT["premier-ball"].imageUrl,
      alt: "premier-ball",
      onClick: () => window.open(githubRepoUrl, "_blank"),
    },
  ];
</script>

<div class="container mx-auto h-full w-9/12 ml-4">
  <div class="mb-6">
    <h1 class="text-3xl font-bold">PokeAPI スタジアムへようこそ !</h1>
  </div>
  <div class="flex flex-col space-y-2 items-start">
    {#each contents as item}
      <button
        on:click|preventDefault={item.onClick}
        class="text-2xl text-blue-500 hover:underline font-bold py-2 px-4 flex items-center"
      >
        <img src={item.imageUrl} alt={item.alt} class="w-6 h-6 mr-2" />
        {item.text}
      </button>
    {/each}
  </div>
</div>
