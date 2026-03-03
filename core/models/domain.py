"""Domain models for saju calculation engine."""

from __future__ import annotations

from pydantic import BaseModel, model_validator

from core.constants import GANJI_60


class GanJi(BaseModel):
    """천간지지 (Heavenly Stem + Earthly Branch) pair."""

    gan: str
    ji: str

    @property
    def index(self) -> int:
        """60갑자 인덱스를 반환합니다 (갑자=0, 을축=1, ..., 계해=59)."""
        return GANJI_60.index((self.gan, self.ji))


class HiddenStems(BaseModel):
    """지장간 (Hidden Stems within Earthly Branch)."""

    initial: str  # 여기 (初氣)
    middle: str | None  # 중기 (中氣) - 없을 수 있음
    main: str  # 정기 (正氣)


class DeunItem(BaseModel):
    """대운 항목."""

    age: int
    ganji: GanJi


class YongshinResult(BaseModel):
    """용신(당령) 분석 결과."""

    dang_ryeong: str  # 당령 (yongsin) - 지배적 천간
    heuisin: str  # 희신 - 당령으로부터 유도된 길신


class OHangRatio(BaseModel):
    """오행 비율 (Five Elements Ratio)."""

    mok: float  # 목 (Wood)
    hwa: float  # 화 (Fire)
    to: float  # 토 (Earth)
    geum: float  # 금 (Metal)
    su: float  # 수 (Water)

    @model_validator(mode="after")
    def check_total(self) -> OHangRatio:
        """오행 비율 합계가 100이어야 합니다."""
        total = self.mok + self.hwa + self.to + self.geum + self.su
        if abs(total - 100.0) >= 0.01:
            raise ValueError(f"OHangRatio total must be 100.0, got {total}")
        return self


class SibiUnsungItem(BaseModel):
    """십이운성 결과 항목."""

    pillar: str  # "year", "month", "day", "hour"
    ji: str  # 해당 기둥의 지지
    stage: str  # 십이운성 단계명 (장생, 목욕, ...)


class ShinsalItem(BaseModel):
    """신살 결과 항목."""

    name: str  # 신살 이름 (역마살, 도화살, ...)
    trigger_ji: str  # 해당 신살이 발동된 지지
    description: str | None = None  # 신살 의미 (선택)


class SewunItem(BaseModel):
    """세운 결과 항목."""

    year: int
    ganji: GanJi
    is_current: bool = False


class PillarMeaning(BaseModel):
    """기둥별 상징 의미."""

    pillar: str  # "year", "month", "day", "hour"
    label: str  # "년주", "월주", "일주", "시주"
    meaning: str  # "조상/어린시절", ...


class YuksinItem(BaseModel):
    """육신(십성) 결과 항목."""

    target: str  # 천간 또는 지지 대상
    yuksin: str  # 육신명 (비견, 겁재, ...)
