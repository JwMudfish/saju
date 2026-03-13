"""사주팔자 계산 Streamlit 앱 - 6탭 대시보드."""

from __future__ import annotations

from typing import Any

import pandas as pd
import requests
import streamlit as st

from app.services.content_loader import (
    YUKSIN_TO_GYOUK,
    get_bestfriend_content,
    get_gusin_content,
    get_gusin_gisin_content,
    get_gyouk_content,
    get_hapchung_content,
    get_hisin_content,
    get_hisin_gisin_content,
    get_ilgan_content,
    get_ilgan_hw_content,
    get_ilgan_love_content,
    get_jisok_content,
    get_joonghwa_content,
    get_light_question_content,
    get_old_young_content,
    get_sangsin_compliment_content,
    get_sangsin_content,
    get_salary_content,
    get_shgj_gilhung_content,
    get_hwakjang_content,
    get_yongsin_content,
)

# API 엔드포인트
API_BASE_URL = "http://localhost:8000"

# 십성 그룹 정의
YUKSIN_GROUPS: dict[str, dict[str, Any]] = {
    "비겁 (비견·겁재)": {
        "설명": (
            "형제·동료·경쟁자를 나타냅니다. "
            "나와 같은 오행으로 비슷한 성질을 가진 사람들과의 관계를 의미합니다."
        ),
        "십성": ["비견", "겁재"],
    },
    "식상 (식신·상관)": {
        "설명": (
            "표현력·창의성·말재주를 나타냅니다. 내가 생하는 오행으로 재능과 표현 방식을 의미합니다."
        ),
        "십성": ["식신", "상관"],
    },
    "재성 (편재·정재)": {
        "설명": ("재물·아버지·배우자(남성의 경우)를 나타냅니다. 내가 극하는 오행입니다."),
        "십성": ["편재", "정재"],
    },
    "관성 (편관·정관)": {
        "설명": ("직업·명예·남편(여성의 경우)을 나타냅니다. 나를 극하는 오행입니다."),
        "십성": ["편관", "정관"],
    },
    "인성 (편인·정인)": {
        "설명": ("학문·어머니·보호자를 나타냅니다. 나를 생하는 오행입니다."),
        "십성": ["편인", "정인"],
    },
}

# 기둥 한국어/한자 매핑
PILLAR_LABEL_KO: dict[str, str] = {
    "year": "년주",
    "month": "월주",
    "day": "일주",
    "hour": "시주",
}
PILLAR_LABEL_CN: dict[str, str] = {
    "year": "年柱",
    "month": "月柱",
    "day": "日柱",
    "hour": "時柱",
}

# 십이운성 기둥 한국어 매핑
PILLAR_SIBO_KO: dict[str, str] = {
    "year": "년지",
    "month": "월지",
    "day": "일지",
    "hour": "시지",
}

# 오행 한국어 매핑
OHANG_LABELS: list[str] = ["목(木)", "화(火)", "토(土)", "금(金)", "수(水)"]
OHANG_KEYS: list[str] = ["mok", "hwa", "to", "geum", "su"]


def render_sidebar() -> dict[str, Any] | None:
    """사이드바 입력 폼. 계산 버튼 클릭 시 payload dict 반환, 미클릭 시 None."""
    with st.sidebar:
        st.header("입력 정보")

        # 달력 타입
        calendar_type = st.radio("달력 타입", ["양력", "음력"])
        is_lunar = calendar_type == "음력"

        # 생년월일 3열
        col1, col2, col3 = st.columns(3)
        with col1:
            year = st.number_input("년", min_value=1600, max_value=2100, value=1984, step=1)
        with col2:
            month = st.number_input("월", min_value=1, max_value=12, value=4, step=1)
        with col3:
            day = st.number_input("일", min_value=1, max_value=31, value=15, step=1)

        # 윤달 체크박스 (음력 선택 시만)
        is_leap_month = False
        if is_lunar:
            is_leap_month = st.checkbox("윤달")

        # 시각 미상 체크박스 먼저, 슬라이더는 비활성화 여부 제어
        unknown_time = st.checkbox("시각 미상")
        hour_slider = st.slider(
            "출생 시각",
            min_value=0,
            max_value=23,
            value=12,
            step=1,
            disabled=unknown_time,
        )
        birth_hour: int | None = None if unknown_time else hour_slider

        # 성별
        gender_label = st.radio("성별", ["남성", "여성"])
        gender = "male" if gender_label == "남성" else "female"

        # 계산 버튼
        clicked = st.button("사주 계산", type="primary", use_container_width=True)

    if not clicked:
        return None

    return {
        "birth_year": int(year),
        "birth_month": int(month),
        "birth_day": int(day),
        "birth_hour": birth_hour,
        "gender": gender,
        "is_lunar": is_lunar,
        "is_leap_month": is_leap_month,
    }


def safe_api_call(payload: dict[str, Any]) -> dict[str, Any] | None:
    """API 호출 래퍼. 오류 구분 처리."""
    try:
        response = requests.post(f"{API_BASE_URL}/api/v1/saju", json=payload, timeout=10)
        if response.status_code == 400:
            st.error("입력값이 올바르지 않습니다. 생년월일과 시각을 확인하세요.")
            return None
        if response.status_code == 500:
            st.error("서버 오류가 발생했습니다. 잠시 후 다시 시도하거나 관리자에게 문의하세요.")
            return None
        response.raise_for_status()
        return response.json()  # type: ignore[no-any-return]
    except requests.Timeout:
        st.error("요청 시간이 초과되었습니다. 네트워크를 확인하고 다시 시도하세요.")
        return None
    except requests.ConnectionError:
        st.error("API 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.")
        return None
    except Exception:  # noqa: BLE001
        st.error("알 수 없는 오류가 발생했습니다.")
        return None


