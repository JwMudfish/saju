"""prompt_builder.py 신규 기능 TDD 테스트.

SPEC-PROMPT-001의 신규 기능에 대한 테스트 우선 개발 (TDD 방식).
RED-GREEN-REFACTOR 사이클의 RED 단계 테스트들을 포함한다.
"""

from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from app.services.prompt_builder import (
    _build_core_summary_section,
    _build_myeongli_content_section,
    _build_saju_summary_instruction,
    _build_sewun_json_instruction,
    _build_user_question_section,
    _extract_question_category,
    _yuksin_to_gyouk,
    build_interpretation_prompt,
)
from core.models.domain import DeunItem, GanJi, OHangRatio, SewunItem, YongshinResult, YuksinItem
from core.models.response import DeunResult, SajuResult


@pytest.fixture
def mock_content_loader() -> MagicMock:
    """ContentLoader 목 객체."""
    loader = MagicMock()
    return loader


@pytest.fixture
def sample_saju_result() -> SajuResult:
    """테스트용 샘플 사주 결과."""
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


class TestQuestionCategoryExtraction:
    """질문 카테고리 분류 기능 테스트 (SPEC-PROMPT-003)."""

    def test_extract_career_category(self) -> None:
        """직업 관련 질문 카테고리를 올바르게 분류한다."""
        questions = [
            "직업 운은 어떨까요?",
            "취업은 언제 될까요?",
            "업무가 잘 풀릴까요?",
            "일을 시작해야 할까요?",
            "커리어 변경이 좋을까요?",
        ]

        for question in questions:
            category = _extract_question_category(question)
            assert category == "직업", f"질문 '{question}'의 카테고리가 '직업'이어야 함"

    def test_extract_love_category(self) -> None:
        """연애 관련 질문 카테고리를 올바르게 분류한다."""
        questions = [
            "연애 운은 어떨까요?",
            "결혼은 언제 할 수 있을까요?",
            "애인이 생길까요?",
            "짝사랑이 성사될까요?",
            "배우자 자질이 어떨까요?",
        ]

        for question in questions:
            category = _extract_question_category(question)
            assert category == "연애", f"질문 '{question}'의 카테고리가 '연애'여야 함"

    def test_extract_wealth_category(self) -> None:
        """재물 관련 질문 카테고리를 올바르게 분류한다."""
        questions = [
            "돈은 많이 벌 수 있을까요?",
            "재물 운은 어떨까요?",
            "부자가 될 수 있을까요?",
            "연봉이 오를까요?",
            "재정 관리는 어떻게 할까요?",
        ]

        for question in questions:
            category = _extract_question_category(question)
            assert category == "재물", f"질문 '{question}'의 카테고리가 '재물'이어야 함"

    def test_extract_health_category(self) -> None:
        """건강 관련 질문 카테고리를 올바르게 분류한다."""
        questions = [
            "건강은 어떨까요?",
            "병이 생길까요?",
            "몸이 약해질까요?",
            "운동을 해야 할까요?",
        ]

        for question in questions:
            category = _extract_question_category(question)
            assert category == "건강", f"질문 '{question}'의 카테고리가 '건강'이어야 함"

    def test_extract_no_category(self) -> None:
        """분류 불가능한 질문은 None을 반환한다."""
        questions = [
            "운세가 어떨까요?",
            "앞으로 어떻게 될까요?",
            "인생이 어떻게 될까요?",
        ]

        for question in questions:
            category = _extract_question_category(question)
            assert category is None, f"질문 '{question}'은 분류 불가능해야 함"

    def test_extract_with_empty_string(self) -> None:
        """빈 문자열은 None을 반환한다."""
        assert _extract_question_category("") is None
        assert _extract_question_category(None) is None  # type: ignore


