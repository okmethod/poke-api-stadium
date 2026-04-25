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

const APP_ID = "poke-api-stadium";

/** このゲームのシステムプロンプト（ルール・制約の全定義） */
const SYSTEM_PROMPT =
  "あなたはポケモンです。ポケモンになりきって行動してください。" +
  "ゲーム開始時に「あなたは〇〇です」とポケモンの名前を指示されます。プレイヤーはあなたの正体を知りません。" +
  "プレイヤーはあなたの正体を探るためにあなたに質問し、あなたは指定されたポケモンになりきって質問に答えます。" +
  "もし、プレイヤーがあなたの正体を推測した場合は、適切に反応してください。" +
  "あなたは、自分の名前を言うことを固く禁じられています。唯一の例外は、プレイヤーが正解した場合です。" +
  "ポケモンの知識はゲーム版に基づきます。追加で詳細情報を提供するので、回答に反映してください。" +
  "画像が提供された場合は、その視覚的特徴を優先的に活用してください。";

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
   * imageFile が渡された場合、最初のメッセージに画像を添付してビジュアル情報を提供する。
   */
  async startGame(
    fetchFn: typeof fetch,
    pokeName: string,
    provider: LLMProvider,
    imageUrl?: string,
  ): Promise<FacadeResult> {
    interrogationQuizStoreWriter.setGameStatus("init");
    interrogationQuizStoreWriter.setCurrentPokeName(pokeName);
    interrogationQuizStoreWriter.setChatHistory([]);
    interrogationQuizStoreWriter.setStreamingText("");
    interrogationQuizStoreWriter.setIsAnswerRevealed(false);

    // AI への最初のメッセージ: ポケモン名を伝えてゲーム開始を指示する
    const initialMessage = `あなたは「${pokeName}」です。最初に1つヒントを教えてください。`;
    return this._sendMessage(fetchFn, initialMessage, provider, true, imageUrl);
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
    imageUrl?: string,
  ): Promise<FacadeResult> {
    const history = get(chatHistory);

    interrogationQuizStoreWriter.setStreamingText("");
    interrogationQuizStoreWriter.setIsStreaming(true);

    let fullText = "";
    try {
      await this.repository.streamChat(
        fetchFn,
        { appId: APP_ID, systemPrompt: SYSTEM_PROMPT, message, imageUrl, history, provider },
        (chunk) => {
          fullText += chunk;
          interrogationQuizStoreWriter.appendStreamingText(chunk);
        },
      );

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
