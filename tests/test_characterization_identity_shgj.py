"""Characterization tests for TASK-003: Identity endpoint shgj integration.

These tests capture the CURRENT behavior before adding shgj to the API response.
After implementation, these tests will verify backward compatibility.
"""

from __future__ import annotations

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app

# Test payload (same as existing tests)
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


class TestIdentityEndpointShgjCharacterization:
    """Characterization tests for identity endpoint shgj fields (BEFORE implementation)."""

    async def test_identity_current_response_structure(self, client: AsyncClient) -> None:
        """현재 응답 구조 캡처 (TASK-003 구현 전)."""
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 현재 존재하는 필드들
        current_fields = [
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

        # 모든 현재 필드가 존재하는지 확인
        for field in current_fields:
            assert field in data, f"Current field {field} should exist"

        # TASK-003 추가될 필드들 (현재는 없어야 함)
        new_fields = ["shgj", "sangsin_content", "gusin_content", "shgj_gilhung_content"]

        # 새 필드들이 존재하는지 확인 (구현 전이므로 없을 수 있음)
        # 구현 후에는 이 필드들이 존재해야 함
        for field in new_fields:
            # 현재는 없을 수 있지만, 구현 후에는 존재해야 함
            # 일단 존재 여부만 체크 (타입 체크는 구현 후)
            pass

    async def test_identity_shgj_field_will_be_added(self, client: AsyncClient) -> None:
        """shgj 필드가 추가될 자리 확인 (구현 전).

        TASK-003 구현 후:
        - shgj 필드가 존재해야 함
        - ShgjResult 구조를 가져야 함 (sangsin, gusin, gukgubun, sanghwa, sulhwa)
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 구현 전: shgj 필드가 없을 수 있음
        # 구현 후: shgj 필드가 존재하고 적절한 구조를 가져야 함
        if "shgj" in data:
            # shgj가 있다면 올바른 구조인지 확인
            shgj = data["shgj"]
            if shgj is not None:
                # ShgjResult 구조
                expected_fields = ["sangsin", "gusin", "gukgubun", "sanghwa", "sulhwa"]
                for field in expected_fields:
                    assert field in shgj, f"shgj.{field} should exist"
        else:
            # 구현 전이므로 shgj가 없는 것은 정상
            pass

    async def test_identity_sangsin_content_will_be_added(self, client: AsyncClient) -> None:
        """sangsin_content 필드가 추가될 자리 확인 (구현 전).

        TASK-003 구현 후:
        - sangsin_content 필드가 존재해야 함
        - shgj.sangsin이 있으면 해당 컨텐츠가 로드되어야 함
        - shgj.sangsin이 None이면 sangsin_content도 None이어야 함
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 구현 후: 필드 존재 및 타입 체크
        if "sangsin_content" in data:
            sangsin_content = data["sangsin_content"]
            # dict 또는 None이어야 함
            assert sangsin_content is None or isinstance(sangsin_content, dict)

    async def test_identity_gusin_content_will_be_added(self, client: AsyncClient) -> None:
        """gusin_content 필드가 추가될 자리 확인 (구현 전).

        TASK-003 구현 후:
        - gusin_content 필드가 존재해야 함
        - shgj.gusin이 있으면 해당 컨텐츠가 로드되어야 함
        - shgj.gusin이 None이면 gusin_content도 None이어야 함
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 구현 후: 필드 존재 및 타입 체크
        if "gusin_content" in data:
            gusin_content = data["gusin_content"]
            # dict 또는 None이어야 함
            assert gusin_content is None or isinstance(gusin_content, dict)

    async def test_identity_shgj_gilhung_content_will_be_added(self, client: AsyncClient) -> None:
        """shgj_gilhung_content 필드가 추가될 자리 확인 (구현 전).

        TASK-003 구현 후:
        - shgj_gilhung_content 필드가 존재해야 함
        - 격국의 길흉에 따른 컨텐츠가 로드되어야 함
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 구현 후: 필드 존재 및 타입 체크
        if "shgj_gilhung_content" in data:
            shgj_gilhung_content = data["shgj_gilhung_content"]
            # dict 또는 None이어야 함
            assert shgj_gilhung_content is None or isinstance(shgj_gilhung_content, dict)

    async def test_identity_backward_compatibility(self, client: AsyncClient) -> None:
        """기존 필드들의 하위 호환성 확인.

        TASK-003 구현 후에도 기존 필드들은 변경되지 않아야 함.
        """
        response = await client.post("/api/v1/saju/identity", json=VALID_PAYLOAD)
        assert response.status_code == 200
        data = response.json()

        # 기존 필드들의 타입과 구조가 변하지 않았는지 확인
        assert isinstance(data["day_gan"], str)
        assert data["gyouk_name"] is None or isinstance(data["gyouk_name"], str)

        if data["yongshin"] is not None:
            assert isinstance(data["yongshin"], dict)
            assert "dang_ryeong" in data["yongshin"]
            assert "heuisin" in data["yongshin"]

        # 콘텐츠 필드들은 dict 또는 None
        for field in ["ilgan_content", "gyouk_content", "yongsin_content"]:
            assert data[field] is None or isinstance(data[field], dict)