class TestCoreSummaryBuilding:
    """핵심 판단 요약 생성 기능 테스트 (SPEC-PROMPT-002)."""

    def test_core_summary_includes_day_gan(self, sample_saju_result: SajuResult) -> None:
        """핵심 요약에 일간 정보가 포함된다."""
        summary = _build_core_summary_section(sample_saju_result)

        assert "## 핵심 판단 요약" in summary
        assert "**일간**: 경" in summary

    def test_core_summary_includes_ohang_analysis(self, sample_saju_result: SajuResult) -> None:
        """핵심 요약에 오행 분석이 포함된다."""
        summary = _build_core_summary_section(sample_saju_result)

        assert "**오행 분석**:" in summary
        assert "가장 강한 오행" in summary
        assert "가장 약한 오행" in summary
        assert "토(30.0%)" in summary  # 가장 강한 오행
        assert "수(10.0%)" in summary  # 가장 약한 오행

    def test_core_summary_identifies_imbalance(self, sample_saju_result: SajuResult) -> None:
        """오행 불균형(20% 이상 차이)을 식별한다."""
        summary = _build_core_summary_section(sample_saju_result)

        assert "**특징**:" in summary
        assert "과다하게 강하고" in summary
        assert "부족함" in summary

    def test_core_summary_includes_yuksin(self, sample_saju_result: SajuResult) -> None:
        """핵심 요약에 핵심 십신이 포함된다."""
        summary = _build_core_summary_section(sample_saju_result)

        assert "**핵심 십신**:" in summary

    def test_core_summary_includes_yongsin_heuisin(self, sample_saju_result: SajuResult) -> None:
        """핵심 요약에 용신/희신 정보가 포함된다."""
        summary = _build_core_summary_section(sample_saju_result)

        assert "**용신**: 경" in summary
        assert "**희신**: 정" in summary


class TestMyeongliContentBuilding:
    """명리학 콘텐츠 주입 기능 테스트 (SPEC-PROMPT-001)."""

    def test_myeongli_content_includes_ilgan(self, sample_saju_result: SajuResult, mock_content_loader: MagicMock) -> None:
        """일간 콘텐츠가 명리학 섹션에 포함된다."""
        # 목 설정: 일간 콘텐츠 반환
        mock_content_loader.get_ilgan_content.return_value = {
            "title": "경금일간",
            "subtitle": "단단한 결단력/매력/",
            "description": "경금일간은 단단한 결단력과 매력을 가집니다.",
        }

        content = _build_myeongli_content_section(sample_saju_result, mock_content_loader)

        assert "## 명리학 콘텐츠" in content
        assert "### 일간: 경" in content
        assert "**제목**: 경금일간" in content
        assert "단단한 결단력" in content

        # ContentLoader.get_ilgan_content가 호출되었는지 확인
        mock_content_loader.get_ilgan_content.assert_called_once_with("경")

    def test_myeongli_content_includes_yongsin(self, sample_saju_result: SajuResult, mock_content_loader: MagicMock) -> None:
        """용신 콘텐츠가 명리학 섹션에 포함된다."""
        mock_content_loader.get_yongsin_content.return_value = {
            "title": "수 용신",
            "subtitle": "지혜로운 해결사/",
            "description": "수 용신은 지혜로운 해결사 역할을 합니다.",
        }

        content = _build_myeongli_content_section(sample_saju_result, mock_content_loader)

        assert "### 용신: 경" in content
        assert "**제목**: 수 용신" in content
        assert "지혜로운 해결사" in content

        mock_content_loader.get_yongsin_content.assert_called_once_with("경")

    def test_myeongli_content_includes_hisin(self, sample_saju_result: SajuResult, mock_content_loader: MagicMock) -> None:
        """희신 콘텐츠가 명리학 섹션에 포함된다."""
        mock_content_loader.get_hisin_content.return_value = {
            "title": "정 희신",
            "description": "정 희신은 따뜻한 조력자 역할을 합니다.",
        }

        content = _build_myeongli_content_section(sample_saju_result, mock_content_loader)

        assert "### 희신: 정" in content
        assert "**제목**: 정 희신" in content

        mock_content_loader.get_hisin_content.assert_called_once_with("경", hisin_yes=True)

    def test_myeongli_content_handles_missing_content(self, sample_saju_result: SajuResult, mock_content_loader: MagicMock) -> None:
        """콘텐츠가 없어도 에러 없이 처리한다."""
        mock_content_loader.get_ilgan_content.return_value = None
        mock_content_loader.get_yongsin_content.return_value = None
        mock_content_loader.get_hisin_content.return_value = None

        content = _build_myeongli_content_section(sample_saju_result, mock_content_loader)

        # 섹션 헤더는 존재하지만, 내용이 없으면 빈 문자열 반환
        if content:
            assert "## 명리학 콘텐츠" in content

    def test_myeongli_content_truncates_long_description(self, sample_saju_result: SajuResult, mock_content_loader: MagicMock) -> None:
        """300자를 초과하는 설명은 잘려서 표시된다."""
        long_description = "A" * 400  # 400자 설명
        mock_content_loader.get_ilgan_content.return_value = {
            "title": "경금일간",
            "subtitle": "단단한 결단력/",
            "description": long_description,
        }

        content = _build_myeongli_content_section(sample_saju_result, mock_content_loader)

        # 300자 + "..." 형태로 잘려야 함
        assert "..." in content
        # 실제 설명 부분이 잘려있는지 확인
        assert "AAA..." in content  # 잘린 설명이 "..."로 끝나야 함
        # 전체 내용에 설명이 포함되지만 길이는 제한되어야 함
        assert "경금일간" in content
        assert "단단한 결단력" in content


