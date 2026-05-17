/**
 * ISpringScalePhysicsEngine - バネばかり型物理エンジンの抽象インターフェース（Port）
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: バネばかり専用インフラ層の契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { PhysicsBody2dState, PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";
import type { I2dPhysicsEngine } from "./I2dPhysicsEngine";

/**
 * バネばかり上のポケモンボディ生成設定
 *
 * 質量がバネばかり固有のため、PhysicsBody2dConfig を継承せず独自定義する。
 * spawnPoint はアダプターがプラットフォーム位置から計算するため、ここでは指定しない。
 */
export interface SpringScalePokeBodyConfig {
  readonly id: string;
  readonly imageUrl: string;
  /** kg 単位の重さ - エンジン内部で目標重量を基準に正規化される */
  readonly mass: number;
}

/**
 * バネばかりの現在状態（毎フレームレンダリングに使う）
 *
 * 形状が特殊なため、 PhysicsBody2dState を継承せず独自定義する。
 */
export interface SpringScaleState {
  readonly platformY: number;
  readonly platformWidth: number;
  readonly platformThickness: number;
  /** バネ上端の固定点 Y */
  readonly anchorY: number;
  /** 何も乗せていないときの台の平衡 Y */
  readonly emptyY: number;
  /** 目標重量ぴったりのときの台の平衡 Y（ゲージのマーカー位置） */
  readonly targetY: number;
  readonly pokeBodies: readonly PhysicsBody2dState[];
  /** バネが破断しているか */
  readonly isBroken: boolean;
}

/**
 * バネばかり型物理エンジン抽象インターフェース
 *
 * - `reset()`: 台の上のポケモンをすべて除去して初期状態に戻す（基底から継承）
 * - `getState()`: 現在のバネ台・ポケモン状態を返す（基底から継承）
 */
export interface ISpringScalePhysicsEngine extends I2dPhysicsEngine<PhysicsWorld2dConfig, SpringScaleState> {
  /**
   * 目標重量を設定してバネのキャリブレーションを行う
   *
   * addPokeBody より前に呼ぶ必要がある。
   */
  setTargetWeight(kg: number): void;

  /** 台の上にポケモンボディを追加する */
  addPokeBody(config: SpringScalePokeBodyConfig): Promise<void>;

  /** IDでポケモンボディを削除する */
  removePokeBody(id: string): void;

  /** バネを破断させる（重量超過時に呼ぶ）。破断後はバネ力が無効になり台が落下する */
  breakSpring(): void;
}
