from http import HTTPStatus

import pytest
from fastapi.testclient import TestClient


@pytest.mark.parametrize(
    ("secret", "expected_authorized"),
    [
        ("test-secret", True),
        ("wrong-secret", False),
        ("", False),
    ],
)
def test_verify(client: TestClient, secret: str, expected_authorized: bool) -> None:  # noqa: FBT001  # parametrize のケース値として bool を受け取るため
    response = client.get("/api/auth", params={"secret": secret})
    assert response.status_code == HTTPStatus.OK
    assert response.json()["authorized"] is expected_authorized


def test_verify_requires_secret_query_param(client: TestClient) -> None:
    # secret パラメータなしは 422 Unprocessable Entity
    response = client.get("/api/auth")
    assert response.status_code == HTTPStatus.UNPROCESSABLE_ENTITY