class TestUserQuestionBuilding:
    """사용자 질문 섹션 생성 기능 테스트 (SPEC-PROMPT-003)."""

    def test_question_section_without_question(self) -> None:
        """질문이 없으면 빈 문자열을 반환한다."""
        section = _build_user_question_section(None)
        assert section == ""

    def test_question_section_with_empty_string(self) -> None:
        """빈 질문 문자열이면 빈 문자열을 반환한다."""
        section = _build_user_question_section("")
        assert section == ""

    def test_question_section_with_question(self) -> None:
        """질문이 있으면 질문 섹션이 생성된다."""
        section = _build_user_question_section("직업 운은 어떨까요?")

        assert "## 사용자 현재 상황 및 요청" in section
        assert "직업 운은 어떨까요?" in section

    def test_question_section_includes_category(self) -> None:
        """질문 섹션에 카테고리가 포함된다."""
        section = _build_user_question_section("직업 운은 어떨까요?")

        assert "**분류된 관심 영역**: 직업" in section
        assert "**해석 우선순위**:" in section
        assert "'직업'" in section

    def test_question_section_without_category(self) -> None:
        """카테고리를 분류할 수 없으면 사주 구조 연계 해석 가이드가 포함된다."""
        section = _build_user_question_section("운세가 어떨까요?")

        assert "## 사용자 현재 상황 및 요청" in section
        assert "사주 구조 분석과 직접 연결" in section


class TestYuksinToGyoukConversion:
    """육신을 격국으로 변환하는 기능 테스트."""

    def test_convert_all_yuksin_to_gyouk(self) -> None:
        """모든 육신이 올바르게 격국으로 변환된다."""
        conversions = {
            "비견": "건록격",
            "겁재": "양인격",
            "편인": "편인격",
            "정인": "정인격",
            "편재": "편재격",
            "정재": "정재격",
            "식신": "식신격",
            "상관": "상관격",
            "정관": "정관격",
            "편관": "편관격",
        }

        for yuksin, expected_gyouk in conversions.items():
            result = _yuksin_to_gyouk(yuksin)
            assert result == expected_gyouk, f"{yuksin} -> {expected_gyouk} 변환 실패"

    def test_convert_invalid_yuksin_returns_none(self) -> None:
        """유효하지 않은 육신은 None을 반환한다."""
        result = _yuksin_to_gyouk("invalid")
        assert result is None


class TestIntegratedPromptBuilding:
    """통합 프롬프트 생성 기능 테스트."""

    def test_full_prompt_with_all_features(self, sample_saju_result: SajuResult, mock_content_loader: MagicMock) -> None:
        """모든 신규 기능이 포함된 전체 프롬프트를 테스트한다."""
        # 목 설정
        mock_content_loader.get_ilgan_content.return_value = {
            "title": "경금일간",
            "subtitle": "단단한 결단력/",
            "description": "경금일간 설명",
        }
        mock_content_loader.get_yongsin_content.return_value = {
            "title": "수 용신",
            "subtitle": "지혜/",
            "description": "수 용신 설명",
        }
        mock_content_loader.get_hisin_content.return_value = {
            "title": "정 희신",
            "description": "정 희신 설명",
        }

        system_prompt, user_prompt = build_interpretation_prompt(
            sample_saju_result,
            user_context="직업 운은 어떨까요?",
            content_loader=mock_content_loader,
        )

        # 시스템 프롬프트 확인
        assert system_prompt
        assert "사주팔자" in system_prompt

        # 사용자 프롬프트에 모든 섹션 포함
        assert "## 사주 사기둥" in user_prompt
        assert "## 명리학 콘텐츠" in user_prompt
        assert "## 핵심 판단 요약" in user_prompt
        assert "## 사용자 현재 상황 및 요청" in user_prompt
        assert "## 해석 지침" in user_prompt

        # 명리학 콘텐츠 포함
        assert "### 일간: 경" in user_prompt
        assert "### 용신: 경" in user_prompt
        assert "### 희신: 정" in user_prompt

        # 핵심 요약 포함
        assert "**일간**: 경" in user_prompt
        assert "**오행 분석**:" in user_prompt

        # 질문 카테고리 포함
        assert "**분류된 관심 영역**: 직업" in user_prompt

        # 세운 JSON 출력 지침 포함
        assert "SEWUN_JSON" in user_prompt
        assert "3년 흐름 JSON 출력" in user_prompt


