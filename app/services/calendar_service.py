from __future__ import annotations

from core.calendar import lunar_to_solar
from core.exceptions import SajuError


class CalendarService:
    """음양력 변환 서비스."""

    def convert_lunar_to_solar(
        self,
        year: int,
        month: int,
        day: int,
        is_leap_month: bool = False,
    ) -> tuple[int, int, int]:
        """음력 날짜를 양력으로 변환.

        Args:
            year: 음력 연도
            month: 음력 월 (1-12)
            day: 음력 일 (1-30)
            is_leap_month: 윤달 여부 (기본값 False)

        Returns:
            tuple[int, int, int]: (solar_year, solar_month, solar_day)

        Raises:
            ValueError: 유효하지 않은 음력 날짜
        """
        try:
            return lunar_to_solar(year, month, day, is_leap_month)
        except SajuError as e:
            raise ValueError(str(e)) from e
        except Exception as e:
            raise ValueError(f"음력 변환 실패: {e}") from e
