import pytest
from fastapi.testclient import TestClient


@pytest.fixture(autouse=True)
def mock_settings_env(monkeypatch: pytest.MonkeyPatch) -> None:
    """テスト実行時に必須の環境変数を設定する"""
    monkeypatch.setenv("APP_SECRET", "test-secret")
    monkeypatch.setenv("AI_GATEWAY_BASE_URL", "https://gateway.example.com/v1/account/gateway")
    monkeypatch.setenv("AI_GATEWAY_TOKEN", "test-gateway-token")
    # lru_cache をクリアして環境変数の変更を反映させる
    from src.settings import get_settings  # noqa: PLC0415, I001  # モジュール先頭でインポートするとパッチ前にキャッシュが確定するため

    get_settings.cache_clear()


@pytest.fixture
def client() -> TestClient:
    from src.main import app  # noqa: PLC0415, I001  # モジュール先頭でインポートするとパッチ前の settings でアプリが初期化されるため

    return TestClient(app)
