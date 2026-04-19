/**
 * facadeTypes - Facade 共通の戻り値型定義
 *
 * @architecture レイヤー間依存ルール - アプリ層 (Facade)
 * - ROLE: 各 Facade がプレゼン層に返す共通の結果型を一元管理する
 * - ALLOWED: 依存なし（プリミティブ型のみ）
 */

/** Facade のコマンド結果型（プレゼン層への公開用） */
export type FacadeResult = { readonly success: boolean; readonly error?: string };
