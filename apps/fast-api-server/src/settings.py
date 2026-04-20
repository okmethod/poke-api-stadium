from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "AI Gateway Proxy API"
    app_version: str = "0.1.0"

    allowed_origins: list[str] = []

    # 本 API 利用者向けのパスフレーズ認証
    app_secret: str

    # Cloudflare AI Gateway のベース URL（アカウントID・ゲートウェイ名を含む）
    # 例: https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}
    ai_gateway_base_url: str

    # Cloudflare AI Gateway 認証トークン（cf-aig-authorization ヘッダーに使用）
    ai_gateway_token: str

    # 各プロバイダーのデフォルトモデル名（wrangler.toml の [vars] で上書き可能）
    gemini_model: str = "gemini-1.5-flash"
    claude_model: str = "claude-3-5-haiku-20241022"
    groq_model: str = "llama-3.3-70b-versatile"

    @field_validator("app_secret", "ai_gateway_base_url", "ai_gateway_token")
    @classmethod
    def must_not_be_empty(cls, v: str) -> str:
        """必須フィールドが空文字でないことを検証する"""
        if not v.strip():
            msg = "must not be empty"
            raise ValueError(msg)
        return v.strip()


@lru_cache
def get_settings() -> Settings:
    return Settings()
