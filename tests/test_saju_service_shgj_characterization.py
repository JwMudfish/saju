"""Characterization tests for SajuService shgj integration - PRESERVE phase.

These tests capture the current behavior of SajuService before integrating shgj.
They verify that existing behavior remains unchanged after the integration.
"""

from __future__ import annotations

import pytest

from app.services.saju_service import SajuService


@pytest.fixture
def service() -> SajuService:
    """SajuService 인스턴스."""
    return SajuService()


@pytest.fixture
def result_1990_male(service: SajuService):
    """1990년생 남성 사주 결과 (시주 있음)."""
    return service.calculate(
        birth_year=1990,
        birth_month=1,
        birth_day=1,
        birth_hour=12,
        is_lunar=False,
        is_leap_month=False,
        gender="male",
    )


@pytest.fixture
def result_1990_male_no_hour(service: SajuService):
    """1990년생 남성 사주 결과 (시주 없음)."""
    return service.calculate(
        birth_year=1990,
        birth_month=1,
        birth_day=1,
        birth_hour=None,
        is_lunar=False,
        is_leap_month=False,
        gender="male",
    )


class TestSajuServiceBehaviorPreservation:
    """기존 SajuService 동작 보존 검증."""

    def test_four_pillars_calculated(self, result_1990_male) -> None:
        """사주 사기둥이 계산된다."""
        assert result_1990_male.year_pillar is not None
        assert result_1990_male.month_pillar is not None
        assert result_1990_male.day_pillar is not None
        assert result_1990_male.hour_pillar is not None

    def test_deun_calculated(self, result_1990_male) -> None:
        """대운이 계산된다."""
        assert result_1990_male.deun is not None
        assert result_1990_male.deun.deun_list is not None
        assert len(result_1990_male.deun.deun_list) == 10

    def test_jijinggaan_calculated(self, result_1990_male) -> None:
        """지장간이 계산된다."""
        assert result_1990_male.jijanggan is not None
        assert "year" in result_1990_male.jijanggan
        assert "month" in result_1990_male.jijanggan
        assert "day" in result_1990_male.jijanggan
        assert "hour" in result_1990_male.jijanggan

    def test_yuksin_list_calculated(self, result_1990_male) -> None:
        """육신 리스트가 계산된다."""
        assert result_1990_male.yuksin_list is not None
        assert len(result_1990_male.yuksin_list) >= 7

    def test_ohang_ratio_calculated(self, result_1990_male) -> None:
        """오행 비율이 계산된다."""
        assert result_1990_male.ohang_ratio is not None
        total = (
            result_1990_male.ohang_ratio.mok
            + result_1990_male.ohang_ratio.hwa
            + result_1990_male.ohang_ratio.to
            + result_1990_male.ohang_ratio.geum
            + result_1990_male.ohang_ratio.su
        )
        assert abs(total - 100.0) < 0.1

    def test_sibiunsung_calculated(self, result_1990_male) -> None:
        """십이운성이 계산된다."""
        assert result_1990_male.sibiunsung is not None
        assert len(result_1990_male.sibiunsung) == 4

    def test_shinsal_calculated(self, result_1990_male) -> None:
        """신살이 계산된다."""
        assert result_1990_male.shinsal is not None
        assert isinstance(result_1990_male.shinsal, list)

    def test_sewun_calculated(self, result_1990_male) -> None:
        """세운이 계산된다."""
        assert result_1990_male.sewun is not None
        assert len(result_1990_male.sewun) == 11
        current_items = [item for item in result_1990_male.sewun if item.is_current]
        assert len(current_items) == 1

    def test_pillar_meanings_calculated(self, result_1990_male) -> None:
        """기둥별 의미가 계산된다."""
        assert result_1990_male.pillar_meanings is not None
        assert len(result_1990_male.pillar_meanings) == 4

    def test_hapchung_calculated(self, result_1990_male) -> None:
        """합충형해파가 계산된다."""
        assert result_1990_male.hapchung is not None
        assert isinstance(result_1990_male.hapchung, list)

    def test_yongshin_calculated(self, result_1990_male) -> None:
        """용신이 계산된다."""
        assert result_1990_male.yongshin is not None
        assert result_1990_male.yongshin.dang_ryeong is not None
        assert result_1990_male.yongshin.heuisin is not None


class TestSajuServiceNoHourBehavior:
    """시주 없는 경우의 동작 보존 검증."""

    def test_no_hour_pillar(self, result_1990_male_no_hour) -> None:
        """시주가 None이다."""
        assert result_1990_male_no_hour.hour_pillar is None

    def test_no_hour_jijinggaan(self, result_1990_male_no_hour) -> None:
        """시주 지장간이 없다."""
        assert "hour" not in result_1990_male_no_hour.jijanggan

    def test_no_hour_sibiunsung(self, result_1990_male_no_hour) -> None:
        """시주 십이운성이 없다."""
        hour_items = [
            item for item in result_1990_male_no_hour.sibiunsung if item.pillar == "hour"
        ]
        assert len(hour_items) == 0

    def test_no_hour_pillar_meanings(self, result_1990_male_no_hour) -> None:
        """시주 기둥 의미가 없다."""
        hour_meanings = [
            m for m in result_1990_male_no_hour.pillar_meanings if m.pillar == "hour"
        ]
        assert len(hour_meanings) == 0


class TestSajuServiceResultStructure:
    """SajuResult 구조 검증."""

    def test_result_has_all_required_fields(self, result_1990_male) -> None:
        """SajuResult에 모든 필드가 있다."""
        # 기본 필드
        assert hasattr(result_1990_male, "year_pillar")
        assert hasattr(result_1990_male, "month_pillar")
        assert hasattr(result_1990_male, "day_pillar")
        assert hasattr(result_1990_male, "hour_pillar")

        # 계산 필드
        assert hasattr(result_1990_male, "deun")
        assert hasattr(result_1990_male, "jijanggan")
        assert hasattr(result_1990_male, "yuksin_list")
        assert hasattr(result_1990_male, "ohang_ratio")
        assert hasattr(result_1990_male, "sibiunsung")
        assert hasattr(result_1990_male, "shinsal")
        assert hasattr(result_1990_male, "sewun")
        assert hasattr(result_1990_male, "pillar_meanings")
        assert hasattr(result_1990_male, "hapchung")
        assert hasattr(result_1990_male, "yongshin")

    def test_shgj_field_now_exists_in_result(self, result_1990_male) -> None:
        """shgj 필드가 SajuResult에 추가되었다."""
        assert hasattr(result_1990_male, "shgj")
        # ShgjResult 또는 None (계산 실패 시)
        assert result_1990_male.shgj is None or hasattr(result_1990_male.shgj, "sangsin")
