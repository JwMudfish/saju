from __future__ import annotations

from typing import Literal

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.api.deps import get_interpretation_service, get_saju_service
from app.services.content_loader import (
    YUKSIN_TO_GYOUK,
    get_bestfriend_content,
    get_gusin_content,
    get_gyouk_content,
    get_hapchung_content,
    get_hisin_content,
    get_hisin_gisin_content,
    get_ilgan_content,
    get_ilgan_hw_content,
    get_ilgan_love_content,
    get_jisok_content,
    get_joonghwa_content,
    get_hwakjang_content,
    get_light_question_content,
    get_old_young_content,
    get_sangsin_compliment_content,
    get_salary_content,
    get_sangsin_content,
    get_shgj_gilhung_content,
    get_yongsin_content,
    get_gusin_gisin_content,
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
from core.shgj import calc_shgj

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
    dang_ryeong = result.yongshin.dang_ryeong if result.yongshin else None
    yongsin_content = get_yongsin_content(dang_ryeong) if dang_ryeong else None
    hisin_content = get_hisin_content(dang_ryeong) if dang_ryeong else None
    hisin_gisin_content = get_hisin_gisin_content()
    salary_content = get_salary_content()

    # TASK-003: 신격(Shgj) 계산 및 컨텐츠 로드
    shgj_result = None
    sangsin_content = None
    gusin_content = None
    shgj_gilhung_content = None

    # shgj 계산 (용신, 육신, 격국이 모두 있을 때)
    if (
        dang_ryeong
        and result.yuksin_list
        and gyouk_name
    ):
        try:
            # FourPillars 구성
            from core.models.response import FourPillars as FourPillarsModel
            pillars = FourPillarsModel(
                year_pillar=result.year_pillar,
                month_pillar=result.month_pillar,
                day_pillar=result.day_pillar,
                hour_pillar=result.hour_pillar,
            )

            shgj_result = calc_shgj(
                pillars=pillars,
                gyouk_name=gyouk_name,
                yuksin_list=result.yuksin_list,
                dang_ryeong=dang_ryeong,
            )

            # 상신/구신 컨텐츠 로드
            if shgj_result.sangsin:
                sangsin_content = get_sangsin_content(shgj_result.sangsin)
            if shgj_result.gusin:
                gusin_content = get_gusin_content(shgj_result.gusin)

            # 길흉 컨텐츠 로드 (격국 기반)
            if gyouk_name:
                # MVP: 길신 컨텐츠만 로드 (향후 확장 가능)
                shgj_gilhung_content = get_shgj_gilhung_content(gyouk_name, is_gil=True)

        except Exception:
            # shgj 계산 실패 시 기존 동작 유지 (None 반환)
            shgj_result = None

    # Phase 1: 영격령 세부지표 컨텐츠 로드
    sangsin_compliment_content = None
    gusin_gisin_content = None
    jisok_content = None
    joonghwa_content = None
    hwakjang_content = None

    # 상신 보완 컨텐츠 로드
    if shgj_result and shgj_result.sangsin:
        sangsin_compliment_content = get_sangsin_compliment_content(shgj_result.sangsin)

    # 구신 기신 컨텐츠 로드
    if shgj_result and shgj_result.gusin:
        gusin_gisin_content = get_gusin_gisin_content(shgj_result.gusin)

    # 영격령 세부지표 컨텐츠 로드
    # jisok, joonghwa, hwakjang 필드는 ShgjResult에서 직접 가져옴
    if shgj_result and shgj_result.jisok:
        jisok_content = get_jisok_content(shgj_result.jisok)
    if shgj_result and shgj_result.joonghwa:
        joonghwa_content = get_joonghwa_content(shgj_result.joonghwa)
    if shgj_result and shgj_result.hwakjang:
        hwakjang_content = get_hwakjang_content(shgj_result.hwakjang)

    # Phase 2: 합충 관계, 일간 화월, 일간 연애, 베프 유형 컨텐츠 로드
    hapchung_content = None
    ilgan_hw_content = None
    ilgan_love_content = None
    bestfriend_content = None

    # 합충 관계 컨텐츠 로드
    if result.hapchung:
        hapchung_type = service._determine_hapchung_type(result.hapchung)
        hapchung_content = get_hapchung_content(hapchung_type)

    # 일간 화월 컨텐츠 로드 (일간 + 월지)
    month_ji = result.month_pillar.ji
    ilgan_hw_content = get_ilgan_hw_content(day_gan, month_ji)

    # 일간 연애 컨텐츠 로드
    ilgan_love_content = get_ilgan_love_content(day_gan)

    # 베프 유형 컨텐츠 로드 (육신 기반 - 임시로 일간 사용)
    # 향후 정책 결정 후 세부 로직 구현 필요
    bestfriend_content = get_bestfriend_content(day_gan)

    # Phase 3: 노소 유형, 경운 질문 컨텐츠 로드
    old_young_content = None
    light_question_content = None

    # 노소 유형 컨텐츠 로드 (일간 + 월지)
    month_ji = result.month_pillar.ji
    old_young_content = get_old_young_content(day_gan, month_ji)

    # 경운 질문 컨텐츠 로드 (q1: 용신 기반)
    # MVP: q1 용신 기반 질문만 로드
    if dang_ryeong:
        light_question_content = get_light_question_content('q1', 'yongsin')

    return IdentityResponse(
        day_gan=day_gan,
        gyouk_name=gyouk_name,
        yongshin=result.yongshin,
        ilgan_content=ilgan_content,
        gyouk_content=gyouk_content,
        yongsin_content=yongsin_content,
        hisin_content=hisin_content,
        hisin_gisin_content=hisin_gisin_content,
        salary_content=salary_content,
        shgj=shgj_result,
        sangsin_content=sangsin_content,
        gusin_content=gusin_content,
        shgj_gilhung_content=shgj_gilhung_content,
        sangsin_compliment_content=sangsin_compliment_content,
        gusin_gisin_content=gusin_gisin_content,
        jisok_content=jisok_content,
        joonghwa_content=joonghwa_content,
        hwakjang_content=hwakjang_content,
        hapchung_content=hapchung_content,
        ilgan_hw_content=ilgan_hw_content,
        ilgan_love_content=ilgan_love_content,
        bestfriend_content=bestfriend_content,
        old_young_content=old_young_content,
        light_question_content=light_question_content,
    )
