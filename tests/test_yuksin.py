"""Tests for yuksin (육신) calculation module - RED phase."""
from __future__ import annotations


class TestCalcYuksin:
    """육신 계산 테스트."""

    def test_bikyeon_same_gan_same_polarity(self) -> None:
        """같은 오행, 같은 음양 -> 비견."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 갑(양목) -> 비견
        assert calc_yuksin("갑", "갑") == "비견"

    def test_gyopjae_same_gan_diff_polarity(self) -> None:
        """같은 오행, 다른 음양 -> 겁재."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 을(음목) -> 겁재
        assert calc_yuksin("갑", "을") == "겁재"

    def test_sikshin_yang_day_yang_target(self) -> None:
        """양일간, 내가 생하는 것, 같은 음양 -> 식신."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 병(양화) -> 식신 (목생화, 같은 음양)
        assert calc_yuksin("갑", "병") == "식신"

    def test_sangkwan_yang_day_yin_target(self) -> None:
        """양일간, 내가 생하는 것, 다른 음양 -> 상관."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 정(음화) -> 상관 (목생화, 다른 음양)
        assert calc_yuksin("갑", "정") == "상관"

    def test_pyunjae_yang_day_yang_target(self) -> None:
        """양일간, 내가 극하는 것, 같은 음양 -> 편재."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 무(양토) -> 편재 (목극토, 같은 음양)
        assert calc_yuksin("갑", "무") == "편재"

    def test_jeongjae_yang_day_yin_target(self) -> None:
        """양일간, 내가 극하는 것, 다른 음양 -> 정재."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 기(음토) -> 정재 (목극토, 다른 음양)
        assert calc_yuksin("갑", "기") == "정재"

    def test_pyungwan_yang_day_yang_target(self) -> None:
        """양일간, 나를 극하는 것, 같은 음양 -> 편관."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 경(양금) -> 편관 (금극목, 같은 음양)
        assert calc_yuksin("갑", "경") == "편관"

    def test_jeonggwan_yang_day_yin_target(self) -> None:
        """양일간, 나를 극하는 것, 다른 음양 -> 정관."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 신(음금) -> 정관 (금극목, 다른 음양)
        assert calc_yuksin("갑", "신") == "정관"

    def test_pyunin_yang_day_yang_target(self) -> None:
        """양일간, 나를 생하는 것, 같은 음양 -> 편인."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 임(양수) -> 편인 (수생목, 같은 음양)
        assert calc_yuksin("갑", "임") == "편인"

    def test_jeongin_yang_day_yin_target(self) -> None:
        """양일간, 나를 생하는 것, 다른 음양 -> 정인."""
        from core.yuksin import calc_yuksin
        # 갑(양목) 기준 계(음수) -> 정인 (수생목, 다른 음양)
        assert calc_yuksin("갑", "계") == "정인"

    def test_yin_day_master_bikyeon(self) -> None:
        """음일간 비견 테스트."""
        from core.yuksin import calc_yuksin
        # 을(음목) 기준 을(음목) -> 비견
        assert calc_yuksin("을", "을") == "비견"

    def test_yin_day_master_gyopjae(self) -> None:
        """음일간 겁재 테스트."""
        from core.yuksin import calc_yuksin
        # 을(음목) 기준 갑(양목) -> 겁재
        assert calc_yuksin("을", "갑") == "겁재"

    def test_yin_day_master_pyungwan_case(self) -> None:
        """음일간 편관 테스트 - manse_ori 기준.

        AC-005: 병(양화)일간 기준:
        - 임(양수) -> 편관 (수극화, 같은 양)
        - 계(음수) -> 정관 (수극화, 다른 음양)
        """
        from core.yuksin import calc_yuksin
        assert calc_yuksin("병", "임") == "편관"
        assert calc_yuksin("병", "계") == "정관"

    def test_ac005_byong_yuksin(self) -> None:
        """AC-005: 병(丙)일간 육신 계산."""
        from core.yuksin import calc_yuksin
        # 갑(양목) -> 편인 (목생화, 갑도 양, 병도 양, 같은 음양 -> 편인)
        assert calc_yuksin("병", "갑") == "편인"
        # 을(음목) -> 정인 (목생화, 을은 음, 병은 양, 다른 음양 -> 정인)
        assert calc_yuksin("병", "을") == "정인"

    def test_yin_day_master_all_yuksin(self) -> None:
        """음일간 모든 육신 케이스 - 을(음목) 기준."""
        from core.yuksin import calc_yuksin
        # 을(음목) 기준
        # me: 을(음)=비견, 갑(양)=겁재
        assert calc_yuksin("을", "을") == "비견"
        assert calc_yuksin("을", "갑") == "겁재"
        # shang_go (목이 화를 생): 정(음화)=식신, 병(양화)=상관
        assert calc_yuksin("을", "정") == "식신"
        assert calc_yuksin("을", "병") == "상관"
        # geuk_go (목이 토를 극): 기(음토)=편재, 무(양토)=정재
        assert calc_yuksin("을", "기") == "편재"
        assert calc_yuksin("을", "무") == "정재"
        # geuk_come (금이 목을 극): 신(음금)=편관, 경(양금)=정관
        assert calc_yuksin("을", "신") == "편관"
        assert calc_yuksin("을", "경") == "정관"
        # shang_come (수가 목을 생): 계(음수)=편인, 임(양수)=정인
        assert calc_yuksin("을", "계") == "편인"
        assert calc_yuksin("을", "임") == "정인"