class TestSewunJsonInstruction:
    """세운 3년 흐름 JSON 출력 지침 테스트."""

    def test_sewun_json_instruction_in_prompt(self, sample_saju_result: SajuResult) -> None:
        """프롬프트에 SEWUN_JSON 출력 지침이 포함되어야 한다."""
        _, user_prompt = build_interpretation_prompt(sample_saju_result)

        assert "<SEWUN_JSON>" in user_prompt
        assert "</SEWUN_JSON>" in user_prompt
        assert "3년 흐름 JSON 출력" in user_prompt
        assert "year_summaries" in user_prompt

    def test_sewun_json_instruction_uses_sewun_years(self) -> None:
        """sewun 데이터가 있으면 해당 연도를 사용한다."""
        saju_result = SajuResult(
            year_pillar=GanJi(gan="갑", ji="자"),
            month_pillar=GanJi(gan="을", ji="축"),
            day_pillar=GanJi(gan="병", ji="인"),
            sewun=[
                SewunItem(year=2024, ganji=GanJi(gan="갑", ji="진")),
                SewunItem(year=2025, ganji=GanJi(gan="을", ji="사"), is_current=True),
                SewunItem(year=2026, ganji=GanJi(gan="병", ji="오")),
            ],
        )
        instruction = _build_sewun_json_instruction(saju_result)

        assert "2024" in instruction
        assert "2025" in instruction
        assert "2026" in instruction

    def test_sewun_json_instruction_without_sewun_data(self) -> None:
        """sewun 데이터가 없으면 현재 연도 기준으로 생성한다."""
        from datetime import date

        saju_result = SajuResult(
            year_pillar=GanJi(gan="갑", ji="자"),
            month_pillar=GanJi(gan="을", ji="축"),
            day_pillar=GanJi(gan="병", ji="인"),
        )
        instruction = _build_sewun_json_instruction(saju_result)

        today_year = date.today().year
        assert str(today_year - 1) in instruction
        assert str(today_year) in instruction
        assert str(today_year + 1) in instruction

    def test_sewun_json_instruction_contains_guidance(self) -> None:
        """세운 JSON 지침에 용신/기신 관점 가이드가 포함된다."""
        saju_result = SajuResult(
            year_pillar=GanJi(gan="갑", ji="자"),
            month_pillar=GanJi(gan="을", ji="축"),
            day_pillar=GanJi(gan="병", ji="인"),
        )
        instruction = _build_sewun_json_instruction(saju_result)

        assert "용신/기신" in instruction
        assert "2문장" in instruction


class TestSajuSummaryInstruction:
    """사주 요약 JSON 출력 지침 테스트."""

    def test_saju_summary_instruction_in_prompt(self, sample_saju_result: SajuResult) -> None:
        """프롬프트에 SAJU_SUMMARY 출력 지침이 포함되어야 한다."""
        _, user_prompt = build_interpretation_prompt(sample_saju_result)

        assert "<SAJU_SUMMARY>" in user_prompt
        assert "</SAJU_SUMMARY>" in user_prompt
        assert "사주 요약 JSON 출력" in user_prompt
        assert "keywords" in user_prompt
        assert "summary" in user_prompt

    def test_saju_summary_instruction_contains_guidance(self) -> None:
        """사주 요약 지침에 keywords/summary 가이드가 포함된다."""
        instruction = _build_saju_summary_instruction()

        assert "keywords" in instruction
        assert "summary" in instruction
        assert "3개" in instruction
        assert "3-4문장" in instruction
