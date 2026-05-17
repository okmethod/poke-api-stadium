/**
 * MatterJsPinballAdapter - matter.js によるピンボールゲーム物理エンジン実装
 *
 * @remarks
 * - 重力あり（gravity.y = 2）の縦型ピンボール物理を実現する
 * - フリッパーは isStatic=true のキネマティック制御（beforeUpdate で角度を直接セット）
 * - バンパーは高反発（restitution=0.9）の静的円ボディ
 * - ボールが DRAIN_Y を超えたら isBallLost = true を返す
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: IPinballPhysicsEngine Port の具象実装
 * - ALLOWED: アプリ層 Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import type { Point2d } from "$lib/domain/models/2dPhysics";
import type {
  IPinballPhysicsEngine,
  PinballWorldConfig,
  PinballEngineState,
  PinballBumperConfig,
  PinballBumperState,
} from "$lib/application/ports/IPinballPhysicsEngine";
import { AbstractMatterJsAdapter, WALL_THICKNESS } from "./AbstractMatterJsAdapter";

// --- 物理パラメーター ---
const GRAVITY = 2;
const BALL_RESTITUTION = 0.55;
const BALL_FRICTION_AIR = 0.003;
const BUMPER_RESTITUTION = 0.9;

// --- フリッパー形状 ---
const FLIPPER_LEN = 90;
const FLIPPER_H = 12;

// --- フリッパーピボット位置（キャンバス座標系） ---
const LEFT_PIVOT: Point2d = { x: 95, y: 530 };
const RIGHT_PIVOT: Point2d = { x: 285, y: 530 };

// --- フリッパー角度（ラジアン） ---
// 左: ピボットから右方向に延びる。Rest=下がり、Active=上がり
const LF_REST = 0.45;
const LF_ACTIVE = -0.3;
// 右: ピボットから左方向に延びる（角度 π を基準）
const RF_REST = Math.PI - 0.45;
const RF_ACTIVE = Math.PI + 0.3;
const FLIPPER_SPEED = 0.2; // rad/physics-step

// --- ボール ---
const BALL_LABEL = "__pinball_ball__";

// --- バンパー ---
const BUMPER_HIT_SPIN_INITIAL = 0.25; // 命中時スピン速度
const BUMPER_HIT_SPIN_DECEL = 0.94; // スピン減速率
const BUMPER_IDLE_SPIN = 0.008; // アイドル時スロー回転

// --- 命中クールダウン ---
const HIT_COOLDOWN_MS = 400;

// --- ドレイン判定 ---
const DRAIN_MARGIN = 80;

/** バンパーのアニメーション状態（描画専用） */
interface BumperAnim {
  angle: number;
  spinSpeed: number;
}

class MatterJsPinballAdapter extends AbstractMatterJsAdapter implements IPinballPhysicsEngine {
  private ball!: import("matter-js").Body;
  private leftFlipper!: import("matter-js").Body;
  private rightFlipper!: import("matter-js").Body;

  private currentLFAngle = LF_REST;
  private currentRFAngle = RF_REST;
  private leftActive = false;
  private rightActive = false;

  private bumperBodyMap = new Map<string, import("matter-js").Body>();
  private bumperConfigMap = new Map<string, { position: Point2d; radius: number; imageUrl: string }>();
  private bumperAnimMap = new Map<string, BumperAnim>();
  private bumperHitTimeMap = new Map<string, number>();

  private startPosition!: Point2d;
  private canvasHeight!: number;
  private unsubscribeBeforeUpdate: (() => void) | null = null;
  private isLaunched = false;

  async initialize(config: PinballWorldConfig): Promise<void> {
    await this.initializeMatterJs({ width: config.width, height: config.height, gravity: GRAVITY });

    this.startPosition = config.ballStartPosition;
    this.canvasHeight = config.height;

    this.createWalls(config.width, config.height);
    this.createFlippers();
    this.createBall(config.ballStartPosition, config.ballRadius);
    this.startFlipperController();
  }

  dispose(): void {
    this.unsubscribeBeforeUpdate?.();
    this.disposeMatterJs();
    this.bumperBodyMap.clear();
    this.bumperConfigMap.clear();
    this.bumperAnimMap.clear();
    this.bumperHitTimeMap.clear();
  }

