"""사주 해석 서비스 테스트 (TDD)."""

from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest

from core.models.domain import (
    DeunItem,
    GanJi,
    OHangRatio,
    ShinsalItem,
    YuksinItem,
)
from core.models.response import DeunResult, SajuResult


# ---------------------------------------------------------------------------
# 테스트 픽스처
# ---------------------------------------------------------------------------


@pytest.fixture
def minimal_saju_result() -> SajuResult:
    """모든 Optional 필드가 None인 최소 SajuResult."""
    return SajuResult(
        year_pillar=GanJi(gan="갑", ji="자"),
        month_pillar=GanJi(gan="을", ji="축"),
        day_pillar=GanJi(gan="병", ji="인"),
    )


@pytest.fixture
def full_saju_result() -> SajuResult:
    """주요 필드가 채워진 SajuResult."""
    return SajuResult(
        year_pillar=GanJi(gan="갑", ji="자"),
        month_pillar=GanJi(gan="을", ji="축"),
        day_pillar=GanJi(gan="병", ji="인"),
        hour_pillar=GanJi(gan="정", ji="묘"),
        deun=DeunResult(
            banghyang="순행",
            deun_su=7,
            deun_list=[
                DeunItem(age=7, ganji=GanJi(gan="병", ji="진")),
                DeunItem(age=17, ganji=GanJi(gan="정", ji="사")),
                DeunItem(age=27, ganji=GanJi(gan="무", ji="오")),
            ],
        ),
        yuksin_list=[
            YuksinItem(target="을", yuksin="겁재"),
            YuksinItem(target="자", yuksin="정인"),
        ],
        ohang_ratio=OHangRatio(mok=30.0, hwa=20.0, to=20.0, geum=15.0, su=15.0),
        shinsal=[
            ShinsalItem(name="역마살", trigger_ji="인", description="여행과 이동"),
        ],
    )


# ---------------------------------------------------------------------------
# prompt_builder 테스트
# ---------------------------------------------------------------------------


class TestBuildInterpretationPrompt:
    """build_interpretation_prompt() 함수 테스트."""

    def test_returns_tuple_of_two_strings(self, minimal_saju_result: SajuResult) -> None:
        """반환값이 (str, str) 튜플인지 확인."""
        from app.services.prompt_builder import build_interpretation_prompt

        result = build_interpretation_prompt(minimal_saju_result)
        assert isinstance(result, tuple)
        assert len(result) == 2
        assert isinstance(result[0], str)
        assert isinstance(result[1], str)

    def test_system_prompt_not_empty(self, minimal_saju_result: SajuResult) -> None:
        """시스템 프롬프트가 비어있지 않아야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        system_prompt, _ = build_interpretation_prompt(minimal_saju_result)
        assert len(system_prompt) > 0

    def test_user_prompt_contains_section_wonkuk(self, full_saju_result: SajuResult) -> None:
        """사용자 프롬프트에 사주 총평 섹션이 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        _, user_prompt = build_interpretation_prompt(full_saju_result)
        assert "사주 총평" in user_prompt

    def test_user_prompt_contains_section_personality(self, full_saju_result: SajuResult) -> None:
        """사용자 프롬프트에 성격/기질 분석 섹션이 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        _, user_prompt = build_interpretation_prompt(full_saju_result)
        assert "성격" in user_prompt or "기질" in user_prompt

    def test_user_prompt_contains_section_daewun(self, full_saju_result: SajuResult) -> None:
        """사용자 프롬프트에 대운 흐름 섹션이 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        _, user_prompt = build_interpretation_prompt(full_saju_result)
        assert "대운" in user_prompt

    def test_user_prompt_contains_section_shinsal(self, full_saju_result: SajuResult) -> None:
        """사용자 프롬프트에 신살 섹션이 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        _, user_prompt = build_interpretation_prompt(full_saju_result)
        assert "신살" in user_prompt

    def test_user_prompt_contains_section_ohang(self, full_saju_result: SajuResult) -> None:
        """사용자 프롬프트에 오행 균형 분석 섹션이 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        _, user_prompt = build_interpretation_prompt(full_saju_result)
        assert "오행" in user_prompt

    def test_handles_none_hour_pillar(self, minimal_saju_result: SajuResult) -> None:
        """hour_pillar가 None이어도 오류 없이 처리되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        assert minimal_saju_result.hour_pillar is None
        system_prompt, user_prompt = build_interpretation_prompt(minimal_saju_result)
        assert isinstance(user_prompt, str)

    def test_handles_none_deun(self, minimal_saju_result: SajuResult) -> None:
        """deun이 None이어도 오류 없이 처리되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        assert minimal_saju_result.deun is None
        _, user_prompt = build_interpretation_prompt(minimal_saju_result)
        assert isinstance(user_prompt, str)

    def test_handles_none_shinsal(self, minimal_saju_result: SajuResult) -> None:
        """shinsal이 None이어도 오류 없이 처리되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        assert minimal_saju_result.shinsal is None
        _, user_prompt = build_interpretation_prompt(minimal_saju_result)
        assert "신살 없음" in user_prompt

    def test_handles_empty_shinsal_list(self, full_saju_result: SajuResult) -> None:
        """shinsal이 빈 리스트이면 '신살 없음'이 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        full_saju_result.shinsal = []
        _, user_prompt = build_interpretation_prompt(full_saju_result)
        assert "신살 없음" in user_prompt

    def test_includes_user_context_when_provided(self, minimal_saju_result: SajuResult) -> None:
        """user_context가 제공되면 프롬프트에 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        _, user_prompt = build_interpretation_prompt(minimal_saju_result, user_context="직업 운을 알고 싶어요")
        assert "직업 운을 알고 싶어요" in user_prompt

    def test_user_context_none_does_not_cause_error(self, minimal_saju_result: SajuResult) -> None:
        """user_context가 None이어도 오류 없이 처리되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        result = build_interpretation_prompt(minimal_saju_result, user_context=None)
        assert isinstance(result, tuple)

    def test_pillar_ganji_appears_in_prompt(self, full_saju_result: SajuResult) -> None:
        """사주 기둥의 간지 정보가 프롬프트에 포함되어야 한다."""
        from app.services.prompt_builder import build_interpretation_prompt

        _, user_prompt = build_interpretation_prompt(full_saju_result)
        # 일간 (day pillar gan)
        assert "병" in user_prompt


