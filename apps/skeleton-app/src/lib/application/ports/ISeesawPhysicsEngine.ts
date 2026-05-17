/**
 * ISeesawPhysicsEngine - シーソーゲーム専用物理エンジンの抽象インターフェース（Port）
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: シーソー専用インフラ層の契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { PhysicsBody2dState, PhysicsWorld2dConfig, Point2d } from "$lib/domain/models/2dPhysics";
import type { I2dPhysicsEngine } from "./I2dPhysicsEngine";

/**
 * シーソー上のポケモンボディ生成設定
 *
 * 左右配置と質量がシーソー固有のため、PhysicsBody2dConfig を継承せず独自定義する
 * spawnPoint はアダプターが左右配置から計算するため、ここでは指定しない。
 */
export interface SeesawPokeBodyConfig {
  readonly id: string;
  readonly imageUrl: string;
  /** シーソーの左右どちらに配置するか */
  readonly side: "left" | "right";
  /** kg 単位の重さ - リリース後の物理質量に使う */
  readonly mass: number;
}

/**
 * シーソーの現在状態（毎フレーム取得してレンダリングに使う）
 *
 * 形状が特殊なため、 PhysicsBody2dState を継承せず独自定義する
 */
export interface SeesawState {
  readonly plankAngle: number;
  readonly plankPosition: Point2d;
  readonly plankWidth: number;
  readonly plankThickness: number;
  /** 支点座標（固定） */
  readonly pivotPoint: Point2d;
  readonly pokeBodies: readonly PhysicsBody2dState[];
}

/**
 * シーソーゲーム専用物理エンジンの抽象インターフェース
 *
 * - `reset()`: ポケモンボディをすべて除去しシーソーを水平に戻す（基底から継承）
 * - `getState()`: 現在のシーソー・ポケモン状態を返す（基底から継承）
 */
export interface ISeesawPhysicsEngine extends I2dPhysicsEngine<PhysicsWorld2dConfig, SeesawState> {
  /** シーソーの腕にポケモンボディを追加する（初期状態は静止） */
  addPokeBody(config: SeesawPokeBodyConfig): Promise<void>;

  /** IDでポケモンボディを削除する */
  removePokeBody(id: string): void;

  /** ポケモンボディを動的化して質量による挙動を開始する */
  release(): void;
}
