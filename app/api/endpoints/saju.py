from __future__ import annotations

from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.api.deps import get_saju_service
from app.services.saju_service import SajuService
from core.models.response import SajuResult

router = APIRouter(prefix="/api/v1", tags=["Saju"])


class SajuAPIRequest(BaseModel):
    """사주 계산 API 요청 모델."""

    birth_year: int = Field(..., ge=1600, le=2100, description="출생 연도")
    birth_month: int = Field(..., ge=1, le=12, description="출생 월 (1-12)")
    birth_day: int = Field(..., ge=1, le=31, description="출생 일 (1-31)")
    birth_hour: int | None = Field(None, ge=0, le=23, description="출생 시 (0-23, 미상이면 None)")
    is_lunar: bool = Field(False, description="음력 여부")
    is_leap_month: bool = Field(False, description="윤달 여부")
    gender: Literal["male", "female"] = Field(..., description="성별")


@router.post("/saju", response_model=SajuResult)
async def calculate_saju(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> SajuResult:
    """사주 계산 엔드포인트.

    음력 또는 양력 생년월일로 사주팔자를 계산합니다.
    """
    try:
        return service.calculate(
            birth_year=request.birth_year,
            birth_month=request.birth_month,
            birth_day=request.birth_day,
            birth_hour=request.birth_hour,
            is_lunar=request.is_lunar,
            is_leap_month=request.is_leap_month,
            gender=request.gender,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
