from typing import Literal

from pydantic import BaseModel, Field

# サポートする LLM プロバイダー（stub は動作確認用のダミー実装）
LLMProvider = Literal["stub", "gemini", "claude", "groq"]


class ChatMessage(BaseModel):
    """チャットの1件分のメッセージ"""

    role: Literal["user", "model"]
    content: str


class ChatRequest(BaseModel):
    """チャットエンドポイントへのリクエスト"""

    app_id: str = Field(..., description="システムプロンプト切り替えキー")
    message: str = Field(..., description="ユーザーの入力テキスト")
    history: list[ChatMessage] = Field(default=[], description="会話履歴")
    provider: LLMProvider = Field(default="stub", description="使用する LLM プロバイダー")
