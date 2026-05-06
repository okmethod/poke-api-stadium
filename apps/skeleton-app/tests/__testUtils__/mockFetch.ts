/**
 * fetchモック生成ユーティリティ
 *
 * テスト間で統一した fetch モックを使えるようにするヘルパー。
 */
import { vi } from "vitest";

/** ok: true なレスポンスを返す fetch モック */
export function createOkMockFetch(data: unknown) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
  });
}

/** ネットワークエラーを起こす fetch モック */
export function createNetworkErrorMockFetch() {
  return vi.fn().mockRejectedValue(new Error("Network Error"));
}

/** ok: false（404相当）のレスポンスを返す fetch モック */
export function createNotFoundMockFetch() {
  return vi.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: "Not Found" }),
  });
}
