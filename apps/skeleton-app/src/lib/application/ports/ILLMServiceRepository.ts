/**
 * ILLMServiceRepository - LLM サーバー用 Port 定義
 *
 * health / auth / chat の各エンドポイントを抽象化する。
 * health と auth は chat プロキシサーバーのサポート機能として同一コンテキストに属する。
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Port)
 * - ROLE: インフラ層が実装すべき抽象インターフェース（契約）の定義
 * - ALLOWED: アプリ層の DTO 定義への依存
 * - FORBIDDEN: インフラ層への依存
 */

// --- IHealthCheckRepository ---

/** APIサーバーのヘルス状態 */
export interface HealthStatus {
  message: string;
}

/** ヘルスチェック取得の抽象インターフェース */
export interface IHealthCheckRepository {
  /** APIサーバーのヘルス状態を取得 */
  checkHealth(fetchFunction: typeof fetch): Promise<HealthStatus>;
}

// --- IAuthCheckRepository ---

/** あいことば認証の抽象インターフェース */
export interface IAuthCheckRepository {
  /** あいことばをサーバーで検証し、認証成否を返す。通信失敗時は false */
  verifyAppSecret(fetchFunction: typeof fetch, secret: string): Promise<boolean>;
}

// --- ILLMChatRepository ---

/** チャット履歴の1件分のメッセージ */
export interface ChatMessage {
  readonly role: "user" | "model";
  readonly content: string;
}

/** サポートする LLM プロバイダー */
export type LLMProvider = "stub" | "gemini" | "claude" | "groq";

/** streamChat のパラメータ */
export interface StreamChatParams {
  readonly appId: string;
  readonly message: string;
  readonly imageUrl?: string;
  readonly history: ChatMessage[];
  readonly provider: LLMProvider;
}

/** チャットストリーミング取得の抽象インターフェース */
export interface ILLMChatRepository {
  /**
   * チャットメッセージを送信し、SSE ストリームをチャンク単位で受信する
   *
   * @param onChunk - テキストチャンクを受け取るコールバック
   */
  streamChat(fetchFn: typeof fetch, params: StreamChatParams, onChunk: (text: string) => void): Promise<void>;
}
