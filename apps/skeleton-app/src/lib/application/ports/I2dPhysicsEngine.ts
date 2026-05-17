/**
 * I2dPhysicsEngine - 2D物理エンジン共通基底インターフェース（Port）
 *
 * @remarks
 * - すべての 2D物理エンジン Port がこのインターフェースを継承する。
 * - TConfig にはゲームごとのワールド設定型を渡す。
 * - TState にはゲームごとの状態スナップショット型を渡す。
 * - 物理エンジンの差し替え（matter.js → Rapier 等）をアプリ層・プレゼン層に影響なく行えるようにする。
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: インフラ層が実装すべき物理エンジンの共通契約定義
 * - ALLOWED: ドメイン層モデルへの依存
 * - FORBIDDEN: インフラ層への依存
 */

import type { PhysicsWorld2dConfig } from "$lib/domain/models/2dPhysics";

/**
 * 壁ボディに割り当てる衝突カテゴリ値
 *
 * ポケモン等のゲームボディは WALL_BODY_CATEGORY + 1 以降の値を使う。
 */
export const WALL_BODY_CATEGORY = 1;

/** 2D物理エンジン共通基底インターフェース */
export interface I2dPhysicsEngine<TConfig extends PhysicsWorld2dConfig, TState = unknown> {
  /** ワールドを初期化してエンジンを起動する */
  initialize(config: TConfig): Promise<void>;

  /** エンジンを初期状態にリセットする（initialize は再実行しない） */
  reset(): void;

  /** 現在の物理状態スナップショットを取得する（レンダリング用・毎フレーム呼ばれる） */
  getState(): TState;

  /** エンジンを停止してリソースを解放する */
  dispose(): void;
}