def render_tab_wonkuk(result: dict[str, Any]) -> None:
    """Tab 1: 사주 원국."""
    st.subheader("사주 원국 (四柱八字)")

    pillar_keys = ["year_pillar", "month_pillar", "day_pillar", "hour_pillar"]
    pillar_ids = ["year", "month", "day", "hour"]

    # pillar_meanings 목록에서 meaning을 pillar 키로 매핑
    meanings_map: dict[str, str] = {}
    for item in result.get("pillar_meanings", []):
        meanings_map[item.get("pillar", "")] = item.get("meaning", "")

    # 4기둥 카드
    cols = st.columns(4)
    for idx, (pkey, pid) in enumerate(zip(pillar_keys, pillar_ids)):
        pillar = result.get(pkey)
        cn_label = PILLAR_LABEL_CN.get(pid, pid)
        meaning = meanings_map.get(pid, "")
        with cols[idx]:
            st.subheader(cn_label)
            if pillar:
                gan = pillar.get("gan", "")
                ji = pillar.get("ji", "")
                st.markdown(f"## {gan} {ji}")
            else:
                st.markdown("## 미상")
            if meaning:
                st.caption(meaning)

    st.markdown("---")

    # 기본 정보 (대운 방향/시작)
    deun = result.get("deun", {})
    banghyang = deun.get("banghyang", "-")
    deun_su = deun.get("deun_su", "-")
    st.info(f"대운 방향: {banghyang} | 대운 시작: {deun_su}세")


def render_tab_yuksin(result: dict[str, Any]) -> None:
    """Tab 2: 십성 분석."""
    st.subheader("십성 분석 (十星分析)")

    yuksin_list: list[dict[str, Any]] = result.get("yuksin_list", [])

    if not yuksin_list:
        st.info("십성 정보가 없습니다.")
        return

    # 십성 목록에 그룹 정보 추가
    def find_group(yuksin_name: str) -> str:
        for group_name, group_info in YUKSIN_GROUPS.items():
            if yuksin_name in group_info["십성"]:
                return group_name
        return "기타"

    table_data = [
        {
            "위치": item.get("target", ""),
            "십성": item.get("yuksin", ""),
            "그룹": find_group(item.get("yuksin", "")),
        }
        for item in yuksin_list
    ]

    st.dataframe(table_data, use_container_width=True, hide_index=True)

    st.markdown("---")
    st.subheader("십성 그룹 설명")

    for group_name, group_info in YUKSIN_GROUPS.items():
        with st.expander(group_name):
            st.write(group_info["설명"])
            members = ", ".join(group_info["십성"])
            st.caption(f"포함: {members}")


def render_tab_luck(result: dict[str, Any], birth_year: int) -> None:
    """Tab 3: 운의 흐름."""
    import datetime

    st.subheader("운의 흐름")

    current_year = datetime.datetime.now().year
    current_age = current_year - birth_year

    deun = result.get("deun", {})
    banghyang = deun.get("banghyang", "-")
    deun_su = deun.get("deun_su", "-")
    deun_list: list[dict[str, Any]] = deun.get("deun_list", [])

    # 현재 대운 찾기
    current_deun: dict[str, Any] | None = None
    for item in deun_list:
        age_start = item.get("age", 0)
        if age_start <= current_age < age_start + 10:
            current_deun = item
            break
    if current_deun is None and deun_list:
        # 가장 가까운 항목 (마지막 대운 이후)
        current_deun = deun_list[-1]

    # 현재 세운 찾기
    sewun_list: list[dict[str, Any]] = result.get("sewun", [])
    current_sewun: dict[str, Any] | None = None
    for item in sewun_list:
        if item.get("is_current", False):
            current_sewun = item
            break

    # 요약 카드 (metric 3개)
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("대운 방향", banghyang)
    with col2:
        st.metric("대운 시작 나이", f"{deun_su}세")
    with col3:
        if current_sewun:
            ganji = current_sewun.get("ganji", {})
            gan = ganji.get("gan", "")
            ji = ganji.get("ji", "")
            st.metric("현재 세운", f"{gan}{ji} ({current_year})")
        else:
            st.metric("현재 세운", f"{current_year}년")

    st.markdown("---")

    # 대운 테이블
    st.subheader("대운 목록")
    if deun_list:
        deun_table = []
        for item in deun_list:
            age_start = item.get("age", 0)
            ganji = item.get("ganji", {})
            gan = ganji.get("gan", "")
            ji = ganji.get("ji", "")
            is_current = age_start <= current_age < age_start + 10
            deun_table.append(
                {
                    "나이": f"{age_start}세",
                    "간지": f"{gan}{ji}",
                    "현재": "▶ 현재" if is_current else "",
                }
            )
        st.dataframe(deun_table, use_container_width=True, hide_index=True)
    else:
        st.info("대운 정보가 없습니다.")

    st.markdown("---")

    # 세운 테이블
    st.subheader("세운 목록")
    if sewun_list:
        sewun_table = []
        for item in sewun_list:
            year_val = item.get("year", "")
            ganji = item.get("ganji", {})
            gan = ganji.get("gan", "")
            ji = ganji.get("ji", "")
            is_cur = item.get("is_current", False)
            sewun_table.append(
                {
                    "연도": str(year_val),
                    "간지": f"{gan}{ji}",
                    "현재": "▶ 현재" if is_cur else "",
                }
            )
        st.dataframe(sewun_table, use_container_width=True, hide_index=True)
    else:
        st.info("세운 정보가 없습니다.")


