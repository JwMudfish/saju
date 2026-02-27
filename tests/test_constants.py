"""Tests for constants module - RED phase."""
from __future__ import annotations


class TestGanConstants:
    """천간(GAN) 상수 테스트."""

    def test_gan_list_has_10_elements(self) -> None:
        from core.constants import GAN_LIST
        assert len(GAN_LIST) == 10

    def test_gan_list_order(self) -> None:
        from core.constants import GAN_LIST
        assert GAN_LIST == ("갑", "을", "병", "정", "무", "기", "경", "신", "임", "계")

    def test_gan_ohang_mapping(self) -> None:
        from core.constants import GAN_OHANG
        assert GAN_OHANG["갑"] == "목"
        assert GAN_OHANG["을"] == "목"
        assert GAN_OHANG["병"] == "화"
        assert GAN_OHANG["정"] == "화"
        assert GAN_OHANG["무"] == "토"
        assert GAN_OHANG["기"] == "토"
        assert GAN_OHANG["경"] == "금"
        assert GAN_OHANG["신"] == "금"
        assert GAN_OHANG["임"] == "수"
        assert GAN_OHANG["계"] == "수"

    def test_gan_yang_mapping(self) -> None:
        from core.constants import GAN_YANG
        # 양 (양 = True)
        assert GAN_YANG["갑"] is True
        assert GAN_YANG["병"] is True
        assert GAN_YANG["무"] is True
        assert GAN_YANG["경"] is True
        assert GAN_YANG["임"] is True
        # 음 (음 = False)
        assert GAN_YANG["을"] is False
        assert GAN_YANG["정"] is False
        assert GAN_YANG["기"] is False
        assert GAN_YANG["신"] is False
        assert GAN_YANG["계"] is False

    def test_gan_index_lookup(self) -> None:
        from core.constants import GAN_LIST
        assert GAN_LIST.index("갑") == 0
        assert GAN_LIST.index("을") == 1
        assert GAN_LIST.index("계") == 9


class TestJiConstants:
    """지지(JI) 상수 테스트."""

    def test_ji_list_has_12_elements(self) -> None:
        from core.constants import JI_LIST
        assert len(JI_LIST) == 12

    def test_ji_list_order(self) -> None:
        from core.constants import JI_LIST
        assert JI_LIST == ("자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해")

    def test_ji_ohang_mapping(self) -> None:
        from core.constants import JI_OHANG
        assert JI_OHANG["자"] == "수"
        assert JI_OHANG["축"] == "토"
        assert JI_OHANG["인"] == "목"
        assert JI_OHANG["묘"] == "목"
        assert JI_OHANG["진"] == "토"
        assert JI_OHANG["사"] == "화"
        assert JI_OHANG["오"] == "화"
        assert JI_OHANG["미"] == "토"
        assert JI_OHANG["신"] == "금"
        assert JI_OHANG["유"] == "금"
        assert JI_OHANG["술"] == "토"
        assert JI_OHANG["해"] == "수"

    def test_ji_index_lookup(self) -> None:
        from core.constants import JI_LIST
        assert JI_LIST.index("자") == 0
        assert JI_LIST.index("축") == 1
        assert JI_LIST.index("해") == 11


class TestGanji60:
    """60갑자 상수 테스트."""

    def test_ganji_60_has_60_elements(self) -> None:
        from core.constants import GANJI_60
        assert len(GANJI_60) == 60

    def test_first_ganji_is_gapja(self) -> None:
        from core.constants import GANJI_60
        assert GANJI_60[0] == ("갑", "자")

    def test_second_ganji_is_eulchuk(self) -> None:
        from core.constants import GANJI_60
        assert GANJI_60[1] == ("을", "축")

    def test_last_ganji_is_gyehae(self) -> None:
        from core.constants import GANJI_60
        assert GANJI_60[59] == ("계", "해")

    def test_tenth_ganji_is_gyechuk(self) -> None:
        from core.constants import GANJI_60
        # 갑자(0) 을축(1) 병인(2) 정묘(3) 무진(4) 기사(5) 경오(6) 신미(7) 임신(8) 계유(9) 갑술(10)
        assert GANJI_60[9] == ("계", "유")
        assert GANJI_60[10] == ("갑", "술")


class TestYearPillarMappings:
    """년주 매핑 검증 - manse_ori 참조 구현 기반."""

    def test_year_1984_sky(self) -> None:
        """1984 % 10 = 4 -> index 4 in manse_ori array ["경","신","임","계","갑","을","병","정","무","기"]."""
        from core.constants import YEAR_SKY_MAP
        assert YEAR_SKY_MAP[1984 % 10] == "갑"

    def test_year_1984_land(self) -> None:
        """1984 % 12 = 4 -> index 4 in ["신","유","술","해","자","축","인","묘","진","사","오","미"]."""
        from core.constants import YEAR_LAND_MAP
        assert YEAR_LAND_MAP[1984 % 12] == "자"

    def test_year_sky_map_has_10_entries(self) -> None:
        from core.constants import YEAR_SKY_MAP
        assert len(YEAR_SKY_MAP) == 10

    def test_year_land_map_has_12_entries(self) -> None:
        from core.constants import YEAR_LAND_MAP
        assert len(YEAR_LAND_MAP) == 12
