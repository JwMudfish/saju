"""API 헬스 체크 엔드포인트 테스트."""

from __future__ import annotations

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
async def client() -> AsyncClient:
    """테스트용 AsyncClient fixture."""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as c:
        yield c


async def test_health_returns_200(client: AsyncClient) -> None:
    """헬스 체크 → HTTP 200."""
    response = await client.get("/health")
    assert response.status_code == 200


async def test_health_returns_ok_status(client: AsyncClient) -> None:
    """헬스 체크 → {"status": "ok"}."""
    response = await client.get("/health")
    assert response.json() == {"status": "ok"}
