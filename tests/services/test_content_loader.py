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
        )
        assert loader.get_ilgan_content("갑") is None
        assert loader.get_yongsin_content("갑") is None
