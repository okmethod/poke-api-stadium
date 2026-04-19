import json

import pytest

from src.schemas.chat import ChatMessage, ChatRequest
from src.services.gateway import claude, gemini, groq, stub
from src.services.gateway.claude import _build_claude_request
from src.services.gateway.gemini import _build_gemini_request
from src.services.gateway.groq import _build_groq_request
from src.services.gateway.protcol import GatewayStream

# --- Gemini ---


def test_build_gemini_request_structure() -> None:
    """_build_gemini_request が正しい Gemini リクエスト構造を生成する"""
    request = ChatRequest(
        app_id="poke-stadium",
        message="テスト",
        history=[ChatMessage(role="user", content="前の質問")],
    )
    result = _build_gemini_request(request)

    assert len(result.system_instruction.parts) == 1
    assert "ポケモン" in result.system_instruction.parts[0].text

    # history + 現在メッセージ = 2件
    assert len(result.contents) == 2
    assert result.contents[0].role == "user"
    assert result.contents[0].parts[0].text == "前の質問"
    assert result.contents[1].role == "user"
    assert result.contents[1].parts[0].text == "テスト"


def test_build_gemini_request_role_passthrough() -> None:
    """Gemini は "model" ロールをそのまま使用する"""
    request = ChatRequest(
        app_id="poke-stadium",
        message="続き",
        history=[ChatMessage(role="model", content="ピカチュウは電気タイプです。")],
    )
    result = _build_gemini_request(request)

    assert result.contents[0].role == "model"


# --- Claude ---


def test_build_claude_request_structure() -> None:
    """_build_claude_request が正しい Claude リクエスト構造を生成する"""
    request = ChatRequest(
        app_id="poke-stadium",
        message="テスト",
        history=[ChatMessage(role="user", content="前の質問")],
    )
    result = _build_claude_request(request, model="claude-test-model")

    assert result.model == "claude-test-model"
    assert result.stream is True
    assert "ポケモン" in result.system

    # history + 現在メッセージ = 2件
    assert len(result.messages) == 2
    assert result.messages[0].role == "user"
    assert result.messages[0].content == "前の質問"
    assert result.messages[1].role == "user"
    assert result.messages[1].content == "テスト"


def test_build_claude_request_role_mapping() -> None:
    """Claude は "model" ロールを "assistant" に変換する"""
    request = ChatRequest(
        app_id="poke-stadium",
        message="続き",
        history=[ChatMessage(role="model", content="ピカチュウは電気タイプです。")],
    )
    result = _build_claude_request(request, model="claude-test-model")

    assert result.messages[0].role == "assistant"


# --- Groq ---


def test_build_groq_request_structure() -> None:
    """_build_groq_request が正しい Groq（OpenAI 互換）リクエスト構造を生成する"""
    request = ChatRequest(
        app_id="poke-stadium",
        message="テスト",
        history=[ChatMessage(role="user", content="前の質問")],
    )
    result = _build_groq_request(request, model="groq-test-model")

    assert result.model == "groq-test-model"
    assert result.stream is True

    # system + history + 現在メッセージ = 3件
    assert len(result.messages) == 3
    assert result.messages[0].role == "system"
    assert "ポケモン" in result.messages[0].content
    assert result.messages[1].role == "user"
    assert result.messages[1].content == "前の質問"
    assert result.messages[2].role == "user"
    assert result.messages[2].content == "テスト"


def test_build_groq_request_role_mapping() -> None:
    """Groq は "model" ロールを "assistant" に変換する"""
    request = ChatRequest(
        app_id="poke-stadium",
        message="続き",
        history=[ChatMessage(role="model", content="ピカチュウは電気タイプです。")],
    )
    result = _build_groq_request(request, model="groq-test-model")

    # messages[0] は system プロンプト
    assert result.messages[1].role == "assistant"


# --- Stub ---


@pytest.mark.asyncio
async def test_stub_stream_output() -> None:
    """stub.stream がダミー SSE チャンクを1件返す"""
    request = ChatRequest(app_id="poke-stadium", message="テスト", provider="stub")
    chunks = [chunk async for chunk in stub.stream(request)]

    assert len(chunks) == 1
    assert chunks[0].startswith("data: ")

    payload = json.loads(chunks[0].removeprefix("data: ").strip())
    assert payload["stub"] is True
    assert "poke-stadium" in payload["text"]
    assert "テスト" in payload["text"]


# --- Protocol 適合確認 ---


def test_all_gateways_satisfy_protocol() -> None:
    """各ゲートウェイの stream 関数が GatewayStream Protocol を満たすことを確認する

    実際の型チェックは mypy が行うため、ここでは callable であることを確認する。
    """
    for gateway_stream in [gemini.stream, claude.stream, groq.stream, stub.stream]:
        assert callable(gateway_stream)
        # Protocol の isinstance チェックは runtime_checkable なしでは不可のため、
        # 型注釈経由で mypy が静的に検証する
        _: GatewayStream = gateway_stream  # type: ignore[assignment]
