"""Integration tests for the saju calculation engine.

Covers SPEC-CORE-001 acceptance criteria (AC-001 through AC-007) and
additional reference cases from manse_ori.
"""
from datetime import datetime


class TestAC001BasicFourPillars:
    """AC-001: 기본 4주 계산 - 갑자년 남성.

    Given 생년월일시: 1984년 4월 15일 10시, 남성, 양력
    Then  year_pillar == GanJi(gan="갑", ji="자")
    And   month_pillar == GanJi(gan="무", ji="진")
    And   day_pillar == GanJi(gan="기", ji="묘")
    And   hour_pillar == GanJi(gan="기", ji="사")

    Note: SPEC acceptance.md had incorrect expected values (병진/경술/무오).
    Correct values verified against manse_ori JS logic:
    - 월주: 갑년 4월 -> 갑기 그룹, idx_month=4, sky_idx=2 -> 무(戊) -> 무진
    - 일주: totalNumber 기반 계산 -> 기묘
    - 시주: 기일간 10시00분 -> 사시(09:30-11:29 idx=5) -> 기사
    """

    def test_four_pillars_1984_male(self) -> None:
        """1984-04-15 10:00 남성 4주 계산."""
        from core.models.domain import GanJi
        from core.models.request import SajuRequest
        from core.pillar import calc_four_pillars

        request = SajuRequest(year=1984, month=4, day=15, hour=10, gender="male")
        result = calc_four_pillars(request)

        assert result.year_pillar == GanJi(gan="갑", ji="자")
        assert result.month_pillar == GanJi(gan="무", ji="진")  # 갑년 4월 -> 무진
        assert result.day_pillar == GanJi(gan="기", ji="묘")
        assert result.hour_pillar == GanJi(gan="기", ji="사")

    def test_four_pillars_year_1984(self) -> None:
        """1984년 = 갑자년 (인덱스 0)."""
        from core.models.domain import GanJi
        from core.pillar import calc_year_pillar

        result = calc_year_pillar(1984)
        assert result == GanJi(gan="갑", ji="자")

    def test_four_pillars_month_4_1984(self) -> None:
        """1984년 4월 (갑자년) = 무진월 (갑기 그룹)."""
        from core.models.domain import GanJi
        from core.pillar import calc_month_pillar

        result = calc_month_pillar(month=4, year_gan="갑")
        assert result == GanJi(gan="무", ji="진")

    def test_four_pillars_day_1984_04_15(self) -> None:
        """1984-04-15 10:00 일주 = 기묘."""
        from core.models.domain import GanJi
        from core.pillar import calc_day_pillar

        result = calc_day_pillar(day=15, year=1984, month=4, hour=10, minute=0)
        assert result == GanJi(gan="기", ji="묘")

    def test_four_pillars_hour_10_day_gan_gi(self) -> None:
        """기일간 + 10시 = 기사시 (09:30-11:29 = 사시, 갑기 그룹)."""
        from core.models.domain import GanJi
        from core.pillar import calc_hour_pillar

        result = calc_hour_pillar(hour=10, minute=0, day_gan="기")
        assert result == GanJi(gan="기", ji="사")


class TestAC002LunarInput:
    """AC-002: 음력 입력 처리.

    음력 1990년 1월 1일 = 양력 1990년 1월 27일
    음력 변환 후 4주 계산 수행.
    """

    def test_lunar_to_solar_1990_jan(self) -> None:
        """음력 1990-01-01 -> 양력 1990-01-27."""
        from core.calendar import lunar_to_solar

        solar_year, solar_month, solar_day = lunar_to_solar(1990, 1, 1, False)
        assert solar_year == 1990
        assert solar_month == 1
        assert solar_day == 27

    def test_lunar_round_trip_1990_jan(self) -> None:
        """양력 1990-01-27 -> 음력 1990-01-01 (왕복)."""
        from core.calendar import solar_to_lunar

        lunar_year, lunar_month, lunar_day, is_leap = solar_to_lunar(1990, 1, 27)
        assert lunar_year == 1990
        assert lunar_month == 1
        assert lunar_day == 1
        assert is_leap is False

    def test_no_hour_pillar_when_none(self) -> None:
        """시각 미입력 시 시주 = None."""
        from core.models.request import SajuRequest
        from core.pillar import calc_four_pillars

        request = SajuRequest(year=1990, month=1, day=27, hour=None, gender="male")
        result = calc_four_pillars(request)
        assert result.hour_pillar is None


