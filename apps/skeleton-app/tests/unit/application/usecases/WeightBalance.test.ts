/**
 * WeightBalance (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { get } from "svelte/store";
import { WeightBalanceFacade } from "$lib/application/usecases/WeightBalance/facade";
import {
  targetWeight,
  currentPokeData,
  placedPokeDataList,
  isRevealed,
  isLoading,
  isBalanced,
} from "$lib/application/usecases/WeightBalance/store";
import type { ISpringScaleEngine } from "$lib/application/ports/ISpringScaleEngine";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemon: vi.fn(),
}));

import { selectRandomPokemon } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

function createMockSpringScaleEngine(): ISpringScaleEngine {
  return {
    initialize: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn(),
    setTargetWeight: vi.fn(),
    addPokeBody: vi.fn().mockResolvedValue(undefined),
    removePokeBody: vi.fn(),
    reset: vi.fn(),
    getState: vi.fn().mockReturnValue({
      platformY: 100,
      platformWidth: 300,
      platformThickness: 16,
      anchorY: 25,
      emptyY: 96,
      targetY: 198,
      pokeBodies: [],
      isBroken: false,
    }),
    breakSpring: vi.fn(),
  };
}

// weight=10.0 で目標重量 10kg のときにピッタリになるポケモン
const poke10kg = buildMockPokeData({ speciesId: 1, jaName: "フシギダネ", weight: 10.0 });
const poke30kg = buildMockPokeData({ speciesId: 2, jaName: "フシギソウ", weight: 30.0 });

describe("WeightBalanceFacade", () => {
  let facade: WeightBalanceFacade;
  let springEngine: ISpringScaleEngine;

  beforeEach(async () => {
    springEngine = createMockSpringScaleEngine();
    facade = new WeightBalanceFacade(springEngine, createMockRepository());
    await facade.initialize({ width: 400, height: 320 });
    vi.mocked(selectRandomPokemon).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("initialize", () => {
    it("ストアがリセットされる（全フィールドが初期値）", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.startGame(mockFetch);

      await facade.initialize({ width: 400, height: 320 });

      expect(get(targetWeight)).toBe(0);
      expect(get(currentPokeData)).toBeNull();
      expect(get(placedPokeDataList)).toHaveLength(0);
      expect(get(isRevealed)).toBe(false);
      expect(get(isLoading)).toBe(false);
      expect(get(isBalanced)).toBeNull();
    });
  });

  describe("startGame", () => {
    it("success: true を返し targetWeight が設定される", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);

      const result = await facade.startGame(mockFetch);

      expect(result.success).toBe(true);
      expect(get(targetWeight)).toBeGreaterThan(0);
    });

    it("setTargetWeight がエンジンに呼ばれる", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);

      await facade.startGame(mockFetch);

      expect(vi.mocked(springEngine.setTargetWeight)).toHaveBeenCalledWith(expect.any(Number));
    });

    it("最初の候補ポケモンが currentPokeData にセットされる", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);

      await facade.startGame(mockFetch);

      expect(get(currentPokeData)?.jaName).toBe("フシギダネ");
    });

    it("isLoading が true になり完了後 false に戻る", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      const loadingValues: boolean[] = [];
      const unsub = isLoading.subscribe((v) => loadingValues.push(v));

      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.startGame(mockFetch);
      unsub();

      expect(loadingValues).toContain(true);
      expect(loadingValues[loadingValues.length - 1]).toBe(false);
    });

    it("2回目の呼び出しで engine.reset が呼ばれてポケモンリストがリセットされる", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);

      await facade.startGame(mockFetch);
      await facade.placePokemon(mockFetch);
      expect(get(placedPokeDataList)).toHaveLength(1);

      vi.mocked(springEngine.reset).mockClear();
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke30kg);
      await facade.startGame(mockFetch);

      expect(vi.mocked(springEngine.reset)).toHaveBeenCalledTimes(1);
      expect(get(placedPokeDataList)).toHaveLength(0);
    });

    it("失敗時は success: false を返す", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockRejectedValue(new Error("Network Error"));

      const result = await facade.startGame(mockFetch);

      expect(result.success).toBe(false);
    });
  });

  describe("placePokemon", () => {
    beforeEach(async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.startGame(mockFetch);
      vi.mocked(selectRandomPokemon).mockReset();
    });

    it("placedPokeDataList に1件追加される", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke30kg);

      await facade.placePokemon(mockFetch);

      expect(get(placedPokeDataList)).toHaveLength(1);
      expect(get(placedPokeDataList)[0]!.jaName).toBe("フシギダネ");
    });

    it("engine.addPokeBody が weightKg 付きで呼ばれる", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke30kg);

      await facade.placePokemon(mockFetch);

      expect(vi.mocked(springEngine.addPokeBody)).toHaveBeenCalledWith(
        expect.objectContaining({ weightKg: poke10kg.weight }),
      );
    });

    it("乗せた後に次の候補ポケモンが設定される", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke30kg);

      await facade.placePokemon(mockFetch);

      expect(get(currentPokeData)?.jaName).toBe("フシギソウ");
    });

    it("currentPokeData が null のときは success: false を返す", async () => {
      const facade2 = new WeightBalanceFacade(springEngine, createMockRepository());
      await facade2.initialize({ width: 400, height: 320 });

      const result = await facade2.placePokemon(mockFetch);

      expect(result.success).toBe(false);
    });
  });

  describe("skipPokemon", () => {
    beforeEach(async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.startGame(mockFetch);
      vi.mocked(selectRandomPokemon).mockReset();
    });

    it("placedPokeDataList には追加されず次の候補が設定される", async () => {
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke30kg);

      await facade.skipPokemon(mockFetch);

      expect(get(placedPokeDataList)).toHaveLength(0);
      expect(get(currentPokeData)?.jaName).toBe("フシギソウ");
    });
  });

  describe("discardPokemon", () => {
    beforeEach(async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.startGame(mockFetch);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke30kg);
      await facade.placePokemon(mockFetch);
      vi.mocked(selectRandomPokemon).mockReset();
    });

    it("指定インデックスのポケモンが placedPokeDataList から除去される", () => {
      expect(get(placedPokeDataList)).toHaveLength(1);

      facade.discardPokemon(0);

      expect(get(placedPokeDataList)).toHaveLength(0);
    });

    it("engine.removePokeBody が呼ばれる", () => {
      facade.discardPokemon(0);

      expect(vi.mocked(springEngine.removePokeBody)).toHaveBeenCalledTimes(1);
    });

    it("範囲外インデックスは何もしない", () => {
      facade.discardPokemon(99);

      expect(get(placedPokeDataList)).toHaveLength(1);
      expect(vi.mocked(springEngine.removePokeBody)).not.toHaveBeenCalled();
    });
  });

  describe("compare", () => {
    it("合計重量が目標の±5%以内で isBalanced = true になる", async () => {
      // target = 10（Math.random()=0 のとき）
      vi.spyOn(Math, "random").mockReturnValue(0);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.startGame(mockFetch);

      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.placePokemon(mockFetch);

      await facade.compare();

      expect(get(isBalanced)).toBe(true);
      expect(get(isRevealed)).toBe(true);
    });

    it("合計重量が目標から大きく離れると isBalanced = false になる", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke30kg);
      await facade.startGame(mockFetch);

      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.placePokemon(mockFetch);

      await facade.compare();

      expect(get(isBalanced)).toBe(false);
    });

    it("engine.addPokeBody / removePokeBody / reset は呼ばれない", async () => {
      vi.spyOn(Math, "random").mockReturnValue(0.5);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.startGame(mockFetch);
      vi.mocked(selectRandomPokemon).mockResolvedValue(poke10kg);
      await facade.placePokemon(mockFetch);
      vi.mocked(springEngine.addPokeBody).mockClear();
      vi.mocked(springEngine.removePokeBody).mockClear();
      vi.mocked(springEngine.reset).mockClear();

      await facade.compare();

      expect(vi.mocked(springEngine.addPokeBody)).not.toHaveBeenCalled();
      expect(vi.mocked(springEngine.removePokeBody)).not.toHaveBeenCalled();
      expect(vi.mocked(springEngine.reset)).not.toHaveBeenCalled();
    });
  });

  describe("dispose", () => {
    it("springEngine.dispose が呼ばれる", () => {
      facade.dispose();

      expect(vi.mocked(springEngine.dispose)).toHaveBeenCalled();
    });
  });
});
