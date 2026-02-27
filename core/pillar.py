"""Pillar (사주 기둥) calculation module.

Based on manse_ori pillar calculation logic.
Calculates the four pillars (년주, 월주, 일주, 시주) for a given birth date.
"""
from __future__ import annotations

from core.constants import (
    DAY_MONTH_SUM,
    HOUR_SKY_BYONGSIN,
    HOUR_SKY_GABGI,
    HOUR_SKY_JUNGIM,
    HOUR_SKY_MUJE,
    HOUR_SKY_ULGUNG,
    JI_LIST,
    MONTH_LAND_MAP,
    MONTH_SKY_BYONGSIN,
    MONTH_SKY_GABGI,
    MONTH_SKY_JUNGIM,
    MONTH_SKY_MUJE,
    MONTH_SKY_ULGUNG,
    YEAR_LAND_MAP,
    YEAR_SKY_MAP,
)
from core.models.domain import GanJi
from core.models.request import SajuRequest
from core.models.response import FourPillars
from core.solar_term import determine_month_for_pillar

# 일주 천간 배열 - manse_ori dayPillarSky.js
_DAY_SKY = ("갑", "을", "병", "정", "무", "기", "경", "신", "임", "계")

# 일주 지지 배열 - manse_ori dayPillarLand.js
_DAY_LAND = ("술", "해", "자", "축", "인", "묘", "진", "사", "오", "미", "신", "유")


def calc_year_pillar(year: int) -> GanJi:
    """년주를 계산합니다.

    Args:
        year: 연도 (양력)

    Returns:
        년주 GanJi
    """
    gan = YEAR_SKY_MAP[year % 10]
    ji = YEAR_LAND_MAP[year % 12]
    return GanJi(gan=gan, ji=ji)


def calc_month_pillar(month: int, year_gan: str) -> GanJi:
    """월주를 계산합니다.

    Args:
        month: 월 (1-12, 또는 13=입춘 이전 1월을 전년 13월로 처리)
        year_gan: 년주 천간

    Returns:
        월주 GanJi
    """
    # Month land (지지) - fixed per month
    # month 13 represents the following January (treated as 1월 for land)
    effective_month = month if month <= 12 else 1
    ji = MONTH_LAND_MAP[effective_month]

    # Month sky (천간) based on year_gan group
    # manse_ori: if month==1, treat as 13 for index calculation
    idx_month = month if month != 1 else 13

    # Index into sky arrays: starts at month 2 (index 0), so idx = idx_month - 2
    sky_idx = idx_month - 2

    if year_gan in ("갑", "기"):
        gan = MONTH_SKY_GABGI[sky_idx]
    elif year_gan in ("을", "경"):
        gan = MONTH_SKY_ULGUNG[sky_idx]
    elif year_gan in ("병", "신"):
        gan = MONTH_SKY_BYONGSIN[sky_idx]
    elif year_gan in ("정", "임"):
        gan = MONTH_SKY_JUNGIM[sky_idx]
    elif year_gan in ("무", "계"):
        gan = MONTH_SKY_MUJE[sky_idx]
    else:
        gan = ""

    return GanJi(gan=gan, ji=ji)


def _get_hour_index(hour: int, minute: int) -> int:
    """시각으로부터 시간대 인덱스를 반환합니다.

    manse_ori hourPillarLand.js 로직:
    - 자시: 23:30 ~ 01:29 (index 0)
    - 축시: 01:30 ~ 03:29 (index 1)
    - 인시: 03:30 ~ 05:29 (index 2)
    - 묘시: 05:30 ~ 07:29 (index 3)
    - 진시: 07:30 ~ 09:29 (index 4)
    - 사시: 09:30 ~ 11:29 (index 5)
    - 오시: 11:30 ~ 13:29 (index 6)
    - 미시: 13:30 ~ 15:29 (index 7)
    - 신시: 15:30 ~ 17:29 (index 8)
    - 유시: 17:30 ~ 19:29 (index 9)
    - 술시: 19:30 ~ 21:29 (index 10)
    - 해시: 21:30 ~ 23:29 (index 11)

    Args:
        hour: 시 (0-23)
        minute: 분 (0-59)

    Returns:
        시간대 인덱스 (0-11)
    """
    total_min = hour * 60 + minute

    # 자시: 23:30(1410) ~ 01:29(89)
    if total_min >= 1410 or total_min < 90:
        return 0  # 자
    elif total_min < 210:
        return 1  # 축 (01:30~03:29)
    elif total_min < 330:
        return 2  # 인 (03:30~05:29)
    elif total_min < 450:
        return 3  # 묘 (05:30~07:29)
    elif total_min < 570:
        return 4  # 진 (07:30~09:29)
    elif total_min < 690:
        return 5  # 사 (09:30~11:29)
    elif total_min < 810:
        return 6  # 오 (11:30~13:29)
    elif total_min < 930:
        return 7  # 미 (13:30~15:29)
    elif total_min < 1050:
        return 8  # 신 (15:30~17:29)
    elif total_min < 1170:
        return 9  # 유 (17:30~19:29)
    elif total_min < 1290:
        return 10  # 술 (19:30~21:29)
    else:
        return 11  # 해 (21:30~23:29)