class TestAC003SolarTermBoundary:
    """AC-003: 절입 시각 기준 월주 결정.

    절입 직전: 이전 달 월주
    절입 직후: 현재 달 월주
    """

    def test_birth_before_solar_term_uses_previous_month(self) -> None:
        """절입 직전 출생 -> 이전 달 월주."""
        from core.solar_term import determine_month_for_pillar

        # 1984-04-04 절입(청명) 23:22:20 이전 출생
        birth_dt = datetime(1984, 4, 4, 23, 0, 0)  # 절입 22분 전
        month, year = determine_month_for_pillar(birth_dt)
        # 청명(4월 절입) 이전 -> 이전달인 3월로 처리
        assert month == 3
        assert year == 1984

    def test_birth_after_solar_term_uses_current_month(self) -> None:
        """절입 직후 출생 -> 현재 달 월주."""
        from core.solar_term import determine_month_for_pillar

        # 1984-04-04 절입(청명) 23:22:20 이후 출생
        birth_dt = datetime(1984, 4, 4, 23, 30, 0)  # 절입 7분 후
        month, year = determine_month_for_pillar(birth_dt)
        # 청명 이후 -> 4월로 처리
        assert month == 4
        assert year == 1984

    def test_jan_birth_uses_prev_year_dec(self) -> None:
        """1월생은 전년 12월로 처리."""
        from core.solar_term import determine_month_for_pillar

        birth_dt = datetime(1984, 1, 15, 10, 0, 0)
        month, year = determine_month_for_pillar(birth_dt)
        assert month == 12
        assert year == 1983


class TestAC004HiddenStems:
    """AC-004: 지장간 추출 - 12지지 전체."""

    def test_hidden_stems_ja(self) -> None:
        """자(子) 지장간: 임-None-계."""
        from core.jijanggan import get_jijanggan
        from core.models.domain import HiddenStems

        result = get_jijanggan("자")
        assert result == HiddenStems(initial="임", middle=None, main="계")

    def test_hidden_stems_chuk(self) -> None:
        """축(丑) 지장간: 계-신-기."""
        from core.jijanggan import get_jijanggan
        from core.models.domain import HiddenStems

        result = get_jijanggan("축")
        assert result == HiddenStems(initial="계", middle="신", main="기")

    def test_hidden_stems_o(self) -> None:
        """오(午) 지장간: 병-기-정. (manse_ori 기준)"""
        from core.jijanggan import get_jijanggan
        from core.models.domain import HiddenStems

        result = get_jijanggan("오")
        assert result == HiddenStems(initial="병", middle="기", main="정")

    def test_hidden_stems_all_12_ji(self) -> None:
        """12지지 전체 지장간 매핑 테스트."""
        from core.jijanggan import get_jijanggan

        for ji in ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"]:
            result = get_jijanggan(ji)
            assert result is not None
            assert result.initial is not None
            assert result.main is not None


