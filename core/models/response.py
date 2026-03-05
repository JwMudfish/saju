"""Response models for saju calculation engine."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel

from core.models.domain import (
    DeunItem,
    GanJi,
    HapchungRelation,
    HiddenStems,
    OHangRatio,
    PillarMeaning,
    SewunItem,
    ShinsalItem,
    SibiUnsungItem,
    YongshinResult,
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
    hapchung: list[HapchungRelation] | None = None
    yongshin: YongshinResult | None = None


class InterpretResult(BaseModel):
    """LLM 사주 해석 결과."""

    interpretation: str
    model: str
    is_fallback: bool


class PillarsResponse(BaseModel):
    """사기둥(Four Pillars) 개별 응답 모델."""

    year_pillar: GanJi
    month_pillar: GanJi
    day_pillar: GanJi
    hour_pillar: GanJi | None = None
    pillar_meanings: list[PillarMeaning] | None = None


class AnalysisResponse(BaseModel):
    """사주 분석 결과 응답 모델."""

    yuksin_list: list[YuksinItem] | None = None
    hapchung: list[HapchungRelation] | None = None
    ohang_ratio: OHangRatio | None = None
    jijanggan: dict[str, HiddenStems] | None = None
    sibiunsung: list[SibiUnsungItem] | None = None
    shinsal: list[ShinsalItem] | None = None


class FortuneResponse(BaseModel):
    """운세(대운/세운) 응답 모델."""

    deun: DeunResult | None = None
    sewun: list[SewunItem] | None = None


class IdentityResponse(BaseModel):
    """일간 정체성(격국/용신) 응답 모델."""

    day_gan: str
    gyouk_name: str | None = None
    yongshin: YongshinResult | None = None
    ilgan_content: dict[str, Any] | None = None
    gyouk_content: dict[str, Any] | None = None
    yongsin_content: dict[str, Any] | None = None
