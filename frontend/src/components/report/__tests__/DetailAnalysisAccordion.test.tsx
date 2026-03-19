import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DetailAnalysisAccordion } from '../DetailAnalysisAccordion'
import type { HiddenStem, SibiUnsungItem, ShinsalItem, GanJi } from '@/services/types'

const jijanggan: Record<string, HiddenStem> = {
  year: { initial: '계', middle: null, main: '임' },
  month: { initial: '무', middle: '갑', main: '병' },
  day: { initial: '기', middle: '정', main: '무' },
  hour: { initial: '경', middle: null, main: '무' },
}

const sibiunsung: SibiUnsungItem[] = [
  { pillar: 'year', ji: '자', stage: '제왕' },
  { pillar: 'month', ji: '인', stage: '목욕' },
  { pillar: 'day', ji: '오', stage: '사' },
  { pillar: 'hour', ji: '신', stage: '장생' },
]

const shinsal: ShinsalItem[] = [
  { name: '역마살', trigger_ji: '인', description: '이동이 많은 살' },
]

const hourPillar: GanJi = { gan: '경', ji: '신' }

describe('DetailAnalysisAccordion', () => {
  it('초기 상태에서는 접힌 상태이다', () => {
    render(
      <DetailAnalysisAccordion
        jijanggan={jijanggan}
        sibiunsung={sibiunsung}
        shinsal={shinsal}
        hour_pillar={hourPillar}
      />
    )
    expect(screen.getByText('심화 분석 펼치기')).toBeInTheDocument()
    // 지장간 섹션이 보이지 않아야 함
    expect(screen.queryByText('지장간')).not.toBeInTheDocument()
  })

  it('버튼 클릭 시 열린다', () => {
    render(
      <DetailAnalysisAccordion
        jijanggan={jijanggan}
        sibiunsung={sibiunsung}
        shinsal={shinsal}
        hour_pillar={hourPillar}
      />
    )
    const toggleBtn = screen.getByText('심화 분석 펼치기')
    fireEvent.click(toggleBtn)
    expect(screen.getByText('심화 분석 접기')).toBeInTheDocument()
    expect(screen.getByText('지장간')).toBeInTheDocument()
  })

  it('열렸을 때 지장간 섹션을 보여준다', () => {
    render(
      <DetailAnalysisAccordion
        jijanggan={jijanggan}
        sibiunsung={sibiunsung}
        shinsal={shinsal}
        hour_pillar={hourPillar}
      />
    )
    fireEvent.click(screen.getByText('심화 분석 펼치기'))
    expect(screen.getByText('지장간')).toBeInTheDocument()
  })

  it('열렸을 때 십이운성 섹션을 보여준다', () => {
    render(
      <DetailAnalysisAccordion
        jijanggan={jijanggan}
        sibiunsung={sibiunsung}
        shinsal={shinsal}
        hour_pillar={hourPillar}
      />
    )
    fireEvent.click(screen.getByText('심화 분석 펼치기'))
    expect(screen.getByText('십이운성')).toBeInTheDocument()
  })

  it('열렸을 때 신살 섹션을 보여준다', () => {
    render(
      <DetailAnalysisAccordion
        jijanggan={jijanggan}
        sibiunsung={sibiunsung}
        shinsal={shinsal}
        hour_pillar={hourPillar}
      />
    )
    fireEvent.click(screen.getByText('심화 분석 펼치기'))
    expect(screen.getByText('신살')).toBeInTheDocument()
  })

  it('다시 클릭하면 접힌다', () => {
    render(
      <DetailAnalysisAccordion
        jijanggan={jijanggan}
        sibiunsung={sibiunsung}
        shinsal={shinsal}
        hour_pillar={hourPillar}
      />
    )
    fireEvent.click(screen.getByText('심화 분석 펼치기'))
    fireEvent.click(screen.getByText('심화 분석 접기'))
    expect(screen.getByText('심화 분석 펼치기')).toBeInTheDocument()
    expect(screen.queryByText('지장간')).not.toBeInTheDocument()
  })
})
