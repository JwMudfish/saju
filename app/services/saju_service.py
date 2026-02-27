from __future__ import annotations

from typing import Literal

from core.deun import calc_deun_full
from core.exceptions import SajuError
from core.models.request import SajuRequest
from core.models.response import SajuResult
from core.pillar import calc_four_pillars


class SajuService:
    """사주 계산 서비스 레이어."""

    def calculate(
        self,
        birth_year: int,
        birth_month: int,
        birth_day: int,
        birth_hour: int | None,
        is_lunar: bool,
        is_leap_month: bool,
        gender: Literal["male", "female"],
    ) -> SajuResult:
        """사주 계산 오케스트레이션.

        Args:
            birth_year: 출생 연도
            birth_month: 출생 월 (1-12)
            birth_day: 출생 일 (1-31)
            birth_hour: 출생 시 (0-23), None이면 시각 미상
            is_lunar: 음력 여부
            is_leap_month: 윤달 여부 (is_lunar=True일 때만 유효)
            gender: 성별 ("male" 또는 "female")

        Returns:
            SajuResult: 사주 계산 결과

        Raises:
            ValueError: 입력값이 유효하지 않거나 계산 실패 시
            RuntimeError: 예기치 않은 오류 발생 시
        """
        solar_year = birth_year
        solar_month = birth_month
        solar_day = birth_day

        # 음력 → 양력 변환
        if is_lunar:
            from core.calendar import lunar_to_solar

            try:
                solar_year, solar_month, solar_day = lunar_to_solar(
                    birth_year, birth_month, birth_day, is_leap_month
                )
            except SajuError as e:
                raise ValueError(str(e)) from e

        try:
            request = SajuRequest(
                year=solar_year,
                month=solar_month,
                day=solar_day,
                hour=birth_hour,
                gender=gender,
                is_lunar=False,
                is_leap_month=False,
            )

            # 사주 사기둥 계산
            pillars = calc_four_pillars(request)

            # 대운 계산
            deun_result = calc_deun_full(request)

            return SajuResult(
                year_pillar=pillars.year_pillar,
                month_pillar=pillars.month_pillar,
                day_pillar=pillars.day_pillar,
                hour_pillar=pillars.hour_pillar,
                deun=deun_result,
            )
        except SajuError as e:
            raise ValueError(str(e)) from e
        except ValueError:
            raise
        except Exception as e:
            raise RuntimeError(f"사주 계산 중 오류 발생: {e}") from e