def calc_hour_pillar(
    hour: int | None, minute: int | None, day_gan: str
) -> GanJi | None:
    """시주를 계산합니다.

    Args:
        hour: 시 (0-23), None이면 시각 미상
        minute: 분 (0-59), None이면 시각 미상
        day_gan: 일주 천간

    Returns:
        시주 GanJi, 또는 시각 미상이면 None
    """
    if hour is None or minute is None:
        return None

    hour_idx = _get_hour_index(hour, minute)
    ji = JI_LIST[hour_idx]

    # Determine sky based on day_gan group
    if day_gan in ("갑", "기"):
        gan = HOUR_SKY_GABGI[hour_idx]
    elif day_gan in ("을", "경"):
        gan = HOUR_SKY_ULGUNG[hour_idx]
    elif day_gan in ("병", "신"):
        gan = HOUR_SKY_BYONGSIN[hour_idx]
    elif day_gan in ("정", "임"):
        gan = HOUR_SKY_JUNGIM[hour_idx]
    elif day_gan in ("무", "계"):
        gan = HOUR_SKY_MUJE[hour_idx]
    else:
        gan = ""

    return GanJi(gan=gan, ji=ji)


def calc_day_pillar(
    day: int, year: int, month: int,
    hour: int | None, minute: int | None
) -> GanJi:
    """일주를 계산합니다.

    manse_ori daypillar.js 로직:
    - totalNumber = (year-1900)*5 + floor((year-1900)/4) + monthSum[month-1] + day-1
    - 윤년 1/2월 보정: month in (1,2) and year%4==0 -> totalNumber -= 1
    - 23:30 이후 자시 보정: totalNumber += 1

    Args:
        day: 일 (1-31)
        year: 연도
        month: 월 (1-12)
        hour: 시 (0-23), None이면 미상
        minute: 분 (0-59), None이면 미상

    Returns:
        일주 GanJi
    """
    after_standard = year - 1900
    yun_count = after_standard // 4

    total_number = (
        after_standard * 5
        + yun_count
        + DAY_MONTH_SUM[month - 1]
        + (day - 1)
    )

    # Leap year correction for January/February
    if (month == 1 or month == 2) and (year % 4 == 0):
        total_number -= 1

    # Midnight (23:30) correction - 자시 보정
    if hour is not None and minute is not None:
        total_min = hour * 60 + minute
        if total_min >= 1410:  # >= 23:30
            total_number += 1

    gan = _DAY_SKY[total_number % 10]
    ji = _DAY_LAND[total_number % 12]
    return GanJi(gan=gan, ji=ji)


def calc_four_pillars(request: SajuRequest) -> FourPillars:
    """사주 사기둥을 계산합니다.

    Args:
        request: SajuRequest (양력 날짜 기준, 음력인 경우 미리 변환된 양력 사용)

    Returns:
        FourPillars (년주, 월주, 일주, 시주)
    """
    from datetime import datetime

    year = request.year
    month = request.month
    day = request.day
    hour = request.hour
    minute = 0  # minute은 현재 request에 없으므로 0으로 처리

    # Determine effective year/month considering solar term (절입)
    birth_dt = datetime(year, month, day, hour if hour is not None else 12, minute)
    effective_month, effective_year = determine_month_for_pillar(birth_dt)

    # Year pillar
    # If birth is before 입춘 in a new year, use previous year
    # (manse_ori: month==1 or (2월 and before 절입) -> year-1)
    pillar_year = effective_year

    year_pillar = calc_year_pillar(pillar_year)

    # Month pillar
    # Use effective_month - handle the case where effective_month=12 from previous year
    month_pillar = calc_month_pillar(month=effective_month, year_gan=year_pillar.gan)

    # Day pillar
    day_pillar = calc_day_pillar(
        day=day, year=year, month=month, hour=hour, minute=minute if hour is not None else None
    )

    # Hour pillar
    hour_pillar = calc_hour_pillar(
        hour=hour, minute=minute if hour is not None else None, day_gan=day_pillar.gan
    )

    return FourPillars(
        year_pillar=year_pillar,
        month_pillar=month_pillar,
        day_pillar=day_pillar,
        hour_pillar=hour_pillar,
    )
