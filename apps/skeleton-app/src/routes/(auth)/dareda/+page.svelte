<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showSuccessToast, showErrorToast } from "$lib/presentation/utils/toaster";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { SilhouetteQuizFacade } from "$lib/application/usecases/silhouetteQuiz/SilhouetteQuizFacade";
  import { pokeData, isOpen, isLoading, hintText } from "$lib/application/usecases/silhouetteQuiz/silhouetteQuizStore";
  import PokeSilhouette from "./_components/PokeSilhouette.svelte";

  const facade = new SilhouetteQuizFacade(getPokeRepository());

  async function handlePick(): Promise<void> {
    const result = await facade.pickPokemon(fetch);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    }
  }

  function handleToggle(): void {
    const { cryUrl } = facade.toggleAnswer();
    if (cryUrl && getAudioOn()) {
      new Audio(cryUrl).play().catch(() => {});
    }
  }

  function handleHint(): void {
    const result = facade.getHint();
    if (!result.success) {
      showSuccessToast("よびだすボタン を おしてね");
    }
  }
</script>

<div class="container mx-auto p-4 flex flex-col items-center gap-6">
  <h1 class="h3 sm:h2">ポケモンだ〜れだ？</h1>

  <!-- 操作ボタン -->
  <div class="flex items-center gap-4">
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={handlePick}
      disabled={$isLoading}
      title="ポケモンをよびだす"
    >
      {#if $isLoading}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
      {:else}
        <Icon icon="mdi:pokeball" class="size-5" />
      {/if}
      よびだす
    </button>
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={handleHint}
      disabled={$pokeData === null}
      title="ヒントをみる"
    >
      <Icon icon="mdi:lightbulb-on-outline" class="size-5" />
      ヒント
    </button>
  </div>

  <!-- ヒントテキスト -->
  {#if $hintText !== null}
    <p class="text-sm text-surface-600 dark:text-surface-300">ヒント: {$hintText}</p>
  {:else}
    <p class="text-sm text-surface-400">&nbsp;</p>
  {/if}

  <!-- シルエット表示 -->
  <PokeSilhouette pokeData={$pokeData} isOpen={$isOpen} />

  <!-- こたえをみるボタン -->
  <button type="button" class="btn preset-filled btn-lg" onclick={handleToggle} disabled={$pokeData === null}>
    {$isOpen ? "かくす" : "こたえをみる"}
  </button>
</div>