HAPCHUNG_DESCRIPTIONS: dict[str, str] = {
    "충": "충(沖): 두 지지가 정면으로 충돌하는 관계. 변화·갈등·파괴력을 나타냄.",
    "형": "형(刑): 세 지지 또는 두 지지 사이의 억압·처벌·규제 관계.",
    "해": "해(害): 두 지지가 서로 해치는 관계. 방해·훼방·손실을 나타냄.",
    "파": "파(破): 두 지지가 깨지는 관계. 손상·파손·분리를 나타냄.",
    "육합": "육합(六合): 두 지지가 서로 합해지는 관계. 결합·협력·화합을 나타냄.",
    "삼합": "삼합(三合): 세 지지가 하나의 오행으로 합해지는 관계. 강력한 결합력.",
    "방합": "방합(方合): 같은 방향의 세 지지가 합해지는 관계. 계절·방위의 결합.",
}


def _highlight_chung(row: pd.Series[str]) -> list[str]:
    """충 관계 행에 배경색 적용."""
    if row.get("관계") == "충":
        return ["background-color: #ffe0e0"] * len(row)
    return [""] * len(row)


def _render_hapchung_section(hapchung_list: list[dict[str, Any]]) -> None:
    """합충형해파 섹션 렌더링."""
    st.markdown("#### 합충형해파 (合沖刑害破)")

    if not hapchung_list:
        st.info("기둥 간 특별한 관계가 없습니다.")
    else:
        rows = []
        for rel in hapchung_list:
            rows.append(
                {
                    "기둥1": PILLAR_LABEL_KO.get(rel.get("pillar1", ""), rel.get("pillar1", "")),
                    "지지1": rel.get("ji1", ""),
                    "기둥2": PILLAR_LABEL_KO.get(rel.get("pillar2", ""), rel.get("pillar2", "")),
                    "지지2": rel.get("ji2", ""),
                    "관계": rel.get("relation_type", ""),
                    "세부유형": rel.get("subtype") or "",
                }
            )
        df = pd.DataFrame(rows)
        styled = df.style.apply(_highlight_chung, axis=1)
        st.dataframe(styled, use_container_width=True, hide_index=True)

    with st.expander("합충형해파 용어 설명", expanded=False):
        for name, desc in HAPCHUNG_DESCRIPTIONS.items():
            st.markdown(f"- **{name}**: {desc.split(': ', 1)[1] if ': ' in desc else desc}")


def render_tab_detail(result: dict[str, Any]) -> None:
    """Tab 4: 세부 지표."""
    st.subheader("세부 지표")

    # 1. 지장간 테이블
    st.markdown("#### 지장간 (支藏干)")
    jijanggan: dict[str, Any] = result.get("jijanggan", {})
    pillar_ids = ["year", "month", "day"]
    hour_pillar = result.get("hour_pillar")
    if hour_pillar:
        pillar_ids = ["year", "month", "day", "hour"]

    if jijanggan:
        jjg_table = []
        for pid in pillar_ids:
            ji_data = jijanggan.get(pid, {})
            jjg_table.append(
                {
                    "기둥": PILLAR_LABEL_KO.get(pid, pid),
                    "여기 (initial)": ji_data.get("initial") or "-",
                    "중기 (middle)": ji_data.get("middle") or "-",
                    "정기 (main)": ji_data.get("main") or "-",
                }
            )
        st.dataframe(jjg_table, use_container_width=True, hide_index=True)
    else:
        st.info("지장간 정보가 없습니다.")

    st.markdown("---")

    # 2. 십이운성 테이블
    st.markdown("#### 십이운성 (十二運星)")
    sibiunsung: list[dict[str, Any]] = result.get("sibiunsung", [])
    if sibiunsung:
        sibo_table = [
            {
                "기둥": PILLAR_SIBO_KO.get(item.get("pillar", ""), item.get("pillar", "")),
                "지지": item.get("ji", ""),
                "십이운성": item.get("stage", ""),
            }
            for item in sibiunsung
        ]
        st.dataframe(sibo_table, use_container_width=True, hide_index=True)
    else:
        st.info("십이운성 정보가 없습니다.")

    st.markdown("---")

    # 3. 신살 테이블
    st.markdown("#### 신살 (神殺)")
    shinsal: list[dict[str, Any]] = result.get("shinsal", [])
    if shinsal:
        shinsal_table = [
            {
                "신살명": item.get("name", ""),
                "발동지지": item.get("trigger_ji", ""),
                "설명": item.get("description", ""),
            }
            for item in shinsal
        ]
        st.dataframe(shinsal_table, use_container_width=True, hide_index=True)
    else:
        st.info("해당 신살이 없습니다.")

    st.markdown("---")

    # 4. 오행 분포 차트
    st.markdown("#### 오행 분포 (五行分布)")
    ohang_ratio: dict[str, Any] = result.get("ohang_ratio", {})
    if ohang_ratio:
        values = [ohang_ratio.get(k, 0.0) for k in OHANG_KEYS]
        try:
            import plotly.graph_objects as go

            fig = go.Figure(
                data=[
                    go.Bar(
                        x=OHANG_LABELS,
                        y=values,
                        marker_color=["#4caf50", "#f44336", "#ff9800", "#9e9e9e", "#2196f3"],
                    )
                ]
            )
            fig.update_layout(
                xaxis_title="오행",
                yaxis_title="비율 (%)",
                showlegend=False,
                height=300,
            )
            st.plotly_chart(fig, use_container_width=True)
        except ImportError:
            st.warning("plotly가 설치되지 않아 텍스트로 표시합니다.")
            ohang_table = [
                {"오행": label, "비율": f"{val:.1f}%"} for label, val in zip(OHANG_LABELS, values)
            ]
            st.dataframe(ohang_table, use_container_width=True, hide_index=True)
    else:
        st.info("오행 정보가 없습니다.")

    # 5. 합충형해파 분석
    st.markdown("---")
    hapchung_list = result.get("hapchung") or []
    _render_hapchung_section(hapchung_list)


