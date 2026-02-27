"""API 사주 엔드포인트 테스트."""
from __future__ import annotations

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


def test_saju_service_importable() -> None:
    """SajuService 임포트 가능 확인."""
    from app.services.saju_service import SajuService

    assert SajuService is not None


@pytest.fixture
async def client() -> AsyncClient:
    """테스트용 AsyncClient fixture."""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as c:
        yield c


async def test_saju_endpoint_valid_request(client: AsyncClient) -> None:
    """유효한 사주 계산 요청 → HTTP 200."""
    payload = {
        "birth_year": 1990,
        "birth_month": 5,
        "birth_day": 15,
        "birth_hour": 10,
        "is_lunar": False,
        "is_leap_month": False,
        "gender": "male",
    }
    response = await client.post("/api/v1/saju", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "year_pillar" in data
    assert "month_pillar" in data
    assert "day_pillar" in data


async def test_saju_endpoint_returns_ganji_structure(client: AsyncClient) -> None:
    """응답의 GanJi 구조 확인."""
    payload = {
        "birth_year": 1984,
        "birth_month": 4,
        "birth_day": 15,
        "birth_hour": None,
        "is_lunar": False,
        "is_leap_month": False,
        "gender": "female",
    }
    response = await client.post("/api/v1/saju", json=payload)
    assert response.status_code == 200
    data = response.json()
    year_pillar = data["year_pillar"]
    assert "gan" in year_pillar
    assert "ji" in year_pillar


async def test_saju_endpoint_invalid_year(client: AsyncClient) -> None:
    """유효하지 않은 birth_year → HTTP 422."""
    payload = {
        "birth_year": 1500,  # ge=1600 위반
        "birth_month": 5,
        "birth_day": 15,
        "birth_hour": 10,
        "is_lunar": False,
        "is_leap_month": False,
        "gender": "male",
    }
    response = await client.post("/api/v1/saju", json=payload)
    assert response.status_code == 422


async def test_saju_endpoint_invalid_gender(client: AsyncClient) -> None:
    """유효하지 않은 gender → HTTP 422."""
    payload = {
        "birth_year": 1990,
        "birth_month": 5,
        "birth_day": 15,
        "birth_hour": 10,
        "is_lunar": False,
        "is_leap_month": False,
        "gender": "unknown",  # Literal["male", "female"] 위반
    }
    response = await client.post("/api/v1/saju", json=payload)
    assert response.status_code == 422


async def test_saju_endpoint_no_hour(client: AsyncClient) -> None:
    """birth_hour 없이 요청 → HTTP 200 (시주 미상)."""
    payload = {
        "birth_year": 1990,
        "birth_month": 5,
        "birth_day": 15,
        "is_lunar": False,
        "is_leap_month": False,
        "gender": "male",
    }
    response = await client.post("/api/v1/saju", json=payload)
    assert response.status_code == 200
