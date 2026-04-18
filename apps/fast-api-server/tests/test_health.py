from http import HTTPStatus

from fastapi.testclient import TestClient


def test_health_returns_200(client: TestClient) -> None:
    response = client.get("/api/health")
    assert response.status_code == HTTPStatus.OK


def test_health_response_body(client: TestClient) -> None:
    response = client.get("/api/health")
    body = response.json()
    assert body["message"] == "alive"
    assert "app_version" in body
