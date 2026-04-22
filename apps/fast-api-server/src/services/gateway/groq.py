from collections.abc import AsyncGenerator
from logging import getLogger
from typing import Literal

import httpx
from pydantic import BaseModel

from prompts.system_prompts import get_system_prompt
from schemas.chat import ChatRequest
from settings import get_settings

logger = getLogger(__name__)


class GroqMessage(BaseModel):
    """Groq API（OpenAI 互換）へ送る messages 要素"""

    role: Literal["system", "user", "assistant"]
    content: str


class GroqRequest(BaseModel):
    """Groq API（AI Gateway 経由）へのリクエストボディ"""

    model: str
    messages: list[GroqMessage]
    stream: bool


def _build_groq_request(request: ChatRequest, model: str) -> GroqRequest:
    """ChatRequest を Groq API（OpenAI 互換）形式のリクエストボディに変換する"""
    system_prompt = get_system_prompt(request.app_id)

    # OpenAI 互換形式: システムプロンプトを role="system" の先頭メッセージとして追加する
    messages: list[GroqMessage] = [GroqMessage(role="system", content=system_prompt)]

    # "model" ロールを OpenAI 互換の "assistant" に変換する
    messages.extend(
        GroqMessage(
            role="assistant" if msg.role == "model" else "user",
            content=msg.content,
        )
        for msg in request.history
    )
    messages.append(GroqMessage(role="user", content=request.message))

    return GroqRequest(model=model, messages=messages, stream=True)


async def stream(request: ChatRequest) -> AsyncGenerator[str]:
    """Groq（AI Gateway 経由）へリクエストし SSE チャンクを yield する"""
    settings = get_settings()
    payload = _build_groq_request(request, settings.groq_model)

    url = f"{settings.ai_gateway_base_url}/groq/openai/v1/chat/completions"
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
