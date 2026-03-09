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
    ShgjResult,
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
    shgj: ShgjResult | None = None


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
    ilgan_content: dict[str, Any] | None = None       # 일간 콘텐츠 (ilgan content)
    gyouk_content: dict[str, Any] | None = None       # 격국 콘텐츠 (gyouk content)
    yongsin_content: dict[str, Any] | None = None     # 용신 콘텐츠 (yongsin content)
    hisin_content: dict[str, Any] | None = None       # 희신 콘텐츠 (hisin content)
    hisin_gisin_content: dict[str, Any] | None = None  # 희기신 콘텐츠 (hisin-gisin content)
    salary_content: dict[str, Any] | None = None      # 연봉 콘텐츠 (salary content)
    shgj: ShgjResult | None = None                    # 신격 분석 결과 (shgj result)
    sangsin_content: dict[str, Any] | None = None     # 상신 설명 콘텐츠 (sangsin content)
    gusin_content: dict[str, Any] | None = None       # 구신 설명 콘텐츠 (gusin content)
    shgj_gilhung_content: dict[str, Any] | None = None  # 신격 길흉 콘텐츠 (shgj gilhung content)
