/**
 * IPinballPhysicsEngine - ピンボールゲーム専用物理エンジンの抽象インターフェース（Port）
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: ピンボール専用インフラ層の契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { Point2d, PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import type { I2dPhysicsEngine } from "./I2dPhysicsEngine";

/** ピンボールワールドの初期化設定 */
export interface PinballWorldConfig extends PhysicsWorld2dConfig {
  readonly ballRadius: number;
  readonly ballStartPosition: Point2d;
}

/** バンパーの初期化設定（setupBumpers に渡す） */
export interface PinballBumperConfig {
  readonly id: string;
  readonly position: Point2d;
  readonly radius: number;
  readonly imageUrl: string;
}

/** レンダラーが毎フレーム受け取るバンパーの描画状態 */
export interface PinballBumperState {
  readonly id: string;
  readonly position: Point2d;
  /** スピン演出のための回転角（ラジアン） */
  readonly angle: number;
  readonly radius: number;
  readonly imageUrl: string;
}

/** レンダラーが毎フレーム受け取るエンジンの状態スナップショット */
export interface PinballEngineState {
  readonly ballPosition: Point2d;
  readonly ballAngle: number;
  readonly bumpers: readonly PinballBumperState[];
  readonly leftFlipperAngle: number;
  readonly rightFlipperAngle: number;
  /** ボールがドレインを通過して画面外に出たか */
  readonly isBallLost: boolean;
}

/**
 * ピンボールゲーム専用物理エンジンの抽象インターフェース
 *
 * - `initialize(config)`: ワールド・壁・フリッパー・ボールを初期化する
 * - `reset()`: ボールを開始位置に戻す（基底から継承）
 * - `getState()`: 現在の描画状態を返す（基底から継承）
 * - `dispose()`: エンジンを停止してリソースを解放する（基底から継承）
 */
export interface IPinballPhysicsEngine extends I2dPhysicsEngine<PinballWorldConfig, PinballEngineState> {
  /** バンパーをセットアップする（ポケモンデータ取得後に呼ぶ） */
  setupBumpers(bumpers: PinballBumperConfig[]): void;

  /** 左フリッパーのアクティブ状態を設定する */
  setFlipperLeft(active: boolean): void;

  /** 右フリッパーのアクティブ状態を設定する */
  setFlipperRight(active: boolean): void;

  /** ボールに上向きの初速を与えて発射する */
  launchBall(): void;

  /**
   * バンパー命中イベントハンドラを登録する
   *
   * 命中したバンパーの ID を引数に取る。同一バンパーへの連続検出はクールダウンで抑制される。
   * @returns ハンドラ解除関数
   */
  onBumperHit(handler: (id: string) => void): () => void;
}
