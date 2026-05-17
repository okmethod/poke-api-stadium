/**
 * MatterJs2dPhysicsAdapter - matter.js による ISimpleDragPhysicsEngine 実装
 *
 * @remarks
 * - Renderer を使わずヘッドレスで動作（描画は PhysicsCanvas2d.svelte が担う）
 * - ドラッグは Matter.Constraint を直接操作して実現する
 * - 壁ボディをボディマップに登録しないことで衝突ハンドラのフィルタリングを実現する
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: ISimpleDragPhysicsEngine Port の具象実装
 * - ALLOWED: アプリ層 Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import type {
  PhysicsBody2dConfig,
  PhysicsBody2dState,
  PhysicsWorld2dConfig,
  Point2d,
} from "$lib/domain/models/2dPhysics";
import type { ISimpleDragPhysicsEngine } from "$lib/application/ports/ISimpleDragPhysicsEngine";
import type * as MatterType from "matter-js";
import { AbstractMatterJsAdapter } from "./AbstractMatterJsAdapter";

/** matter.js による 2D物理エンジン実装 */
class MatterJs2dPhysicsAdapter extends AbstractMatterJsAdapter implements ISimpleDragPhysicsEngine {
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

  reset(): void {
    for (const body of this.bodyById.values()) {
      this.M.Composite.remove(this.engine.world, body);
    }
    this.bodyById.clear();
    this.configByMatterId.clear();
    if (this.dragConstraint) {
      this.M.Composite.remove(this.engine.world, this.dragConstraint);
      this.dragConstraint = null;
    }
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

  getState(): readonly PhysicsBody2dState[] {
    const states: PhysicsBody2dState[] = [];
    for (const [id, body] of this.bodyById) {
      const config = this.configByMatterId.get(body.id);
      if (!config) continue;
      const isRound = config.collisionShape === "circle" || config.collisionShape === "polygon";
      const renderWidth = isRound ? config.radius * 2 : config.width;
      const renderHeight = isRound ? config.radius * 2 : config.height;
      states.push({
        id,
        imageUrl: config.imageUrl,
        category: config.category,
        position: { x: body.position.x, y: body.position.y },
        angle: body.angle,
        renderWidth,
        renderHeight,
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

  private async buildBody(config: PhysicsBody2dConfig): Promise<MatterType.Body> {
    const opts = { restitution: 0.2, friction: 0.1 };
    if (config.collisionShape === "polygon") {
      return this.buildBodyFromImage(config.id, config.imageUrl, config.radius, config.spawnPoint, opts);
    } else if (config.collisionShape === "circle") {
      return this.M.Bodies.circle(config.spawnPoint.x, config.spawnPoint.y, config.radius, {
        label: config.id,
        ...opts,
      });
    } else {
      return this.M.Bodies.rectangle(config.spawnPoint.x, config.spawnPoint.y, config.width, config.height, {
        label: config.id,
        ...opts,
      });
    }
  }

  private toState(body: MatterType.Body, config: PhysicsBody2dConfig): PhysicsBody2dState {
    const isRound = config.collisionShape === "circle" || config.collisionShape === "polygon";
    const renderWidth = isRound ? config.radius * 2 : config.width;
    const renderHeight = isRound ? config.radius * 2 : config.height;
    return this.toBodyState(config.id, body, config.imageUrl, renderWidth, renderHeight, config.category);
  }
}

/** MatterJs2dPhysicsAdapter のファクトリ関数 */
export function getMatterJs2dPhysicsAdapter(): ISimpleDragPhysicsEngine {
  return new MatterJs2dPhysicsAdapter();
}
