/**
 * FastApiHealthRepository - Port/Adapter パターンの Adapter (具象実装)
 *
 * FastAPI サーバーのヘルスチェックAPIとの統合を提供する。
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: Port に従った具体的な技術実装（API通信）
 * - ALLOWED: アプリ層の Port への依存
 * - FORBIDDEN: ドメイン層への直接依存
 */

import { z } from "zod";
import type { HealthStatus, IHealthRepository } from "$lib/application/ports/IHealthRepository";
import { constructRequestInit, fetchApi } from "$lib/infrastructure/utils/request";

const pathHealth = "/api/heartbeat";

const HealthResponseSchema = z.object({
  message: z.string(),
});

/** ヘルスチェック取得の具象実装 (FastAPI) */
class FastApiHealthRepository implements IHealthRepository {
  /** APIサーバーのヘルス状態を取得 */
  async checkHealth(fetchFunction: typeof fetch): Promise<HealthStatus> {
    const requestConfig = { ...constructRequestInit(), method: "GET" };
    const response = await fetchApi(fetchFunction, pathHealth, requestConfig);
    return HealthResponseSchema.parse(await response.json());
  }
}

// Singleton インスタンス
let repositoryInstance: IHealthRepository | null = null;

/**
 * Singleton getter
 *
 * アプリ層から利用する統一アクセスポイント。
 */
export function getHealthRepository(): IHealthRepository {
  if (!repositoryInstance) {
    repositoryInstance = new FastApiHealthRepository();
  }
  return repositoryInstance;
}