class TestAC005Yuksin:
    """AC-005: 육신 계산.

    일간 기준 나머지 천간과의 육신 관계 계산.
    """

    def test_yuksin_byeong_vs_im_is_pyeonggwan(self) -> None:
        """병 vs 임 -> 편관 (水克火, 동성)."""
        from core.yuksin import calc_yuksin

        assert calc_yuksin("병", "임") == "편관"

    def test_yuksin_byeong_vs_gye_is_jeonggwan(self) -> None:
        """병 vs 계 -> 정관 (水克火, 이성)."""
        from core.yuksin import calc_yuksin

        assert calc_yuksin("병", "계") == "정관"

    def test_yuksin_gab_vs_gab_is_bigyeon(self) -> None:
        """갑 vs 갑 -> 비견 (동오행, 동성)."""
        from core.yuksin import calc_yuksin

        assert calc_yuksin("갑", "갑") == "비견"

    def test_yuksin_all_10_combinations_for_gab(self) -> None:
        """갑 일간 10천간 전체 육신 계산."""
        from core.yuksin import calc_yuksin

        expected = {
            "갑": "비견", "을": "겁재",  # 비겁 (木)
            "병": "식신", "정": "상관",  # 식상 (火 - 木生火)
            "무": "편재", "기": "정재",  # 재성 (土 - 木克土)
            "경": "편관", "신": "정관",  # 관성 (金 - 金克木)
            "임": "편인", "계": "정인",  # 인성 (水 - 水生木)
        }
        for target, yuksin in expected.items():
            result = calc_yuksin("갑", target)
            assert result == yuksin, f"calc_yuksin('갑', '{target}') = '{result}', expected '{yuksin}'"


class TestAC006HapChung:
    """AC-006: 합충 분석 - 삼합/육합/충."""

    def test_samhap_sin_ja_jin_water(self) -> None:
        """申子辰 삼합 = 수국."""
        from core.hapchung import is_samhap

        assert is_samhap("신", "자") is True
        assert is_samhap("자", "진") is True
        assert is_samhap("신", "진") is True

    def test_samhap_in_o_sul_fire(self) -> None:
        """寅午戌 삼합 = 화국."""
        from core.hapchung import is_samhap

        assert is_samhap("인", "오") is True
        assert is_samhap("오", "술") is True
        assert is_samhap("인", "술") is True

    def test_no_samhap_for_unrelated_jis(self) -> None:
        """無관계 지지 -> 삼합 아님."""
        from core.hapchung import is_samhap

        assert is_samhap("자", "묘") is False

    def test_chung_ja_o(self) -> None:
        """子午 충."""
        from core.hapchung import is_chung

        assert is_chung("자", "오") is True
        assert is_chung("오", "자") is True

    def test_chung_in_sin(self) -> None:
        """寅申 충."""
        from core.hapchung import is_chung

        assert is_chung("인", "신") is True

    def test_yukhap_ja_chuk(self) -> None:
        """子丑 육합."""
        from core.hapchung import is_yukhap

        assert is_yukhap("자", "축") is True

    def test_hapchung_priority_chung_over_yukhap(self) -> None:
        """충이 육합보다 우선순위."""
        from core.hapchung import hapchung_relation

        # 자오 충
        result = hapchung_relation("자", "오")
        assert result == "충"


class TestAC007DeunCalculation:
    """AC-007: 대운 계산 (순행/역행)."""

    def test_deun_direction_gab_male_is_sunhaeng(self) -> None:
        """갑년 남성 = 순행."""
        from core.deun import calc_deun_banghyang

        assert calc_deun_banghyang("male", "갑") == "순행"

    def test_deun_direction_gab_female_is_yokhaeng(self) -> None:
        """갑년 여성 = 역행."""
        from core.deun import calc_deun_banghyang

        assert calc_deun_banghyang("female", "갑") == "역행"

    def test_deun_su_1984_male(self) -> None:
        """1984-04-15 남성 대운수 = 7."""
        from core.deun import calc_deun_su

        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = calc_deun_su(birth_dt=birth_dt, banghyang="순행")
        assert result == 7

    def test_deun_list_1984_male_first_is_gisa(self) -> None:
        """1984 남성 첫 대운 = 기사."""
        from core.deun import calc_deun
        from core.models.domain import GanJi

        deuns = calc_deun(
            birth_month=4,
            birth_year=1984,
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_pillar_gan="무",
            banghyang="순행",
        )
        assert deuns[0].ganji == GanJi(gan="기", ji="사")
        assert deuns[0].age == 7

    def test_deun_list_count_is_10(self) -> None:
        """대운 목록은 항상 10개."""
        from core.deun import calc_deun

        deuns = calc_deun(
            birth_month=4,
            birth_year=1984,
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_pillar_gan="무",
            banghyang="순행",
        )
        assert len(deuns) == 10

    def test_deun_full_1984_male(self) -> None:
        """calc_deun_full 통합: 순행 7세 기사."""
        from core.deun import calc_deun_full
        from core.models.domain import GanJi
        from core.models.request import SajuRequest

        request = SajuRequest(year=1984, month=4, day=15, hour=10, gender="male")
        result = calc_deun_full(request)
        assert result.banghyang == "순행"
        assert result.deun_su == 7
        assert result.deun_list[0].ganji == GanJi(gan="기", ji="사")
        assert result.deun_list[0].age == 7


