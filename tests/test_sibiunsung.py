"""십이운성(十二運星) 계산 모듈 테스트."""

from __future__ import annotations

import pytest

from core.sibiunsung import SIBI_UNSUNG_STAGES, calc_all_sibiunsung, calc_sibiunsung


class TestCalcSibiunsung:
    """calc_sibiunsung 단위 테스트."""

    # 갑(甲) - 양목(陽木), 장생=해(亥), 순방향
    def test_gab_hae_jangsaeng(self) -> None:
        """갑 + 해 = 장생."""
        assert calc_sibiunsung("갑", "해") == "장생"

    def test_gab_ja_mokwok(self) -> None:
        """갑 + 자 = 목욕."""
        assert calc_sibiunsung("갑", "자") == "목욕"

    def test_gab_chuk_gwandae(self) -> None:
        """갑 + 축 = 관대."""
        assert calc_sibiunsung("갑", "축") == "관대"

    def test_gab_in_geonrok(self) -> None:
        """갑 + 인 = 건록."""
        assert calc_sibiunsung("갑", "인") == "건록"

    def test_gab_myo_jewang(self) -> None:
        """갑 + 묘 = 제왕."""
        assert calc_sibiunsung("갑", "묘") == "제왕"

    def test_gab_jin_swe(self) -> None:
        """갑 + 진 = 쇠."""
        assert calc_sibiunsung("갑", "진") == "쇠"

    def test_gab_sa_byeong(self) -> None:
        """갑 + 사 = 병."""
        assert calc_sibiunsung("갑", "사") == "병"

    def test_gab_o_sa(self) -> None:
        """갑 + 오 = 사."""
        assert calc_sibiunsung("갑", "오") == "사"

    def test_gab_mi_myo(self) -> None:
        """갑 + 미 = 묘."""
        assert calc_sibiunsung("갑", "미") == "묘"

    def test_gab_shin_jeol(self) -> None:
        """갑 + 신 = 절."""
        assert calc_sibiunsung("갑", "신") == "절"

    def test_gab_yu_tae(self) -> None:
        """갑 + 유 = 태."""
        assert calc_sibiunsung("갑", "유") == "태"

    def test_gab_sul_yang(self) -> None:
        """갑 + 술 = 양."""
        assert calc_sibiunsung("갑", "술") == "양"

    # 을(乙) - 음목(陰木), 역방향 (목 오행의 장생 기준점 해(亥)에서 역방향 계산)
    def test_eul_hae_jangsaeng(self) -> None:
        """을 + 해 = 장생 (음목: 목 오행 장생기준점 해에서 역방향 index=0)."""
        assert calc_sibiunsung("을", "해") == "장생"

    def test_eul_sul_mokwok(self) -> None:
        """을 + 술 = 목욕 (역방향 index=1)."""
        assert calc_sibiunsung("을", "술") == "목욕"

    def test_eul_yu_gwandae(self) -> None:
        """을 + 유 = 관대 (역방향 index=2)."""
        assert calc_sibiunsung("을", "유") == "관대"

    def test_eul_shin_geonrok(self) -> None:
        """을 + 신 = 건록 (역방향 index=3)."""
        assert calc_sibiunsung("을", "신") == "건록"

    def test_eul_mi_jewang(self) -> None:
        """을 + 미 = 제왕 (역방향 index=4)."""
        assert calc_sibiunsung("을", "미") == "제왕"

    def test_eul_o_swe(self) -> None:
        """을 + 오 = 쇠 (역방향 index=5)."""
        assert calc_sibiunsung("을", "오") == "쇠"

    def test_eul_sa_byeong(self) -> None:
        """을 + 사 = 병 (역방향 index=6)."""
        assert calc_sibiunsung("을", "사") == "병"

    def test_eul_jin_sa(self) -> None:
        """을 + 진 = 사 (역방향 index=7)."""
        assert calc_sibiunsung("을", "진") == "사"

    def test_eul_myo_myo(self) -> None:
        """을 + 묘 = 묘 (역방향 index=8)."""
        assert calc_sibiunsung("을", "묘") == "묘"

    def test_eul_in_jeol(self) -> None:
        """을 + 인 = 절 (역방향 index=9)."""
        assert calc_sibiunsung("을", "인") == "절"

    def test_eul_chuk_tae(self) -> None:
        """을 + 축 = 태 (역방향 index=10)."""
        assert calc_sibiunsung("을", "축") == "태"

    def test_eul_ja_yang(self) -> None:
        """을 + 자 = 양 (역방향 index=11)."""
        assert calc_sibiunsung("을", "자") == "양"

    # 토 오행: 무(陽土), 기(陰土) - 장생=신(申)
    def test_mu_shin_jangsaeng(self) -> None:
        """무 + 신 = 장생 (양토: 토 오행 장생기준점 신에서 순방향)."""
        assert calc_sibiunsung("무", "신") == "장생"

    def test_ki_shin_jangsaeng(self) -> None:
        """기 + 신 = 장생 (음토: 토 오행 장생기준점 신에서 역방향 index=0)."""
        assert calc_sibiunsung("기", "신") == "장생"

    def test_result_is_valid_stage(self) -> None:
        """모든 결과는 유효한 십이운성 단계여야 한다."""
        from core.constants import GAN_LIST, JI_LIST

        for gan in GAN_LIST:
            for ji in JI_LIST:
                result = calc_sibiunsung(gan, ji)
                assert result in SIBI_UNSUNG_STAGES, f"{gan}+{ji} → {result} is not valid"

    def test_invalid_gan_raises_key_error(self) -> None:
        """유효하지 않은 천간은 KeyError를 발생시킨다."""
        with pytest.raises(KeyError):
            calc_sibiunsung("갑갑", "자")


class TestCalcAllSibiunsung:
    """calc_all_sibiunsung 단위 테스트."""

    def test_returns_three_items_without_hour(self) -> None:
        """시주 없으면 3개 항목을 반환한다."""
        result = calc_all_sibiunsung("갑", "인", "묘", "진")
        assert len(result) == 3

    def test_returns_four_items_with_hour(self) -> None:
        """시주 있으면 4개 항목을 반환한다."""
        result = calc_all_sibiunsung("갑", "인", "묘", "진", "사")
        assert len(result) == 4

    def test_pillar_names_without_hour(self) -> None:
        """시주 없을 때 기둥 이름이 year/month/day 순이다."""
        result = calc_all_sibiunsung("갑", "해", "자", "축")
        names = [item.pillar for item in result]
        assert names == ["year", "month", "day"]

    def test_pillar_names_with_hour(self) -> None:
        """시주 있을 때 기둥 이름이 year/month/day/hour 순이다."""
        result = calc_all_sibiunsung("갑", "해", "자", "축", "인")
        names = [item.pillar for item in result]
        assert names == ["year", "month", "day", "hour"]

    def test_ji_field_matches_input(self) -> None:
        """각 항목의 ji 필드가 입력 지지와 일치한다."""
        result = calc_all_sibiunsung("갑", "해", "자", "축", "인")
        assert result[0].ji == "해"
        assert result[1].ji == "자"
        assert result[2].ji == "축"
        assert result[3].ji == "인"

    def test_year_stage_value(self) -> None:
        """갑 + 해 = 장생."""
        result = calc_all_sibiunsung("갑", "해", "자", "축")
        assert result[0].stage == "장생"

    def test_none_hour_excludes_hour_item(self) -> None:
        """hour_ji=None이면 hour 항목이 없다."""
        result = calc_all_sibiunsung("갑", "해", "자", "축", None)
        pillars = [item.pillar for item in result]
        assert "hour" not in pillars
