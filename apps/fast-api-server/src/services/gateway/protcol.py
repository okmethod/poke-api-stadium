from collections.abc import AsyncGenerator, Callable
from typing import assert_never

from src.schemas.chat import ChatRequest, LLMProvider
from src.services.gateway import claude, gemini, groq, stub

# LLM ゲートウェイの共通インターフェース（各 gateway モジュールの stream 関数はこの型を満たす必要がある）
GatewayStream = Callable[[ChatRequest], AsyncGenerator[str]]


def _get_gateway(provider: LLMProvider) -> GatewayStream:
    """プロバイダーに対応するゲートウェイ関数を返す。

    LLMProvider に新しい値を追加した場合は、対応する case を必ず追加すること。
    assert_never により mypy が網羅性チェックを行う。
    """
    match provider:
        case "gemini":
            return gemini.stream
        case "claude":
            return claude.stream
        case "groq":
            return groq.stream
        case "stub":
            return stub.stream
        case _ as unreachable:
            assert_never(unreachable)


def stream_chat(request: ChatRequest) -> AsyncGenerator[str]:
    """プロバイダーに応じたストリーミングジェネレータを返す"""
    return _get_gateway(request.provider)(request)