  setupBumpers(bumpers: PinballBumperConfig[]): void {
    for (const body of this.bumperBodyMap.values()) {
      this.M.Composite.remove(this.engine.world, body);
    }
    this.bumperBodyMap.clear();
    this.bumperConfigMap.clear();
    this.bumperAnimMap.clear();
    this.bumperHitTimeMap.clear();

    for (const config of bumpers) {
      const body = this.M.Bodies.circle(config.position.x, config.position.y, config.radius, {
        isStatic: true,
        restitution: BUMPER_RESTITUTION,
        friction: 0,
        frictionStatic: 0,
        label: config.id,
      });
      this.bumperBodyMap.set(config.id, body);
      this.bumperConfigMap.set(config.id, {
        position: config.position,
        radius: config.radius,
        imageUrl: config.imageUrl,
      });
      this.bumperAnimMap.set(config.id, { angle: 0, spinSpeed: BUMPER_IDLE_SPIN });
      this.M.Composite.add(this.engine.world, body);
    }
  }

  setFlipperLeft(active: boolean): void {
    this.leftActive = active;
  }

  setFlipperRight(active: boolean): void {
    this.rightActive = active;
  }

  launchBall(): void {
    this.isLaunched = true;
  }

  getState(): PinballEngineState {
    const bumpers: PinballBumperState[] = [];
    for (const [id, anim] of this.bumperAnimMap) {
      const cfg = this.bumperConfigMap.get(id);
      if (!cfg) continue;
      bumpers.push({
        id,
        position: cfg.position,
        angle: anim.angle,
        radius: cfg.radius,
        imageUrl: cfg.imageUrl,
      });
    }

    return {
      ballPosition: { x: this.ball.position.x, y: this.ball.position.y },
      ballAngle: this.ball.angle,
      bumpers,
      leftFlipperAngle: this.currentLFAngle,
      rightFlipperAngle: this.currentRFAngle,
      isBallLost: this.isLaunched && this.ball.position.y > this.canvasHeight + DRAIN_MARGIN,
    };
  }

  reset(): void {
    this.isLaunched = false;
    this.M.Body.setPosition(this.ball, this.startPosition);
    this.M.Body.setVelocity(this.ball, { x: 0, y: 0 });
    this.M.Body.setAngle(this.ball, 0);
    this.M.Body.setAngularVelocity(this.ball, 0);
  }

  onBumperHit(handler: (id: string) => void): () => void {
    const listener = (event: import("matter-js").IEventCollision<import("matter-js").Engine>) => {
      for (const pair of event.pairs) {
        const isBallA = pair.bodyA.label === BALL_LABEL;
        const isBallB = pair.bodyB.label === BALL_LABEL;
        if (!isBallA && !isBallB) continue;

        const bumperBody = isBallA ? pair.bodyB : pair.bodyA;
        const id = bumperBody.label;
        if (!this.bumperBodyMap.has(id)) continue;

        // クールダウン中は二重発火を防ぐ
        const now = Date.now();
        const last = this.bumperHitTimeMap.get(id) ?? 0;
        if (now - last < HIT_COOLDOWN_MS) continue;

        this.bumperHitTimeMap.set(id, now);

        // 命中時にスピン演出を開始する
        const anim = this.bumperAnimMap.get(id);
        if (anim) anim.spinSpeed = BUMPER_HIT_SPIN_INITIAL;

        handler(id);
      }
    };

    this.M.Events.on(this.engine, "collisionStart", listener);
    return () => this.M.Events.off(this.engine, "collisionStart", listener);
  }

  // --- private ---

  /** 壁ボディを追加する（ドレインのため底面は除く） */
  private createWalls(width: number, height: number): void {
    const t = WALL_THICKNESS;
    const wallOpts = { isStatic: true as const, restitution: 0.4, friction: 0.05 };

    // 上・左・右のみ（下は開放してドレインにする）
    const walls = [
      this.M.Bodies.rectangle(width / 2, -t / 2, width + t * 2, t, wallOpts),
      this.M.Bodies.rectangle(-t / 2, height / 2, t, height + t * 2, wallOpts),
      this.M.Bodies.rectangle(width + t / 2, height / 2, t, height + t * 2, wallOpts),
    ];

    // コーナーガイド（壁底端からフリッパーピボットへ誘導する斜め壁）
    // 高さを50にしてトンネリングを防ぐ（上端位置を維持し下方向に拡張）
    const leftGuide = this.M.Bodies.rectangle(39, 529, 110, 50, {
      isStatic: true,
      angle: 0.4,
      restitution: 0.3,
      friction: 0.1,
    });
    const rightGuide = this.M.Bodies.rectangle(341, 529, 110, 50, {
      isStatic: true,
      angle: Math.PI - 0.4,
      restitution: 0.3,
      friction: 0.1,
    });

    this.M.Composite.add(this.engine.world, [...walls, leftGuide, rightGuide]);
  }

