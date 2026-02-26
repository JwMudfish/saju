"""Deun (대운, Major Fortune Period) calculation module.

Based on manse_ori deun.js.
Calculates the direction (banghyang), starting age (deun_su),
and the 10 major fortune periods for a given birth chart.
"""
from datetime import datetime
from typing import Literal

from core.constants import YEAR_SKY_MAP
from core.models.domain import DeunItem
from core.models.request import SajuRequest
from core.models.response import DeunResult
from core.ohang import is_yang
from core.pillar import calc_month_pillar
from core.solar_term import get_julgi_cache


def calc_deun_banghyang(
    gender: Literal["male", "female"],
    year_gan: str,
) -> str:
    """대운방향을 계산합니다.

    manse_ori deun.js deunBanghyang 함수 기반:
    - 남성 + 양년 = 순행
    - 남성 + 음년 = 역행
    - 여성 + 양년 = 역행
    - 여성 + 음년 = 순행

    Args:
        gender: 성별 ("male" or "female")
        year_gan: 년주 천간

    Returns:
        "순행" or "역행"
    """
    year_is_yang = is_yang(year_gan)

    if gender == "male":
        return "순행" if year_is_yang else "역행"
    else:
        return "역행" if year_is_yang else "순행"


def _get_adjacent_solar_terms(birth_dt: datetime) -> tuple[datetime, datetime]:
    """출생 시각 기준 이전/이후 절입 시각을 반환합니다.

    Args:
        birth_dt: 출생 datetime

    Returns:
        (current_julib, next_julib) tuple
    """
    cache = get_julgi_cache()

    # Collect all solar term datetimes sorted
    all_terms: list[datetime] = []
    for terms in cache.values():
        all_terms.extend(terms)
    all_terms.sort()

    current_julib = all_terms[0]
    next_julib = all_terms[1]

    for i, term_dt in enumerate(all_terms):
        if term_dt <= birth_dt:
            current_julib = term_dt
            if i + 1 < len(all_terms):
                next_julib = all_terms[i + 1]
        else:
            break

    return current_julib, next_julib


def calc_deun_su(birth_dt: datetime, banghyang: str) -> int:
    """대운수를 계산합니다.

    manse_ori deun.js deunSu 함수 기반:
    - 순행: (다음 절입 - 출생) 분 / 4320, 반올림, 최소 1
    - 역행: (출생 - 현재 절입) 분 / 4320, 반올림, 최소 1
    - 3일(4320분) = 1년 기준

    Args:
        birth_dt: 출생 datetime
        banghyang: "순행" or "역행"

    Returns:
        대운수 (시작 나이)
    """
    current_julib, next_julib = _get_adjacent_solar_terms(birth_dt)

    if banghyang == "순행":
        diff_minutes = round((next_julib - birth_dt).total_seconds() / 60)
    else:  # 역행
        diff_minutes = round((birth_dt - current_julib).total_seconds() / 60)

    temp = diff_minutes / 4320.0
    return max(1, round(temp))


def calc_deun(
    birth_month: int,
    birth_year: int,
    birth_dt: datetime,
    month_pillar_gan: str,
    banghyang: str,
) -> list[DeunItem]:
    """대운 10개를 계산합니다.

    manse_ori deun.js deun 함수 기반.
    월주 천간에서 순행/역행으로 10개 월주를 계산.

    Args:
        birth_month: 출생 월 (1-12)
        birth_year: 출생 년
        birth_dt: 출생 datetime
        month_pillar_gan: 월주 천간 (현재 월주)
        banghyang: "순행" or "역행"

    Returns:
        DeunItem 10개 리스트 (age, ganji)
    """
    current_julib, _ = _get_adjacent_solar_terms(birth_dt)

    # manse_ori: 출생이 절입 이전이면 month - 1
    month = birth_month
    if birth_dt <= current_julib:
        month -= 1
        if month == 0:
            month = 12

    init_year = birth_year
    year_sky = YEAR_SKY_MAP[birth_year % 10]

    # manse_ori 순행 초기년도 보정
    if banghyang == "순행":
        if birth_month == 1:
            init_year -= 1
        elif birth_month == 2 and birth_dt <= current_julib:
            init_year -= 1

    # Compute deun_su to determine starting ages
    deun_su = calc_deun_su(birth_dt=birth_dt, banghyang=banghyang)

    result: list[DeunItem] = []

    if banghyang == "순행":
        for i in range(10):
            month += 1
            if month == 13:
                month = 1
            elif month == 2:
                year_sky = YEAR_SKY_MAP[(init_year + 1) % 10]
            ganji = calc_month_pillar(month=month, year_gan=year_sky)
            age = deun_su + i * 10
            result.append(DeunItem(age=age, ganji=ganji))
    else:  # 역행
        for i in range(10):
            month -= 1
            if month == 1:
                year_sky = YEAR_SKY_MAP[(init_year - 1) % 10]
            if month == 0:
                month = 12
            ganji = calc_month_pillar(month=month, year_gan=year_sky)
            age = deun_su + i * 10
            result.append(DeunItem(age=age, ganji=ganji))

    return result


def calc_deun_full(request: SajuRequest) -> DeunResult:
    """전체 대운 정보를 계산합니다.

    Args:
        request: SajuRequest

    Returns:
        DeunResult (banghyang, deun_su, deun_list)
    """
    from datetime import datetime as dt

    from core.pillar import calc_four_pillars

    # Calculate four pillars
    pillars = calc_four_pillars(request)

    year_gan = pillars.year_pillar.gan
    month_gan = pillars.month_pillar.gan

    banghyang = calc_deun_banghyang(gender=request.gender, year_gan=year_gan)

    hour = request.hour if request.hour is not None else 12
    birth_dt = dt(request.year, request.month, request.day, hour, 0, 0)

    deun_su = calc_deun_su(birth_dt=birth_dt, banghyang=banghyang)

    deun_list = calc_deun(
        birth_month=request.month,
        birth_year=request.year,
        birth_dt=birth_dt,
        month_pillar_gan=month_gan,
        banghyang=banghyang,
    )

    return DeunResult(
        banghyang=banghyang,
        deun_su=deun_su,
        deun_list=deun_list,
    )
