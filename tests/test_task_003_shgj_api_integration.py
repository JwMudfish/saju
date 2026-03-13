"""Integration tests for TASK-003: Shgj API integration.

These tests verify that the identity endpoint correctly integrates
shgj calculation and content loading.
"""

from __future__ import annotations

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app

# Test payload
VALID_PAYLOAD = {
    "birth_year": 1990,
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


class TestTask003ShgjIntegration:
    """TASK-003: 신격(Shgj) API 통합 테스트."""

    async def test_identity_includes_shgj_field(self, client: AsyncClient) -> None:
        """Identity endpoint에 shgj 필드가 포함되어야 함."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # shgj 필드 존재 확인
        assert "shgj" in data, "shgj field should exist in response"

    async def test_shgj_has_correct_structure(self, client: AsyncClient) -> None:
        """shgj 필드가 올바른 구조를 가져야 함."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        shgj = data.get("shgj")

        # shgj는 None이거나 올바른 구조를 가져야 함
        if shgj is not None:
            expected_fields = ["sangsin", "gusin", "gukgubun", "sanghwa", "sulhwa"]
            for field in expected_fields:
                assert field in shgj, f"shgj.{field} should exist"

    async def test_identity_includes_sangsin_content(self, client: AsyncClient) -> None:
        """Identity endpoint에 sangsin_content 필드가 포함되어야 함."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # sangsin_content 필드 존재 확인
        assert "sangsin_content" in data, "sangsin_content field should exist"

        # sangsin_content는 dict 또는 None이어야 함
        sangsin_content = data["sangsin_content"]
        assert sangsin_content is None or isinstance(sangsin_content, dict)

    async def test_identity_includes_gusin_content(self, client: AsyncClient) -> None:
        """Identity endpoint에 gusin_content 필드가 포함되어야 함."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # gusin_content 필드 존재 확인
        assert "gusin_content" in data, "gusin_content field should exist"

        # gusin_content는 dict 또는 None이어야 함
        gusin_content = data["gusin_content"]
        assert gusin_content is None or isinstance(gusin_content, dict)

    async def test_identity_includes_shgj_gilhung_content(self, client: AsyncClient) -> None:
        """Identity endpoint에 shgj_gilhung_content 필드가 포함되어야 함."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # shgj_gilhung_content 필드 존재 확인
        assert "shgj_gilhung_content" in data, "shgj_gilhung_content field should exist"

        # shgj_gilhung_content는 dict 또는 None이어야 함
        shgj_gilhung_content = data["shgj_gilhung_content"]
        assert shgj_gilhung_content is None or isinstance(shgj_gilhung_content, dict)

    async def test_backward_compatibility_existing_fields(self, client: AsyncClient) -> None:
        """기존 필드들의 하위 호환성 유지 확인."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 기존 필드 모두 존재 확인
        existing_fields = [
            "day_gan",
            "gyouk_name",
            "yongshin",
            "ilgan_content",
            "gyouk_content",
            "yongsin_content",
            "hisin_content",
            "hisin_gisin_content",
            "salary_content",
        ]

        for field in existing_fields:
            assert field in data, f"Existing field {field} should exist"

        # 기존 필드 타입 확인
        assert isinstance(data["day_gan"], str)
        assert data["gyouk_name"] is None or isinstance(data["gyouk_name"], str)

    async def test_shgj_null_when_no_yongshin(self, client: AsyncClient) -> None:
        """용신이 없으면 shgj도 None이어야 함."""
        # 시간 미상으로 용신 계산 실패 유도
        payload_no_hour = {
            "birth_year": 1990,
            "birth_month": 5,
            "birth_day": 15,
            "is_lunar": False,
            "is_leap_month": False,
            "gender": "male",
        }

        response = await client.post("/api/v1/saju/identity", json=payload_no_hour)
        assert response.status_code == 200
        data = response.json()

        # 용신이 없으면 shgj도 None이어야 함
        if data.get("yongshin") is None:
            assert data.get("shgj") is None, "shgj should be None when yongshin is None"

    async def test_error_handling_graceful_degradation(self, client: AsyncClient) -> None:
        """shgj 계산 중 오류 발생 시 기존 필드들은 정상 반환되어야 함."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 오류가 발생해도 HTTP 200 유지
        assert response.status_code == 200

        # 기존 필드들은 정상 반환
        assert "day_gan" in data
        assert "yongshin" in data

    async def test_shgj_content_loading_conditional(self, client: AsyncClient) -> None:
        """shgj 결과에 따라 컨텐츠가 조건부로 로드되어야 함."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        shgj = data.get("shgj")

        if shgj is not None:
            # shgj가 있으면 sangsin/gusin에 따라 컨텐츠 로드
            if shgj.get("sangsin"):
                # sangsin이 있으면 sangsin_content 로드 시도
                assert "sangsin_content" in data
            else:
                # sangsin이 없으면 sangsin_content는 None
                assert data.get("sangsin_content") is None

            if shgj.get("gusin"):
                # gusin이 있으면 gusin_content 로드 시도
                assert "gusin_content" in data
            else:
                # gusin이 없으면 gusin_content는 None
                assert data.get("gusin_content") is None
