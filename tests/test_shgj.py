"""Tests for shgj (신격, Shgj) calculation module - RED phase.

신격(Shgj)은 사주팔자에서 상신(Sangsin)과 구신(Gusin)을 분석하는 지표입니다.

용신(Yongshin) 기반 상신/구신 계산:
- 상신(Sangsin): 용신을 돕는 천간 (예: 용신이 목이면 화/수가 상신)
- 구신(Gusin): 용신을 극하거나 방해하는 천간 (예: 용신이 목이면 금/토가 구신)

오행 상생상극 관계:
- 상생: 목→화→토→금→수→목 (생하는 관계)
- 상극: 목→토→수→화→금→목 (극하는 관계)

MVP 범위 (1단계):
- 상신/구신 계산만 구현
- 상화/설화는 None 반환 (추후 구현)
- 국국분은 None 반환 (추후 구현)

불명확한 경우:
- 유효한 천간을 찾지 못하면 None 반환
- 계산 로직이 불명확하면 None 반환
"""

from __future__ import annotations

from core.models.domain import ShgjResult, YuksinItem
from core.models.response import FourPillars, GanJi
from core.shgj import calc_shgj


class TestCalcShgj:
    """신격(Shgj) 계산 테스트."""

    def test_valid_input_returns_shgj_result(self) -> None:
        """유효한 입력 -> ShgjResult 반환 (MVP: 상신 또는 구신 중 하나는 non-None)."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = [
            YuksinItem(target="갑", yuksin="비견"),
            YuksinItem(target="을", yuksin="겁재"),
            YuksinItem(target="병", yuksin="식신"),
            YuksinItem(target="정", yuksin="상관"),
        ]
        dang_ryeong = "갑"  # 용신이 갑(목)인 경우

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - MVP: 최소한 상신 또는 구신 중 하나는 non-None이어야 함
        assert isinstance(result, ShgjResult)
        assert result.sangsin is not None or result.gusin is not None, \
            "MVP: sangsin or gusin must be non-None for valid input"

    def test_yongsin_mok_then_sangsin_is_hwa_or_su(self) -> None:
        """용신이 목(木)이면 상신은 화(火) 또는 수(Water)."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = [
            YuksinItem(target="병", yuksin="식신"),  # 화(火)
            YuksinItem(target="임", yuksin="정재"),  # 수(水)
        ]
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 목을 생하는 오행: 화(목→화) 또는 수(수→목)
        assert result.sangsin in ["병", "정", "임", "계", None]

    def test_yongsin_mok_then_gusin_is_geum_or_to(self) -> None:
        """용신이 목(木)이면 구신은 금(Metal) 또는 土(Earth)."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = [
            YuksinItem(target="경", yuksin="상관"),  # 금(Metal)
            YuksinItem(target="무", yuksin="편재"),  # 토(Earth)
        ]
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 목을 극하는 오행: 금(금→목) 또는 토(목→토)
        assert result.gusin in ["경", "신", "무", "기", None]

    def test_empty_yuksin_list_but_pillars_stems_considered(self) -> None:
        """빈 육신 리스트라도 사주팔자 천간은 고려됨."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list: list[YuksinItem] = []
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - pillars의 천간(병,정,을)은 상신/구신 계산에 고려됨
        # 목(木)의 상신: 화(병,정) 또는 수(임,계)
        # 목(木)의 구신: 금(경,신) 또는 토(무,기)
        # pillars에는 병(화), 정(화), 을(목)이 있음
        # 갑(목)은 용신이므로 제외됨
        assert result.sangsin is not None or result.gusin is not None

    def test_invalid_dang_ryeong_returns_none_values(self) -> None:
        """잘못된 당령 -> 상신/구신 모두 None."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = [
            YuksinItem(target="갑", yuksin="비견"),
        ]
        dang_ryeong = "XXX"  # Invalid

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert
        assert result.sangsin is None
        assert result.gusin is None

    def test_sanghwa_and_sulhwa_none_in_mvp(self) -> None:
        """상화/설화 계산: 나를 생하는/극하는 천간이 사주팔자/육신에 존재해야 한다."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = [
            YuksinItem(target="임", yuksin="정재"),  # 수(Water) - 목(갑)을 생함
        ]
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 상화: 목을 생하는 수(임)가 존재
        assert result.sanghwa == "임"
        # 설화: 목을 극하는 금이 없으므로 None
        assert result.sulhwa is None

    def test_sanghwa_finds_stem_that_generates_yongsin(self) -> None:
        """상화: 용신을 생하는 천간 중 사주팔자/육신에 존재하는 것."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="임", ji="진"),  # 수(Water) - 목을 생함
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = []
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 상화: 목을 생하는 수(임)가 pillars에 존재
        assert result.sanghwa == "임"

    def test_sulhwa_finds_stem_that_restricts_yongsin(self) -> None:
        """설화: 용신을 극하는 천간 중 사주팔자/육신에 존재하는 것."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="경", ji="오"),  # 금(Metal) - 목을 극함
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = []
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 설화: 목을 극하는 금(경)가 pillars에 존재
        assert result.sulhwa == "경"

    def test_sanghwa_returns_none_when_no_generating_stem_exists(self) -> None:
        """상화: 용신을 생하는 천간이 없으면 None."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="을", ji="진"),  # 목(목)
            month_pillar=GanJi(gan="병", ji="묘"),  # 화(화)
            day_pillar=GanJi(gan="정", ji="오"),    # 화(화)
            hour_pillar=GanJi(gan="무", ji="미"),   # 토(토)
        )
        gyouk_name = "편재격"
        yuksin_list = []
        dang_ryeong = "임"  # 수(수) - 수를 생하는 금이 없음

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 상화: 수를 생하는 금(경,신)이 없으므로 None
        assert result.sanghwa is None

    def test_sulhwa_returns_none_when_no_restricting_stem_exists(self) -> None:
        """설화: 용신을 극하는 천간이 없으면 None."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="을", ji="진"),  # 목(목)
            month_pillar=GanJi(gan="병", ji="묘"),  # 화(화)
            day_pillar=GanJi(gan="정", ji="오"),    # 화(화)
            hour_pillar=GanJi(gan="무", ji="미"),   # 토(토)
        )
        gyouk_name = "식신격"
        yuksin_list = []
        dang_ryeong = "임"  # 수(수) - 수를 극하는 토만 있음
        # 토(무,기)가 존재하므로 설화는 토를 반환해야 함

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 설화: 수를 극하는 토(무)가 존재
        assert result.sulhwa == "무"

    def test_gukgubun_none_in_mvp(self) -> None:
        """MVP에서는 국국분 항상 None 반환."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = [
            YuksinItem(target="갑", yuksin="비견"),
        ]
        dang_ryeong = "갑"

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - MVP: 국국분 미구현
        assert result.gukgubun is None

    def test_yongsin_hwa_then_sangsin_is_to_or_mok(self) -> None:
        """용신이 화(火)이면 상신은 土(Earth) 또는 木(Wood)."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="병", ji="오"),
            month_pillar=GanJi(gan="정", ji="사"),
            day_pillar=GanJi(gan="무", ji="진"),
            hour_pillar=GanJi(gan="기", ji="미"),
        )
        gyouk_name = "식신격"
        yuksin_list = [
            YuksinItem(target="무", yuksin="비견"),  # 토(Earth)
            YuksinItem(target="갑", yuksin="정재"),  # 목(Wood)
        ]
        dang_ryeong = "병"  # 화(火)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 화를 생하는 오행: 목(목→화) 또는 토(화→토)
        assert result.sangsin in ["갑", "을", "무", "기", None]

    def test_yongsin_geum_then_sangsin_is_su_or_to(self) -> None:
        """용신이 금(Metal)이면 상신은 水(Water) 또는 土(Earth)."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="경", ji="신"),
            month_pillar=GanJi(gan="신", ji="유"),
            day_pillar=GanJi(gan="임", ji="술"),
            hour_pillar=GanJi(gan="계", ji="해"),
        )
        gyouk_name = "상관격"
        yuksin_list = [
            YuksinItem(target="임", yuksin="편재"),  # 수(Water)
            YuksinItem(target="무", yuksin="식신"),  # 토(Earth)
        ]
        dang_ryeong = "경"  # 금(Metal)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 금을 생하는 오행: 토(토→금) 또는 수(금→수)
        assert result.sangsin in ["무", "기", "임", "계", None]

    def test_multiple_yuksin_finds_first_sangsin(self) -> None:
        """여러 육신 중 첫 번째 상신만 반환."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="갑", ji="진"),
            month_pillar=GanJi(gan="을", ji="묘"),
            day_pillar=GanJi(gan="병", ji="오"),
            hour_pillar=GanJi(gan="정", ji="미"),
        )
        gyouk_name = "정관격"
        yuksin_list = [
            YuksinItem(target="병", yuksin="식신"),  # 화(火) - 목의 상신
            YuksinItem(target="정", yuksin="상관"),  # 화(火) - 목의 상신
            YuksinItem(target="임", yuksin="정재"),  # 수(Water) - 목의 상신
        ]
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - 첫 번째 상신 반환
        assert result.sangsin in ["병", "정", "임"]
        assert isinstance(result.sangsin, str)

    def test_pillars_stems_considered_in_calculation(self) -> None:
        """사주팔자의 천간도 상신/구신 계산에 고려되어야 함."""
        # Arrange
        pillars = FourPillars(
            year_pillar=GanJi(gan="병", ji="오"),  # 화(火)
            month_pillar=GanJi(gan="정", ji="사"),  # 화(火)
            day_pillar=GanJi(gan="무", ji="진"),    # 토(Earth)
            hour_pillar=GanJi(gan="기", ji="미"),   # 토(Earth)
        )
        gyouk_name = "식신격"
        yuksin_list = []  # 빈 리스트지만 pillars에 천간이 있음
        dang_ryeong = "갑"  # 목(木)

        # Act
        result = calc_shgj(
            pillars=pillars,
            gyouk_name=gyouk_name,
            yuksin_list=yuksin_list,
            dang_ryeong=dang_ryeong,
        )

        # Assert - pillars의 천간도 고려
        # 목(木)의 상신: 화(병,정) 또는 수(임,계)
        # 목(木)의 구신: 금(경,신) 또는 토(무,기)
        assert result.sangsin is not None or result.gusin is not None, \
            "Pillars stems should be considered for sangsin/gusin calculation"
