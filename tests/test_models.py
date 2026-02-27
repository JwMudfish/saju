"""Tests for Pydantic models - RED phase."""
from __future__ import annotations

import pytest
from pydantic import ValidationError


class TestSajuRequest:
    """SajuRequest 모델 테스트."""

    def test_valid_request_male(self) -> None:
        from core.models.request import SajuRequest
        req = SajuRequest(year=1984, month=4, day=15, hour=10, gender="male")
        assert req.year == 1984
        assert req.month == 4
        assert req.day == 15
        assert req.hour == 10
        assert req.gender == "male"
        assert req.is_lunar is False
        assert req.is_leap_month is False

    def test_valid_request_female(self) -> None:
        from core.models.request import SajuRequest
        req = SajuRequest(year=1990, month=1, day=1, gender="female")
        assert req.gender == "female"
        assert req.hour is None

    def test_year_too_low(self) -> None:
        from core.models.request import SajuRequest
        with pytest.raises(ValidationError):
            SajuRequest(year=1599, month=1, day=1, gender="male")

    def test_year_too_high(self) -> None:
        from core.models.request import SajuRequest
        with pytest.raises(ValidationError):
            SajuRequest(year=2101, month=1, day=1, gender="male")

    def test_year_boundary_valid(self) -> None:
        from core.models.request import SajuRequest
        req = SajuRequest(year=1600, month=1, day=1, gender="male")
        assert req.year == 1600
        req2 = SajuRequest(year=2100, month=1, day=1, gender="male")
        assert req2.year == 2100

    def test_month_invalid(self) -> None:
        from core.models.request import SajuRequest
        with pytest.raises(ValidationError):
            SajuRequest(year=1984, month=0, day=1, gender="male")
        with pytest.raises(ValidationError):
            SajuRequest(year=1984, month=13, day=1, gender="male")

    def test_day_invalid(self) -> None:
        from core.models.request import SajuRequest
        with pytest.raises(ValidationError):
            SajuRequest(year=1984, month=1, day=0, gender="male")
        with pytest.raises(ValidationError):
            SajuRequest(year=1984, month=1, day=32, gender="male")

    def test_hour_invalid(self) -> None:
        from core.models.request import SajuRequest
        with pytest.raises(ValidationError):
            SajuRequest(year=1984, month=1, day=1, hour=-1, gender="male")
        with pytest.raises(ValidationError):
            SajuRequest(year=1984, month=1, day=1, hour=24, gender="male")

    def test_gender_invalid(self) -> None:
        from core.models.request import SajuRequest
        with pytest.raises(ValidationError):
            SajuRequest(year=1984, month=1, day=1, gender="other")

    def test_lunar_request(self) -> None:
        from core.models.request import SajuRequest
        req = SajuRequest(year=1990, month=1, day=1, gender="male", is_lunar=True)
        assert req.is_lunar is True

    def test_leap_month_request(self) -> None:
        from core.models.request import SajuRequest
        req = SajuRequest(
            year=1990, month=5, day=1, gender="male", is_lunar=True, is_leap_month=True
        )
        assert req.is_leap_month is True


class TestGanJiModel:
    """GanJi 도메인 모델 테스트."""

    def test_ganji_creation(self) -> None:
        from core.models.domain import GanJi
        ganji = GanJi(gan="갑", ji="자")
        assert ganji.gan == "갑"
        assert ganji.ji == "자"

    def test_ganji_index_gapja(self) -> None:
        from core.models.domain import GanJi
        ganji = GanJi(gan="갑", ji="자")
        assert ganji.index == 0

    def test_ganji_index_gyehae(self) -> None:
        from core.models.domain import GanJi
        ganji = GanJi(gan="계", ji="해")
        assert ganji.index == 59

    def test_ganji_index_eulchuk(self) -> None:
        from core.models.domain import GanJi
        ganji = GanJi(gan="을", ji="축")
        assert ganji.index == 1

    def test_ganji_equality(self) -> None:
        from core.models.domain import GanJi
        g1 = GanJi(gan="갑", ji="자")
        g2 = GanJi(gan="갑", ji="자")
        assert g1 == g2


class TestHiddenStemsModel:
    """HiddenStems 지장간 모델 테스트."""

    def test_hidden_stems_with_middle(self) -> None:
        from core.models.domain import HiddenStems
        hs = HiddenStems(initial="계", middle="신", main="기")
        assert hs.initial == "계"
        assert hs.middle == "신"
        assert hs.main == "기"

    def test_hidden_stems_without_middle(self) -> None:
        from core.models.domain import HiddenStems
        hs = HiddenStems(initial="임", middle=None, main="계")
        assert hs.middle is None

    def test_hidden_stems_field_naming(self) -> None:
        from core.models.domain import HiddenStems
        hs = HiddenStems(initial="무", middle="병", main="갑")
        assert hasattr(hs, "initial")
        assert hasattr(hs, "middle")
        assert hasattr(hs, "main")


class TestFourPillarsModel:
    """FourPillars 응답 모델 테스트."""

    def test_four_pillars_creation(self) -> None:
        from core.models.domain import GanJi
        from core.models.response import FourPillars
        fp = FourPillars(
            year_pillar=GanJi(gan="갑", ji="자"),
            month_pillar=GanJi(gan="병", ji="진"),
            day_pillar=GanJi(gan="경", ji="술"),
            hour_pillar=GanJi(gan="무", ji="오"),
        )
        assert fp.year_pillar.gan == "갑"
        assert fp.month_pillar.gan == "병"
        assert fp.day_pillar.gan == "경"
        assert fp.hour_pillar is not None
        assert fp.hour_pillar.gan == "무"

    def test_four_pillars_without_hour(self) -> None:
        from core.models.domain import GanJi
        from core.models.response import FourPillars
        fp = FourPillars(
            year_pillar=GanJi(gan="갑", ji="자"),
            month_pillar=GanJi(gan="병", ji="진"),
            day_pillar=GanJi(gan="경", ji="술"),
        )
        assert fp.hour_pillar is None


class TestOHangRatioModel:
    """OHangRatio 오행 비율 모델 테스트."""

    def test_valid_ohang_ratio(self) -> None:
        from core.models.domain import OHangRatio
        ratio = OHangRatio(mok=20.0, hwa=20.0, to=20.0, geum=20.0, su=20.0)
        assert ratio.mok == 20.0

    def test_ohang_ratio_total_must_be_100(self) -> None:
        from core.models.domain import OHangRatio
        with pytest.raises(Exception):
            OHangRatio(mok=10.0, hwa=10.0, to=10.0, geum=10.0, su=10.0)
