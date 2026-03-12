# `manse_ori` 컨텐츠의 `saju` 프로젝트 적용 타당성 검토 결과

`manse_ori` 프로젝트 경로 : /Users/kej/ejspace/project-ai/50_cowork/02-saju/`manse_ori`

`saju` 프로젝트 경로 : /Users/kej/ejspace/project-ai/50_cowork/02-saju/saju

검토 요청하신

manse_ori/codemaps/product.md 및

service_examples.md에 명시된 서비스 컨텐츠들을 **`saju` 프로젝트에 바로(Immediately) 구현 및 적용할 수 있는지**에 대한 검토 결과입니다.

결론부터 말씀드리면 **"절반은 1~2시간 내로 즉시 연동 가능하지만, 나머지 절반은 핵심 계산 로직(Core)의 파이썬 포팅(추가 개발)이 선행되어야 합니다."**

---

## 1. 🟢 즉시(바로) 구현 가능한 컨텐츠

현재 `saju` 프로젝트의

app/services/content_loader.py를 보면, 이미 `manse_ori/testResult/` 내에 있는 JSON 파일(`contents_ilgan.json`, `contents_yongsin.json`, `contents_gyouk.json`)을 직접 읽어서 매칭하는 시스템이 완벽하게 구축되어 있습니다. 또한, 이를 매칭하기 위한 핵심 변수(일간, 격국명, 용신/당령, 희신, 육신 등) 계층이 `saju/core/` 내에 이미 개발되어 있습니다.

따라서 **아래 컨텐츠들은 `ContentLoader`에 파일 읽기 함수만 1~2줄 추가하면 즉시 서비스(API/UI)로 제공 가능합니다.**

* **용신 / 희신 컨텐츠** : `core/yongshin.py`에 당령(용신)과 희신 도출 로직이 이미 존재하므로 `contents_Hisin.json` 즉시 연동 가능
* **격국(Gyouk) 기반 컨텐츠** : 이미 `contents_gyouk.json`이 연동되어 작동 중
* **기타 육신/일간 기반 주제별 컨텐츠** : 연봉(Salary), 돌잡이(Doljabi), 인복/돈복 등 육신과 오행 등을 기준으로 매칭하는 컨텐츠들은 즉시 연동 가능
* **일간 운세 (dayUnse)** : 오늘 일진과 사용자 원국을 비교하는 기본 로직(대운/세운 모듈 등 활용)으로 `dayUnseResult/` 내의 결과(평일, 퇴근길, 합국 등) 도출 가능

## 2. 🔴 사전 개발(코어 로직 추가)이 필요한 컨텐츠

`manse_ori`의 고급 분석에 해당하는 일부 개념들은 현재 `saju/core/` (순수 파이썬 사주 계산 엔진)에 핵심 계산 로직 모듈로 아직 구현되어 있지 않습니다. 코어 엔진에서 이 값어치들을 도출해 내야만 JSON 파일의 결과와 매칭(Mapping)할 수 있습니다.

* **미구현된 '영격령' 세부 지표** : 사령(Saryeong), 중화(Junghwa), 지속(Jisok), 확장(Hwakjang)

> *현재 `yongshin.py` 안에 당령은 있지만 사령 등은 구체화되어있지 않습니다.*

* **미구현된 '신격(Shgj)' 지표 전체** : 국국분(Gukgubun), 상신(Sangsin), 구신(Gusin), 상화(Sanghwa), 설화(Sulhwa)

> *이 지표들은 격국과 오행/육신 생극제화를 따지는 복잡한 로직이므로, `saju/core/shgj.py`와 같은 파이썬 모듈을 먼저 신규 개발하여 `manse_ori`의 JS 로직을 포팅해야 합니다.*

* **태왕국신 / 한신·기신** : 이 역시 점수 배점이나 세밀한 판단 로직 포팅이 필요합니다.

---

## 💡 종합 및 다음 단계 제안 (Next Steps)

1. **Phase 1 (즉시 적용)** : 별도 명리학 로직 구현 없이 `ContentLoader` 확장만으로 가능한 연봉, 희신, 일간운세, 돌잡이 부분의 파일 로드 로직과 REST API 엔드포인트를 먼저 뚫어서 UI에 보여주는 작업을 진행할 수 있습니다.
2. **Phase 2 (코어 로직 포팅)** : `manse_ori` 코드에서 `상신/구신`, `사령/중화` 등의 산출 자바스크립트 로직을 확인하여, `saju/core/` 내에 파이썬으로 포팅하는 작업을 거친 후 나머지 컨텐츠를 오픈합니다.

어떤 방향으로 먼저 작업을 진행할지(즉시 적용 가능한 컨텐츠들부터 우선 작업할지, 아니면 코어 로직 포팅부터 진행할지) 알려주시면 작업 계획을 세워 바로 진행하겠습니다!
