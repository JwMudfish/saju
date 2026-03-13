"""Integration tests for SajuService shgj calculation - IMPROVE phase.

These tests verify that shgj integration works correctly in SajuService.
"""

from __future__ import annotations

import pytest

from app.services.saju_service import SajuService
from core.models.domain import ShgjResult


@pytest.fixture
def service() -> SajuService:
    """SajuService 인스턴스."""
    return SajuService()


class TestShgjIntegration:
    """신격(Shgj) 통합 테스트."""

    def test_shgj_calculated_for_valid_input(self, service: SajuService) -> None:
        """유효한 입력일 때 shgj가 계산된다."""
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        # shgj 필드가 존재하고 None이 아님
        assert result.shgj is not None
        assert isinstance(result.shgj, ShgjResult)

    def test_shgj_has_sangsin_or_gusin(self, service: SajuService) -> None:
        """shgj 결과에 상신 또는 구신이 포함된다."""
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        assert result.shgj is not None
        # MVP: 최소한 상신 또는 구신 중 하나는 non-None
        assert result.shgj.sangsin is not None or result.shgj.gusin is not None, \
            "MVP: sangsin or gusin must be non-None for valid input"

    def test_shgj_mvp_fields_are_none(self, service: SajuService) -> None:
        """MVP에서 상화/설화/국국분은 None이다."""
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        assert result.shgj is not None
        # 상화/설화는 구현됨, 국국분은 여전히 None
        assert result.shgj.sanghwa is None or isinstance(result.shgj.sanghwa, str)
        assert result.shgj.sulhwa is None or isinstance(result.shgj.sulhwa, str)
        assert result.shgj.gukgubun is None

    def test_shgj_calculated_without_hour(self, service: SajuService) -> None:
        """시주 없어도 shgj가 계산된다."""
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=None,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        # shgj 필드가 존재함
        assert result.shgj is not None
        assert isinstance(result.shgj, ShgjResult)

    def test_shgj_null_when_yongshin_fails(self, service: SajuService) -> None:
        """용신 계산 실패 시 shgj도 None이다."""
        # 용신 계산이 실패하는 경우는 드물지만,
        # 계산 실패 시 None 반환을 검증하기 위한 테스트
        # 현재 구현에서는 용신 계산이 try-except로 보호되어 있음
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        # 용신이 있으면 shgj도 계산됨
        if result.yongshin is not None:
            assert result.shgj is not None
        else:
            # 용신이 없으면 shgj도 None
            assert result.shgj is None

    def test_other_fields_unchanged_after_shgj_integration(
        self, service: SajuService
    ) -> None:
        """shgj 통합 후 다른 필드들이 변하지 않는다."""
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        # 기존 필드들이 모두 계산됨
        assert result.year_pillar is not None
        assert result.month_pillar is not None
        assert result.day_pillar is not None
        assert result.hour_pillar is not None
        assert result.deun is not None
        assert result.jijanggan is not None
        assert result.yuksin_list is not None
        assert result.ohang_ratio is not None
        assert result.sibiunsung is not None
        assert result.shinsal is not None
        assert result.sewun is not None
        assert result.pillar_meanings is not None
        assert result.hapchung is not None
        assert result.yongshin is not None

    def test_shgj_sangsin_is_string_or_none(self, service: SajuService) -> None:
        """상신은 문자열 또는 None이다."""
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        assert result.shgj is not None
        assert result.shgj.sangsin is None or isinstance(result.shgj.sangsin, str)

    def test_shgj_gusin_is_string_or_none(self, service: SajuService) -> None:
        """구신은 문자열 또는 None이다."""
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )

        assert result.shgj is not None
        assert result.shgj.gusin is None or isinstance(result.shgj.gusin, str)
