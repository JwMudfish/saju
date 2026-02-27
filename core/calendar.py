"""Calendar conversion module for saju calculation engine.

Provides lunar <-> solar date conversion using the korean-lunar-calendar library.
"""
from __future__ import annotations

from korean_lunar_calendar import KoreanLunarCalendar

from core.exceptions import InvalidLunarDateError


def lunar_to_solar(
    year: int,
    month: int,
    day: int,
    is_leap_month: bool = False,
) -> tuple[int, int, int]:
    """음력 날짜를 양력으로 변환합니다.

    Args:
        year: 음력 연도
        month: 음력 월 (1-12)
        day: 음력 일 (1-30)
        is_leap_month: 윤달 여부 (기본값 False)

    Returns:
        (solar_year, solar_month, solar_day) 튜플

    Raises:
        InvalidLunarDateError: 유효하지 않은 음력 날짜
    """
    cal = KoreanLunarCalendar()
    try:
        cal.setLunarDate(year, month, day, is_leap_month)
        solar_year = cal.solarYear
        solar_month = cal.solarMonth
        solar_day = cal.solarDay
        if solar_year == 0 or solar_month == 0 or solar_day == 0:
            raise InvalidLunarDateError(year=year, month=month, day=day, is_leap=is_leap_month)
        return (solar_year, solar_month, solar_day)
    except InvalidLunarDateError:
        raise
    except Exception as exc:
        raise InvalidLunarDateError(
            year=year, month=month, day=day, is_leap=is_leap_month
        ) from exc


def solar_to_lunar(
    year: int,
    month: int,
    day: int,
) -> tuple[int, int, int, bool]:
    """양력 날짜를 음력으로 변환합니다.

    Args:
        year: 양력 연도
        month: 양력 월 (1-12)
        day: 양력 일 (1-31)

    Returns:
        (lunar_year, lunar_month, lunar_day, is_leap_month) 튜플

    Raises:
        InvalidLunarDateError: 유효하지 않은 양력 날짜
    """
    cal = KoreanLunarCalendar()
    try:
        cal.setSolarDate(year, month, day)
        lunar_year = cal.lunarYear
        lunar_month = cal.lunarMonth
        lunar_day = cal.lunarDay
        if lunar_year == 0 or lunar_month == 0 or lunar_day == 0:
            raise InvalidLunarDateError(year=year, month=month, day=day)
        return (
            lunar_year,
            lunar_month,
            lunar_day,
            bool(cal.isIntercalation),
        )
    except InvalidLunarDateError:
        raise
    except Exception as exc:
        raise InvalidLunarDateError(
            year=year, month=month, day=day
        ) from exc
