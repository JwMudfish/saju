"""신살(神殺) 계산 모듈 테스트."""

from __future__ import annotations

from core.shinsal import (
    calc_shinsal,
    check_baekho,
    check_cheonul,
    check_dohwa,
    check_hwagae,
    check_yeokma,
)


class TestCheckYeokma:
    """역마살 판별 테스트."""

    def test_in_year_ji_with_shin_in_pillars(self) -> None:
        """연지=인, 사주에 신 포함 → 역마살."""
        result = check_yeokma("인", ["신", "자", "묘"])
        assert result is not None
        assert result.name == "역마살"
        assert result.trigger_ji == "신"

    def test_o_year_ji_with_shin_in_pillars(self) -> None:
        """연지=오, 사주에 신 포함 → 역마살."""
        result = check_yeokma("오", ["인", "신", "진"])
        assert result is not None
        assert result.trigger_ji == "신"

    def test_sul_year_ji_with_shin_in_pillars(self) -> None:
        """연지=술, 사주에 신 포함 → 역마살."""
        result = check_yeokma("술", ["유", "신", "해"])
        assert result is not None

    def test_no_yeokma_when_target_not_in_pillars(self) -> None:
        """사주에 역마살 지지 없으면 None."""
        result = check_yeokma("인", ["자", "묘", "진"])
        assert result is None

    def test_shin_year_ji_with_in_in_pillars(self) -> None:
        """연지=신, 사주에 인 포함 → 역마살."""
        result = check_yeokma("신", ["인", "묘", "진"])
        assert result is not None
        assert result.trigger_ji == "인"

    def test_hae_year_ji_with_sa_in_pillars(self) -> None:
        """연지=해, 사주에 사 포함 → 역마살."""
        result = check_yeokma("해", ["사", "묘", "미"])
        assert result is not None
        assert result.trigger_ji == "사"

    def test_sa_year_ji_with_hae_in_pillars(self) -> None:
        """연지=사, 사주에 해 포함 → 역마살."""
        result = check_yeokma("사", ["해", "유", "축"])
        assert result is not None
        assert result.trigger_ji == "해"


class TestCheckDohwa:
    """도화살 판별 테스트."""

    def test_in_year_ji_with_myo_in_pillars(self) -> None:
        """연지=인, 사주에 묘 포함 → 도화살."""
        result = check_dohwa("인", ["묘", "자", "오"])
        assert result is not None
        assert result.name == "도화살"
        assert result.trigger_ji == "묘"

    def test_o_year_ji_with_myo_in_pillars(self) -> None:
        """연지=오, 사주에 묘 포함 → 도화살."""
        result = check_dohwa("오", ["묘", "신", "진"])
        assert result is not None

    def test_shin_year_ji_with_yu_in_pillars(self) -> None:
        """연지=신, 사주에 유 포함 → 도화살."""
        result = check_dohwa("신", ["유", "자", "진"])
        assert result is not None
        assert result.trigger_ji == "유"

    def test_no_dohwa_when_target_not_in_pillars(self) -> None:
        """사주에 도화살 지지 없으면 None."""
        result = check_dohwa("인", ["자", "오", "신"])
        assert result is None

    def test_hae_year_ji_with_ja_in_pillars(self) -> None:
        """연지=해, 사주에 자 포함 → 도화살."""
        result = check_dohwa("해", ["자", "묘", "미"])
        assert result is not None
        assert result.trigger_ji == "자"

    def test_sa_year_ji_with_o_in_pillars(self) -> None:
        """연지=사, 사주에 오 포함 → 도화살."""
        result = check_dohwa("사", ["오", "유", "축"])
        assert result is not None


class TestCheckHwagae:
    """화개살 판별 테스트."""

    def test_in_year_ji_with_sul_in_pillars(self) -> None:
        """연지=인, 사주에 술 포함 → 화개살."""
        result = check_hwagae("인", ["술", "자", "묘"])
        assert result is not None
        assert result.name == "화개살"
        assert result.trigger_ji == "술"

    def test_o_year_ji_with_sul_in_pillars(self) -> None:
        """연지=오, 사주에 술 포함 → 화개살."""
        result = check_hwagae("오", ["술", "신", "진"])
        assert result is not None

    def test_shin_year_ji_with_jin_in_pillars(self) -> None:
        """연지=신, 사주에 진 포함 → 화개살."""
        result = check_hwagae("신", ["진", "자", "유"])
        assert result is not None
        assert result.trigger_ji == "진"

    def test_no_hwagae_when_target_not_in_pillars(self) -> None:
        """사주에 화개살 지지 없으면 None."""
        result = check_hwagae("인", ["자", "묘", "진"])
        assert result is None

    def test_hae_year_ji_with_mi_in_pillars(self) -> None:
        """연지=해, 사주에 미 포함 → 화개살."""
        result = check_hwagae("해", ["미", "묘", "자"])
        assert result is not None
        assert result.trigger_ji == "미"

    def test_sa_year_ji_with_chuk_in_pillars(self) -> None:
        """연지=사, 사주에 축 포함 → 화개살."""
        result = check_hwagae("사", ["축", "유", "오"])
        assert result is not None


