"""사주 해석 프롬프트 빌더."""

from __future__ import annotations

import logging
from datetime import date

from app.services.content_loader import ContentLoader
from core.models.response import SajuResult

logger = logging.getLogger(__name__)

_SYSTEM_PROMPT = (
    "당신은 30년 이상의 경력을 가진 정통 명리학 전문가입니다. "
    "단순한 성격 풀이나 운세 나열이 아니라, 사주팔자의 구성 흐름과 오행의 역학 관계, "
    "십신의 배치가 만들어내는 삶의 패턴을 분석합니다. "
    "\n\n"
    "다음 원칙을 반드시 지켜 해석하십시오:\n"
    "1. 일간의 강약(신강/신약)을 먼저 판단하고 그 근거를 명시하십시오.\n"
    "2. 용신·희신·기신·구신의 역할을 설명하고, 현재 대운·세운이 용신을 생하는지 극하는지를"
    " 분석하십시오.\n"
    "3. 누구에게나 해당하는 일반론은 배제하고, 이 사주의 구조적 특수성에서 나오는 해석만"
    " 제시하십시오.\n"
    "4. 모든 해석에 명리학적 근거(어떤 십신/오행 관계에서 도출된 판단인지)를 명시하십시오.\n"
    "5. 사용자가 처한 현실 상황과 사주 흐름을 연결하여 구체적이고 실행 가능한 전략을 제시하십시오."
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
    birth_year: int | None = None,
    birth_month: int | None = None,
    birth_day: int | None = None,
    gender: str | None = None,
) -> tuple[str, str]:
    """사주 해석용 (system_prompt, user_prompt) 튜플을 반환한다.

    ContentLoader를 통한 명리학 콘텐츠 주입, 핵심 판단 요약, 질문 우선순위 처리를 포함한다.

    Args:
        saju_result: 사주 계산 결과
        user_context: 사용자 추가 질문 (선택)
        content_loader: 콘텐츠 로더 (선택, None인 경우 새 인스턴스 생성)
        birth_year: 출생 연도 (나이 계산용, 선택)
        birth_month: 출생 월 (선택)
        birth_day: 출생 일 (선택)
        gender: 성별 male/female (선택)

    Returns:
        tuple[str, str]: (system_prompt, user_prompt)
    """
    # ContentLoader 초기화 (전달되지 않은 경우 새 인스턴스 생성)
    loader = content_loader if content_loader is not None else ContentLoader()

    # 기본 인적 정보 조립 (나이·성별)
    personal_info_section = _build_personal_info_section(birth_year, birth_month, birth_day, gender)

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

    # 세운 3년 흐름 JSON 출력 지침 조립
    sewun_json_section = _build_sewun_json_instruction(saju_result)

    user_prompt = (
        "다음 사주 데이터를 정통 명리학 관점에서 분석하십시오.\n\n"
        f"{personal_info_section}"
        f"## 사주 사기둥\n{pillars_text}"
        f"{deun_section}"
        f"{ohang_section}"
        f"{shinsal_section}"
        f"{yuksin_section}"
        f"{myeongli_content_section}"
        f"{core_summary_section}"
        f"{user_question_section}"
        "\n\n## 해석 지침"
        "\n\n### [1단계] 사주 구조 진단 — 이 사주의 본질적 특수성"
        "\n- 일간의 신강/신약 판정과 그 근거(월령 득령 여부, 생부 관계, 통근 상태)를 명시하라."
        "\n- 사주 전체의 오행 역학에서 가장 두드러지는 구조적 특징을 1~2가지로 압축하라."
        "\n- 해당 구조가 삶의 어떤 패턴을 만들어내는지 명리학적 논리로 설명하라."
        "\n\n### [2단계] 용신·희신·기신 분석"
        "\n- 용신을 결정한 이유와 논리적 근거를 제시하라."
        "\n- 현재 대운·세운이 용신/기신 중 어느 쪽에 해당하는지 분석하라."
        "\n- 이 운의 흐름이 사용자의 현실에 어떻게 작용하고 있는지 연결하라."
        "\n\n### [3단계] 대운 흐름과 전환점"
        "\n- 현재 대운의 성격과 다음 대운으로의 전환이 갖는 의미를 분석하라."
        "\n- 이 사주에서 언제가 '기회의 창'이고 언제가 '수성의 시기'인지 명확히 하라."
        "\n- 단순한 길흉 나열이 아닌, 운의 흐름 속에서 어떤 태도와 행동이 유리한지 제시하라."
        "\n\n### [4단계] 현실 상황 연계 전략"
        "\n- 사용자가 제시한 현재 상황과 고민을 사주 흐름에 직접 대입하라."
        "\n- '이 사주이기 때문에' 유효한 구체적 전략을 제시하라."
        "\n- 지금 당장 취해야 할 행동과 중장기적으로 준비해야 할 방향을 구분하여 설명하라."
        "\n\n### [금지 사항]"
        "\n- '성실하게 노력하면 좋은 결과를 얻을 수 있습니다' 같은 누구에게나 적용되는 일반론 금지"
        "\n- 근거 없는 길흉 선언 금지 — 반드시 어떤 십신·오행 관계에서 도출된 판단인지 명시"
        "\n- 위로성 멘트나 모호한 표현 금지 — 전문가의 냉철한 시각으로 분석하라"
        f"{sewun_json_section}"
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
                        desc_preview = (
                            description[:300] + "..."
                            if len(description) > 300
                            else description
                        )
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
                    desc_preview = (
                        description[:300] + "..."
                        if len(description) > 300
                        else description
                    )
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

        summary_lines.append("**오행 분석**: ")
        summary_lines.append(f"- 가장 강한 오행: {strongest[0]}({strongest[1]}%)")
        summary_lines.append(f"- 가장 약한 오행: {weakest[0]}({weakest[1]}%)")

        # 오행 불균형 식별 (차이가 20% 이상 나는 경우)
        if strongest[1] - weakest[1] >= 20:
            summary_lines.append(
                f"- **특징**: {strongest[0]}가 과다하게 강하고 {weakest[0]}가 부족함"
            )

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


def _build_personal_info_section(
    birth_year: int | None,
    birth_month: int | None,
    birth_day: int | None,
    gender: str | None,
) -> str:
    """기본 인적 정보(생년월일·만나이·성별) 섹션을 구성한다.

    Args:
        birth_year: 출생 연도
        birth_month: 출생 월
        birth_day: 출생 일
        gender: 성별 (male/female)

    Returns:
        인적 정보 섹션 문자열 (없으면 빈 문자열)
    """
    lines: list[str] = []

    if birth_year:
        today = date.today()
        # 만나이: 생일이 지났으면 +0, 안 지났으면 -1
        age = today.year - birth_year
        if birth_month and birth_day:
            birthday_this_year = date(today.year, birth_month, birth_day)
            if today < birthday_this_year:
                age -= 1
            birth_str = f"{birth_year}년 {birth_month}월 {birth_day}일"
        else:
            birth_str = f"{birth_year}년"
        lines.append(f"생년월일: {birth_str}")
        lines.append(f"현재 만나이: {age}세")

    if gender:
        gender_str = "남성" if gender == "male" else "여성"
        lines.append(f"성별: {gender_str}")

    if not lines:
        return ""

    return "## 기본 정보\n" + "\n".join(lines) + "\n\n"


def _build_user_question_section(user_context: str | None) -> str:
    """사용자 상황 및 질문 섹션을 구성한다.

    구조화된 상황 입력(현재 상태 / 핵심 고민 / 궁금한 점)을 파싱하여
    해석 우선순위를 조정한다. 구조화되지 않은 자유 텍스트도 처리한다.

    Args:
        user_context: 사용자 추가 질문 또는 상황 설명

    Returns:
        사용자 상황 섹션 문자열
    """
    if not user_context:
        return ""

    # 구조화된 입력 파싱 시도 (현재 상태 / 핵심 고민 / 궁금한 점 키워드)
    structured = _parse_structured_context(user_context)

    if structured:
        lines = ["\n## 사용자 현재 상황 및 요청"]
        if structured.get("상태"):
            lines.append(f"\n**현재 직업/상태**: {structured['상태']}")
        if structured.get("고민"):
            lines.append(f"**핵심 고민**: {structured['고민']}")
        if structured.get("질문"):
            lines.append(f"**궁금한 점**: {structured['질문']}")
        lines.append(
            "\n**해석 우선순위**: 위 상황과 고민을 사주 흐름에 직접 대입하여, "
            "지금 이 사람에게만 유효한 구체적 전략을 4단계 분석의 핵심으로 다루어라."
        )
        return "\n".join(lines)

    # 자유 텍스트: 카테고리 분류 후 우선순위 조정
    lines = [f"\n## 사용자 현재 상황 및 요청\n{user_context}"]
    category = _extract_question_category(user_context)
    if category:
        lines.append(
            f"\n**분류된 관심 영역**: {category}\n"
            f"**해석 우선순위**: 4단계 전략 분석에서 '{category}' 영역을 "
            "사주 흐름과 연계하여 집중적으로 다루어라."
        )
    else:
        lines.append(
            "\n**해석 우선순위**: 사용자의 질문을 사주 구조 분석과 직접 연결하여 답하라."
        )
    return "\n".join(lines)


def _parse_structured_context(text: str) -> dict[str, str] | None:
    """구조화된 상황 텍스트에서 상태/고민/질문을 파싱한다.

    '현재', '상태', '직업' 키워드로 시작하는 줄을 상태로,
    '고민', '문제' 키워드를 고민으로,
    '궁금', '질문', '어떻게', '어떤' 키워드를 질문으로 파싱한다.

    Args:
        text: 사용자 입력 텍스트

    Returns:
        {'상태': ..., '고민': ..., '질문': ...} 또는 None (구조 미감지)
    """
    state_keywords = ("현재 직업", "현재 상태", "직업", "하는 일", "현재")
    concern_keywords = ("고민", "문제", "걱정", "어려움")
    question_keywords = ("궁금", "질문", "어떻게", "어떤", "무엇")

    result: dict[str, str] = {}
    lines = [line.strip() for line in text.splitlines() if line.strip()]

    for line in lines:
        if not result.get("상태") and any(kw in line for kw in state_keywords):
            result["상태"] = line
        elif not result.get("고민") and any(kw in line for kw in concern_keywords):
            result["고민"] = line
        elif not result.get("질문") and any(kw in line for kw in question_keywords):
            result["질문"] = line

    # 최소 2개 필드가 감지된 경우에만 구조화로 간주
    return result if len(result) >= 2 else None


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


def _build_sewun_json_instruction(saju_result: SajuResult) -> str:
    """세운 3년 흐름 JSON 출력 지침을 구성한다.

    sewun 데이터에서 현재 연도 기준 전년/당년/익년을 결정한다.
    sewun 데이터가 없으면 date.today()를 기준으로 한다.

    Args:
        saju_result: 사주 계산 결과

    Returns:
        세운 JSON 출력 지침 문자열
    """
    # sewun 데이터에서 연도 추출 시도
    years: list[int] = []
    if saju_result.sewun:
        sewun_years = sorted(s.year for s in saju_result.sewun)
        # is_current 표시된 연도가 있으면 해당 연도 기준
        current_year_candidates = [s.year for s in saju_result.sewun if s.is_current]
        if current_year_candidates:
            cy = current_year_candidates[0]
            years = [cy - 1, cy, cy + 1]
        elif sewun_years:
            # is_current가 없으면 중간값 사용
            mid_idx = len(sewun_years) // 2
            cy = sewun_years[mid_idx]
            years = [cy - 1, cy, cy + 1]

    if not years:
        today_year = date.today().year
        years = [today_year - 1, today_year, today_year + 1]

    example_json = (
        '{"year_summaries": ['
        f'{{"year": {years[0]}, "summary": "2문장 설명"}}, '
        f'{{"year": {years[1]}, "summary": "2문장 설명"}}, '
        f'{{"year": {years[2]}, "summary": "2문장 설명"}}'
        "]}"
    )

    return (
        "\n\n---"
        "\n\n## 3년 흐름 JSON 출력 (필수)"
        "\n\n응답 마지막에 반드시 아래 형식으로 최근 3년 세운 요약을 포함하세요:"
        "\n\n<SEWUN_JSON>"
        f"\n{example_json}"
        "\n</SEWUN_JSON>"
        "\n\n각 연도는 용신/기신 관점에서 그 해 세운이 유리한지 불리한지 "
        "2문장으로 작성하세요. 긍정/부정을 명확히 표현하세요."
    )


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