# 한글 격국명 -> 영문 코드 매핑 (q1_gyouk.json title 매칭용)
_GYOUK_NAME_TO_CODE: dict[str, str] = {
    "건록격": "gunlok",
    "양인격": "yangin",
    "상관격": "sangGuan",
    "식신격": "siksin",
    "정인격": "jungIn",
    "편인격": "pyeonIn",
    "정재격": "jungJe",
    "편재격": "pyeonje",
    "정관격": "jungGuan",
    "편관격": "pyeonGuan",
}

# 용신(당령) -> 영문 코드 매핑 (q1_yongsin.json title 매칭용)
_DANG_RYEONG_TO_CODE: dict[str, str] = {
    "계": "yongsin_GyeSu",
    "갑": "yongsin_GapMok",
    "을": "yongsin_UlMok",
    "병": "yongsin_ByeongHwa",
    "정": "yongsin_JungHwa",
    "경": "yongsin_GyeongGum",
    "신": "yongsin_SinGum",
    "임": "yongsin_Limsu",
}


def _calc_gyouk_from_result(result: dict[str, Any]) -> str | None:
    """사주 계산 결과에서 격국명을 도출한다.

    yuksin_list에서 target == "월지"인 항목의 yuksin을 격국명으로 변환한다.

    Args:
        result: SajuResult 딕셔너리

    Returns:
        격국명 문자열 또는 None (도출 불가 시)
    """
    yuksin_list = result.get("yuksin_list") or []
    for item in yuksin_list:
        if isinstance(item, dict):
            target = item.get("target", "")
            yuksin = item.get("yuksin", "")
        else:
            target = getattr(item, "target", "")
            yuksin = getattr(item, "yuksin", "")
        if target == "월지":
            return YUKSIN_TO_GYOUK.get(yuksin)
    return None


def render_tab_relationship(result: dict[str, Any]) -> None:
    """Tab 7: 관계 분석 - 합충, 화월, 연애, 베프 (SPEC-CONTENT-003 Phase 2)."""
    st.subheader("관계 분석 (Relationship Analysis)")

    # 1. 합충 관계 콘텐츠
    hapchung_list = result.get("hapchung") or []
    if hapchung_list:
        # 가장 중요한 관계 유형 추출 (첫 번째 항목)
        primary_relation = hapchung_list[0] if hapchung_list else {}
        relation_type = primary_relation.get("relation_type", "")
        if relation_type:
            hapchung_content = get_hapchung_content(relation_type)
            if hapchung_content:
                st.markdown("#### 🔗 합충 관계 (合沖關係)")
                with st.expander(f"합충 관계 해석: {relation_type}", expanded=False):
                    title = hapchung_content.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    contents_list = hapchung_content.get("contentsList", [])
                    if contents_list:
                        for item in contents_list:
                            subtitle = item.get("subtitle", "")
                            if subtitle:
                                st.markdown(f"**{subtitle}**")
                            contents = item.get("contents", "")
                            if contents:
                                st.write(contents.replace("\\n", "\n"))
    else:
        st.info("합충 관계 데이터가 없습니다.")

    st.markdown("---")

    # 2. 일간 화월 콘텐츠
    day_pillar = result.get("day_pillar", {})
    month_pillar = result.get("month_pillar", {})
    if isinstance(day_pillar, dict):
        ilgan = day_pillar.get("gan", "")
        month_ji = month_pillar.get("ji", "") if isinstance(month_pillar, dict) else ""
    else:
        ilgan = getattr(day_pillar, "gan", "")
        month_ji = getattr(month_pillar, "ji", "") if month_pillar else ""

    if ilgan and month_ji:
        ilgan_hw = get_ilgan_hw_content(ilgan, month_ji)
        if ilgan_hw:
            st.markdown("#### 💕 일간 화월 (日間火月)")
            with st.expander("일간 화월 관계 해석", expanded=False):
                title = ilgan_hw.get("title", "")
                if title:
                    st.markdown(f"**{title}**")
                contents_list = ilgan_hw.get("contentsList", [])
                if contents_list:
                    for item in contents_list:
                        subtitle = item.get("subtitle", "")
                        if subtitle:
                            st.markdown(f"**{subtitle}**")
                        contents = item.get("contents", "")
                        if contents:
                            st.write(contents.replace("\\n", "\n"))
    else:
        st.info("일간 화월 데이터가 없습니다.")

    st.markdown("---")

    # 3. 일간 연애 콘텐츠
    if ilgan:
        ilgan_love = get_ilgan_love_content(ilgan)
        if ilgan_love:
            st.markdown("#### 💖 일간 연애 (日間戀愛)")
            with st.expander("일간 연애 스타일 해석", expanded=False):
                title = ilgan_love.get("title", "")
                if title:
                    st.markdown(f"**{title}**")
                contents_list = ilgan_love.get("contentsList", [])
                if contents_list:
                    for item in contents_list:
                        subtitle = item.get("subtitle", "")
                        if subtitle:
                            st.markdown(f"**{subtitle}**")
                        contents = item.get("contents", "")
                        if contents:
                            st.write(contents.replace("\\n", "\n"))
    else:
        st.info("일간 연애 데이터가 없습니다.")

    st.markdown("---")

    # 4. 베프 유형 콘텐츠 (십성 기반)
    yuksin_list = result.get("yuksin_list", [])
    if yuksin_list:
        # 월지 십성 찾기
        month_ji_yuksin = None
        for item in yuksin_list:
            if item.get("target") == "월지":
                month_ji_yuksin = item.get("yuksin")
                break

        if month_ji_yuksin:
            bestfriend = get_bestfriend_content(month_ji_yuksin)
            if bestfriend:
                st.markdown("#### 👥 베프 유형 (Best Friend)")
                with st.expander(f"베프 유형: {month_ji_yuksin}", expanded=False):
                    title = bestfriend.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    contents_list = bestfriend.get("contentsList", [])
                    if contents_list:
                        for item in contents_list:
                            subtitle = item.get("subtitle", "")
                            if subtitle:
                                st.markdown(f"**{subtitle}**")
                            contents = item.get("contents", "")
                            if contents:
                                st.write(contents.replace("\\n", "\n"))
    else:
        st.info("베프 유형 데이터가 없습니다.")


