# SPEC-UI-005 테스트 체크리스트

## 사전 준비

### 환경 설정
- [ ] Python 3.9+ 설치 확인
- [ ] Streamlit 설치 확인 (`pip install streamlit`)
- [ ] API 서버 실행 상태 확인 (`http://localhost:8000`)
- [ ] 리소스 파일 존재 확인 (`resources/testResult/`)

### 테스트 데이터 준비
- [ ] 양력/음력 다양한 생년월일시 조합
- [ ] 상화/설화가 있는 사주 데이터
- [ ] 모든 영격령(지속/중화/확장) 조합
- [ ] 합충 관계가 있는 사주 데이터

---

## 단위 테스트 (Unit Tests)

### 1. 콘텐츠 로더 함수 테스트

#### SPEC-CONTENT-002 Phase 2
- [ ] `get_shgj_gilhung_content(gyouk_name, is_gil)`
  - [ ] 길격인 경우 정상 로딩
  - [ ] 흉격인 경우 정상 로딩
  - [ ] 존재하지 않는 격국명 처리
  - [ ] 반환 구조 검증 (title, contentsList)

#### SPEC-CONTENT-003 Phase 1
- [ ] `get_sangsin_compliment_content(sangsin)`
  - [ ] 모든 상신 조합 테스트
  - [ ] contentsList 배열 처리
  - [ ] subtitle, contents 필드 존재

- [ ] `get_gusin_gisin_content(gusin)`
  - [ ] 모든 구신 조합 테스트
  - [ ] 기신 판정 로직 검증

- [ ] `get_jisok_content(jisok)`
  - [ ] 지속유/지속길 등 모든 변형 테스트

- [ ] `get_joonghwa_content(joonghwa)`
  - [ ] 중화유/중화길 등 모든 변형 테스트

- [ ] `get_hwakjang_content(hwakjang)`
  - [ ] 확장유/확장길 등 모든 변형 테스트

#### SPEC-CONTENT-003 Phase 2
- [ ] `get_hapchung_content(hapchung_type)`
  - [ ] 충, 형, 해, 파, 육합, 삼합, 방합 모두 테스트
  - [ ] 관계별 콘텐츠 차이 검증

- [ ] `get_ilgan_hw_content(ilgan, month_ji)`
  - [ ] 일간 10간 × 월지 12지지 조합
  - [ ] 화월 관계 분류 로직 검증

- [ ] `get_ilgan_love_content(ilgan)`
  - [ ] 일간별 연애 스타일 차이

- [ ] `get_bestfriend_content(yuksin)`
  - [ ] 십성별 베프 유형 매칭
  - [ ] 월지 십성 추출 로직 검증

#### SPEC-CONTENT-003 Phase 3
- [ ] `get_old_young_content(ilgan, month_ji)`
  - [ ] 일간 × 월지 조합별 노소 관계
  - [ ] 노유/소유 분류 로직 검증

- [ ] `get_light_question_content(question_id, gyouk_name, sanghwa, sulhwa)`
  - [ ] 질문 ID별 로직 검증 (q1, q7, q8)
  - [ ] 상화/설화 조합별 콘텐츠 분기
  - [ ] 상화Seng/설화Seng 조합 처리

---

## 통합 테스트 (Integration Tests)

### 2. Streamlit UI 렌더링

#### Tab 구조
- [ ] 8개 탭 모두 정상 표시
  - [ ] Tab 1: 📜 사주 원국
  - [ ] Tab 2: ⭐ 십성 분석
  - [ ] Tab 3: 🔄 운의 흐름
  - [ ] Tab 4: 📊 세부 지표
  - [ ] Tab 5: 🤖 AI 해석
  - [ ] Tab 6: 🌟 나의 정체성
  - [ ] Tab 7: 👥 관계 분석 (신규)
  - [ ] Tab 8: 💡 경운 안내 (신규)

#### Tab 6: 나의 정체성
- [ ] 기존 3-컬럼 레이아웃 정상
  - [ ] 일간 카드
  - [ ] 격국 카드
  - [ ] 용신 카드

