/**
 * IBilliardPhysicsEngine - ビリヤードゲーム専用物理エンジンの抽象インターフェース（Port）
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: ビリヤード専用インフラ層の契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type {
  Point2d,
  PhysicsBody2dConfig,
  RectBody2dConfig,
  PhysicsWorld2dConfig,
} from "$lib/domain/models/2dPhysics";
import type { I2dPhysicsEngine } from "./I2dPhysicsEngine";

/** ビリヤードワールドの初期化設定 */
export interface BilliardWorldConfig extends PhysicsWorld2dConfig {
  readonly ballRadius: number;
  readonly ballStartPosition: Point2d;
}

/**
 * ゲームロジックが毎フレーム取得するボールの状態
 *
 * PhysicsBody2dState はレンダラー向けのため、継承しない。
 */
export interface BilliardBallState {
  readonly position: Point2d;
  /** ラジアン単位の回転角（CSS transform に直接使用可） */
  readonly angle: number;
  /** 現在の速さ（px/フレーム相当） */
  readonly speed: number;
}

/**
 * ビリヤードゲーム専用物理エンジンの抽象インターフェース
 *
 * - `reset()`: ボールを開始位置に戻し速度・角度をリセットする（基底から継承）
 * - `getState()`: 現在のボール状態を返す（基底から継承）
 */
export interface IBilliardPhysicsEngine extends I2dPhysicsEngine<BilliardWorldConfig, BilliardBallState> {
  /** コース上の障害物とポケモンターゲットをセットアップする（ラウンド開始時に呼ぶ） */
  setupCourse(obstacles: RectBody2dConfig[], pokemons: PhysicsBody2dConfig[]): void;

  /** ボールに初速を与えて発射する */
  launch(velocity: Point2d): void;

  /**
   * ポケモンへの命中イベントハンドラを登録する
   *
   * 命中したポケモンの ID を引数に取る。同一ポケモンへの二重呼び出しはしない。
   * @returns ハンドラ解除関数
   */
  onPokemonHit(handler: (id: string) => void): () => void;

  /** ボールの速度をゼロにして静止させる（位置はそのまま） */
  stopBall(): void;
}
