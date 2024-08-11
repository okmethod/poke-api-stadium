<script>
  import { navigateTo } from "$lib/utils/navigation.client";
  import { STATIC_BALL_DICT } from "$lib/constants/staticItemData";

  const githubRepoUrl = "https://github.com/okmethod/poke-api-stadium";

  const contents = [
    {
      text: "ポケモンずかん",
      imageUrl: STATIC_BALL_DICT["poke-ball"].imageUrl,
      alt: "poke-ball",
      onClick: () => navigateTo("/zukan"),
    },
    {
      text: "ポケモンだ〜れだ？",
      imageUrl: STATIC_BALL_DICT["dusk-ball"].imageUrl,
      alt: "dusk-ball",
      onClick: () => navigateTo("/dareda"),
    },
    {
      text: "ポケモンXXくらべ",
      imageUrl: STATIC_BALL_DICT["great-ball"].imageUrl,
      alt: "great-ball",
      onClick: () => navigateTo("/kurabe"),
    },
    {
      text: "ポケモンタイプじゃんけん",
      imageUrl: STATIC_BALL_DICT["ultra-ball"].imageUrl,
      alt: "great-ball",
      onClick: () => navigateTo("/janken"),
    },
    {
      text: "ポケモンしりとり",
      imageUrl: STATIC_BALL_DICT["safari-ball"].imageUrl,
      alt: "safari-ball",
      onClick: () => navigateTo("/shiritori"),
    },
    {
      text: "ソースコード",
      imageUrl: STATIC_BALL_DICT["premier-ball"].imageUrl,
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
