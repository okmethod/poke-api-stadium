/**
 * ISeesawPhysicsEngine - シーソーゲーム専用物理エンジンの抽象インターフェース（Port）
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: シーソー専用インフラ層の契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { PhysicsBody2dState, PhysicsWorld2dConfig, Point2d } from "$lib/domain/models/2dPhysics";

/** シーソー上のポケモンボディ生成設定 */
export interface SeesawPokeBodyConfig {
  readonly id: string;
  readonly imageUrl: string;
  /** シーソーの左右どちらに配置するか */
  readonly side: "left" | "right";
  /** kg 単位の重さ（リリース後の物理質量に使う） */
  readonly mass: number;
}

/** シーソーの現在状態（毎フレーム取得してレンダリングに使う） */
export interface SeesawState {
  readonly plankAngle: number;
  readonly plankPosition: Point2d;
  readonly plankWidth: number;
  readonly plankThickness: number;
  /** 支点座標（固定） */
  readonly pivotPoint: Point2d;
  readonly pokeBodies: readonly PhysicsBody2dState[];
}

/** シーソーゲーム専用物理エンジンの抽象インターフェース */
export interface ISeesawPhysicsEngine {
  /** ワールドを初期化してエンジンとシーソーを構築する */
  initialize(config: PhysicsWorld2dConfig): Promise<void>;

  /** エンジンを停止してリソースを解放する */
  dispose(): void;

  /** シーソーの腕にポケモンボディを追加する（初期状態は静止） */
  addPokeBody(config: SeesawPokeBodyConfig): Promise<void>;

  /** IDでポケモンボディを削除する */
  removePokeBody(id: string): void;

  /** ポケモンボディを動的化して質量による挙動を開始する */
  release(): void;

  /** ポケモンボディをすべて除去し、シーソーを水平に戻す */
  resetSeesaw(): void;

  /** 現在のシーソー・ポケモン状態を返す（レンダリング用・毎フレーム呼ばれる） */
  getState(): SeesawState;
}
