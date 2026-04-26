/**
 * ポケモン尋問クイズの全操作コマンドの唯一の入り口
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: ゲーム進行制御、プレゼン層へのゲーム操作手段の提供
 * - ALLOWED: ドメイン層への依存、アプリ層ストアへの依存、アプリ層 Port への依存
 * - FORBIDDEN: インフラ層への直接依存、プレゼン層への依存
 */

import { get } from "svelte/store";
import type { FacadeResult } from "$lib/application/usecases/facadeTypes";
import type { ILLMChatRepository, LLMProvider } from "$lib/application/ports/ILLMServiceRepository";
import type { IPokeRepository } from "$lib/application/ports/IPokeRepository";
import type { PokeData } from "$lib/domain/models/PokeData";
import { resolvedCryUrl } from "$lib/domain/models/PokeData";
import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";
import { withLoadingGuard } from "$lib/application/usecases/usecaseUtils";
import { storeWriter, chatHistory } from "./store";

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
 * ポケモン尋問クイズのゲーム操作を提供する Facade
 *
 * ILLMChatRepository を constructor injection で受け取ることで、
 * テスト時にモックを注入可能にする。
 */
export class InterrogationQuizFacade {
  constructor(
    private readonly repository: ILLMChatRepository,
    private readonly pokeRepository: IPokeRepository,
  ) {}

  /**
   * ポケモンを抽選してゲームを開始する
   *
   * generationStore の選択世代からポケモンをランダムに選び、ストアをリセットした後、
   * LLM に初回メッセージを送信する。「もう一度」時も同じメソッドを呼び出す。
   */
  async startGame(fetchFn: typeof fetch, provider: LLMProvider): Promise<FacadeResult> {
    return withLoadingGuard(
      () => selectRandomPokemon(this.pokeRepository, fetchFn),
      undefined,
      async (pokeData) => {
        const { pokeName, imageUrl } = this._initGameState(pokeData);
        // LLM への最初のメッセージ: ポケモン名を伝えてゲーム開始を指示する
        const initialMessage = `あなたは「${pokeName}」です。最初に1つヒントを教えてください。`;
        return this._sendMessage(fetchFn, initialMessage, provider, true, imageUrl);
      },
      undefined,
    );
  }

  /**
   * ユーザーのメッセージを送信し、LLM のストリーミング応答を受信する
   */
  async sendMessage(fetchFn: typeof fetch, userText: string, provider: LLMProvider): Promise<FacadeResult> {
    if (!userText.trim()) return { success: false, error: "メッセージが空です" };
    return this._sendMessage(fetchFn, userText, provider, false);
  }

  /** こたえを表示する */
  revealAnswer(): void {
    storeWriter.setIsAnswerRevealed(true);
    storeWriter.setGameStatus("finished");
  }

  // --- private helpers ---

  private _initGameState(pokeData: PokeData) {
    storeWriter.reset();

    const pokeName = pokeData.jaName;
    const imageUrl = pokeData.imageUrls.pixel.front || pokeData.imageUrls.artwork.front;
    const cryUrl = resolvedCryUrl(pokeData.cryUrls);
    storeWriter.setCurrentPokeName(pokeName);
    storeWriter.setPokeImageUrl(imageUrl);
    storeWriter.setPokeCryUrl(cryUrl);

    return { pokeName, imageUrl };
  }

  private async _sendMessage(
    fetchFn: typeof fetch,
    message: string,
    provider: LLMProvider,
    isInitial: boolean,
    imageUrl?: string,
  ): Promise<FacadeResult> {
    const history = get(chatHistory);

    storeWriter.setStreamingText("");
    storeWriter.setIsStreaming(true);

    let fullText = "";
    try {
      await this.repository.streamChat(
        fetchFn,
        { appId: APP_ID, systemPrompt: SYSTEM_PROMPT, message, imageUrl, history, provider },
        (chunk) => {
          fullText += chunk;
          storeWriter.appendStreamingText(chunk);
        },
      );

      // 受信完了後、履歴に追加してストリーミング状態を解除する
      storeWriter.setChatHistory([
        ...history,
        { role: "user", content: message },
        { role: "model", content: fullText },
      ]);
      storeWriter.setStreamingText("");

      if (isInitial) {
        storeWriter.setGameStatus("playing");
      }
      return { success: true };
    } catch (err) {
      const isRateLimit = err instanceof Error && err.message === "RATE_LIMIT";
      storeWriter.setStreamingText(
        isRateLimit ? "今日はもう、つかれちゃったよ..." : "...エラーが発生しました。もう一度お試しください。",
      );
      return {
        success: false,
        error: isRateLimit ? "今日はもう、つかれちゃったよ..." : "LLM との通信に失敗しました",
      };
    } finally {
      storeWriter.setIsStreaming(false);
    }
  }
}