def render_tab_light_question(result: dict[str, Any]) -> None:
    """Tab 8: 경운 안내 - 노소 유형, 경운 질문 (SPEC-CONTENT-003 Phase 3)."""
    st.subheader("경운 안내 (Fortune Guidance)")

    # 1. 노소 유형 콘텐츠
    day_pillar = result.get("day_pillar", {})
    month_pillar = result.get("month_pillar", {})
    if isinstance(day_pillar, dict):
        ilgan = day_pillar.get("gan", "")
        month_ji = month_pillar.get("ji", "") if isinstance(month_pillar, dict) else ""
    else:
        ilgan = getattr(day_pillar, "gan", "")
        month_ji = getattr(month_pillar, "ji", "") if month_pillar else ""

    if ilgan and month_ji:
        old_young = get_old_young_content(ilgan, month_ji)
        if old_young:
            st.markdown("#### 👴👶 노소 유형 (老少類型)")
            with st.expander("노소 관계 유형 해석", expanded=False):
                title = old_young.get("title", "")
                if title:
                    st.markdown(f"**{title}**")
                contents_list = old_young.get("contentsList", [])
                if contents_list:
                    for item in contents_list:
                        subtitle = item.get("subtitle", "")
                        if subtitle:
                            st.markdown(f"**{subtitle}**")
                        contents = item.get("contents", "")
                        if contents:
                            st.write(contents.replace("\\n", "\n"))
    else:
        st.info("노소 유형 데이터가 없습니다.")

    st.markdown("---")

    # 2. 경운 질문 콘텐츠 (상화/설화 기반)
    shgj = result.get("shgj")
    if shgj is not None and not isinstance(shgj, dict):
        if hasattr(shgj, "model_dump"):
            shgj = shgj.model_dump()
        elif hasattr(shgj, "dict"):
            shgj = shgj.dict()

    if shgj:
        sanghwa = shgj.get("sanghwa")
        sulhwa = shgj.get("sulhwa")
        gyouk_name = _calc_gyouk_from_result(result)

        # 경운 질문 로드 (여러 질문 가능)
        st.markdown("#### 💡 경운 질문 ( 경運質問)")

        if gyouk_name:
            # q1: 기본 질문 (용신 유무에 따라)
            yongshin = result.get("yongshin")  # API 응답에서 용신 정보 확인
            q1_type = "yongsin" if yongshin else "gyouk"
            light_q1 = get_light_question_content("q1", q1_type, sanghwa, sulhwa)
            if light_q1:
                # Expander 타이틀에 용신/격국 정보 표시
                if q1_type == "yongsin" and yongshin:
                    dang_ryeong = yongshin.get("dang_ryeong", "") if isinstance(yongshin, dict) else ""
                    expander_title = f"기본 경운 (용신: {dang_ryeong})"
                else:
                    expander_title = f"기본 경운 (격국: {gyouk_name})"

                with st.expander(expander_title, expanded=False):
                    contents_list = light_q1.get("contentsList", [])
                    if contents_list:
                        # 사용자의 용신/격국에 해당하는 항목만 필터링
                        if q1_type == "yongsin" and yongshin:
                            # 용신 기반: 당령(dang_ryeong)으로 필터링
                            dang_ryeong = yongshin.get("dang_ryeong", "") if isinstance(yongshin, dict) else ""
                            target_title = _DANG_RYEONG_TO_CODE.get(dang_ryeong)
                            if target_title:
                                for item in contents_list:
                                    if item.get("title") == target_title:
                                        contents = item.get("contents", "")
                                        if contents:
                                            st.write(contents.replace("\\n", "\n"))
                                        break
                        else:
                            # 격국 기반: 격국명으로 필터링
                            target_title = _GYOUK_NAME_TO_CODE.get(gyouk_name)
                            if target_title:
                                for item in contents_list:
                                    if item.get("title") == target_title:
                                        contents = item.get("contents", "")
                                        if contents:
                                            st.write(contents.replace("\\n", "\n"))
                                        break

            # q7: 중재 질문
            light_q7 = get_light_question_content("q7", "jungJe", sanghwa, sulhwa)
            if light_q7:
                with st.expander("중재 경운", expanded=False):
                    contents_list = light_q7.get("contentsList", [])
                    if contents_list:
                        # sanghwa/sulhwa 조합에 해당하는 title만 필터링
                        if sanghwa and sulhwa:
                            title_mapping = {
                                ("sengYes", "sulNo"): "sengHwaZeHwa",
                                ("sengYes", "sulYes"): "sengHwaHapHwa",
                                ("sengNo", "sulYes"): "sulHwaZeHwa",
                                ("sengNo", "sulNo"): "sulHwaHapHwa"
                            }
                            target_title = title_mapping.get((sanghwa, sulhwa))
                            if target_title:
                                for item in contents_list:
                                    if item.get("title") == target_title:
                                        contents = item.get("contents", "")
                                        if contents:
                                            st.write(contents.replace("\\n", "\n"))
                                        break

            # q8: 식신 질문
            light_q8 = get_light_question_content("q8", "siksin", sanghwa, sulhwa)
            if light_q8:
                with st.expander("식신 경운", expanded=False):
                    contents_list = light_q8.get("contentsList", [])
                    if contents_list:
                        # sanghwa/sulhwa 조합에 해당하는 title만 필터링
                        if sanghwa and sulhwa:
                            title_mapping = {
                                ("sengYes", "sulNo"): "sengHwaZeHwa",
                                ("sengYes", "sulYes"): "sengHwaHapHwa",
                                ("sengNo", "sulYes"): "sulHwaZeHwa",
                                ("sengNo", "sulNo"): "sulHwaHapHwa"
                            }
                            target_title = title_mapping.get((sanghwa, sulhwa))
                            if target_title:
                                for item in contents_list:
                                    if item.get("title") == target_title:
                                        contents = item.get("contents", "")
                                        if contents:
                                            st.write(contents.replace("\\n", "\n"))
                                        break
    else:
        st.info("경운 질문 데이터가 없습니다.")