class TestCheckBaekho:
    """백호살 판별 테스트."""

    def test_gab_jin_is_baekho(self) -> None:
        """갑진 일주 → 백호살."""
        result = check_baekho("갑", "진")
        assert result is not None
        assert result.name == "백호살"

    def test_byeong_sul_is_baekho(self) -> None:
        """병술 일주 → 백호살."""
        result = check_baekho("병", "술")
        assert result is not None

    def test_im_sul_is_baekho(self) -> None:
        """임술 일주 → 백호살."""
        result = check_baekho("임", "술")
        assert result is not None

    def test_non_baekho_pattern(self) -> None:
        """백호살 패턴이 아닌 일주 → None."""
        result = check_baekho("갑", "자")
        assert result is None

    def test_another_non_baekho_pattern(self) -> None:
        """을미 일주 → 백호살 (을미 패턴 포함)."""
        result = check_baekho("을", "미")
        assert result is not None

    def test_gab_ja_not_baekho(self) -> None:
        """갑자 일주 → 백호살 아님."""
        result = check_baekho("갑", "자")
        assert result is None


class TestCheckCheonul:
    """천을귀인 판별 테스트."""

    def test_gab_day_gan_with_chuk_in_pillars(self) -> None:
        """일간=갑, 사주에 축 포함 → 천을귀인."""
        result = check_cheonul("갑", ["축", "자", "인"])
        assert result is not None
        assert result.name == "천을귀인"
        assert result.trigger_ji == "축"

    def test_gab_day_gan_with_mi_in_pillars(self) -> None:
        """일간=갑, 사주에 미 포함 → 천을귀인."""
        result = check_cheonul("갑", ["자", "미", "인"])
        assert result is not None
        assert result.trigger_ji == "미"

    def test_eul_day_gan_with_ja_in_pillars(self) -> None:
        """일간=을, 사주에 자 포함 → 천을귀인."""
        result = check_cheonul("을", ["자", "묘", "인"])
        assert result is not None

    def test_byeong_day_gan_with_hae_in_pillars(self) -> None:
        """일간=병, 사주에 해 포함 → 천을귀인."""
        result = check_cheonul("병", ["해", "자", "묘"])
        assert result is not None

    def test_no_cheonul_when_targets_not_in_pillars(self) -> None:
        """천을귀인 지지가 사주에 없으면 None."""
        result = check_cheonul("갑", ["자", "인", "묘"])
        assert result is None


class TestCalcShinsal:
    """calc_shinsal 통합 테스트."""

    def test_returns_list(self) -> None:
        """결과는 항상 리스트다."""
        result = calc_shinsal("인", "갑", "자", ["인", "자", "묘", "진"])
        assert isinstance(result, list)

    def test_empty_list_when_no_shinsal(self) -> None:
        """신살이 없으면 빈 목록을 반환한다."""
        # 역마살: 연지=자 → 인 필요, 도화살: 연지=자 → 유 필요 (없음)
        # 화개살: 연지=자 → 진 필요 (없음), 백호살: 갑+자 = 해당 없음
        # 천을귀인: 일간=병 → 해/유 필요 (없음)
        result = calc_shinsal("자", "병", "자", ["자", "축", "오", "미"])
        # 역마살 체크: 자→인 필요, 없음
        # 도화살 체크: 자→유 필요, 없음
        # 화개살 체크: 자→진 필요, 없음
        # 백호살: 병+자, 해당 없음
        # 천을귀인: 병→해/유, 없음
        assert result == []

    def test_multiple_shinsal_can_occur(self) -> None:
        """여러 신살이 동시에 발동될 수 있다."""
        # 연지=인 → 역마살=신, 도화살=묘, 화개살=술
        result = calc_shinsal("인", "갑", "진", ["인", "신", "묘", "술"])
        names = [item.name for item in result]
        assert "역마살" in names
        assert "도화살" in names
        assert "화개살" in names

    def test_baekho_detected(self) -> None:
        """백호살 발동 확인."""
        result = calc_shinsal("자", "갑", "진", ["자", "인", "진", "오"])
        names = [item.name for item in result]
        assert "백호살" in names

    def test_cheonul_detected(self) -> None:
        """천을귀인 발동 확인."""
        # 일간=갑, 축이 사주에 있으면 천을귀인
        result = calc_shinsal("자", "갑", "자", ["자", "축", "인", "묘"])
        names = [item.name for item in result]
        assert "천을귀인" in names

    def test_description_is_not_none(self) -> None:
        """발동된 신살의 description은 None이 아니다."""
        result = calc_shinsal("인", "갑", "진", ["인", "신", "묘", "술"])
        for item in result:
            assert item.description is not None
