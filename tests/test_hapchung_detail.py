"""형(刑)·해(害)·파(破) 계산 모듈 TDD 테스트 (SPEC-CALC-002).

RED phase: 구현 전 실패하는 테스트 작성.
"""

from __future__ import annotations


class TestHyeong:
    """형(刑) 관계 테스트."""

    class TestSisejihyeong:
        """시세지형(인사신) 테스트 - 3방향 순환."""

        def test_in_sa_hyeong(self) -> None:
            """인-사 형 관계."""
            from core.hapchung import is_hyeong

            assert is_hyeong("인", "사") is True
            assert is_hyeong("사", "인") is True

        def test_sa_sin_hyeong(self) -> None:
            """사-신 형 관계."""
            from core.hapchung import is_hyeong

            assert is_hyeong("사", "신") is True
            assert is_hyeong("신", "사") is True

        def test_sin_in_hyeong(self) -> None:
            """신-인 형 관계."""
            from core.hapchung import is_hyeong

            assert is_hyeong("신", "인") is True
            assert is_hyeong("인", "신") is True

    class TestMueunjihyeong:
        """무은지형(축술미) 테스트 - 3방향 순환."""

        def test_chuk_sul_hyeong(self) -> None:
            """축-술 형 관계."""
            from core.hapchung import is_hyeong

            assert is_hyeong("축", "술") is True
            assert is_hyeong("술", "축") is True

        def test_sul_mi_hyeong(self) -> None:
            """술-미 형 관계."""
            from core.hapchung import is_hyeong

            assert is_hyeong("술", "미") is True
            assert is_hyeong("미", "술") is True

        def test_mi_chuk_hyeong(self) -> None:
            """미-축 형 관계."""
            from core.hapchung import is_hyeong

            assert is_hyeong("미", "축") is True
            assert is_hyeong("축", "미") is True

    class TestMuryejihyeong:
        """무례지형(자묘) 테스트 - 쌍방향."""

        def test_ja_myo_hyeong(self) -> None:
            """자-묘 형 관계."""
            from core.hapchung import is_hyeong

            assert is_hyeong("자", "묘") is True
            assert is_hyeong("묘", "자") is True

    class TestJahyeong:
        """자형(自刑: 진오유해) 테스트 - 동일 지지."""

        def test_jin_jahyeong(self) -> None:
            """진 자형."""
            from core.hapchung import is_hyeong

            assert is_hyeong("진", "진") is True

        def test_o_jahyeong(self) -> None:
            """오 자형."""
            from core.hapchung import is_hyeong

            assert is_hyeong("오", "오") is True

        def test_yu_jahyeong(self) -> None:
            """유 자형."""
            from core.hapchung import is_hyeong

            assert is_hyeong("유", "유") is True

        def test_hae_jahyeong(self) -> None:
            """해 자형."""
            from core.hapchung import is_hyeong

            assert is_hyeong("해", "해") is True

    class TestNoHyeong:
        """형이 아닌 관계 테스트."""

        def test_ja_chuk_no_hyeong(self) -> None:
            """자-축은 형이 아님 (육합 관계)."""
            from core.hapchung import is_hyeong

            assert is_hyeong("자", "축") is False

        def test_in_myo_no_hyeong(self) -> None:
            """인-묘는 형이 아님 (방합 관계)."""
            from core.hapchung import is_hyeong

            assert is_hyeong("인", "묘") is False

        def test_ja_o_no_hyeong(self) -> None:
            """자-오는 형이 아님 (충 관계)."""
            from core.hapchung import is_hyeong

            assert is_hyeong("자", "오") is False

        def test_same_ji_not_jahyeong(self) -> None:
            """자형 대상이 아닌 동일 지지는 형 아님."""
            from core.hapchung import is_hyeong

            assert is_hyeong("자", "자") is False
            assert is_hyeong("인", "인") is False
            assert is_hyeong("묘", "묘") is False
            assert is_hyeong("축", "축") is False


