/**
 * IBilliardPhysicsEngine - ビリヤードゲーム専用物理エンジンの抽象インターフェース（Port）
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: ビリヤード専用インフラ層の契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { Point2d } from "$lib/domain/models/2dPhysics";

/** ゲームフェーズ */
export type BilliardPhase = "waiting" | "aiming" | "flying" | "caught" | "missed" | "result";

/** BilliardCanvas が毎フレーム描画するポケモン1体の状態 */
export interface BilliardCanvasPokemon {
  readonly imageUrl: string;
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly caught: boolean;
}

/** BilliardCanvas が毎フレーム描画する障害物の状態 */
export interface BilliardCanvasObstacle {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/** BilliardCanvas が毎フレーム受け取るキャンバス描画用の全状態 */
export interface BilliardCanvasState {
  readonly phase: BilliardPhase;
  readonly ballPosition: Point2d;
  readonly ballAngle: number;
  readonly ballSpriteUrl: string;
  readonly ballRadius: number;
  readonly pokemons: readonly BilliardCanvasPokemon[];
  readonly obstacles: readonly BilliardCanvasObstacle[];
  readonly aimOrigin: Point2d | null;
  readonly aimTarget: Point2d | null;
}

/**
 * BilliardCanvas が依存するゲームエンジンインターフェース
 *
 * CaptureBilliardFacade が実装する。
 */
export interface IBilliardGameEngine {
  /** 物理状態を1フレーム分進める（RAF ループから毎フレーム呼ぶ） */
  tick(): void;
  /** キャンバス描画に必要な全状態を返す（毎フレーム呼ばれる） */
  getState(): BilliardCanvasState;
  /** エイムを開始する */
  startAim(point: Point2d): void;
  /** エイム方向を更新する */
  updateAim(point: Point2d): void;
  /** ボールを発射する */
  launch(point: Point2d): void;
}

/** ビリヤードワールドの初期化設定 */
export interface BilliardWorldConfig {
  readonly width: number;
  readonly height: number;
  readonly ballRadius: number;
  readonly ballStartPosition: Point2d;
}

/** コース上の障害物設定 */
export interface BilliardCourseObstacle {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/** コース上のポケモンターゲット設定 */
export interface BilliardCoursePokemon {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly radius: number;
}

/** 毎フレーム取得するボールの状態 */
export interface BilliardBallState {
  readonly position: Point2d;
  /** ラジアン単位の回転角（CSS transform に直接使用可） */
  readonly angle: number;
  /** 現在の速さ（px/フレーム相当） */
  readonly speed: number;
}

/** ビリヤードゲーム専用物理エンジンの抽象インターフェース */
export interface IBilliardPhysicsEngine {
  /** ワールドを初期化してエンジン・壁・ボールを構築する */
  initialize(config: BilliardWorldConfig): Promise<void>;

  /** エンジンを停止してリソースを解放する */
  dispose(): void;

  /** コース上の障害物とポケモンターゲットをセットアップする（ラウンド開始時に呼ぶ） */
  setupCourse(obstacles: BilliardCourseObstacle[], pokemons: BilliardCoursePokemon[]): void;

  /** ボールに初速を与えて発射する */
  launch(velocity: Point2d): void;

  /** 現在のボール状態を取得する（レンダリング用・毎フレーム呼ばれる） */
  getBallState(): BilliardBallState;

  /**
   * ポケモンへの命中イベントハンドラを登録する
   *
   * 命中したポケモンの ID を引数に取る。同一ポケモンへの二重呼び出しはしない。
   * @returns ハンドラ解除関数
   */
  onPokemonHit(handler: (id: string) => void): () => void;

  /** ボールを開始位置に戻し、速度・角度をリセットする */
  resetBall(): void;

  /** ボールの速度をゼロにして静止させる（位置はそのまま） */
  stopBall(): void;
}
