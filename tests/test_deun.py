"""Tests for deun (대운, Major Fortune) calculation module - RED phase."""
from __future__ import annotations

from datetime import datetime


class TestDeunBanghyang:
    """대운방향 계산 테스트."""

    def test_male_yang_year_is_sunhaeng(self) -> None:
        """남성 + 양년(갑) -> 순행."""
        from core.deun import calc_deun_banghyang
        assert calc_deun_banghyang(gender="male", year_gan="갑") == "순행"

    def test_male_yin_year_is_yokhaeng(self) -> None:
        """남성 + 음년(을) -> 역행."""
        from core.deun import calc_deun_banghyang
        assert calc_deun_banghyang(gender="male", year_gan="을") == "역행"

    def test_female_yang_year_is_yokhaeng(self) -> None:
        """여성 + 양년(갑) -> 역행."""
        from core.deun import calc_deun_banghyang
        assert calc_deun_banghyang(gender="female", year_gan="갑") == "역행"

    def test_female_yin_year_is_sunhaeng(self) -> None:
        """여성 + 음년(을) -> 순행."""
        from core.deun import calc_deun_banghyang
        assert calc_deun_banghyang(gender="female", year_gan="을") == "순행"

    def test_all_yang_gans_male_sunhaeng(self) -> None:
        """모든 양 천간 + 남성 = 순행."""
        from core.deun import calc_deun_banghyang
        yang_gans = ["갑", "병", "무", "경", "임"]
        for gan in yang_gans:
            assert calc_deun_banghyang("male", gan) == "순행", \
                f"calc_deun_banghyang('male', '{gan}') should be '순행'"

    def test_all_yin_gans_female_sunhaeng(self) -> None:
        """모든 음 천간 + 여성 = 순행."""
        from core.deun import calc_deun_banghyang
        yin_gans = ["을", "정", "기", "신", "계"]
        for gan in yin_gans:
            assert calc_deun_banghyang("female", gan) == "순행", \
                f"calc_deun_banghyang('female', '{gan}') should be '순행'"


class TestDeunSu:
    """대운수 계산 테스트."""

    def test_ac002_1984_male_deunsu(self) -> None:
        """AC-002: 1984-04-15 10:00 남성 대운수 = 7.

        순행: (다음 절입 - 출생) 분 / 4320 반올림
        다음 절입: 1984-05-05 16:50:57
        출생: 1984-04-15 10:00:00
        분 차이: 약 29211분
        29211 / 4320 = 6.76 -> 반올림 = 7
        """
        from core.deun import calc_deun_su
        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        assert calc_deun_su(birth_dt=birth_dt, banghyang="순행") == 7

    def test_deunsu_minimum_is_1(self) -> None:
        """대운수 최소값은 1."""
        from core.deun import calc_deun_su
        # 절입 직후 출생 -> 4320분(3일) 미만 -> 대운수 < 1 -> 1 반환
        # 1984-04-04 절입 직후 출생 가정
        birth_dt = datetime(1984, 4, 4, 23, 30, 0)  # 절입 이후 약 8분 후
        result = calc_deun_su(birth_dt=birth_dt, banghyang="순행")
        assert result >= 1


class TestDeunCalc:
    """대운 계산 테스트."""

    def test_ac002_1984_male_deun_list(self) -> None:
        """AC-002: 1984-04-15 10:00 남성 대운 10개.

        순행 대운 (manse_ori monthPillarLand.js 기준):
        월지: 1월=축, 2월=인, 3월=묘, 4월=진, 5월=사, 6월=오, ...
        - 기사 (7세), 경오 (17세), 신미 (27세), 임신 (37세), 계유 (47세)
        - 갑술 (57세), 을해 (67세), 병자 (77세), 정축 (87세), 무인 (97세)
        """
        from core.deun import calc_deun
        from core.models.domain import GanJi
        deuns = calc_deun(
            birth_month=4,
            birth_year=1984,
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_pillar_gan="무",
            banghyang="순행",
        )
        assert len(deuns) == 10
        # 첫 대운: 기사 (갑자년 5월 = 기사)
        assert deuns[0].ganji == GanJi(gan="기", ji="사")
        # 두 번째 대운: 경오 (갑자년 6월)
        assert deuns[1].ganji == GanJi(gan="경", ji="오")

    def test_deun_count_is_always_10(self) -> None:
        """대운은 항상 10개."""
        from core.deun import calc_deun
        deuns = calc_deun(
            birth_month=4,
            birth_year=1984,
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_pillar_gan="무",
            banghyang="순행",
        )
        assert len(deuns) == 10

    def test_deun_age_increases(self) -> None:
        """대운 나이는 10씩 증가."""
        from core.deun import calc_deun
        deuns = calc_deun(
            birth_month=4,
            birth_year=1984,
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_pillar_gan="무",
            banghyang="순행",
        )
        for i in range(1, len(deuns)):
            assert deuns[i].age == deuns[i-1].age + 10, \
                f"Age should increase by 10: {deuns[i-1].age} -> {deuns[i].age}"


class TestDeunCalcYokhaeng:
    """역행 대운 계산 테스트."""

    def test_female_yang_year_yokhaeng_deun(self) -> None:
        """여성 + 양년 = 역행 대운."""
        from core.deun import calc_deun
        from core.models.domain import GanJi
        # 1984-04-15 10:00 여성 (역행)
        # 현재 월주: 무진 (4월), 역행이므로 4월 이전: 3월 정묘, 2월 병인, ...
        deuns = calc_deun(
            birth_month=4,
            birth_year=1984,
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_pillar_gan="무",
            banghyang="역행",
        )
        assert len(deuns) == 10
        # 역행 첫 대운: 갑자년 3월 = 정묘
        assert deuns[0].ganji == GanJi(gan="정", ji="묘")

    def test_deun_yokhaeng_age_increases(self) -> None:
        """역행 대운 나이도 10씩 증가."""
        from core.deun import calc_deun
        deuns = calc_deun(
            birth_month=4,
            birth_year=1984,
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_pillar_gan="무",
            banghyang="역행",
        )
        for i in range(1, len(deuns)):
            assert deuns[i].age == deuns[i-1].age + 10


class TestCalcDeunFull:
    """calc_deun_full 통합 테스트."""

    def test_ac002_full_deun_info(self) -> None:
        """AC-002: 전체 대운 정보 계산.

        manse_ori 기준: 기사(7세)가 첫 대운
        """
        from core.deun import calc_deun_full
        from core.models.domain import GanJi
        from core.models.request import SajuRequest
        request = SajuRequest(year=1984, month=4, day=15, hour=10, gender="male")
        result = calc_deun_full(request)
        assert result.banghyang == "순행"
        assert result.deun_su == 7
        assert len(result.deun_list) == 10
        assert result.deun_list[0].ganji == GanJi(gan="기", ji="사")
        assert result.deun_list[0].age == 7
