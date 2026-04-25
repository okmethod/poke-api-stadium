/**
 * PhysicsWorld2d - 2D物理ワールドの設定モデル
 */

/** 物理ワールドの初期設定 */
export interface PhysicsWorld2dConfig {
  readonly width: number;
  readonly height: number;
  /** 重力係数（デフォルト 1.0） */
  readonly gravity?: number;
}
