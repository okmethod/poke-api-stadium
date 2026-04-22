import logging
from logging import getLogger
from typing import Any

# Cloudflare Workers はファイルシステム非対応のため、プログラムで logging を設定する
logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] %(name)s (%(funcName)s:%(lineno)s) %(message)s",
    handlers=[logging.StreamHandler()],
)
root_logger = getLogger()

# 起動時 CPU 制限を回避するため、FastAPI app は初回リクエスト時に遅延初期化する
# dict で保持することで PLW0603 (global) を回避する
_app_state: dict[str, Any] = {}


def _create_app() -> Any:
    """FastAPI app を構築して返す（初回リクエスト時のみ呼ばれる）"""
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware

    from routes import auth, chat, health
    from settings import get_settings

    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        description="Multi-app shared AI gateway API.",
        version=settings.app_version,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=False,
        allow_methods=["GET", "POST", "OPTIONS"],
        allow_headers=[
            "Content-Type",
            "Accept",
            "Cache-Control",
            "Origin",
            "X-App-Secret",
        ],
        expose_headers=["Content-Disposition"],
    )

    # Health Check API routers
    app.include_router(
        health.router,
        prefix="/api/health",
        tags=["Health"],
    )

    # Auth API routers
    app.include_router(
        auth.router,
        prefix="/api/auth",
        tags=["Auth"],
    )

    # Chat API routers
    app.include_router(
        chat.router,
        prefix="/api/chat",
        tags=["Chat"],
    )

    return app


async def on_fetch(request: Any, env: Any, ctx: Any = None) -> Any:
    """Cloudflare Workers のエントリポイント。ASGI ブリッジ経由で FastAPI に委譲する。"""
    if "app" not in _app_state:
        _app_state["app"] = _create_app()

    import asgi  # type: ignore[import-untyped]

    return await asgi.fetch(_app_state["app"], request, env, ctx)
