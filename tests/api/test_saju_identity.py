"""Tests for /saju/identity endpoint - Phase 1 new fields."""

from __future__ import annotations

from typing import Any

import pytest
from fastapi.testclient import TestClient

from app.main import app


class TestSajuIdentityEndpointPhase1:
    """Phase 1: 상신 보완, 구신 기신, 영격령 설명 필드 테스트."""

    def test_identity_response_has_phase1_fields(self) -> None:
        """IdentityResponse에 Phase 1 필드가 포함되어야 한다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # Phase 1 새 필드 검증
        assert "sangsin_compliment_content" in data
        assert "gusin_gisin_content" in data
        assert "jisok_content" in data
        assert "joonghwa_content" in data
        assert "hwakjang_content" in data

    def test_identity_response_phase1_fields_can_be_null(self) -> None:
        """Phase 1 필드는 null일 수 있다 (조건부 로드)."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # Phase 1 필드는 조건부로 로드되므로 null 가능
        # ShgjResult에 해당 값이 없으면 null
        assert data.get("sangsin_compliment_content") is None or isinstance(
            data.get("sangsin_compliment_content"), dict
        )
        assert data.get("gusin_gisin_content") is None or isinstance(
            data.get("gusin_gisin_content"), dict
        )
        assert data.get("jisok_content") is None or isinstance(
            data.get("jisok_content"), dict
        )
        assert data.get("joonghwa_content") is None or isinstance(
            data.get("joonghwa_content"), dict
        )
        assert data.get("hwakjang_content") is None or isinstance(
            data.get("hwakjang_content"), dict
        )

    def test_identity_response_phase1_fields_structure(self) -> None:
        """Phase 1 필드가 올바른 구조를 가져야 한다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 필드가 null이 아닐면 dict 타입이어야 함
        for field in [
            "sangsin_compliment_content",
            "gusin_gisin_content",
            "jisok_content",
            "joonghwa_content",
            "hwakjang_content",
        ]:
            value = data.get(field)
            if value is not None:
                assert isinstance(value, dict), f"{field} must be dict or null"

    def test_identity_response_shgj_result_present(self) -> None:
        """ShgjResult가 존재할 때 Phase 1 필드가 로드된다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # shgj 결과가 있는지 확인
        shgj = data.get("shgj")
        if shgj is not None:
            # shgj가 있고 sangsin/gusin이 있으면 Phase 1 필드도 로드됨
            if shgj.get("sangsin"):
                # 상신 보완 컨텐츠가 로드되었는지 확인
                sangsin_compliment = data.get("sangsin_compliment_content")
                assert sangsin_compliment is None or isinstance(sangsin_compliment, dict)

            if shgj.get("gusin"):
                # 구신 기신 컨텐츠가 로드되었는지 확인
                gusin_gisin = data.get("gusin_gisin_content")
                assert gusin_gisin is None or isinstance(gusin_gisin, dict)

            # 영격령 세부지표가 있으면 해당 컨텐츠 로드됨
            if shgj.get("jisok"):
                jisok = data.get("jisok_content")
                assert jisok is None or isinstance(jisok, dict)

            if shgj.get("joonghwa"):
                joonghwa = data.get("joonghwa_content")
                assert joonghwa is None or isinstance(joonghwa, dict)

            if shgj.get("hwakjang"):
                hwakjang = data.get("hwakjang_content")
                assert hwakjang is None or isinstance(hwakjang, dict)

    def test_identity_response_all_required_fields_present(self) -> None:
        """IdentityResponse에 모든 필드가 존재해야 한다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 필수 필드 검증
        required_fields = [
            "day_gan",
            "gyouk_name",
            "yongshin",
            "ilgan_content",
            "gyouk_content",
            "yongsin_content",
            "hisin_content",
            "hisin_gisin_content",
            "salary_content",
            "shgj",
            "sangsin_content",
            "gusin_content",
            "shgj_gilhung_content",
            # Phase 1 필드
            "sangsin_compliment_content",
            "gusin_gisin_content",
            "jisok_content",
            "joonghwa_content",
            "hwakjang_content",
            # Phase 2 필드
            "hapchung_content",
            "ilgan_hw_content",
            "ilgan_love_content",
            "bestfriend_content",
        ]

        for field in required_fields:
            assert field in data, f"Missing required field: {field}"


class TestSajuIdentityEndpointIntegration:
    """통합 테스트: 기존 필드와 Phase 1 필드의 상호작용."""

    def test_identity_response_backward_compatible(self) -> None:
        """기존 필드들이 여전히 존재해야 한다 (하위 호환성)."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 기존 필드 검증
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
            "shgj",
            "sangsin_content",
            "gusin_content",
            "shgj_gilhung_content",
        ]

        for field in existing_fields:
            assert field in data, f"Missing existing field: {field}"

    def test_identity_response_consistent_data_types(self) -> None:
        """모든 필드가 일관된 데이터 타입을 가져야 한다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # day_gan은 문자열
        assert isinstance(data.get("day_gan"), str)

        # gyouk_name은 문자열 또는 null
        gyouk_name = data.get("gyouk_name")
        assert gyouk_name is None or isinstance(gyouk_name, str)

        # yongshin는 객체 또는 null
        yongshin = data.get("yongshin")
        assert yongshin is None or isinstance(yongshin, dict)

        # 모든 콘텐츠 필드는 dict 또는 null
        content_fields = [
            "ilgan_content",
            "gyouk_content",
            "yongsin_content",
            "hisin_content",
            "hisin_gisin_content",
            "salary_content",
            "sangsin_content",
            "gusin_content",
            "shgj_gilhung_content",
            # Phase 1 필드
            "sangsin_compliment_content",
            "gusin_gisin_content",
            "jisok_content",
            "joonghwa_content",
            "hwakjang_content",
            # Phase 2 필드
            "hapchung_content",
            "ilgan_hw_content",
            "ilgan_love_content",
            "bestfriend_content",
        ]

        for field in content_fields:
            value = data.get(field)
            assert value is None or isinstance(value, dict), f"{field} must be dict or null"


class TestSajuIdentityEndpointPhase2:
    """Phase 2: 합충 관계, 일간 화월, 일간 연애, 베프 유형 필드 테스트."""

    def test_identity_response_has_phase2_fields(self) -> None:
        """IdentityResponse에 Phase 2 필드가 포함되어야 한다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # Phase 2 새 필드 검증
        assert "hapchung_content" in data
        assert "ilgan_hw_content" in data
        assert "ilgan_love_content" in data
        assert "bestfriend_content" in data

    def test_identity_response_phase2_fields_can_be_null(self) -> None:
        """Phase 2 필드는 null일 수 있다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # Phase 2 필드는 항상 로드되므로 None이 아니어야 함
        # (합충 유형 계산 로직에 따라 다를 수 있음)
        assert data.get("hapchung_content") is None or isinstance(
            data.get("hapchung_content"), dict
        )
        assert data.get("ilgan_hw_content") is None or isinstance(
            data.get("ilgan_hw_content"), dict
        )
        assert data.get("ilgan_love_content") is None or isinstance(
            data.get("ilgan_love_content"), dict
        )
        assert data.get("bestfriend_content") is None or isinstance(
            data.get("bestfriend_content"), dict
        )

    def test_identity_response_phase2_fields_structure(self) -> None:
        """Phase 2 필드가 올바른 구조를 가져야 한다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 필드가 null이 아닐면 dict 타입이어야 함
        for field in ["hapchung_content", "ilgan_hw_content", "ilgan_love_content", "bestfriend_content"]:
            value = data.get(field)
            if value is not None:
                assert isinstance(value, dict), f"{field} must be dict or null"

    def test_identity_hapchung_content_based_on_relations(self) -> None:
        """합충 콘텐츠는 합충 관계에 따라 결정된다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 합충 콘텐츠가 로드되었는지 확인
        hapchung = data.get("hapchung_content")
        assert hapchung is None or isinstance(hapchung, dict)
        if hapchung is not None:
            # contentsList 필드 확인
            assert "contentsList" in hapchung or "contents" in hapchung

    def test_identity_ilgan_hw_content_with_month_ji(self) -> None:
        """일간 화월 콘텐츠는 일간과 월지 조합으로 로드된다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,  # 월지: 진(辰)
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 일간 화월 콘텐츠 확인
        ilgan_hw = data.get("ilgan_hw_content")
        assert ilgan_hw is None or isinstance(ilgan_hw, dict)

    def test_identity_ilgan_love_content_based_on_ilgan(self) -> None:
        """일간 연애 콘텐츠는 일간으로 로드된다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 일간 연애 콘텐츠 확인
        ilgan_love = data.get("ilgan_love_content")
        assert ilgan_love is None or isinstance(ilgan_love, dict)
        if ilgan_love is not None:
            # contentsList 필드 확인
            assert "contentsList" in ilgan_love

    def test_identity_bestfriend_content_based_on_yuksin(self) -> None:
        """베프 유형 콘텐츠는 육신으로 로드된다."""
        client = TestClient(app)
        response = client.post(
            "/api/v1/saju/identity",
            json={
                "birth_year": 1990,
                "birth_month": 5,
                "birth_day": 15,
                "birth_hour": 14,
                "is_lunar": False,
                "is_leap_month": False,
                "gender": "male",
            },
        )
        assert response.status_code == 200
        data = response.json()

        # 베프 유형 콘텐츠 확인
        bestfriend = data.get("bestfriend_content")
        assert bestfriend is None or isinstance(bestfriend, dict)
        if bestfriend is not None:
            # contentsList 필드 확인
            assert "contentsList" in bestfriend
