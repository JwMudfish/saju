"""Response models for saju calculation engine."""

from pydantic import BaseModel

from core.models.domain import DeunItem, GanJi


class FourPillars(BaseModel):
    """사주 사기둥 (Four Pillars of Destiny)."""

    year_pillar: GanJi
    month_pillar: GanJi
    day_pillar: GanJi
    hour_pillar: GanJi | None = None


class DeunResult(BaseModel):
    """대운 계산 결과."""

    banghyang: str  # "순행" or "역행"
    deun_su: int  # 대운수 (나이)
    deun_list: list[DeunItem]  # 10개 대운 목록
