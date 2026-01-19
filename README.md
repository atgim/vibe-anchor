# vibe-anchor v0.2

바이브 코딩의 컨텍스트 유지 문제를 해결하는 Claude Code용 도구

## 핵심 철학

```
"명세를 기록하고, 시행착오를 남기며, 작게 전진한다"
```

- **Spec-First**: 코드보다 명세를 먼저 작성 (SDD)
- **Context-Aware**: 시행착오를 기록하여 수정 주의 관리
- **Small-Step**: TDD로 한 번에 하나씩 구현

## 해결하는 문제

| 문제 | 해결책 |
|------|--------|
| 과거 코딩 의도 망각 | `specs/*/spec.md`에 명세 기록, CLAUDE.md 자동 로드 |
| 수정 시 컨텍스트 상실 | `clarifications.md`에 시행착오 기록 → 수정 주의 반영 |
| 컨텍스트 초과 | 작은 태스크 분할, User Story 기반 개발 |
| A→B→A 순환 오류 | 시행착오 테이블로 이전 실패 확인 |

## 설치

```bash
# npx로 바로 실행
npx vibe-anchor init

# 또는 전역 설치
npm install -g vibe-anchor
vibe-anchor init

# GitHub에서 직접
npx github:atgim/vibe-anchor init
```

## 사용법

### 1. 프로젝트 초기화

```bash
cd my-project
npx vibe-anchor init
```

이 명령은 다음을 생성합니다:
- `.claude/CLAUDE.md` - AI가 자동 로드하는 프로젝트 컨텍스트
- `.claude/commands/` - 8개의 slash commands
- `specs/` - SDD 명세 저장 폴더
- `.vibe-anchor/` - TDD 사이클 등 데이터

### 2. Claude Code에서 사용

```
/init        # 프로젝트 원칙(Constitution) 작성
/specify     # 기능 명세 작성 (SDD)
/clarify     # 모호함 해소
/plan        # 기술 계획 수립
/tasks       # 태스크 분해
/cycle       # TDD 사이클 (red/green/refactor/commit)
/review      # 시행착오 기록 & 수정 주의 반영
/status      # 현재 상태 확인
```

## 워크플로우

```
[계획 - SDD]
    /init      → 프로젝트 원칙 정의
    /specify   → 기능 명세 작성 (User Story)
    /clarify   → 모호함 해소 (최대 5개 질문)
    /plan      → 기술 계획 수립
    /tasks     → 태스크 분해
         │
         ▼
[구현 - TDD]
    /cycle red      → 실패 테스트 작성
    /cycle green    → 최소 구현
    /cycle refactor → 리팩토링
    /cycle commit   → 커밋
         │
         ├── 시행착오 발생 시 → /review
         │
         ▼
[정리]
    /review    → 시행착오 기록, 수정 주의 반영
    /status    → 현재 상태 확인
```

## 디렉토리 구조

설치 후 프로젝트 구조:

```
my-project/
├── .claude/
│   ├── CLAUDE.md              # AI 자동 로드 (수정 주의 포함)
│   └── commands/              # slash commands
│       ├── init.md
│       ├── specify.md
│       ├── clarify.md
│       ├── plan.md
│       ├── tasks.md
│       ├── cycle.md
│       ├── review.md
│       └── status.md
│
├── specs/                     # SDD 산출물
│   └── 001-login-feature/
│       ├── spec.md            # 기능 명세 (WHAT & WHY)
│       ├── plan.md            # 기술 계획 (HOW)
│       ├── tasks.md           # 태스크 목록
│       └── clarifications.md  # 시행착오 & 수정 주의
│
├── .vibe-anchor/
│   └── cycles/
│       └── current.md         # TDD 사이클 상태
│
└── src/                       # 실제 코드
```

## 주요 기능

### 기능 명세 (/specify)

User Story 기반으로 "무엇을 왜 만드는가" 명세:

```markdown
# 기능 명세: 로그인

## User Stories
### US1: 소셜 로그인 (Priority: P1)
**As a** 사용자
**I want** Google/GitHub으로 로그인
**So that** 별도 회원가입 없이 서비스 이용

**Acceptance Criteria:**
- [ ] Google 로그인 버튼 표시
- [ ] 로그인 성공 시 대시보드 이동
```

### 시행착오 & 수정 주의 (/review)

시행착오를 기록하고, 수정 주의 사항을 자동 관리:

```markdown
# clarifications.md

## 시행착오
| 날짜 | 시도 | 결과 | 교훈 |
|------|------|------|------|
| 2026-01-19 | localStorage 토큰 | XSS 취약 | httpOnly 사용 |

## 수정 주의 파일
| 파일 | 이유 | 관련 시행착오 |
|------|------|---------------|
| src/auth/token.ts | 보안 검증 완료 | localStorage 실패 |
```

이 정보는 CLAUDE.md에 자동 반영되어, 새 세션에서 AI가 인지합니다:

```markdown
## 수정 주의 사항
| 파일 | 이유 | 관련 명세 |
|------|------|-----------|
| src/auth/token.ts | XSS 방지 httpOnly | specs/001-login/clarifications.md |
```

### TDD 사이클 (/cycle)

Kent Beck의 Red-Green-Refactor:

```
/cycle red      → 실패 테스트 1개 작성
/cycle green    → 테스트 통과하는 최소 코드
/cycle refactor → 코드 정리 (동작 변경 금지)
/cycle commit   → 커밋
```

## v0.1 → v0.2 변경사항

| 항목 | v0.1 | v0.2 |
|------|------|------|
| SDD 반영 | /intent만 | /specify, /clarify, /plan |
| 수정 관리 | /constraint (별도) | clarifications.md (시행착오 기반) |
| 구조 | .vibe-anchor 중심 | specs/ 폴더 (명세 기반) |

## 기여

이슈와 PR을 환영합니다.

## 라이선스

MIT