class TestYongshinIntegration:
    """용신 통합 테스트."""

    def test_yongshin_1984_04_15(self) -> None:
        """1984-04-15 진월 중기 이전 -> 당령 을, 희신 병."""
        from core.yongshin import calc_yongshin

        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = calc_yongshin(birth_dt=birth_dt, month_ji="진", month=4, year=1984)
        # 4월 중기(곡우) = 1984-04-20 06:38:05
        # 출생 1984-04-15 -> 중기 이전 -> smallJunggi(진) = 을
        assert result.dang_ryeong == "을"
        assert result.heuisin == "병"

    def test_yongshin_after_junggi(self) -> None:
        """중기 이후 출생 -> bigJunggi 당령."""
        from core.yongshin import calc_yongshin

        # 1984-04-25 -> 4월 중기(곡우 04-20) 이후
        birth_dt = datetime(1984, 4, 25, 10, 0, 0)
        result = calc_yongshin(birth_dt=birth_dt, month_ji="진", month=4, year=1984)
        # bigJunggi(진) = 을 (same as small for 진)
        assert result.dang_ryeong == "을"

    def test_yongshin_o_month_after_junggi(self) -> None:
        """오월 중기 이후 -> 당령 정."""
        from core.yongshin import calc_dang_ryeong

        result = calc_dang_ryeong(month_ji="오", is_before_junggi=False)
        assert result == "정"


