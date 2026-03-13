"""사주 해석 프롬프트 빌더."""

from __future__ import annotations

import logging
from typing import Any

from app.services.content_loader import ContentLoader
from core.models.response import SajuResult

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = (
    "당신은 한국 전통 사주팔자(四柱八字) 전문 해석가입니다. "
    "사주 데이터를 분석하여 자세하고 통찰력 있는 해석을 한국어로 제공합니다. "
    "음양오행의 이치에 따라 운명의 흐름을 설명하며, "
    "실용적인 조언과 함께 삶의 방향을 안내합니다."
)

# 질문 카테고리 키워드 매핑
_QUESTION_CATEGORY_KEYWORDS = {
    "직업": ["직업", "취업", "업무", "일", "커리어", "사업", "직장", "진로"],
    "연애": ["연애", "결혼", "애인", "짝사랑", "배우자", "남자", "여자", "이성", "연인"],
    "재물": ["돈", "재물", "부자", "연봉", "소득", "재정", "사업", "투자"],
    "건강": ["건강", "병", "몸", "질병", "치료", "운동"],
}


def build_interpretation_prompt(
    saju_result: SajuResult,
    user_context: str | None = None,
    content_loader: ContentLoader | None = None,
) -> tuple[str, str]:
    """사주 해석용 (system_prompt, user_prompt) 튜플을 반환한다.

    ContentLoader를 통한 명리학 콘텐츠 주입, 핵심 판단 요약, 질문 우선순위 처리를 포함한다.

    Args:
        saju_result: 사주 계산 결과
        user_context: 사용자 추가 질문 (선택)
        content_loader: 콘텐츠 로더 (선택, None인 경우 새 인스턴스 생성)

    Returns:
        tuple[str, str]: (system_prompt, user_prompt)
    """
    # ContentLoader 초기화 (전달되지 않은 경우 새 인스턴스 생성)
    loader = content_loader if content_loader is not None else ContentLoader()

    # 사주 기둥 정보 조립
    pillars_lines = [
        f"년주: {saju_result.year_pillar.gan}{saju_result.year_pillar.ji}",
        f"월주: {saju_result.month_pillar.gan}{saju_result.month_pillar.ji}",
        f"일주: {saju_result.day_pillar.gan}{saju_result.day_pillar.ji}",
    ]
    if saju_result.hour_pillar is not None:
        pillars_lines.append(f"시주: {saju_result.hour_pillar.gan}{saju_result.hour_pillar.ji}")
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

    # 명리학 콘텐츠 섹션 조립 (Priority 1)
    myeongli_content_section = _build_myeongli_content_section(saju_result, loader)

    # 핵심 판단 요약 섹션 조립 (Priority 2)
    core_summary_section = _build_core_summary_section(saju_result)

    # 사용자 질문 섹션 조립 (Priority 3)
    user_question_section = _build_user_question_section(user_context)

    user_prompt = (
        "다음 사주 데이터를 분석하여 자세하고 통찰력 있는 해석을 제공해주세요.\n\n"
        f"## 사주 사기둥\n{pillars_text}"
        f"{deun_section}"
        f"{ohang_section}"
        f"{shinsal_section}"
        f"{yuksin_section}"
        f"{myeongli_content_section}"
        f"{core_summary_section}"
        f"{user_question_section}"
        "\n\n## 해석 요청 사항"
        "\n1. **사주 총평**: 전체적인 사주의 특징과 핵심 메시지"
        "\n2. **성격 및 기질 분석**: 일간 성격, 용신/희신 관련 특성, 사주 구성으로 본 기질"
        "\n3. **대운 흐름**: 생애 주요 대운의 흐름과 변화"
        "\n4. **신살 영향**: 주요 신살이 미치는 영향"
        "\n5. **오행 균형**: 오행의 강약과 균형 분석, 과부족한 오행의 의미"
        "\n6. **종합 조언**: 삶의 방향과 실용적인 조언"
    )

    return _SYSTEM_PROMPT, user_prompt


