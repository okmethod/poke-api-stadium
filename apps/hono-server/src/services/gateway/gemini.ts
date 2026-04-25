import type { Env } from "@/types/env";
import type { ChatRequest } from "@/schemas/chat";
import { fetchAndStream } from "@/utils/sse";
import { parseDataUrl } from "@/utils/image";

type GeminiPart =
  | { text: string }
  | { inline_data: { mime_type: string; data: string } }
  | { file_data: { file_uri: string; mime_type: string } };

/** テキスト + 任意の画像から Gemini パーツ配列を構築する */
function buildParts(text: string, imageUrl?: string): GeminiPart[] {
  if (!imageUrl) return [{ text }];
  const parsed = parseDataUrl(imageUrl);
  // data URL → inline_data、通常URL → file_data（GCS URI 等）
  const imagePart: GeminiPart = parsed
    ? { inline_data: { mime_type: parsed.mimeType, data: parsed.data } }
    : { file_data: { file_uri: imageUrl, mime_type: "image/jpeg" } };
  return [imagePart, { text }];
}

/** Gemini (Google AI Studio) へのリクエストボディを構築する */
function buildGeminiBody(request: ChatRequest, systemPrompt: string) {
  const historyContents = request.history.map((msg) => ({
    role: msg.role,
    parts: buildParts(msg.content, msg.image_url),
  }));

  return {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [...historyContents, { role: "user", parts: buildParts(request.message, request.image_url) }],
  };
}

/** AI Gateway 経由で Gemini にリクエストし、SSE をストリームする */
export async function* streamGemini(
  request: ChatRequest,
  env: Env,
  systemPrompt: string,
): AsyncGenerator<string, void, unknown> {
  const url = `${env.AI_GATEWAY_BASE_URL}/google-ai-studio/v1beta/models/${env.GEMINI_MODEL}:streamGenerateContent?alt=sse`;

  yield* fetchAndStream(url, env.AI_GATEWAY_TOKEN, buildGeminiBody(request, systemPrompt));
}
