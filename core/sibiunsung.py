"""십이운성(十二運星) 계산 모듈.

십이운성은 일간(日干)과 각 기둥의 지지(地支) 관계를 통해
천간이 그 지지에서 어떤 생명 주기 단계에 있는지를 나타낸다.
"""

from __future__ import annotations

from core.constants import GAN_OHANG, GAN_YANG, JI_LIST
from core.models.domain import SibiUnsungItem

# 십이운성 12단계 (순방향 기준: 장생에서 시작)
SIBI_UNSUNG_STAGES: tuple[str, ...] = (
    "장생",  # 0
    "목욕",  # 1
    "관대",  # 2
    "건록",  # 3
    "제왕",  # 4
    "쇠",  # 5
    "병",  # 6
    "사",  # 7
    "묘",  # 8
    "절",  # 9
    "태",  # 10
    "양",  # 11
)

# 오행별 양간(陽干) 기준 장생(長生) 시작 지지
# 음간은 역방향이므로 같은 오행의 양간 장생 지지에서 역산
JANGSAENG_START: dict[str, str] = {
    "목": "해",  # 甲(갑)의 장생 = 亥(해)
    "화": "인",  # 丙(병)의 장생 = 寅(인)
    "토": "신",  # 戊(무)의 장생 = 申(신)
    "금": "사",  # 庚(경)의 장생 = 巳(사)
    "수": "신",  # 壬(임)의 장생 = 申(신)
}

# 지지 순서 인덱스 맵 (빠른 조회용)
JI_INDEX: dict[str, int] = {ji: i for i, ji in enumerate(JI_LIST)}


def calc_sibiunsung(day_gan: str, target_ji: str) -> str:
    """일간과 대상 지지에 대한 십이운성 단계를 계산한다.

    양간(陽干)은 순방향(시계 방향), 음간(陰干)은 역방향으로 계산한다.

    Args:
        day_gan: 일간 천간 (갑, 을, 병, 정, 무, 기, 경, 신, 임, 계)
        target_ji: 대상 지지 (자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해)

    Returns:
        십이운성 단계명 (장생, 목욕, 관대, 건록, 제왕, 쇠, 병, 사, 묘, 절, 태, 양)

    Raises:
        KeyError: 유효하지 않은 천간 또는 지지인 경우
    """
    ohang = GAN_OHANG[day_gan]
    start_ji = JANGSAENG_START[ohang]
    start_idx = JI_INDEX[start_ji]
    target_idx = JI_INDEX[target_ji]

    is_yang = GAN_YANG[day_gan]
    if is_yang:
        # 양간: 순방향 (자->축->인->... 방향)
        stage_idx = (target_idx - start_idx) % 12
    else:
        # 음간: 역방향 (자->해->술->... 방향)
        stage_idx = (start_idx - target_idx) % 12

    return SIBI_UNSUNG_STAGES[stage_idx]


def calc_all_sibiunsung(
    day_gan: str,
    year_ji: str,
    month_ji: str,
    day_ji: str,
    hour_ji: str | None = None,
) -> list[SibiUnsungItem]:
    """사주 4개 기둥 지지에 대한 십이운성을 계산한다.

    Args:
        day_gan: 일간 천간
        year_ji: 년주 지지
        month_ji: 월주 지지
        day_ji: 일주 지지
        hour_ji: 시주 지지 (없으면 None)

    Returns:
        SibiUnsungItem 목록 (year, month, day, hour 순)
    """
    pillars: list[tuple[str, str]] = [
        ("year", year_ji),
        ("month", month_ji),
        ("day", day_ji),
    ]
    if hour_ji is not None:
        pillars.append(("hour", hour_ji))

    return [
        SibiUnsungItem(
            pillar=pillar_name,
            ji=ji,
            stage=calc_sibiunsung(day_gan, ji),
        )
        for pillar_name, ji in pillars
    ]
