"""신격(Shgj) 계산 모듈.

신격(Shgj)은 사주팔자에서 상신(Sangsin)과 구신(Gusin)을 분석하는 지표입니다.

용신(Yongshin) 기반 상신/구신 계산:
- 상신(Sangsin): 용신과 상생 관계인 천간 (예: 용신이 목이면 화/수가 상신)
- 구신(Gusin): 용신을 극하는 천간 (예: 용신이 목이면 금이 구신)

오행 상생상극 관계:
- 상생: 목→화→토→금→수→목 (생하는 관계)
- 상극: 목→토→수→화→금→목 (극하는 관계)

MVP 범위 (1단계):
- 상신/구신 계산만 구현
- 상화/설화는 None 반환 (추후 구현)
- 국국분은 None 반환 (추후 구현)
"""

from __future__ import annotations

from core.constants import GAN_OHANG
from core.models.domain import ShgjResult, YuksinItem
from core.models.response import FourPillars

# 오행 상생 매핑: 나를 생하는 것 + 내가 생하는 것
_SANGSIN_OHANG_MAP: dict[str, list[str]] = {
    "목": ["수", "화"],  # 수→목, 목→화
    "화": ["목", "토"],  # 목→화, 화→토
    "토": ["화", "금"],  # 화→토, 토→금
    "금": ["토", "수"],  # 토→금, 금→수
    "수": ["금", "목"],  # 금→수, 수→목
}

# 오행 상극 매핑: 나를 극하는 오행
_GUSIN_OHANG_MAP: dict[str, str] = {
    "목": "금",  # 금극목
    "화": "수",  # 수극화
    "토": "목",  # 목극토
    "금": "화",  # 화극금
    "수": "토",  # 토극수
}


def calc_shgj(
    pillars: FourPillars,
    gyouk_name: str,
    yuksin_list: list[YuksinItem],
    dang_ryeong: str,
) -> ShgjResult:
    """신격(Shgj)을 계산합니다.

    Args:
        pillars: 사주팔자 (년월일시)
        gyouk_name: 격국 이름 (예: "정관격")
        yuksin_list: 육신 데이터 리스트
        dang_ryeong: 당령 (월지 기반 용신)

    Returns:
        ShgjResult: 신격 분석 결과
        - sangsin: 용신을 돕는 천간 (상신)
        - gusin: 용신을 극하는 천간 (구신)
        - sanghwa: 용신을 생하는 천간 중 사주팔자/육신에 존재하는 것
        - sulhwa: 용신을 극하는 천간 중 사주팔자/육신에 존재하는 것
        - gukgubun: 국국분 (추후 구현)
    """
    # 1. 용신(dang_ryeong)의 오행 확인
    if dang_ryeong not in GAN_OHANG:
        return ShgjResult(sangsin=None, gusin=None, sanghwa=None, sulhwa=None)

    yongsin_ohang = GAN_OHANG[dang_ryeong]

    # 2. 모든 천간 수집 (육신 + 사주팔자 천간, 용신 제외)
    all_stems = _collect_all_stems(yuksin_list, pillars, dang_ryeong)

    if not all_stems:
        return ShgjResult(sangsin=None, gusin=None, sanghwa=None, sulhwa=None)

    # 3. 상신 계산 (용신을 생하는 천간)
    sangsin = _find_sangsin(yongsin_ohang, all_stems)

    # 4. 구신 계산 (용신을 극하는 천간)
    gusin = _find_gusin(yongsin_ohang, all_stems)

    # 5. 상화/설화 계산
    # 상화: 용신을 생하는 천간 중, 사주팔자/육신에 존재하는 천간
    # 설화: 용신을 극하는 천간 중, 사주팔자/육신에 존재하는 천간
    sanghwa = _find_sanghwa(yongsin_ohang, all_stems)
    sulhwa = _find_sulhwa(yongsin_ohang, all_stems)

    return ShgjResult(
        sangsin=sangsin,
        gusin=gusin,
        gukgubun=None,  # 추후 구현
        sanghwa=sanghwa,
        sulhwa=sulhwa,
    )


def _collect_all_stems(
    yuksin_list: list[YuksinItem],
    pillars: FourPillars,
    yongsin: str,
) -> list[str]:
    """육신과 사주팔자에서 모든 천간을 수집합니다 (용신 제외).

    Args:
        yuksin_list: 육신 데이터 리스트
        pillars: 사주팔자
        yongsin: 용신 천간 (제외 대상)

    Returns:
        중복 없는 천간 리스트 (용신 제외)
    """
    stems = set()

    # 육신에서 천간 수집 (용신 제외)
    for yuksin in yuksin_list:
        if yuksin.target in GAN_OHANG and yuksin.target != yongsin:
            stems.add(yuksin.target)

    # 사주팔자 천간 수집 (용신 제외)
    pillars_list = [
        pillars.year_pillar,
        pillars.month_pillar,
        pillars.day_pillar,
        pillars.hour_pillar,
    ]
    for pillar in pillars_list:
        if pillar is not None and pillar.gan != yongsin:
            stems.add(pillar.gan)

    return list(stems)


