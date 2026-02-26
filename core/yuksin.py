"""Yuksin (육신, Six Relations) calculation module.

Based on manse_ori getYukSin.js.
Calculates the relationship (육신) between the day master (일간) and a target stem (천간).
"""
from core.ohang import get_gan_ohang, is_yang, ohang_relation


def calc_yuksin(day_gan: str, target_gan: str) -> str:
    """일간 기준 대상 천간의 육신을 계산합니다.

    manse_ori getYukSin.js yang/um 함수 기반.

    육신 결정 로직:
    - 양일간: me+양=비견, me+음=겁재
                shang_come+양=편인, shang_come+음=정인
                shang_go+양=식신, shang_go+음=상관
                geuk_go+양=편재, geuk_go+음=정재
                geuk_come+양=편관, geuk_come+음=정관
    - 음일간: me+양=겁재, me+음=비견
                shang_come+양=정인, shang_come+음=편인
                shang_go+양=상관, shang_go+음=식신
                geuk_go+양=정재, geuk_go+음=편재
                geuk_come+양=정관, geuk_come+음=편관

    Args:
        day_gan: 일간 천간 (갑/을/병/정/무/기/경/신/임/계)
        target_gan: 비교 대상 천간 (갑/을/병/정/무/기/경/신/임/계)

    Returns:
        육신 이름 (비견/겁재/식신/상관/편재/정재/편관/정관/편인/정인)
    """
    base_ohang = get_gan_ohang(day_gan)
    target_ohang = get_gan_ohang(target_gan)
    relation = ohang_relation(base_ohang, target_ohang)
    day_is_yang = is_yang(day_gan)
    target_is_yang = is_yang(target_gan)

    if day_is_yang:
        # 양일간 기준
        if relation == "me":
            return "비견" if target_is_yang else "겁재"
        elif relation == "shang_come":
            return "편인" if target_is_yang else "정인"
        elif relation == "shang_go":
            return "식신" if target_is_yang else "상관"
        elif relation == "geuk_go":
            return "편재" if target_is_yang else "정재"
        else:  # geuk_come
            return "편관" if target_is_yang else "정관"
    else:
        # 음일간 기준
        if relation == "me":
            return "겁재" if target_is_yang else "비견"
        elif relation == "shang_come":
            return "정인" if target_is_yang else "편인"
        elif relation == "shang_go":
            return "상관" if target_is_yang else "식신"
        elif relation == "geuk_go":
            return "정재" if target_is_yang else "편재"
        else:  # geuk_come
            return "정관" if target_is_yang else "편관"
