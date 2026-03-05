"""API 사주 기능별 개별 엔드포인트 테스트 (SPEC-API-002)."""

from __future__ import annotations

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app

# ---------------------------------------------------------------------------
# Shared fixture
# ---------------------------------------------------------------------------

VALID_PAYLOAD = {
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "birth_hour": 10,
    "is_lunar": False,
    "is_leap_month": False,
    "gender": "male",
}

VALID_PAYLOAD_NO_HOUR = {
    "birth_year": 1990,
    "birth_month": 5,
    "birth_day": 15,
    "is_lunar": False,
    "is_leap_month": False,
    "gender": "female",
}

INVALID_YEAR_PAYLOAD = {
    "birth_year": 1500,  # ge=1600 위반
    "birth_month": 5,
    "birth_day": 15,
    "birth_hour": 10,
    "is_lunar": False,
    "is_leap_month": False,
    "gender": "male",
}


@pytest.fixture
async def client() -> AsyncClient:
    """테스트용 AsyncClient fixture."""
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as c:
        yield c


# ---------------------------------------------------------------------------
# POST /api/v1/saju/pillars
# ---------------------------------------------------------------------------


async def test_pillars_valid_request(client: AsyncClient) -> None:
    """유효한 요청 → HTTP 200 + 사기둥 필드 반환."""
    response = await client.post("/api/v1/saju/pillars", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    assert "year_pillar" in data
    assert "month_pillar" in data
    assert "day_pillar" in data
    assert "hour_pillar" in data


async def test_pillars_ganji_structure(client: AsyncClient) -> None:
    """사기둥 응답의 GanJi 구조 확인."""
    response = await client.post("/api/v1/saju/pillars", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    for pillar_key in ("year_pillar", "month_pillar", "day_pillar"):
        pillar = data[pillar_key]
        assert "gan" in pillar, f"{pillar_key}에 gan 필드 없음"
        assert "ji" in pillar, f"{pillar_key}에 ji 필드 없음"


async def test_pillars_no_hour_returns_null_hour_pillar(client: AsyncClient) -> None:
    """시간 미입력 시 hour_pillar는 null."""
    response = await client.post("/api/v1/saju/pillars", json=VALID_PAYLOAD_NO_HOUR)
    assert response.status_code == 200
    data = response.json()
    assert data["hour_pillar"] is None


async def test_pillars_pillar_meanings_included(client: AsyncClient) -> None:
    """pillar_meanings 필드 존재 확인."""
    response = await client.post("/api/v1/saju/pillars", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    assert "pillar_meanings" in data
    meanings = data["pillar_meanings"]
    assert meanings is not None
    assert isinstance(meanings, list)
    assert len(meanings) > 0


async def test_pillars_invalid_year(client: AsyncClient) -> None:
    """유효하지 않은 birth_year → HTTP 422."""
    response = await client.post("/api/v1/saju/pillars", json=INVALID_YEAR_PAYLOAD)
    assert response.status_code == 422


async def test_pillars_missing_gender(client: AsyncClient) -> None:
    """gender 누락 → HTTP 422."""
    payload = {k: v for k, v in VALID_PAYLOAD.items() if k != "gender"}
    response = await client.post("/api/v1/saju/pillars", json=payload)
    assert response.status_code == 422


# ---------------------------------------------------------------------------
# POST /api/v1/saju/analysis
# ---------------------------------------------------------------------------


async def test_analysis_valid_request(client: AsyncClient) -> None:
    """유효한 요청 → HTTP 200 + 분석 필드 반환."""
    response = await client.post("/api/v1/saju/analysis", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    assert "yuksin_list" in data
    assert "hapchung" in data
    assert "ohang_ratio" in data
    assert "jijanggan" in data
    assert "sibiunsung" in data
    assert "shinsal" in data


async def test_analysis_yuksin_list_structure(client: AsyncClient) -> None:
    """yuksin_list 항목 구조 검증."""
    response = await client.post("/api/v1/saju/analysis", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    yuksin_list = data["yuksin_list"]
    assert yuksin_list is not None
    assert isinstance(yuksin_list, list)
    assert len(yuksin_list) > 0
    for item in yuksin_list:
        assert "target" in item
        assert "yuksin" in item


async def test_analysis_ohang_ratio_structure(client: AsyncClient) -> None:
    """ohang_ratio 필드 구조 및 합계 100 검증."""
    response = await client.post("/api/v1/saju/analysis", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    ratio = data["ohang_ratio"]
    assert ratio is not None
    for key in ("mok", "hwa", "to", "geum", "su"):
        assert key in ratio, f"ohang_ratio에 {key} 필드 없음"
    total = sum(ratio.values())
    assert abs(total - 100.0) < 0.1, f"오행 비율 합계가 100이 아님: {total}"


async def test_analysis_invalid_year(client: AsyncClient) -> None:
    """유효하지 않은 birth_year → HTTP 422."""
    response = await client.post("/api/v1/saju/analysis", json=INVALID_YEAR_PAYLOAD)
    assert response.status_code == 422


async def test_analysis_no_hour(client: AsyncClient) -> None:
    """시간 미입력 시 HTTP 200 정상 응답."""
    response = await client.post("/api/v1/saju/analysis", json=VALID_PAYLOAD_NO_HOUR)
    assert response.status_code == 200


# ---------------------------------------------------------------------------
# POST /api/v1/saju/fortune
# ---------------------------------------------------------------------------


async def test_fortune_valid_request(client: AsyncClient) -> None:
    """유효한 요청 → HTTP 200 + 운세 필드 반환."""
    response = await client.post("/api/v1/saju/fortune", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    assert "deun" in data
    assert "sewun" in data


async def test_fortune_deun_structure(client: AsyncClient) -> None:
    """deun 필드 구조 검증."""
    response = await client.post("/api/v1/saju/fortune", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    deun = data["deun"]
    if deun is not None:
        assert "banghyang" in deun
        assert "deun_su" in deun
        assert "deun_list" in deun
        assert isinstance(deun["deun_list"], list)


async def test_fortune_sewun_structure(client: AsyncClient) -> None:
    """sewun 필드 구조 검증."""
    response = await client.post("/api/v1/saju/fortune", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    sewun = data["sewun"]
    if sewun is not None:
        assert isinstance(sewun, list)
        if len(sewun) > 0:
            item = sewun[0]
            assert "year" in item
            assert "ganji" in item


async def test_fortune_invalid_year(client: AsyncClient) -> None:
    """유효하지 않은 birth_year → HTTP 422."""
    response = await client.post("/api/v1/saju/fortune", json=INVALID_YEAR_PAYLOAD)
    assert response.status_code == 422


async def test_fortune_no_hour(client: AsyncClient) -> None:
    """시간 미입력 시 HTTP 200 정상 응답."""
    response = await client.post("/api/v1/saju/fortune", json=VALID_PAYLOAD_NO_HOUR)
    assert response.status_code == 200


# ---------------------------------------------------------------------------
# POST /api/v1/saju/identity
# ---------------------------------------------------------------------------


async def test_identity_valid_request(client: AsyncClient) -> None:
    """유효한 요청 → HTTP 200 + 정체성 필드 반환."""
    response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    assert "day_gan" in data
    assert "gyouk_name" in data
    assert "yongshin" in data
    assert "ilgan_content" in data
    assert "gyouk_content" in data
    assert "yongsin_content" in data


async def test_identity_day_gan_is_string(client: AsyncClient) -> None:
    """day_gan 필드가 비어 있지 않은 문자열."""
    response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    day_gan = data["day_gan"]
    assert isinstance(day_gan, str)
    assert len(day_gan) > 0


async def test_identity_no_hour_returns_200(client: AsyncClient) -> None:
    """시간 미입력 시 HTTP 200 정상 응답."""
    response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD_NO_HOUR)
    assert response.status_code == 200
    data = response.json()
    assert "day_gan" in data


async def test_identity_invalid_year(client: AsyncClient) -> None:
    """유효하지 않은 birth_year → HTTP 422."""
    response = await client.post("/api/v1/saju/identity", json=INVALID_YEAR_PAYLOAD)
    assert response.status_code == 422


async def test_identity_content_fields_nullable(client: AsyncClient) -> None:
    """콘텐츠 필드는 null 가능 (로딩 실패 시 null, HTTP 200)."""
    response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    # content 필드들은 dict 또는 null 이어야 함
    for field in ("ilgan_content", "gyouk_content", "yongsin_content"):
        value = data[field]
        assert value is None or isinstance(value, dict), (
            f"{field}는 dict 또는 null이어야 함, 실제값: {type(value)}"
        )


async def test_identity_gyouk_name_nullable(client: AsyncClient) -> None:
    """gyouk_name은 null 또는 문자열."""
    response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    gyouk_name = data["gyouk_name"]
    assert gyouk_name is None or isinstance(gyouk_name, str)


async def test_identity_yongshin_structure(client: AsyncClient) -> None:
    """yongshin 필드 구조 검증 (null 또는 dang_ryeong/heuisin 포함)."""
    response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    yongshin = data["yongshin"]
    if yongshin is not None:
        assert "dang_ryeong" in yongshin
        assert "heuisin" in yongshin


# ---------------------------------------------------------------------------
# 기존 엔드포인트 회귀 테스트 (변경 없음 확인)
# ---------------------------------------------------------------------------


async def test_original_saju_endpoint_unchanged(client: AsyncClient) -> None:
    """기존 /saju 엔드포인트가 여전히 정상 동작."""
    response = await client.post("/api/v1/saju", json=VALID_PAYLOAD)
    assert response.status_code == 200
    data = response.json()
    # 기존 필드 전부 확인
    assert "year_pillar" in data
    assert "month_pillar" in data
    assert "day_pillar" in data
    assert "deun" in data
    assert "yuksin_list" in data
    assert "ohang_ratio" in data
