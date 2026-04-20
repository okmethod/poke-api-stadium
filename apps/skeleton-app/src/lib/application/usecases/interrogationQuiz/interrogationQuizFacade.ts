/**
 * InterrogationQuizFacade - ポケモンだ〜れだ？改の全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存（Svelte/DOM/UIライブラリ）
 */

import { get } from "svelte/store";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import {
  interrogationQuizStoreWriter,
  chatHistory,
} from "$lib/application/usecases/interrogationQuiz/interrogationQuizStore";
import type { ILLMChatRepository, LLMProvider } from "$lib/application/ports/ILLMServiceRepository";

/** 使用する app_id（サーバー側のシステムプロンプト選択キー） */
const APP_ID = "interrogation-quiz";

/**
 * ポケモンだ〜れだ？改のゲーム操作を提供する Facade
 *
 * ILLMChatRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class InterrogationQuizFacade {
  constructor(private readonly repository: ILLMChatRepository) {}

  /**
   * ゲームを開始する
   *
   * ストアをリセットしてポケモン名をセットした後、AI に初回メッセージを送信する。
   */
  async startGame(fetchFn: typeof fetch, pokeName: string, provider: LLMProvider): Promise<FacadeResult> {
    interrogationQuizStoreWriter.setGameStatus("init");
    interrogationQuizStoreWriter.setCurrentPokeName(pokeName);
    interrogationQuizStoreWriter.setChatHistory([]);
    interrogationQuizStoreWriter.setStreamingText("");
    interrogationQuizStoreWriter.setIsAnswerRevealed(false);

    // AI への最初のメッセージ: ポケモン名を伝えてゲーム開始を指示する
    const initialMessage = `あなたは「${pokeName}」です。最初に1つヒントを教えてください。`;
    return this._sendMessage(fetchFn, initialMessage, provider, true);
  }

  /**
   * ユーザーのメッセージを送信し、AI のストリーミング応答を受信する
   */
  async sendMessage(fetchFn: typeof fetch, userText: string, provider: LLMProvider): Promise<FacadeResult> {
    if (!userText.trim()) return { success: false, error: "メッセージが空です" };
    return this._sendMessage(fetchFn, userText, provider, false);
  }

  /** こたえを表示する */
  revealAnswer(): void {
    interrogationQuizStoreWriter.setIsAnswerRevealed(true);
    interrogationQuizStoreWriter.setGameStatus("finished");
  }

  /** ゲームをリセットする（次の startGame 呼び出しに備える） */
  resetGame(): void {
    interrogationQuizStoreWriter.setGameStatus("init");
    interrogationQuizStoreWriter.setCurrentPokeName(null);
    interrogationQuizStoreWriter.setChatHistory([]);
    interrogationQuizStoreWriter.setStreamingText("");
    interrogationQuizStoreWriter.setIsStreaming(false);
    interrogationQuizStoreWriter.setIsAnswerRevealed(false);
  }

  // --- private helpers ---

  private async _sendMessage(
    fetchFn: typeof fetch,
    message: string,
    provider: LLMProvider,
    isInitial: boolean,
  ): Promise<FacadeResult> {
    const history = get(chatHistory);

    interrogationQuizStoreWriter.setStreamingText("");
    interrogationQuizStoreWriter.setIsStreaming(true);

    let fullText = "";
    try {
      await this.repository.streamChat(fetchFn, { appId: APP_ID, message, history, provider }, (chunk) => {
        fullText += chunk;
        interrogationQuizStoreWriter.appendStreamingText(chunk);
      });

      // 受信完了後、履歴に追加してストリーミング状態を解除する
      interrogationQuizStoreWriter.setChatHistory([
        ...history,
        { role: "user", content: message },
        { role: "model", content: fullText },
      ]);
      interrogationQuizStoreWriter.setStreamingText("");

      if (isInitial) {
        interrogationQuizStoreWriter.setGameStatus("playing");
      }
      return { success: true };
    } catch {
      interrogationQuizStoreWriter.setStreamingText("...エラーが発生しました。もう一度お試しください。");
      return { success: false, error: "AI との通信に失敗しました" };
    } finally {
      interrogationQuizStoreWriter.setIsStreaming(false);
    }
  }
}
