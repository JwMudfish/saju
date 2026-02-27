"""Jijanggan (지장간, Hidden Stems) calculation.

Based on manse_ori getjijanggan.js.
Maps each Earthly Branch to its three hidden stems.
"""
from __future__ import annotations

from core.models.domain import HiddenStems

# 지장간 테이블 - manse_ori getjijanggan.js 참조
# 형식: initial(여기), middle(중기, None이면 없음), main(정기)
JIJANGGAN_TABLE: dict[str, HiddenStems] = {
    "자": HiddenStems(initial="임", middle=None, main="계"),
    "축": HiddenStems(initial="계", middle="신", main="기"),
    "인": HiddenStems(initial="무", middle="병", main="갑"),
    "묘": HiddenStems(initial="갑", middle=None, main="을"),
    "진": HiddenStems(initial="을", middle="계", main="무"),
    "사": HiddenStems(initial="무", middle="경", main="병"),
    "오": HiddenStems(initial="병", middle="기", main="정"),
    "미": HiddenStems(initial="정", middle="을", main="기"),
    "신": HiddenStems(initial="무", middle="임", main="경"),
    "유": HiddenStems(initial="경", middle=None, main="신"),
    "술": HiddenStems(initial="신", middle="정", main="무"),
    "해": HiddenStems(initial="무", middle="갑", main="임"),
}


def get_jijanggan(ji: str) -> HiddenStems:
    """지지의 지장간을 반환합니다.

    Args:
        ji: 지지 문자 (자/축/인/묘/진/사/오/미/신/유/술/해)

    Returns:
        HiddenStems (initial, middle, main)
    """
    return JIJANGGAN_TABLE[ji]
