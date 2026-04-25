import type { Env } from "@/types/env";
import type { ChatRequest } from "@/schemas/chat";
import { readSSELines } from "@/utils/sse";

/** Gemini (Google AI Studio) へのリクエストボディを構築する */
function buildGeminiBody(request: ChatRequest, systemPrompt: string) {
  const historyContents = request.history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  return {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [...historyContents, { role: "user", parts: [{ text: request.message }] }],
  };
}

/** AI Gateway 経由で Gemini にリクエストし、SSE をストリームする */
export async function* streamGemini(
  request: ChatRequest,
  env: Env,
  systemPrompt: string,
): AsyncGenerator<string, void, unknown> {
  const url = `${env.AI_GATEWAY_BASE_URL}/google-ai-studio/v1beta/models/${env.GEMINI_MODEL}:streamGenerateContent?alt=sse`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "cf-aig-authorization": `Bearer ${env.AI_GATEWAY_TOKEN}`,
    },
    body: JSON.stringify(buildGeminiBody(request, systemPrompt)),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`AI Gateway error: HTTP ${response.status} - ${body}`);
  }

  yield* readSSELines(response);
}
