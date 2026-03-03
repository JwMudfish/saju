"""신살(神殺) 계산 모듈.

신살은 사주팔자에서 특정 지지 조합에 의해 나타나는 길흉 요소다.
연지(年支) 또는 일간(日干)/일지(日支)를 기준으로 판단한다.
"""

from __future__ import annotations

from core.models.domain import ShinsalItem

# 역마살(驛馬殺): 이동·변화·활동성을 상징
# 삼합(三合) 기준: 인오술(寅午戌)→신(申), 신자진(申子辰)→인(寅),
#                해묘미(亥卯未)→사(巳), 사유축(巳酉丑)→해(亥)
YEOKMA_MAP: dict[str, str] = {
    "인": "신",
    "오": "신",
    "술": "신",
    "신": "인",
    "자": "인",
    "진": "인",
    "해": "사",
    "묘": "사",
    "미": "사",
    "사": "해",
    "유": "해",
    "축": "해",
}

# 도화살(桃花殺): 인기·매력·사교성을 상징
# 인오술→묘(卯), 신자진→유(酉), 해묘미→자(子), 사유축→오(午)
DOHWA_MAP: dict[str, str] = {
    "인": "묘",
    "오": "묘",
    "술": "묘",
    "신": "유",
    "자": "유",
    "진": "유",
    "해": "자",
    "묘": "자",
    "미": "자",
    "사": "오",
    "유": "오",
    "축": "오",
}

# 화개살(華蓋殺): 예술·종교·고독을 상징
# 삼합의 묘지(墓地): 인오술→술(戌), 신자진→진(辰), 해묘미→미(未), 사유축→축(丑)
HWAGAE_MAP: dict[str, str] = {
    "인": "술",
    "오": "술",
    "술": "술",
    "신": "진",
    "자": "진",
    "진": "진",
    "해": "미",
    "묘": "미",
    "미": "미",
    "사": "축",
    "유": "축",
    "축": "축",
}

# 백호살(白虎殺): 재액·사고·용맹을 상징
# 특정 일주 패턴 (간지 조합)
BAEKHO_PATTERNS: frozenset[tuple[str, str]] = frozenset(
    [
        ("갑", "진"),
        ("을", "미"),
        ("병", "술"),
        ("정", "축"),
        ("무", "진"),
        ("기", "미"),
        ("경", "진"),
        ("신", "미"),
        ("임", "술"),
        ("계", "축"),
    ]
)

# 천을귀인(天乙貴人): 귀인의 도움·행운을 상징
# 일간 기준 해당 지지 목록
CHEONUL_MAP: dict[str, list[str]] = {
    "갑": ["축", "미"],
    "무": ["축", "미"],
    "을": ["자", "신"],
    "기": ["자", "신"],
    "병": ["해", "유"],
    "정": ["해", "유"],
    "경": ["축", "미"],
    "신": ["인", "오"],
    "임": ["묘", "사"],
    "계": ["묘", "사"],
}

SHINSAL_DESCRIPTIONS: dict[str, str] = {
    "역마살": "이동·변화·활동성을 상징",
    "도화살": "인기·매력·사교성을 상징",
    "화개살": "예술·종교·고독을 상징",
    "백호살": "재액·사고·용맹을 상징",
    "천을귀인": "귀인의 도움·행운을 상징",
}


def check_yeokma(year_ji: str, pillars_ji: list[str]) -> ShinsalItem | None:
    """역마살 여부를 확인한다.

    Args:
        year_ji: 년주 지지
        pillars_ji: 사주 지지 목록 (중복 허용)

    Returns:
        역마살 ShinsalItem 또는 None
    """
    target = YEOKMA_MAP.get(year_ji)
    if target and target in pillars_ji:
        return ShinsalItem(
            name="역마살",
            trigger_ji=target,
            description=SHINSAL_DESCRIPTIONS["역마살"],
        )
    return None


def check_dohwa(year_ji: str, pillars_ji: list[str]) -> ShinsalItem | None:
    """도화살 여부를 확인한다.

    Args:
        year_ji: 년주 지지
        pillars_ji: 사주 지지 목록

    Returns:
        도화살 ShinsalItem 또는 None
    """
    target = DOHWA_MAP.get(year_ji)
    if target and target in pillars_ji:
        return ShinsalItem(
            name="도화살",
            trigger_ji=target,
            description=SHINSAL_DESCRIPTIONS["도화살"],
        )
    return None


def check_hwagae(year_ji: str, pillars_ji: list[str]) -> ShinsalItem | None:
    """화개살 여부를 확인한다.

    Args:
        year_ji: 년주 지지
        pillars_ji: 사주 지지 목록

    Returns:
        화개살 ShinsalItem 또는 None
    """
    target = HWAGAE_MAP.get(year_ji)
    if target and target in pillars_ji:
        return ShinsalItem(
            name="화개살",
            trigger_ji=target,
            description=SHINSAL_DESCRIPTIONS["화개살"],
        )
    return None


def check_baekho(day_gan: str, day_ji: str) -> ShinsalItem | None:
    """백호살 여부를 확인한다.

    Args:
        day_gan: 일주 천간
        day_ji: 일주 지지

    Returns:
        백호살 ShinsalItem 또는 None
    """
    if (day_gan, day_ji) in BAEKHO_PATTERNS:
        return ShinsalItem(
            name="백호살",
            trigger_ji=day_ji,
            description=SHINSAL_DESCRIPTIONS["백호살"],
        )
    return None


def check_cheonul(day_gan: str, pillars_ji: list[str]) -> ShinsalItem | None:
    """천을귀인 여부를 확인한다.

    Args:
        day_gan: 일간 천간
        pillars_ji: 사주 지지 목록

    Returns:
        천을귀인 ShinsalItem 또는 None (첫 번째 발동 지지 기준)
    """
    targets = CHEONUL_MAP.get(day_gan, [])
    for ji in targets:
        if ji in pillars_ji:
            return ShinsalItem(
                name="천을귀인",
                trigger_ji=ji,
                description=SHINSAL_DESCRIPTIONS["천을귀인"],
            )
    return None


def calc_shinsal(
    year_ji: str,
    day_gan: str,
    day_ji: str,
    pillars_ji: list[str],
) -> list[ShinsalItem]:
    """신살을 계산하여 해당하는 신살 목록을 반환한다.

    Args:
        year_ji: 년주 지지 (역마살, 도화살, 화개살 판단 기준)
        day_gan: 일간 천간 (백호살, 천을귀인 판단 기준)
        day_ji: 일주 지지 (백호살 판단 기준)
        pillars_ji: 사주 전체 지지 목록 (년/월/일/시 지지, 해당 있으면 포함)

    Returns:
        발동된 신살 ShinsalItem 목록 (발동되지 않으면 빈 목록)
    """
    checkers = [
        check_yeokma(year_ji, pillars_ji),
        check_dohwa(year_ji, pillars_ji),
        check_hwagae(year_ji, pillars_ji),
        check_baekho(day_gan, day_ji),
        check_cheonul(day_gan, pillars_ji),
    ]
    return [item for item in checkers if item is not None]
