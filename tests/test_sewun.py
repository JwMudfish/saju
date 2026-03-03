"""세운(歲運) 계산 테스트."""

from __future__ import annotations

from core.deun import calc_sewun


class TestCalcSewun:
    """calc_sewun 단위 테스트."""

    def test_returns_eleven_items(self) -> None:
        """총 11개 항목을 반환한다."""
        result = calc_sewun(2025)
        assert len(result) == 11

    def test_range_is_current_year_minus5_to_plus5(self) -> None:
        """현재 연도 -5 ~ +5 범위의 연도를 포함한다."""
        current = 2025
        result = calc_sewun(current)
        years = [item.year for item in result]
        assert years[0] == current - 5
        assert years[-1] == current + 5

    def test_current_year_is_flagged(self) -> None:
        """현재 연도에 해당하는 항목만 is_current=True다."""
        result = calc_sewun(2025)
        current_items = [item for item in result if item.is_current]
        assert len(current_items) == 1
        assert current_items[0].year == 2025

    def test_only_one_current_flag(self) -> None:
        """is_current=True인 항목은 정확히 1개다."""
        result = calc_sewun(2030)
        assert sum(1 for item in result if item.is_current) == 1

    def test_2024_is_gapja(self) -> None:
        """2024년은 갑진(甲辰)년이다 - (2024-4)%10=0→갑, (2024-4)%12=8→진."""
        result = calc_sewun(2024)
        item_2024 = next(item for item in result if item.year == 2024)
        assert item_2024.ganji.gan == "갑"
        assert item_2024.ganji.ji == "진"

    def test_2025_is_eul_sa(self) -> None:
        """2025년은 을사(乙巳)년이다 - (2025-4)%10=1→을, (2025-4)%12=9→사."""
        result = calc_sewun(2025)
        item_2025 = next(item for item in result if item.year == 2025)
        assert item_2025.ganji.gan == "을"
        assert item_2025.ganji.ji == "사"

    def test_boundary_year_1984_is_gapja(self) -> None:
        """1984년은 갑자(甲子)년이다 - (1984-4)%10=0→갑, (1984-4)%12=0→자."""
        result = calc_sewun(1984)
        item_1984 = next(item for item in result if item.year == 1984)
        assert item_1984.ganji.gan == "갑"
        assert item_1984.ganji.ji == "자"

    def test_sixty_cycle_boundary_60_years(self) -> None:
        """60년 주기 경계: 2024년과 1964년은 같은 60갑자 위치."""
        result_2024 = calc_sewun(2024)
        result_1964 = calc_sewun(1964)
        item_2024 = next(item for item in result_2024 if item.year == 2024)
        item_1964 = next(item for item in result_1964 if item.year == 1964)
        assert item_2024.ganji.gan == item_1964.ganji.gan
        assert item_2024.ganji.ji == item_1964.ganji.ji

    def test_gan_cycles_every_10_years(self) -> None:
        """천간은 10년 주기로 순환한다."""
        result = calc_sewun(2030)
        items_by_year = {item.year: item for item in result}
        # 결과 범위 내 10년 차이 항목이 없을 수도 있으므로
        # 2025~2035 구간에서 2025, 2035 비교 (calc_sewun(2030) → 2025~2035)
        item_2025 = items_by_year.get(2025)
        item_2035 = items_by_year.get(2035)
        if item_2025 and item_2035:
            assert item_2025.ganji.gan == item_2035.ganji.gan

    def test_years_are_ascending(self) -> None:
        """연도가 오름차순으로 정렬되어 있다."""
        result = calc_sewun(2025)
        years = [item.year for item in result]
        assert years == sorted(years)

    def test_ganji_fields_are_valid(self) -> None:
        """모든 항목의 gan/ji가 유효한 천간/지지여야 한다."""
        from core.constants import GAN_LIST, JI_LIST

        result = calc_sewun(2025)
        for item in result:
            assert item.ganji.gan in GAN_LIST, f"유효하지 않은 천간: {item.ganji.gan}"
            assert item.ganji.ji in JI_LIST, f"유효하지 않은 지지: {item.ganji.ji}"
