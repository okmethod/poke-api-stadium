/**
 * TypeJanken (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import {
  TypeJankenFacade,
  judgeJanken,
  getCorrectType,
  TOTAL_ROUNDS,
} from "$lib/application/usecases/TypeJanken/facade";
import {
  isLoading,
  buttonPokemons,
  currentPokemon,
  roundCount,
  score,
  roundResult,
  isGameOver,
  storeWriter,
} from "$lib/application/usecases/TypeJanken/store";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/stores/generationStore", () => ({
  getSelectedGenerations: vi.fn(() => [1]),
}));

vi.mock("$lib/domain/models/PokeGeneration", async (importOriginal) => {
  const original = await importOriginal<typeof import("$lib/domain/models/PokeGeneration")>();
  return {
    ...original,
    generationData: vi.fn((gen: number) => {
      if (gen === 1) {
        return {
          label: "第1世代",
          titles: "赤・緑・青・黄",
          firstPokeId: 1,
          lastPokeId: 151,
          starters: [1, 4, 7] as [number, number, number],
        };
      }
      return null;
    }),
  };
});

const mockFetch = vi.fn() as unknown as typeof fetch;

// 第1世代御三家9体のモックデータ
// grass: フシギダネ(1), フシギソウ(2), フシギバナ(3)
// fire: ヒトカゲ(4), リザード(5), リザードン(6)
// water: ゼニガメ(7), カメール(8), カメックス(9)
const mockPokeMap: Record<string, ReturnType<typeof buildMockPokeData>> = {
  "1": buildMockPokeData({ speciesId: 1, jaName: "フシギダネ", type1: "grass", type2: null }),
  "2": buildMockPokeData({ speciesId: 2, jaName: "フシギソウ", type1: "grass", type2: null }),
  "3": buildMockPokeData({ speciesId: 3, jaName: "フシギバナ", type1: "grass", type2: "poison" }),
  "4": buildMockPokeData({ speciesId: 4, jaName: "ヒトカゲ", type1: "fire", type2: null }),
  "5": buildMockPokeData({ speciesId: 5, jaName: "リザード", type1: "fire", type2: null }),
  "6": buildMockPokeData({ speciesId: 6, jaName: "リザードン", type1: "fire", type2: "flying" }),
  "7": buildMockPokeData({ speciesId: 7, jaName: "ゼニガメ", type1: "water", type2: null }),
  "8": buildMockPokeData({ speciesId: 8, jaName: "カメール", type1: "water", type2: null }),
  "9": buildMockPokeData({ speciesId: 9, jaName: "カメックス", type1: "water", type2: null }),
};

describe("TypeJankenFacade", () => {
  let facade: TypeJankenFacade;

  beforeEach(() => {
    storeWriter.reset();
    facade = new TypeJankenFacade(createMockRepository());
  });

  describe("startGame", () => {
    it("成功時はボタン用ポケモン（中間進化）がセットされる", async () => {
      vi.mocked(facade["repository"].getPokemons).mockResolvedValue(mockPokeMap);

      const result = await facade.startGame(mockFetch);

      expect(result.success).toBe(true);
      const btn = get(buttonPokemons);
      expect(btn).not.toBeNull();
      expect(btn!.grass.jaName).toBe("フシギソウ");
      expect(btn!.fire.jaName).toBe("リザード");
      expect(btn!.water.jaName).toBe("カメール");
    });

    it("成功時は最初のラウンドがセットされ currentPokemon が null でない", async () => {
      vi.mocked(facade["repository"].getPokemons).mockResolvedValue(mockPokeMap);

      await facade.startGame(mockFetch);

      expect(get(currentPokemon)).not.toBeNull();
    });

    it("成功時は isLoading が false に戻る", async () => {
      vi.mocked(facade["repository"].getPokemons).mockResolvedValue(mockPokeMap);

      await facade.startGame(mockFetch);

      expect(get(isLoading)).toBe(false);
    });

    it("APIエラー時は success: false を返しストアがリセットされる", async () => {
      vi.mocked(facade["repository"].getPokemons).mockRejectedValue(new Error("Network Error"));

      const result = await facade.startGame(mockFetch);

      expect(result.success).toBe(false);
      expect(get(buttonPokemons)).toBeNull();
      expect(get(currentPokemon)).toBeNull();
    });

    it("取得ポケモン数が不足している場合は success: false を返す", async () => {
      // 9体未満
      vi.mocked(facade["repository"].getPokemons).mockResolvedValue({
        "1": mockPokeMap["1"]!,
        "4": mockPokeMap["4"]!,
      });

      const result = await facade.startGame(mockFetch);

      expect(result.success).toBe(false);
    });

    it("再呼び出しするとスコアとラウンド数がリセットされる", async () => {
      vi.mocked(facade["repository"].getPokemons).mockResolvedValue(mockPokeMap);
      await facade.startGame(mockFetch);
      facade.selectType("grass");

      vi.mocked(facade["repository"].getPokemons).mockResolvedValue(mockPokeMap);
      await facade.startGame(mockFetch);

      expect(get(score)).toBe(0);
      expect(get(roundCount)).toBe(0);
      expect(get(isGameOver)).toBe(false);
    });
  });

  describe("nextRound", () => {
    it("currentPokemon が更新され roundResult が null にリセットされる", async () => {
      vi.mocked(facade["repository"].getPokemons).mockResolvedValue(mockPokeMap);
      await facade.startGame(mockFetch);
      facade.selectType(get(currentPokemon)!.correctType);
      expect(get(roundResult)).not.toBeNull();

      facade.nextRound();

      expect(get(roundResult)).toBeNull();
      expect(get(currentPokemon)).not.toBeNull();
    });

    it("starterSet が未初期化の場合は何もしない", () => {
      facade.nextRound(); // startGame 前に呼ぶ
      expect(get(currentPokemon)).toBeNull();
    });
  });

  describe("selectType", () => {
    async function setupGame() {
      vi.mocked(facade["repository"].getPokemons).mockResolvedValue(mockPokeMap);
      await facade.startGame(mockFetch);
    }

    it("正解タイプを選ぶと isCorrect: true でスコアが増える", async () => {
      await setupGame();
      const correct = get(currentPokemon)!.correctType;

      facade.selectType(correct);

      expect(get(roundResult)!.isCorrect).toBe(true);
      expect(get(score)).toBe(1);
    });

    it("不正解タイプを選ぶと isCorrect: false でスコアが増えない", async () => {
      await setupGame();
      const correct = get(currentPokemon)!.correctType;
      // 正解以外のタイプを選ぶ（正解でなければどれでも良い）
      const wrong = (["grass", "fire", "water"] as const).find((t) => t !== correct)!;

      facade.selectType(wrong);

      expect(get(roundResult)!.isCorrect).toBe(false);
      expect(get(score)).toBe(0);
    });

    it("選択するたびに roundCount が増える", async () => {
      await setupGame();
      expect(get(roundCount)).toBe(0);

      facade.selectType("grass");
      expect(get(roundCount)).toBe(1);
    });

    it("既に選択済みの場合は二重選択を無視する", async () => {
      await setupGame();
      facade.selectType("grass");
      const countAfterFirst = get(roundCount);

      facade.selectType("fire");

      expect(get(roundCount)).toBe(countAfterFirst);
    });

    it(`${TOTAL_ROUNDS} 問正解後に isGameOver が true になる`, async () => {
      await setupGame();

      for (let i = 0; i < TOTAL_ROUNDS; i++) {
        const correct = get(currentPokemon)!.correctType;
        facade.selectType(correct);
        if (i < TOTAL_ROUNDS - 1) {
          facade.nextRound();
        }
      }

      expect(get(isGameOver)).toBe(true);
      expect(get(score)).toBe(TOTAL_ROUNDS);
    });

    it("ゲーム終了後は selectType を無視する", async () => {
      await setupGame();
      for (let i = 0; i < TOTAL_ROUNDS; i++) {
        facade.selectType(get(currentPokemon)!.correctType);
        if (i < TOTAL_ROUNDS - 1) facade.nextRound();
      }
      const scoreBefore = get(score);

      // ゲーム終了後に選択
      facade.selectType("fire");

      expect(get(score)).toBe(scoreBefore);
    });
  });
});

describe("judgeJanken", () => {
  it("fire vs grass → win", () => {
    expect(judgeJanken("fire", "grass")).toBe("win");
  });

  it("grass vs water → win", () => {
    expect(judgeJanken("grass", "water")).toBe("win");
  });

  it("water vs fire → win", () => {
    expect(judgeJanken("water", "fire")).toBe("win");
  });

  it("grass vs fire → lose", () => {
    expect(judgeJanken("grass", "fire")).toBe("lose");
  });

  it("water vs grass → lose", () => {
    expect(judgeJanken("water", "grass")).toBe("lose");
  });

  it("fire vs water → lose", () => {
    expect(judgeJanken("fire", "water")).toBe("lose");
  });

  it("同じタイプ同士 → draw", () => {
    expect(judgeJanken("fire", "fire")).toBe("draw");
    expect(judgeJanken("grass", "grass")).toBe("draw");
    expect(judgeJanken("water", "water")).toBe("draw");
  });
});

describe("getCorrectType", () => {
  describe("stage2（最終進化）: 勝つ手を選ぶ", () => {
    it("grass の最終進化 → fire（fire はくさに勝つ）", () => {
      expect(getCorrectType("grass", "stage2")).toBe("fire");
    });

    it("fire の最終進化 → water（water はほのおに勝つ）", () => {
      expect(getCorrectType("fire", "stage2")).toBe("water");
    });

    it("water の最終進化 → grass（grass はみずに勝つ）", () => {
      expect(getCorrectType("water", "stage2")).toBe("grass");
    });
  });

  describe("basic（未進化）: 負ける手を選ぶ", () => {
    it("grass の未進化 → water（water はくさに負ける）", () => {
      expect(getCorrectType("grass", "basic")).toBe("water");
    });

    it("fire の未進化 → grass（grass はほのおに負ける）", () => {
      expect(getCorrectType("fire", "basic")).toBe("grass");
    });

    it("water の未進化 → fire（fire はみずに負ける）", () => {
      expect(getCorrectType("water", "basic")).toBe("fire");
    });
  });

  describe("stage1（中間進化）: あいこ", () => {
    it("grass の中間進化 → grass", () => {
      expect(getCorrectType("grass", "stage1")).toBe("grass");
    });

    it("fire の中間進化 → fire", () => {
      expect(getCorrectType("fire", "stage1")).toBe("fire");
    });

    it("water の中間進化 → water", () => {
      expect(getCorrectType("water", "stage1")).toBe("water");
    });
  });

  describe("勝敗の整合性検証", () => {
    it("stage2 の正解タイプで judgeJanken すると win になる", () => {
      const types: Array<"grass" | "fire" | "water"> = ["grass", "fire", "water"];
      for (const t of types) {
        const correct = getCorrectType(t, "stage2");
        expect(judgeJanken(correct, t)).toBe("win");
      }
    });

    it("basic の正解タイプで judgeJanken すると lose になる", () => {
      const types: Array<"grass" | "fire" | "water"> = ["grass", "fire", "water"];
      for (const t of types) {
        const correct = getCorrectType(t, "basic");
        expect(judgeJanken(correct, t)).toBe("lose");
      }
    });

    it("stage1 の正解タイプで judgeJanken すると draw になる", () => {
      const types: Array<"grass" | "fire" | "water"> = ["grass", "fire", "water"];
      for (const t of types) {
        const correct = getCorrectType(t, "stage1");
        expect(judgeJanken(correct, t)).toBe("draw");
      }
    });
  });
});
