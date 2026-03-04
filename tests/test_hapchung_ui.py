"""hapchung UI 헬퍼 함수 테스트 (SPEC-UI-002).

streamlit_app.py의 순수 로직 부분을 테스트한다:
- _highlight_chung(): 충 관계 행에 배경색 적용
- HAPCHUNG_DESCRIPTIONS: 7가지 관계 유형 설명 상수
"""

from __future__ import annotations

import sys
from unittest.mock import MagicMock

import pandas as pd
import pytest

# streamlit과 requests는 UI 런타임이 없으므로 import 전에 모킹한다.
sys.modules.setdefault("streamlit", MagicMock())
sys.modules.setdefault("requests", MagicMock())

from streamlit_app import HAPCHUNG_DESCRIPTIONS, _highlight_chung  # noqa: E402


class TestHighlightChung:
    """_highlight_chung() 스타일 함수 테스트."""

    def test_chung_row_gets_red_background(self) -> None:
        """충 관계 행은 #ffe0e0 배경색을 받아야 한다."""
        row = pd.Series(
            {
                "기둥1": "년주",
                "지지1": "자",
                "기둥2": "월주",
                "지지2": "오",
                "관계": "충",
                "세부유형": "",
            }
        )
        result = _highlight_chung(row)
        assert all(style == "background-color: #ffe0e0" for style in result)

    def test_non_chung_row_gets_no_background(self) -> None:
        """충이 아닌 관계 행은 배경색을 받지 않아야 한다."""
        for relation in ["형", "해", "파", "육합", "삼합", "방합"]:
            row = pd.Series(
                {
                    "기둥1": "년주",
                    "지지1": "인",
                    "기둥2": "월주",
                    "지지2": "사",
                    "관계": relation,
                    "세부유형": "",
                }
            )
            result = _highlight_chung(row)
            assert all(style == "" for style in result), (
                f"Expected empty style for relation={relation}"
            )

    def test_result_length_matches_row_length(self) -> None:
        """반환된 스타일 리스트의 길이는 행의 열 수와 같아야 한다."""
        row = pd.Series(
            {
                "기둥1": "년주",
                "지지1": "자",
                "기둥2": "월주",
                "지지2": "오",
                "관계": "충",
                "세부유형": "",
            }
        )
        result = _highlight_chung(row)
        assert len(result) == len(row)

    def test_empty_relation_gets_no_background(self) -> None:
        """관계 값이 없는 행은 배경색을 받지 않아야 한다."""
        row = pd.Series(
            {
                "기둥1": "",
                "지지1": "",
                "기둥2": "",
                "지지2": "",
                "관계": "",
                "세부유형": "",
            }
        )
        result = _highlight_chung(row)
        assert all(style == "" for style in result)

    def test_non_chung_result_length_matches_row(self) -> None:
        """충이 아닌 관계 행의 반환 리스트 길이도 행 열 수와 같아야 한다."""
        row = pd.Series(
            {
                "기둥1": "년주",
                "지지1": "인",
                "기둥2": "월주",
                "지지2": "사",
                "관계": "형",
                "세부유형": "시세지형",
            }
        )
        result = _highlight_chung(row)
        assert len(result) == len(row)

    def test_chung_style_value_is_correct_css(self) -> None:
        """충 행의 스타일 값이 정확한 CSS 속성 문자열이어야 한다."""
        row = pd.Series(
            {
                "기둥1": "일주",
                "지지1": "자",
                "기둥2": "시주",
                "지지2": "오",
                "관계": "충",
                "세부유형": "",
            }
        )
        result = _highlight_chung(row)
        for style in result:
            assert style == "background-color: #ffe0e0"

    def test_returns_list_type(self) -> None:
        """반환값이 리스트 타입이어야 한다."""
        row = pd.Series(
            {
                "기둥1": "년주",
                "지지1": "자",
                "기둥2": "월주",
                "지지2": "오",
                "관계": "충",
                "세부유형": "",
            }
        )
        result = _highlight_chung(row)
        assert isinstance(result, list)

    def test_non_chung_returns_list_of_empty_strings(self) -> None:
        """충이 아닌 행의 반환값은 빈 문자열 리스트여야 한다."""
        row = pd.Series(
            {
                "기둥1": "년주",
                "지지1": "인",
                "기둥2": "월주",
                "지지2": "해",
                "관계": "파",
                "세부유형": "",
            }
        )
        result = _highlight_chung(row)
        assert isinstance(result, list)
        assert all(style == "" for style in result)

    @pytest.mark.parametrize(
        "num_cols",
        [1, 3, 6, 10],
    )
    def test_result_length_matches_any_row_width(self, num_cols: int) -> None:
        """행 열 수가 달라져도 반환 리스트 길이가 항상 일치해야 한다."""
        data = {f"col{i}": f"val{i}" for i in range(num_cols)}
        data["관계"] = "충"
        row = pd.Series(data)
        result = _highlight_chung(row)
        assert len(result) == num_cols + 1  # data cols + 관계


class TestHapchungDescriptions:
    """HAPCHUNG_DESCRIPTIONS 상수 테스트."""

    def test_all_seven_relations_present(self) -> None:
        """7가지 관계 유형이 모두 정의되어야 한다."""
        expected_relations = {"충", "형", "해", "파", "육합", "삼합", "방합"}
        assert set(HAPCHUNG_DESCRIPTIONS.keys()) == expected_relations

    def test_descriptions_are_non_empty(self) -> None:
        """각 관계 유형의 설명이 비어 있지 않아야 한다."""
        for relation, desc in HAPCHUNG_DESCRIPTIONS.items():
            assert desc, f"Description for '{relation}' should not be empty"
            assert len(desc) > 10, f"Description for '{relation}' is too short"

    def test_exactly_seven_keys(self) -> None:
        """정확히 7개의 키만 있어야 한다."""
        assert len(HAPCHUNG_DESCRIPTIONS) == 7

    def test_chung_description_mentions_conflict(self) -> None:
        """충(沖) 설명에 갈등/충돌 관련 내용이 있어야 한다."""
        desc = HAPCHUNG_DESCRIPTIONS["충"]
        assert "충" in desc or "沖" in desc or "충돌" in desc

    def test_all_values_are_strings(self) -> None:
        """모든 설명값이 문자열이어야 한다."""
        for relation, desc in HAPCHUNG_DESCRIPTIONS.items():
            assert isinstance(desc, str), f"Description for '{relation}' must be str"

    def test_chung_key_in_descriptions(self) -> None:
        """충 키가 존재해야 한다."""
        assert "충" in HAPCHUNG_DESCRIPTIONS

    def test_yukap_key_in_descriptions(self) -> None:
        """육합 키가 존재해야 한다."""
        assert "육합" in HAPCHUNG_DESCRIPTIONS

    def test_samhap_key_in_descriptions(self) -> None:
        """삼합 키가 존재해야 한다."""
        assert "삼합" in HAPCHUNG_DESCRIPTIONS

    def test_banghap_key_in_descriptions(self) -> None:
        """방합 키가 존재해야 한다."""
        assert "방합" in HAPCHUNG_DESCRIPTIONS
