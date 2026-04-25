<script lang="ts">
  import Icon from "@iconify/svelte";
  import { tick } from "svelte";
  import type { ChatMessage } from "$lib/application/ports/ILLMServiceRepository";

  interface Props {
    introductionText?: string;
    placeholderText?: string;
    chatHistory: ChatMessage[];
    streamingText: string;
    isStreaming: boolean;
    /** 未定義のときは入力エリアを非表示にする */
    onSend?: (message: string) => Promise<void>;
  }

  type DisplayMessage = ChatMessage & { streaming?: true };

  let { introductionText, placeholderText, chatHistory, streamingText, isStreaming, onSend }: Props = $props();

  let userInput = $state("");
  let pendingUserMessage = $state<string | null>(null);
  let scrollEl: HTMLElement | null = $state(null);

  // 表示メッセージ一覧: 履歴 + 送信待ちユーザー発言 + ストリーミング中AI応答
  const displayMessages = $derived<DisplayMessage[]>([
    ...chatHistory,
    ...(pendingUserMessage !== null ? [{ role: "user" as const, content: pendingUserMessage }] : []),
    ...(isStreaming ? [{ role: "model" as const, content: streamingText, streaming: true as const }] : []),
  ]);

  // isStreaming が false になったとき送信待ちメッセージをクリア
  $effect(() => {
    if (!isStreaming) pendingUserMessage = null;
  });

  // メッセージ更新・ストリーミング受信時に最下部へスクロール
  $effect(() => {
    void displayMessages.length;
    void streamingText;
    tick().then(() => {
      if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
    });
  });

  async function handleSend(): Promise<void> {
    const text = userInput.trim();
    if (!text || isStreaming || !onSend) return;
    userInput = "";
    pendingUserMessage = text;
    await onSend(text);
  }

  function handleKeydown(e: KeyboardEvent): void {
    // Shift+Enter で送信、単独 Enter は改行
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
</script>

<div class="flex w-full flex-col gap-3">
  <!-- メッセージ一覧 -->
  <div bind:this={scrollEl} class="flex max-h-[50vh] min-h-24 flex-col gap-3 overflow-y-auto pr-1">
    {#if displayMessages.length === 0}
      <p class="text-surface-400 mt-8 text-center text-sm whitespace-pre-wrap">
        {introductionText ?? placeholderText ?? "チャットを開始するとここに会話が表示されます"}
      </p>
    {:else}
      {#each displayMessages as msg, i (i)}
        {#if msg.role === "user"}
          <!-- ユーザーメッセージ（右揃え） -->
          <div class="flex justify-end">
            <div
              class="bg-primary-100-900 max-w-[78%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
            >
              {msg.content}
            </div>
          </div>
        {:else}
          <!-- AI メッセージ（左揃え） -->
          <div class="flex items-start justify-start gap-2">
            <div class="bg-surface-100-900 flex size-8 shrink-0 items-center justify-center rounded-full">
              <Icon icon="mdi:robot" class="text-primary-500 size-5" />
            </div>
            <div class="bg-surface-100-900 max-w-[78%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed">
              {#if msg.streaming && msg.content === ""}
                <!-- 考え中のドット -->
                <span class="flex items-center gap-1 py-0.5">
                  <span class="bg-surface-400-600 size-2 animate-bounce rounded-full" style="animation-delay: 0ms"
                  ></span>
                  <span class="bg-surface-400-600 size-2 animate-bounce rounded-full" style="animation-delay: 150ms"
                  ></span>
                  <span class="bg-surface-400-600 size-2 animate-bounce rounded-full" style="animation-delay: 300ms"
                  ></span>
                </span>
              {:else}
                <span class="whitespace-pre-wrap">{msg.content}</span>
                {#if msg.streaming}
                  <!-- ストリーミング中のカーソル -->
                  <span class="bg-primary-500 ml-0.5 inline-block h-[0.85em] w-px animate-pulse align-[-0.05em]"></span>
                {/if}
              {/if}
            </div>
          </div>
        {/if}
      {/each}
    {/if}
  </div>

  <!-- 入力エリア（onSend が渡されたときのみ表示） -->
  {#if onSend}
    <div class="flex items-end gap-2">
      <textarea
        class="input min-h-[44px] flex-1 resize-none overflow-hidden rounded-xl py-2.5 text-sm"
        placeholder={placeholderText ?? "メッセージを入力..."}
        rows={1}
        bind:value={userInput}
        onkeydown={handleKeydown}
        disabled={isStreaming}
        oninput={(e) => {
          const t = e.currentTarget;
          t.style.height = "auto";
          t.style.height = `${t.scrollHeight}px`;
        }}
      ></textarea>
      <button
        type="button"
        class="btn preset-filled-primary-500 shrink-0"
        onclick={handleSend}
        disabled={isStreaming || !userInput.trim()}
      >
        {#if isStreaming}
          <Icon icon="mdi:loading" class="size-5 animate-spin" />
        {:else}
          <Icon icon="mdi:send" class="size-5" />
        {/if}
      </button>
    </div>
    <p class="text-surface-400 -mt-1 text-right text-xs">Shift+Enter で送信</p>
  {/if}
</div>
