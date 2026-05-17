/**
 * MatterJsBilliardAdapter - matter.js によるビリヤードゲーム物理エンジン実装
 *
 * @remarks
 * - 重力なし（gravity.y = 0）の平面ビリヤード物理を実現する
 * - ボールの回転角度を追跡し、スプライト回転表示に使用する
 * - ポケモンはセンサーボディ（isSensor=true）として衝突検出のみを行う
 * - Facade の tick() から毎フレーム getBallState() でポーリングする方式
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: IBilliardPhysicsEngine Port の具象実装
 * - ALLOWED: アプリ層 Port への依存、ドメイン層モデルへの依存
 * - FORBIDDEN: プレゼン層への依存
 */

import type { Point2d } from "$lib/domain/models/2dPhysics";
import type {
  IBilliardPhysicsEngine,
  BilliardBallState,
  BilliardCoursePokemon,
  BilliardCourseObstacle,
  BilliardWorldConfig,
} from "$lib/application/ports/IBilliardPhysicsEngine";
import { AbstractMatterJsAdapter } from "./AbstractMatterJsAdapter";

// FRICTION=0.998 相当: frictionAir = 1 - 0.998 = 0.002
const BALL_FRICTION_AIR = 0.002;
// ボールの反発係数（壁・障害物は 0 にして max 演算で 0.92 を有効化する）
const BALL_RESTITUTION = 0.92;

const BALL_LABEL = "__billiard_ball__";

class MatterJsBilliardAdapter extends AbstractMatterJsAdapter implements IBilliardPhysicsEngine {
  private ball!: import("matter-js").Body;
  private startPosition!: Point2d;
  private obstacleBodyById = new Map<string, import("matter-js").Body>();
  private pokemonBodyById = new Map<string, import("matter-js").Body>();
  // 同一ポケモンへの二重命中を防ぐ
  private hitPokemonIds = new Set<string>();

  async initialize(config: BilliardWorldConfig): Promise<void> {
    // gravity=0 を PhysicsWorld2dConfig 互換形式で渡す
    await this.initializeMatterJs(
      { width: config.width, height: config.height, gravity: 0 },
      { enableSleeping: false },
    );

    // 壁: 反発係数 0（ボール側の 0.92 が max 演算で有効になる）、摩擦なし
    this.addWalls(config.width, config.height, { restitution: 0, friction: 0, frictionStatic: 0 });

    this.startPosition = config.ballStartPosition;
    this.ball = this.M.Bodies.circle(config.ballStartPosition.x, config.ballStartPosition.y, config.ballRadius, {
      restitution: BALL_RESTITUTION,
      friction: 0,
      frictionStatic: 0,
      frictionAir: BALL_FRICTION_AIR,
      label: BALL_LABEL,
    });
    this.M.Composite.add(this.engine.world, this.ball);
  }

  dispose(): void {
    this.disposeMatterJs();
    this.obstacleBodyById.clear();
    this.pokemonBodyById.clear();
    this.hitPokemonIds.clear();
  }

  setupCourse(obstacles: BilliardCourseObstacle[], pokemons: BilliardCoursePokemon[]): void {
    // 前ラウンドの障害物・ポケモンを除去
    for (const body of this.obstacleBodyById.values()) {
      this.M.Composite.remove(this.engine.world, body);
    }
    for (const body of this.pokemonBodyById.values()) {
      this.M.Composite.remove(this.engine.world, body);
    }
    this.obstacleBodyById.clear();
    this.pokemonBodyById.clear();
    this.hitPokemonIds.clear();

    // 障害物（静的矩形）: Matter.js の rectangle は中心座標を取るため変換する
    for (const obs of obstacles) {
      const body = this.M.Bodies.rectangle(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width, obs.height, {
        isStatic: true,
        restitution: 0,
        friction: 0,
        frictionStatic: 0,
        label: obs.id,
      });
      this.obstacleBodyById.set(obs.id, body);
      this.M.Composite.add(this.engine.world, body);
    }

    // ポケモンターゲット（センサー円）: 物理応答なしで衝突検出のみ
    for (const poke of pokemons) {
      const body = this.M.Bodies.circle(poke.x, poke.y, poke.radius, {
        isStatic: true,
        isSensor: true,
        label: poke.id,
      });
      this.pokemonBodyById.set(poke.id, body);
      this.M.Composite.add(this.engine.world, body);
    }
  }

  launch(velocity: Point2d): void {
    this.M.Body.setVelocity(this.ball, velocity);
  }

  getBallState(): BilliardBallState {
    const v = this.ball.velocity;
    return {
      position: { x: this.ball.position.x, y: this.ball.position.y },
      angle: this.ball.angle,
      speed: Math.sqrt(v.x * v.x + v.y * v.y),
    };
  }

  onPokemonHit(handler: (id: string) => void): () => void {
    const listener = (event: import("matter-js").IEventCollision<import("matter-js").Engine>) => {
      for (const pair of event.pairs) {
        const isBallA = pair.bodyA.label === BALL_LABEL;
        const isBallB = pair.bodyB.label === BALL_LABEL;
        if (!isBallA && !isBallB) continue;

        const pokemonBody = isBallA ? pair.bodyB : pair.bodyA;
        const id = pokemonBody.label;

        if (!this.pokemonBodyById.has(id)) continue;
        if (this.hitPokemonIds.has(id)) continue;

        // 命中済みに記録してボディを除去してから通知
        this.hitPokemonIds.add(id);
        this.M.Composite.remove(this.engine.world, pokemonBody);
        this.pokemonBodyById.delete(id);
        handler(id);
      }
    };

    this.M.Events.on(this.engine, "collisionStart", listener);
    return () => this.M.Events.off(this.engine, "collisionStart", listener);
  }

  resetBall(): void {
    this.M.Body.setPosition(this.ball, this.startPosition);
    this.M.Body.setVelocity(this.ball, { x: 0, y: 0 });
    this.M.Body.setAngle(this.ball, 0);
    this.M.Body.setAngularVelocity(this.ball, 0);
  }

  stopBall(): void {
    this.M.Body.setVelocity(this.ball, { x: 0, y: 0 });
    this.M.Body.setAngularVelocity(this.ball, 0);
  }
}

/** MatterJsBilliardAdapter のファクトリ関数 */
export function getMatterJsBilliardAdapter(): IBilliardPhysicsEngine {
  return new MatterJsBilliardAdapter();
}