class TestHyeongSubtype:
    """get_hyeong_subtype 함수 테스트."""

    def test_in_sa_subtype_sisejihyeong(self) -> None:
        """인-사는 시세지형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("인", "사") == "시세지형"

    def test_sa_sin_subtype_sisejihyeong(self) -> None:
        """사-신은 시세지형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("사", "신") == "시세지형"

    def test_in_sin_subtype_sisejihyeong(self) -> None:
        """인-신은 시세지형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("인", "신") == "시세지형"

    def test_chuk_sul_subtype_mueunjihyeong(self) -> None:
        """축-술은 무은지형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("축", "술") == "무은지형"

    def test_sul_mi_subtype_mueunjihyeong(self) -> None:
        """술-미는 무은지형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("술", "미") == "무은지형"

    def test_ja_myo_subtype_muryejihyeong(self) -> None:
        """자-묘는 무례지형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("자", "묘") == "무례지형"
        assert get_hyeong_subtype("묘", "자") == "무례지형"

    def test_jin_subtype_jahyeong(self) -> None:
        """진-진은 자형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("진", "진") == "자형"

    def test_o_subtype_jahyeong(self) -> None:
        """오-오는 자형."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("오", "오") == "자형"

    def test_no_hyeong_returns_none(self) -> None:
        """형이 아닌 쌍은 None 반환."""
        from core.hapchung import get_hyeong_subtype

        assert get_hyeong_subtype("자", "축") is None
        assert get_hyeong_subtype("자", "인") is None


class TestHae:
    """해(害) 관계 테스트."""

    def test_all_hae_pairs(self) -> None:
        """6가지 해 쌍 모두 테스트."""
        from core.hapchung import is_hae

        pairs = [
            ("자", "미"),  # 자미해
            ("축", "오"),  # 축오해
            ("인", "사"),  # 인사해 (형보다 낮은 우선순위지만 해 관계는 성립)
            ("묘", "진"),  # 묘진해
            ("신", "해"),  # 신해해
            ("유", "술"),  # 유술해
        ]
        for a, b in pairs:
            assert is_hae(a, b) is True, f"is_hae({a!r}, {b!r}) should be True"
            assert is_hae(b, a) is True, f"is_hae({b!r}, {a!r}) should be True"

    def test_no_hae_same_ji(self) -> None:
        """같은 지지는 해 아님."""
        from core.hapchung import is_hae

        assert is_hae("자", "자") is False
        assert is_hae("미", "미") is False

    def test_no_hae_non_pair(self) -> None:
        """해 관계가 아닌 쌍."""
        from core.hapchung import is_hae

        assert is_hae("자", "축") is False  # 육합
        assert is_hae("인", "묘") is False  # 방합
        assert is_hae("자", "오") is False  # 충


class TestPa:
    """파(破) 관계 테스트."""

    def test_all_pa_pairs(self) -> None:
        """6가지 파 쌍 모두 테스트."""
        from core.hapchung import is_pa

        pairs = [
            ("자", "유"),  # 자유파
            ("오", "묘"),  # 오묘파
            ("인", "해"),  # 인해파 (육합보다 높은 우선순위)
            ("사", "신"),  # 사신파 (육합보다 높은 우선순위)
            ("진", "축"),  # 진축파
            ("술", "미"),  # 술미파 (형보다 낮은 우선순위지만 파 관계는 성립)
        ]
        for a, b in pairs:
            assert is_pa(a, b) is True, f"is_pa({a!r}, {b!r}) should be True"
            assert is_pa(b, a) is True, f"is_pa({b!r}, {a!r}) should be True"

    def test_no_pa_same_ji(self) -> None:
        """같은 지지는 파 아님."""
        from core.hapchung import is_pa

        assert is_pa("자", "자") is False

    def test_no_pa_non_pair(self) -> None:
        """파 관계가 아닌 쌍."""
        from core.hapchung import is_pa

        assert is_pa("자", "축") is False  # 육합
        assert is_pa("자", "오") is False  # 충
        assert is_pa("인", "묘") is False  # 방합


