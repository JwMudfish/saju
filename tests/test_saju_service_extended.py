"""SajuService 확장 필드 테스트."""

from __future__ import annotations

import pytest

from app.services.saju_service import SajuService


@pytest.fixture
def service() -> SajuService:
    """SajuService 인스턴스."""
    return SajuService()


@pytest.fixture
def result_with_hour(service: SajuService):
    """시주 있는 사주 결과 (1990-01-01, 12시, 남성)."""
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
def result_without_hour(service: SajuService):
    """시주 없는 사주 결과 (1990-01-01, 시각 미상, 남성)."""
    return service.calculate(
        birth_year=1990,
        birth_month=1,
        birth_day=1,
        birth_hour=None,
        is_lunar=False,
        is_leap_month=False,
        gender="male",
    )


class TestSajuResultNewFields:
    """SajuResult에 신규 필드가 포함되는지 검증."""

    def test_jijanggan_is_present(self, result_with_hour) -> None:
        """jijanggan 필드가 None이 아니다."""
        assert result_with_hour.jijanggan is not None

    def test_yuksin_list_is_present(self, result_with_hour) -> None:
        """yuksin_list 필드가 None이 아니다."""
        assert result_with_hour.yuksin_list is not None

    def test_ohang_ratio_is_present(self, result_with_hour) -> None:
        """ohang_ratio 필드가 None이 아니다."""
        assert result_with_hour.ohang_ratio is not None

    def test_sibiunsung_is_present(self, result_with_hour) -> None:
        """sibiunsung 필드가 None이 아니다."""
        assert result_with_hour.sibiunsung is not None

    def test_shinsal_is_present(self, result_with_hour) -> None:
        """shinsal 필드가 None이 아니다 (빈 목록일 수 있음)."""
        assert result_with_hour.shinsal is not None

    def test_sewun_is_present(self, result_with_hour) -> None:
        """sewun 필드가 None이 아니다."""
        assert result_with_hour.sewun is not None

    def test_pillar_meanings_is_present(self, result_with_hour) -> None:
        """pillar_meanings 필드가 None이 아니다."""
        assert result_with_hour.pillar_meanings is not None


class TestJijanggan:
    """jijanggan 필드 상세 검증."""

    def test_jijanggan_has_year_month_day_hour_keys_with_hour(self, result_with_hour) -> None:
        """시주 있을 때 year/month/day/hour 키가 모두 있다."""
        keys = set(result_with_hour.jijanggan.keys())
        assert {"year", "month", "day", "hour"} == keys

    def test_jijanggan_has_year_month_day_keys_without_hour(self, result_without_hour) -> None:
        """시주 없을 때 year/month/day 키만 있다."""
        keys = set(result_without_hour.jijanggan.keys())
        assert {"year", "month", "day"} == keys

    def test_jijanggan_values_have_main_field(self, result_with_hour) -> None:
        """각 지장간 값에 main 필드가 있다."""
        for value in result_with_hour.jijanggan.values():
            assert hasattr(value, "main")
            assert value.main is not None


class TestYuksinList:
    """yuksin_list 필드 상세 검증."""

    def test_yuksin_list_with_hour_has_seven_or_more_items(self, result_with_hour) -> None:
        """시주 있을 때 최소 7개 항목이 있다 (천간 3개 + 지지 4개)."""
        assert len(result_with_hour.yuksin_list) >= 7

    def test_yuksin_list_without_hour_has_five_items(self, result_without_hour) -> None:
        """시주 없을 때 5개 항목이 있다 (천간 2개 + 지지 3개)."""
        assert len(result_without_hour.yuksin_list) == 5

    def test_yuksin_list_items_have_target_and_yuksin(self, result_with_hour) -> None:
        """각 항목에 target과 yuksin 필드가 있다."""
        valid_yuksin = {
            "비견",
            "겁재",
            "식신",
            "상관",
            "편재",
            "정재",
            "편관",
            "정관",
            "편인",
            "정인",
        }
        for item in result_with_hour.yuksin_list:
            assert item.target is not None
            assert item.yuksin in valid_yuksin, f"유효하지 않은 육신: {item.yuksin}"


