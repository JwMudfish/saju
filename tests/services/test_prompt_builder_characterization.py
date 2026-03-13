"""prompt_builder.py 동작 특성화 테스트.

기존 동작을 포착하여 회귀 방지를 위한 안전망을 제공한다.
DDD PRESERVE 단계의 일부로 작성되었다.
"""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from app.services.prompt_builder import build_interpretation_prompt
from core.models.domain import DeunItem, GanJi, OHangRatio, YuksinItem, YongshinResult
from core.models.response import DeunResult, SajuResult


@pytest.fixture
def sample_saju_result() -> SajuResult:
    """특성화 테스트용 샘플 사주 결과."""
    return SajuResult(
        year_pillar=GanJi(gan="갑", ji="자"),
        month_pillar=GanJi(gan="병", ji="인"),
        day_pillar=GanJi(gan="경", ji="오"),
        hour_pillar=GanJi(gan="임", ji="술"),
        deun=DeunResult(
            banghyang="순행",
            deun_su=5,
            deun_list=[
                DeunItem(age=15, ganji=GanJi(gan="을", ji="축")),
                DeunItem(age=25, ganji=GanJi(gan="병", ji="인")),
            ],
        ),
        ohang_ratio=OHangRatio(mok=20.0, hwa=15.0, to=30.0, geum=25.0, su=10.0),
        yuksin_list=[
            YuksinItem(target="년간", yuksin="정재"),
            YuksinItem(target="월간", yuksin="편관"),
            YuksinItem(target="일지", yuksin="비견"),
            YuksinItem(target="시간", yuksin="식신"),
        ],
        yongshin=YongshinResult(dang_ryeong="경", heuisin="정"),
        shinsal=[],
        sewun=None,
        jijanggan=None,
        sibiunsung=None,
        pillar_meanings=None,
        hapchung=None,
        shgj=None,
    )


def test_characterize_prompt_structure_without_content_loader(sample_saju_result: SajuResult) -> None:
    """ContentLoader 없을 때 프롬프트 구조를 특성화한다.

    [PRESERVE] 기존 동작: ContentLoader가 없어도 프롬프트가 정상적으로 생성되어야 한다.
    """
    system_prompt, user_prompt = build_interpretation_prompt(sample_saju_result)

    # 시스템 프롬프트는 고정값
    assert "사주팔자" in system_prompt
    assert "전문 해석가" in system_prompt

    # 사용자 프롬프트에 필수 섹션 포함
    assert "## 사주 사기둥" in user_prompt
    assert "년주: 갑자" in user_prompt
    assert "월주: 병인" in user_prompt
    assert "일주: 경오" in user_prompt
    assert "시주: 임술" in user_prompt

    # 대운 정보 포함
    assert "## 대운 흐름" in user_prompt
    assert "행운 방향: 순행" in user_prompt
    assert "대운수: 5세" in user_prompt

    # 오행 비율 포함
    assert "## 오행 균형 분석" in user_prompt
    assert "목(木): 20.0%" in user_prompt
    assert "화(火): 15.0%" in user_prompt
    assert "토(土): 30.0%" in user_prompt
    assert "금(金): 25.0%" in user_prompt
    assert "수(水): 10.0%" in user_prompt

    # 신살 분석 포함
    assert "## 신살 분석" in user_prompt
    assert "신살 없음" in user_prompt

    # 육신 분석 포함
    assert "## 육신 분석" in user_prompt

    # 해석 요청 사항 포함
    assert "## 해석 요청 사항" in user_prompt
    assert "사주 총평" in user_prompt
    assert "성격 및 기질 분석" in user_prompt
    assert "대운 흐름" in user_prompt
    assert "신살 영향" in user_prompt
    assert "오행 균형" in user_prompt
    assert "종합 조언" in user_prompt


def test_characterize_prompt_without_hour_pillar() -> None:
    """시주가 없는 경우 프롬프트 동작을 특성화한다.

    [PRESERVE] 기존 동작: 시주가 없어도 "시주: 미상"으로 표시되어야 한다.
    """
    saju_result = SajuResult(
        year_pillar=GanJi(gan="갑", ji="자"),
        month_pillar=GanJi(gan="병", ji="인"),
        day_pillar=GanJi(gan="경", ji="오"),
        hour_pillar=None,
        deun=None,
        ohang_ratio=OHangRatio(mok=20.0, hwa=20.0, to=20.0, geum=20.0, su=20.0),
        yuksin_list=[],
        yongshin=None,
        shinsal=[],
        sewun=None,
        jijanggan=None,
        sibiunsung=None,
        pillar_meanings=None,
        hapchung=None,
        shgj=None,
    )

    _, user_prompt = build_interpretation_prompt(saju_result)

    assert "시주: 미상" in user_prompt


def test_characterize_prompt_with_user_question(sample_saju_result: SajuResult) -> None:
    """사용자 질문이 있을 때 프롬프트 동작을 특성화한다.

    [PRESERVE] 기존 동작: 사용자 질문이 프롬프트에 포함되어야 한다.
    """
    user_question = "직업 운은 어떨까요?"

    _, user_prompt = build_interpretation_prompt(sample_saju_result, user_context=user_question)

    assert "## 사용자 질문" in user_prompt
    assert user_question in user_prompt


def test_characterize_prompt_with_empty_saju_result() -> None:
    """최소한의 사주 결과로 프롬프트 생성 동작을 특성화한다.

    [PRESERVE] 기존 동작: 최소 데이터로도 프롬프트가 생성되어야 한다.
    """
    saju_result = SajuResult(
        year_pillar=GanJi(gan="갑", ji="자"),
        month_pillar=GanJi(gan="병", ji="인"),
        day_pillar=GanJi(gan="경", ji="오"),
        hour_pillar=None,
        deun=None,
        ohang_ratio=None,
        yuksin_list=None,
        yongshin=None,
        shinsal=[],
        sewun=None,
        jijanggan=None,
        sibiunsung=None,
        pillar_meanings=None,
        hapchung=None,
        shgj=None,
    )

    system_prompt, user_prompt = build_interpretation_prompt(saju_result)

    # 필수 구조는 유지되어야 함
    assert system_prompt
    assert user_prompt
    assert "## 사주 사기둥" in user_prompt
    assert "년주:" in user_prompt
    assert "월주:" in user_prompt
    assert "일주:" in user_prompt
    assert "시주: 미상" in user_prompt


def test_characterize_prompt_returns_tuple() -> None:
    """프롬프트 빌더 반환값 타입을 특성화한다.

    [PRESERVE] 기존 동작: 항상 (str, str) 튜플을 반환해야 한다.
    """
    saju_result = SajuResult(
        year_pillar=GanJi(gan="갑", ji="자"),
        month_pillar=GanJi(gan="병", ji="인"),
        day_pillar=GanJi(gan="경", ji="오"),
        hour_pillar=None,
        deun=None,
        ohang_ratio=None,
        yuksin_list=None,
        yongshin=None,
        shinsal=[],
        sewun=None,
        jijanggan=None,
        sibiunsung=None,
        pillar_meanings=None,
        hapchung=None,
        shgj=None,
    )

    result = build_interpretation_prompt(saju_result)

    assert isinstance(result, tuple)
    assert len(result) == 2
    assert isinstance(result[0], str)
    assert isinstance(result[1], str)