def _find_sangsin(yongsin_ohang: str, all_stems: list[str]) -> str | None:
    """상신(용신과 상생 관계인 천간)을 찾습니다.

    상신은 용신을 생하는 천간 또는 용신이 생하는 천간 모두 해당됩니다.
    우선순위: 나를 생하는 천간 → 내가 생하는 천간

    Args:
        yongsin_ohang: 용신의 오행 (목, 화, 토, 금, 수)
        all_stems: 고려할 천간 리스트

    Returns:
        상신 천간 또는 None
    """
    if yongsin_ohang not in _SANGSIN_OHANG_MAP:
        return None

    # 우선순위대로 천간 탐색
    for ohang in _SANGSIN_OHANG_MAP[yongsin_ohang]:
        for stem in all_stems:
            if stem in GAN_OHANG and GAN_OHANG[stem] == ohang:
                return stem

    return None


def _find_gusin(yongsin_ohang: str, all_stems: list[str]) -> str | None:
    """구신(용신을 극하는 천간)을 찾습니다.

    구신은 용신을 극하는 오행을 가진 천간입니다.

    Args:
        yongsin_ohang: 용신의 오행 (목, 화, 토, 금, 수)
        all_stems: 고려할 천간 리스트

    Returns:
        구신 천간 또는 None
    """
    if yongsin_ohang not in _GUSIN_OHANG_MAP:
        return None

    gusin_ohang = _GUSIN_OHANG_MAP[yongsin_ohang]

    # 해당 오행을 가진 천간 찾기
    for stem in all_stems:
        if stem in GAN_OHANG and GAN_OHANG[stem] == gusin_ohang:
            return stem

    return None


def _find_sanghwa(yongsin_ohang: str, all_stems: list[str]) -> str | None:
    """상화(용신을 생하는 천간 중 사주팔자/육신에 존재하는 것)를 찾습니다.

    Based on manse_ori gungShgj/gil.js sanghwa().

    상화는 용신을 생하는 천간(나를 생하는 것) 중,
    사주팔자 또는 육신에 실제로 존재하는 천간입니다.

    Args:
        yongsin_ohang: 용신의 오행 (목, 화, 토, 금, 수)
        all_stems: 사주팔자/육신의 천간 리스트

    Returns:
        상화 천간 또는 None
    """
    # 오행 상생 관계: 나를 생하는 것
    # 목(수→목), 화(목→화), 토(화→토), 금(토→금), 수(금→수)
    _SANGHWA_SOURCE_MAP: dict[str, str] = {
        "목": "수",  # 수생목
        "화": "목",  # 목생화
        "토": "화",  # 화생토
        "금": "토",  # 토생금
        "수": "금",  # 금생수
    }

    if yongsin_ohang not in _SANGHWA_SOURCE_MAP:
        return None

    source_ohang = _SANGHWA_SOURCE_MAP[yongsin_ohang]

    # 해당 오행을 가진 천간 찾기
    for stem in all_stems:
        if stem in GAN_OHANG and GAN_OHANG[stem] == source_ohang:
            return stem

    return None


def _find_sulhwa(yongsin_ohang: str, all_stems: list[str]) -> str | None:
    """설화(용신을 극하는 천간 중 사주팔자/육신에 존재하는 것)를 찾습니다.

    Based on manse_ori gungShgj/gil.js sulhwa().

    설화는 용신을 극하는 천간(나를 극하는 것) 중,
    사주팔자 또는 육신에 실제로 존재하는 천간입니다.

    Args:
        yongsin_ohang: 용신의 오행 (목, 화, 토, 금, 수)
        all_stems: 사주팔자/육신의 천간 리스트

    Returns:
        설화 천간 또는 None
    """
    # 오행 상극 관계: 나를 극하는 것
    # 목(금극목), 화(수극화), 토(목극토), 금(화극금), 수(토극수)
    _SULHWA_SOURCE_MAP: dict[str, str] = {
        "목": "금",  # 금극목
        "화": "수",  # 수극화
        "토": "목",  # 목극토
        "금": "화",  # 화극금
        "수": "토",  # 토극수
    }

    if yongsin_ohang not in _SULHWA_SOURCE_MAP:
        return None

    source_ohang = _SULHWA_SOURCE_MAP[yongsin_ohang]

    # 해당 오행을 가진 천간 찾기
    for stem in all_stems:
        if stem in GAN_OHANG and GAN_OHANG[stem] == source_ohang:
            return stem

    return None
