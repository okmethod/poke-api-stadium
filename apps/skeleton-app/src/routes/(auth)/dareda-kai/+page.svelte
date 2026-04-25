<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getLLMChatRepository } from "$lib/infrastructure/adapters/HonoLLMProxyRepository";
  import { appSecretStore } from "$lib/application/stores/appSecretStore";
  import AppSecretModal from "$lib/presentation/components/modals/AppSecretModal.svelte";
  import { InterrogationQuizFacade } from "$lib/application/usecases/interrogationQuiz/interrogationQuizFacade";
  import {
    gameStatus,
    currentPokeName,
    streamingText,
    isStreaming,
    isAnswerRevealed,
    chatHistory,
  } from "$lib/application/usecases/interrogationQuiz/interrogationQuizStore";
  import { showErrorToast } from "$lib/presentation/utils/toaster";

  interface Props {
    data: { pokeName: string; provider: import("$lib/application/ports/ILLMServiceRepository").LLMProvider };
  }
  let { data }: Props = $props();

  const facade = new InterrogationQuizFacade(getLLMChatRepository());

  let userInput = $state("");

  // チャット履歴の最新 AI メッセージ（ストリーミング中はstreamingTextを優先）
  const latestAiText = $derived(
    $isStreaming ? $streamingText : ($chatHistory.findLast((m) => m.role === "model")?.content ?? null),
  );

  async function handleStart(): Promise<void> {
    userInput = "";
    const result = await facade.startGame(fetch, data.pokeName, data.provider);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  async function handleSend(): Promise<void> {
    if (!userInput.trim() || $isStreaming) return;
    const text = userInput;
    userInput = "";
    const result = await facade.sendMessage(fetch, text, data.provider);
    if (!result.success && result.error) showErrorToast(result.error);
  }

  function handleReveal(): void {
    facade.revealAnswer();
  }

  function handleReset(): void {
    facade.resetGame();
    userInput = "";
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
</script>

{#if !$appSecretStore}
  <AppSecretModal />
{/if}

<div class="container mx-auto flex max-w-lg flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンだ〜れだ？ 改</h1>
  <p class="text-surface-600-400 text-sm">1〜151番のポケモンをAIへの質問で当てよう！</p>

  <!-- AI 吹き出し -->
  <div class="card bg-surface-100-900 w-full rounded-2xl p-4">
    <div class="mb-2 flex items-center gap-2">
      <Icon icon="mdi:robot" class="text-primary-500 size-5" />
      <span class="text-sm font-semibold">ポケモン AI</span>
    </div>
    <div class="text-surface-800-200 min-h-16 text-sm leading-relaxed whitespace-pre-wrap">
      {#if $gameStatus === "init"}
        「はじめる」をおすと、AIがポケモンになりきって質問に答えるよ。何でも聞いてみよう！
      {:else if $isStreaming && $streamingText === ""}
        <span class="text-surface-400 animate-pulse">考えています...</span>
      {:else if latestAiText}
        {latestAiText}
      {/if}
    </div>
  </div>

  <!-- こたえ表示エリア -->
  {#if $isAnswerRevealed}
    <div class="card bg-primary-100-900 w-full rounded-2xl p-4 text-center">
      <p class="text-surface-600-400 text-sm">こたえは...</p>
      <p class="text-primary-700-300 mt-1 text-2xl font-bold">{$currentPokeName}</p>
    </div>
  {/if}

  <!-- 操作エリア -->
  {#if $gameStatus === "init"}
    <button type="button" class="btn preset-filled-primary-500 w-full" onclick={handleStart}>
      <Icon icon="mdi:play" class="size-5" />
      はじめる
    </button>
  {:else if $gameStatus === "playing"}
    <div class="flex w-full flex-col gap-3">
      <div class="flex gap-2">
        <input
          type="text"
          class="input flex-1 rounded-xl"
          placeholder="質問を入力..."
          bind:value={userInput}
          onkeydown={handleKeydown}
          disabled={$isStreaming}
        />
        <button
          type="button"
          class="btn preset-filled-primary-500"
          onclick={handleSend}
          disabled={$isStreaming || !userInput.trim()}
        >
          {#if $isStreaming}
            <Icon icon="mdi:loading" class="size-5 animate-spin" />
          {:else}
            <Icon icon="mdi:send" class="size-5" />
          {/if}
        </button>
      </div>
      <button type="button" class="btn preset-tonal-warning w-full" onclick={handleReveal} disabled={$isStreaming}>
        <Icon icon="mdi:eye-outline" class="size-5" />
        こたえをみる
      </button>
    </div>
  {:else if $gameStatus === "finished"}
    <button type="button" class="btn preset-tonal w-full" onclick={handleReset}>
      <Icon icon="mdi:restart" class="size-5" />
      もう一度
    </button>
  {/if}
</div>
