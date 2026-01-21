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

3. **완료 조건**: "언제 '완료'라고 할 수 있나요? (Acceptance Criteria)"
   - 예: 로그인 성공 시 대시보드로 이동

### 4. 요구사항 정리

- **Functional Requirements**: 시스템이 해야 하는 것
- **Non-Functional Requirements**: 성능, 보안, 접근성 등
- **Constraints (제약사항)**: 반드시 지켜야 하는 제한
  - 프로젝트 전체 제약: "IE11 지원", "한국어만"
  - 기능 특수 제약: "오프라인 동작 필요"
- **Out of Scope**: 이번에 하지 않는 것 (명시적으로!)

### 5. 파일 생성

```
specs/{id}-{slug}/
├── spec.md           # 기능 명세
└── clarifications.md # 시행착오 & 수정 주의 (빈 템플릿)
```

### 6. CLAUDE.md 업데이트

"최근 명세" 테이블에 새 명세를 추가합니다.

## 산출물: spec.md

```markdown
# 기능 명세: {feature-name}

## 메타
- ID: {id}
- 상태: draft
- 생성일: {date}
- 브랜치: {id}-{slug}

## 개요
{한 문장 요약}

## User Stories
### US1: {title} (Priority: P1)
**As a** {사용자}
**I want** {기능}
**So that** {가치}

**Acceptance Criteria:**
- [ ] {조건 1}
- [ ] {조건 2}

## 요구사항
### Functional
- FR-001: 시스템은 ~해야 한다

### Non-Functional
- NFR-001: 응답 시간 < 200ms

### Constraints (제약사항)
- C-001: {지켜야 하는 제한}

## 범위 외 (Out of Scope)
- {이번에 안 하는 것}

## 열린 질문
- [ ] Q1: {모호한 부분}
```

## 다음 단계 안내

명세 작성 완료 후:
- 모호한 부분이 있으면 → `/clarify`
- 기술 계획 수립 → `/plan`

## 완료 조건

- [ ] specs/{id}-{slug}/ 폴더 생성
- [ ] spec.md 작성
- [ ] clarifications.md 빈 템플릿 생성
- [ ] CLAUDE.md 업데이트
- [ ] 다음 단계 안내
