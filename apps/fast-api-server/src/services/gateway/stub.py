import json
from collections.abc import AsyncGenerator

from src.prompts.system_prompts import get_system_prompt
from src.schemas.chat import ChatRequest


async def stream(request: ChatRequest) -> AsyncGenerator[str]:
    """実際の AI Gateway を呼び出さずにダミー SSE を返すスタブ実装（動作確認用）"""
    system_prompt = get_system_prompt(request.app_id)
    text = f"[STUB] app_id={request.app_id!r} / system_prompt={system_prompt!r} / message={request.message!r}"
    payload = {"stub": True, "text": text}
    yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"
