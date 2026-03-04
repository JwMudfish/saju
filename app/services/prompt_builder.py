"""사주 해석 프롬프트 빌더."""

from __future__ import annotations

from core.models.response import SajuResult

_SYSTEM_PROMPT = (
    "당신은 한국 전통 사주팔자(四柱八字) 전문 해석가입니다. "
    "사주 데이터를 분석하여 자세하고 통찰력 있는 해석을 한국어로 제공합니다. "
    "음양오행의 이치에 따라 운명의 흐름을 설명하며, "
    "실용적인 조언과 함께 삶의 방향을 안내합니다."
)


def build_interpretation_prompt(
    saju_result: SajuResult,
    user_context: str | None = None,
) -> tuple[str, str]:
    """사주 해석용 (system_prompt, user_prompt) 튜플을 반환한다.

    Args:
        saju_result: 사주 계산 결과
        user_context: 사용자 추가 질문 (선택)

    Returns:
        tuple[str, str]: (system_prompt, user_prompt)
    """
    # 사주 기둥 정보 조립
    pillars_lines = [
        f"년주: {saju_result.year_pillar.gan}{saju_result.year_pillar.ji}",
        f"월주: {saju_result.month_pillar.gan}{saju_result.month_pillar.ji}",
        f"일주: {saju_result.day_pillar.gan}{saju_result.day_pillar.ji}",
    ]
    if saju_result.hour_pillar is not None:
        pillars_lines.append(
            f"시주: {saju_result.hour_pillar.gan}{saju_result.hour_pillar.ji}"
        )
    else:
        pillars_lines.append("시주: 미상")
    pillars_text = "\n".join(pillars_lines)

    # 대운 정보 조립
    deun_section = ""
    if saju_result.deun is not None:
        deun = saju_result.deun
        deun_lines = [
            "\n## 대운 흐름",
            f"행운 방향: {deun.banghyang}, 대운수: {deun.deun_su}세",
        ]
        for d in deun.deun_list:
            deun_lines.append(f"  {d.age}세: {d.ganji.gan}{d.ganji.ji}")
        deun_section = "\n".join(deun_lines)

    # 오행 비율 조립
    ohang_section = ""
    if saju_result.ohang_ratio is not None:
        o = saju_result.ohang_ratio
        ohang_section = (
            f"\n## 오행 균형 분석\n"
            f"목(木): {o.mok}% | 화(火): {o.hwa}% | 토(土): {o.to}% | "
            f"금(金): {o.geum}% | 수(水): {o.su}%"
        )

    # 신살 정보 조립
    shinsal_lines = ["\n## 신살 분석"]
    if not saju_result.shinsal:
        shinsal_lines.append("신살 없음")
    else:
        for s in saju_result.shinsal:
            shinsal_lines.append(f"  {s.name}: {s.description}")
    shinsal_section = "\n".join(shinsal_lines)

    # 육신 정보 조립
    yuksin_section = ""
    if saju_result.yuksin_list:
        yuksin_lines = ["\n## 육신 분석"]
        for y in saju_result.yuksin_list:
            yuksin_lines.append(f"  {y.target}: {y.yuksin}")
        yuksin_section = "\n".join(yuksin_lines)

    # 사용자 질문 조립
    user_question_section = ""
    if user_context:
        user_question_section = f"\n## 사용자 질문\n{user_context}"

    user_prompt = (
        "다음 사주 데이터를 분석하여 아래 항목별로 상세한 해석을 제공해주세요.\n\n"
        f"## 사주 사기둥\n{pillars_text}"
        f"{deun_section}"
        f"{ohang_section}"
        f"{shinsal_section}"
        f"{yuksin_section}"
        f"{user_question_section}"
        "\n\n## 요청 사항"
        "\n1. **사주 총평**: 전체적인 사주의 특징과 핵심 메시지"
        "\n2. **성격 및 기질 분석**: 일간과 사주 구성으로 본 성격과 기질"
        "\n3. **대운 흐름**: 생애 주요 대운의 흐름과 변화"
        "\n4. **신살 영향**: 주요 신살이 미치는 영향"
        "\n5. **오행 균형**: 오행의 강약과 균형 분석"
        "\n6. **종합 조언**: 삶의 방향과 실용적인 조언"
    )

    return _SYSTEM_PROMPT, user_prompt
