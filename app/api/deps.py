from __future__ import annotations

from app.config import get_settings
from app.services.calendar_service import CalendarService
from app.services.interpretation_service import InterpretationService
from app.services.saju_service import SajuService

__all__ = ["get_settings", "get_saju_service", "get_calendar_service", "get_interpretation_service"]


def get_saju_service() -> SajuService:
    """SajuService 의존성 주입."""
    return SajuService()


def get_calendar_service() -> CalendarService:
    """CalendarService 의존성 주입."""
    return CalendarService()


def get_interpretation_service() -> InterpretationService:
    """InterpretationService 의존성 주입."""
    settings = get_settings()
    return InterpretationService(api_key=settings.openai_api_key)
