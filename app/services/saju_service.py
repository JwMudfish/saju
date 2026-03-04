from __future__ import annotations

from datetime import datetime
from typing import Literal

from core.deun import calc_deun_full, calc_sewun
from core.exceptions import SajuError
from core.hapchung import calc_pillar_hapchung
from core.jijanggan import get_jijanggan
from core.models.domain import (
    HapchungRelation,
    HiddenStems,
    OHangRatio,
    PillarMeaning,
    ShinsalItem,
    SibiUnsungItem,
    YuksinItem,
)
from core.models.request import SajuRequest
from core.models.response import FourPillars, SajuResult
from core.ohang import get_gan_ohang, get_ji_ohang
from core.pillar import calc_four_pillars
from core.shinsal import calc_shinsal
from core.sibiunsung import calc_all_sibiunsung
from core.yongshin import calc_yongshin
from core.yuksin import calc_yuksin

# 기둥별 상징 의미 고정 매핑
_PILLAR_MEANINGS: list[PillarMeaning] = [
    PillarMeaning(pillar="year", label="년주", meaning="조상/어린 시절"),
    PillarMeaning(pillar="month", label="월주", meaning="부모/청년기"),
    PillarMeaning(pillar="day", label="일주", meaning="자신/배우자"),
    PillarMeaning(pillar="hour", label="시주", meaning="자녀/노년기"),
]


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

            # 용신(당령) 계산 - 실패 시 None 반환하여 메인 계산 보호
            hour_for_dt = birth_hour if birth_hour is not None else 12
            birth_dt = datetime(solar_year, solar_month, solar_day, hour_for_dt, 0)
            try:
                yongshin_result = calc_yongshin(
                    birth_dt=birth_dt,
                    month_ji=pillars.month_pillar.ji,
                    month=solar_month,
                    year=solar_year,
                )
            except Exception:
                yongshin_result = None

            # 대운 계산
            deun_result = calc_deun_full(request)

            # 추가 계산 필드 조립
            jijanggan = self._calc_jijanggan(pillars)
            yuksin_list = self._calc_yuksin_list(pillars)
            ohang_ratio = self._calc_ohang_ratio(pillars)
            sibiunsung = self._calc_sibiunsung(pillars)
            shinsal = self._calc_shinsal(pillars)
            sewun = calc_sewun(datetime.now().year)
            pillar_meanings = self._calc_pillar_meanings(pillars)
            hapchung = self._calc_hapchung(pillars)

            return SajuResult(
                year_pillar=pillars.year_pillar,
                month_pillar=pillars.month_pillar,
                day_pillar=pillars.day_pillar,
                hour_pillar=pillars.hour_pillar,
                deun=deun_result,
                jijanggan=jijanggan,
                yuksin_list=yuksin_list,
                ohang_ratio=ohang_ratio,
                sibiunsung=sibiunsung,
                shinsal=shinsal,
                sewun=sewun,
                pillar_meanings=pillar_meanings,
                hapchung=hapchung,
                yongshin=yongshin_result,
            )
        except SajuError as e:
            raise ValueError(str(e)) from e
        except ValueError:
            raise
        except Exception as e:
            raise RuntimeError(f"사주 계산 중 오류 발생: {e}") from e

    def _calc_jijanggan(self, pillars: FourPillars) -> dict[str, HiddenStems]:
        """4기둥의 지장간을 기둥명 키 딕셔너리로 조립한다."""
        result: dict[str, HiddenStems] = {
            "year": get_jijanggan(pillars.year_pillar.ji),
            "month": get_jijanggan(pillars.month_pillar.ji),
            "day": get_jijanggan(pillars.day_pillar.ji),
        }
        if pillars.hour_pillar is not None:
            result["hour"] = get_jijanggan(pillars.hour_pillar.ji)
        return result

    def _calc_yuksin_list(self, pillars: FourPillars) -> list[YuksinItem]:
        """일간 기준 7개 천간(일간 제외) + 4개 지지 정기의 육신을 조립한다."""
        day_gan = pillars.day_pillar.gan

        # 천간 육신: 년간, 월간, 시간 (일간 자신 제외)
        gan_targets: list[tuple[str, str]] = [
            ("년간", pillars.year_pillar.gan),
            ("월간", pillars.month_pillar.gan),
        ]
        if pillars.hour_pillar is not None:
            gan_targets.append(("시간", pillars.hour_pillar.gan))

        # 지지 정기(지장간 main) 육신
        ji_targets: list[tuple[str, str]] = [
            ("년지", pillars.year_pillar.ji),
            ("월지", pillars.month_pillar.ji),
            ("일지", pillars.day_pillar.ji),
        ]
        if pillars.hour_pillar is not None:
            ji_targets.append(("시지", pillars.hour_pillar.ji))

        result: list[YuksinItem] = []
        for label, gan in gan_targets:
            result.append(YuksinItem(target=label, yuksin=calc_yuksin(day_gan, gan)))
        for label, ji in ji_targets:
            main_gan = get_jijanggan(ji).main
            result.append(YuksinItem(target=label, yuksin=calc_yuksin(day_gan, main_gan)))

        return result

    def _calc_ohang_ratio(self, pillars: FourPillars) -> OHangRatio:
        """8글자(4천간+4지지)의 오행 비율을 계산한다."""
        counts: dict[str, int] = {"목": 0, "화": 0, "토": 0, "금": 0, "수": 0}

        # 4개 천간
        for gan in [
            pillars.year_pillar.gan,
            pillars.month_pillar.gan,
            pillars.day_pillar.gan,
        ]:
            counts[get_gan_ohang(gan)] += 1

        if pillars.hour_pillar is not None:
            counts[get_gan_ohang(pillars.hour_pillar.gan)] += 1

        # 4개 지지
        for ji in [
            pillars.year_pillar.ji,
            pillars.month_pillar.ji,
            pillars.day_pillar.ji,
        ]:
            counts[get_ji_ohang(ji)] += 1

        if pillars.hour_pillar is not None:
            counts[get_ji_ohang(pillars.hour_pillar.ji)] += 1

        total = sum(counts.values())
        ratio = {k: round(v / total * 100, 2) for k, v in counts.items()}

        # 부동소수점 오차 보정: 합이 정확히 100이 되도록 최대 항목 조정
        diff = round(100.0 - sum(ratio.values()), 2)
        if diff != 0:
            max_key = max(ratio, key=lambda k: ratio[k])
            ratio[max_key] = round(ratio[max_key] + diff, 2)

        return OHangRatio(
            mok=ratio["목"],
            hwa=ratio["화"],
            to=ratio["토"],
            geum=ratio["금"],
            su=ratio["수"],
        )

    def _calc_sibiunsung(self, pillars: FourPillars) -> list[SibiUnsungItem]:
        """4기둥의 십이운성을 조립한다."""
        day_gan = pillars.day_pillar.gan
        hour_ji = pillars.hour_pillar.ji if pillars.hour_pillar is not None else None
        return calc_all_sibiunsung(
            day_gan=day_gan,
            year_ji=pillars.year_pillar.ji,
            month_ji=pillars.month_pillar.ji,
            day_ji=pillars.day_pillar.ji,
            hour_ji=hour_ji,
        )

    def _calc_shinsal(self, pillars: FourPillars) -> list[ShinsalItem]:
        """신살을 조립한다."""
        year_ji = pillars.year_pillar.ji
        day_gan = pillars.day_pillar.gan
        day_ji = pillars.day_pillar.ji

        pillars_ji: list[str] = [
            pillars.year_pillar.ji,
            pillars.month_pillar.ji,
            pillars.day_pillar.ji,
        ]
        if pillars.hour_pillar is not None:
            pillars_ji.append(pillars.hour_pillar.ji)

        return calc_shinsal(year_ji=year_ji, day_gan=day_gan, day_ji=day_ji, pillars_ji=pillars_ji)

    def _calc_pillar_meanings(self, pillars: FourPillars) -> list[PillarMeaning]:
        """기둥별 상징 의미를 조립한다 (시주는 시간 정보가 있을 때만 포함)."""
        if pillars.hour_pillar is not None:
            return list(_PILLAR_MEANINGS)
        return [m for m in _PILLAR_MEANINGS if m.pillar != "hour"]

    def _calc_hapchung(self, pillars: FourPillars) -> list[HapchungRelation]:
        """사기둥 지지 간 합충형해파 관계를 계산한다."""
        pillar_list: list[tuple[str, str]] = [
            ("year", pillars.year_pillar.ji),
            ("month", pillars.month_pillar.ji),
            ("day", pillars.day_pillar.ji),
        ]
        if pillars.hour_pillar is not None:
            pillar_list.append(("hour", pillars.hour_pillar.ji))
        return calc_pillar_hapchung(pillar_list)
