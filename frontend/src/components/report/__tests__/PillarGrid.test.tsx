import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PillarGrid } from '../PillarGrid'
import type { SajuResult, YuksinItem } from '@/services/types'

// 기본 pillars 픽스처
const basePillars: SajuResult = {
  year_pillar: { gan: '갑', ji: '자' },
  month_pillar: { gan: '병', ji: '인' },
  day_pillar: { gan: '무', ji: '오' },
  hour_pillar: { gan: '경', ji: '신' },
  deun: null,
  jijanggan: null,
  yuksin_list: null,
  ohang_ratio: null,
  sibiunsung: null,
  shinsal: null,
  sewun: null,
}

const yuksinList: YuksinItem[] = [
  { target: '년간', yuksin: '편관' },
  { target: '월간', yuksin: '편인' },
  { target: '일간', yuksin: '비견' }, // 일간은 특수 처리
  { target: '시간', yuksin: '식신' },
  { target: '년지', yuksin: '정관' },
  { target: '월지', yuksin: '정인' },
  { target: '일지', yuksin: '겁재' },
  { target: '시지', yuksin: '상관' },
]

describe('PillarGrid', () => {
  describe('기본 렌더링', () => {
    it('천간과 지지를 렌더링한다', () => {
      render(<PillarGrid pillars={basePillars} />)
      expect(screen.getByText('갑')).toBeInTheDocument()
      expect(screen.getByText('자')).toBeInTheDocument()
    })
  })

  describe('십성 행 (yuksinList prop 있을 때)', () => {
    it('yuksinList가 제공되면 십성 행을 렌더링한다', () => {
      render(<PillarGrid pillars={basePillars} yuksinList={yuksinList} />)
      expect(screen.getByText('편관')).toBeInTheDocument()
      expect(screen.getByText('편인')).toBeInTheDocument()
      expect(screen.getByText('식신')).toBeInTheDocument()
    })

    it('일주 천간 셀에는 [일간] 텍스트를 표시한다', () => {
      render(<PillarGrid pillars={basePillars} yuksinList={yuksinList} />)
      expect(screen.getByText('[일간]')).toBeInTheDocument()
    })

    it('지지 십성도 렌더링한다', () => {
      render(<PillarGrid pillars={basePillars} yuksinList={yuksinList} />)
      expect(screen.getByText('정관')).toBeInTheDocument()
      expect(screen.getByText('정인')).toBeInTheDocument()
      expect(screen.getByText('겁재')).toBeInTheDocument()
      expect(screen.getByText('상관')).toBeInTheDocument()
    })

    it('yuksinList가 null이면 십성 행을 렌더링하지 않는다', () => {
      render(<PillarGrid pillars={basePillars} yuksinList={null} />)
      expect(screen.queryByText('편관')).not.toBeInTheDocument()
      expect(screen.queryByText('[일간]')).not.toBeInTheDocument()
    })

    it('yuksinList prop이 없으면 십성 행을 렌더링하지 않는다', () => {
      render(<PillarGrid pillars={basePillars} />)
      expect(screen.queryByText('[일간]')).not.toBeInTheDocument()
    })
  })

  describe('시주가 없는 경우', () => {
    it('hour_pillar가 null이면 시주 영역에 - 를 표시한다', () => {
      const pillarsWithoutHour: SajuResult = { ...basePillars, hour_pillar: null }
      render(<PillarGrid pillars={pillarsWithoutHour} yuksinList={yuksinList} />)
      // 시주 없음 표시
      const dashes = screen.getAllByText('-')
      expect(dashes.length).toBeGreaterThan(0)
    })
  })
})
