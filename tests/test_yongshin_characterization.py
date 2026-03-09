"""Characterization tests for Yongshin 영격령 detailed metrics - PRESERVE phase.

These tests capture the CURRENT behavior of the new fields (all None) before
we implement actual calculation logic. This ensures behavior preservation.

After implementation, these tests will be updated to expect actual values.
"""

from __future__ import annotations

from datetime import datetime


class TestYeonggeungryeongDetailedMetricsCharacterization:
    """영격령 세부지표 characterization tests - MVP phase (all None).

    These tests document that the new fields currently return None.
    When actual calculation logic is implemented, these tests will be updated.
    """

    def test_calc_yongshin_returns_all_none_metrics(self) -> None:
        """calc_yongshin 현재 구현은 모든 영격령 세부지표를 None로 반환.

        This is a characterization test capturing CURRENT behavior (MVP).
        The fields exist but return None until calculation logic is implemented.
        """
        from core.yongshin import calc_yongshin

        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = calc_yongshin(birth_dt=birth_dt, month_ji="진", month=4, year=1984)

        # Existing fields should work
        assert result.dang_ryeong == "을"
        assert result.heuisin == "병"

        # New fields return None (MVP behavior)
        assert result.saryeong is None, "saryeong should be None in MVP"
        assert result.junghwa is None, "junghwa should be None in MVP"
        assert result.jisok is None, "jisok should be None in MVP"
        assert result.hwakjang is None, "hwakjang should be None in MVP"

    def test_calc_yongshin_has_new_fields(self) -> None:
        """YongshinResult는 영격령 세부지표 필드를 가져야 한다."""
        from core.yongshin import calc_yongshin

        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = calc_yongshin(birth_dt=birth_dt, month_ji="진", month=4, year=1984)

        # Verify all new fields exist (even if None)
        assert hasattr(result, "saryeong")
        assert hasattr(result, "junghwa")
        assert hasattr(result, "jisok")
        assert hasattr(result, "hwakjang")

    def test_backward_compatibility_existing_behavior(self) -> None:
        """기존 동작(dang_ryeong, heuisin)은 변하지 않아야 한다.

        Characterization test ensuring existing behavior is preserved.
        """
        from core.yongshin import calc_yongshin

        # Test multiple scenarios to ensure behavior preservation
        test_cases = [
            # (birth_dt, month_ji, month, year, expected_dang, expected_heui)
            (datetime(1984, 4, 15, 10, 0, 0), "진", 4, 1984, "을", "병"),
            (datetime(1984, 4, 25, 10, 0, 0), "진", 4, 1984, "을", "병"),
            (datetime(1984, 1, 15, 10, 0, 0), "인", 1, 1984, "갑", "계"),
            (datetime(1984, 12, 15, 10, 0, 0), "자", 12, 1984, "임", "신"),
        ]

        for birth_dt, month_ji, month, year, expected_dang, expected_heui in test_cases:
            result = calc_yongshin(
                birth_dt=birth_dt,
                month_ji=month_ji,
                month=month,
                year=year
            )

            # Existing behavior preserved
            assert result.dang_ryeong == expected_dang, (
                f"dang_ryeong should be {expected_dang} for {month_ji} month"
            )
            assert result.heuisin == expected_heui, (
                f"heuisin should be {expected_heui} for dang_ryeong={expected_dang}"
            )

            # New fields are None (MVP)
            assert result.saryeong is None
            assert result.junghwa is None
            assert result.jisok is None
            assert result.hwakjang is None
