"""Yongshin (용신, Dominant Stem) calculation module.

In manse_ori, 'yongsin' corresponds to 'dang_ryeong' (당령), which is the
dominant heavenly stem derived from the month branch (월지) based on whether
the birth time falls before or after the mid-solar-term (중기, junggi).

The mid-solar-term (중기) data uses gubun=2 entries from julgi.json.

Logic based on manse_ori manse/ryeong/ryeong.js smallJunggi() / bigJunggi().
"""
from __future__ import annotations

import json
import pathlib
from datetime import datetime

from core.models.domain import YongshinResult

_JULGI_PATH = pathlib.Path(__file__).parent.parent / "data" / "julgi.json"

# 당령 테이블 - smallJunggi (중기 이전)
# Based on manse_ori manse/ryeong/ryeong.js smallJunggi()
_SMALL_JUNGGI_TABLE: dict[str, str] = {
    "인": "갑",
    "묘": "갑",
    "진": "을",
    "사": "병",
    "오": "병",
    "미": "정",
    "신": "경",
    "유": "경",
    "술": "신",
    "해": "임",
    "자": "임",
    "축": "계",
}

# 당령 테이블 - bigJunggi (중기 이후)
# Based on manse_ori manse/ryeong/ryeong.js bigJunggi()
_BIG_JUNGGI_TABLE: dict[str, str] = {
    "인": "갑",
    "묘": "을",
    "진": "을",
    "사": "병",
    "오": "정",
    "미": "정",
    "신": "경",
    "유": "신",
    "술": "신",
    "해": "임",
    "자": "계",
    "축": "계",
}

# 희신 테이블 - 당령 기준 길신 천간
# Based on manse_ori manseUtil/ryeong/ryeongWord.js hisinCheck()
_HEUISIN_TABLE: dict[str, str] = {
    "갑": "계",
    "을": "병",
    "병": "을",
    "정": "경",
    "경": "정",
    "신": "임",
    "임": "신",
    "계": "갑",
}

# 중기(junggi) 캐시: (year, month) -> datetime
_JUNGGI_CACHE: dict[tuple[int, int], datetime] | None = None


def _load_junggi_cache() -> dict[tuple[int, int], datetime]:
    """julgi.json에서 중기(gubun=2) 데이터를 로딩합니다.

    Returns:
        dict mapping (year, month) -> junggi datetime
    """
    with open(_JULGI_PATH, encoding="utf-8") as f:
        raw = json.load(f)

    result: dict[tuple[int, int], datetime] = {}

    for entry in raw["julgi"]:
        if entry["gubun"] != 2:
            continue
        dt = datetime.strptime(entry["tm_solar"], "%Y-%m-%d %H:%M:%S")
        key = (dt.year, dt.month)
        result[key] = dt

    return result


def _get_junggi_cache() -> dict[tuple[int, int], datetime]:
    """중기 데이터 캐시를 반환합니다 (싱글톤 패턴)."""
    global _JUNGGI_CACHE
    if _JUNGGI_CACHE is None:
        _JUNGGI_CACHE = _load_junggi_cache()
    return _JUNGGI_CACHE


def get_junggi_dt(year: int, month: int) -> datetime | None:
    """특정 연도/월의 중기 시각을 반환합니다.

    Args:
        year: 연도
        month: 월 (1-12)

    Returns:
        중기 datetime, 없으면 None
    """
    cache = _get_junggi_cache()
    return cache.get((year, month))


def is_before_junggi(birth_dt: datetime, month: int, year: int) -> bool:
    """출생 시각이 중기(junggi) 이전인지 여부를 반환합니다.

    manse_ori ryeong.ryeong() 로직:
        if (myBirth.diff(moment(useRealJulib.junggi), 'minutes') <= 0) {
            result = smallJunggi();  // before junggi
        } else {
            result = bigJunggi();    // after junggi
        }

    Args:
        birth_dt: 출생 datetime
        month: 월주 계산에 사용된 월 (1-12)
        year: 월주 계산에 사용된 연도

    Returns:
        True if birth_dt is before or at junggi, False otherwise
    """
    junggi_dt = get_junggi_dt(year, month)
    if junggi_dt is None:
        # Fallback: treat as before junggi if data unavailable
        return True
    # manse_ori: diff <= 0 means birth <= junggi (before or at junggi)
    diff_minutes = (birth_dt - junggi_dt).total_seconds() / 60
    return diff_minutes <= 0


def calc_dang_ryeong(month_ji: str, is_before_junggi: bool) -> str:
    """월지와 중기 이전/이후 여부로 당령(dang_ryeong/yongsin)을 계산합니다.

    Based on manse_ori manse/ryeong/ryeong.js smallJunggi() / bigJunggi().

    Args:
        month_ji: 월지 문자 (인/묘/진/사/오/미/신/유/술/해/자/축)
        is_before_junggi: True = 중기 이전, False = 중기 이후

    Returns:
        당령 천간 문자 (갑/을/병/정/경/신/임/계)
    """
    if is_before_junggi:
        return _SMALL_JUNGGI_TABLE[month_ji]
    else:
        return _BIG_JUNGGI_TABLE[month_ji]


def calc_heuisin(dang_ryeong: str) -> str:
    """당령으로부터 희신(길신)을 계산합니다.

    Based on manse_ori manseUtil/ryeong/ryeongWord.js hisinCheck().

    Args:
        dang_ryeong: 당령 천간 문자 (갑/을/병/정/경/신/임/계)

    Returns:
        희신 천간 문자
    """
    return _HEUISIN_TABLE[dang_ryeong]


def calc_yongshin(
    birth_dt: datetime,
    month_ji: str,
    month: int,
    year: int,
) -> YongshinResult:
    """용신(당령 및 관련 천간)을 계산합니다.

    Args:
        birth_dt: 출생 datetime
        month_ji: 월지 (인/묘/진/사/오/미/신/유/술/해/자/축)
        month: 월주에 사용된 월 (1-12)
        year: 월주에 사용된 연도

    Returns:
        YongshinResult(dang_ryeong, heuisin)
    """
    before_junggi = is_before_junggi(birth_dt=birth_dt, month=month, year=year)
    dang_ryeong = calc_dang_ryeong(month_ji=month_ji, is_before_junggi=before_junggi)
    heuisin = calc_heuisin(dang_ryeong)

    return YongshinResult(
        dang_ryeong=dang_ryeong,
        heuisin=heuisin,
    )
