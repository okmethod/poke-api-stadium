/**
 * IHealthRepository - Port/Adapter パターンの Port (抽象/契約定義)
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: インフラ層が実装すべき抽象インターフェース（契約）の定義
 * - ALLOWED: アプリ層の DTO 定義への依存
 * - FORBIDDEN: インフラ層への依存
 */

/** APIサーバーのヘルス状態 */
export interface HealthStatus {
  message: string;
}

/** ヘルスチェック取得の抽象インターフェース */
export interface IHealthRepository {
  /** APIサーバーのヘルス状態を取得 */
  checkHealth(fetchFunction: typeof fetch): Promise<HealthStatus>;
}
