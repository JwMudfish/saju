# SPEC-UI-005 Streamlit UI 구조

## 탭 구조도 (8탭)

```
┌─────────────────────────────────────────────────────────────────┐
│  🔮 사주팔자 계산기                                              │
├─────────────────────────────────────────────────────────────────┤
│ [사이드바]                                                      │
│  • 달력 타입 (양력/음력)                                        │
│  • 생년월일시                                                    │
│  • 성별                                                          │
│  • 사주 계산 버튼                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 1: 📜 사주 원국                                             │
│  ┌─────────┬─────────┬─────────┬─────────┐                      │
│  │  年柱   │  月柱   │  日柱   │  時柱   │                      │
│  │ 간지   │ 간지   │ 간지   │ 간지   │                      │
│  │ 의미   │ 의미   │ 의미   │ 의미   │                      │
│  └─────────┴─────────┴─────────┴─────────┘                      │
│  대운 방향 | 대운 시작                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 2: ⭐ 십성 분석                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 위치 | 십성 | 그룹                                     │   │
│  │ -----|------|-----                                     │   │
│  │ �간 | 비견 | 비겁                                     │   │
│  │ 월지 | 정재 | 재성                                     │   │
│  │ ...  | ...  | ...                                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ▼ 십성 그룹 설명 (expander)                                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 3: 🔄 운의 흐름                                            │
│  ┌─────────┬─────────┬─────────┐                              │
│  │대운방향│대운시작│현재세운│                              │
│  └─────────┴─────────┴─────────┘                              │
│                                                                  │
│  ▼ 대운 목록                                                     │
│  ▼ 세운 목록                                                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 4: 📊 세부 지표                                             │
│  ▼ 지장간 (支藏干) 테이블                                       │
│  ▼ 십이운성 (十二運星) 테이블                                   │
│  ▼ 신살 (神殺) 테이블                                           │
│  ▼ 오행 분포 차트                                                │
│  ▼ 합충형해파 분석                                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 5: 🤖 AI 해석                                               │
│  [추가 질문 입력]                                                │
│  [AI 해석 받기 버튼]                                            │
│                                                                  │
│  ▼ AI 해석 결과                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 6: 🌟 나의 정체성 (확장)                                   │
│  ┌─────────┬─────────┬─────────┐                              │
│  │🌱일간  │🏛️격국 │✨용신  │                              │
│  │캐릭터 │격국    │재능    │                              │
│  └─────────┴─────────┴─────────┘                              │
│                                                                  │
│  ▼ 희신 콘텐츠 (expander)                                       │
│  ▼ 희기신 판정 (expander)                                       │
│  ▼ 연봉 운세 (expander)                                         │
│                                                                  │
│  ────────────────────────────────────────────────────────────  │
│  신격 (Shgj) - 심화 분석                                        │
│  ┌─────────┬─────────┬─────────┐                              │
│  │상신    │구신    │국국분  │                              │
│  │상화    │설화    │길흉    │ ⬅ SPEC-CONTENT-002 Phase 2 │
│  └─────────┴─────────┴─────────┘                              │
│                                                                  │
│  영격령 (靈格令)                                                 │
│  ┌─────────┬─────────┬─────────┐                              │
│  │지속    │중화    │확장    │ ⬅ SPEC-CONTENT-002 Phase 2 │
│  └─────────┴─────────┴─────────┘                              │
│                                                                  │
│  ▼ 상신 상세 설명 (expander)                                     │
│  ▼ 상신 보완 해석 (expander) ⬅ SPEC-CONTENT-003 Phase 1        │
│  ▼ 구신 상세 설명 (expander)                                     │
│  ▼ 구신 기신 해석 (expander) ⬅ SPEC-CONTENT-003 Phase 1        │
│  ▼ 지속 상세 설명 (expander) ⬅ SPEC-CONTENT-003 Phase 1        │
│  ▼ 중화 상세 설명 (expander) ⬅ SPEC-CONTENT-003 Phase 1        │
│  ▼ 확장 상세 설명 (expander) ⬅ SPEC-CONTENT-003 Phase 1        │
│  ▼ 신격 길흉 해석 (expander) ⬅ SPEC-CONTENT-002 Phase 2        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 7: 👥 관계 분석 (신규) ⬅ SPEC-CONTENT-003 Phase 2           │
│                                                                  │
│  ▶ 🔗 합충 관계 (合沖關係)                                     │
│     ▼ 합충 관계 해석 (expander)                                │
│     - hapchung_content 사용                                     │
│                                                                  │
│  ▶ 💕 일간 화월 (日間火月)                                     │
│     ▼ 일간 화월 관계 해석 (expander)                           │
│     - ilgan_hw_content 사용                                     │
│     - ilgan, month_ji 기반                                      │
│                                                                  │
│  ▶ 💖 일간 연애 (日間戀愛)                                     │
│     ▼ 일간 연애 스타일 해석 (expander)                         │
│     - ilgan_love_content 사용                                   │
│     - ilgan 기반                                                │
│                                                                  │
│  ▶ 👥 베프 유형 (Best Friend)                                  │
│     ▼ 베프 유형 해석 (expander)                                │
│     - bestfriend_content 사용                                   │
│     - 월지 십성 기반                                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  탭 8: 💡 경운 안내 (신규) ⬅ SPEC-CONTENT-003 Phase 3           │
│                                                                  │
│  ▶ 👴👶 노소 유형 (老少類型)                                   │
│     ▼ 노소 관계 유형 해석 (expander)                           │
│     - old_young_content 사용                                    │
│     - ilgan, month_ji 기반                                      │
│                                                                  │
│  ▶ 💡 경운 질문 (경運質問)                                     │
│     ▼ 질문 1: 기본 경운 확인 (expander)                        │
│       - get_light_question_content("q1", ...)                  │
│     ▼ 질문 7: 중재 경운 확인 (expander)                        │
│       - get_light_question_content("q7", "jungJe", ...)        │
│     ▼ 질문 8: 식신 경운 확인 (expander)                        │
│       - get_light_question_content("q8", "siksin", ...)        │
│     - sanghwa, sulhwa, gyouk_name 기반                         │
└─────────────────────────────────────────────────────────────────┘
```

