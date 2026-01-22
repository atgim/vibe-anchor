---
description: 기능 명세 작성 (SDD)
---

# /specify - 기능 명세 작성

기능을 User Story 기반으로 명세합니다.

## 사용법

```
/specify {기능 설명}
```

예시:
```
/specify 사용자 로그인 기능
/specify 상품 검색 및 필터링
```

## 프로세스

### 1. 기능명 추출

사용자 입력에서 간결한 기능명(slug)을 추출합니다.
- "사용자 로그인 기능" → `login`
- "상품 검색 및 필터링" → `product-search`

### 2. ID 결정

`specs/` 폴더를 스캔하여 다음 ID를 결정합니다:
- 기존: `001-login`, `002-dashboard`
- 다음: `003`

### 3. User Story 질문

다음을 질문하세요:

1. **사용자**: "이 기능의 주요 사용자는 누구인가요?"
   - 예: 일반 사용자, 관리자, 게스트

2. **가치**: "사용자가 얻는 가치는 무엇인가요?"
   - 예: 빠른 접근, 보안, 편의성

3. **완료 조건**: "언제 '완료'라고 할 수 있나요?"
   - Given-When-Then 형식으로 구체화

### 4. 요구사항 정리

- **Functional Requirements**: 시스템이 해야 하는 것
- **Non-Functional Requirements**: 성능, 보안, 접근성 등
- **Constraints (제약사항)**: 반드시 지켜야 하는 제한
  - 프로젝트 전체 제약: "IE11 지원", "한국어만"
  - 기능 특수 제약: "오프라인 동작 필요"
- **Out of Scope**: 이번에 하지 않는 것 (명시적으로!)

### 5. NEEDS CLARIFICATION 제한

**중요: 최대 3개까지만**

- 모호한 부분이 많아도 가장 중요한 3개만 `[NEEDS CLARIFICATION]` 표시
- 나머지는 합리적인 기본값으로 가정하고 "가정 사항" 섹션에 기록
- 우선순위: 범위 > 보안/개인정보 > 사용자 경험 > 기술 세부사항

### 6. 파일 생성

```
specs/{id}-{slug}/
├── spec.md           # 기능 명세
└── clarifications.md # 시행착오 & 수정 주의 (빈 템플릿)
```

### 7. CLAUDE.md 업데이트

"명세 목록" 테이블에 새 명세를 추가합니다.

## 산출물: spec.md

```markdown
# 기능 명세: {feature-name}

## 메타
- ID: {id}
- 상태: draft
- 생성일: {date}

## 개요
{한 문장 요약}

## User Stories

### US1: {title} (Priority: P1)

**As a** {사용자}
**I want** {기능}
**So that** {가치}

**Why this priority**: {이 우선순위인 이유}

**Independent Test**: {이 스토리만 독립적으로 테스트하는 방법}

**Acceptance Scenarios**:
1. **Given** {초기 상태}, **When** {액션}, **Then** {결과}
2. **Given** {초기 상태}, **When** {액션}, **Then** {결과}

---

### US2: {title} (Priority: P2)
...

## 요구사항

### Functional
- FR-001: 시스템은 ~해야 한다

### Non-Functional
- NFR-001: 응답 시간 < 200ms

### Constraints (제약사항)
- C-001: {지켜야 하는 제한}

## 범위 외 (Out of Scope)
- {이번에 안 하는 것}

## 가정 사항
- {합리적으로 가정한 것들}

## 열린 질문 (최대 3개)
- [ ] Q1: [NEEDS CLARIFICATION] {모호한 부분}
```

## Given-When-Then 작성 가이드

**테스트 가능한 시나리오 작성:**

```markdown
**Good:**
1. **Given** 사용자가 로그인 페이지에 있고,
   **When** 올바른 이메일/비밀번호를 입력하고 로그인 버튼을 클릭하면,
   **Then** 대시보드로 이동하고 환영 메시지가 표시된다

**Bad:**
- 로그인 성공 시 대시보드로 이동 (Given/When 누락)
```

## Independent Test 작성 가이드

**각 User Story가 독립적으로 테스트 가능해야 함:**

```markdown
**Good:**
"로그인 페이지에서 테스트 계정으로 로그인 후 대시보드 표시 확인으로 검증 가능"

**Bad:**
"다른 기능과 함께 테스트" (독립성 없음)
```

## 다음 단계 안내

명세 작성 완료 후:
- 모호한 부분이 있으면 → `/clarify`
- 기술 계획 수립 → `/plan`

## 완료 조건

- [ ] specs/{id}-{slug}/ 폴더 생성
- [ ] spec.md 작성 (Given-When-Then 포함)
- [ ] 각 User Story에 Independent Test 포함
- [ ] NEEDS CLARIFICATION 최대 3개
- [ ] clarifications.md 빈 템플릿 생성
- [ ] CLAUDE.md 업데이트
- [ ] 다음 단계 안내
