"""Tests for ohang module - RED phase."""
from __future__ import annotations


class TestGetGanOhang:
    """천간 오행 조회 테스트."""

    def test_gab_is_mok(self) -> None:
        from core.ohang import get_gan_ohang
        assert get_gan_ohang("갑") == "목"

    def test_eul_is_mok(self) -> None:
        from core.ohang import get_gan_ohang
        assert get_gan_ohang("을") == "목"

    def test_byong_is_hwa(self) -> None:
        from core.ohang import get_gan_ohang
        assert get_gan_ohang("병") == "화"

    def test_jeong_is_hwa(self) -> None:
        from core.ohang import get_gan_ohang
        assert get_gan_ohang("정") == "화"

    def test_mu_is_to(self) -> None:
        from core.ohang import get_gan_ohang
        assert get_gan_ohang("무") == "토"

    def test_all_10_gan_have_ohang(self) -> None:
        from core.constants import GAN_LIST
        from core.ohang import get_gan_ohang
        for gan in GAN_LIST:
            ohang = get_gan_ohang(gan)
            assert ohang in ("목", "화", "토", "금", "수"), f"{gan} ohang={ohang}"


class TestGetJiOhang:
    """지지 오행 조회 테스트."""

    def test_ja_is_su(self) -> None:
        from core.ohang import get_ji_ohang
        assert get_ji_ohang("자") == "수"

    def test_chuk_is_to(self) -> None:
        from core.ohang import get_ji_ohang
        assert get_ji_ohang("축") == "토"

    def test_all_12_ji_have_ohang(self) -> None:
        from core.constants import JI_LIST
        from core.ohang import get_ji_ohang
        for ji in JI_LIST:
            ohang = get_ji_ohang(ji)
            assert ohang in ("목", "화", "토", "금", "수"), f"{ji} ohang={ohang}"


class TestIsYang:
    """음양 판별 테스트."""

    def test_gab_is_yang(self) -> None:
        from core.ohang import is_yang
        assert is_yang("갑") is True

    def test_eul_is_yin(self) -> None:
        from core.ohang import is_yang
        assert is_yang("을") is False

    def test_yang_gan_list(self) -> None:
        from core.ohang import is_yang
        for gan in ("갑", "병", "무", "경", "임"):
            assert is_yang(gan) is True, f"{gan} should be yang"

    def test_yin_gan_list(self) -> None:
        from core.ohang import is_yang
        for gan in ("을", "정", "기", "신", "계"):
            assert is_yang(gan) is False, f"{gan} should be yin"


class TestOHangRelation:
    """오행 상생상극 관계 테스트."""

    def test_same_ohang(self) -> None:
        """같은 오행 -> 'me'."""
        from core.ohang import ohang_relation
        assert ohang_relation("목", "목") == "me"
        assert ohang_relation("화", "화") == "me"
        assert ohang_relation("토", "토") == "me"
        assert ohang_relation("금", "금") == "me"
        assert ohang_relation("수", "수") == "me"

    def test_mok_relations(self) -> None:
        """목 기준 오행 관계."""
        from core.ohang import ohang_relation
        # 목 -> 화 (shang_go: 목이 화를 생)
        assert ohang_relation("목", "화") == "shang_go"
        # 목 -> 토 (geuk_go: 목이 토를 극)
        assert ohang_relation("목", "토") == "geuk_go"
        # 목 <- 수 (shang_come: 수가 목을 생)
        assert ohang_relation("목", "수") == "shang_come"
        # 목 <- 금 (geuk_come: 금이 목을 극)
        assert ohang_relation("목", "금") == "geuk_come"

    def test_hwa_relations(self) -> None:
        """화 기준 오행 관계."""
        from core.ohang import ohang_relation
        assert ohang_relation("화", "토") == "shang_go"
        assert ohang_relation("화", "금") == "geuk_go"
        assert ohang_relation("화", "목") == "shang_come"
        assert ohang_relation("화", "수") == "geuk_come"

    def test_su_relations(self) -> None:
        """수 기준 오행 관계."""
        from core.ohang import ohang_relation
        assert ohang_relation("수", "목") == "shang_go"
        assert ohang_relation("수", "화") == "geuk_go"
        assert ohang_relation("수", "금") == "shang_come"
        assert ohang_relation("수", "토") == "geuk_come"
