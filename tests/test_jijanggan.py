"""Tests for jijanggan (지장간) module - RED phase."""

from __future__ import annotations


class TestJijangganTable:
    """지장간 테이블 테스트."""

    def test_ja_hidden_stems(self) -> None:
        """자(子) 지장간: 여기=임, 중기=없음, 정기=계."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("자")
        assert result.initial == "임"
        assert result.middle is None
        assert result.main == "계"

    def test_chuk_hidden_stems(self) -> None:
        """축(丑) 지장간: 여기=계, 중기=신, 정기=기."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("축")
        assert result.initial == "계"
        assert result.middle == "신"
        assert result.main == "기"

    def test_in_hidden_stems(self) -> None:
        """인(寅) 지장간: 여기=무, 중기=병, 정기=갑."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("인")
        assert result.initial == "무"
        assert result.middle == "병"
        assert result.main == "갑"

    def test_myo_hidden_stems(self) -> None:
        """묘(卯) 지장간: 여기=갑, 중기=없음, 정기=을."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("묘")
        assert result.initial == "갑"
        assert result.middle is None
        assert result.main == "을"

    def test_jin_hidden_stems(self) -> None:
        """진(辰) 지장간: 여기=을, 중기=계, 정기=무."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("진")
        assert result.initial == "을"
        assert result.middle == "계"
        assert result.main == "무"

    def test_sa_hidden_stems(self) -> None:
        """사(巳) 지장간: 여기=무, 중기=경, 정기=병."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("사")
        assert result.initial == "무"
        assert result.middle == "경"
        assert result.main == "병"

    def test_o_hidden_stems(self) -> None:
        """오(午) 지장간: 여기=병, 중기=기, 정기=정."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("오")
        assert result.initial == "병"
        assert result.middle == "기"
        assert result.main == "정"

    def test_mi_hidden_stems(self) -> None:
        """미(未) 지장간: 여기=정, 중기=을, 정기=기."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("미")
        assert result.initial == "정"
        assert result.middle == "을"
        assert result.main == "기"

    def test_sin_hidden_stems(self) -> None:
        """신(申) 지장간: 여기=무, 중기=임, 정기=경."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("신")
        assert result.initial == "무"
        assert result.middle == "임"
        assert result.main == "경"

    def test_yu_hidden_stems(self) -> None:
        """유(酉) 지장간: 여기=경, 중기=없음, 정기=신."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("유")
        assert result.initial == "경"
        assert result.middle is None
        assert result.main == "신"

    def test_sul_hidden_stems(self) -> None:
        """술(戌) 지장간: 여기=신, 중기=정, 정기=무."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("술")
        assert result.initial == "신"
        assert result.middle == "정"
        assert result.main == "무"

    def test_hae_hidden_stems(self) -> None:
        """해(亥) 지장간: 여기=무, 중기=갑, 정기=임."""
        from core.jijanggan import get_jijanggan

        result = get_jijanggan("해")
        assert result.initial == "무"
        assert result.middle == "갑"
        assert result.main == "임"

    def test_all_12_ji_have_jijanggan(self) -> None:
        """모든 12 지지에 지장간이 있어야 함."""
        from core.constants import JI_LIST
        from core.jijanggan import get_jijanggan

        for ji in JI_LIST:
            result = get_jijanggan(ji)
            assert result is not None
            assert result.initial != ""
            assert result.main != ""
