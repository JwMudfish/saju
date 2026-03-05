"""ContentLoader 서비스 스펙 테스트 - RED phase."""

from __future__ import annotations

import pytest

from app.services.content_loader import ContentLoader


class TestContentLoaderIlgan:
    """일간(日干) 콘텐츠 로딩 테스트."""

    def test_get_ilgan_content_all_gan(self) -> None:
        """10개 일간 모두 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for gan in ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"]:
            result = loader.get_ilgan_content(gan)
            assert result is not None, f"Missing ilgan content for {gan}"
            assert "contentsList" in result or "contents" in result, (
                f"ilgan content for {gan} must have contentsList or contents key"
            )

    def test_get_ilgan_content_unknown_returns_none(self) -> None:
        """알 수 없는 일간은 None을 반환한다 (예외를 발생시키지 않는다)."""
        loader = ContentLoader()
        assert loader.get_ilgan_content("unknown") is None

    def test_get_ilgan_content_empty_string_returns_none(self) -> None:
        """빈 문자열은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_ilgan_content("") is None

    def test_get_ilgan_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_ilgan_content("갑")
        assert isinstance(result, dict)

    def test_get_ilgan_content_갑_has_correct_ilgan_field(self) -> None:
        """갑 일간 콘텐츠의 ilgan 필드가 '갑목일간'을 포함한다."""
        loader = ContentLoader()
        result = loader.get_ilgan_content("갑")
        assert result is not None
        assert result.get("ilgan") == "갑목일간"


class TestContentLoaderYongsin:
    """용신(用神) 콘텐츠 로딩 테스트."""

    def test_get_yongsin_content_all_dang_ryeong(self) -> None:
        """8개 당령(堂令) 모두 용신 콘텐츠를 반환한다."""
        loader = ContentLoader()
        # 용신 subtitle의 한자: 癸(계), 甲(갑), 乙(을), 丙(병), 丁(정), 庚(경), 辛(신), 壬(임)
        for dang_ryeong in ["갑", "을", "병", "정", "경", "신", "임", "계"]:
            result = loader.get_yongsin_content(dang_ryeong)
            assert result is not None, f"Missing yongsin content for {dang_ryeong}"

    def test_get_yongsin_content_unknown_returns_none(self) -> None:
        """알 수 없는 당령은 None을 반환한다 (예외를 발생시키지 않는다)."""
        loader = ContentLoader()
        assert loader.get_yongsin_content("unknown") is None

    def test_get_yongsin_content_empty_string_returns_none(self) -> None:
        """빈 문자열은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_yongsin_content("") is None

    def test_get_yongsin_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_yongsin_content("갑")
        assert isinstance(result, dict)

    def test_get_yongsin_content_has_contents(self) -> None:
        """용신 콘텐츠에 contents 필드가 존재한다."""
        loader = ContentLoader()
        result = loader.get_yongsin_content("갑")
        assert result is not None
        assert "contents" in result


class TestModuleLevelFunctions:
    """모듈 레벨 편의 함수 테스트."""

    def test_module_level_get_ilgan_content(self) -> None:
        """모듈 레벨 get_ilgan_content 함수가 동작한다."""
        from app.services.content_loader import get_ilgan_content

        result = get_ilgan_content("갑")
        assert result is not None

    def test_module_level_get_yongsin_content(self) -> None:
        """모듈 레벨 get_yongsin_content 함수가 동작한다."""
        from app.services.content_loader import get_yongsin_content

        result = get_yongsin_content("갑")
        assert result is not None

    def test_module_level_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 키는 None을 반환한다."""
        from app.services.content_loader import get_ilgan_content, get_yongsin_content

        assert get_ilgan_content("unknown") is None
        assert get_yongsin_content("unknown") is None


