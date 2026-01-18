# vibe-anchor

바이브 코딩의 컨텍스트 유지 문제를 해결하는 Claude Code용 도구

## 핵심 철학

```
"의도를 기록하고, 제약을 지키며, 작게 전진한다"
```

- **Intent-First**: 코드보다 의도를 먼저 기록
- **Constraint-Aware**: 수정 금지 사항을 명시적으로 관리
- **Small-Step**: 한 번에 하나의 작은 변경만

## 해결하는 문제

| 문제 | 해결책 |
|------|--------|
| 과거 코딩 의도 망각 | CLAUDE.md에 최근 의도 표시, AI 자동 로드 |
| 수정 금지 사항 위반 | CLAUDE.md 상단에 제약 명시 |
| 컨텍스트 초과 | 작은 태스크 분할, 가벼운 인덱스 파일 |
| A→B→A 순환 오류 | 시행착오 기록, 이전 실패 확인 |

## 설치

```bash
# npx로 바로 실행
npx vibe-anchor init

# 또는 전역 설치
npm install -g vibe-anchor
vibe-anchor init
```

## 사용법

### 1. 프로젝트 초기화

```bash
cd my-project
npx vibe-anchor init
```

이 명령은 다음을 생성합니다:
- `.claude/CLAUDE.md` - AI가 자동 로드하는 프로젝트 컨텍스트
- `.claude/commands/` - 7개의 slash commands
- `.vibe-anchor/` - 의도, 제약, 태스크 등 데이터

### 2. Claude Code에서 사용

프로젝트 디렉토리에서 Claude Code 실행 후:

```
/init        # 프로젝트 헌법 작성
/intent      # 코딩 의도 기록
/constraint  # 수정 금지 등록
/task        # 태스크 정의
/cycle       # TDD 사이클 (red/green/refactor/commit)
/review      # 세션 정리
/status      # 현재 상태 확인
```

## 워크플로우

```
[SDD - 설계]
    /init      → 프로젝트 원칙 정의
    /intent    → 코딩 의도 기록
    /task      → 작은 태스크 정의
         │
         ▼
[TDD - 구현]
    /cycle red      → 실패 테스트 작성
    /cycle green    → 최소 구현
    /cycle refactor → 리팩토링
    /cycle commit   → 커밋
         │
         ▼
[정리]
    /review    → 세션 요약, CLAUDE.md 업데이트
```

## 디렉토리 구조

설치 후 프로젝트 구조:

```
my-project/
├── .claude/
│   ├── CLAUDE.md              # AI 자동 로드
│   └── commands/              # slash commands
│       ├── init.md
│       ├── intent.md
│       ├── constraint.md
│       ├── task.md
│       ├── cycle.md
│       ├── review.md
│       └── status.md
│
├── .vibe-anchor/
│   ├── constitution.md        # 프로젝트 헌법
│   ├── intents/               # 의도 기록
│   │   └── _index.md
│   ├── constraints/           # 수정 금지 사항
│   │   └── global.md
│   ├── cycles/                # TDD 사이클
│   │   └── current.md
│   ├── tasks/                 # 태스크
│   │   ├── backlog.md
│   │   └── current.md
│   └── sessions/              # 세션 기록
│
└── src/                       # 실제 코드
```

## 주요 기능

### 의도 기록 (/intent)

"무엇을 왜 만드는가"를 기록하여 세션 간 컨텍스트 유지:

```markdown
# 의도: 로그인 기능 구현

## 목표
OAuth2 기반 소셜 로그인 구현

## 결정 사항
- Google, GitHub만 지원
- 토큰은 httpOnly 쿠키에 저장

## 시행착오
| 시도 | 결과 | 교훈 |
|------|------|------|
| localStorage 토큰 | XSS 취약 | httpOnly 사용 |

## 절대 하지 말 것
- localStorage에 토큰 저장 금지
```

### 수정 금지 관리 (/constraint)

AI가 변경하면 안 되는 코드 명시:

```markdown
## ⛔ 수정 금지 사항

- ⛔ `src/auth/token.ts` - 보안 감사 완료 (Critical)
- ⚠️ `src/api/v1/*` - API 하위 호환성 (Stable)
```

### TDD 사이클 (/cycle)

Kent Beck의 Red-Green-Refactor 사이클:

```
/cycle red      → 실패 테스트 1개 작성
/cycle green    → 테스트 통과하는 최소 코드
/cycle refactor → 코드 정리 (동작 변경 금지)
/cycle commit   → 커밋
```

## 기여

이슈와 PR을 환영합니다.

## 라이선스

MIT
