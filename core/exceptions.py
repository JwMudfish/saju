"""Custom exceptions for the saju calculation engine."""


class SajuError(Exception):
    """Base exception for all saju calculation errors."""


class YearRangeError(SajuError):
    """Raised when a year is outside the valid range."""

    def __init__(self, year: int) -> None:
        self.year = year
        super().__init__(f"Year {year} is outside the valid range (1600-2100)")


class SolarTermNotFoundError(SajuError):
    """Raised when a solar term entry cannot be found for the given year and month."""

    def __init__(self, year: int, month: int) -> None:
        self.year = year
        self.month = month
        super().__init__(f"Solar term not found for year={year}, month={month}")


class InvalidLunarDateError(SajuError):
    """Raised when a lunar date is invalid or cannot be converted to solar."""

    def __init__(self, year: int, month: int, day: int, is_leap: bool = False) -> None:
        self.year = year
        self.month = month
        self.day = day
        self.is_leap = is_leap
        leap_str = " (leap month)" if is_leap else ""
        super().__init__(
            f"Invalid lunar date: {year}-{month:02d}-{day:02d}{leap_str}"
        )