def _build_myeongli_content_section(
    saju_result: SajuResult,
    loader: ContentLoader,
) -> str:
    """명리학 콘텐츠 섹션을构建한다.

    ContentLoader에서 일간, 격국, 용신, 희신 콘텐츠를 조회하여 프롬프트에 포함한다.

    Args:
        saju_result: 사주 계산 결과
        loader: ContentLoader 인스턴스

    Returns:
        명리학 콘텐츠 섹션 문자열
    """
    content_lines = ["\n## 명리학 콘텐츠"]

    # 일간 콘텐츠
    day_gan = saju_result.day_pillar.gan
    ilgan_content = loader.get_ilgan_content(day_gan)
    if ilgan_content:
        title = ilgan_content.get("title", "")
        subtitle = ilgan_content.get("subtitle", "")
        description = ilgan_content.get("description", "")
        content_lines.append(f"\n### 일간: {day_gan}")
        if title:
            content_lines.append(f"**제목**: {title}")
        if subtitle:
            content_lines.append(f"**특징**: {subtitle}")
        if description:
            desc_preview = description[:300] + "..." if len(description) > 300 else description
            content_lines.append(f"**설명**: {desc_preview}")
    else:
        logger.debug("일간 '%s'에 대한 콘텐츠를 찾을 수 없음", day_gan)

    # 격국 콘텐츠 (육신에서 격국명 추출)
    if saju_result.yuksin_list:
        # 첫 번째 육신의 target에서 격국명 추출 시도
        first_yuksin = saju_result.yuksin_list[0]
        # 일지(day_ji) 기준 육신이 있다면 해당 격국 사용
        day_ji_yuksin = next(
            (y for y in saju_result.yuksin_list if y.target == "일지"), None
        )
        if day_ji_yuksin:
            gyouk_name = _yuksin_to_gyouk(day_ji_yuksin.yuksin)
            if gyouk_name:
                gyouk_content = loader.get_gyouk_content(gyouk_name)
                if gyouk_content:
                    title = gyouk_content.get("title", "")
                    description = gyouk_content.get("description", "")
                    content_lines.append(f"\n### 격국: {gyouk_name}")
                    if title:
                        content_lines.append(f"**제목**: {title}")
                    if description:
                        desc_preview = description[:300] + "..." if len(description) > 300 else description
                        content_lines.append(f"**설명**: {desc_preview}")
                else:
                    logger.debug("격국 '%s'에 대한 콘텐츠를 찾을 수 없음", gyouk_name)

    # 용신 콘텐츠
    if saju_result.yongshin is not None:
        dang_ryeong = saju_result.yongshin.dang_ryeong
        yongsin_content = loader.get_yongsin_content(dang_ryeong)
        if yongsin_content:
            title = yongsin_content.get("title", "")
            subtitle = yongsin_content.get("subtitle", "")
            description = yongsin_content.get("description", "")
            content_lines.append(f"\n### 용신: {dang_ryeong}")
            if title:
                content_lines.append(f"**제목**: {title}")
            if subtitle:
                content_lines.append(f"**특징**: {subtitle}")
            if description:
                desc_preview = description[:300] + "..." if len(description) > 300 else description
                content_lines.append(f"**설명**: {desc_preview}")
        else:
            logger.debug("용신 '%s'에 대한 콘텐츠를 찾을 수 없음", dang_ryeong)

    # 희신 콘텐츠
    if saju_result.yongshin is not None:
        heuisin = saju_result.yongshin.heuisin
        # 희신이 존재하는지 확인 (빈 문자열이 아닌지)
        if heuisin and heuisin.strip():
            hisin_content = loader.get_hisin_content(dang_ryeong, hisin_yes=True)
            if hisin_content:
                title = hisin_content.get("title", "")
                description = hisin_content.get("description", "")
                content_lines.append(f"\n### 희신: {heuisin}")
                if title:
                    content_lines.append(f"**제목**: {title}")
                if description:
                    desc_preview = description[:300] + "..." if len(description) > 300 else description
                    content_lines.append(f"**설명**: {desc_preview}")
            else:
                logger.debug("희신 '%s'에 대한 콘텐츠를 찾을 수 없음", heuisin)

    return "\n".join(content_lines) if len(content_lines) > 1 else ""


