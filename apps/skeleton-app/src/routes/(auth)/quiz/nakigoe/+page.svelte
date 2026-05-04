<script lang="ts">
  import { get } from "svelte/store";
  import Icon from "@iconify/svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import { resolvedCryUrl } from "$lib/domain/models/PokeData";
  import { type DndPokeData, toDndItems } from "$lib/presentation/utils/dnd";
  import { CryOrderQuiz } from "$lib/application/usecases/CryOrderQuiz";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import PokeTile from "$lib/presentation/components/atoms/PokeTile.svelte";

  const facade = new CryOrderQuiz.Facade(getPokeRepository());
  const { pokeDataList, crySequence, isLoading, result } = CryOrderQuiz.Store;

  let orderedList = $state<DndPokeData[]>([]);
  // 鳴き声再生中かどうか
  let isPlaying = $state(false);
  // 現在再生中の番号（0-indexed、null は非再生）
  let currentCryIndex = $state<number | null>(null);

  async function handlePick(): Promise<void> {
    const facadeResult = await facade.pickPokemons(fetch);
    if (!facadeResult.success && facadeResult.error) {
      showErrorToast(facadeResult.error);
    } else {
      // 表示順は [0,1,2]（鳴き声順 crySequence とは別）
      orderedList = toDndItems(get(pokeDataList));
    }
  }

  async function handlePlayCries(): Promise<void> {
    if (isPlaying) return;
    isPlaying = true;
    const list = get(pokeDataList);
    const seq = get(crySequence);
    const audioOn = getAudioOn();

    for (let i = 0; i < seq.length; i++) {
      currentCryIndex = i;
      const poke = list[seq[i]!];
      if (!poke) continue;
      const cryUrl = resolvedCryUrl(poke.cryUrls);
      if (cryUrl && audioOn) {
        await new Promise<void>((resolve) => {
          const audio = new Audio(cryUrl);
          audio.onended = () => resolve();
          audio.onerror = () => resolve();
          audio.play().catch(() => resolve());
        });
      } else {
        // 音声OFFのときは代替として待機
        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      }
      // 次の鳴き声まで間隔を空ける
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
    }

    currentCryIndex = null;
    isPlaying = false;
  }

  function handleReveal(): void {
    facade.revealResult(orderedList, get(pokeDataList), get(crySequence));
  }

  function handleReset(): void {
    facade.reset();
    orderedList = [];
    isPlaying = false;
    currentCryIndex = null;
  }

  // $effect は初回マウント時にも実行されるため、初回はスキップして変化時のみ SE を鳴らす
  let seEffectReady = false;
  $effect(() => {
    const currentResult = $result;
    if (!seEffectReady) {
      seEffectReady = true;
      return;
    }
    if (currentResult !== null) {
      if (currentResult.isCorrect) playSE.correct();
      else playSE.incorrect();
    }
  });

  function handleConsider(event: CustomEvent<DndEvent<DndPokeData>>): void {
    orderedList = event.detail.items;
  }

  function handleFinalize(event: CustomEvent<DndEvent<DndPokeData>>): void {
    orderedList = event.detail.items;
  }

  /** 答え合わせ後に正解順を返す */
  function correctOrder(): PokeData[] {
    const list = get(pokeDataList);
    const seq = get(crySequence);
    return seq.map((i) => list[i]!);
  }
</script>

<div class="container mx-auto flex flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">なきごえならべ</h1>

  <!-- 操作ボタン -->
  <div class="flex flex-wrap items-center justify-center gap-3">
    <button
      type="button"
      class="btn preset-tonal btn-sm"
      onclick={handlePick}
      disabled={$isLoading || isPlaying}
      title="ポケモンをよびだす"
    >
      {#if $isLoading}
        <Icon icon="mdi:loading" class="size-5 animate-spin" />
      {:else}
        <Icon icon="mdi:pokeball" class="size-5" />
      {/if}
      よびだす
    </button>

    {#if orderedList.length > 0}
      <button
        type="button"
        class="btn preset-filled btn-sm"
        onclick={handlePlayCries}
        disabled={isPlaying}
        title="なきごえを順番に再生する"
      >
        <Icon icon="mdi:volume-high" class="size-5" />
        なきごえを聞く
      </button>
    {/if}
  </div>

  <!-- ポケモン並べ替えエリア -->
  {#if orderedList.length > 0}
    <div
      class="border-surface-300 text-surface-400 flex min-h-48 w-full justify-center gap-4 overflow-x-auto rounded-xl border-2 border-dashed pb-1"
      use:dndzone={{ items: orderedList, flipDurationMs: 200, dropTargetStyle: {} }}
      onconsider={handleConsider}
      onfinalize={handleFinalize}
    >
      {#each orderedList as pokeData, index (pokeData.id)}
        {@const imageUrl = pokeData.imageUrls.pixel.front ?? pokeData.imageUrls.artwork.front ?? null}
        <div class="flex size-48 cursor-grab flex-col items-center justify-center gap-1 select-none sm:size-56">
          <PokeTile name={pokeData.jaName} {imageUrl} type1={pokeData.type1} type2={pokeData.type2} />
          <p class="text-surface-500 text-center text-sm">{index + 1} ばんめ</p>
        </div>
      {/each}
    </div>

    <!-- 再生中インジケーター -->
    {#if isPlaying && currentCryIndex !== null}
      <div class="text-primary-500 flex h-8 items-center gap-2 text-sm font-bold">
        <Icon icon="mdi:music-note" class="size-6 animate-bounce" />
        {currentCryIndex + 1}ばんめ のなきごえ...
        <Icon icon="mdi:music-note" class="size-6 animate-bounce" />
      </div>
    {:else if orderedList.length > 0 && !$result}
      <p class="text-surface-400 flex h-8 items-center justify-center text-sm">なきごえのじゅんばんに並べよう</p>
    {/if}

    <!-- 回答ボタン -->
    {#if !$result}
      <button type="button" class="btn preset-tonal" onclick={handleReveal} disabled={isPlaying}>
        <Icon icon="mdi:eye-outline" class="size-5" />
        こたえをみる
      </button>
    {/if}

    <!-- 結果表示 -->
    {#if $result !== null}
      <div class="flex flex-col items-center gap-4">
        <p class="text-2xl font-bold">{$result.message}</p>

        <!-- 正解の順番を表示 -->
        <div class="flex flex-col items-center gap-2">
          <p class="text-surface-500 text-sm">正解のじゅんばん</p>
          <div class="flex gap-3">
            {#each correctOrder() as pokeData, index (pokeData.speciesId)}
              {@const imageUrl = pokeData.imageUrls.pixel.front ?? pokeData.imageUrls.artwork.front ?? null}
              {@const isUserCorrect = orderedList[index]?.speciesId === pokeData.speciesId}
              <div class="flex flex-col items-center gap-1">
                <div
                  class="rounded-lg border-2 {isUserCorrect ? 'border-success-500' : 'border-error-500'} scale-75 p-1"
                >
                  <PokeTile name={pokeData.jaName} {imageUrl} type1={pokeData.type1} type2={pokeData.type2} />
                </div>
                <p class="text-xs">{index + 1} ばんめ</p>
              </div>
            {/each}
          </div>
        </div>

        <button type="button" class="btn preset-tonal" onclick={handleReset}>
          <Icon icon="mdi:refresh" class="size-5" />
          もう一度
        </button>
      </div>
    {/if}
  {:else if !$isLoading}
    <!-- 未選出状態のプレースホルダー -->
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed"
    >
      <p class="text-sm">「よびだす」を押してポケモンをよびだそう</p>
    </div>
  {/if}
</div>
