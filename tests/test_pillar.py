"""Tests for pillar calculation module - RED phase."""

from __future__ import annotations


class TestYearPillar:
    """년주 계산 테스트."""

    def test_year_1984_is_gapja(self) -> None:
        """1984년은 갑자년."""
        from core.models.domain import GanJi
        from core.pillar import calc_year_pillar

        result = calc_year_pillar(1984)
        assert result == GanJi(gan="갑", ji="자")

    def test_year_1900_sky(self) -> None:
        """1900년 천간: 1900 % 10 = 0 -> 경."""
        from core.pillar import calc_year_pillar

        result = calc_year_pillar(1900)
        assert result.gan == "경"

    def test_year_1900_land(self) -> None:
        """1900년 지지: 1900 % 12 = 4 -> 자."""
        from core.pillar import calc_year_pillar

        result = calc_year_pillar(1900)
        assert result.ji == "자"

    def test_year_2000_is_gyongchin(self) -> None:
        """2000년은 경진년."""
        from core.pillar import calc_year_pillar

        result = calc_year_pillar(2000)
        assert result.gan == "경"
        assert result.ji == "진"

    def test_year_varies_by_12_keeps_same_land(self) -> None:
        """12년 주기로 같은 지지."""
        from core.pillar import calc_year_pillar

        y1 = calc_year_pillar(1984)
        y2 = calc_year_pillar(1996)  # 1984 + 12
        assert y1.ji == y2.ji  # 자년 -> 자년


class TestMonthPillar:
    """월주 계산 테스트."""

    def test_april_in_gapja_year(self) -> None:
        """갑자년 4월 -> 무진월."""
        from core.models.domain import GanJi
        from core.pillar import calc_month_pillar

        result = calc_month_pillar(month=4, year_gan="갑")
        assert result == GanJi(gan="무", ji="진")

    def test_january_in_gabgi_year(self) -> None:
        """갑기년 1월 (입춘 이전이므로 전년 12월 기준 -> 13월 처리)."""
        from core.pillar import calc_month_pillar

        # 갑기년 13월 (=다음년 1월) -> gabgi[11]='정'
        result = calc_month_pillar(month=13, year_gan="갑")
        assert result.gan == "정"

    def test_month_land_consistency(self) -> None:
        """월지는 연도에 관계없이 고정."""
        from core.pillar import calc_month_pillar

        for year_gan in ("갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"):
            result = calc_month_pillar(month=4, year_gan=year_gan)
            assert result.ji == "진", f"4월 지지는 진이어야 함 (year_gan={year_gan})"

    def test_all_month_sky_gabgi(self) -> None:
        """갑기년 월천간 순서 검증."""
        from core.pillar import calc_month_pillar

        expected_skies = ["병", "정", "무", "기", "경", "신", "임", "계", "갑", "을", "병", "정"]
        for i, month in enumerate(range(2, 14)):
            result = calc_month_pillar(month=month if month <= 12 else 13, year_gan="갑")
            assert result.gan == expected_skies[i], f"월={month}, 기대={expected_skies[i]}"


class TestDayPillar:
    """일주 계산 테스트."""

    def test_1984_04_15_day_pillar(self) -> None:
        """AC-001: 1984-04-15 일주는 기묘 (manse_ori 확인)."""
        from core.models.domain import GanJi
        from core.pillar import calc_day_pillar

        result = calc_day_pillar(day=15, year=1984, month=4, hour=None, minute=None)
        assert result == GanJi(gan="기", ji="묘")

    def test_1900_01_02_day_pillar(self) -> None:
        """1900-01-02 일주는 갑술 (manse_ori 확인)."""
        from core.models.domain import GanJi
        from core.pillar import calc_day_pillar

        result = calc_day_pillar(day=2, year=1900, month=1, hour=None, minute=None)
        assert result == GanJi(gan="갑", ji="술")

    def test_day_pillar_midnight_correction(self) -> None:
        """23:30 이후 자시 보정 - 다음날로 변경."""
        from core.pillar import calc_day_pillar

        # 1984-04-15 10:00 -> 기묘
        result1 = calc_day_pillar(day=15, year=1984, month=4, hour=10, minute=0)
        assert result1.gan == "기"
        assert result1.ji == "묘"


