/**
 * MatterJsSeesawAdapter - matter.js による ISeesawPhysicsEngine 実装
 *
 * @remarks
 * - シーソー（プランク + ピボット拘束）を matter.js で構築する
 * - ポケモンボディは初期静止、release() 後に質量付き動的ボディになる
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: ISeesawPhysicsEngine Port の具象実装
 * - ALLOWED: アプリ層 Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import type {
  ISeesawPhysicsEngine,
  SeesawPokeBodyConfig,
  SeesawState,
} from "$lib/application/ports/ISeesawPhysicsEngine";
import type { PhysicsBody2dState, PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import { AbstractMatterJsAdapter, COLLISION_SCALE } from "./AbstractMatterJsAdapter";

// 描画用の半径（画像の表示サイズ）
const POKE_VISUAL_RADIUS = 40;
// 物理ボディの半径（当たり判定）
const POKE_COLLISION_RADIUS = Math.round(POKE_VISUAL_RADIUS * COLLISION_SCALE);

const PLANK_THICKNESS = 12;
const PLANK_WIDTH_RATIO = 0.78;

// ポケモンをシーソー腕の中央付近に配置するオフセット（プランク半幅からの引き）
const ARM_MARGIN = POKE_VISUAL_RADIUS * 1.5;

// ポケモン生成Y: プランク上面から SPAWN_Y_GAP 分だけ上に浮かせた位置に表示する
const SPAWN_Y_GAP = 40;
const SPAWN_Y_OFFSET = PLANK_THICKNESS / 2 + POKE_VISUAL_RADIUS + SPAWN_Y_GAP;
const PIVOT_Y_RATIO = 0.68;

class MatterJsSeesawAdapter extends AbstractMatterJsAdapter implements ISeesawPhysicsEngine {
  private plank!: import("matter-js").Body;
  private pivotX!: number;
  private pivotY!: number;
  private plankWidth!: number;

  private pokeBodyById = new Map<string, import("matter-js").Body>();
  private pokeConfigById = new Map<string, SeesawPokeBodyConfig>();

  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    await this.initializeMatterJs(config, { enableSleeping: false });

    this.pivotX = config.width / 2;
    this.pivotY = config.height * PIVOT_Y_RATIO;
    this.plankWidth = config.width * PLANK_WIDTH_RATIO;

    // シーソーの板（プランク）
    this.plank = this.M.Bodies.rectangle(this.pivotX, this.pivotY, this.plankWidth, PLANK_THICKNESS, {
      isStatic: false,
      frictionAir: 0.04,
      restitution: 0.15,
      density: 0.008,
      label: "__plank__",
    });

    // 支点拘束: プランク中心をワールド座標の支点に固定する
    const pivotConstraint = this.M.Constraint.create({
      pointA: { x: this.pivotX, y: this.pivotY },
      bodyB: this.plank,
      pointB: { x: 0, y: 0 },
      stiffness: 1,
      length: 0,
    });

    this.M.Composite.add(this.engine.world, [this.plank, pivotConstraint]);
    this.addWalls(config.width, config.height, { friction: 0.3 });
  }

  dispose(): void {
    this.disposeMatterJs();
    this.pokeBodyById.clear();
    this.pokeConfigById.clear();
  }

  async addPokeBody(config: SeesawPokeBodyConfig): Promise<void> {
    const armX = this.plankWidth / 2 - ARM_MARGIN;
    const spawnX = this.pivotX + (config.side === "left" ? -armX : armX);
    const spawnY = this.pivotY - SPAWN_Y_OFFSET;

    const body = this.M.Bodies.circle(spawnX, spawnY, POKE_COLLISION_RADIUS, {
      isStatic: true,
      restitution: 0.05,
      friction: 0.5,
      label: config.id,
    });

    this.pokeBodyById.set(config.id, body);
    this.pokeConfigById.set(config.id, config);
    this.M.Composite.add(this.engine.world, body);
  }

  removePokeBody(id: string): void {
    const body = this.pokeBodyById.get(id);
    if (!body) return;
    this.M.Composite.remove(this.engine.world, body);
    this.pokeBodyById.delete(id);
    this.pokeConfigById.delete(id);
  }

  release(): void {
    // setStatic(false) では matter.js が前フレームの静的ボディとして衝突を検出しないため、
    // 一度削除して動的ボディとして再追加することで確実に衝突判定を有効化する
    for (const [id, staticBody] of this.pokeBodyById) {
      const config = this.pokeConfigById.get(id);
      if (!config) continue;

      const pos = staticBody.position;
      this.M.Composite.remove(this.engine.world, staticBody);

      const dynamicBody = this.M.Bodies.circle(pos.x, pos.y, POKE_COLLISION_RADIUS, {
        isStatic: false,
        mass: config.mass,
        restitution: 0.1,
        friction: 0.5,
        label: id,
      });
      this.pokeBodyById.set(id, dynamicBody);
      this.M.Composite.add(this.engine.world, dynamicBody);
    }
  }

  resetSeesaw(): void {
    this.M.Body.setAngle(this.plank, 0);
    this.M.Body.setAngularVelocity(this.plank, 0);
    this.M.Body.setVelocity(this.plank, { x: 0, y: 0 });
    this.M.Body.setPosition(this.plank, { x: this.pivotX, y: this.pivotY });
  }

  getState(): SeesawState {
    const pokeBodies: PhysicsBody2dState[] = [];
    for (const [id, body] of this.pokeBodyById) {
      const config = this.pokeConfigById.get(id);
      if (!config) continue;
      pokeBodies.push({
        id,
        imageUrl: config.imageUrl,
        category: 1,
        position: { x: body.position.x, y: body.position.y },
        angle: body.angle,
        radius: POKE_VISUAL_RADIUS,
      });
    }
    return {
      plankAngle: this.plank.angle,
      plankPosition: { x: this.plank.position.x, y: this.plank.position.y },
      plankWidth: this.plankWidth,
      plankThickness: PLANK_THICKNESS,
      pivotPoint: { x: this.pivotX, y: this.pivotY },
      pokeBodies,
    };
  }
}

/** MatterJsSeesawAdapter のファクトリ関数 */
export function getMatterJsSeesawAdapter(): ISeesawPhysicsEngine {
  return new MatterJsSeesawAdapter();
}
