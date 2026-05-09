/**
 * InterrogationQuiz (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { InterrogationQuizFacade } from "$lib/application/usecases/InterrogationQuiz/facade";
import {
  gameStatus,
  currentPokeName,
  chatHistory,
  isAnswerRevealed,
  streamingText,
  isStreaming,
  pokeImageUrl,
  pokeCryUrl,
  storeWriter,
} from "$lib/application/usecases/InterrogationQuiz/store";
import type { ILLMChatRepository } from "$lib/application/ports/ILLMServiceRepository";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemon: vi.fn(),
}));

import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

function createMockLLMRepo(): ILLMChatRepository {
  return {
    streamChat: vi.fn(),
  };
}

const poke = buildMockPokeData({ jaName: "ピカチュウ" });

describe("InterrogationQuizFacade", () => {
  let facade: InterrogationQuizFacade;
  let llmRepo: ILLMChatRepository;

  beforeEach(() => {
    storeWriter.reset();
    llmRepo = createMockLLMRepo();
    facade = new InterrogationQuizFacade(llmRepo, createMockRepository());
    vi.mocked(selectRandomPokemon).mockReset();
    vi.mocked(llmRepo.streamChat).mockReset();
  });

  describe("startGame", () => {
    it("成功時は success: true を返しゲームが playing 状態になる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("最初のヒントです。");
      });

      const res = await facade.startGame(mockFetch, "stub");

      expect(res.success).toBe(true);
      expect(get(gameStatus)).toBe("playing");
      expect(get(currentPokeName)).toBe("ピカチュウ");
      expect(get(chatHistory)).toHaveLength(2); // user + model
    });

    it("LLM 通信失敗時は success: false を返す", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      vi.mocked(llmRepo.streamChat).mockRejectedValue(new Error("Network Error"));

      const res = await facade.startGame(mockFetch, "stub");

      expect(res.success).toBe(false);
    });

    it("ポケモン取得失敗時は success: false を返す", async () => {
      vi.mocked(selectRandomPokemon).mockRejectedValue(new Error("Network Error"));

      const res = await facade.startGame(mockFetch, "stub");

      expect(res.success).toBe(false);
    });
  });

  describe("sendMessage", () => {
    it("空文字列を送ると success: false を返す", async () => {
      const res = await facade.sendMessage(mockFetch, "   ", "stub");
      expect(res.success).toBe(false);
    });

    it("メッセージを送ると success: true を返し chatHistory が伸びる", async () => {
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("わかった。");
      });

      const res = await facade.sendMessage(mockFetch, "ねずみポケモンですか？", "stub");

      expect(res.success).toBe(true);
      expect(get(chatHistory)).toHaveLength(2);
    });

    it("RATE_LIMIT エラーのとき専用メッセージがストアにセットされる", async () => {
      vi.mocked(llmRepo.streamChat).mockRejectedValue(new Error("RATE_LIMIT"));

      await facade.sendMessage(mockFetch, "test", "stub");

      expect(get(streamingText)).toContain("つかれちゃったよ");
    });

    it("RATE_LIMIT 以外のエラーのとき汎用エラーメッセージがストアにセットされる", async () => {
      vi.mocked(llmRepo.streamChat).mockRejectedValue(new Error("Network Error"));

      await facade.sendMessage(mockFetch, "test", "stub");

      expect(get(streamingText)).toContain("エラーが発生しました");
    });

    it("送信完了後に isStreaming が false に戻る", async () => {
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("返答");
      });

      await facade.sendMessage(mockFetch, "質問です", "stub");

      expect(get(isStreaming)).toBe(false);
    });

    it("エラー時でも isStreaming が false に戻る", async () => {
      vi.mocked(llmRepo.streamChat).mockRejectedValue(new Error("Network Error"));

      await facade.sendMessage(mockFetch, "質問です", "stub");

      expect(get(isStreaming)).toBe(false);
    });

    it("LLM からのチャンクが streamingText に逐次蓄積される", async () => {
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("チャンク1");
        onChunk("チャンク2");
      });

      await facade.sendMessage(mockFetch, "質問です", "stub");

      // 受信完了後は streamingText がクリアされ、履歴に移される
      expect(get(streamingText)).toBe("");
      expect(get(chatHistory).at(1)?.content).toBe("チャンク1チャンク2");
    });

    it("sendMessage は gameStatus を変化させない", async () => {
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("返答");
      });

      await facade.sendMessage(mockFetch, "質問です", "stub");

      // startGame を経ていないので init のまま
      expect(get(gameStatus)).toBe("init");
    });
  });

  describe("revealAnswer", () => {
    it("isAnswerRevealed が true になり gameStatus が finished になる", () => {
      facade.revealAnswer();

      expect(get(isAnswerRevealed)).toBe(true);
      expect(get(gameStatus)).toBe("finished");
    });
  });

  describe("startGame の追加挙動", () => {
    it("成功時に pokeImageUrl がストアにセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("ヒント");
      });

      await facade.startGame(mockFetch, "stub");

      // pixel.front が存在するのでそちらが使われる
      expect(get(pokeImageUrl)).toBe(poke.imageUrls.pixel.front);
    });

    it("成功時に pokeCryUrl がストアにセットされる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("ヒント");
      });

      await facade.startGame(mockFetch, "stub");

      expect(get(pokeCryUrl)).toBe(poke.cryUrls.latest);
    });

    it("startGame 完了後に isStreaming が false に戻る", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("ヒント");
      });

      await facade.startGame(mockFetch, "stub");

      expect(get(isStreaming)).toBe(false);
    });

    it("startGame を再呼び出しするとストアがリセットされ新しいポケモンで開始する", async () => {
      // 1回目: ピカチュウでゲーム開始
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke);
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("最初のヒント");
      });
      await facade.startGame(mockFetch, "stub");

      const pokeAfterFirst = buildMockPokeData({ jaName: "フシギダネ" });

      // 2回目: 別のポケモンで再開始
      vi.mocked(selectRandomPokemon).mockResolvedValue(pokeAfterFirst);
      vi.mocked(llmRepo.streamChat).mockImplementation(async (_fetch, _params, onChunk) => {
        onChunk("次のヒント");
      });
      await facade.startGame(mockFetch, "stub");

      // ストアがリセットされ新しい状態になっている
      expect(get(currentPokeName)).toBe("フシギダネ");
      // chatHistory は新しいゲームの分だけ（user + model）
      expect(get(chatHistory)).toHaveLength(2);
      expect(get(isAnswerRevealed)).toBe(false);
    });
  });
});
