import type { Env } from '../../types/env'
import type { ChatRequest } from '../../schemas/chat'
import { readSSELines } from '../../utils/sse'

/** Groq (OpenAI 互換) へのリクエストボディを構築する */
function buildGroqBody(request: ChatRequest, env: Env, systemPrompt: string) {
  // Groq の role は "system" | "user" | "assistant"。history の "model" を "assistant" に変換する
  const historyMessages = request.history.map((msg) => ({
    role: msg.role === 'model' ? ('assistant' as const) : ('user' as const),
    content: msg.content,
  }))

  return {
    model: env.GROQ_MODEL,
    stream: true,
    messages: [
      // systemPrompt は先頭に role: "system" として追加
      { role: 'system' as const, content: systemPrompt },
      ...historyMessages,
      { role: 'user' as const, content: request.message },
    ],
  }
}

/** AI Gateway 経由で Groq にリクエストし、SSE をストリームする */
export async function* streamGroq(
  request: ChatRequest,
  env: Env,
  systemPrompt: string,
): AsyncGenerator<string, void, unknown> {
  const url = `${env.AI_GATEWAY_BASE_URL}/groq/openai/v1/chat/completions`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cf-aig-authorization': `Bearer ${env.AI_GATEWAY_TOKEN}`,
    },
    body: JSON.stringify(buildGroqBody(request, env, systemPrompt)),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`AI Gateway error: HTTP ${response.status} - ${body}`)
  }

  yield* readSSELines(response)
}