class TestOhangRatio:
    """ohang_ratio 필드 상세 검증."""

    def test_ohang_ratio_sums_to_100(self, result_with_hour) -> None:
        """오행 비율 합이 100이다."""
        r = result_with_hour.ohang_ratio
        total = r.mok + r.hwa + r.to + r.geum + r.su
        assert abs(total - 100.0) < 0.1

    def test_ohang_ratio_all_non_negative(self, result_with_hour) -> None:
        """오행 비율은 모두 0 이상이다."""
        r = result_with_hour.ohang_ratio
        assert r.mok >= 0
        assert r.hwa >= 0
        assert r.to >= 0
        assert r.geum >= 0
        assert r.su >= 0

    def test_ohang_ratio_sums_to_100_without_hour(self, result_without_hour) -> None:
        """시주 없을 때도 오행 비율 합이 100이다."""
        r = result_without_hour.ohang_ratio
        total = r.mok + r.hwa + r.to + r.geum + r.su
        assert abs(total - 100.0) < 0.1


class TestSibiunsung:
    """sibiunsung 필드 상세 검증."""

    def test_sibiunsung_with_hour_has_four_items(self, result_with_hour) -> None:
        """시주 있을 때 4개 항목이 있다."""
        assert len(result_with_hour.sibiunsung) == 4

    def test_sibiunsung_without_hour_has_three_items(self, result_without_hour) -> None:
        """시주 없을 때 3개 항목이 있다."""
        assert len(result_without_hour.sibiunsung) == 3

    def test_sibiunsung_no_hour_item_without_hour(self, result_without_hour) -> None:
        """시주 없을 때 hour 기둥 항목이 없다."""
        pillars = [item.pillar for item in result_without_hour.sibiunsung]
        assert "hour" not in pillars

    def test_sibiunsung_has_valid_stages(self, result_with_hour) -> None:
        """모든 십이운성 단계가 유효하다."""
        from core.sibiunsung import SIBI_UNSUNG_STAGES

        for item in result_with_hour.sibiunsung:
            assert item.stage in SIBI_UNSUNG_STAGES


class TestShinsal:
    """shinsal 필드 상세 검증."""

    def test_shinsal_is_list(self, result_with_hour) -> None:
        """shinsal은 리스트다."""
        assert isinstance(result_with_hour.shinsal, list)

    def test_shinsal_items_have_name_and_trigger_ji(self, result_with_hour) -> None:
        """신살 항목에 name과 trigger_ji가 있다."""
        for item in result_with_hour.shinsal:
            assert item.name is not None
            assert item.trigger_ji is not None


class TestSewun:
    """sewun 필드 상세 검증."""

    def test_sewun_has_eleven_items(self, result_with_hour) -> None:
        """sewun은 11개 항목이다."""
        assert len(result_with_hour.sewun) == 11

    def test_sewun_has_exactly_one_current_item(self, result_with_hour) -> None:
        """is_current=True인 항목은 정확히 1개다."""
        current_items = [item for item in result_with_hour.sewun if item.is_current]
        assert len(current_items) == 1


class TestPillarMeanings:
    """pillar_meanings 필드 상세 검증."""

    def test_pillar_meanings_with_hour_has_four_items(self, result_with_hour) -> None:
        """시주 있을 때 4개 기둥 의미가 있다."""
        assert len(result_with_hour.pillar_meanings) == 4

    def test_pillar_meanings_without_hour_has_three_items(self, result_without_hour) -> None:
        """시주 없을 때 3개 기둥 의미가 있다 (시주 제외)."""
        assert len(result_without_hour.pillar_meanings) == 3

    def test_pillar_meanings_no_hour_entry_without_hour(self, result_without_hour) -> None:
        """시주 없을 때 hour 항목이 없다."""
        pillars = [m.pillar for m in result_without_hour.pillar_meanings]
        assert "hour" not in pillars

    def test_pillar_meanings_have_label_and_meaning(self, result_with_hour) -> None:
        """각 기둥 의미에 label과 meaning이 있다."""
        for m in result_with_hour.pillar_meanings:
            assert m.label is not None
            assert m.meaning is not None