def render_tab_identity(result: dict[str, Any]) -> None:
    """Tab 6: 나의 정체성 - 일간 카드 | 격국 카드 | 용신 카드 (3-컬럼)."""
    st.subheader("나의 정체성 분석")

    # 일간(日干) 추출 - dict 또는 Pydantic 모델 모두 지원
    day_pillar = result.get("day_pillar", {})
    if isinstance(day_pillar, dict):
        gan = day_pillar.get("gan", "")
    else:
        gan = getattr(day_pillar, "gan", "")

    # 격국(格局) 계산
    gyouk_name = _calc_gyouk_from_result(result)

    # 용신(用神) 추출
    yongshin = result.get("yongshin")
    if yongshin is not None and not isinstance(yongshin, dict):
        if hasattr(yongshin, "model_dump"):
            yongshin = yongshin.model_dump()
        elif hasattr(yongshin, "dict"):
            yongshin = yongshin.dict()

    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("#### 🌱 나의 일간 (日干)")
        ilgan_content = get_ilgan_content(gan)
        if ilgan_content:
            ilgan_label = ilgan_content.get("ilgan", gan)
            st.info(f"일간: {ilgan_label}")
            title = ilgan_content.get("ilganDesciption", "")
            if title:
                st.markdown(f"**{title}**")
            subtitle = ilgan_content.get("subtitle", "")
            if subtitle:
                st.caption(subtitle)
            contents = ilgan_content.get("contents", "")
            if contents:
                with st.expander("자세히 보기", expanded=True):
                    st.write(contents.replace("\\n", "\n"))
        else:
            st.info("일간 캐릭터 정보를 불러올 수 없습니다.")

    with col2:
        st.markdown("#### 🏛️ 나의 격국 (格局)")
        gyouk_content = get_gyouk_content(gyouk_name) if gyouk_name else None
        if gyouk_content:
            st.info(f"격국: {gyouk_name}")
            title_desc = gyouk_content.get("titleDescription", "")
            if title_desc:
                st.markdown(f"**{title_desc}**")
            tag_zoryun = gyouk_content.get("tagZoryun", "")
            if tag_zoryun:
                st.caption(f"베스트 조합: {tag_zoryun}")
            tag_angry = gyouk_content.get("tagAngry", "")
            if tag_angry:
                st.caption(f"최악의 조합: {tag_angry}")
            contents = gyouk_content.get("contents", "")
            if contents:
                with st.expander("성격 자세히 보기", expanded=True):
                    st.write(contents.replace("\\n", "\n"))
        else:
            st.info("격국 정보를 불러올 수 없습니다.")

    with col3:
        st.markdown("#### ✨ 나의 용신 재능 (用神)")
        if yongshin:
            dang_ryeong = yongshin.get("dang_ryeong", "")
            heuisin = yongshin.get("heuisin", "")
            yongsin_content = get_yongsin_content(dang_ryeong)
            if yongsin_content:
                st.info(f"용신: {dang_ryeong} / 희신: {heuisin}")
                subtitle = yongsin_content.get("subtitle", "")
                if subtitle:
                    st.markdown(f"**{subtitle}**")
                tag = yongsin_content.get("tag", "")
                if tag:
                    st.caption(tag)
                contents = yongsin_content.get("contents", "")
                if contents:
                    with st.expander("재능 및 진로 보기", expanded=True):
                        st.write(contents.replace("\\n", "\n"))
            else:
                st.info("용신 콘텐츠를 불러올 수 없습니다.")
        else:
            st.info("용신 정보를 불러올 수 없습니다.")

    # 희신 콘텐츠 섹션 (3-컬럼 레이아웃 하단 추가)
    if yongshin:
        dang_ryeong = yongshin.get("dang_ryeong", "")
        if dang_ryeong:
            hisin_content = get_hisin_content(dang_ryeong)
            if hisin_content:
                st.markdown("---")
                st.markdown("#### 🌟 희신 콘텐츠 (喜神)")
                with st.expander("희신 콘텐츠 상세 보기", expanded=False):
                    contents_list = hisin_content.get("contentsList", [])
                    if contents_list:
                        for item in contents_list:
                            subtitle = item.get("subtitle", "")
                            if subtitle:
                                st.markdown(f"**{subtitle}**")
                            contents = item.get("contents", "")
                            if contents:
                                st.write(contents.replace("\\n", "\n"))
                            st.markdown("---")
                    else:
                        st.json(hisin_content)

    # 희기신 컨텐츠 섹션
    hisin_gisin_content = get_hisin_gisin_content()
    if hisin_gisin_content:
        st.markdown("---")
        st.markdown("#### 🎭 희기신 판정 (喜忌神)")
        with st.expander("희기신 상세 보기", expanded=False):
            contents_list = hisin_gisin_content.get("contentsList", [])
            if contents_list:
                for item in contents_list:
                    subtitle = item.get("subtitle", "")
                    if subtitle:
                        st.markdown(f"**{subtitle}**")
                    contents = item.get("contents", "")
                    if contents:
                        st.write(contents.replace("\\n", "\n"))
                    st.markdown("---")
            else:
                st.json(hisin_gisin_content)

    # 연봉 컨텐츠 섹션
    salary_content = get_salary_content()
    if salary_content:
        st.markdown("---")
        st.markdown("#### 💰 연봉运势 (Salary)")
        with st.expander("연봉运势 상세 보기", expanded=False):
            contents_list = salary_content.get("contentsList", [])
            if contents_list:
                for item in contents_list:
                    subtitle = item.get("subtitle", "")
                    if subtitle:
                        st.markdown(f"**{subtitle}**")
                    contents = item.get("contents", "")
                    if contents:
                        st.write(contents.replace("\\n", "\n"))
                    st.markdown("---")
            else:
                st.json(salary_content)

    # 신격(Shgj) 섹션 - 확장
    shgj = result.get("shgj")
    if shgj is not None and not isinstance(shgj, dict):
        if hasattr(shgj, "model_dump"):
            shgj = shgj.model_dump()
        elif hasattr(shgj, "dict"):
            shgj = shgj.dict()

    if shgj:
        st.markdown("---")
        st.subheader("신격 (Shgj) - 심화 분석")

        # 신격 핵심 지표 (6개)
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("상신", shgj.get("sangsin") or "-")
        with col2:
            st.metric("구신", shgj.get("gusin") or "-")
        with col3:
            st.metric("국국분", shgj.get("gukgubun") or "-")

        # 신격 관계 지표
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("상화", shgj.get("sanghwa") or "-")
        with col2:
            st.metric("설화", shgj.get("sulhwa") or "-")
        with col3:
            st.metric("길흉", shgj.get("gilhung") or "-")

        # 영격령 지표 (3개)
        st.markdown("#### 영격령 (靈格令)")
        col1, col2, col3 = st.columns(3)
        with col1:
            jisok = shgj.get("jisok")
            st.metric("지속", jisok or "-")
        with col2:
            joonghwa = shgj.get("joonghwa")
            st.metric("중화", joonghwa or "-")
        with col3:
            hwakjang = shgj.get("hwakjang")
            st.metric("확장", hwakjang or "-")

        # 상신 상세 설명
        sangsin = shgj.get("sangsin")
        if sangsin:
            sangsin_content = get_sangsin_content(sangsin)
            if sangsin_content:
                st.markdown("---")
                st.markdown("##### 🌟 상신 상세 설명")
                with st.expander("상신 설명 보기", expanded=False):
                    title = sangsin_content.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    subtitle = sangsin_content.get("subtitle", "")
                    if subtitle:
                        st.caption(subtitle)
                    contents = sangsin_content.get("contents", "")
                    if contents:
                        st.write(contents.replace("\\n", "\n"))

            # 상신 보완 콘텐츠 (SPEC-CONTENT-003 Phase 1)
            sangsin_compliment = get_sangsin_compliment_content(sangsin)
            if sangsin_compliment:
                st.markdown("##### 🌟 상신 보완 해석")
                with st.expander("상신 보완 설명 보기", expanded=False):
                    title = sangsin_compliment.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    contents_list = sangsin_compliment.get("contentsList", [])
                    if contents_list:
                        # 상신 값에 해당하는 title만 필터링
                        target_title = f"sangsin_compliment{sangsin}"
                        for item in contents_list:
                            if item.get("title") == target_title:
                                subtitle = item.get("subtitle", "")
                                if subtitle:
                                    st.markdown(f"**{subtitle}**")
                                contents = item.get("contents", "")
                                if contents:
                                    st.write(contents.replace("\\n", "\n"))
                                break

        # 구신 상세 설명
        gusin = shgj.get("gusin")
        if gusin:
            gusin_content = get_gusin_content(gusin)
            if gusin_content:
                st.markdown("---")
                st.markdown("##### ⚠️ 구신 상세 설명")
                with st.expander("구신 설명 보기", expanded=False):
                    title = gusin_content.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    subtitle = gusin_content.get("subtitle", "")
                    if subtitle:
                        st.caption(subtitle)
                    contents = gusin_content.get("contents", "")
                    if contents:
                        st.write(contents.replace("\\n", "\n"))

            # 구신 기신 콘텐츠 (SPEC-CONTENT-003 Phase 1)
            gusin_gisin = get_gusin_gisin_content(gusin)
            if gusin_gisin:
                st.markdown("##### ⚠️ 구신 기신 해석")
                with st.expander("구신 기신 설명 보기", expanded=False):
                    title = gusin_gisin.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    contents_list = gusin_gisin.get("contentsList", [])
                    if contents_list:
                        # gusin 값에 해당하는 title만 필터링
                        target_title = f"gusin_gisingusin"
                        for item in contents_list:
                            if item.get("title") == target_title:
                                subtitle = item.get("subtitle", "")
                                if subtitle:
                                    st.markdown(f"**{subtitle}**")
                                contents = item.get("contents", "")
                                if contents:
                                    st.write(contents.replace("\\n", "\n"))
                                break

        # 영격령 설명 콘텐츠 (SPEC-CONTENT-003 Phase 1)
        if jisok:
            jisok_content = get_jisok_content(jisok)
            if jisok_content:
                st.markdown("---")
                st.markdown("##### 📖 지속(持續) 상세 설명")
                with st.expander("지속 설명 보기", expanded=False):
                    title = jisok_content.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    subtitle = jisok_content.get("subtitle", "")
                    if subtitle:
                        st.caption(subtitle)
                    contents = jisok_content.get("contents", "")
                    if contents:
                        st.write(contents.replace("\\n", "\n"))

        if joonghwa:
            joonghwa_content = get_joonghwa_content(joonghwa)
            if joonghwa_content:
                st.markdown("##### 📖 중화(中和) 상세 설명")
                with st.expander("중화 설명 보기", expanded=False):
                    title = joonghwa_content.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    subtitle = joonghwa_content.get("subtitle", "")
                    if subtitle:
                        st.caption(subtitle)
                    contents = joonghwa_content.get("contents", "")
                    if contents:
                        st.write(contents.replace("\\n", "\n"))

        if hwakjang:
            hwakjang_content = get_hwakjang_content(hwakjang)
            if hwakjang_content:
                st.markdown("##### 📖 확장(擴張) 상세 설명")
                with st.expander("확장 설명 보기", expanded=False):
                    title = hwakjang_content.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    subtitle = hwakjang_content.get("subtitle", "")
                    if subtitle:
                        st.caption(subtitle)
                    contents = hwakjang_content.get("contents", "")
                    if contents:
                        st.write(contents.replace("\\n", "\n"))

        # 신격 길흉 콘텐츠 (SPEC-CONTENT-002 Phase 2)
        gyouk_name = _calc_gyouk_from_result(result)
        if gyouk_name and shgj:
            # 길흉 판정 로직 (예시 - 실제 로직은 shgj 결과에 따름)
            is_gil = shgj.get("gilhung", "").startswith("길") if shgj.get("gilhung") else False
            shgj_gilhung = get_shgj_gilhung_content(gyouk_name, is_gil)
            if shgj_gilhung:
                st.markdown("---")
                st.markdown("##### 🔮 신격 길흉 해석")
                with st.expander("신격 길흉 상세 보기", expanded=False):
                    title = shgj_gilhung.get("title", "")
                    if title:
                        st.markdown(f"**{title}**")
                    contents_list = shgj_gilhung.get("contentsList", [])
                    if contents_list:
                        for item in contents_list:
                            subtitle = item.get("subtitle", "")
                            if subtitle:
                                st.markdown(f"**{subtitle}**")
                            contents = item.get("contents", "")
                            if contents:
                                st.write(contents.replace("\\n", "\n"))


