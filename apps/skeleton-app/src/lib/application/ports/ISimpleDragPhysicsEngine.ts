/**
 * ISimpleDragPhysicsEngine - ドラッグ操作付き汎用 2D物理エンジンの抽象インターフェース（Port）
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
import type { I2dPhysicsEngine } from "./I2dPhysicsEngine";

/**
 * ドラッグ操作付き汎用 2D物理エンジンの抽象インターフェース
 *
 * - `reset()`: 管理中のボディをすべて除去して初期状態に戻す（基底から継承）
 * - `getState()`: 現在のボディ状態一覧を返す（基底から継承）
 */
export interface ISimpleDragPhysicsEngine extends I2dPhysicsEngine<
  PhysicsWorld2dConfig,
  readonly PhysicsBody2dState[]
> {
  /** ボディをワールドに追加する（画像解析を伴うため非同期） */
  addBody(config: PhysicsBody2dConfig): Promise<void>;

  /** IDでボディを削除する（存在しない場合はno-op） */
  removeBody(id: string): void;

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
