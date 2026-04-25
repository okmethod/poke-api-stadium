<script lang="ts">
  import Icon from "@iconify/svelte";
  import { getLLMChatRepository } from "$lib/infrastructure/adapters/HonoLLMProxyRepository";
  import { getPokeRepository } from "$lib/infrastructure/adapters/PokeApiAdapter";
  import { appSecretStore } from "$lib/application/stores/appSecretStore";
  import AppSecretModal from "$lib/presentation/components/modals/AppSecretModal.svelte";
  import { InterrogationQuizFacade } from "$lib/application/usecases/interrogationQuiz/interrogationQuizFacade";
  import {
    gameStatus,
    currentPokeName,
    pokeImageUrl,
    pokeCryUrl,
    streamingText,
    isStreaming,
    isAnswerRevealed,
    chatHistory,
  } from "$lib/application/usecases/interrogationQuiz/interrogationQuizStore";
  import type { LLMProvider } from "$lib/application/ports/ILLMServiceRepository";
  import { showErrorToast } from "$lib/presentation/utils/toaster";
  import { getAudioOn } from "$lib/presentation/stores/audioStore";
  import ChatWindow from "./_components/ChatWindow.svelte";

  const LLM_PROVIDERS: readonly LLMProvider[] = ["stub", "gemini", "claude", "groq"];
  const providerEnv = import.meta.env.VITE_DEFAULT_LLM_PROVIDER;
  const provider: LLMProvider = LLM_PROVIDERS.includes(providerEnv as LLMProvider) ? (providerEnv as LLMProvider) : "stub";

  const facade = new InterrogationQuizFacade(getLLMChatRepository(), getPokeRepository());

  // 初回 setup メッセージ（isInitial のユーザーメッセージ）を除いた表示用チャット履歴
  const firstModelIdx = $derived($chatHistory.findIndex((m) => m.role === "model"));
  const visibleHistory = $derived(firstModelIdx >= 0 ? $chatHistory.slice(firstModelIdx) : []);

  function playCry(): void {
    if ($pokeCryUrl && getAudioOn()) {
      new Audio($pokeCryUrl).play().catch(() => {});
    }
  }

  async function handleStart(): Promise<void> {
    const result = await facade.startGame(fetch, provider);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    } else {
      playCry();
    }
  }

  async function handleSend(text: string): Promise<void> {
    const result = await facade.sendMessage(fetch, text, provider);
    if (!result.success && result.error) {
      showErrorToast(result.error);
    } else {
      playCry();
    }
  }

  function handleReveal(): void {
    facade.revealAnswer();
    playCry();
  }

  const introductionText = "私はポケモンだよ。私が誰かわかるかな？\n「はじめる」を押して、私に質問してね！";
  const placeholderText = "質問を入力...";
</script>

{#if !$appSecretStore}
  <AppSecretModal />
{/if}

<div class="container mx-auto flex max-w-lg flex-col items-center gap-6 p-4">
  <h1 class="h3 sm:h2">ポケモンだ〜れだ？ 改</h1>

  <ChatWindow
    {introductionText}
    {placeholderText}
    chatHistory={visibleHistory}
    streamingText={$streamingText}
    isStreaming={$isStreaming}
    onSend={$gameStatus === "playing" ? handleSend : undefined}
  />

  {#if $gameStatus === "init"}
    <button type="button" class="btn preset-filled-primary-500 w-full" onclick={handleStart}>
      <Icon icon="mdi:play" class="size-5" />
      はじめる
    </button>
  {:else}
    <!-- こたえ表示エリア -->
    {#if $isAnswerRevealed}
      <div class="card bg-primary-100-900 w-full rounded-2xl p-4 text-center">
        <p class="text-surface-600-400 text-sm">こたえは...</p>
        <p class="text-primary-700-300 mt-1 text-2xl font-bold">{$currentPokeName}</p>
        <img src={$pokeImageUrl} alt={$currentPokeName ?? ""} class="mx-auto mt-3 size-40 object-contain" />
      </div>
    {/if}

    <!-- 操作ボタン -->
    {#if $gameStatus === "playing"}
      <button type="button" class="btn preset-tonal-warning w-full" onclick={handleReveal} disabled={$isStreaming}>
        <Icon icon="mdi:eye-outline" class="size-5" />
        こたえをみる
      </button>
    {:else if $gameStatus === "finished"}
      <button type="button" class="btn preset-tonal w-full" onclick={handleStart}>
        <Icon icon="mdi:restart" class="size-5" />
        もう一度
      </button>
    {/if}
  {/if}
</div>
