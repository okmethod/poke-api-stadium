<script>
  import { navigateTo } from "$lib/utils/navigation.client";
  import { BALL_DICT } from "$lib/constants/ball";

  const githubRepoUrl = "https://github.com/okmethod/poke-api-stadium";

  const contents = [
    {
      text: "ポケモンずかん",
      imageUrl: BALL_DICT["poke-ball"].imageUrl,
      alt: "poke-ball",
      onClick: () => navigateTo("/zukan"),
    },
    {
      text: "ポケモンXXくらべ",
      imageUrl: BALL_DICT["great-ball"].imageUrl,
      alt: "great-ball",
      onClick: () => navigateTo("/kurabe"),
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

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">PokeAPI スタジアムへようこそ !</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !ml-4">
    {#each contents as item}
      <button on:click|preventDefault={item.onClick} class="cLinkButtonStyle md:!text-2xl">
        <img src={item.imageUrl} alt={item.alt} class="w-6 h-6 mr-2" />
        {item.text}
      </button>
    {/each}
  </div>
</div>
