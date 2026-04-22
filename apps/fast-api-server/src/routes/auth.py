import hmac
from typing import Annotated

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel, Field

from settings import Settings, get_settings

router = APIRouter()

SettingsDep = Annotated[Settings, Depends(get_settings)]
SecretQuery = Annotated[str, Query(description="あいことば")]

# =============================================================================
# Schemas
# =============================================================================


class AuthResponse(BaseModel):
    """認証チェックレスポンスモデル"""

    authorized: bool = Field(..., description="認証結果")


# =============================================================================
# Endpoints
# =============================================================================


@router.get(
    path="",
    summary="あいことば認証チェック",
)
def verify(
    settings: SettingsDep,
    secret: SecretQuery,
) -> AuthResponse:
    """あいことばを検証し、認証結果を返すエンドポイント。

    タイミング攻撃を防ぐため hmac.compare_digest() で定数時間比較する。
    """
    authorized = hmac.compare_digest(secret, settings.app_secret)
    return AuthResponse(authorized=authorized)
