/**
 * HeightComparison (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { HeightComparisonFacade } from "$lib/application/usecases/HeightComparison/facade";
import { pokeDataList, isRevealed, isLoading, result } from "$lib/application/usecases/HeightComparison/store";
import type { ISimpleDragPhysicsEngine } from "$lib/application/ports/ISimpleDragPhysicsEngine";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;
const mockConfig = { width: 800, height: 600 };

function createMockPhysics(): ISimpleDragPhysicsEngine {
  return {
    initialize: vi.fn().mockResolvedValue(undefined),
    reset: vi.fn(),
    getState: vi.fn().mockReturnValue([]),
    dispose: vi.fn(),
    addBody: vi.fn().mockResolvedValue(undefined),
    removeBody: vi.fn(),
    onCollision: vi.fn().mockReturnValue(() => {}),
    startDrag: vi.fn(),
    moveDrag: vi.fn(),
    endDrag: vi.fn(),
  } as unknown as ISimpleDragPhysicsEngine;
}

// たかさくらべ: height 降順が正解
const tall = buildMockPokeData({ speciesId: 1, jaName: "タカイモン", height: 2.0 });
const medium = buildMockPokeData({ speciesId: 2, jaName: "フツウモン", height: 1.0 });
const short = buildMockPokeData({ speciesId: 3, jaName: "ヒクイモン", height: 0.5 });

describe("HeightComparisonFacade", () => {
  let facade: HeightComparisonFacade;
  let physics: ReturnType<typeof createMockPhysics>;

  beforeEach(async () => {
    physics = createMockPhysics();
    facade = new HeightComparisonFacade(physics, createMockRepository());
    await facade.initialize(mockConfig);
    vi.mocked(selectRandomPokemons).mockReset();
  });

  describe("initialize", () => {
    it("physics.initialize が設定を渡して呼ばれる", async () => {
      const freshPhysics = createMockPhysics();
      const freshFacade = new HeightComparisonFacade(freshPhysics, createMockRepository());
      await freshFacade.initialize(mockConfig);
      expect(vi.mocked(freshPhysics.initialize)).toHaveBeenCalledWith(mockConfig);
    });

    it("initialize 後にストアが初期状態になる", async () => {
      expect(get(pokeDataList)).toEqual([]);
      expect(get(isRevealed)).toBe(false);
      expect(get(isLoading)).toBe(false);
      expect(get(result)).toBeNull();
    });
  });

  describe("pickPokemons", () => {
    it("成功時は success: true を返し pokeDataList が更新される", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([tall, short]);
      const res = await facade.pickPokemons(mockFetch, 2);
      expect(res.success).toBe(true);
      expect(get(pokeDataList)).toEqual([tall, short]);
    });

    it("失敗時は success: false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));
      const res = await facade.pickPokemons(mockFetch, 2);
      expect(res.success).toBe(false);
    });

    it("前ラウンドのボディが除去される（removeBody が呼ばれる）", async () => {
      // 1回目: pick → reveal でボディ追加
      vi.mocked(selectRandomPokemons).mockResolvedValue([tall, short]);
      await facade.pickPokemons(mockFetch, 2);
      await facade.reveal([tall, short]);
      vi.mocked(physics.removeBody).mockClear();

      // 2回目: pick で前のボディが削除される
      vi.mocked(selectRandomPokemons).mockResolvedValue([medium]);
      await facade.pickPokemons(mockFetch, 1);

      expect(vi.mocked(physics.removeBody)).toHaveBeenCalledTimes(2); // 前ラウンドの2体分
    });

    it("isRevealed が false にリセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([tall, short]);
      await facade.pickPokemons(mockFetch, 2);
      await facade.reveal([tall, short]);
      expect(get(isRevealed)).toBe(true);

      vi.mocked(selectRandomPokemons).mockResolvedValue([medium]);
      await facade.pickPokemons(mockFetch, 1);
      expect(get(isRevealed)).toBe(false);
    });
  });

  describe("reveal", () => {
    it("worldConfig が未設定のとき success: false を返す", async () => {
      const freshFacade = new HeightComparisonFacade(createMockPhysics(), createMockRepository());
      const res = await freshFacade.reveal([tall]);
      expect(res.success).toBe(false);
    });

    it("空配列を渡すと success: false を返す", async () => {
      const res = await facade.reveal([]);
      expect(res.success).toBe(false);
    });

    it("高さ降順の正しい並び順で isCorrect: true になる", async () => {
      const res = await facade.reveal([tall, medium, short]); // 2.0 > 1.0 > 0.5
      expect(res.success).toBe(true);
      expect(get(result)?.isCorrect).toBe(true);
    });

    it("高さが逆順の並び順で isCorrect: false になる", async () => {
      const res = await facade.reveal([short, medium, tall]); // 0.5 < 1.0 < 2.0
      expect(res.success).toBe(true);
      expect(get(result)?.isCorrect).toBe(false);
    });

    it("同じ高さのポケモンは正解扱いになる", async () => {
      const sameHeight1 = buildMockPokeData({ speciesId: 10, height: 1.0 });
      const sameHeight2 = buildMockPokeData({ speciesId: 11, height: 1.0 });
      const res = await facade.reveal([sameHeight1, sameHeight2]);
      expect(res.success).toBe(true);
      expect(get(result)?.isCorrect).toBe(true);
    });

    it("isRevealed が true になる", async () => {
      await facade.reveal([tall]);
      expect(get(isRevealed)).toBe(true);
    });

    it("ポケモン数だけ physics.addBody が呼ばれる", async () => {
      await facade.reveal([tall, medium, short]);
      expect(vi.mocked(physics.addBody)).toHaveBeenCalledTimes(3);
    });
  });

  describe("dispose", () => {
    it("physics.dispose を呼び出す", () => {
      facade.dispose();
      expect(vi.mocked(physics.dispose)).toHaveBeenCalled();
    });
  });
});
