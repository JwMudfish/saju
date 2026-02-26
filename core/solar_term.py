"""Solar term (절입, 節入) handling for saju calculation.

Uses julgi.json data to determine solar term entry times.
Only gubun=1 entries are used (절입 entries, 12 per year).

The 12 solar terms correspond to months as follows:
  Index 0: 소한 -> month 1
  Index 1: 입춘 -> month 2
  Index 2: 경칩 -> month 3
  Index 3: 청명 -> month 4
  Index 4: 입하 -> month 5
  Index 5: 망종 -> month 6
  Index 6: 소서 -> month 7
  Index 7: 입추 -> month 8
  Index 8: 백로 -> month 9
  Index 9: 한로 -> month 10
  Index 10: 입동 -> month 11
  Index 11: 대설 -> month 12
"""
import json
import pathlib
from datetime import datetime

from core.exceptions import SolarTermNotFoundError

# Path to julgi.json data file
_JULGI_PATH = pathlib.Path(__file__).parent.parent / "data" / "julgi.json"

# Cache: year -> list of 12 datetime objects (절입 시각)
_JULGI_CACHE: dict[int, list[datetime]] | None = None

# Solar term to month index mapping (0-indexed, so month 1 = index 0)
SOLAR_TERM_NAMES = [
    "소한",  # month 1
    "입춘",  # month 2
    "경칩",  # month 3
    "청명",  # month 4
    "입하",  # month 5
    "망종",  # month 6
    "소서",  # month 7
    "입추",  # month 8
    "백로",  # month 9
    "한로",  # month 10
    "입동",  # month 11
    "대설",  # month 12
]


def _load_julgi() -> dict[int, list[datetime]]:
    """julgi.json에서 절입 데이터를 로딩합니다.

    Returns:
        dict mapping year -> list of 12 datetime objects (절입 시각, month 1-12 순서)
    """
    with open(_JULGI_PATH, encoding="utf-8") as f:
        raw = json.load(f)

    result: dict[int, list[datetime]] = {}

    for entry in raw["julgi"]:
        if entry["gubun"] != 1:
            continue

        dt = datetime.strptime(entry["tm_solar"], "%Y-%m-%d %H:%M:%S")
        year = dt.year

        if year not in result:
            result[year] = []

        result[year].append(dt)

    # Ensure each year has exactly 12 entries in month order
    for year in result:
        result[year].sort(key=lambda x: x.month)

    return result


def get_julgi_cache() -> dict[int, list[datetime]]:
    """절입 데이터 캐시를 반환합니다 (싱글톤 패턴).

    Returns:
        dict mapping year -> list of 12 datetime objects
    """
    global _JULGI_CACHE
    if _JULGI_CACHE is None:
        _JULGI_CACHE = _load_julgi()
    return _JULGI_CACHE


def get_solar_term_entry(year: int, month: int) -> datetime:
    """특정 연도, 월의 절입 시각을 반환합니다.

    Args:
        year: 연도
        month: 월 (1-12)

    Returns:
        절입 시각 (datetime)

    Raises:
        SolarTermNotFoundError: 절입 데이터가 없는 경우
    """
    cache = get_julgi_cache()

    if year not in cache:
        raise SolarTermNotFoundError(year, month)

    year_entries = cache[year]
    if month < 1 or month > 12:
        raise SolarTermNotFoundError(year, month)

    # Find entry for the given month (entries are sorted by month)
    for entry in year_entries:
        if entry.month == month:
            return entry

    raise SolarTermNotFoundError(year, month)


def determine_month_for_pillar(birth_dt: datetime) -> tuple[int, int]:
    """절입 기준으로 월주 계산에 사용할 (월, 년)을 반환합니다.

    manse_ori pillar.js 로직 참조:
    - 1월생은 전년 12월로 처리 (입춘 이전 가능성)
    - 2월~12월은 해당 절입과 비교하여 결정

    Args:
        birth_dt: 출생 datetime

    Returns:
        (month, year) tuple for 월주 calculation
    """
    year = birth_dt.year
    month = birth_dt.month

    # January births are always treated as previous year December
    # (per manse_ori logic: month 1 means year-1)
    if month == 1:
        return 12, year - 1

    # For other months, check if birth is before the solar term entry
    try:
        solar_term_dt = get_solar_term_entry(year, month)
        if birth_dt < solar_term_dt:
            # Birth is before the solar term - use previous month
            prev_month = month - 1
            prev_year = year
            if prev_month == 0:
                prev_month = 12
                prev_year = year - 1
            return prev_month, prev_year
        else:
            return month, year
    except SolarTermNotFoundError:
        return month, year
