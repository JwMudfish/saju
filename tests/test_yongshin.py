"""Tests for yongshin (용신, Dominant Stem) calculation module - RED phase.

In manse_ori, yongsin is the 'dang_ryeong' (당령) which represents the
dominant heavenly stem derived from the month branch (월지) based on
whether the birth time falls before or after the mid-solar-term (중기, junggi).

- Before mid-solar-term: smallJunggi result (initial/middle stem influence)
- After mid-solar-term: bigJunggi result (main stem influence)

The mapping (based on manse_ori manse/ryeong/ryeong.js):
  Month Ji | Before Junggi (small) | After Junggi (big)
  인(寅)   | 갑                    | 갑
  묘(卯)   | 갑                    | 을
  진(辰)   | 을                    | 을
  사(巳)   | 병                    | 병
  오(午)   | 병                    | 정
  미(未)   | 정                    | 정
  신(申)   | 경                    | 경
  유(酉)   | 경                    | 신
  술(戌)   | 신                    | 신
  해(亥)   | 임                    | 임
  자(子)   | 임                    | 계
  축(丑)   | 계                    | 계

Related: heuisin (희신) is derived from yongsin (dang_ryeong).
"""
from datetime import datetime


class TestCalcDangRyeong:
    """당령(dang_ryeong) 계산 테스트 - 중기 기준."""

    def test_in_before_junggi_returns_gab(self) -> None:
        """인월(寅月) 중기 이전 -> 갑."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="인", is_before_junggi=True)
        assert result == "갑"

    def test_in_after_junggi_returns_gab(self) -> None:
        """인월(寅月) 중기 이후 -> 갑."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="인", is_before_junggi=False)
        assert result == "갑"

    def test_myo_before_junggi_returns_gab(self) -> None:
        """묘월(卯月) 중기 이전 -> 갑."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="묘", is_before_junggi=True)
        assert result == "갑"

    def test_myo_after_junggi_returns_eul(self) -> None:
        """묘월(卯月) 중기 이후 -> 을."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="묘", is_before_junggi=False)
        assert result == "을"

    def test_jin_before_junggi_returns_eul(self) -> None:
        """진월(辰月) 중기 이전 -> 을."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="진", is_before_junggi=True)
        assert result == "을"

    def test_sa_before_junggi_returns_byeong(self) -> None:
        """사월(巳月) 중기 이전 -> 병."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="사", is_before_junggi=True)
        assert result == "병"

    def test_o_before_junggi_returns_byeong(self) -> None:
        """오월(午月) 중기 이전 -> 병."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="오", is_before_junggi=True)
        assert result == "병"

    def test_o_after_junggi_returns_jeong(self) -> None:
        """오월(午月) 중기 이후 -> 정."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="오", is_before_junggi=False)
        assert result == "정"

    def test_mi_before_junggi_returns_jeong(self) -> None:
        """미월(未月) 중기 이전 -> 정."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="미", is_before_junggi=True)
        assert result == "정"

    def test_sin_before_junggi_returns_gyeong(self) -> None:
        """신월(申月) 중기 이전 -> 경."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="신", is_before_junggi=True)
        assert result == "경"

    def test_yu_before_junggi_returns_gyeong(self) -> None:
        """유월(酉月) 중기 이전 -> 경."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="유", is_before_junggi=True)
        assert result == "경"

    def test_yu_after_junggi_returns_sin(self) -> None:
        """유월(酉月) 중기 이후 -> 신."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="유", is_before_junggi=False)
        assert result == "신"

    def test_sul_before_junggi_returns_sin(self) -> None:
        """술월(戌月) 중기 이전 -> 신."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="술", is_before_junggi=True)
        assert result == "신"

    def test_hae_before_junggi_returns_im(self) -> None:
        """해월(亥月) 중기 이전 -> 임."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="해", is_before_junggi=True)
        assert result == "임"

    def test_ja_before_junggi_returns_im(self) -> None:
        """자월(子月) 중기 이전 -> 임."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="자", is_before_junggi=True)
        assert result == "임"

    def test_ja_after_junggi_returns_gye(self) -> None:
        """자월(子月) 중기 이후 -> 계."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="자", is_before_junggi=False)
        assert result == "계"

    def test_chuk_before_junggi_returns_gye(self) -> None:
        """축월(丑月) 중기 이전 -> 계."""
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="축", is_before_junggi=True)
        assert result == "계"


class TestIsBeforeJunggiEdgeCases:
    """is_before_junggi 엣지 케이스 테스트."""

    def test_unknown_year_month_returns_true(self) -> None:
        """데이터가 없는 년월 -> 기본값 True (중기 이전으로 처리)."""
        from core.yongshin import is_before_junggi
        # 지원 범위 외 year -> 중기 데이터 없음 -> True 반환 (fallback)
        birth_dt = datetime(1599, 1, 15, 10, 0, 0)
        result = is_before_junggi(birth_dt=birth_dt, month=1, year=1599)
        assert result is True  # fallback: no data -> before junggi


