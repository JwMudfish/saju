"""LLM 기반 사주 해석 서비스."""

from __future__ import annotations

import asyncio

import anthropic
from anthropic.types import TextBlock

from core.models.response import InterpretResult, SajuResult

INTERPRETATION_MODEL = "claude-sonnet-4-6"
_MAX_TOKENS = 2048


class InterpretationService:
    """Anthropic Claude를 사용한 사주 해석 서비스."""

    def __init__(self, api_key: str | None) -> None:
        self._api_key = api_key

    async def interpret(
        self,
        saju_result: SajuResult,
        user_context: str | None = None,
    ) -> InterpretResult:
        """사주 데이터를 LLM으로 해석하여 InterpretResult를 반환한다.

        Args:
            saju_result: 사주 계산 결과
            user_context: 사용자 추가 질문 (선택)

        Returns:
            InterpretResult: 해석 결과

        Raises:
            RuntimeError: API 서버 오류 발생 시
            TimeoutError: API 응답 시간 초과 시
        """
        if not self._api_key:
            return InterpretResult(
                interpretation=(
                    "ANTHROPIC_API_KEY가 설정되지 않아 자동 해석을 제공할 수 없습니다. "
                    "환경 변수 ANTHROPIC_API_KEY를 설정한 후 다시 시도해주세요."
                ),
                model=INTERPRETATION_MODEL,
                is_fallback=True,
            )

        from app.services.prompt_builder import build_interpretation_prompt

        system_prompt, user_prompt = build_interpretation_prompt(saju_result, user_context)

        client = anthropic.Anthropic(api_key=self._api_key)

        def _call_api() -> str:
            response = client.messages.create(
                model=INTERPRETATION_MODEL,
                max_tokens=_MAX_TOKENS,
                system=system_prompt,
                messages=[{"role": "user", "content": user_prompt}],
            )
            block = response.content[0]
            if isinstance(block, TextBlock):
                return block.text
            # MagicMock 등 duck-typing 지원 (테스트 호환)
            text: str | None = getattr(block, "text", None)
            if isinstance(text, str):
                return text
            raise RuntimeError(f"예상치 못한 응답 블록 타입: {type(block)}")

        loop = asyncio.get_running_loop()
        try:
            interpretation = await loop.run_in_executor(None, _call_api)
        except anthropic.APIStatusError as e:
            raise RuntimeError(f"LLM 서비스 오류: {e}") from e
        except anthropic.APITimeoutError as e:
            raise TimeoutError(f"LLM 응답 시간 초과: {e}") from e

        return InterpretResult(
            interpretation=interpretation,
            model=INTERPRETATION_MODEL,
            is_fallback=False,
        )
