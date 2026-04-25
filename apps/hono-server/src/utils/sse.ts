/**
 * Response ボディを行単位で読み、非空行を SSE イベント文字列 ("data: ...\n\n") として yield する。
 * Python の httpx.AsyncClient.stream + aiter_lines() に相当するユーティリティ。
 */
export async function* readSSELines(response: Response): AsyncGenerator<string, void, unknown> {
  if (!response.body) return

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        if (line.trim()) {
          yield `${line}\n\n`
        }
      }
    }
    if (buffer.trim()) {
      yield `${buffer}\n\n`
    }
  } finally {
    reader.releaseLock()
  }
}
