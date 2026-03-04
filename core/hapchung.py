"""Hapchung (합충형해파) calculation module.

Detects pairwise relationships between Earthly Branches (지지):
- 삼합 (Three Harmony): in+o+sul, hae+myo+mi, sin+ja+jin, sa+yu+chuk
- 육합 (Six Harmony): paired branches
- 충 (Conflict): opposite branches
- 방합 (Directional Harmony): seasonal groups
- 형 (Penalty): three types - 시세지형, 무은지형, 무례지형, 자형
- 해 (Harm): six pairs
- 파 (Breaking): six pairs

Priority order: 충 > 형 > 해 > 파 > 육합 > 삼합 > 방합
"""

from __future__ import annotations

from itertools import combinations

from core.models.domain import HapchungRelation

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


# ---------------------------------------------------------------------------
# 형 (刑) 상수 - SPEC-CALC-002
# ---------------------------------------------------------------------------

# 시세지형(恃勢之刑) 그룹: 인사신 3방향 순환
_HYEONG_SISEJIHYEONG: frozenset[str] = frozenset({"인", "사", "신"})

# 무은지형(無恩之刑) 그룹: 축술미 3방향 순환
_HYEONG_MUEUNJIHYEONG: frozenset[str] = frozenset({"축", "술", "미"})

# 무례지형(無禮之刑) 쌍: 자묘 쌍방향
_HYEONG_MURYE_PAIR: frozenset[str] = frozenset({"자", "묘"})

# 자형(自刑) 대상: 진오유해 (동일 지지끼리)
_HYEONG_JAHYEONG: frozenset[str] = frozenset({"진", "오", "유", "해"})

# ---------------------------------------------------------------------------
# 해 (害) 상수 - SPEC-CALC-002
# ---------------------------------------------------------------------------

# 육해(六害) 쌍: 자미·축오·인사·묘진·신해·유술
_HAE_PAIRS: list[frozenset[str]] = [
    frozenset({"자", "미"}),  # 자미해
    frozenset({"축", "오"}),  # 축오해
    frozenset({"인", "사"}),  # 인사해
    frozenset({"묘", "진"}),  # 묘진해
    frozenset({"신", "해"}),  # 신해해
    frozenset({"유", "술"}),  # 유술해
]

# ---------------------------------------------------------------------------
# 파 (破) 상수 - SPEC-CALC-002
# ---------------------------------------------------------------------------

# 육파(六破) 쌍: 자유·오묘·인해·사신·진축·술미
_PA_PAIRS: list[frozenset[str]] = [
    frozenset({"자", "유"}),  # 자유파
    frozenset({"오", "묘"}),  # 오묘파
    frozenset({"인", "해"}),  # 인해파
    frozenset({"사", "신"}),  # 사신파
    frozenset({"진", "축"}),  # 진축파
    frozenset({"술", "미"}),  # 술미파
]


def is_hyeong(ji1: str, ji2: str) -> bool:
    """두 지지 간 형(刑) 관계인지 확인합니다.

    형의 세 유형:
    - 시세지형: 인사신 그룹 내 서로 다른 지지
    - 무은지형: 축술미 그룹 내 서로 다른 지지
    - 무례지형: 자-묘 쌍
    - 자형: 진·오·유·해 자기 자신

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        형 관계이면 True, 아니면 False
    """
    if ji1 != ji2:
        if ji1 in _HYEONG_SISEJIHYEONG and ji2 in _HYEONG_SISEJIHYEONG:
            return True
        if ji1 in _HYEONG_MUEUNJIHYEONG and ji2 in _HYEONG_MUEUNJIHYEONG:
            return True
        if frozenset({ji1, ji2}) == _HYEONG_MURYE_PAIR:
            return True
    else:
        if ji1 in _HYEONG_JAHYEONG:
            return True
    return False


def get_hyeong_subtype(ji1: str, ji2: str) -> str | None:
    """두 지지 간 형(刑) 관계의 세부 유형을 반환합니다.

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        세부 유형 ("시세지형"/"무은지형"/"무례지형"/"자형"), 없으면 None
    """
    if ji1 != ji2:
        if ji1 in _HYEONG_SISEJIHYEONG and ji2 in _HYEONG_SISEJIHYEONG:
            return "시세지형"
        if ji1 in _HYEONG_MUEUNJIHYEONG and ji2 in _HYEONG_MUEUNJIHYEONG:
            return "무은지형"
        if frozenset({ji1, ji2}) == _HYEONG_MURYE_PAIR:
            return "무례지형"
    else:
        if ji1 in _HYEONG_JAHYEONG:
            return "자형"
    return None


def is_hae(ji1: str, ji2: str) -> bool:
    """두 지지 간 해(害) 관계인지 확인합니다.

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        해 관계이면 True, 아니면 False
    """
    if ji1 == ji2:
        return False
    return frozenset({ji1, ji2}) in _HAE_PAIRS


def is_pa(ji1: str, ji2: str) -> bool:
    """두 지지 간 파(破) 관계인지 확인합니다.

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        파 관계이면 True, 아니면 False
    """
    if ji1 == ji2:
        return False
    return frozenset({ji1, ji2}) in _PA_PAIRS


def calc_pillar_hapchung(
    pillars: list[tuple[str, str]],
) -> list[HapchungRelation]:
    """사기둥 지지 간 합충형해파 관계를 계산합니다.

    각 기둥 쌍에 대해 가장 우선순위가 높은 관계 하나를 반환합니다.
    우선순위: 충 > 형 > 해 > 파 > 육합 > 삼합 > 방합

    Args:
        pillars: (기둥명, 지지) 튜플 리스트.
                 기둥명은 "year", "month", "day", "hour" 중 하나.

    Returns:
        탐지된 HapchungRelation 리스트 (관계 없는 쌍은 제외).
    """
    result: list[HapchungRelation] = []

    for (p1, ji1), (p2, ji2) in combinations(pillars, 2):
        relation: str | None = None
        subtype: str | None = None

        if is_chung(ji1, ji2):
            relation = "충"
        elif is_hyeong(ji1, ji2):
            relation = "형"
            subtype = get_hyeong_subtype(ji1, ji2)
        elif is_hae(ji1, ji2):
            relation = "해"
        elif is_pa(ji1, ji2):
            relation = "파"
        elif is_yukhap(ji1, ji2):
            relation = "육합"
        elif is_samhap(ji1, ji2):
            relation = "삼합"
        elif is_banghap(ji1, ji2) and ji1 != ji2:
            relation = "방합"

        if relation is not None:
            result.append(
                HapchungRelation(
                    relation_type=relation,
                    subtype=subtype,
                    pillar1=p1,
                    pillar2=p2,
                    ji1=ji1,
                    ji2=ji2,
                )
            )

    return result


def hapchung_relation(ji1: str, ji2: str) -> str | None:
    """두 지지 간 가장 우선순위가 높은 합충형해파 관계를 반환합니다.

    우선순위: 충 > 형 > 해 > 파 > 육합 > 삼합 > 방합

    Args:
        ji1: 첫 번째 지지
        ji2: 두 번째 지지

    Returns:
        관계 이름 ("충"/"형"/"해"/"파"/"육합"/"삼합"/"방합"), 없으면 None
    """
    if is_chung(ji1, ji2):
        return "충"
    if is_hyeong(ji1, ji2):
        return "형"
    if is_hae(ji1, ji2):
        return "해"
    if is_pa(ji1, ji2):
        return "파"
    if is_yukhap(ji1, ji2):
        return "육합"
    if is_samhap(ji1, ji2):
        return "삼합"
    if is_banghap(ji1, ji2):
        return "방합"
    return None