def _build_core_summary_section(saju_result: SajuResult) -> str:
    """핵심 판단 요약 섹션을构建한다.

    신강약, 월령, 오행 균형, 핵심 십신을 분석하여 요약한다.

    Args:
        saju_result: 사주 계산 결과

    Returns:
        핵심 판단 요약 섹션 문자열
    """
    summary_lines = ["\n## 핵심 판단 요약"]

    # 일간 강약 분석
    day_gan = saju_result.day_pillar.gan
    summary_lines.append(f"**일간**: {day_gan}")

    # 오행에서 가장 강한 요소 식별
    if saju_result.ohang_ratio is not None:
        o = saju_result.ohang_ratio
        ohang_items = [
            ("목", o.mok),
            ("화", o.hwa),
            ("토", o.to),
            ("금", o.geum),
            ("수", o.su),
        ]
        # 내림차순 정렬
        sorted_ohang = sorted(ohang_items, key=lambda x: x[1], reverse=True)
        strongest = sorted_ohang[0]
        weakest = sorted_ohang[-1]

        summary_lines.append(f"**오행 분석**: ")
        summary_lines.append(f"- 가장 강한 오행: {strongest[0]}({strongest[1]}%)")
        summary_lines.append(f"- 가장 약한 오행: {weakest[0]}({weakest[1]}%)")

        # 오행 불균형 식별 (차이가 20% 이상 나는 경우)
        if strongest[1] - weakest[1] >= 20:
            summary_lines.append(f"- **특징**: {strongest[0]}가 과다하게 강하고 {weakest[0]}가 부족함")

    # 핵심 십신 식별 (가장 많이 등장하는 육신)
    if saju_result.yuksin_list:
        yuksin_counts: dict[str, int] = {}
        for y in saju_result.yuksin_list:
            yuksin = y.yuksin
            yuksin_counts[yuksin] = yuksin_counts.get(yuksin, 0) + 1

        if yuksin_counts:
            top_yuksin = max(yuksin_counts.items(), key=lambda x: x[1])
            summary_lines.append(f"**핵심 십신**: {top_yuksin[0]}({top_yuksin[1]}회 등장)")

    # 용신/희신 정보
    if saju_result.yongshin is not None:
        summary_lines.append(f"**용신**: {saju_result.yongshin.dang_ryeong}")
        if saju_result.yongshin.heuisin:
            summary_lines.append(f"**희신**: {saju_result.yongshin.heuisin}")

    return "\n".join(summary_lines)


def _build_user_question_section(user_context: str | None) -> str:
    """사용자 질문 섹션을构建한다.

    질문이 있는 경우 카테고리를 분류하여 우선순위를 조정한다.

    Args:
        user_context: 사용자 추가 질문

    Returns:
        사용자 질문 섹션 문자열
    """
    if not user_context:
        return ""

    question_lines = [f"\n## 사용자 질문\n{user_context}"]

    # 질문 카테고리 분류
    category = _extract_question_category(user_context)
    if category:
        question_lines.append(f"\n**질문 카테고리**: {category}")
        question_lines.append(f"**해석 가이드**: '{category}' 관련 항목을 상세히 해석하고 다른 항목은 간략히 언급해주세요.")
    else:
        question_lines.append("\n**해석 가이드**: 모든 항목을 균형 있게 해석해주세요.")

    return "\n".join(question_lines)


def _extract_question_category(question: str) -> str | None:
    """질문에서 카테고리를 추출한다.

    Args:
        question: 사용자 질문 문자열

    Returns:
        카테고리 문자열 또는 None (분류 불가능한 경우)
    """
    if not question:
        return None

    question_lower = question.lower()

    for category, keywords in _QUESTION_CATEGORY_KEYWORDS.items():
        if any(keyword in question_lower for keyword in keywords):
            return category

    return None


def _yuksin_to_gyouk(yuksin: str) -> str | None:
    """육신(十星)을 격국(格局)명으로 변환한다.

    Args:
        yuksin: 육신 이름 (비견, 겁재, 편인, 정인, 편재, 정재, 식신, 상관, 정관, 편관)

    Returns:
        격국명 또는 None (변환 불가능한 경우)
    """
    yuksin_to_gyouk_map = {
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

    return yuksin_to_gyouk_map.get(yuksin)
