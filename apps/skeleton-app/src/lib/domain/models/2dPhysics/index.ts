/**
 * 2D物理ドメインモデルの再エクスポート
 *
 * @architecture レイヤー間依存ルール - ドメイン層
 * - ROLE: 外部に依存しない静的データモデル（Pure TypeScript）
 * - ALLOWED: 同ドメイン層モデルへの依存
 * - FORBIDDEN: Svelte / DOM / 外部ライブラリへの依存
 */

export type { PhysicsWorld2dConfig } from "./physicsWorld2d";
export type { Point2d, PhysicsBody2dConfig, PhysicsBody2dState } from "./physicsBody2d";
