from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.api.deps import get_calendar_service
from app.services.calendar_service import CalendarService

router = APIRouter(prefix="/api/v1/calendar", tags=["Calendar"])


class LunarConvertRequest(BaseModel):
    """음력 → 양력 변환 요청 모델."""

    year: int = Field(..., ge=1600, le=2100, description="음력 연도")
    month: int = Field(..., ge=1, le=12, description="음력 월 (1-12)")
    day: int = Field(..., ge=1, le=30, description="음력 일 (1-30)")
    is_leap_month: bool = Field(False, description="윤달 여부")


class SolarDateResponse(BaseModel):
    """양력 날짜 응답 모델."""

    solar_year: int
    solar_month: int
    solar_day: int


@router.post("/convert", response_model=SolarDateResponse)
async def convert_lunar_to_solar(
    request: LunarConvertRequest,
    service: CalendarService = Depends(get_calendar_service),
) -> SolarDateResponse:
    """음력 날짜를 양력으로 변환합니다."""
    try:
        solar_year, solar_month, solar_day = service.convert_lunar_to_solar(
            year=request.year,
            month=request.month,
            day=request.day,
            is_leap_month=request.is_leap_month,
        )
        return SolarDateResponse(
            solar_year=solar_year,
            solar_month=solar_month,
            solar_day=solar_day,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
