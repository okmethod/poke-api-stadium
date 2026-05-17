/**
 * PairCollisionDetection (facade + store) のテスト
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { get } from "svelte/store";
import { PairCollisionDetectionFacade } from "$lib/application/usecases/PairCollisionDetection/facade";
import {
  matchedCount,
  activeBodyCount,
  lastMatchJaName,
  lastMatchCryUrl,
} from "$lib/application/usecases/PairCollisionDetection/store";
import type { ISimpleDragPhysicsEngine } from "$lib/application/ports/ISimpleDragPhysicsEngine";
import type { PhysicsBody2dState } from "$lib/domain/models/2dPhysics";
import { buildMockPokeData } from "../../../__testUtils__/mockPokeData";
import { createMockRepository } from "../../../__testUtils__/mockRepository";

vi.mock("$lib/application/utils/pokeSelectionUtils", () => ({
  selectRandomPokemons: vi.fn(),
}));

import { selectRandomPokemons } from "$lib/application/utils/pokeSelectionUtils";

const mockFetch = vi.fn() as unknown as typeof fetch;

const mockConfig = { width: 800, height: 600 };

function createMockPhysics(): ISimpleDragPhysicsEngine {
  let collisionHandler: ((a: PhysicsBody2dState, b: PhysicsBody2dState) => void) | null = null;
  return {
    initialize: vi.fn().mockResolvedValue(undefined),
    dispose: vi.fn(),
    addBody: vi.fn().mockResolvedValue(undefined),
    removeBody: vi.fn(),
    getBodies: vi.fn().mockReturnValue([]),
    onCollision: vi.fn((handler) => {
      collisionHandler = handler;
      return () => {
        collisionHandler = null;
      };
    }),
    startDrag: vi.fn(),
    moveDrag: vi.fn(),
    endDrag: vi.fn(),
    // テスト用ヘルパー: 衝突イベントを手動発火する
    _triggerCollision(a: PhysicsBody2dState, b: PhysicsBody2dState) {
      collisionHandler?.(a, b);
    },
  } as unknown as ISimpleDragPhysicsEngine & {
    _triggerCollision: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void;
  };
}

const pikachu = buildMockPokeData({ speciesId: 25, jaName: "ピカチュウ" });
const fushigidane = buildMockPokeData({ speciesId: 1, jaName: "フシギダネ" });

describe("PairCollisionDetectionFacade", () => {
  let facade: PairCollisionDetectionFacade;
  let physics: ReturnType<typeof createMockPhysics>;

  beforeEach(async () => {
    physics = createMockPhysics();
    facade = new PairCollisionDetectionFacade(physics as unknown as ISimpleDragPhysicsEngine, createMockRepository());
    await facade.initialize(mockConfig);
    vi.mocked(selectRandomPokemons).mockReset();
  });

  describe("spawnPokemons", () => {
    it("エンジン未初期化のとき success: false を返す", async () => {
      const freshFacade = new PairCollisionDetectionFacade(
        physics as unknown as ISimpleDragPhysicsEngine,
        createMockRepository(),
      );
      const res = await freshFacade.spawnPokemons(mockFetch, 1);
      expect(res.success).toBe(false);
    });

    it("成功時は success: true を返し activeBodyCount が 2×count になる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);

      const res = await facade.spawnPokemons(mockFetch, 1);

      expect(res.success).toBe(true);
      expect(get(activeBodyCount)).toBe(2);
    });

    it("失敗時は success: false を返す", async () => {
      vi.mocked(selectRandomPokemons).mockRejectedValue(new Error("Network Error"));

      const res = await facade.spawnPokemons(mockFetch, 1);

      expect(res.success).toBe(false);
    });

    it("count=2 のとき activeBodyCount が 4 になる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu, fushigidane]);

      const res = await facade.spawnPokemons(mockFetch, 2);

      expect(res.success).toBe(true);
      expect(get(activeBodyCount)).toBe(4);
    });

    it("physics.addBody が count×2 回呼ばれる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu, fushigidane]);

      await facade.spawnPokemons(mockFetch, 2);

      expect(vi.mocked(physics.addBody)).toHaveBeenCalledTimes(4);
    });
  });

  describe("initialize", () => {
    it("initialize 呼び出しでストアがリセットされる", async () => {
      // 先にスポーンしてストアを汚す
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);
      await facade.spawnPokemons(mockFetch, 1);
      expect(get(activeBodyCount)).toBe(2);

      // 再初期化でリセットされる
      await facade.initialize(mockConfig);
      expect(get(matchedCount)).toBe(0);
      expect(get(activeBodyCount)).toBe(0);
      expect(get(lastMatchJaName)).toBeNull();
      expect(get(lastMatchCryUrl)).toBeNull();
    });

    it("physics.initialize が設定を渡して呼ばれる", async () => {
      const freshPhysics = createMockPhysics();
      const freshFacade = new PairCollisionDetectionFacade(
        freshPhysics as unknown as ISimpleDragPhysicsEngine,
        createMockRepository(),
      );
      await freshFacade.initialize(mockConfig);

      expect(vi.mocked(freshPhysics.initialize)).toHaveBeenCalledWith(mockConfig);
    });
  });

  describe("collision handling", () => {
    it("同カテゴリのボディが衝突すると matchedCount が増える", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);
      await facade.spawnPokemons(mockFetch, 1);

      // addBody が呼ばれた引数から生成されたIDとカテゴリを取得
      const addBodyCalls = vi.mocked(physics.addBody).mock.calls;
      const [cfg1, cfg2] = [addBodyCalls[0]![0], addBodyCalls[1]![0]];

      const bodyA: PhysicsBody2dState = {
        id: cfg1.id,
        category: cfg1.category,
        position: { x: 0, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      const bodyB: PhysicsBody2dState = {
        id: cfg2.id,
        category: cfg2.category,
        position: { x: 10, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };

      (
        physics as unknown as { _triggerCollision: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void }
      )._triggerCollision(bodyA, bodyB);

      expect(get(matchedCount)).toBe(1);
      expect(get(activeBodyCount)).toBe(0);
      expect(get(lastMatchJaName)).toBe("ピカチュウ");
    });

    it("マッチ成立時に lastMatchCryUrl が設定される", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);
      await facade.spawnPokemons(mockFetch, 1);

      const addBodyCalls = vi.mocked(physics.addBody).mock.calls;
      const [cfg1, cfg2] = [addBodyCalls[0]![0], addBodyCalls[1]![0]];

      const bodyA: PhysicsBody2dState = {
        id: cfg1.id,
        category: cfg1.category,
        position: { x: 0, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      const bodyB: PhysicsBody2dState = {
        id: cfg2.id,
        category: cfg2.category,
        position: { x: 10, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };

      (
        physics as unknown as { _triggerCollision: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void }
      )._triggerCollision(bodyA, bodyB);

      // pikachu の cryUrls.latest が設定される
      expect(get(lastMatchCryUrl)).toBe("https://example.com/pikachu.ogg");
    });

    it("マッチ成立時に physics.removeBody が両ボディに対して呼ばれる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);
      await facade.spawnPokemons(mockFetch, 1);

      const addBodyCalls = vi.mocked(physics.addBody).mock.calls;
      const [cfg1, cfg2] = [addBodyCalls[0]![0], addBodyCalls[1]![0]];

      const bodyA: PhysicsBody2dState = {
        id: cfg1.id,
        category: cfg1.category,
        position: { x: 0, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      const bodyB: PhysicsBody2dState = {
        id: cfg2.id,
        category: cfg2.category,
        position: { x: 10, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };

      (
        physics as unknown as { _triggerCollision: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void }
      )._triggerCollision(bodyA, bodyB);

      expect(vi.mocked(physics.removeBody)).toHaveBeenCalledWith(cfg1.id);
      expect(vi.mocked(physics.removeBody)).toHaveBeenCalledWith(cfg2.id);
    });

    it("異カテゴリのボディが衝突しても matchedCount は増えない", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu, fushigidane]);
      await facade.spawnPokemons(mockFetch, 2);

      const addBodyCalls = vi.mocked(physics.addBody).mock.calls;
      // pikachu の 1 体目と fushigidane の 1 体目（異カテゴリ）
      const cfgPika = addBodyCalls[0]![0];
      const cfgFushi = addBodyCalls[2]![0];

      const bodyA: PhysicsBody2dState = {
        id: cfgPika.id,
        category: cfgPika.category,
        position: { x: 0, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      const bodyB: PhysicsBody2dState = {
        id: cfgFushi.id,
        category: cfgFushi.category,
        position: { x: 10, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };

      (
        physics as unknown as { _triggerCollision: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void }
      )._triggerCollision(bodyA, bodyB);

      expect(get(matchedCount)).toBe(0);
      expect(get(activeBodyCount)).toBe(4);
    });

    it("すでに削除済みのボディが衝突イベントに含まれる場合は無視される（二重削除防止）", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);
      await facade.spawnPokemons(mockFetch, 1);

      const addBodyCalls = vi.mocked(physics.addBody).mock.calls;
      const [cfg1, cfg2] = [addBodyCalls[0]![0], addBodyCalls[1]![0]];

      const bodyA: PhysicsBody2dState = {
        id: cfg1.id,
        category: cfg1.category,
        position: { x: 0, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      const bodyB: PhysicsBody2dState = {
        id: cfg2.id,
        category: cfg2.category,
        position: { x: 10, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      const triggerCollision = (
        physics as unknown as { _triggerCollision: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void }
      )._triggerCollision.bind(physics);

      // 1 回目の衝突でマッチ成立
      triggerCollision(bodyA, bodyB);
      expect(get(matchedCount)).toBe(1);

      // 2 回目の衝突は無視される
      triggerCollision(bodyA, bodyB);
      expect(get(matchedCount)).toBe(1);
    });
  });

  describe("dispose", () => {
    it("physics.dispose を呼び出す", () => {
      facade.dispose();
      expect(vi.mocked(physics.dispose)).toHaveBeenCalled();
    });

    it("dispose 後にストアがリセットされる", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);
      await facade.spawnPokemons(mockFetch, 1);
      expect(get(activeBodyCount)).toBe(2);

      facade.dispose();

      expect(get(matchedCount)).toBe(0);
      expect(get(activeBodyCount)).toBe(0);
      expect(get(lastMatchJaName)).toBeNull();
      expect(get(lastMatchCryUrl)).toBeNull();
    });

    it("dispose 後に衝突イベントが発火しても matchedCount は変化しない", async () => {
      vi.mocked(selectRandomPokemons).mockResolvedValue([pikachu]);
      await facade.spawnPokemons(mockFetch, 1);

      const addBodyCalls = vi.mocked(physics.addBody).mock.calls;
      const [cfg1, cfg2] = [addBodyCalls[0]![0], addBodyCalls[1]![0]];

      facade.dispose();

      // dispose 後にリスナーが解除されているため衝突は無視される
      const bodyA: PhysicsBody2dState = {
        id: cfg1.id,
        category: cfg1.category,
        position: { x: 0, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      const bodyB: PhysicsBody2dState = {
        id: cfg2.id,
        category: cfg2.category,
        position: { x: 10, y: 0 },
        angle: 0,
        imageUrl: "",
        renderWidth: 64,
        renderHeight: 64,
      };
      (
        physics as unknown as { _triggerCollision: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void }
      )._triggerCollision(bodyA, bodyB);

      expect(get(matchedCount)).toBe(0);
    });
  });
});
