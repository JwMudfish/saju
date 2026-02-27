"""API 캘린더 변환 엔드포인트 테스트."""
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


async def test_calendar_convert_valid(client: AsyncClient) -> None:
    """유효한 음력 날짜 변환 → HTTP 200."""
    payload = {"year": 1990, "month": 1, "day": 1, "is_leap_month": False}
    response = await client.post("/api/v1/calendar/convert", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "solar_year" in data
    assert "solar_month" in data
    assert "solar_day" in data


async def test_calendar_convert_response_types(client: AsyncClient) -> None:
    """응답 필드가 int 타입인지 확인."""
    payload = {"year": 2000, "month": 6, "day": 15, "is_leap_month": False}
    response = await client.post("/api/v1/calendar/convert", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data["solar_year"], int)
    assert isinstance(data["solar_month"], int)
    assert isinstance(data["solar_day"], int)
