from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from src.middleware.auth import verify_app_secret
from src.schemas.chat import ChatRequest
from src.services.gateway.protcol import stream_chat

router = APIRouter()


@router.post(
    path="",
    summary="AIチャット（SSEストリーミング）",
    dependencies=[Depends(verify_app_secret)],
)
async def chat(request: ChatRequest) -> StreamingResponse:
    """app_id に基づくシステムプロンプトで AI Gateway へ中継し、SSE ストリームを返す"""
    return StreamingResponse(
        content=stream_chat(request),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            # nginx 等のリバースプロキシによるバッファリングを無効化する
            "X-Accel-Buffering": "no",
        },
    )
