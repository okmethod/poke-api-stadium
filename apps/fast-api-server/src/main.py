from logging import getLogger
from logging.config import fileConfig

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routes import chat, health
from src.settings import get_settings

fileConfig("src/logging.ini", disable_existing_loggers=False)
root_logger = getLogger()

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

# Chat API routers
app.include_router(
    chat.router,
    prefix="/api/chat",
    tags=["Chat"],
)
