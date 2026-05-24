/**
 * BattleCalcQuiz (facade + store + templates) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { BattleCalcQuizFacade } from "$lib/application/usecases/BattleCalcQuiz/facade";
import {
  isLoading,
  pokeDataPair,
  problem,
  difficulties,
  storeWriter,
} from "$lib/application/usecases/BattleCalcQuiz/store";
import { PROBLEM_TEMPLATES } from "$lib/application/usecases/BattleCalcQuiz/problemTemplates";
import { evalNode, isExactInteger } from "$lib/domain/models/Arithmetic";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

// speed: A < B、spAtk: A > B で formula_sp が成立する組み合わせ
// 65 × 40 ÷ 50 = 52 (整数) → formula_sp が生成できる
const pokeA = buildMockPokeData({
  pokeId: 1,
  jaName: "フシギダネ",
  stats: { hp: 45, attack: 49, defense: 49, spAtk: 65, spDef: 65, speed: 45 },
});
const pokeB = buildMockPokeData({
  pokeId: 4,
  jaName: "ヒトカゲ",
  stats: { hp: 39, attack: 52, defense: 43, spAtk: 60, spDef: 50, speed: 65 },
});

describe("BattleCalcQuizFacade", () => {
  let facade: BattleCalcQuizFacade;

  beforeEach(() => {
    facade = new BattleCalcQuizFacade(createMockRepository());
    storeWriter.reset();
    storeWriter.setDifficulties(["easy", "normal", "hard"]);
    vi.mocked(selectRandomPokemons).mockReset();
  });

  describe("startGame", () => {
    it("成功時は success: true を返しポケモンペアと問題がセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pokeA, pokeB]);

      const res = await facade.startGame(mockFetch);

      expect(res.success).toBe(true);
      expect(get(pokeDataPair)).toEqual([pokeA, pokeB]);
      expect(get(problem)).not.toBeNull();
    });

    it("失敗時は success: false を返しストアは null のまま", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      const res = await facade.startGame(mockFetch);

      expect(res.success).toBe(false);
      expect(get(pokeDataPair)).toBeNull();
    });

    it("ローディング中は isLoading が true になり、完了後 false に戻る", async () => {
      let isLoadingDuringTask = false;
      vi.mocked(selectRandomPokemons).mockImplementation(async () => {
        isLoadingDuringTask = get(isLoading);
        return [pokeA, pokeB];
      });

      await facade.startGame(mockFetch);

      expect(isLoadingDuringTask).toBe(true);
      expect(get(isLoading)).toBe(false);
    });

    it("失敗時も isLoading が false に戻る", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("fail"));

      await facade.startGame(mockFetch);

      expect(get(isLoading)).toBe(false);
    });
  });

  describe("nextProblem", () => {
    it("成功時は success: true を返し新しいポケモンペアと問題がセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pokeA, pokeB]);
      await facade.startGame(mockFetch);

      const newPokeA = buildMockPokeData({ pokeId: 7, jaName: "ゼニガメ" });
      const newPokeB = buildMockPokeData({ pokeId: 10, jaName: "キャタピー" });
      vi.mocked(selectRandomPokemons).mockResolvedValue([newPokeA, newPokeB]);

      const res = await facade.nextProblem(mockFetch);

      expect(res.success).toBe(true);
      expect(get(pokeDataPair)).toEqual([newPokeA, newPokeB]);
      expect(get(problem)).not.toBeNull();
    });
  });

  describe("setDifficulty", () => {
    it("指定した難易度1つだけがセットされる", () => {
      facade.setDifficulty("hard");

      expect(get(difficulties)).toEqual(["hard"]);
    });

    it("別の難易度に切り替えられる", () => {
      facade.setDifficulty("easy");
      facade.setDifficulty("normal");

      expect(get(difficulties)).toEqual(["normal"]);
    });
  });
});

describe("PROBLEM_TEMPLATES", () => {
  const pair = [pokeA, pokeB] as const;

  describe("各テンプレートの整合性", () => {
    it("null を返さないテンプレートの answer が evalNode の結果と一致する", () => {
      for (const template of PROBLEM_TEMPLATES) {
        const p = template.generate(pair);
        if (p === null) continue;
        expect(evalNode(p.expr), `template: ${template.id}`).toBe(p.answer);
      }
    });

    it("null を返さないテンプレートの answer が正の整数である", () => {
      for (const template of PROBLEM_TEMPLATES) {
        const p = template.generate(pair);
        if (p === null) continue;
        expect(p.answer, `template: ${template.id}`).toBeGreaterThan(0);
        expect(isExactInteger(p.expr), `template: ${template.id}`).toBe(true);
      }
    });
  });

  describe("難易度の分類", () => {
    it("easy テンプレートが3個存在する", () => {
      expect(PROBLEM_TEMPLATES.filter((t) => t.difficulty === "easy").length).toBe(3);
    });

    it("normal テンプレートが4個存在する", () => {
      expect(PROBLEM_TEMPLATES.filter((t) => t.difficulty === "normal").length).toBe(4);
    });

    it("hard テンプレートが4個存在する", () => {
      expect(PROBLEM_TEMPLATES.filter((t) => t.difficulty === "hard").length).toBe(4);
    });
  });

  describe("speed_diff", () => {
    const template = () => PROBLEM_TEMPLATES.find((t) => t.id === "speed_diff")!;

    it("すばやさが異なるとき問題を生成し、差が正である", () => {
      const p = template().generate(pair);
      expect(p).not.toBeNull();
      expect(p!.answer).toBeGreaterThan(0); // B.speed(65) - A.speed(45) = 20
    });

    it("すばやさが同じとき null を返す", () => {
      const same = buildMockPokeData({ stats: { hp: 50, attack: 50, defense: 50, spAtk: 50, spDef: 50, speed: 50 } });
      expect(template().generate([same, same])).toBeNull();
    });
  });

  describe("hp_remaining", () => {
    const template = () => PROBLEM_TEMPLATES.find((t) => t.id === "hp_remaining")!;

    it("attack >= hp のときは null を返す", () => {
      // pokeA.attack(49) >= pokeB.hp(39)、pokeB.attack(52) >= pokeA.hp(45)
      expect(template().generate(pair)).toBeNull();
    });

    it("attack < hp の向きがあるとき問題を生成し、のこりHPが正である", () => {
      const tankA = buildMockPokeData({ stats: { hp: 200, attack: 30, defense: 80, spAtk: 30, spDef: 80, speed: 30 } });
      const weakB = buildMockPokeData({ stats: { hp: 50, attack: 20, defense: 30, spAtk: 20, spDef: 30, speed: 80 } });
      const p = template().generate([tankA, weakB]);
      expect(p).not.toBeNull();
      expect(p!.answer).toBeGreaterThan(0);
    });
  });

  describe("type_div2 / type_div4", () => {
    it("type_div2: answer が整数で ベースダメージ ÷ 2 に等しい", () => {
      const template = PROBLEM_TEMPLATES.find((t) => t.id === "type_div2")!;
      const p = template.generate(pair)!;
      expect(isExactInteger(p.expr)).toBe(true);
      expect(p.answer).toBe(evalNode(p.expr));
    });

    it("type_div4: answer が整数で ベースダメージ ÷ 4 に等しい", () => {
      const template = PROBLEM_TEMPLATES.find((t) => t.id === "type_div4")!;
      const p = template.generate(pair)!;
      expect(isExactInteger(p.expr)).toBe(true);
      expect(p.answer).toBe(evalNode(p.expr));
    });
  });

  describe("formula_sp", () => {
    const template = () => PROBLEM_TEMPLATES.find((t) => t.id === "formula_sp")!;

    it("A.spAtk(65) ÷ B.spDef(50) が割り切れる P が存在するため問題を生成できる", () => {
      // 65 × 40 ÷ 50 = 52, 65 × 80 ÷ 50 = 104 など複数の P が有効
      const p = template().generate(pair);
      expect(p).not.toBeNull();
      expect(p!.answer).toBeGreaterThan(0);
      expect(isExactInteger(p!.expr)).toBe(true);
    });
  });
});