- [ ] 신격 섹션
  - [ ] 핵심 지표 6개 Metric 표시
    - [ ] 상신 (sangsin)
    - [ ] 구신 (gusin)
    - [ ] 국국분 (gukgubun)
    - [ ] 상화 (sanghwa) ⬅ 신규
    - [ ] 설화 (sulhwa) ⬅ 신규
    - [ ] 길흉 (gilhung) ⬅ 신규

  - [ ] 영격령 섹션 3개 Metric
    - [ ] 지속 (jisok) ⬅ 신규
    - [ ] 중화 (joonghwa) ⬅ 신규
    - [ ] 확장 (hwakjang) ⬅ 신규

  - [ ] 상신 상세 설명 expander
  - [ ] 상신 보완 expander ⬅ 신규
  - [ ] 구신 상세 설명 expander
  - [ ] 구신 기신 expander ⬅ 신규
  - [ ] 지속 상세 expander ⬅ 신규
  - [ ] 중화 상세 expander ⬅ 신규
  - [ ] 확장 상세 expander ⬅ 신규
  - [ ] 신격 길흉 expander ⬅ 신규

#### Tab 7: 관계 분석 (신규)
- [ ] 합충 관계 섹션
  - [ ] 합충 관계 expander 표시
  - [ ] 관계 유형별 콘텐츠 로딩
  - [ ] 빈 데이터 메시지 처리

- [ ] 일간 화월 섹션
  - [ ] expander 표시
  - [ ] 일간×월지 조합별 콘텐츠
  - [ ] 빈 데이터 처리

- [ ] 일간 연애 섹션
  - [ ] expander 표시
  - [ ] 일간별 연애 스타일
  - [ ] 빈 데이터 처리

- [ ] 베프 유형 섹션
  - [ ] expander 표시
  - [ ] 월지 십성 기반 매칭
  - [ ] 빈 데이터 처리

#### Tab 8: 경운 안내 (신규)
- [ ] 노소 유형 섹션
  - [ ] expander 표시
  - [ ] 일간×월지 조합별 분류
  - [ ] 빈 데이터 처리

- [ ] 경운 질문 섹션
  - [ ] 질문 1 (q1) expander
  - [ ] 질문 7 (q7) expander
  - [ ] 질문 8 (q8) expander
  - [ ] 상화/설화 조합별 분기 처리
  - [ ] 빈 데이터 처리

---

## 기능 테스트 (Functional Tests)

### 3. API 연동 테스트

#### API Response 검증
- [ ] ShgjResult 모델 필드 존재
  - [ ] sanghwa 필드
  - [ ] sulhwa 필드
  - [ ] jisok 필드
  - [ ] joonghwa 필드
  - [ ] hwakjang 필드
  - [ ] gilhung 필드 (길흉 판정용)

#### 데이터 흐름 검증
- [ ] API → Streamlit 변환
  - [ ] Pydantic 모델 → dict 변환
  - [ ] None 값 안전한 처리
  - [ ] 빈 배열/빈 문자열 처리

### 4. UI 상호작용 테스트

#### Expander 동작
- [ ] 기본 접힘 상태 (expanded=False)
- [ ] 클릭 시 펼침/접힘
- [ ] 여러 expander 독립 동작
- [ ] 콘텐츠 로딩 지연 시 처리

#### Metric 표시
- [ ] 3-컬럼 레이아웃 정렬
- [ ] 값이 "-" 인 경우 처리
- [ ] 긴 텍스트 오버플로우 방지

#### 빈 데이터 처리
- [ ] 데이터 없음 시 `st.info()` 메시지
- [ ] None 값 안전한 접근
- [ ] KeyError 방지

---

## 사용자 경험 테스트 (UX Tests)

### 5. 반응형 레이아웃

- [ ] 데스크톱 (1920×1080)
  - [ ] 3-컬럼 균형 표시
  - [ ] Expander 콘텐츠 가독성

- [ ] 태블릿 (768×1024)
  - [ ] 3-컬럼 → 2-컬럼 자동 조정
  - [ ] 터치 영역 충분한 크기

- [ ] 모바일 (375×667)
  - [ ] 1-컬럼 수직 스택
  - [ ] 텍스트 크기 가독성

### 6. 성능 테스트

#### 콘텐츠 로딩 시간
- [ ] 초기 페이지 로딩 < 3초
- [ ] Tab 전환 < 1초
- [ ] Expander 펼침 < 0.5초
- [ ] API 호출 후 전체 렌더링 < 5초

