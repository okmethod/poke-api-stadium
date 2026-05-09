/**
 * WeightComparison (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { WeightComparisonFacade } from "$lib/application/usecases/WeightComparison/facade";
import { pokeDataList, isRevealed, isLoading } from "$lib/application/usecases/WeightComparison/store";
import type { ISeesawPhysicsEngine } from "$lib/application/ports/ISeesawPhysicsEngine";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

function createMockSeesawEngine(): ISeesawPhysicsEngine {
  return {
    initialize: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn(),
    addPokeBody: vi.fn().mockResolvedValue(undefined),
    removePokeBody: vi.fn(),
    release: vi.fn(),
    resetSeesaw: vi.fn(),
    getState: vi.fn().mockReturnValue({
      plankAngle: 0,
      plankPosition: { x: 0, y: 0 },
      plankWidth: 0,
      plankThickness: 0,
      pivotPoint: { x: 0, y: 0 },
      pokeBodies: [],
    }),
  };
}

const heavyPoke = buildMockPokeData({ speciesId: 143, jaName: "カビゴン", weight: 460.0 });
const lightPoke = buildMockPokeData({ speciesId: 25, jaName: "ピカチュウ", weight: 6.0 });

describe("WeightComparisonFacade", () => {
  let facade: WeightComparisonFacade;
  let seesawEngine: ISeesawPhysicsEngine;

  beforeEach(async () => {
    seesawEngine = createMockSeesawEngine();
    facade = new WeightComparisonFacade(seesawEngine, createMockRepository());
    await facade.initialize({ width: 800, height: 600 });
    vi.mocked(selectRandomPokemons).mockReset();
  });

  describe("initialize", () => {
    it("ストアがリセットされる（pokeDataList 空・isRevealed false・isLoading false）", async () => {
      // initialize 前にストアを汚染しておく
      const facade2 = new WeightComparisonFacade(createMockSeesawEngine(), createMockRepository());
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade2.pickPokemons(mockFetch);
      facade2.reveal();

      // 再 initialize でリセットされることを確認
      await facade2.initialize({ width: 800, height: 600 });

      expect(get(pokeDataList)).toHaveLength(0);
      expect(get(isRevealed)).toBe(false);
      expect(get(isLoading)).toBe(false);
    });
  });

  describe("pickPokemons", () => {
    it("成功時は success: true を返しストアに2体セットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);

      const res = await facade.pickPokemons(mockFetch);

      expect(res.success).toBe(true);
      expect(get(pokeDataList)).toHaveLength(2);
      expect(get(isRevealed)).toBe(false);
    });

    it("成功時は addPokeBody を2回呼ぶ", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);

      await facade.pickPokemons(mockFetch);

      expect(vi.mocked(seesawEngine.addPokeBody)).toHaveBeenCalledTimes(2);
    });

    it("成功時は isLoading が true になり完了後 false に戻る", async () => {
      const loadingValues: boolean[] = [];
      const unsub = isLoading.subscribe((v) => loadingValues.push(v));

      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade.pickPokemons(mockFetch);
      unsub();

      // false（初期） → true（開始） → false（完了） の遷移を確認
      expect(loadingValues).toContain(true);
      expect(loadingValues[loadingValues.length - 1]).toBe(false);
    });

    it("addPokeBody に正しい side と mass が渡される", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);

      await facade.pickPokemons(mockFetch);

      const addMock = vi.mocked(seesawEngine.addPokeBody);
      const [firstCall, secondCall] = addMock.mock.calls;
      expect(firstCall![0].side).toBe("left");
      expect(firstCall![0].mass).toBe(heavyPoke.weight);
      expect(secondCall![0].side).toBe("right");
      expect(secondCall![0].mass).toBe(lightPoke.weight);
    });

    it("失敗時は success: false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      const res = await facade.pickPokemons(mockFetch);

      expect(res.success).toBe(false);
    });

    it("失敗時は pokeDataList が空になる", async () => {
      // 事前に1回成功させてストアに値を入れる
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade.pickPokemons(mockFetch);
      expect(get(pokeDataList)).toHaveLength(2);

      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));
      await facade.pickPokemons(mockFetch);

      expect(get(pokeDataList)).toHaveLength(0);
    });

    it("2回目の呼び出しで前のボディが removePokeBody で除去され resetSeesaw が呼ばれる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade.pickPokemons(mockFetch);

      const removeMock = vi.mocked(seesawEngine.removePokeBody);
      const resetMock = vi.mocked(seesawEngine.resetSeesaw);
      removeMock.mockClear();
      resetMock.mockClear();

      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade.pickPokemons(mockFetch);

      // 1ラウンド目で追加した2体分のボディが除去される
      expect(removeMock).toHaveBeenCalledTimes(2);
      expect(resetMock).toHaveBeenCalledTimes(1);
    });

    it("2回目の呼び出しで isRevealed が false にリセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade.pickPokemons(mockFetch);
      facade.reveal();
      expect(get(isRevealed)).toBe(true);

      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade.pickPokemons(mockFetch);

      expect(get(isRevealed)).toBe(false);
    });
  });

  describe("reveal", () => {
    it("seesawEngine.release を呼び出し isRevealed が true になる", () => {
      facade.reveal();

      expect(vi.mocked(seesawEngine.release)).toHaveBeenCalled();
      expect(get(isRevealed)).toBe(true);
    });
  });

  describe("dispose", () => {
    it("seesawEngine.dispose を呼び出す", () => {
      facade.dispose();
      expect(vi.mocked(seesawEngine.dispose)).toHaveBeenCalled();
    });

    it("dispose 後に別 facade で初回 pickPokemons を実行しても removePokeBody は呼ばれない", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade.pickPokemons(mockFetch);
      facade.dispose();

      // dispose 後は新規 facade（activeBodyIds が空）なので removePokeBody は呼ばれない
      const newEngine = createMockSeesawEngine();
      const facade2 = new WeightComparisonFacade(newEngine, createMockRepository());
      await facade2.initialize({ width: 800, height: 600 });

      vi.mocked(selectRandomPokemons).mockResolvedValue([heavyPoke, lightPoke]);
      await facade2.pickPokemons(mockFetch);

      expect(vi.mocked(newEngine.removePokeBody)).not.toHaveBeenCalled();
    });
  });
});