def render_tab_interpret(result: dict[str, Any]) -> None:
    """Tab 5: AI 사주 해석."""
    st.subheader("AI 사주 해석")

    user_context = st.text_area(
        "추가 질문 (선택)",
        placeholder="예: 직업 운을 자세히 알고 싶어요.",
        height=80,
    )

    if st.button("AI 해석 받기", type="primary"):
        with st.spinner("AI가 사주를 해석하는 중입니다..."):
            try:
                payload = {
                    "saju_result": result,
                    "user_context": user_context if user_context.strip() else None,
                }
                response = requests.post(
                    f"{API_BASE_URL}/api/v1/saju/interpret",
                    json=payload,
                    timeout=60,
                )
                if response.status_code == 200:
                    data = response.json()
                    if data.get("is_fallback"):
                        st.warning(
                            "ANTHROPIC_API_KEY가 설정되지 않아 AI 해석을 제공할 수 없습니다. "
                            "환경 변수 ANTHROPIC_API_KEY를 설정해주세요."
                        )
                    else:
                        st.markdown(data.get("interpretation", ""))
                        st.caption(f"모델: {data.get('model', '')}")
                elif response.status_code == 502:
                    st.error("AI 서비스 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
                elif response.status_code == 504:
                    st.error("AI 응답 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.")
                else:
                    st.error(f"오류가 발생했습니다. (코드: {response.status_code})")
            except requests.Timeout:
                st.error("요청 시간이 초과되었습니다.")
            except requests.ConnectionError:
                st.error("API 서버에 연결할 수 없습니다.")


def main() -> None:
    """앱 진입점."""
    st.set_page_config(
        page_title="사주팔자 계산기",
        page_icon="🔮",
        layout="wide",
        initial_sidebar_state="expanded",
    )
    st.title("🔮 사주팔자 계산기")

    # 세션 상태 초기화
    if "saju_result" not in st.session_state:
        st.session_state["saju_result"] = None
    if "birth_year_cache" not in st.session_state:
        st.session_state["birth_year_cache"] = 1990

    payload = render_sidebar()

    if payload is not None:
        with st.spinner("계산 중..."):
            result = safe_api_call(payload)
        if result:
            st.session_state["saju_result"] = result
            st.session_state["birth_year_cache"] = payload["birth_year"]

    if st.session_state["saju_result"]:
        result = st.session_state["saju_result"]
        tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8 = st.tabs(
            [
                "📜 사주 원국",
                "⭐ 십성 분석",
                "🔄 운의 흐름",
                "📊 세부 지표",
                "🤖 AI 해석",
                "🌟 나의 정체성",
                "👥 관계 분석",
                "💡 경운 안내",
            ]
        )
        with tab1:
            render_tab_wonkuk(result)
        with tab2:
            render_tab_yuksin(result)
        with tab3:
            render_tab_luck(result, st.session_state.get("birth_year_cache", 1990))
        with tab4:
            render_tab_detail(result)
        with tab5:
            render_tab_interpret(result)
        with tab6:
            render_tab_identity(result)
        with tab7:
            render_tab_relationship(result)
        with tab8:
            render_tab_light_question(result)
    else:
        st.info("👈 왼쪽 사이드바에서 정보를 입력하고 '사주 계산' 버튼을 클릭하세요.")


if __name__ == "__main__":
    main()
