from collections.abc import AsyncGenerator
from unittest.mock import patch

import pytest
from fastapi.testclient import TestClient


async def _mock_stream() -> AsyncGenerator[str]:
    """テスト用のモック SSE ストリーム"""
    yield 'data: {"candidates": [{"content": {"parts": [{"text": "ピカチュウ"}]}}]}\n\n'


@pytest.fixture
def valid_headers() -> dict[str, str]:
    return {"X-App-Secret": "test-secret"}


@pytest.fixture
def valid_body() -> dict[str, object]:
    return {"app_id": "poke-stadium", "message": "ピカチュウについて教えて"}


def test_chat_missing_auth_header(client: TestClient, valid_body: dict[str, object]) -> None:
    """X-App-Secret ヘッダーなし -> 403"""
    response = client.post("/api/chat", json=valid_body)
    assert response.status_code == 403


def test_chat_invalid_auth_header(client: TestClient, valid_body: dict[str, object]) -> None:
    """不正な X-App-Secret -> 403"""
    response = client.post("/api/chat", json=valid_body, headers={"X-App-Secret": "wrong-secret"})
    assert response.status_code == 403


def test_chat_valid_request(
    client: TestClient,
    valid_headers: dict[str, str],
    valid_body: dict[str, object],
) -> None:
    """正しいヘッダーとリクエストボディ -> 200, SSE ストリーム"""
    with patch("src.routes.chat.stream_chat", return_value=_mock_stream()):
        response = client.post("/api/chat", json=valid_body, headers=valid_headers)
    assert response.status_code == 200
    assert "text/event-stream" in response.headers["content-type"]


def test_chat_unknown_app_id(
    client: TestClient,
    valid_headers: dict[str, str],
) -> None:
    """未知の app_id -> default プロンプトで正常動作"""
    body = {"app_id": "unknown-app", "message": "hello"}
    with patch("src.routes.chat.stream_chat", return_value=_mock_stream()):
        response = client.post("/api/chat", json=body, headers=valid_headers)
    assert response.status_code == 200


def test_chat_with_history(
    client: TestClient,
    valid_headers: dict[str, str],
) -> None:
    """会話履歴付きリクエスト -> 正常動作"""
    body = {
        "app_id": "poke-stadium",
        "message": "進化後は？",
        "history": [
            {"role": "user", "content": "ピカチュウについて教えて"},
            {"role": "model", "content": "ピカチュウは電気タイプのポケモンです。"},
        ],
    }
    with patch("src.routes.chat.stream_chat", return_value=_mock_stream()):
        response = client.post("/api/chat", json=body, headers=valid_headers)
    assert response.status_code == 200


def test_chat_ai_gateway_error(
    client: TestClient,
    valid_headers: dict[str, str],
    valid_body: dict[str, object],
) -> None:
    """AI Gateway がエラーを返す -> StreamingResponse 消費時に例外発生"""

    async def _error_stream() -> AsyncGenerator[str]:
        msg = "AI Gateway error"
        raise RuntimeError(msg)
        yield  # type: ignore[misc]  # raise 後の yield は AsyncGenerator 型宣言に必要

    with (
        patch("src.routes.chat.stream_chat", return_value=_error_stream()),
        pytest.raises(RuntimeError, match="AI Gateway error"),
    ):
        # StreamingResponse はストリームを消費するまでエラーが発生しないため、
        # TestClient がレスポンスを読み切る際に例外が発生する
        client.post("/api/chat", json=valid_body, headers=valid_headers)
