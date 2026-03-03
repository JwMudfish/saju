"""Tests for calendar conversion module - RED phase."""

from __future__ import annotations

import pytest


class TestLunarToSolar:
    """음력 -> 양력 변환 테스트."""

    def test_lunar_1984_03_15_to_solar(self) -> None:
        """음력 1984-03-15 -> 양력 1984-04-15."""
        from core.calendar import lunar_to_solar

        result = lunar_to_solar(year=1984, month=3, day=15, is_leap_month=False)
        assert result == (1984, 4, 15)

    def test_lunar_2000_01_01_to_solar(self) -> None:
        """음력 2000-01-01 -> 양력."""
        from core.calendar import lunar_to_solar

        year, month, day = lunar_to_solar(year=2000, month=1, day=1, is_leap_month=False)
        # 음력 2000-01-01 = 양력 2000-02-05 (검증값)
        assert year == 2000
        assert month == 2
        assert day == 5

    def test_lunar_non_leap_month(self) -> None:
        """비윤달 음력 변환."""
        from core.calendar import lunar_to_solar

        result = lunar_to_solar(year=1990, month=6, day=1, is_leap_month=False)
        assert isinstance(result, tuple)
        assert len(result) == 3


class TestSolarToLunar:
    """양력 -> 음력 변환 테스트."""

    def test_solar_1984_04_15_to_lunar(self) -> None:
        """양력 1984-04-15 -> 음력 1984-03-15."""
        from core.calendar import solar_to_lunar

        result = solar_to_lunar(year=1984, month=4, day=15)
        assert result == (1984, 3, 15, False)  # (year, month, day, is_leap)

    def test_solar_2000_02_05_to_lunar(self) -> None:
        """양력 2000-02-05 -> 음력 2000-01-01."""
        from core.calendar import solar_to_lunar

        year, month, day, is_leap = solar_to_lunar(year=2000, month=2, day=5)
        assert year == 2000
        assert month == 1
        assert day == 1
        assert is_leap is False


class TestCalendarErrors:
    """캘린더 변환 에러 테스트."""

    def test_invalid_solar_date_raises(self) -> None:
        """유효하지 않은 양력 날짜는 에러 발생.

        korean-lunar-calendar 지원 범위: 1000-02-13 ~ 2050-12-31
        1000-01-01은 범위 밖 -> 0,0,0 반환 -> InvalidLunarDateError
        """
        from core.calendar import solar_to_lunar
        from core.exceptions import InvalidLunarDateError

        with pytest.raises(InvalidLunarDateError):
            solar_to_lunar(year=1000, month=1, day=1)  # 지원 범위 외 (최소 1000-02-13)

    def test_invalid_lunar_date_raises(self) -> None:
        """유효하지 않은 음력 날짜는 에러 발생.

        월 13 등 명백히 잘못된 날짜.
        """
        from core.calendar import lunar_to_solar
        from core.exceptions import InvalidLunarDateError

        with pytest.raises((InvalidLunarDateError, Exception)):
            lunar_to_solar(year=1984, month=13, day=1)  # 13월은 유효하지 않음


class TestLunarSolarRoundTrip:
    """음력/양력 왕복 변환 테스트."""

    def test_roundtrip_solar_to_lunar_to_solar(self) -> None:
        """양력 -> 음력 -> 양력 왕복 변환."""
        from core.calendar import lunar_to_solar, solar_to_lunar

        original = (1984, 4, 15)
        lunar = solar_to_lunar(*original)
        back_to_solar = lunar_to_solar(lunar[0], lunar[1], lunar[2], lunar[3])
        assert back_to_solar == original

    def test_roundtrip_lunar_to_solar_to_lunar(self) -> None:
        """음력 -> 양력 -> 음력 왕복 변환."""
        from core.calendar import lunar_to_solar, solar_to_lunar

        original = (1984, 3, 15, False)
        solar = lunar_to_solar(original[0], original[1], original[2], original[3])
        back_to_lunar = solar_to_lunar(*solar)
        assert back_to_lunar[0] == original[0]  # year
        assert back_to_lunar[1] == original[1]  # month
        assert back_to_lunar[2] == original[2]  # day
        assert back_to_lunar[3] == original[3]  # is_leap
