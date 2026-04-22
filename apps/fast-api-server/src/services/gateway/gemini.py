from collections.abc import AsyncGenerator
from logging import getLogger

import httpx
from pydantic import BaseModel

from prompts.system_prompts import get_system_prompt
from schemas.chat import ChatRequest
from settings import get_settings

logger = getLogger(__name__)


class GeminiPart(BaseModel):
    """Gemini API の parts 要素"""

    text: str


class GeminiContent(BaseModel):
    """Gemini API へ送る contents 要素"""

    role: str
    parts: list[GeminiPart]


class GeminiSystemInstruction(BaseModel):
    """Gemini API のシステム命令"""

    parts: list[GeminiPart]


class GeminiRequest(BaseModel):
    """Gemini API（AI Gateway 経由）へのリクエストボディ"""

    system_instruction: GeminiSystemInstruction
    contents: list[GeminiContent]


def _build_gemini_request(request: ChatRequest) -> GeminiRequest:
    """ChatRequest を Gemini API 形式のリクエストボディに変換する"""
    system_prompt = get_system_prompt(request.app_id)

    # 会話履歴を Gemini の contents 形式に変換（role はそのまま使用可能）
    contents: list[GeminiContent] = [
        GeminiContent(role=msg.role, parts=[GeminiPart(text=msg.content)]) for msg in request.history
    ]
    contents.append(GeminiContent(role="user", parts=[GeminiPart(text=request.message)]))

    return GeminiRequest(
        system_instruction=GeminiSystemInstruction(parts=[GeminiPart(text=system_prompt)]),
        contents=contents,
    )


async def stream(request: ChatRequest) -> AsyncGenerator[str]:
    """Gemini（AI Gateway 経由）へリクエストし SSE チャンクを yield する"""
    settings = get_settings()
    payload = _build_gemini_request(request)

    # モデル名は URL パスに含める（Gemini API の仕様）
    model_path = f"{settings.gemini_model}:streamGenerateContent"
    url = f"{settings.ai_gateway_base_url}/google-ai-studio/v1beta/models/{model_path}?alt=sse"
    headers = {"cf-aig-authorization": f"Bearer {settings.ai_gateway_token}"}

    async with (
        httpx.AsyncClient() as client,
        client.stream(
            method="POST",
            url=url,
            headers=headers,
            json=payload.model_dump(),
            timeout=60.0,
        ) as response,
    ):
        try:
            response.raise_for_status()
        except httpx.HTTPStatusError as e:
            logger.exception("AI Gateway returned error: status=%d", e.response.status_code)
            raise

        async for line in response.aiter_lines():
            if line:
                yield f"{line}\n\n"