  /** フリッパーボディを生成してワールドに追加する */
  private createFlippers(): void {
    const opts = { isStatic: true as const, restitution: 0.15, friction: 0.5, label: "__flipper__" };

    this.leftFlipper = this.M.Bodies.rectangle(
      LEFT_PIVOT.x + (FLIPPER_LEN / 2) * Math.cos(LF_REST),
      LEFT_PIVOT.y + (FLIPPER_LEN / 2) * Math.sin(LF_REST),
      FLIPPER_LEN,
      FLIPPER_H,
      opts,
    );
    this.M.Body.setAngle(this.leftFlipper, LF_REST);

    this.rightFlipper = this.M.Bodies.rectangle(
      RIGHT_PIVOT.x + (FLIPPER_LEN / 2) * Math.cos(RF_REST),
      RIGHT_PIVOT.y + (FLIPPER_LEN / 2) * Math.sin(RF_REST),
      FLIPPER_LEN,
      FLIPPER_H,
      opts,
    );
    this.M.Body.setAngle(this.rightFlipper, RF_REST);

    this.M.Composite.add(this.engine.world, [this.leftFlipper, this.rightFlipper]);
  }

  /** ボールボディを生成してワールドに追加する */
  private createBall(startPos: Point2d, radius: number): void {
    this.ball = this.M.Bodies.circle(startPos.x, startPos.y, radius, {
      restitution: BALL_RESTITUTION,
      friction: 0.02,
      frictionStatic: 0,
      frictionAir: BALL_FRICTION_AIR,
      label: BALL_LABEL,
    });
    this.M.Composite.add(this.engine.world, this.ball);
  }

  /**
   * フリッパーキネマティック制御をセットアップする
   *
   * beforeUpdate イベントで毎フレーム角度を更新することで
   * isStatic ボディでもスムーズな回転アニメーションを実現する。
   */
  private startFlipperController(): void {
    const listener = () => {
      this.updateFlipper(true);
      this.updateFlipper(false);
      this.updateBumperSpin();
      // 発射前は毎フレーム始点にピン留めして重力・衝突の影響を無効化する
      if (!this.isLaunched) {
        this.M.Body.setPosition(this.ball, this.startPosition);
        this.M.Body.setVelocity(this.ball, { x: 0, y: 0 });
      }
    };
    this.M.Events.on(this.engine, "beforeUpdate", listener);
    this.unsubscribeBeforeUpdate = () => this.M.Events.off(this.engine, "beforeUpdate", listener);
  }

  private updateFlipper(isLeft: boolean): void {
    const flipper = isLeft ? this.leftFlipper : this.rightFlipper;
    const pivot = isLeft ? LEFT_PIVOT : RIGHT_PIVOT;
    const active = isLeft ? this.leftActive : this.rightActive;
    const restAngle = isLeft ? LF_REST : RF_REST;
    const activeAngle = isLeft ? LF_ACTIVE : RF_ACTIVE;

    const current = isLeft ? this.currentLFAngle : this.currentRFAngle;
    const target = active ? activeAngle : restAngle;
    const delta = target - current;
    const step = Math.sign(delta) * Math.min(Math.abs(delta), FLIPPER_SPEED);
    const next = current + step;

    if (isLeft) {
      this.currentLFAngle = next;
    } else {
      this.currentRFAngle = next;
    }

    this.M.Body.setAngle(flipper, next);
    this.M.Body.setPosition(flipper, {
      x: pivot.x + (FLIPPER_LEN / 2) * Math.cos(next),
      y: pivot.y + (FLIPPER_LEN / 2) * Math.sin(next),
    });
  }

  private updateBumperSpin(): void {
    for (const anim of this.bumperAnimMap.values()) {
      if (anim.spinSpeed > BUMPER_IDLE_SPIN) {
        anim.spinSpeed *= BUMPER_HIT_SPIN_DECEL;
        if (anim.spinSpeed < BUMPER_IDLE_SPIN) anim.spinSpeed = BUMPER_IDLE_SPIN;
      }
      anim.angle += anim.spinSpeed;
    }
  }
}

/** MatterJsPinballAdapter のファクトリ関数 */
export function getMatterJsPinballAdapter(): IPinballPhysicsEngine {
  return new MatterJsPinballAdapter();
}
