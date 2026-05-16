/**
 * ISpringScaleEngine - バネばかり型物理エンジンの抽象インターフェース（Port）
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: バネばかり専用インフラ層の契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { PhysicsBody2dState, PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";

/** バネばかりに乗せるポケモンボディの設定 */
export interface SpringScalePokeBodyConfig {
  readonly id: string;
  readonly imageUrl: string;
  /** ポケモンの実際の重さ（kg） - エンジン内部で目標重量を基準に正規化される */
  readonly weightKg: number;
}

/** バネばかりの現在状態（毎フレームレンダリングに使う） */
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

/** バネばかり型物理エンジン抽象インターフェース */
export interface ISpringScaleEngine {
  /** ワールドを初期化してエンジンとバネ台を構築する */
  initialize(config: PhysicsWorld2dConfig): Promise<void>;

  /** エンジンを停止してリソースを解放する */
  dispose(): void;

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

  /** 台の上のポケモンをすべて除去して初期状態に戻す */
  reset(): void;

  /** バネを破断させる（重量超過時に呼ぶ）。破断後はバネ力が無効になり台が落下する */
  breakSpring(): void;

  /** 現在のバネ台・ポケモン状態を返す（レンダリング用・毎フレーム呼ばれる） */
  getState(): SpringScaleState;
}