class TestCalcHeuisin:
    """희신(heuisin) 계산 테스트 - 당령 기준."""

    def test_gab_dang_ryeong_heuisin(self) -> None:
        """당령 갑 -> 희신 계."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("갑") == "계"

    def test_eul_dang_ryeong_heuisin(self) -> None:
        """당령 을 -> 희신 병."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("을") == "병"

    def test_byeong_dang_ryeong_heuisin(self) -> None:
        """당령 병 -> 희신 을."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("병") == "을"

    def test_jeong_dang_ryeong_heuisin(self) -> None:
        """당령 정 -> 희신 경."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("정") == "경"

    def test_gyeong_dang_ryeong_heuisin(self) -> None:
        """당령 경 -> 희신 정."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("경") == "정"

    def test_sin_dang_ryeong_heuisin(self) -> None:
        """당령 신 -> 희신 임."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("신") == "임"

    def test_im_dang_ryeong_heuisin(self) -> None:
        """당령 임 -> 희신 신."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("임") == "신"

    def test_gye_dang_ryeong_heuisin(self) -> None:
        """당령 계 -> 희신 갑."""
        from core.yongshin import calc_heuisin
        assert calc_heuisin("계") == "갑"


class TestIsBeforeJunggi:
    """중기 이전 여부 판단 테스트."""

    def test_1984_04_15_is_after_junggi(self) -> None:
        """1984-04-15 10:00는 4월 중기(곡우 1984-04-20) 이전.

        4월 중기: 곡우 (1984-04-20 10:26:xx)
        출생: 1984-04-15 -> 중기 이전
        """
        from core.yongshin import is_before_junggi
        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = is_before_junggi(birth_dt=birth_dt, month=4, year=1984)
        assert result is True  # 곡우 이전이므로 True

    def test_1984_04_25_is_after_junggi(self) -> None:
        """1984-04-25는 4월 중기(곡우 1984-04-20) 이후.

        출생: 1984-04-25 -> 중기 이후
        """
        from core.yongshin import is_before_junggi
        birth_dt = datetime(1984, 4, 25, 10, 0, 0)
        result = is_before_junggi(birth_dt=birth_dt, month=4, year=1984)
        assert result is False  # 곡우 이후이므로 False

    def test_returns_bool(self) -> None:
        """결과는 bool 타입이어야 한다."""
        from core.yongshin import is_before_junggi
        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = is_before_junggi(birth_dt=birth_dt, month=4, year=1984)
        assert isinstance(result, bool)


class TestCalcYongshin:
    """calc_yongshin 통합 테스트."""

    def test_1984_04_month_ji_jin_before_junggi(self) -> None:
        """1984-04-15 10:00 -> 월지 진(辰), 중기 이전 -> 당령 을.

        4월 절입 청명(1984-04-04 23:22:20), 월지 진
        4월 중기 곡우(1984-04-20 10:26:xx), 출생 1984-04-15 -> 중기 이전
        당령 을 -> 희신 병 (per ryeongWord hisinCheck)
        """
        from core.yongshin import calc_yongshin
        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = calc_yongshin(birth_dt=birth_dt, month_ji="진", month=4, year=1984)
        assert result.dang_ryeong == "을"
        assert result.heuisin == "병"  # hisinCheck: 을 -> 병

    def test_result_has_required_fields(self) -> None:
        """YongshinResult는 dang_ryeong, heuisin 필드를 가져야 한다."""
        from core.yongshin import calc_yongshin
        birth_dt = datetime(1984, 4, 15, 10, 0, 0)
        result = calc_yongshin(birth_dt=birth_dt, month_ji="진", month=4, year=1984)
        assert hasattr(result, "dang_ryeong")
        assert hasattr(result, "heuisin")

    def test_ja_month_after_junggi(self) -> None:
        """자월 중기 이후 출생 -> 당령 계."""
        # 자월(子月) = 12월, 중기는 소한 이전
        # 중기(대한) 이후인 출생을 테스트
        birth_dt = datetime(1984, 1, 25, 10, 0, 0)  # 1월 = 이전년 자월
        # 자월이라면 is_before_junggi=False로 직접 테스트
        from core.yongshin import calc_dang_ryeong
        result = calc_dang_ryeong(month_ji="자", is_before_junggi=False)
        assert result == "계"


class TestAllMonthJiMapping:
    """전체 월지 매핑 테스트 (순행 참조표)."""

    def test_all_small_junggi_mapping(self) -> None:
        """중기 이전 전체 월지 -> 당령 매핑."""
        from core.yongshin import calc_dang_ryeong
        expected = {
            "인": "갑", "묘": "갑", "진": "을",
            "사": "병", "오": "병", "미": "정",
            "신": "경", "유": "경", "술": "신",
            "해": "임", "자": "임", "축": "계",
        }
        for ji, expected_gan in expected.items():
            assert calc_dang_ryeong(month_ji=ji, is_before_junggi=True) == expected_gan, \
                f"calc_dang_ryeong('{ji}', True) should be '{expected_gan}'"

    def test_all_big_junggi_mapping(self) -> None:
        """중기 이후 전체 월지 -> 당령 매핑."""
        from core.yongshin import calc_dang_ryeong
        expected = {
            "인": "갑", "묘": "을", "진": "을",
            "사": "병", "오": "정", "미": "정",
            "신": "경", "유": "신", "술": "신",
            "해": "임", "자": "계", "축": "계",
        }
        for ji, expected_gan in expected.items():
            assert calc_dang_ryeong(month_ji=ji, is_before_junggi=False) == expected_gan, \
                f"calc_dang_ryeong('{ji}', False) should be '{expected_gan}'"
