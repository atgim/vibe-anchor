---
description: 기술 계획 수립
---

# /plan - 기술 계획

명세를 기술적으로 어떻게 구현할지 계획합니다.

## 사용법

```
/plan
/plan {기술 스택 힌트}
```

예시:
```
/plan                           # 기술 선택부터 시작
/plan React + TypeScript        # 기술 스택 힌트 제공
/plan 기존 인증 시스템 활용     # 제약 조건 명시
```

## 프로세스

### 1. spec.md 분석

현재 명세에서 추출:
- User Stories
- Functional Requirements
- Non-Functional Requirements
- 결정된 사항 (clarifications.md)

### 2. 기술 결정

다음을 질문:

1. **언어/프레임워크**: "사용할 언어와 프레임워크는?"
   - 예: TypeScript + React, Python + FastAPI

2. **데이터 저장**: "데이터를 어떻게 저장하나요?"
   - 예: PostgreSQL, SQLite, localStorage

3. **외부 의존성**: "사용할 외부 라이브러리/서비스는?"
   - 예: Auth0, Stripe, AWS S3

### 3. 아키텍처 설계

- 컴포넌트 구조
- 데이터 흐름
- API 설계 (필요시)

### 4. 파일 생성

`specs/{id}-{slug}/plan.md` 생성

## 산출물: plan.md

```markdown
# 기술 계획: {feature-name}

## 메타
- 명세: {id}-{slug}
- 생성일: {date}

## 기술 스택
- 언어: TypeScript
- 프레임워크: React 18
- 상태 관리: Zustand
- API: REST

## 아키텍처

### 컴포넌트 구조
```
src/
├── components/
│   └── LoginForm/
├── hooks/
│   └── useAuth.ts
├── services/
│   └── authService.ts
└── types/
    └── auth.ts
```

### 데이터 흐름
```
User → LoginForm → useAuth → authService → API
                                    ↓
                              Token 저장 (httpOnly)
```

## 데이터 모델

### 엔티티
| 엔티티 | 설명 | 주요 필드 |
|--------|------|-----------|
| User | 사용자 | id, email, name |
| Session | 세션 | id, userId, token, expiresAt |

## API 설계

### 엔드포인트
| Method | Path | 설명 |
|--------|------|------|
| POST | /auth/login | 로그인 |
| POST | /auth/logout | 로그아웃 |
| GET | /auth/me | 현재 사용자 |

## 의존성
- bcrypt: 비밀번호 해싱
- jsonwebtoken: JWT 생성/검증

## 리스크 & 대응
| 리스크 | 영향 | 대응 |
|--------|------|------|
| 토큰 탈취 | 높음 | httpOnly + SameSite |
```

## Constitution 검증

계획이 프로젝트 원칙(Constitution)을 따르는지 확인:

```
✅ TDD 원칙: 테스트 먼저 작성 예정
✅ 보안 원칙: httpOnly 쿠키 사용
⚠️ 라이브러리 최소화: bcrypt, jwt만 사용 (정당화됨)
```

## 다음 단계

계획 완료 후 → `/tasks`로 태스크 분해

## 완료 조건

- [ ] spec.md 분석 완료
- [ ] 기술 스택 결정
- [ ] 아키텍처 설계
- [ ] plan.md 생성
- [ ] Constitution 검증
- [ ] `/tasks` 안내
