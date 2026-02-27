"""Tests for solar_term module - RED phase."""
from __future__ import annotations

from datetime import datetime

import pytest


class TestJulgiLoading:
    """julgi.json 로딩 테스트."""

    def test_julgi_loads_successfully(self) -> None:
        from core.solar_term import get_julgi_cache
        cache = get_julgi_cache()
        assert cache is not None
        assert len(cache) > 0

    def test_cache_is_singleton(self) -> None:
        """두 번 호출하면 같은 객체를 반환해야 합니다."""
        from core.solar_term import get_julgi_cache
        cache1 = get_julgi_cache()
        cache2 = get_julgi_cache()
        assert cache1 is cache2

    def test_julgi_has_entries_for_1984(self) -> None:
        from core.solar_term import get_julgi_cache
        cache = get_julgi_cache()
        assert 1984 in cache

    def test_julgi_has_12_entries_per_year(self) -> None:
        """절입은 연도당 12개 (소한, 입춘, ..., 대설)."""
        from core.solar_term import get_julgi_cache
        cache = get_julgi_cache()
        assert len(cache[1984]) == 12


class TestGetSolarTermEntry:
    """절입 시각 조회 테스트."""

    def test_get_solar_term_entry_returns_datetime(self) -> None:
        from core.solar_term import get_solar_term_entry
        entry = get_solar_term_entry(1984, 4)  # 4월 절입
        assert isinstance(entry, datetime)

    def test_1984_march_solar_term_is_march(self) -> None:
        """1984년 3월 절입은 경칩 - 3월 중 날짜여야 함."""
        from core.solar_term import get_solar_term_entry
        entry = get_solar_term_entry(1984, 3)
        assert entry.year == 1984
        assert entry.month == 3

    def test_solar_term_not_found_for_year_1599(self) -> None:
        from core.exceptions import SolarTermNotFoundError
        from core.solar_term import get_solar_term_entry
        with pytest.raises(SolarTermNotFoundError):
            get_solar_term_entry(1599, 1)

    def test_1900_january_solar_term(self) -> None:
        """1900년 1월 절입 (소한) 확인."""
        from core.solar_term import get_solar_term_entry
        entry = get_solar_term_entry(1900, 1)
        assert entry.year == 1900
        assert entry.month == 1
        assert entry.day == 6  # 1900-01-06


class TestDetermineMonthForPillar:
    """절입 기준 월주 계산 테스트."""

    def test_birth_after_solar_term_stays_in_month(self) -> None:
        """절입 이후 출생이면 해당 월로 확정."""
        from core.solar_term import determine_month_for_pillar
        # 1984-04-15 10:00 - 4월 절입(청명) 이후
        birth_dt = datetime(1984, 4, 15, 10, 0)
        month, year = determine_month_for_pillar(birth_dt)
        assert month == 4
        assert year == 1984

    def test_birth_in_january_before_ipchun_goes_to_previous_year(self) -> None:
        """1월생이면 입춘 이전이므로 전년 12월로."""
        from core.solar_term import determine_month_for_pillar
        # 1984-01-01 - 입춘 이전이므로 1983년 12월
        birth_dt = datetime(1984, 1, 1, 0, 0)
        month, year = determine_month_for_pillar(birth_dt)
        # 1월은 항상 이전 년도의 12월로 처리 (manse_ori 로직)
        assert month == 12
        assert year == 1983