# ---------------------------------------------------------------------------
# InterpretationService 테스트
# ---------------------------------------------------------------------------


class TestInterpretationService:
    """InterpretationService 클래스 테스트."""

    @pytest.mark.asyncio
    async def test_no_api_key_returns_fallback(self, minimal_saju_result: SajuResult) -> None:
        """API 키가 없으면 fallback 응답을 반환해야 한다."""
        from app.services.interpretation_service import InterpretationService

        service = InterpretationService(api_key=None)
        result = await service.interpret(minimal_saju_result)

        assert result.is_fallback is True
        assert "ANTHROPIC_API_KEY" in result.interpretation

    @pytest.mark.asyncio
    async def test_no_api_key_fallback_has_model_field(self, minimal_saju_result: SajuResult) -> None:
        """fallback 응답에도 model 필드가 설정되어야 한다."""
        from app.services.interpretation_service import (
            INTERPRETATION_MODEL,
            InterpretationService,
        )

        service = InterpretationService(api_key=None)
        result = await service.interpret(minimal_saju_result)

        assert result.model == INTERPRETATION_MODEL

    @pytest.mark.asyncio
    async def test_with_mocked_anthropic_returns_result(self, full_saju_result: SajuResult) -> None:
        """anthropic mock 시 is_fallback=False인 InterpretResult를 반환해야 한다."""
        from app.services.interpretation_service import InterpretationService

        mock_response = MagicMock()
        mock_response.content = [MagicMock(text="갑자년생의 사주 해석입니다.")]

        with patch("anthropic.Anthropic") as mock_anthropic_cls:
            mock_client = MagicMock()
            mock_anthropic_cls.return_value = mock_client
            mock_client.messages.create.return_value = mock_response

            service = InterpretationService(api_key="test-key")
            result = await service.interpret(full_saju_result)

        assert result.is_fallback is False
        assert "갑자년생" in result.interpretation

    @pytest.mark.asyncio
    async def test_api_status_error_raises_runtime_error(self, minimal_saju_result: SajuResult) -> None:
        """APIStatusError 발생 시 RuntimeError가 재발생해야 한다."""
        import anthropic

        from app.services.interpretation_service import InterpretationService

        with patch("anthropic.Anthropic") as mock_anthropic_cls:
            mock_client = MagicMock()
            mock_anthropic_cls.return_value = mock_client
            mock_response = MagicMock()
            mock_response.status_code = 500
            mock_client.messages.create.side_effect = anthropic.APIStatusError(
                "서버 오류",
                response=mock_response,
                body=None,
            )

            service = InterpretationService(api_key="test-key")
            with pytest.raises(RuntimeError, match="LLM 서비스 오류"):
                await service.interpret(minimal_saju_result)

    @pytest.mark.asyncio
    async def test_api_timeout_error_raises_timeout_error(self, minimal_saju_result: SajuResult) -> None:
        """APITimeoutError 발생 시 TimeoutError가 재발생해야 한다."""
        import anthropic

        from app.services.interpretation_service import InterpretationService

        with patch("anthropic.Anthropic") as mock_anthropic_cls:
            mock_client = MagicMock()
            mock_anthropic_cls.return_value = mock_client
            mock_client.messages.create.side_effect = anthropic.APITimeoutError(
                request=MagicMock()
            )

            service = InterpretationService(api_key="test-key")
            with pytest.raises(TimeoutError, match="LLM 응답 시간 초과"):
                await service.interpret(minimal_saju_result)

    @pytest.mark.asyncio
    async def test_interpret_result_model_name(self, full_saju_result: SajuResult) -> None:
        """결과의 model 필드가 올바른 모델명을 포함해야 한다."""
        from app.services.interpretation_service import (
            INTERPRETATION_MODEL,
            InterpretationService,
        )

        mock_response = MagicMock()
        mock_response.content = [MagicMock(text="해석 결과")]

        with patch("anthropic.Anthropic") as mock_anthropic_cls:
            mock_client = MagicMock()
            mock_anthropic_cls.return_value = mock_client
            mock_client.messages.create.return_value = mock_response

            service = InterpretationService(api_key="test-key")
            result = await service.interpret(full_saju_result)

        assert result.model == INTERPRETATION_MODEL
