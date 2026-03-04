from __future__ import annotations

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """애플리케이션 설정."""

    app_name: str = Field(default="사주 API")
    app_version: str = Field(default="0.1.0")
    debug: bool = Field(default=False)
    cors_origins: list[str] = Field(default_factory=lambda: ["*"])
    openai_api_key: str | None = Field(default=None, description="OpenAI API 키")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


@lru_cache
def get_settings() -> Settings:
    """설정 인스턴스 반환 (싱글톤)."""
    return Settings()
