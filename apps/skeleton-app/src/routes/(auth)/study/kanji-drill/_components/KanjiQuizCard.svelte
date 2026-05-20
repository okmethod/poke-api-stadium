<script lang="ts">
  import type { KanjiQuizItem } from "$lib/application/usecases/KanjiFillQuiz";

  interface Props {
    item: KanjiQuizItem;
    mode: "yomi" | "kaki";
  }

  let { item, mode }: Props = $props();
  let revealed = $state(false);

  // mode または item が変わったら答えを隠す
  $effect(() => {
    void mode;
    void item;
    revealed = false;
  });

  const prefix = $derived(mode === "yomi" ? item.prefix : item.kanaPrefix);
  const target = $derived(mode === "yomi" ? item.targetKanji : item.reading);
  const suffix = $derived(mode === "yomi" ? item.suffix : item.kanaSuffix);
  const answer = $derived(mode === "yomi" ? item.reading : item.targetKanji);
</script>

<div class="card bg-surface-100-900 flex flex-col items-center gap-3 rounded-xl p-4">
  <p class="text-center text-lg leading-relaxed">
    {prefix}<span class="border-b-2 border-current font-bold">{target}</span>{suffix}
  </p>
  {#if revealed}
    <div class="bg-primary-200-800 rounded-lg px-4 py-1">
      <span class="text-base font-semibold">{answer}</span>
    </div>
  {:else}
    <button type="button" class="btn preset-tonal btn-base" onclick={() => (revealed = true)}> こたえ </button>
  {/if}
</div>
