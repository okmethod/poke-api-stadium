/**
 * MemoryGame (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { get } from "svelte/store";
import { MemoryGameFacade } from "$lib/application/usecases/MemoryGame/facade";
import {
  cards,
  isChecking,
  matchedPairCount,
  moveCount,
  isGameClear,
  lastMatchResult,
} from "$lib/application/usecases/MemoryGame/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

describe("MemoryGameFacade", () => {
  let facade: MemoryGameFacade;
  const pokes = [
    buildMockPokeData({ speciesId: 1, jaName: "フシギダネ" }),
    buildMockPokeData({ speciesId: 25, jaName: "ピカチュウ" }),
  ];

  beforeEach(() => {
    facade = new MemoryGameFacade(createMockRepository());
    vi.mocked(selectRandomPokemons).mockReset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("startGame", () => {
    it("成功時はカードが 2×pairCount 枚生成される（すべて裏向き）", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);

      const res = await facade.startGame(mockFetch, 2);

      expect(res.success).toBe(true);
      const currentCards = get(cards);
      expect(currentCards).toHaveLength(4);
      expect(currentCards.every((c) => !c.isFlipped && !c.isMatched)).toBe(true);
    });

    it("失敗時は success: false を返し cards が空になる", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      const res = await facade.startGame(mockFetch, 2);

      expect(res.success).toBe(false);
      expect(get(cards)).toHaveLength(0);
    });

    it("再呼び出しするとゲーム状態（手数・ペア数・クリア）がリセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.startGame(mockFetch, 2);
      facade.selectCard(0); // 手数を進める

      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.startGame(mockFetch, 2);

      expect(get(moveCount)).toBe(0);
      expect(get(matchedPairCount)).toBe(0);
      expect(get(isGameClear)).toBe(false);
      expect(get(cards).every((c) => !c.isFlipped && !c.isMatched)).toBe(true);
    });
  });

  describe("selectCard", () => {
    async function setupCards() {
      vi.mocked(selectRandomPokemons).mockResolvedValue(pokes);
      await facade.startGame(mockFetch, 2);
    }

    it("1枚目を選択するとそのカードが表になる", async () => {
      await setupCards();
      facade.selectCard(0);
      expect(get(cards)[0]!.isFlipped).toBe(true);
    });

    it("同じ pairId のカード2枚を選択するとマッチしてペア数が増える", async () => {
      await setupCards();
      const currentCards = get(cards);
      // pairId 0 のカードを2枚探す
      const [first, second] = currentCards.reduce<number[]>((acc, c, i) => {
        if (c.pairId === 0) acc.push(i);
        return acc;
      }, []);

      facade.selectCard(first!);
      facade.selectCard(second!);

      expect(get(matchedPairCount)).toBe(1);
      expect(get(moveCount)).toBe(1);
      expect(get(lastMatchResult)).toEqual({ isCorrect: true });
    });

    it("異なる pairId のカード2枚を選択すると不一致になる", async () => {
      await setupCards();
      const currentCards = get(cards);
      const pairId0Idx = currentCards.findIndex((c) => c.pairId === 0);
      const pairId1Idx = currentCards.findIndex((c) => c.pairId === 1);

      facade.selectCard(pairId0Idx);
      facade.selectCard(pairId1Idx);

      expect(get(lastMatchResult)).toEqual({ isCorrect: false });
      expect(get(matchedPairCount)).toBe(0);
    });

    it("不一致時: タイマー経過後にカードが裏に戻り isChecking が解除される", async () => {
      await setupCards();
      const currentCards = get(cards);
      const pairId0Idx = currentCards.findIndex((c) => c.pairId === 0);
      const pairId1Idx = currentCards.findIndex((c) => c.pairId === 1);

      facade.selectCard(pairId0Idx);
      facade.selectCard(pairId1Idx);

      expect(get(isChecking)).toBe(true);

      vi.advanceTimersByTime(1000);

      expect(get(cards)[pairId0Idx]!.isFlipped).toBe(false);
      expect(get(cards)[pairId1Idx]!.isFlipped).toBe(false);
      expect(get(isChecking)).toBe(false);
    });

    it("isChecking 中はカード選択が無視される", async () => {
      await setupCards();
      const currentCards = get(cards);
      const pairId0Idx = currentCards.findIndex((c) => c.pairId === 0);
      const pairId1Idx = currentCards.findIndex((c) => c.pairId === 1);

      facade.selectCard(pairId0Idx);
      facade.selectCard(pairId1Idx); // 不一致 → isChecking: true

      // タイマー経過前（isChecking 中）に別のカードを選択しても無視される
      const faceDownIdx = get(cards).findIndex((c) => !c.isFlipped && !c.isMatched);
      facade.selectCard(faceDownIdx);
      expect(get(cards)[faceDownIdx]!.isFlipped).toBe(false);
    });

    it("マッチ済みカードは選択できない", async () => {
      await setupCards();
      const currentCards = get(cards);
      const [first, second] = currentCards.reduce<number[]>((acc, c, i) => {
        if (c.pairId === 0) acc.push(i);
        return acc;
      }, []);

      facade.selectCard(first!);
      facade.selectCard(second!); // マッチ確定

      const beforeMoveCount = get(moveCount);
      facade.selectCard(first!); // マッチ済みカードを選択
      expect(get(moveCount)).toBe(beforeMoveCount);
    });

    it("全ペアをマッチさせるとゲームクリアになる", async () => {
      await setupCards();
      const currentCards = get(cards);

      // pairId ごとにインデックスを収集
      const pairs = new Map<number, number[]>();
      currentCards.forEach((c, i) => {
        const arr = pairs.get(c.pairId) ?? [];
        arr.push(i);
        pairs.set(c.pairId, arr);
      });

      for (const [, indices] of pairs) {
        facade.selectCard(indices[0]!);
        facade.selectCard(indices[1]!);
      }

      expect(get(isGameClear)).toBe(true);
    });
  });
});
