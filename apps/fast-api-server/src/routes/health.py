from fastapi import APIRouter
from pydantic import BaseModel, Field

router = APIRouter()

# =============================================================================
# Schemas
# =============================================================================


class HealthResponse(BaseModel):
    """ヘルスチェックレスポンスモデル"""

    message: str = Field(..., description="ステータスメッセージ")
    app_version: str | None = Field(None, description="アプリケーションバージョン")


# =============================================================================
# Endpoints
# =============================================================================


@router.get(
    path="",
    summary="APIサーバーヘルスチェック",
)
def health() -> HealthResponse:
    """APIサーバーヘルスチェックエンドポイント"""
    return HealthResponse(message="alive", app_version="1.0.0")
