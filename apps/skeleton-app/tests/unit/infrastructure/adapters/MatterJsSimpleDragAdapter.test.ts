/**
 * MatterJsSimpleDragAdapter 統合テスト
 *
 * 実 matter.js エンジンを使い Port 実装の正確性を検証する。
 * polygon ボディは Canvas API に依存するため imageVertexExtractor をモックして除外する。
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getMatterJsSimpleDragAdapter } from "$lib/infrastructure/adapters/MatterJsSimpleDragAdapter";
import type { ISimpleDragPhysicsEngine } from "$lib/application/ports/ISimpleDragPhysicsEngine";
import type { CircleBody2dConfig, RectBody2dConfig, PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";

// polygon ボディの Canvas 依存を回避する（null → circle フォールバック）
vi.mock("$lib/infrastructure/adapters/imageVertexExtractor", () => ({
  extractNormalizedVertices: vi.fn().mockResolvedValue(null),
}));

const WORLD: PhysicsWorld2dConfig = { width: 800, height: 600, gravity: 1 };

function circleConfig(id = "c1"): CircleBody2dConfig {
  return { id, collisionShape: "circle", radius: 30, spawnPoint: { x: 100, y: 100 }, category: 1 };
}

function rectConfig(id = "r1"): RectBody2dConfig {
  return {
    id,
    collisionShape: "rect",
    width: 60,
    height: 40,
    spawnPoint: { x: 200, y: 200 },
    category: 2,
  };
}

describe("MatterJsSimpleDragAdapter", () => {
  let adapter: ISimpleDragPhysicsEngine;

  beforeEach(async () => {
    adapter = getMatterJsSimpleDragAdapter();
    await adapter.initialize(WORLD);
  });

  afterEach(() => {
    adapter.dispose();
  });

  // ---- ライフサイクル ----

  describe("initialize / dispose", () => {
    it("initialize 直後は getState が空配列", () => {
      expect(adapter.getState()).toEqual([]);
    });

    it("dispose 後も getState が空配列のまま", () => {
      adapter.dispose();
      expect(adapter.getState()).toEqual([]);
    });
  });

  // ---- addBody / getState ----

  describe("addBody", () => {
    it("circle を追加すると getState に1件現れる", async () => {
      await adapter.addBody(circleConfig());
      expect(adapter.getState()).toHaveLength(1);
    });

    it("rect を追加すると getState に1件現れる", async () => {
      await adapter.addBody(rectConfig());
      expect(adapter.getState()).toHaveLength(1);
    });

    it("circle の renderWidth/Height は radius×2", async () => {
      const cfg = circleConfig();
      await adapter.addBody(cfg);
      const s = adapter.getState()[0];
      expect(s!.renderWidth).toBe(cfg.radius * 2);
      expect(s!.renderHeight).toBe(cfg.radius * 2);
    });

    it("rect の renderWidth/Height は width/height", async () => {
      const cfg = rectConfig();
      await adapter.addBody(cfg);
      const s = adapter.getState()[0];
      expect(s!.renderWidth).toBe(cfg.width);
      expect(s!.renderHeight).toBe(cfg.height);
    });

    it("getState の id・category が config と一致する", async () => {
      const cfg = circleConfig("test-id");
      await adapter.addBody(cfg);
      const s = adapter.getState()[0];
      expect(s!.id).toBe("test-id");
      expect(s!.category).toBe(cfg.category);
    });

    it("addBody 直後の position が spawnPoint と一致する（物理未進行）", async () => {
      const cfg = circleConfig();
      await adapter.addBody(cfg);
      const { position } = adapter.getState()[0]!;
      expect(position.x).toBeCloseTo(cfg.spawnPoint.x);
      expect(position.y).toBeCloseTo(cfg.spawnPoint.y);
    });

    it("複数ボディを追加するとすべて getState に現れる", async () => {
      await adapter.addBody(circleConfig("c1"));
      await adapter.addBody(rectConfig("r1"));
      expect(adapter.getState()).toHaveLength(2);
    });
  });

  // ---- removeBody ----

  describe("removeBody", () => {
    it("追加済みボディを id で削除できる", async () => {
      await adapter.addBody(circleConfig("c1"));
      adapter.removeBody("c1");
      expect(adapter.getState()).toHaveLength(0);
    });

    it("存在しない id の removeBody は no-op（例外なし・件数変化なし）", async () => {
      await adapter.addBody(circleConfig("c1"));
      expect(() => adapter.removeBody("nonexistent")).not.toThrow();
      expect(adapter.getState()).toHaveLength(1);
    });

    it("複数ボディのうち指定 id だけ削除される", async () => {
      await adapter.addBody(circleConfig("c1"));
      await adapter.addBody(circleConfig("c2"));
      adapter.removeBody("c1");
      const states = adapter.getState();
      expect(states).toHaveLength(1);
      expect(states[0]!.id).toBe("c2");
    });
  });

  // ---- reset ----

  describe("reset", () => {
    it("reset 後は getState が空配列になる", async () => {
      await adapter.addBody(circleConfig("c1"));
      await adapter.addBody(rectConfig("r1"));
      adapter.reset();
      expect(adapter.getState()).toHaveLength(0);
    });

    it("reset 後に addBody で再登録できる", async () => {
      await adapter.addBody(circleConfig("c1"));
      adapter.reset();
      await adapter.addBody(circleConfig("c2"));
      const states = adapter.getState();
      expect(states).toHaveLength(1);
      expect(states[0]!.id).toBe("c2");
    });
  });

  // ---- onCollision ----

  describe("onCollision", () => {
    it("登録した解除関数が呼び出し可能（例外なし）", () => {
      const unsubscribe = adapter.onCollision(() => {});
      expect(typeof unsubscribe).toBe("function");
      expect(() => unsubscribe()).not.toThrow();
    });
  });

  // ---- drag ----

  describe("drag", () => {
    it("ボディがない座標への startDrag は no-op（例外なし）", () => {
      expect(() => adapter.startDrag({ x: 400, y: 300 })).not.toThrow();
    });

    it("startDrag なしで moveDrag/endDrag を呼んでも例外なし", () => {
      expect(() => adapter.moveDrag({ x: 100, y: 100 })).not.toThrow();
      expect(() => adapter.endDrag()).not.toThrow();
    });

    it("ボディ上で startDrag → moveDrag → endDrag が例外なく完了する", async () => {
      await adapter.addBody(circleConfig());
      // 物理未進行なので body は spawnPoint 座標にある
      expect(() => adapter.startDrag({ x: 100, y: 100 })).not.toThrow();
      expect(() => adapter.moveDrag({ x: 110, y: 90 })).not.toThrow();
      expect(() => adapter.endDrag()).not.toThrow();
    });

    it("endDrag 後に再度 endDrag を呼んでも例外なし", () => {
      expect(() => adapter.endDrag()).not.toThrow();
      expect(() => adapter.endDrag()).not.toThrow();
    });
  });
});
