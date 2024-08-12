<script lang="ts">
  import type { ContentButtonProps } from "./+page";

  export let data: {
    propsArray: Array<ContentButtonProps>;
  };
</script>

<div class="cRouteBodyStyle">
  <!-- タイトル部 -->
  <div class="cTitlePartStyle md:!mb-4">
    <h1 class="cTitleStyle md:!text-3xl">PokeAPI スタジアムへようこそ !</h1>
  </div>

  <!-- コンテンツ部 -->
  <div class="cContentPartStyle !ml-4">
    {#each data.propsArray as props}
      <button on:click|preventDefault={props.onClick} class="cLinkButtonStyle md:!text-2xl">
        <img src={props.imageUrl} alt={props.alt} class="w-6 h-6 mr-2" />
        {props.title}
      </button>
    {/each}
  </div>
</div>