class TestHapchungRelationModel:
    """HapchungRelation 도메인 모델 테스트."""

    def test_create_chung_relation(self) -> None:
        """충 관계 모델 생성."""
        from core.models.domain import HapchungRelation

        rel = HapchungRelation(
            relation_type="충",
            pillar1="year",
            pillar2="month",
            ji1="자",
            ji2="오",
        )
        assert rel.relation_type == "충"
        assert rel.subtype is None
        assert rel.pillar1 == "year"
        assert rel.pillar2 == "month"
        assert rel.ji1 == "자"
        assert rel.ji2 == "오"

    def test_create_hyeong_relation_with_subtype(self) -> None:
        """형 관계 모델 - subtype 포함."""
        from core.models.domain import HapchungRelation

        rel = HapchungRelation(
            relation_type="형",
            subtype="자형",
            pillar1="day",
            pillar2="hour",
            ji1="진",
            ji2="진",
        )
        assert rel.relation_type == "형"
        assert rel.subtype == "자형"

    def test_subtype_default_none(self) -> None:
        """subtype 기본값은 None."""
        from core.models.domain import HapchungRelation

        rel = HapchungRelation(
            relation_type="해",
            pillar1="year",
            pillar2="day",
            ji1="자",
            ji2="미",
        )
        assert rel.subtype is None


class TestSajuResultHapchungField:
    """SajuResult.hapchung 필드 테스트."""

    def test_hapchung_field_exists(self) -> None:
        """SajuResult에 hapchung 필드가 있어야 한다."""
        from core.models.domain import GanJi
        from core.models.response import SajuResult

        result = SajuResult(
            year_pillar=GanJi(gan="갑", ji="자"),
            month_pillar=GanJi(gan="을", ji="축"),
            day_pillar=GanJi(gan="병", ji="인"),
        )
        assert hasattr(result, "hapchung")
        assert result.hapchung is None  # 기본값

    def test_hapchung_field_can_hold_list(self) -> None:
        """hapchung 필드가 HapchungRelation 리스트를 받을 수 있어야 한다."""
        from core.models.domain import GanJi, HapchungRelation
        from core.models.response import SajuResult

        rel = HapchungRelation(
            relation_type="충",
            pillar1="year",
            pillar2="month",
            ji1="자",
            ji2="오",
        )
        result = SajuResult(
            year_pillar=GanJi(gan="갑", ji="자"),
            month_pillar=GanJi(gan="을", ji="오"),
            day_pillar=GanJi(gan="병", ji="인"),
            hapchung=[rel],
        )
        assert result.hapchung is not None
        assert len(result.hapchung) == 1
        assert result.hapchung[0].relation_type == "충"


