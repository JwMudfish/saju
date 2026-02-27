"""Core constants for saju calculation engine.

Based on manse_ori reference implementation analysis.
Korean terms are used for gan/ji/ohang names as per the original system.
"""
from __future__ import annotations

# 천간 (Ten Heavenly Stems) - 갑=0, 을=1, ..., 계=9
GAN_LIST: tuple[str, ...] = ("갑", "을", "병", "정", "무", "기", "경", "신", "임", "계")

# 지지 (Twelve Earthly Branches) - 자=0, 축=1, ..., 해=11
JI_LIST: tuple[str, ...] = ("자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해")

# 60갑자 (Sixty-Year Cycle) - index 0 = 갑자
GANJI_60: list[tuple[str, str]] = [
    (GAN_LIST[i % 10], JI_LIST[i % 12]) for i in range(60)
]

# 오행 (Five Elements) mapping for 천간
GAN_OHANG: dict[str, str] = {
    "갑": "목",
    "을": "목",
    "병": "화",
    "정": "화",
    "무": "토",
    "기": "토",
    "경": "금",
    "신": "금",
    "임": "수",
    "계": "수",
}

# 오행 (Five Elements) mapping for 지지
JI_OHANG: dict[str, str] = {
    "자": "수",
    "축": "토",
    "인": "목",
    "묘": "목",
    "진": "토",
    "사": "화",
    "오": "화",
    "미": "토",
    "신": "금",
    "유": "금",
    "술": "토",
    "해": "수",
}

# 음양 (Yin-Yang) for 천간 - True = 양 (Yang), False = 음 (Yin)
GAN_YANG: dict[str, bool] = {
    "갑": True,
    "을": False,
    "병": True,
    "정": False,
    "무": True,
    "기": False,
    "경": True,
    "신": False,
    "임": True,
    "계": False,
}

# 년주 천간 매핑 - manse_ori yearPillarSky.js 참조
# year % 10 -> 천간
# manse_ori array: ["경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"]
YEAR_SKY_MAP: dict[int, str] = {
    0: "경",
    1: "신",
    2: "임",
    3: "계",
    4: "갑",
    5: "을",
    6: "병",
    7: "정",
    8: "무",
    9: "기",
}

# 년주 지지 매핑 - manse_ori yearPillarLand.js 참조
# year % 12 -> 지지
# manse_ori array: ["신", "유", "술", "해", "자", "축", "인", "묘", "진", "사", "오", "미"]
YEAR_LAND_MAP: dict[int, str] = {
    0: "신",
    1: "유",
    2: "술",
    3: "해",
    4: "자",
    5: "축",
    6: "인",
    7: "묘",
    8: "진",
    9: "사",
    10: "오",
    11: "미",
}

# 월주 지지 매핑 - manse_ori monthPillarLand.js 참조
# month (1=1월, 12=12월) -> 지지
MONTH_LAND_MAP: dict[int, str] = {
    1: "축",
    2: "인",
    3: "묘",
    4: "진",
    5: "사",
    6: "오",
    7: "미",
    8: "신",
    9: "유",
    10: "술",
    11: "해",
    12: "자",
}

# 월주 천간 그룹별 시작 매핑 - manse_ori monthPillarSky.js 참조
# 갑기년 (year_sky 갑 or 기): 2월시작=병
MONTH_SKY_GABGI: tuple[str, ...] = (
    "병", "정", "무", "기", "경", "신", "임", "계", "갑", "을", "병", "정"
)
# 을경년 (year_sky 을 or 경): 2월시작=무
MONTH_SKY_ULGUNG: tuple[str, ...] = (
    "무", "기", "경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"
)
# 병신년 (year_sky 병 or 신): 2월시작=경
MONTH_SKY_BYONGSIN: tuple[str, ...] = (
    "경", "신", "임", "계", "갑", "을", "병", "정", "무", "기", "경", "신"
)
# 정임년 (year_sky 정 or 임): 2월시작=임
MONTH_SKY_JUNGIM: tuple[str, ...] = (
    "임", "계", "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"
)
# 무계년 (year_sky 무 or 계): 2월시작=갑
MONTH_SKY_MUJE: tuple[str, ...] = (
    "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계", "갑", "을"
)

# 시주 천간 그룹별 매핑 - manse_ori hourPillarSky.js 참조
# 갑기일: 자시=갑
HOUR_SKY_GABGI: tuple[str, ...] = (
    "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계", "갑", "을"
)
# 을경일: 자시=병
HOUR_SKY_ULGUNG: tuple[str, ...] = (
    "병", "정", "무", "기", "경", "신", "임", "계", "갑", "을", "병", "정"
)
# 병신일: 자시=무
HOUR_SKY_BYONGSIN: tuple[str, ...] = (
    "무", "기", "경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"
)
# 정임일: 자시=경
HOUR_SKY_JUNGIM: tuple[str, ...] = (
    "경", "신", "임", "계", "갑", "을", "병", "정", "무", "기", "경", "신"
)
# 무계일: 자시=임
HOUR_SKY_MUJE: tuple[str, ...] = (
    "임", "계", "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"
)

# 시지 인덱스 - 자시(0)부터 해시(11)까지
# 각 시간대의 시작 시간 (HH:MM 기준, 23:30부터 자시 시작)
HOUR_JI_ORDER: tuple[str, ...] = JI_LIST  # 자(0) 축(1) 인(2) ... 해(11)

# 일주 계산용 월별 누적 일수 - manse_ori daypillar.js 참조
DAY_MONTH_SUM: tuple[int, ...] = (0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334)
