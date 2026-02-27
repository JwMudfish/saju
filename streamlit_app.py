"""사주팔자 계산 Streamlit 앱."""

from __future__ import annotations

import streamlit as st
import requests

# 페이지 설정
st.set_page_config(
    page_title="사주팔자 계산기",
    page_icon="🔮",
    layout="centered",
    initial_sidebar_state="expanded",
)

# API 엔드포인트
API_BASE_URL = "http://localhost:8000"


def calculate_saju(
    birth_year: int,
    birth_month: int,
    birth_day: int,
    birth_hour: int | None,
    gender: str,
    is_lunar: bool,
    is_leap_month: bool,
) -> dict:
    """사주 계산 API 호출."""
    payload = {
        "birth_year": birth_year,
        "birth_month": birth_month,
        "birth_day": birth_day,
        "birth_hour": birth_hour,
        "gender": gender,
        "is_lunar": is_lunar,
        "is_leap_month": is_leap_month,
    }
    response = requests.post(f"{API_BASE_URL}/api/v1/saju", json=payload, timeout=10)
    response.raise_for_status()
    return response.json()


def convert_calendar(
    year: int,
    month: int,
    day: int,
    is_lunar: bool,
    is_leap_month: bool,
) -> dict:
    """음양력 변환 API 호출."""
    payload = {
        "year": year,
        "month": month,
        "day": day,
        "is_lunar": is_lunar,
        "is_leap_month": is_leap_month,
    }
    response = requests.post(f"{API_BASE_URL}/api/v1/calendar/convert", json=payload, timeout=10)
    response.raise_for_status()
    return response.json()


def main() -> None:
    """메인 앱."""
    st.title("🔮 사주팔자 계산기")
    st.markdown("---")

    # 사이드바: 입력 폼
    with st.sidebar:
        st.header("입력 정보")

        # 달력 타입
        calendar_type = st.radio("달력 타입", ["양력", "음력"])

        # 생년월일
        col1, col2, col3 = st.columns(3)
        with col1:
            year = st.number_input("년", min_value=1600, max_value=2100, value=1984, step=1)
        with col2:
            month = st.number_input("월", min_value=1, max_value=12, value=4, step=1)
        with col3:
            day = st.number_input("일", min_value=1, max_value=31, value=15, step=1)

        # 음력 윤달 여부
        is_lunar = calendar_type == "음력"
        is_leap_month = False
        if is_lunar:
            is_leap_month = st.checkbox("윤달")

        # 출생 시각
        birth_hour = st.slider(
            "출생 시각 (미상시 미선택)",
            min_value=0,
            max_value=23,
            value=12,
            step=1,
        )
        if not st.checkbox("시각 미상", value=False):
            birth_hour = None

        # 성별
        gender = st.radio("성별", ["남성", "남자", "여성", "여자"])
        if gender in ["남성", "남자"]:
            gender = "male"
        else:
            gender = "female"

        # 계산 버튼
        calculate = st.button("사주 계산", type="primary", use_container_width=True)

    # 메인 영역
    if calculate:
        try:
            with st.spinner("계산 중..."):
                result = calculate_saju(
                    birth_year=year,
                    birth_month=month,
                    birth_day=day,
                    birth_hour=birth_hour,
                    gender=gender,
                    is_lunar=is_lunar,
                    is_leap_month=is_leap_month,
                )

            # 결과 표시
            st.success("계산 완료!")
            st.markdown("---")

            # 4주 (사주팔자)
            st.header("📜 사주팔자 (四柱八字)")

            col1, col2 = st.columns(2)
            with col1:
                st.subheader("년주")
                st.write(f"**{result['year_pillar']['gan']}** {result['year_pillar']['ji']}")
            with col2:
                st.subheader("월주")
                st.write(f"**{result['month_pillar']['gan']}** {result['month_pillar']['ji']}")

            col3, col4 = st.columns(2)
            with col3:
                st.subheader("일주")
                st.write(f"**{result['day_pillar']['gan']}** {result['day_pillar']['ji']}")
            with col4:
                st.subheader("시주")
                if result["hour_pillar"]:
                    st.write(f"**{result['hour_pillar']['gan']}** {result['hour_pillar']['ji']}")
                else:
                    st.write("(미상)")

            st.markdown("---")

            # 대운
            st.header("🔄 대운 (大運)")
            st.caption(f"방향: {result['deun']['banghyang']}, 시작 나이: {result['deun']['deun_su']}세")

            deun_data = []
            for item in result["deun"]["deun_list"]:
                deun_data.append({
                    "나이": f"{item['age']}세",
                    "대운": f"{item['ganji']['gan']}{item['ganji']['ji']}",
                })

            st.dataframe(deun_data, use_container_width=True, hide_index=True)

        except requests.RequestException as e:
            st.error(f"API 오류: {e}")
        except Exception as e:
            st.error(f"오류 발생: {e}")

    else:
        # 초기 화면
        st.info("👈 왼쪽 사이드바에서 정보를 입력하고 '사주 계산' 버튼을 클릭하세요.")


if __name__ == "__main__":
    main()
