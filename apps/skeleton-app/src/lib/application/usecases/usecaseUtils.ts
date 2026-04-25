/**
 * usecaseUtils - アプリ層 Facade の共通ユーティリティ
 *
 * @architecture レイヤー間依存ルール - アプリ層
 * - ROLE: try/catch/finally の定型処理を共通化する
 * - ALLOWED: アプリ層の型への依存のみ
 */

import type { FacadeResult } from "$lib/application/usecases/facadeTypes";

/**
 * 非同期タスクを実行し、成功/失敗を FacadeResult として返す
 *
 * - setIsLoading: isLoading を持つゲームのみ渡す（不要な場合は undefined）
 * - onSuccess: void を返す場合は { success: true } を自動返却。Promise<FacadeResult> を返す場合はその結果を使用
 * - onError: エラー時のストアリセットが不要な場合は undefined
 * - クリーンアップ（ゲーム固有のストアリセット）は呼び出し側で行うこと
 */
export async function withLoadingGuard<T>(
  task: () => Promise<T>,
  setIsLoading: ((v: boolean) => void) | undefined,
  onSuccess: (data: T) => void | Promise<FacadeResult>,
  onError: (() => void) | undefined,
  errorMessage: string = "ポケモンをよびだせなかった",
): Promise<FacadeResult> {
  setIsLoading?.(true);
  try {
    const chainResult = onSuccess(await task());
    return chainResult instanceof Promise ? await chainResult : { success: true };
  } catch {
    onError?.();
    return { success: false, error: errorMessage };
  } finally {
    setIsLoading?.(false);
  }
}
