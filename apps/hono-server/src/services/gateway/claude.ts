import type { Env } from '../../types/env'
import type { ChatRequest } from '../../schemas/chat'
import { readSSELines } from '../../utils/sse'

/** Claude (Anthropic) へのリクエストボディを構築する */
function buildClaudeBody(request: ChatRequest, env: Env, systemPrompt: string) {
  // Claude の role は "user" | "assistant"。history の "model" を "assistant" に変換する
  const historyMessages = request.history.map((msg) => ({
    role: msg.role === 'model' ? ('assistant' as const) : ('user' as const),
    content: msg.content,
  }))

  return {
    model: env.CLAUDE_MODEL,
    max_tokens: 4096,
    stream: true,
    system: systemPrompt,
    messages: [...historyMessages, { role: 'user' as const, content: request.message }],
  }
}

/** AI Gateway 経由で Claude にリクエストし、SSE をストリームする */
export async function* streamClaude(
  request: ChatRequest,
  env: Env,
  systemPrompt: string,
): AsyncGenerator<string, void, unknown> {
  const url = `${env.AI_GATEWAY_BASE_URL}/anthropic/v1/messages`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'cf-aig-authorization': `Bearer ${env.AI_GATEWAY_TOKEN}`,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(buildClaudeBody(request, env, systemPrompt)),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`AI Gateway error: HTTP ${response.status} - ${body}`)
  }

  yield* readSSELines(response)
}
