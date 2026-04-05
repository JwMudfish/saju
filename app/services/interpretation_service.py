"""LLM 기반 사주 해석 서비스."""

from __future__ import annotations

import asyncio
import json
import re

import openai

from core.models.response import InterpretResult, SajuResult

INTERPRETATION_MODEL = "gpt-5.2"
_MAX_TOKENS = 2048


def _extract_sewun_json(content: str) -> tuple[str, list[dict[str, int | str]] | None]:
    """GPT 응답에서 <SEWUN_JSON> 블록을 추출한다.

    Args:
        content: GPT 응답 전체 텍스트

    Returns:
        (clean_content, year_summaries) 튜플.
        태그가 없거나 파싱 실패 시 (원본 content, None) 반환.
    """
    pattern = r"<SEWUN_JSON>(.*?)</SEWUN_JSON>"
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return content, None
    clean_content = content[: match.start()].rstrip()
    try:
        data = json.loads(match.group(1).strip())
        summaries = data.get("year_summaries")
        if not isinstance(summaries, list):
            return clean_content, None
        return clean_content, summaries
    except (json.JSONDecodeError, AttributeError, TypeError):
        return clean_content, None


class InterpretationService:
    """OpenAI GPT를 사용한 사주 해석 서비스."""

    def __init__(self, api_key: str | None) -> None:
        self._api_key = api_key

    async def interpret(
        self,
        saju_result: SajuResult,
        user_context: str | None = None,
        birth_year: int | None = None,
        birth_month: int | None = None,
        birth_day: int | None = None,
        gender: str | None = None,
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
                    "OPENAI_API_KEY가 설정되지 않아 자동 해석을 제공할 수 없습니다. "
                    "환경 변수 OPENAI_API_KEY를 설정한 후 다시 시도해주세요."
                ),
                model=INTERPRETATION_MODEL,
                is_fallback=True,
            )

        from app.services.prompt_builder import build_interpretation_prompt

        system_prompt, user_prompt = build_interpretation_prompt(
            saju_result,
            user_context,
            birth_year=birth_year,
            birth_month=birth_month,
            birth_day=birth_day,
            gender=gender,
        )

        client = openai.OpenAI(api_key=self._api_key)

        def _call_api() -> str:
            # gpt-5.2는 max_completion_tokens 지정 시 빈 응답 반환 — 파라미터 제거
            response = client.chat.completions.create(
                model=INTERPRETATION_MODEL,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            )
            content = response.choices[0].message.content
            if not content:
                raise RuntimeError("OpenAI API가 빈 응답을 반환했습니다.")
            return content

        loop = asyncio.get_running_loop()
        try:
            raw_content = await loop.run_in_executor(None, _call_api)
        except openai.APIStatusError as e:
            raise RuntimeError(f"LLM 서비스 오류: {e}") from e
        except openai.APITimeoutError as e:
            raise TimeoutError(f"LLM 응답 시간 초과: {e}") from e
        except RuntimeError:
            return InterpretResult(
                interpretation=(
                    "현재 AI 해석 서비스가 응답을 생성하지 못했습니다. "
                    "잠시 후 다시 시도해주세요."
                ),
                model=INTERPRETATION_MODEL,
                is_fallback=True,
            )

        interpretation, sewun_summaries = _extract_sewun_json(raw_content)

        return InterpretResult(
            interpretation=interpretation,
            model=INTERPRETATION_MODEL,
            is_fallback=False,
            sewun_summaries=sewun_summaries,
        )
