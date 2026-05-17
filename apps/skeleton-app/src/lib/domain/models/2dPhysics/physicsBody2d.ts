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

/** 物理ボディ生成の共通設定（衝突形状はサブタイプで指定） */
interface PhysicsBody2dConfigBase {
  readonly id: string;
  readonly category: number;
  readonly spawnPoint: Point2d;
}

/** 円形衝突ボディの生成設定 */
export interface CircleBody2dConfig extends PhysicsBody2dConfigBase {
  readonly collisionShape: "circle";
  readonly radius: number;
  /** 描画用画像URL（省略時は塗りつぶし円） */
  readonly imageUrl?: string;
}

/** 矩形衝突ボディの生成設定 */
export interface RectBody2dConfig extends PhysicsBody2dConfigBase {
  readonly collisionShape: "rect";
  readonly width: number;
  readonly height: number;
  /** 描画用画像URL（省略時は塗りつぶし矩形） */
  readonly imageUrl?: string;
}

/** 画像輪郭から抽出したポリゴン衝突ボディの生成設定 */
export interface PolygonBody2dConfig extends PhysicsBody2dConfigBase {
  readonly collisionShape: "polygon";
  /** ポリゴン抽出元画像URL（必須） */
  readonly imageUrl: string;
  /** 描画サイズ兼フォールバック円の半径 */
  readonly radius: number;
}

/** 物理ボディの生成設定（アダプターへの入力） */
export type PhysicsBody2dConfig = CircleBody2dConfig | RectBody2dConfig | PolygonBody2dConfig;

/**
 * 物理ボディの実行時状態（レンダラーへの出力・毎フレーム更新）
 *
 * 衝突判定関連の情報はアダプター内部に留め、レンダラーが必要な描画サイズのみを公開する。
 */
export interface PhysicsBody2dState {
  readonly id: string;
  readonly category: number;
  readonly position: Point2d;
  readonly angle: number;
  /** 描画幅（px）: circle/polygon なら radius×2、rect なら width */
  readonly renderWidth: number;
  /** 描画高さ（px）: circle/polygon なら radius×2、rect なら height */
  readonly renderHeight: number;
  /** 描画用画像URL（省略時は塗りつぶし） */
  readonly imageUrl?: string;
}
