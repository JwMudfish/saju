"""Response models for saju calculation engine."""

from __future__ import annotations

from pydantic import BaseModel

from core.models.domain import (
    DeunItem,
    GanJi,
    HiddenStems,
    OHangRatio,
    PillarMeaning,
    SewunItem,
    ShinsalItem,
    SibiUnsungItem,
    YuksinItem,
)


class FourPillars(BaseModel):
    """사주 사기둥 (Four Pillars of Destiny)."""

    year_pillar: GanJi
    month_pillar: GanJi
    day_pillar: GanJi
    hour_pillar: GanJi | None = None


class DeunResult(BaseModel):
    """대운 계산 결과."""

    banghyang: str  # "순행" or "역행"
    deun_su: int  # 대운수 (나이)
    deun_list: list[DeunItem]  # 10개 대운 목록


class SajuResult(BaseModel):
    """사주 계산 전체 결과 (API 응답 모델)."""

    year_pillar: GanJi
    month_pillar: GanJi
    day_pillar: GanJi
    hour_pillar: GanJi | None = None
    deun: DeunResult | None = None
    jijanggan: dict[str, HiddenStems] | None = None
    yuksin_list: list[YuksinItem] | None = None
    ohang_ratio: OHangRatio | None = None
    sibiunsung: list[SibiUnsungItem] | None = None
    shinsal: list[ShinsalItem] | None = None
    sewun: list[SewunItem] | None = None
    pillar_meanings: list[PillarMeaning] | None = None
