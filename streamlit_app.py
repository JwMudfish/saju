"""사주팔자 계산 Streamlit 앱 - 5탭 대시보드."""

from __future__ import annotations

from typing import Any

import requests
import streamlit as st

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
        tab1, tab2, tab3, tab4, tab5 = st.tabs(
            ["📜 사주 원국", "⭐ 십성 분석", "🔄 운의 흐름", "📊 세부 지표", "🤖 AI 해석"]
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
    else:
        st.info("👈 왼쪽 사이드바에서 정보를 입력하고 '사주 계산' 버튼을 클릭하세요.")


if __name__ == "__main__":
    main()
