"""Tests for hapchung (합충, Combinations and Conflicts) module - RED phase."""


class TestSamhap:
    """삼합(三合) 테스트."""

    def test_in_o_sul_samhap(self) -> None:
        """인오술 삼합 - 화국."""
        from core.hapchung import is_samhap
        # 화국: 인오술 (any two)
        assert is_samhap("인", "오") is True
        assert is_samhap("오", "술") is True
        assert is_samhap("인", "술") is True
        assert is_samhap("오", "인") is True

    def test_hae_myo_mi_samhap(self) -> None:
        """해묘미 삼합 - 목국."""
        from core.hapchung import is_samhap
        assert is_samhap("해", "묘") is True
        assert is_samhap("묘", "미") is True
        assert is_samhap("해", "미") is True

    def test_sin_ja_jin_samhap(self) -> None:
        """신자진 삼합 - 수국."""
        from core.hapchung import is_samhap
        assert is_samhap("신", "자") is True
        assert is_samhap("자", "진") is True
        assert is_samhap("신", "진") is True

    def test_sa_yu_chuk_samhap(self) -> None:
        """사유축 삼합 - 금국."""
        from core.hapchung import is_samhap
        assert is_samhap("사", "유") is True
        assert is_samhap("유", "축") is True
        assert is_samhap("사", "축") is True

    def test_no_samhap_same_ji(self) -> None:
        """같은 지지끼리는 삼합 아님."""
        from core.hapchung import is_samhap
        assert is_samhap("인", "인") is False
        assert is_samhap("오", "오") is False

    def test_no_samhap_different_groups(self) -> None:
        """다른 그룹은 삼합 아님."""
        from core.hapchung import is_samhap
        assert is_samhap("인", "해") is False
        assert is_samhap("자", "오") is False
        assert is_samhap("축", "인") is False

    def test_get_samhap_group(self) -> None:
        """삼합 그룹 반환 함수 테스트."""
        from core.hapchung import get_samhap_group
        # 화국: 인오술
        assert set(get_samhap_group("인")) == {"인", "오", "술"}
        assert set(get_samhap_group("오")) == {"인", "오", "술"}
        assert set(get_samhap_group("술")) == {"인", "오", "술"}
        # 목국: 해묘미
        assert set(get_samhap_group("해")) == {"해", "묘", "미"}
        # 수국: 신자진
        assert set(get_samhap_group("신")) == {"신", "자", "진"}
        # 금국: 사유축
        assert set(get_samhap_group("사")) == {"사", "유", "축"}
        # 해당 없는 지지 (없어야 하지만 edge case)
        # 모든 12지지는 그룹에 속하므로 빈 리스트는 잘못된 입력만 나옴
        assert get_samhap_group("갑") == []  # 천간 입력 edge case


class TestYukhap:
    """육합(六合) 테스트."""

    def test_all_yukhap_pairs(self) -> None:
        """모든 육합 쌍 테스트."""
        from core.hapchung import is_yukhap
        pairs = [
            ("자", "축"),  # 자축합토
            ("인", "해"),  # 인해합목
            ("묘", "술"),  # 묘술합화
            ("진", "유"),  # 진유합금
            ("사", "신"),  # 사신합수
            ("오", "미"),  # 오미합화(일설) 또는 토
        ]
        for a, b in pairs:
            assert is_yukhap(a, b) is True, f"is_yukhap({a!r}, {b!r}) should be True"
            assert is_yukhap(b, a) is True, f"is_yukhap({b!r}, {a!r}) should be True"

    def test_no_yukhap_same_ji(self) -> None:
        """같은 지지는 육합 아님."""
        from core.hapchung import is_yukhap
        assert is_yukhap("자", "자") is False

    def test_no_yukhap_non_pair(self) -> None:
        """육합 관계 아닌 쌍."""
        from core.hapchung import is_yukhap
        assert is_yukhap("자", "인") is False
        assert is_yukhap("인", "묘") is False


class TestChung:
    """충(沖) 테스트."""

    def test_all_chung_pairs(self) -> None:
        """모든 충 쌍 테스트."""
        from core.hapchung import is_chung
        pairs = [
            ("자", "오"),  # 자오충
            ("축", "미"),  # 축미충
            ("인", "신"),  # 인신충
            ("묘", "유"),  # 묘유충
            ("진", "술"),  # 진술충
            ("사", "해"),  # 사해충
        ]
        for a, b in pairs:
            assert is_chung(a, b) is True, f"is_chung({a!r}, {b!r}) should be True"
            assert is_chung(b, a) is True, f"is_chung({b!r}, {a!r}) should be True"

    def test_no_chung_same_ji(self) -> None:
        """같은 지지는 충 아님."""
        from core.hapchung import is_chung
        assert is_chung("자", "자") is False

    def test_no_chung_non_pair(self) -> None:
        """충 관계 아닌 쌍."""
        from core.hapchung import is_chung
        assert is_chung("자", "인") is False
        assert is_chung("인", "묘") is False


class TestBanghap:
    """방합(方合) 테스트."""

    def test_dong_bang_banghap(self) -> None:
        """동방목 방합: 인묘진."""
        from core.hapchung import is_banghap
        # 자기 자신 포함 (방합은 같은 방향 모두)
        assert is_banghap("인", "묘") is True
        assert is_banghap("묘", "진") is True
        assert is_banghap("인", "진") is True
        assert is_banghap("인", "인") is True  # manse_ori: 자기 자신도 포함

    def test_nam_bang_banghap(self) -> None:
        """남방화 방합: 사오미."""
        from core.hapchung import is_banghap
        assert is_banghap("사", "오") is True
        assert is_banghap("오", "미") is True
        assert is_banghap("사", "미") is True

    def test_seo_bang_banghap(self) -> None:
        """서방금 방합: 신유술."""
        from core.hapchung import is_banghap
        assert is_banghap("신", "유") is True
        assert is_banghap("유", "술") is True
        assert is_banghap("신", "술") is True

    def test_buk_bang_banghap(self) -> None:
        """북방수 방합: 해자축."""
        from core.hapchung import is_banghap
        assert is_banghap("해", "자") is True
        assert is_banghap("자", "축") is True
        assert is_banghap("해", "축") is True

    def test_no_banghap_different_groups(self) -> None:
        """다른 방향 그룹은 방합 아님."""
        from core.hapchung import is_banghap
        assert is_banghap("인", "사") is False
        assert is_banghap("오", "신") is False
        assert is_banghap("술", "해") is False


class TestHapchungRelation:
    """hapchung_relation 통합 함수 테스트."""

    def test_samhap_relation(self) -> None:
        """삼합 관계 반환."""
        from core.hapchung import hapchung_relation
        assert hapchung_relation("인", "오") == "삼합"

    def test_yukhap_relation(self) -> None:
        """육합 관계 반환."""
        from core.hapchung import hapchung_relation
        assert hapchung_relation("자", "축") == "육합"

    def test_chung_relation(self) -> None:
        """충 관계 반환."""
        from core.hapchung import hapchung_relation
        assert hapchung_relation("자", "오") == "충"

    def test_banghap_relation(self) -> None:
        """방합 관계 반환."""
        from core.hapchung import hapchung_relation
        assert hapchung_relation("인", "묘") == "방합"

    def test_no_relation(self) -> None:
        """관계 없음 반환."""
        from core.hapchung import hapchung_relation
        # 자인은 아무 관계 없음
        assert hapchung_relation("자", "인") is None
