---
description: 태스크 분해
---

# /tasks - 태스크 분해

계획을 실행 가능한 작은 태스크로 분해합니다.

## 사용법

```
/tasks
/tasks {User Story 번호}
```

예시:
```
/tasks            # 전체 태스크 생성
/tasks US1        # 특정 User Story만
```

## 프로세스

### 1. 입력 분석

다음 파일을 읽습니다:
- `specs/{current}/spec.md` - User Stories, 요구사항
- `specs/{current}/plan.md` - 기술 스택, 아키텍처

### 2. 태스크 분해 원칙

**작은 단위로 분해:**
- 각 태스크는 **독립적으로 테스트 가능**해야 함
- 가능하면 **파일 1-2개만 수정**
- **명확한 완료 조건** 포함

**Phase 구분:**
1. **Setup**: 프로젝트 구조, 의존성
2. **Foundational**: 데이터 모델, 기본 서비스
3. **User Stories**: US별로 그룹화
4. **Polish**: 테스트, 문서화, 리팩토링

### 3. 태스크 ID 규칙

```
T{번호}: {설명}
T001: 프로젝트 구조 생성
T002: [US1] 로그인 폼 컴포넌트
T003: [US1][P] 로그인 API 호출 (P = Parallel 가능)
```

### 4. 파일 생성

`specs/{id}-{slug}/tasks.md` 생성 또는 업데이트

## 산출물: tasks.md

```markdown
# 태스크: {feature-name}

## 메타
- 명세: {id}-{slug}
- 생성일: {date}
- 총 태스크: {n}개

## 태스크 목록

### Phase 1: Setup
- [ ] T001: 프로젝트 구조 생성 (src/auth/)
- [ ] T002: 의존성 설치 (bcrypt, jwt)

### Phase 2: Foundational
- [ ] T003: User 타입 정의 (src/types/auth.ts)
- [ ] T004: Session 타입 정의 (src/types/auth.ts)

### Phase 3: User Story 1 - 로그인
- [ ] T005: [US1] 로그인 폼 UI (src/components/LoginForm/)
- [ ] T006: [US1] useAuth 훅 (src/hooks/useAuth.ts)
- [ ] T007: [US1] authService (src/services/authService.ts)
- [ ] T008: [US1] 로그인 API 연동

### Phase 4: Polish
- [ ] T009: 단위 테스트 작성
- [ ] T010: 통합 테스트 작성

## 의존성 그래프
```
T001 → T002 → T003/T004 (병렬)
                  ↓
            T005/T006/T007 (병렬)
                  ↓
                T008
                  ↓
            T009/T010 (병렬)
```

## 현재 태스크
(없음)

## 진행 상황
| 태스크 | 상태 | 시작일 | 완료일 |
|--------|------|--------|--------|
| | | | |
```

## CLAUDE.md 업데이트

"현재 작업" 섹션 업데이트:
- 명세: {id}-{slug}
- 태스크: T001 (첫 번째 태스크)
- TDD 상태: 대기

## 다음 단계

태스크 분해 완료 후 → `/cycle red`로 TDD 시작

## 완료 조건

- [ ] spec.md, plan.md 분석
- [ ] Phase별 태스크 분해
- [ ] 의존성 그래프 작성
- [ ] tasks.md 생성
- [ ] CLAUDE.md 업데이트
- [ ] `/cycle red` 안내
