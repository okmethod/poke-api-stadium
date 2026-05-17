/**
 * MatterJsSpringScaleAdapter - matter.js によるバネばかり型 ISpringScalePhysicsEngine 実装
 *
 * @remarks
 * - 台（プラットフォーム）はバネ力で上下にのみ動く動的ボディ
 * - ポケモンボディは台の上に落下して積み重なる（物理質量は極小値固定）
 * - バネの平衡位置は setTargetWeight() と addPokeBody() で渡された重量比率で外部制御する
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: ISpringScalePhysicsEngine Port の具象実装
 * - ALLOWED: アプリ層 Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import type { PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import type {
  ISpringScalePhysicsEngine,
  SpringScalePokeBodyConfig,
  SpringScaleState,
} from "$lib/application/ports/ISpringScalePhysicsEngine";
import { AbstractMatterJsAdapter } from "./AbstractMatterJsAdapter";

// ポケモンボディの描画半径（px）
const POKE_VISUAL_RADIUS = 24;
// ポケモンボディの物理質量（台の平衡はバネで制御するため極小値にする）
const POKE_PHYSICS_MASS = 0.01;

// 台レイアウト（キャンバス高さに対する比率）
const ANCHOR_Y_RATIO = 0.08;
const EMPTY_Y_RATIO = 0.3;
const TARGET_Y_RATIO = 0.62;

const PLATFORM_WIDTH_RATIO = 0.82;
const PLATFORM_THICKNESS = 16;
const PLATFORM_MASS = 2.0;
const PLATFORM_FRICTION_AIR = 0.18;

// バネ定数（applyForce の力スケールに合わせて調整済み）
const SPRING_K = 0.02;
// 平衡位置をポケモン追加時に急変させず、毎フレームこの割合だけ目標値に近づける
const SPRING_SETTLE_RATE = 0.06;

// 台の返し（落下防止ガード）の寸法
const GUARD_WIDTH = 10;
const GUARD_HEIGHT = 24;

// ポケモンのスポーン位置（emptyY からどれだけ上か）
const SPAWN_Y_ABOVE = 60;
// スポーン X の広がり（台幅に対する比率）
const SPAWN_ZONE_RATIO = 0.6;

class MatterJsSpringScaleAdapter extends AbstractMatterJsAdapter implements ISpringScalePhysicsEngine {
  private platform!: import("matter-js").Body;
  private pivotX!: number;
  private platformWidth!: number;
  private anchorY!: number;
  private emptyY!: number;
  private targetY!: number;

  // 現在の平衡位置計算に使う質量（SPRING_SETTLE_RATE で目標値に向けて毎フレーム補間）
  private totalNormalizedMass = 0;
  // addPokeBody / removePokeBody で即時更新される目標質量
  private targetNormalizedMass = 0;
  private targetMass = 1;

  private springBroken = false;
  private guards: import("matter-js").Body[] = [];
  private pokeBodyById = new Map<string, import("matter-js").Body>();
  private pokeWeightById = new Map<string, number>();
  private pokeImageUrlById = new Map<string, string>();

  async initialize(config: PhysicsWorld2dConfig): Promise<void> {
    await this.initializeMatterJs(config, { enableSleeping: false });

    this.pivotX = config.width / 2;
    this.platformWidth = config.width * PLATFORM_WIDTH_RATIO;
    this.anchorY = config.height * ANCHOR_Y_RATIO;
    this.emptyY = config.height * EMPTY_Y_RATIO;
    this.targetY = config.height * TARGET_Y_RATIO;

    this.platform = this.M.Bodies.rectangle(this.pivotX, this.emptyY, this.platformWidth, PLATFORM_THICKNESS, {
      isStatic: false,
      mass: PLATFORM_MASS,
      frictionAir: PLATFORM_FRICTION_AIR,
      friction: 0.8,
      restitution: 0.05,
      label: "__platform__",
    });

    this.M.Composite.add(this.engine.world, this.platform);
    this.addWalls(config.width, config.height, { friction: 0.5 });

    // 台の左右に返し（落下防止ガード）を追加
    const initGuardY = this.emptyY - PLATFORM_THICKNESS / 2 - GUARD_HEIGHT / 2;
    const guardOptions = { isStatic: true, friction: 0.8, restitution: 0.0, label: "__guard__" };
    this.guards = [
      this.M.Bodies.rectangle(
        this.pivotX - this.platformWidth / 2,
        initGuardY,
        GUARD_WIDTH,
        GUARD_HEIGHT,
        guardOptions,
      ),
      this.M.Bodies.rectangle(
        this.pivotX + this.platformWidth / 2,
        initGuardY,
        GUARD_WIDTH,
        GUARD_HEIGHT,
        guardOptions,
      ),
    ];
    this.M.Composite.add(this.engine.world, this.guards);

    this._setupSpringEvents();
  }

  dispose(): void {
    this.disposeMatterJs();
    this.pokeBodyById.clear();
    this.pokeWeightById.clear();
    this.guards = [];
    this.totalNormalizedMass = 0;
  }

  setTargetWeight(kg: number): void {
    this.targetMass = kg;
  }

  async addPokeBody(config: SpringScalePokeBodyConfig): Promise<void> {
    const normalizedMass = config.mass / this.targetMass;

    // スポーン位置: 台の上方にランダムに配置
    const spawnZoneHalf = (this.platformWidth * SPAWN_ZONE_RATIO) / 2;
    const spawnX = this.pivotX + (Math.random() - 0.5) * 2 * spawnZoneHalf;
    const spawnY = this.emptyY - SPAWN_Y_ABOVE;

    const body = await this.buildBodyFromImage(
      config.id,
      config.imageUrl,
      POKE_VISUAL_RADIUS,
      { x: spawnX, y: spawnY },
      {
        isStatic: false,
        mass: POKE_PHYSICS_MASS,
        friction: 0.7,
        frictionAir: 0.08,
        restitution: 0.0,
      },
    );

    this.pokeBodyById.set(config.id, body);
    this.pokeWeightById.set(config.id, normalizedMass);
    this.pokeImageUrlById.set(config.id, config.imageUrl);
    this.targetNormalizedMass += normalizedMass;
    this.M.Composite.add(this.engine.world, body);
  }

  removePokeBody(id: string): void {
    const body = this.pokeBodyById.get(id);
    if (!body) return;

    const normalizedMass = this.pokeWeightById.get(id) ?? 0;
    this.targetNormalizedMass = Math.max(0, this.targetNormalizedMass - normalizedMass);

    this.M.Composite.remove(this.engine.world, body);
    this.pokeBodyById.delete(id);
    this.pokeWeightById.delete(id);
    this.pokeImageUrlById.delete(id);
  }

  reset(): void {
    for (const body of this.pokeBodyById.values()) {
      this.M.Composite.remove(this.engine.world, body);
    }
    this.pokeBodyById.clear();
    this.pokeWeightById.clear();
    this.pokeImageUrlById.clear();
    this.totalNormalizedMass = 0;
    this.targetNormalizedMass = 0;

    this.springBroken = false;

    // 台を初期位置に戻す
    this.M.Body.setPosition(this.platform, { x: this.pivotX, y: this.emptyY });
    this.M.Body.setVelocity(this.platform, { x: 0, y: 0 });
    this.M.Body.setAngle(this.platform, 0);
    this.M.Body.setAngularVelocity(this.platform, 0);

    // ガードも初期位置に戻す
    const initGuardY = this.emptyY - PLATFORM_THICKNESS / 2 - GUARD_HEIGHT / 2;
    this.M.Body.setPosition(this.guards[0]!, { x: this.pivotX - this.platformWidth / 2, y: initGuardY });
    this.M.Body.setPosition(this.guards[1]!, { x: this.pivotX + this.platformWidth / 2, y: initGuardY });
  }

  getState(): SpringScaleState {
    const pokeBodies = [];
    for (const [id, body] of this.pokeBodyById) {
      pokeBodies.push(
        this.toBodyState(id, body, this.pokeImageUrlById.get(id), POKE_VISUAL_RADIUS * 2, POKE_VISUAL_RADIUS * 2),
      );
    }
    return {
      platformY: this.platform.position.y,
      platformWidth: this.platformWidth,
      platformThickness: PLATFORM_THICKNESS,
      anchorY: this.anchorY,
      emptyY: this.emptyY,
      targetY: this.targetY,
      pokeBodies,
      isBroken: this.springBroken,
    };
  }

  breakSpring(): void {
    this.springBroken = true;
    // ポケモンを横に弾き飛ばして落下させる
    for (const body of this.pokeBodyById.values()) {
      this.M.Body.setVelocity(body, { x: (Math.random() - 0.5) * 12, y: -3 });
    }
  }

  /** バネ力と台の垂直拘束を設定する */
  private _setupSpringEvents(): void {
    // beforeUpdate: 台の重力を打ち消し、バネ力を加える（破断後はすべて無効にして落下させる）
    this.M.Events.on(this.engine, "beforeUpdate", () => {
      if (!this.platform) return;
      if (this.springBroken) return;

      // matter.js の重力スケールは 0.001 なので打ち消し力も同スケールで計算
      const gravityCancel = PLATFORM_MASS * this.engine.gravity.y * 0.001;
      this.M.Body.applyForce(this.platform, this.platform.position, { x: 0, y: -gravityCancel });

      // ポケモン追加時の急激な平衡位置変化を抑えるため、目標値へ毎フレーム少しずつ近づける
      this.totalNormalizedMass += (this.targetNormalizedMass - this.totalNormalizedMass) * SPRING_SETTLE_RATE;

      // バネ平衡位置: 総重量 0.0→emptyY、1.0→targetY で線形補間
      const restY = this.emptyY + (this.targetY - this.emptyY) * this.totalNormalizedMass;
      const springForce = -SPRING_K * (this.platform.position.y - restY);
      this.M.Body.applyForce(this.platform, this.platform.position, { x: 0, y: springForce });
    });

    // afterUpdate: 台を垂直移動のみに拘束（横ブレ・回転を封じる）。破断後は拘束しない
    this.M.Events.on(this.engine, "afterUpdate", () => {
      if (!this.platform) return;
      if (this.springBroken) return;

      this.M.Body.setPosition(this.platform, { x: this.pivotX, y: this.platform.position.y });
      this.M.Body.setVelocity(this.platform, { x: 0, y: this.platform.velocity.y });
      this.M.Body.setAngle(this.platform, 0);
      this.M.Body.setAngularVelocity(this.platform, 0);

      // ガードを台に追従させる
      const guardY = this.platform.position.y - PLATFORM_THICKNESS / 2 - GUARD_HEIGHT / 2;
      this.M.Body.setPosition(this.guards[0]!, { x: this.pivotX - this.platformWidth / 2, y: guardY });
      this.M.Body.setPosition(this.guards[1]!, { x: this.pivotX + this.platformWidth / 2, y: guardY });
    });
  }
}

/** MatterJsSpringScaleAdapter のファクトリ関数 */
export function getMatterJsSpringScaleAdapter(): ISpringScalePhysicsEngine {
  return new MatterJsSpringScaleAdapter();
}