## 데이터 흐름

```
API Response (SajuResult)
├── shgj: ShgjResult
│   ├── sangsin, gusin, gukgubun (기존)
│   ├── sanghwa, sulhwa (신규 Phase 2) → UI: Metric
│   ├── jisok, joonghwa, hwakjang (신규 Phase 2) → UI: Metric + Expander
│   └── jisok_content, joonghwa_content, hwakjang_content (신규 Phase 1)
│       → UI: Expander
├── day_pillar.gan (ilgan)
├── month_pillar.ji
├── yuksin_list (월지 십성)
├── hapchung (합충 관계 목록)
└── content_loader functions
    ├── get_sangsin_compliment_content() → UI: Expander
    ├── get_gusin_gisin_content() → UI: Expander
    ├── get_shgj_gilhung_content() → UI: Expander
    ├── get_hapchung_content() → Tab 7: Expander
    ├── get_ilgan_hw_content() → Tab 7: Expander
    ├── get_ilgan_love_content() → Tab 7: Expander
    ├── get_bestfriend_content() → Tab 7: Expander
    ├── get_old_young_content() → Tab 8: Expander
    └── get_light_question_content() → Tab 8: Expander (x3)
```

## 콘텐츠 로딩 로직

### 신격 섹션 (Tab 6)
```python
shgj = result.get("shgj")
if shgj:
    # 1. 핵심 지표 표시 (6개 Metric)
    sangsin, gusin, gukgubun, sanghwa, sulhwa, gilhung

    # 2. 영격령 지표 표시 (3개 Metric)
    jisok, joonghwa, hwakjang

    # 3. 상신/구신 설명 (기존 + 보완)
    sangsin_content (기존)
    sangsin_compliment_content (신규 Phase 1)
    gusin_content (기존)
    gusin_gisin_content (신규 Phase 1)

    # 4. 영격령 설명 (신규 Phase 1)
    jisok_content(jisok)
    joonghwa_content(joonghwa)
    hwakjang_content(hwakjang)

    # 5. 신격 길흉 (신규 Phase 2)
    shgj_gilhung_content(gyouk_name, is_gil)
```

### 관계 분석 (Tab 7)
```python
# 1. 합충 관계
hapchung_list = result.get("hapchung")
if hapchung_list:
    relation_type = hapchung_list[0]["relation_type"]
    hapchung_content(relation_type)

# 2. 일간 화월
ilgan = day_pillar["gan"]
month_ji = month_pillar["ji"]
ilgan_hw_content(ilgan, month_ji)

# 3. 일간 연애
ilgan_love_content(ilgan)

# 4. 베프 유형
month_ji_yuksin = find_yuksin_for_target("월지")
bestfriend_content(month_ji_yuksin)
```

### 경운 안내 (Tab 8)
```python
# 1. 노소 유형
old_young_content(ilgan, month_ji)

# 2. 경운 질문
light_question_content("q1", gyouk_name, sanghwa, sulhwa)
light_question_content("q7", "jungJe", sanghwa, sulhwa)
light_question_content("q8", "siksin", sanghwa, sulhwa)
```

## UI 패턴

### Expander 패턴
```python
with st.expander("설명", expanded=False):  # 기본 접힘 상태
    title = content.get("title", "")
    if title:
        st.markdown(f"**{title}**")
    contents = content.get("contents", "")
    if contents:
        st.write(contents.replace("\\n", "\n"))
```

### Metric 패턴
```python
col1, col2, col3 = st.columns(3)
with col1:
    st.metric("라벨", value or "-")
```

### 빈 데이터 처리
```python
if data:
    # 콘텐츠 표시
else:
    st.info("데이터가 없습니다.")
```

## 21개 필드 구현 체크리스트

- [x] sanghwa (상화)
- [x] sulhwa (설화)
- [x] jisok (지속)
- [x] joonghwa (중화)
- [x] hwakjang (확장)
- [x] sangsin_compliment_content (상신 보완)
- [x] gusin_gisin_content (구신 기신)
- [x] jisok_content (지속 설명)
- [x] joonghwa_content (중화 설명)
- [x] hwakjang_content (확장 설명)
- [x] shgj_gilhung_content (신격 길흉)
- [x] hapchung_content (합충 관계)
- [x] ilgan_hw_content (일간 화월)
- [x] ilgan_love_content (일간 연애)
- [x] bestfriend_content (베프 유형)
- [x] old_young_content (노소 유형)
- [x] light_question_content Q1 (경운 질문 1)
- [x] light_question_content Q7 (경운 질문 7)
- [x] light_question_content Q8 (경운 질문 8)
- [x] shgj_gilhung_content (길흉 분석)
- [x] Tab 7: 관계 분석 신규
- [x] Tab 8: 경운 안내 신규

**완료율: 21/21 (100%)**