class TestContentLoaderGyouk:
    """격국(格局) 콘텐츠 로딩 테스트."""

    def test_get_gyouk_content_all_gyouk(self) -> None:
        """10개 격국명 모두 콘텐츠를 반환한다."""
        loader = ContentLoader()
        for gyouk_name in [
            "건록격",
            "양인격",
            "상관격",
            "식신격",
            "정인격",
            "편인격",
            "정재격",
            "편재격",
            "정관격",
            "편관격",
        ]:
            result = loader.get_gyouk_content(gyouk_name)
            assert result is not None, f"Missing gyouk content for {gyouk_name}"

    def test_get_gyouk_content_unknown_returns_none(self) -> None:
        """알 수 없는 격국명은 None을 반환한다 (예외를 발생시키지 않는다)."""
        loader = ContentLoader()
        assert loader.get_gyouk_content("unknown") is None

    def test_get_gyouk_content_empty_string_returns_none(self) -> None:
        """빈 문자열은 None을 반환한다."""
        loader = ContentLoader()
        assert loader.get_gyouk_content("") is None

    def test_get_gyouk_content_returns_dict(self) -> None:
        """반환값은 dict 타입이다."""
        loader = ContentLoader()
        result = loader.get_gyouk_content("건록격")
        assert isinstance(result, dict)

    def test_get_gyouk_content_건록격_has_required_fields(self) -> None:
        """건록격 콘텐츠에 필수 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_gyouk_content("건록격")
        assert result is not None
        assert result.get("subtitle") == "건록격"
        assert "titleDescription" in result
        assert "contents" in result

    def test_get_gyouk_content_has_tag_fields(self) -> None:
        """격국 콘텐츠에 태그 필드들이 존재한다."""
        loader = ContentLoader()
        result = loader.get_gyouk_content("식신격")
        assert result is not None
        assert "tagZoryun" in result
        assert "tagAngry" in result

    def test_module_level_get_gyouk_content(self) -> None:
        """모듈 레벨 get_gyouk_content 함수가 동작한다."""
        from app.services.content_loader import get_gyouk_content

        result = get_gyouk_content("정관격")
        assert result is not None

    def test_module_level_get_gyouk_content_unknown_returns_none(self) -> None:
        """모듈 레벨 함수에서 알 수 없는 격국명은 None을 반환한다."""
        from app.services.content_loader import get_gyouk_content

        assert get_gyouk_content("없는격국") is None


class TestGyoukMapping:
    """YUKSIN_TO_GYOUK 매핑 테이블 테스트."""

    def test_yuksin_to_gyouk_mapping_has_all_ten_entries(self) -> None:
        """10개 육신-격국 매핑이 정의되어 있다."""
        from app.services.content_loader import YUKSIN_TO_GYOUK

        assert len(YUKSIN_TO_GYOUK) == 10

    def test_yuksin_to_gyouk_비견_maps_to_건록격(self) -> None:
        """비견은 건록격에 매핑된다."""
        from app.services.content_loader import YUKSIN_TO_GYOUK

        assert YUKSIN_TO_GYOUK["비견"] == "건록격"

    def test_yuksin_to_gyouk_겁재_maps_to_양인격(self) -> None:
        """겁재는 양인격에 매핑된다."""
        from app.services.content_loader import YUKSIN_TO_GYOUK

        assert YUKSIN_TO_GYOUK["겁재"] == "양인격"


class TestContentLoaderFileNotFound:
    """파일 미존재 상황에서의 동작 테스트."""

    def test_loader_with_missing_ilgan_file_returns_empty_map(
        self, tmp_path: pytest.TempPathFactory
    ) -> None:
        """일간 파일이 없을 때 빈 맵을 반환하고 충돌하지 않는다."""
        # ContentLoader가 존재하지 않는 경로를 받아도 충돌 없이 동작해야 한다
        loader = ContentLoader(
            ilgan_path=tmp_path / "nonexistent_ilgan.json",  # type: ignore[arg-type]
            yongsin_path=tmp_path / "nonexistent_yongsin.json",  # type: ignore[arg-type]
            gyouk_path=tmp_path / "nonexistent_gyouk.json",  # type: ignore[arg-type]
        )
        assert loader.get_ilgan_content("갑") is None
        assert loader.get_yongsin_content("갑") is None
        assert loader.get_gyouk_content("건록격") is None
