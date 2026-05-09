/**
 * StatsSorting (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { StatsSortingQuizFacade } from "$lib/application/usecases/StatsSortingQuiz/facade";
import { result, isOpen, isLoading, pokeDataList } from "$lib/application/usecases/StatsSortingQuiz/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

// HP 降順：a(100) > b(80) > c(60)
const pokeA = buildMockPokeData({
  speciesId: 1,
  stats: { hp: 100, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
});
const pokeB = buildMockPokeData({
  speciesId: 25,
  stats: { hp: 80, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
});
const pokeC = buildMockPokeData({
  speciesId: 4,
  stats: { hp: 60, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
});

describe("StatsSortingQuizFacade", () => {
  let facade: StatsSortingQuizFacade;

  beforeEach(() => {
    facade = new StatsSortingQuizFacade(createMockRepository());
    facade.reset();
    vi.mocked(selectRandomPokemons).mockReset();
  });

  describe("pickPokemons", () => {
    it("成功時は success: true を返しストアが更新される", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pokeA, pokeB, pokeC]);

      const res = await facade.pickPokemons(mockFetch, 3);

      expect(res.success).toBe(true);
      expect(get(pokeDataList)).toHaveLength(3);
    });

    it("失敗時は success: false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      const res = await facade.pickPokemons(mockFetch, 3);

      expect(res.success).toBe(false);
    });

    it("pickPokemons 呼び出し時に前回の result がリセットされる", async () => {
      // 前回の結果をストアにセット
      facade.revealResult([pokeA, pokeB, pokeC], "hp");
      expect(get(result)).not.toBeNull();

      vi.mocked(selectRandomPokemons).mockResolvedValue([pokeA, pokeB, pokeC]);
      await facade.pickPokemons(mockFetch, 3);

      expect(get(result)).toBeNull();
      expect(get(isOpen)).toBe(false);
    });

    it("pickPokemons 完了後は isLoading が false になる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pokeA, pokeB, pokeC]);
      await facade.pickPokemons(mockFetch, 3);

      expect(get(isLoading)).toBe(false);
    });

    it("pickPokemons 失敗後も isLoading が false になる", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));
      await facade.pickPokemons(mockFetch, 3);

      expect(get(isLoading)).toBe(false);
    });
  });

  describe("revealResult", () => {
    it("HP 降順に正しく並べると isCorrect: true になる", () => {
      facade.revealResult([pokeA, pokeB, pokeC], "hp");

      expect(get(result)).toEqual({ isCorrect: true, message: "せいかい！" });
      expect(get(isOpen)).toBe(true);
    });

    it("HP 降順でない並びのとき isCorrect: false になる", () => {
      facade.revealResult([pokeC, pokeB, pokeA], "hp");

      expect(get(result)).toEqual({ isCorrect: false, message: "ざんねん..." });
    });

    it("不正解時も isOpen が true になる", () => {
      facade.revealResult([pokeC, pokeB, pokeA], "hp");

      expect(get(isOpen)).toBe(true);
    });

    it("attack モードで降順に並べると isCorrect: true になる", () => {
      // attack: a=80 > b=60 > c=40
      const atkA = buildMockPokeData({
        speciesId: 1,
        stats: { hp: 50, attack: 80, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      const atkB = buildMockPokeData({
        speciesId: 25,
        stats: { hp: 50, attack: 60, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      const atkC = buildMockPokeData({
        speciesId: 4,
        stats: { hp: 50, attack: 40, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      facade.revealResult([atkA, atkB, atkC], "attack");

      expect(get(result)?.isCorrect).toBe(true);
    });

    it("speed モードで降順でない並びのとき isCorrect: false になる", () => {
      // speed: a=90 > b=70 > c=50、順番を逆にする
      const spdA = buildMockPokeData({
        speciesId: 1,
        stats: { hp: 50, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 90 },
      });
      const spdB = buildMockPokeData({
        speciesId: 25,
        stats: { hp: 50, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 70 },
      });
      const spdC = buildMockPokeData({
        speciesId: 4,
        stats: { hp: 50, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      facade.revealResult([spdC, spdB, spdA], "speed");

      expect(get(result)?.isCorrect).toBe(false);
    });

    it("height モードで正しく降順に並べると isCorrect: true になる", () => {
      const tallA = buildMockPokeData({ speciesId: 1, height: 2.0 });
      const tallB = buildMockPokeData({ speciesId: 25, height: 1.5 });
      const tallC = buildMockPokeData({ speciesId: 4, height: 0.6 });
      facade.revealResult([tallA, tallB, tallC], "height");

      expect(get(result)?.isCorrect).toBe(true);
    });

    it("weight モードで正しく降順に並べると isCorrect: true になる", () => {
      const heavyA = buildMockPokeData({ speciesId: 1, weight: 100.0 });
      const heavyB = buildMockPokeData({ speciesId: 25, weight: 60.0 });
      const heavyC = buildMockPokeData({ speciesId: 4, weight: 8.5 });
      facade.revealResult([heavyA, heavyB, heavyC], "weight");

      expect(get(result)?.isCorrect).toBe(true);
    });

    it("同値ポケモンが含まれる場合も降順（>=）として isCorrect: true になる", () => {
      // hp: a=100 >= b=100 >= c=60
      const pokeEqual = buildMockPokeData({
        speciesId: 2,
        stats: { hp: 100, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      facade.revealResult([pokeA, pokeEqual, pokeC], "hp");

      expect(get(result)?.isCorrect).toBe(true);
    });

    it("4体正解のとき専用メッセージになる", () => {
      const pokeD = buildMockPokeData({
        speciesId: 7,
        stats: { hp: 40, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      facade.revealResult([pokeA, pokeB, pokeC, pokeD], "hp");

      expect(get(result)?.message).toBe("すごい！");
    });

    it("5体正解のとき専用メッセージになる", () => {
      const pokeD = buildMockPokeData({
        speciesId: 7,
        stats: { hp: 40, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      const pokeE = buildMockPokeData({
        speciesId: 9,
        stats: { hp: 20, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      facade.revealResult([pokeA, pokeB, pokeC, pokeD, pokeE], "hp");

      expect(get(result)?.message).toBe("すごすぎる！！");
    });

    it("6体正解のとき専用メッセージになる", () => {
      const pokeD = buildMockPokeData({
        speciesId: 7,
        stats: { hp: 40, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      const pokeE = buildMockPokeData({
        speciesId: 9,
        stats: { hp: 20, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      const pokeF = buildMockPokeData({
        speciesId: 6,
        stats: { hp: 10, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 },
      });
      facade.revealResult([pokeA, pokeB, pokeC, pokeD, pokeE, pokeF], "hp");

      expect(get(result)?.message).toBe("ポケモンマスター！！！！");
    });
  });

  describe("reset", () => {
    it("ストアが初期状態に戻る", () => {
      facade.revealResult([pokeA, pokeB, pokeC], "hp");
      facade.reset();

      expect(get(result)).toBeNull();
      expect(get(isOpen)).toBe(false);
    });

    it("reset 後は pokeDataList が空になる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pokeA, pokeB, pokeC]);
      await facade.pickPokemons(mockFetch, 3);
      facade.reset();

      expect(get(pokeDataList)).toHaveLength(0);
    });
  });
});