class TestCalcPillarHapchung:
    """calc_pillar_hapchung 함수 테스트."""

    def test_returns_list(self) -> None:
        """반환값이 리스트여야 한다."""
        from core.hapchung import calc_pillar_hapchung

        result = calc_pillar_hapchung([("year", "자"), ("month", "오")])
        assert isinstance(result, list)

    def test_empty_pillars_returns_empty(self) -> None:
        """빈 기둥 리스트 → 빈 리스트 반환."""
        from core.hapchung import calc_pillar_hapchung

        assert calc_pillar_hapchung([]) == []

    def test_single_pillar_returns_empty(self) -> None:
        """단일 기둥 → 빈 리스트 반환 (쌍을 이룰 수 없음)."""
        from core.hapchung import calc_pillar_hapchung

        assert calc_pillar_hapchung([("year", "자")]) == []

    def test_chung_pair_detected(self) -> None:
        """자오충이 탐지되어야 한다."""
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "자"), ("month", "오")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "충"
        assert result[0].pillar1 == "year"
        assert result[0].pillar2 == "month"
        assert result[0].ji1 == "자"
        assert result[0].ji2 == "오"

    def test_hyeong_pair_detected(self) -> None:
        """인-사 시세지형이 탐지되어야 한다."""
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "인"), ("month", "사")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "형"
        assert result[0].subtype == "시세지형"

    def test_hae_pair_detected(self) -> None:
        """자-미 해가 탐지되어야 한다."""
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "자"), ("month", "미")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "해"

    def test_pa_pair_detected(self) -> None:
        """자-유 파가 탐지되어야 한다."""
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "자"), ("month", "유")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "파"

    def test_no_relation_returns_empty(self) -> None:
        """관계없는 지지 쌍은 빈 리스트 반환."""
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "자"), ("month", "인")]
        result = calc_pillar_hapchung(pillars)
        assert result == []

    def test_priority_chung_over_hyeong(self) -> None:
        """충이 형보다 우선순위 높아야 한다.

        인-신: 인신충(충) & 시세지형(형) → 충 우선.
        """
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "인"), ("month", "신")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "충"

    def test_priority_hyeong_over_hae(self) -> None:
        """형이 해보다 우선순위 높아야 한다.

        인-사: 시세지형(형) & 인사해(해) → 형 우선.
        """
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "인"), ("month", "사")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "형"

    def test_priority_hyeong_over_pa(self) -> None:
        """형이 파보다 우선순위 높아야 한다.

        술-미: 무은지형(형) & 술미파(파) → 형 우선.
        """
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "술"), ("month", "미")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "형"

    def test_priority_pa_over_yukhap(self) -> None:
        """파가 육합보다 우선순위 높아야 한다.

        인-해: 인해합목(육합) & 인해파(파) → 파 우선.
        """
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "인"), ("month", "해")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "파"

    def test_jahyeong_detected(self) -> None:
        """자형(진-진) 관계가 탐지되어야 한다."""
        from core.hapchung import calc_pillar_hapchung

        pillars = [("year", "진"), ("month", "진")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].relation_type == "형"
        assert result[0].subtype == "자형"

    def test_four_pillars_multiple_relations(self) -> None:
        """4기둥에서 여러 관계가 탐지될 수 있다."""
        from core.hapchung import calc_pillar_hapchung

        # 자오충, 인신충이 있는 4기둥
        pillars = [("year", "자"), ("month", "오"), ("day", "인"), ("hour", "신")]
        result = calc_pillar_hapchung(pillars)
        relation_types = [r.relation_type for r in result]
        assert "충" in relation_types
        # 자오충, 인신충 최소 2개
        chung_count = relation_types.count("충")
        assert chung_count >= 2

    def test_result_contains_pillar_names(self) -> None:
        """결과에 기둥 이름이 포함되어야 한다."""
        from core.hapchung import calc_pillar_hapchung

        pillars = [("day", "자"), ("hour", "오")]
        result = calc_pillar_hapchung(pillars)
        assert len(result) == 1
        assert result[0].pillar1 == "day"
        assert result[0].pillar2 == "hour"


class TestSajuServiceHapchungIntegration:
    """SajuService에서 hapchung 필드가 채워지는지 통합 테스트."""

    def test_saju_result_has_hapchung(self) -> None:
        """calculate() 결과에 hapchung 필드가 있어야 한다."""
        from app.services.saju_service import SajuService

        service = SajuService()
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=12,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )
        assert hasattr(result, "hapchung")
        assert result.hapchung is not None
        assert isinstance(result.hapchung, list)

    def test_saju_result_hapchung_without_hour(self) -> None:
        """시주 없는 경우에도 hapchung이 계산되어야 한다."""
        from app.services.saju_service import SajuService

        service = SajuService()
        result = service.calculate(
            birth_year=1990,
            birth_month=1,
            birth_day=1,
            birth_hour=None,
            is_lunar=False,
            is_leap_month=False,
            gender="male",
        )
        assert result.hapchung is not None
        assert isinstance(result.hapchung, list)
