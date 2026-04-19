from collections.abc import AsyncGenerator
from logging import getLogger
from typing import Literal

import httpx
from pydantic import BaseModel

from src.prompts.system_prompts import get_system_prompt
from src.schemas.chat import ChatRequest
from src.settings import get_settings

logger = getLogger(__name__)


class ClaudeMessage(BaseModel):
    """Claude API へ送る messages 要素"""

    role: Literal["user", "assistant"]
    content: str


class ClaudeRequest(BaseModel):
    """Claude API（AI Gateway 経由）へのリクエストボディ"""

    model: str
    max_tokens: int
    stream: bool
    system: str
    messages: list[ClaudeMessage]


def _build_claude_request(request: ChatRequest, model: str) -> ClaudeRequest:
    """ChatRequest を Claude API 形式のリクエストボディに変換する"""
    system_prompt = get_system_prompt(request.app_id)

    # "model" ロールを Claude の "assistant" に変換する
    messages: list[ClaudeMessage] = [
        ClaudeMessage(
            role="assistant" if msg.role == "model" else "user",
            content=msg.content,
        )
        for msg in request.history
    ]
    messages.append(ClaudeMessage(role="user", content=request.message))

    return ClaudeRequest(
        model=model,
        max_tokens=4096,
        stream=True,
        system=system_prompt,
        messages=messages,
    )


async def stream(request: ChatRequest) -> AsyncGenerator[str]:
    """Claude（AI Gateway 経由）へリクエストし SSE チャンクを yield する"""
    settings = get_settings()
    payload = _build_claude_request(request, settings.claude_model)

    url = f"{settings.ai_gateway_base_url}/anthropic/v1/messages"
    headers = {
        "cf-aig-authorization": f"Bearer {settings.ai_gateway_token}",
        # Claude API が要求するバージョンヘッダー（AI Gateway 経由でも必要）
        "anthropic-version": "2023-06-01",
    }

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
