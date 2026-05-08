<script lang="ts">
  import { get } from "svelte/store";
  import Icon from "@iconify/svelte";
  import type { PokeData } from "$lib/domain/models/PokeData";
  import { resolvedCryUrl, resolveImageUrl } from "$lib/domain/models/PokeData";
  import DndSortablePokeTiles, {
    toDndItems,
    type DndPokeData,
  } from "$lib/presentation/components/atoms/DndSortablePokeTiles.svelte";
  import { CryOrderQuiz } from "$lib/application/usecases/CryOrderQuiz";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import { playSE } from "$lib/presentation/sounds/soundEffects";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { watchResultSE } from "$lib/presentation/utils/watchEffect.svelte";
  import SpawnButton from "$lib/presentation/components/buttons/SpawnButton.svelte";
  import PokeTile from "$lib/presentation/components/atoms/PokeTile.svelte";

  const facade = new CryOrderQuiz.Facade(getPokeRepository());
  const { pokeDataList, crySequence, isLoading, result } = CryOrderQuiz.Store;

  let orderedList = $state<DndPokeData[]>([]);
  // 鳴き声再生中かどうか
  let isPlaying = $state(false);
  // 現在再生中の番号（0-indexed、null は非再生）
  let currentCryIndex = $state<number | null>(null);

  async function handlePick(): Promise<void> {
    // ローカルstate をリセットしてから新しい問題を取得
    isPlaying = false;
    currentCryIndex = null;
    orderedList = [];
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

  watchResultSE(() => $result, playSE);

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
    <SpawnButton onclick={handlePick} isLoading={$isLoading} disabled={isPlaying} started={orderedList.length > 0} />

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
    <DndSortablePokeTiles bind:items={orderedList} itemSize="sm" />

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
              {@const imageUrl = resolveImageUrl(pokeData.imageUrls)}
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
      </div>
    {/if}
  {:else if !$isLoading}
    <div
      class="text-surface-400 border-surface-300 flex min-h-48 w-full max-w-2xl items-center justify-center rounded-xl border-2 border-dashed"
    >
      <p class="text-sm">はじめるボタン を おしてね</p>
    </div>
  {/if}
</div>
