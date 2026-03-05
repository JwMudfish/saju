from __future__ import annotations

from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.api.deps import get_interpretation_service, get_saju_service
from app.services.content_loader import (
    YUKSIN_TO_GYOUK,
    get_gyouk_content,
    get_ilgan_content,
    get_yongsin_content,
)
from app.services.interpretation_service import InterpretationService
from app.services.saju_service import SajuService
from core.models.response import (
    AnalysisResponse,
    FortuneResponse,
    IdentityResponse,
    InterpretResult,
    PillarsResponse,
    SajuResult,
)

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


class InterpretRequest(BaseModel):
    """사주 해석 API 요청 모델."""

    saju_result: SajuResult
    user_context: str | None = Field(None, description="사용자 추가 질문")


@router.post("/saju/interpret", response_model=InterpretResult)
async def interpret_saju(
    request: InterpretRequest,
    service: InterpretationService = Depends(get_interpretation_service),
) -> InterpretResult:
    """사주 해석 엔드포인트.

    LLM(Claude)을 사용하여 사주 데이터를 자연어로 해석합니다.
    ANTHROPIC_API_KEY가 없으면 fallback 응답을 반환합니다.
    """
    try:
        return await service.interpret(request.saju_result, request.user_context)
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e)) from e
    except TimeoutError as e:
        raise HTTPException(status_code=504, detail=str(e)) from e


@router.post("/saju/pillars", response_model=PillarsResponse, tags=["Saju Pillars"])
async def get_pillars(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> PillarsResponse:
    """사주 사기둥(四柱) 개별 조회 엔드포인트.

    사기둥(년주/월주/일주/시주)과 기둥별 상징 의미를 반환합니다.
    """
    try:
        result = service.calculate(
            birth_year=request.birth_year,
            birth_month=request.birth_month,
            birth_day=request.birth_day,
            birth_hour=request.birth_hour,
            is_lunar=request.is_lunar,
            is_leap_month=request.is_leap_month,
            gender=request.gender,
        )
        return PillarsResponse(
            year_pillar=result.year_pillar,
            month_pillar=result.month_pillar,
            day_pillar=result.day_pillar,
            hour_pillar=result.hour_pillar,
            pillar_meanings=result.pillar_meanings,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/saju/analysis", response_model=AnalysisResponse, tags=["Saju Analysis"])
async def get_analysis(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> AnalysisResponse:
    """사주 분석 결과 개별 조회 엔드포인트.

    육신, 합충, 오행 비율, 지장간, 십이운성, 신살을 반환합니다.
    """
    try:
        result = service.calculate(
            birth_year=request.birth_year,
            birth_month=request.birth_month,
            birth_day=request.birth_day,
            birth_hour=request.birth_hour,
            is_lunar=request.is_lunar,
            is_leap_month=request.is_leap_month,
            gender=request.gender,
        )
        return AnalysisResponse(
            yuksin_list=result.yuksin_list,
            hapchung=result.hapchung,
            ohang_ratio=result.ohang_ratio,
            jijanggan=result.jijanggan,
            sibiunsung=result.sibiunsung,
            shinsal=result.shinsal,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/saju/fortune", response_model=FortuneResponse, tags=["Saju Fortune"])
async def get_fortune(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> FortuneResponse:
    """사주 운세(대운/세운) 개별 조회 엔드포인트.

    대운과 세운 정보를 반환합니다.
    """
    try:
        result = service.calculate(
            birth_year=request.birth_year,
            birth_month=request.birth_month,
            birth_day=request.birth_day,
            birth_hour=request.birth_hour,
            is_lunar=request.is_lunar,
            is_leap_month=request.is_leap_month,
            gender=request.gender,
        )
        return FortuneResponse(
            deun=result.deun,
            sewun=result.sewun,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e)) from e


@router.post("/saju/identity", response_model=IdentityResponse, tags=["Saju Identity"])
async def get_identity(
    request: SajuAPIRequest,
    service: SajuService = Depends(get_saju_service),
) -> IdentityResponse:
    """사주 정체성(일간/격국/용신) 개별 조회 엔드포인트.

    일간, 격국명, 용신, 관련 콘텐츠를 반환합니다.
    콘텐츠 로딩 실패 시 null 반환(HTTP 200).
    """
    try:
        result = service.calculate(
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

    day_gan = result.day_pillar.gan

    # 격국명: 육신 목록에서 target == "월지" 항목의 yuksin으로 변환
    gyouk_name: str | None = None
    if result.yuksin_list:
        for item in result.yuksin_list:
            if item.target == "월지":
                gyouk_name = YUKSIN_TO_GYOUK.get(item.yuksin)
                break

    # 콘텐츠 로딩 (실패 시 None, HTTP 200 유지)
    ilgan_content = get_ilgan_content(day_gan)
    gyouk_content = get_gyouk_content(gyouk_name) if gyouk_name else None
    yongsin_content = (
        get_yongsin_content(result.yongshin.dang_ryeong) if result.yongshin else None
    )

    return IdentityResponse(
        day_gan=day_gan,
        gyouk_name=gyouk_name,
        yongshin=result.yongshin,
        ilgan_content=ilgan_content,
        gyouk_content=gyouk_content,
        yongsin_content=yongsin_content,
    )
