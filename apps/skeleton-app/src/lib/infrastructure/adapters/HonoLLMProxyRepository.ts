/**
 * HonoLLMProxyRepository - Port/Adapter パターンの Adapter (具象実装)
 *
 * LLM プロキシの全エンドポイント（auth / health / chat）との統合を提供する。
 *
 * @architecture レイヤー間依存ルール - インフラ層 (Adapter)
 * - ROLE: Port に従った具体的な技術実装（API通信・SSEパース）
 * - ALLOWED: アプリ層の Port・Store への依存
 * - FORBIDDEN: ドメイン層への直接依存
 */

import { z } from "zod";
import type {
  HealthStatus,
  IHealthCheckRepository,
  IAuthCheckRepository,
  StreamChatParams,
  ILLMChatRepository,
} from "$lib/application/ports/ILLMServiceRepository";
import { getAppSecret } from "$lib/application/stores/appSecretStore";
import { constructRequestInit, fetchApi } from "$lib/infrastructure/utils/request";

// ローカル開発時は Vite プロキシが "/api/*" を転送するため空文字のまま
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const pathHealth = `${BASE_URL}/api/health`;
const pathAuth = `${BASE_URL}/api/auth`;
const pathChat = `${BASE_URL}/api/chat`;

const HealthResponseSchema = z.object({
  message: z.string(),
});

const AuthResponseSchema = z.object({
  authorized: z.boolean(),
});

// プロバイダー別 SSE テキスト抽出用スキーマ
const StubChunkSchema = z.object({ text: z.string() });
const ClaudeDeltaSchema = z.object({
  type: z.string(),
  delta: z.object({ type: z.string(), text: z.string() }).optional(),
});
const GeminiChunkSchema = z.object({
  candidates: z.array(z.object({ content: z.object({ parts: z.array(z.object({ text: z.string() })) }) })).min(1),
});
const GroqChunkSchema = z.object({
  choices: z.array(z.object({ delta: z.object({ content: z.string().nullable() }) })).min(1),
});

/** SSE の `data:` 行から各プロバイダーのテキストチャンクを抽出する */
function extractText(provider: StreamChatParams["provider"], dataLine: string): string | null {
  const jsonStr = dataLine.replace(/^data:\s*/, "").trim();
  if (!jsonStr || jsonStr === "[DONE]") return null;

  try {
    const json: unknown = JSON.parse(jsonStr);
    switch (provider) {
      case "stub": {
        const parsed = StubChunkSchema.safeParse(json);
        return parsed.success ? parsed.data.text : null;
      }
      case "claude": {
        const parsed = ClaudeDeltaSchema.safeParse(json);
        if (!parsed.success) return null;
        // content_block_delta の text デルタのみを対象にする
        if (parsed.data.type === "content_block_delta" && parsed.data.delta?.type === "text_delta") {
          return parsed.data.delta.text;
        }
        return null;
      }
      case "gemini": {
        const parsed = GeminiChunkSchema.safeParse(json);
        return parsed.success ? (parsed.data.candidates[0]?.content.parts[0]?.text ?? null) : null;
      }
      case "groq": {
        const parsed = GroqChunkSchema.safeParse(json);
        return parsed.success ? (parsed.data.choices[0]?.delta.content ?? null) : null;
      }
    }
  } catch {
    return null;
  }
}

// --- Adapter 実装 ---

/** ヘルスチェックエンドポイントの具象実装 */
class HealthCheckRepository implements IHealthCheckRepository {
  /** APIサーバーのヘルス状態を取得 */
  async checkHealth(fetchFunction: typeof fetch): Promise<HealthStatus> {
    const requestConfig = { ...constructRequestInit(), method: "GET" };
    const response = await fetchApi(fetchFunction, pathHealth, requestConfig);
    return HealthResponseSchema.parse(await response.json());
  }
}

/** ヘルスチェックエンドポイントの具象実装 */
class AuthCheckRepository implements IAuthCheckRepository {
  /** あいことばをサーバーで検証する。通信失敗時は false を返す */
  async verifyAppSecret(fetchFunction: typeof fetch, secret: string): Promise<boolean> {
    const requestConfig = { ...constructRequestInit(), method: "GET" };
    try {
      const url = `${pathAuth}?secret=${encodeURIComponent(secret)}`;
      const response = await fetchApi(fetchFunction, url, requestConfig);
      const data = AuthResponseSchema.parse(await response.json());
      return data.authorized;
    } catch {
      return false;
    }
  }
}

/** チャットエンドポイントの具象実装 */
class LLMChatRepository implements ILLMChatRepository {
  /** チャットメッセージを送信し SSE チャンクを受信する */
  async streamChat(fetchFn: typeof fetch, params: StreamChatParams, onChunk: (text: string) => void): Promise<void> {
    const requestConfig: RequestInit = {
      ...constructRequestInit(),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-App-Secret": getAppSecret(),
      },
      body: JSON.stringify({
        app_id: params.appId,
        system_prompt: params.systemPrompt,
        message: params.message,
        image_url: params.imageUrl,
        history: params.history,
        provider: params.provider,
      }),
    };

    const response = await fetchApi(fetchFn, pathChat, requestConfig);

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Response body is not readable");

    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // 最後の不完全な行はバッファに残す
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const text = extractText(params.provider, line);
          if (text) onChunk(text);
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}

// --- Singleton ---

let healthRepositoryInstance: IHealthCheckRepository | null = null;
let authRepositoryInstance: IAuthCheckRepository | null = null;
let chatRepositoryInstance: ILLMChatRepository | null = null;

/**
 * IHealthRepository の Singleton getter
 *
 * アプリ層から利用する統一アクセスポイント。
 */
export function getHealthCheckRepository(): IHealthCheckRepository {
  if (!healthRepositoryInstance) {
    healthRepositoryInstance = new HealthCheckRepository();
  }
  return healthRepositoryInstance;
}

/**
 * IAuthRepository の Singleton getter
 *
 * アプリ層から利用する統一アクセスポイント。
 */
export function getAuthCheckRepository(): IAuthCheckRepository {
  if (!authRepositoryInstance) {
    authRepositoryInstance = new AuthCheckRepository();
  }
  return authRepositoryInstance;
}

/**
 * IChatRepository の Singleton getter
 *
 * アプリ層から利用する統一アクセスポイント。
 */
export function getLLMChatRepository(): ILLMChatRepository {
  if (!chatRepositoryInstance) {
    chatRepositoryInstance = new LLMChatRepository();
  }
  return chatRepositoryInstance;
}
