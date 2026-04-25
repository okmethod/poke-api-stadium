/**
 * PhysicsBody2d - 2D物理ボディのドメインモデル
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

/** 2D座標 */
export interface Point2d {
  readonly x: number;
  readonly y: number;
}

/** 物理ボディの生成設定 */
export interface PhysicsBody2dConfig {
  readonly id: string;
  /** 描画に使うスプライトURL */
  readonly imageUrl: string;
  /** マッチング判定用カテゴリ（同カテゴリ同士が衝突でマッチ） */
  readonly category: number;
  readonly spawnPoint: Point2d;
  readonly radius: number;
}

/** 物理ボディの実行時状態（毎フレーム更新） */
export interface PhysicsBody2dState {
  readonly id: string;
  readonly imageUrl: string;
  readonly category: number;
  readonly position: Point2d;
  readonly angle: number;
  readonly radius: number;
}
