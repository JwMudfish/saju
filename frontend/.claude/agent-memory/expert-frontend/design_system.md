---
name: 사주 코치 디자인 시스템
description: tailwind.config.ts 기반 색상, 폰트, borderRadius 등 디자인 토큰 정보
type: project
---

tailwind.config.ts 기반 디자인 시스템. 향후 컴포넌트 구현 시 이 토큰을 사용한다.

**Why:** 레퍼런스 HTML과 동일한 디자인 토큰을 사용하여 일관된 UI를 유지하기 위함.

**How to apply:** 모든 색상, 폰트, 반경 값은 아래 토큰을 통해 사용한다. 임의 hex 값 사용 지양.

## 색상 토큰

- `primary`: #800020 (딥 버건디 - 브랜드 메인 색상)
- `accent-gold`: #C5A059 (골드 - 강조 색상)
- `background-light`: #f8f5f6 (밝은 배경)
- `background-dark`: #230f14 (어두운 배경)

## 폰트

- `font-display`: Inter, Noto Sans KR, sans-serif

## borderRadius (커스텀)

- DEFAULT: 0.25rem
- lg: 0.5rem
- xl: 0.75rem
- full: 9999px
- 2xl, 3xl 없음 → arbitrary value 사용: rounded-[1rem], rounded-[1.5rem]

## 오행 CSS 클래스 (src/styles/index.css)

- `.element-wood`: color #2d5a27, background #e8f5e9
- `.element-fire`: color #b71c1c, background #ffebee
- `.element-earth`: color #795548, background #efebe9
- `.element-metal`: color #455a64, background #eceff1
- `.element-water`: color #0d47a1, background #e3f2fd

## Material Symbols Outlined

- 아이콘 폰트: Material Symbols Outlined
- 사용법: `<span className="material-symbols-outlined">icon_name</span>`
- 자주 쓰는 아이콘: auto_awesome, storm, psychology, calendar_today, schedule, send, arrow_forward, person, chat_bubble_outline, thumb_up, share
