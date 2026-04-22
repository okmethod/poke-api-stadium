import hmac
from typing import Annotated

from fastapi import Depends, Header, HTTPException, status

from settings import Settings, get_settings

# FastAPI の推奨パターン: Annotated で Depends/Header をラップし B008 を回避する
SettingsDep = Annotated[Settings, Depends(get_settings)]
AppSecretHeader = Annotated[str | None, Header(alias="X-App-Secret")]


async def verify_app_secret(
    settings: SettingsDep,
    x_app_secret: AppSecretHeader = None,
) -> None:
    """X-App-Secret ヘッダーを検証する認証ガード。

    タイミング攻撃を防ぐため hmac.compare_digest() で定数時間比較する。
    """
    if x_app_secret is None or not hmac.compare_digest(x_app_secret, settings.app_secret):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden: invalid or missing X-App-Secret header",
        )