#### 메모리 사용
- [ ] 캐싱 적용 시 메모리 증가 최소화
- [ ] 대용량 콘텐츠 로딩 시 메모리 안정성

### 7. 접근성 테스트

- [ ] 키보드 네비게이션
  - [ ] Tab 키로 탭 이동
  - [ ] Enter/Space로 expander 토글

- [ ] 색상 대비
  - [ ] 텍스트-배경 대비비 4.5:1 이상
  - [ ] 색맹 모드에서 가독성

- [ ] 스크린 리더
  - [ ] 이모지 대체 텍스트
  - [ ] Expander 상태 announced

---

## 엣지 케이스 테스트 (Edge Cases)

### 8. 예외 상황 처리

#### 데이터 없음
- [ ] shgj가 None인 경우
- [ ] sangsin/gusin이 None인 경우
- [ ] 영격령 모두 None인 경우
- [ ] hapchung 배열이 비어있는 경우
- [ ] yuksin_list에서 월지를 찾지 못한 경우

#### 잘못된 데이터
- [ ] 존재하지 않는 상신/구신 값
- [ ] 존재하지 않는 영격령 값
- [ ] 존재하지 않는 합충 관계 유형
- [ ] 일간/월지 조합에 대한 콘텐츠 없음

#### 동시성
- [ ] 여러 사용자 동시 접속
- [ ] 동시 Tab 전환
- [ ] 빠른 expander 펼침/접힘 반복

### 9. 호환성 테스트

#### 브라우저
- [ ] Chrome (최신)
- [ ] Safari (최신)
- [ ] Firefox (최신)
- [ ] Edge (최신)

#### Python 버전
- [ ] Python 3.9
- [ ] Python 3.10
- [ ] Python 3.11
- [ ] Python 3.12

---

## 회귀 테스트 (Regression Tests)

### 10. 기존 기능 영향 검증

#### 기존 6탭 기능
- [ ] Tab 1: 사주 원국 변화 없음
- [ ] Tab 2: 십성 분석 변화 없음
- [ ] Tab 3: 운의 흐름 변화 없음
- [ ] Tab 4: 세부 지표 변화 없음
- [ ] Tab 5: AI 해석 변화 없음
- [ ] Tab 6: 나의 정체성 기존 기능 유지

#### 기존 import
- [ ] 기존 콘텐츠 로더 함수 정상 작동
- [ ] 기존 데이터 추출 로직 정상

---

## 버그 리포트 템플릿

```markdown
## 버그 제목

**재현 단계**:
1.
2.
3.

**실제 결과**:
-

**기대 결과**:
-

**환경**:
- 브라우저:
- Python 버전:
- OS:

**스크린샷**:
(첨부)

**로그**:
```
(에러 메시지)
```
```

---

## 테스트 완료 기준

### 필수 (Must Have)
- [x] 모든 21개 필드 UI 표시 완료
- [ ] 모든 콘텐츠 로더 함수 호출 성공
- [ ] 빈 데이터 처리 구현 완료
- [ ] 8개 탭 모두 렌더링 정상
- [ ] Syntax check 통과
- [ ] API 연동 테스트 통합

### 권장 (Should Have)
- [ ] 반응형 레이아웃 검증
- [ ] 성능 벤치마크 통과
- [ ] 접근성 가이드라인 준수
- [ ] 에러 핸들링 구현 완료

### 선택적 (Nice to Have)
- [ ] 자동화된 단위 테스트 작성
- [ ] 사용자 UAT 피드백 수렴
- [ ] 로딩 상태 UI 개선
- [ ] 캐싱 최적화 적용

---

## 테스트 일정

| 단계 | 작업 | 예상 소요 시간 | 상태 |
|------|------|----------------|------|
| 1 | 단위 테스트 (콘텐츠 로더) | 2시간 | 예정 |
| 2 | 통합 테스트 (UI 렌더링) | 3시간 | 예정 |
| 3 | 기능 테스트 (API 연동) | 2시간 | 예정 |
| 4 | UX 테스트 (반응형/성능) | 2시간 | 예정 |
| 5 | 엣지 케이스 테스트 | 1시간 | 예정 |
| 6 | 회귀 테스트 | 1시간 | 예정 |
| **총계** | | **11시간** | |

---

**테스트 담당자**: ___________
**승인자**: ___________
**완료일**: ___________
**서명**: ___________