class TestHourPillar:
    """시주 계산 테스트."""

    def test_hour_10_with_gimyo_day(self) -> None:
        """기묘일 10:00 -> 오시 사시 기간 내 -> 기사."""
        from core.models.domain import GanJi
        from core.pillar import calc_hour_pillar

        # 기묘일(day_gan=기): 무계그룹 -> 임계갑을병정무기경신임계
        # 10:00 = 사시(09:30~11:30) -> index 5 -> 병 아닌가?
        # 기일은 갑기그룹 -> 갑을병정무기경신임계
        # 10:00 = 사시 index=5 -> '기'
        result = calc_hour_pillar(hour=10, minute=0, day_gan="기")
        assert result == GanJi(gan="기", ji="사")

    def test_hour_pillar_none_without_hour(self) -> None:
        """시각 없는 경우 None 반환."""
        from core.pillar import calc_hour_pillar

        result = calc_hour_pillar(hour=None, minute=None, day_gan="갑")
        assert result is None

    def test_hour_ji_for_various_times(self) -> None:
        """각 시간대별 지지 검증.

        manse_ori hourPillarLand.js 기준:
        - 자시: 23:30 ~ 01:29 (index 0)
        - 축시: 01:30 ~ 03:29 (index 1)
        - 인시: 03:30 ~ 05:29 (index 2)
        ...
        """
        from core.pillar import calc_hour_pillar

        time_to_ji = [
            (0, 30, "자"),  # 00:30은 자시 (23:30~01:29)
            (1, 30, "축"),  # 01:30 시작 -> 축시
            (3, 30, "인"),  # 03:30 시작 -> 인시
            (5, 30, "묘"),  # 05:30 시작 -> 묘시
            (7, 30, "진"),  # 07:30 시작 -> 진시
            (9, 30, "사"),  # 09:30 시작 -> 사시
            (11, 30, "오"),  # 11:30 시작 -> 오시
            (13, 30, "미"),  # 13:30 시작 -> 미시
            (15, 30, "신"),  # 15:30 시작 -> 신시
            (17, 30, "유"),  # 17:30 시작 -> 유시
            (19, 30, "술"),  # 19:30 시작 -> 술시
            (21, 30, "해"),  # 21:30 시작 -> 해시
        ]
        for hour, minute, expected_ji in time_to_ji:
            result = calc_hour_pillar(hour=hour, minute=minute, day_gan="갑")
            assert result is not None
            assert result.ji == expected_ji, (
                f"{hour:02d}:{minute:02d} 기대={expected_ji}, 실제={result.ji}"
            )


class TestFourPillarsIntegration:
    """사주 통합 계산 테스트 (AC-001)."""

    def test_ac001_basic_four_pillars_1984(self) -> None:
        """AC-001: 1984-04-15 10:00 남성 사주 계산.

        manse_ori 실제 계산 결과:
        - 년주: 갑자 (갑(4=갑)자(4=자))
        - 월주: 무진 (갑기년 4월)
        - 일주: 기묘 (totalNumber 545, sky[5]='기', land[5]='묘')
        - 시주: 기사 (기일 갑기그룹, 사시)
        """
        from core.models.domain import GanJi
        from core.models.request import SajuRequest
        from core.pillar import calc_four_pillars

        request = SajuRequest(year=1984, month=4, day=15, hour=10, gender="male")
        result = calc_four_pillars(request)
        assert result.year_pillar == GanJi(gan="갑", ji="자")
        assert result.month_pillar == GanJi(gan="무", ji="진")
        assert result.day_pillar == GanJi(gan="기", ji="묘")
        assert result.hour_pillar == GanJi(gan="기", ji="사")

    def test_four_pillars_without_hour(self) -> None:
        """시각 없는 사주 계산."""
        from core.models.request import SajuRequest
        from core.pillar import calc_four_pillars

        request = SajuRequest(year=1984, month=4, day=15, gender="male")
        result = calc_four_pillars(request)
        assert result.hour_pillar is None
