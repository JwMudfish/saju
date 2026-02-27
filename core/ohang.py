"""Ohang (오행, Five Elements) calculation functions.

Based on manse_ori getSangSengSangGuk.js and umYang/oHang.js.
"""
from __future__ import annotations

from core.constants import GAN_OHANG, GAN_YANG, JI_OHANG


def get_gan_ohang(gan: str) -> str:
    """천간의 오행을 반환합니다.

    Args:
        gan: 천간 문자 (갑/을/병/정/무/기/경/신/임/계)

    Returns:
        오행 문자 (목/화/토/금/수)
    """
    return GAN_OHANG[gan]


def get_ji_ohang(ji: str) -> str:
    """지지의 오행을 반환합니다.

    Args:
        ji: 지지 문자 (자/축/인/묘/진/사/오/미/신/유/술/해)

    Returns:
        오행 문자 (목/화/토/금/수)
    """
    return JI_OHANG[ji]


def is_yang(gan: str) -> bool:
    """천간의 음양을 반환합니다.

    Args:
        gan: 천간 문자

    Returns:
        True = 양 (Yang), False = 음 (Yin)
    """
    return GAN_YANG[gan]


def ohang_relation(base_ohang: str, target_ohang: str) -> str:
    """두 오행 사이의 상생상극 관계를 반환합니다.

    Based on manse_ori getSangSengSangGuk.js sssg function.

    Relation types:
        - "me": 같은 오행 (비화)
        - "shang_go": base가 target을 생함 (상생, 나를 생)
        - "shang_come": target이 base를 생함 (상생, 나를 생받음)
        - "geuk_go": base가 target을 극함 (상극, 나를 극)
        - "geuk_come": target이 base를 극함 (상극, 나를 극받음)

    Args:
        base_ohang: 기준 오행 (일간의 오행)
        target_ohang: 비교 대상 오행

    Returns:
        관계 문자열 ("me", "shang_go", "shang_come", "geuk_go", "geuk_come")
    """
    if base_ohang == target_ohang:
        return "me"

    # 오행 상생 관계: 목->화->토->금->수->목
    # 오행 상극 관계: 목->토->수->화->금->목
    relations: dict[str, dict[str, str]] = {
        "목": {
            "수": "shang_come",  # 수가 목을 생
            "화": "shang_go",    # 목이 화를 생
            "토": "geuk_go",     # 목이 토를 극
            "금": "geuk_come",   # 금이 목을 극
        },
        "화": {
            "목": "shang_come",  # 목이 화를 생
            "토": "shang_go",    # 화가 토를 생
            "금": "geuk_go",     # 화가 금을 극
            "수": "geuk_come",   # 수가 화를 극
        },
        "토": {
            "화": "shang_come",  # 화가 토를 생
            "금": "shang_go",    # 토가 금을 생
            "수": "geuk_go",     # 토가 수를 극
            "목": "geuk_come",   # 목이 토를 극
        },
        "금": {
            "토": "shang_come",  # 토가 금을 생
            "수": "shang_go",    # 금이 수를 생
            "목": "geuk_go",     # 금이 목을 극
            "화": "geuk_come",   # 화가 금을 극
        },
        "수": {
            "금": "shang_come",  # 금이 수를 생
            "목": "shang_go",    # 수가 목을 생
            "화": "geuk_go",     # 수가 화를 극
            "토": "geuk_come",   # 토가 수를 극
        },
    }

    return relations[base_ohang][target_ohang]