class TestFullPipelineIntegration:
    """전체 파이프라인 통합 테스트."""

    def test_1984_04_15_all_modules(self) -> None:
        """1984-04-15 전체 모듈 파이프라인 검증.

        실제 계산값 (manse_ori 기준):
        - 년주: 갑자, 월주: 무진, 일주: 기묘, 시주: 기사
        - 월지 진(辰) 지장간: 을-계-무
        - 육신 (일간 기 기준 년간 갑): 기(土) vs 갑(木) -> 木克土 정관
        - 대운: 순행 7세 기사
        - 용신: 월지 진 중기 이전 -> 당령 을
        """
        from core.deun import calc_deun_full
        from core.jijanggan import get_jijanggan
        from core.models.domain import GanJi
        from core.models.request import SajuRequest
        from core.pillar import calc_four_pillars
        from core.yongshin import calc_yongshin
        from core.yuksin import calc_yuksin

        request = SajuRequest(year=1984, month=4, day=15, hour=10, gender="male")

        # 4주 계산
        pillars = calc_four_pillars(request)
        assert pillars.year_pillar == GanJi(gan="갑", ji="자")
        assert pillars.month_pillar == GanJi(gan="무", ji="진")  # 갑년 4월 -> 무진
        assert pillars.day_pillar == GanJi(gan="기", ji="묘")
        assert pillars.hour_pillar == GanJi(gan="기", ji="사")

        # 지장간 확인 (월지 진)
        jijanggan = get_jijanggan(pillars.month_pillar.ji)
        assert jijanggan.initial == "을"
        assert jijanggan.middle == "계"
        assert jijanggan.main == "무"

        # 육신 (일간 기 기준 년간 갑)
        # 기(土) vs 갑(木): 木克土 -> 관성, 기(陰) vs 갑(陽) -> 이성 -> 정관
        yuksin = calc_yuksin(pillars.day_pillar.gan, pillars.year_pillar.gan)
        assert yuksin == "정관"

        # 대운 계산
        deun = calc_deun_full(request)
        assert deun.banghyang == "순행"
        assert deun.deun_su == 7
        assert deun.deun_list[0].ganji == GanJi(gan="기", ji="사")

        # 용신 계산 (월지 진, 4월 중기 이전 -> 당령 을)
        yongshin = calc_yongshin(
            birth_dt=datetime(1984, 4, 15, 10, 0, 0),
            month_ji=pillars.month_pillar.ji,
            month=4,
            year=1984,
        )
        assert yongshin.dang_ryeong == "을"

    def test_multiple_reference_cases(self) -> None:
        """다수 레퍼런스 케이스 - 4주 계산 정확성."""
        from core.models.domain import GanJi
        from core.models.request import SajuRequest
        from core.pillar import calc_four_pillars

        # 레퍼런스 케이스 목록: (입력, 기대출력)
        # 실제 manse_ori 계산값 기준
        cases = [
            # (year, month, day, hour, gender): (year_pillar, month_pillar, day_pillar, hour_pillar)
            (
                (1984, 4, 15, 10, "male"),
                (GanJi(gan="갑", ji="자"), GanJi(gan="무", ji="진"),
                 GanJi(gan="기", ji="묘"), GanJi(gan="기", ji="사")),
            ),
            # 1990년 경오년
            (
                (1990, 3, 4, 4, "female"),
                # 경오년: 년간 경, 년지 오
                (GanJi(gan="경", ji="오"), None, None, None),
            ),
        ]

        # 첫 케이스만 완전 검증
        inp, expected = cases[0]
        req = SajuRequest(year=inp[0], month=inp[1], day=inp[2], hour=inp[3], gender=inp[4])
        result = calc_four_pillars(req)
        assert result.year_pillar == expected[0]
        assert result.month_pillar == expected[1]
        assert result.day_pillar == expected[2]
        assert result.hour_pillar == expected[3]

        # 1990년 년주 확인만
        inp2, expected2 = cases[1]
        req2 = SajuRequest(year=inp2[0], month=inp2[1], day=inp2[2], hour=inp2[3], gender=inp2[4])
        result2 = calc_four_pillars(req2)
        assert result2.year_pillar == expected2[0]


class TestCalendarIntegration:
    """달력 변환 통합 테스트."""

    def test_lunar_solar_round_trip_multiple_cases(self) -> None:
        """음양력 왕복 변환 - 다수 케이스."""
        from core.calendar import lunar_to_solar, solar_to_lunar

        # (음력년, 음력월, 음력일, 윤달) -> (양력년, 양력월, 양력일)
        cases = [
            (1984, 3, 15, False, 1984, 4, 15),
            (2000, 1, 1, False, 2000, 2, 5),
            (1990, 1, 1, False, 1990, 1, 27),
        ]
        for ly, lm, ld, leap, sy, sm, sd in cases:
            # 음력 -> 양력
            result = lunar_to_solar(ly, lm, ld, leap)
            assert result == (sy, sm, sd), f"lunar_to_solar({ly},{lm},{ld}) = {result}, expected ({sy},{sm},{sd})"

            # 양력 -> 음력 역방향
            back = solar_to_lunar(sy, sm, sd)
            assert back[0] == ly, f"Year mismatch: {back[0]} != {ly}"
            assert back[1] == lm, f"Month mismatch: {back[1]} != {lm}"
            assert back[2] == ld, f"Day mismatch: {back[2]} != {ld}"
            assert back[3] == leap, f"Leap mismatch: {back[3]} != {leap}"
