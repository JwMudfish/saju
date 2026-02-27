"""Request models for saju calculation."""
from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


class SajuRequest(BaseModel):
    """Request model for saju (四柱) calculation."""

    year: int = Field(..., ge=1600, le=2100, description="양력 연도")
    month: int = Field(..., ge=1, le=12, description="양력 월 (1-12)")
    day: int = Field(..., ge=1, le=31, description="양력 일 (1-31)")
    hour: int | None = Field(None, ge=0, le=23, description="시각 (0-23, None이면 미상)")
    gender: Literal["male", "female"] = Field(..., description="성별 (male/female)")
    is_lunar: bool = Field(False, description="음력 여부")
    is_leap_month: bool = Field(False, description="윤달 여부 (is_lunar=True일 때만 유효)")
