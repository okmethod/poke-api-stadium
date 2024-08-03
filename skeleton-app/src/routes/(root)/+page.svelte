<script>
  import { navigateTo } from "$lib/utils/navigation.client";

  function navigateToSimplePage() {
    navigateTo("/simple");
  }
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-5">
    <h1 class="h1">Hello, Welcome to PokeAPI Stadium !</h1>
    <button on:click={navigateToSimplePage} class="btn btn-primary">Simpleページへ</button>
  </div>
</div>
