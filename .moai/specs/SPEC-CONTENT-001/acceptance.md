# SPEC-CONTENT-001 인수 기준

## AC-01: ContentLoader 희신 메서드

- GIVEN: `dang_ryeong = "갑"`, `hisin_yes = True`
- WHEN: `get_hisin_content("갑", hisin_yes=True)` 호출
- THEN: `manse_ori/testResult/contents_Hisin10/contents_gapmuk/contents_HisinYes.json` 내용이 반환된다

## AC-02: ContentLoader 희신 메서드 - 파일 없음

- GIVEN: 존재하지 않는 당령 키
- WHEN: `get_hisin_content("무")` 호출 (무/기는 Hisin10에 없음)
- THEN: `None` 반환, 예외 없음

## AC-03: ContentLoader 연봉 메서드

- GIVEN: 유효한 육신 키
- WHEN: `get_salary_content(yuksin_key)` 호출
- THEN: `contents_salary.json`에서 해당 항목 반환

## AC-04: IdentityResponse 신규 필드

- GIVEN: 정상 사주 입력
- WHEN: `POST /api/v1/saju/identity` 호출
- THEN: 응답 JSON에 `hisin_content`, `hisin_gisin_content`, `salary_content` 키 존재 (null 허용)

## AC-05: 하위 호환성

- GIVEN: 기존 테스트 501개
- WHEN: 전체 테스트 실행
- THEN: 501개 모두 통과, 신규 테스트 추가 시 총 테스트 수 증가

## AC-06: 커버리지

- WHEN: `uv run pytest --cov=app --cov=core`
- THEN: 95% 이상 유지
