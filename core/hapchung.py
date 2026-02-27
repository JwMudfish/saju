"""Hapchung (합충, Combinations and Conflicts) calculation module.

Based on manse_ori manseUtil/hapchung/samhapWord.js and hapChug.js.
Detects pairwise relationships between Earthly Branches (지지):
- 삼합 (Three Harmony): in+o+sul, hae+myo+mi, sin+ja+jin, sa+yu+chuk
- 육합 (Six Harmony): paired branches
- 충 (Conflict): opposite branches
- 방합 (Directional Harmony): seasonal groups

Note: 형 (Penalty) and 해 (Harm) are not included in the current manse_ori
      implementation scope, so they are omitted here.
"""
from __future__ import annotations

# 삼합 그룹 - manse_ori samhapWord.js getSamHap 기반
# 인오술(화국), 해묘미(목국), 신자진(수국), 사유축(금국)
_SAMHAP_GROUPS: list[frozenset[str]] = [
    frozenset({"인", "오", "술"}),  # 화국 (Fire)
    frozenset({"해", "묘", "미"}),  # 목국 (Wood)
    frozenset({"신", "자", "진"}),  # 수국 (Water)
    frozenset({"사", "유", "축"}),  # 금국 (Metal)
]

# 육합 쌍 - manse_ori samhapWord.js getYukhap 기반
# 자축합토, 인해합목, 묘술합화, 진유합금, 사신합수, 오미합토
_YUKHAP_PAIRS: list[frozenset[str]] = [
    frozenset({"자", "축"}),
    frozenset({"인", "해"}),
    frozenset({"묘", "술"}),
    frozenset({"진", "유"}),
    frozenset({"사", "신"}),
    frozenset({"오", "미"}),
]

# 충 쌍 - manse_ori samhapWord.js getChung 기반
# 자오충, 축미충, 인신충, 묘유충, 진술충, 사해충
_CHUNG_PAIRS: list[frozenset[str]] = [
    frozenset({"자", "오"}),
    frozenset({"축", "미"}),
    frozenset({"인", "신"}),
    frozenset({"묘", "유"}),
    frozenset({"진", "술"}),
    frozenset({"사", "해"}),
]

# 방합 그룹 - manse_ori samhapWord.js getbangHap 기반
# 인묘진(동방목), 사오미(남방화), 신유술(서방금), 해자축(북방수)
# Note: 방합은 같은 그룹 내 자기 자신 포함 (manse_ori 기준)
_BANGHAP_GROUPS: list[frozenset[str]] = [
    frozenset({"인", "묘", "진"}),  # 동방목 (East Wood)
    frozenset({"사", "오", "미"}),  # 남방화 (South Fire)
    frozenset({"신", "유", "술"}),  # 서방금 (West Metal)
    frozenset({"해", "자", "축"}),  # 북방수 (North Water)
]


def is_samhap(ji1: str, ji2: str) -> bool:
    """두 지지 간 삼합 관계인지 확인합니다.

    삼합은 동일한 지지끼리는 성립하지 않습니다.

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        삼합 관계이면 True, 아니면 False
    """
    if ji1 == ji2:
        return False
    for group in _SAMHAP_GROUPS:
        if ji1 in group and ji2 in group:
            return True
    return False


def get_samhap_group(ji: str) -> list[str]:
    """주어진 지지가 속한 삼합 그룹을 반환합니다.

    Args:
        ji: 지지 문자

    Returns:
        삼합 그룹 (3개 지지 리스트), 해당 없으면 빈 리스트
    """
    for group in _SAMHAP_GROUPS:
        if ji in group:
            return sorted(group)
    return []


def is_yukhap(ji1: str, ji2: str) -> bool:
    """두 지지 간 육합 관계인지 확인합니다.

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        육합 관계이면 True, 아니면 False
    """
    if ji1 == ji2:
        return False
    pair = frozenset({ji1, ji2})
    return pair in _YUKHAP_PAIRS


def is_chung(ji1: str, ji2: str) -> bool:
    """두 지지 간 충(沖) 관계인지 확인합니다.

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        충 관계이면 True, 아니면 False
    """
    if ji1 == ji2:
        return False
    pair = frozenset({ji1, ji2})
    return pair in _CHUNG_PAIRS


def is_banghap(ji1: str, ji2: str) -> bool:
    """두 지지 간 방합(方合) 관계인지 확인합니다.

    manse_ori 기준: 같은 방향 그룹 내라면 자기 자신 포함 성립.

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        방합 관계이면 True, 아니면 False
    """
    for group in _BANGHAP_GROUPS:
        if ji1 in group and ji2 in group:
            return True
    return False


def hapchung_relation(ji1: str, ji2: str) -> str | None:
    """두 지지 간 가장 우선순위가 높은 합충 관계를 반환합니다.

    우선순위: 충 > 육합 > 삼합 > 방합
    (충이 가장 강한 상호작용)

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        관계 이름 ("충"/"육합"/"삼합"/"방합"), 없으면 None
    """
    if is_chung(ji1, ji2):
        return "충"
    if is_yukhap(ji1, ji2):
        return "육합"
    if is_samhap(ji1, ji2):
        return "삼합"
    if is_banghap(ji1, ji2):
        return "방합"
    return None
