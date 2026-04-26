<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { showSuccessToast, showErrorToast } from "$lib/presentation/utils/toaster";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { SilhouetteQuiz } from "$lib/application/usecases/SilhouetteQuiz";
  import PokeSilhouette from "./_components/PokeSilhouette.svelte";

  const facade = new SilhouetteQuiz.Facade(getPokeRepository());
  const { pokeData, isOpen, isLoading, hintText } = SilhouetteQuiz.Store;

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

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
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
    <p class="text-surface-600 dark:text-surface-300 text-sm">ヒント: {$hintText}</p>
  {:else}
    <p class="text-surface-400 text-sm">&nbsp;</p>
  {/if}

  <!-- シルエット表示 -->
  <PokeSilhouette pokeData={$pokeData} isOpen={$isOpen} />

  <!-- こたえをみる or もう一度ボタン -->
  {#if $isOpen}
    <button type="button" class="btn preset-tonal" onclick={handlePick}>
      <Icon icon="mdi:restart" class="size-5" />
      もう一度
    </button>
  {:else}
    <button type="button" class="btn preset-tonal" onclick={handleToggle} disabled={$pokeData === null}>
      <Icon icon="mdi:eye-outline" class="size-5" />
      こたえをみる
    </button>
  {/if}
</div>
