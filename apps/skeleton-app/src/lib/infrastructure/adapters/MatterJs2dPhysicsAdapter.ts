/**
 * MatterJs2dPhysicsAdapter - matter.js による I2dPhysicsEngine 実装
 *
 * @remarks
 * - matter.js はブラウザ専用のため dynamic import で遅延読み込みする
 * - Renderer を使わずヘッドレスで動作（描画は PhysicsCanvas2d.svelte が担う）
 * - ドラッグは Matter.Constraint を直接操作して実現する
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: I2dPhysicsEngine Port の具象実装
 * - ALLOWED: アプリ層 Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import type { I2dPhysicsEngine } from "$lib/application/ports/I2dPhysicsEngine";
import type {
  PhysicsBody2dConfig,
  PhysicsBody2dState,
  PhysicsWorld2dConfig,
  Point2d,
} from "$lib/domain/models/2dPhysics";
import type * as MatterType from "matter-js";
import { AbstractMatterJsAdapter, COLLISION_SCALE } from "./AbstractMatterJsAdapter";
import { extractNormalizedVertices } from "./imageVertexExtractor";

// 壁ボディはボディマップに登録しないことで衝突ハンドラのフィルタを実現する

/** matter.js による 2D物理エンジン実装 */
class MatterJs2dPhysicsAdapter extends AbstractMatterJsAdapter implements I2dPhysicsEngine {
  private dragConstraint: MatterType.Constraint | null = null;

  /** 管理ボディマップ: 独自ID → matter.js Body */
  private bodyById = new Map<string, MatterType.Body>();
  /** 逆引きマップ: matter.js Body の内部ID → 独自設定 */
  private configByMatterId = new Map<number, PhysicsBody2dConfig>();

  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    await this.initializeMatterJs(config, {
      enableSleeping: true,
      positionIterations: 6,
      velocityIterations: 4,
    });
    this.addWalls(config.width, config.height);
  }

  dispose(): void {
    this.disposeMatterJs();
    this.bodyById.clear();
    this.configByMatterId.clear();
    this.dragConstraint = null;
  }

  async addBody(config: PhysicsBody2dConfig): Promise<void> {
    const body = await this.buildBody(config);
    // カテゴリをそのまま整数で設定（マッチング判定は等値比較で行うため bit mask は不要）
    body.collisionFilter.category = config.category;

    this.bodyById.set(config.id, body);
    this.configByMatterId.set(body.id, config);
    this.M.Composite.add(this.engine.world, body);
  }

  removeBody(id: string): void {
    const body = this.bodyById.get(id);
    if (!body) return;
    this.M.Composite.remove(this.engine.world, body);
    this.configByMatterId.delete(body.id);
    this.bodyById.delete(id);
  }

  getBodies(): readonly PhysicsBody2dState[] {
    const states: PhysicsBody2dState[] = [];
    for (const [id, body] of this.bodyById) {
      const config = this.configByMatterId.get(body.id);
      if (!config) continue;
      states.push({
        id,
        imageUrl: config.imageUrl,
        category: config.category,
        position: { x: body.position.x, y: body.position.y },
        angle: body.angle,
        radius: config.radius,
      });
    }
    return states;
  }

  onCollision(handler: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void): () => void {
    const listener = (event: MatterType.IEventCollision<MatterType.Engine>) => {
      for (const pair of event.pairs) {
        const configA = this.configByMatterId.get(pair.bodyA.id);
        const configB = this.configByMatterId.get(pair.bodyB.id);
        // 壁（configByMatterId 未登録）はスキップ
        if (!configA || !configB) continue;

        handler(this.toState(pair.bodyA, configA), this.toState(pair.bodyB, configB));
      }
    };
    this.M.Events.on(this.engine, "collisionStart", listener);
    return () => this.M.Events.off(this.engine, "collisionStart", listener);
  }

  startDrag(point: Point2d): void {
    const nonStatic = this.M.Composite.allBodies(this.engine.world).filter((b) => !b.isStatic);
    const hit = this.M.Query.point(nonStatic, point);
    if (hit.length === 0) return;

    this.dragConstraint = this.M.Constraint.create({
      pointA: { x: point.x, y: point.y },
      bodyB: hit[0],
      stiffness: 0.2,
      damping: 0,
      length: 0,
      render: { visible: false },
    });
    this.M.Composite.add(this.engine.world, this.dragConstraint);
  }

  moveDrag(point: Point2d): void {
    if (this.dragConstraint) {
      this.dragConstraint.pointA = { x: point.x, y: point.y };
    }
  }

  endDrag(): void {
    if (this.dragConstraint) {
      this.M.Composite.remove(this.engine.world, this.dragConstraint);
      this.dragConstraint = null;
    }
  }

  // --- private ---

  /**
   * 画像輪郭からポリゴンボディを生成する。
   * 画像解析失敗時は円ボディにフォールバックする。
   *
   * @remarks
   * Bodies.fromVertices() は内部で isConvex() チェックを行い浮動小数点誤差で誤判定するため、
   * Body.create({ vertices }) で直接生成して poly-decomp 警告を回避する。
   */
  private async buildBody(config: PhysicsBody2dConfig): Promise<MatterType.Body> {
    const bodyOptions = { restitution: 0.2, friction: 0.1, label: config.id };
    const { x, y } = config.spawnPoint;

    const normalizedVerts = await extractNormalizedVertices(config.imageUrl, config.radius);
    if (normalizedVerts && normalizedVerts.length >= 3) {
      // matter.js の実行時は {x,y} があれば動作するが型定義が Vertex[] を要求するためキャスト
      const hull = this.M.Vertices.hull(normalizedVerts as unknown as MatterType.Vertex[]);
      const scaledHull = hull.map((v) => ({ x: v.x * COLLISION_SCALE, y: v.y * COLLISION_SCALE }));
      try {
        // Body.create に vertices + position を渡すことで isConvex チェックをバイパスする
        const body = this.M.Body.create({ ...bodyOptions, vertices: scaledHull, position: { x, y } });
        console.debug(`[Physics] polygon body: ${hull.length} verts`, config.imageUrl);
        return body;
      } catch (e) {
        console.warn("[Physics] polygon body failed, fallback to circle", config.imageUrl, e);
      }
    } else {
      console.warn("[Physics] vertex extraction failed, fallback to circle", config.imageUrl);
    }

    // フォールバック: 円ボディ
    return this.M.Bodies.circle(x, y, config.radius * COLLISION_SCALE, bodyOptions);
  }

  private toState(body: MatterType.Body, config: PhysicsBody2dConfig): PhysicsBody2dState {
    return {
      id: config.id,
      imageUrl: config.imageUrl,
      category: config.category,
      position: { x: body.position.x, y: body.position.y },
      angle: body.angle,
      radius: config.radius,
    };
  }
}

/** MatterJs2dPhysicsAdapter のファクトリ関数 */
export function getMatterJs2dPhysicsAdapter(): I2dPhysicsEngine {
  return new MatterJs2dPhysicsAdapter();
}
