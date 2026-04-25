/**
 * I2dPhysicsEngine - 2D物理エンジンの抽象インターフェース（Port）
 *
 * @remarks
 * 物理エンジンの差し替え（matter.js → Rapier 等）を
 * アプリ層・プレゼン層に影響なく行えるようにする。
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: インフラ層が実装すべき物理エンジンの契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type {
  PhysicsBody2dConfig,
  PhysicsBody2dState,
  PhysicsWorld2dConfig,
  Point2d,
} from "$lib/domain/models/2dPhysics";

/** 2D物理エンジンの抽象インターフェース */
export interface I2dPhysicsEngine {
  /** ワールドを初期化してエンジンを起動する */
  initialize(config: PhysicsWorld2dConfig): Promise<void>;

  /** エンジンを停止してリソースを解放する */
  dispose(): void;

  /** ボディをワールドに追加する */
  addBody(config: PhysicsBody2dConfig): void;

  /** IDでボディを削除する（存在しない場合はno-op） */
  removeBody(id: string): void;

  /** 現在のボディ状態一覧を取得する（レンダリング用・毎フレーム呼ばれる） */
  getBodies(): readonly PhysicsBody2dState[];

  /**
   * 衝突開始イベントのハンドラを登録する
   *
   * 壁ボディは呼び出し元に渡されない（アダプター内でフィルタ済み）。
   * @returns ハンドラ解除関数
   */
  onCollision(handler: (a: PhysicsBody2dState, b: PhysicsBody2dState) => void): () => void;

  /** 指定座標のボディをドラッグ開始する */
  startDrag(point: Point2d): void;

  /** ドラッグ先座標を更新する */
  moveDrag(point: Point2d): void;

  /** ドラッグを終了する */
  endDrag(): void;
}
