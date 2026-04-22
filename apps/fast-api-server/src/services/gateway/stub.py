import asyncio
import json
from collections.abc import AsyncGenerator

from schemas.chat import ChatRequest

# ストリーミングを疑似する固定メッセージ（スペースで分割して逐次送信）
_STUB_CHUNKS: list[str] = [
    "私は",
    "ダミーの",
    "LLM",
    "です。",
    "実際の",
    "推論は",
    "せず、",
    "固定の",
    "メッセージを",
    "回答して",
    "います。",
]


async def stream(_request: ChatRequest) -> AsyncGenerator[str]:
    """実際の AI Gateway を呼び出さずにダミー SSE を返すスタブ実装（動作確認用）"""
    for chunk in _STUB_CHUNKS:
        payload = {"stub": True, "text": chunk}
        yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"
        # 本物のストリーミングを模倣するために少し待機する
        await asyncio.sleep(0.1)
