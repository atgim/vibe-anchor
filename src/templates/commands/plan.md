---
description: 기술 계획 수립
---

# /plan - 기술 계획

명세를 기술적으로 어떻게 구현할지 계획합니다.

## 사용법

```
/plan
```

## 프로세스

### 1. spec.md 분석

현재 명세에서 추출:
- User Stories
- Functional Requirements
- Non-Functional Requirements
- 결정된 사항 (clarifications.md)

### 2. 기술 스택 결정 (선택지 + 비교 제공)

**중요: 비개발자도 이해할 수 있도록 각 선택지의 장단점을 명확히 비교해야 합니다.**

#### 질문 1: 프로젝트 유형
```
어떤 종류의 프로젝트인가요?

1. 웹사이트/웹앱 (추천)
   - 브라우저에서 실행
   - 별도 설치 없이 URL로 접근

2. 모바일 앱
   - 스마트폰에 설치
   - 앱스토어 배포 필요

3. 데스크톱 프로그램
   - PC에 설치하는 프로그램

4. 잘 모르겠음 → 웹사이트로 진행
```

#### 질문 2: 웹 프레임워크 (웹 선택 시)
```
웹 프레임워크를 선택해주세요:

1. React (추천)
   - 장점: 자료가 가장 많음, AI가 가장 잘 도와줄 수 있음
   - 단점: 초기 개념이 약간 복잡함

2. Vue
   - 장점: 문법이 직관적, 배우기 쉬움
   - 단점: React보다 참고 자료 적음

3. 순수 HTML/CSS/JS
   - 장점: 가장 단순, 프레임워크 학습 불필요
   - 단점: 복잡한 기능 구현이 어려움

4. 잘 모르겠음 → React로 진행
```

#### 질문 3: 데이터 저장
```
데이터를 어디에 저장할까요?

1. 브라우저 저장소 (추천 - MVP용)
   - 장점: 서버 없이 바로 사용 가능, 무료
   - 단점: 다른 기기에서 접근 불가, 브라우저 삭제 시 데이터 손실

2. 클라우드 DB (Supabase/Firebase)
   - 장점: 어디서든 접근, 데이터 안전
   - 단점: 초기 설정 필요, 사용량 따라 비용 발생

3. 잘 모르겠음 → 브라우저 저장소로 시작
```

### 3. 아키텍처 설계

기술 스택 결정 후:
- 폴더 구조 제안
- 주요 컴포넌트 설계
- 데이터 흐름 설계
- **폴더별 진입점 파일에 명세 링크 주석 계획**

**코딩 스타일은 해당 언어/프레임워크의 표준 컨벤션을 자동 적용합니다.**
(사용자가 별도 요청 시에만 변경)

### 3-1. 폴더 진입점 명세 링크

**중요**: 각 폴더의 진입점 파일(index.ts 등)에 명세 링크 주석을 추가합니다.

**이유**:
- 하위 폴더의 CLAUDE.md는 자동 로드되지 않음
- 코드를 읽을 때 자연스럽게 관련 명세 확인 가능
- 폴더의 역할과 설계 의도를 코드와 함께 관리

**주석 형식**:
```typescript
/**
 * [설계] specs/{id}-{slug}/plan.md
 *
 * {폴더 설명}
 * - {하위 모듈 1}: {역할}
 * - {하위 모듈 2}: {역할}
 */
```

**예시**:
```typescript
// src/auth/index.ts

/**
 * [설계] specs/001-login/plan.md
 *
 * 인증 관련 모듈
 * - useAuth: 인증 상태 관리 훅
 * - authService: 로그인/로그아웃 API 호출
 * - types: User, Session 타입 정의
 */

export * from './useAuth';
export * from './authService';
export * from './types';
```

### 4. 파일 생성

`specs/{id}-{slug}/plan.md` 생성

## 산출물: plan.md

```markdown
# 기술 계획: {feature-name}

## 메타
- 명세: {id}-{slug}
- 생성일: {date}

## 기술 스택
- 유형: 웹앱
- 프레임워크: React 18 + TypeScript
- 스타일링: Tailwind CSS
- 데이터 저장: localStorage (MVP)

## 폴더 구조
```
src/
├── components/     # UI 컴포넌트
│   └── LoginForm/
├── hooks/          # 재사용 로직
│   └── useAuth.ts
├── services/       # 외부 연동
│   └── authService.ts
└── types/          # 타입 정의
    └── auth.ts
```

## 폴더 진입점 명세 링크

| 폴더 | 진입점 파일 | 명세 링크 |
|------|-------------|-----------|
| src/components/ | index.ts | specs/001-login/plan.md |
| src/hooks/ | index.ts | specs/001-login/plan.md |
| src/services/ | index.ts | specs/001-login/plan.md |

## 주요 컴포넌트
| 컴포넌트 | 역할 |
|----------|------|
| LoginForm | 로그인 폼 UI |
| useAuth | 인증 상태 관리 |
| authService | API 호출 |

## 데이터 흐름
```
사용자 입력 → LoginForm → useAuth → authService → 저장소
```

## 코딩 스타일
- React/TypeScript 표준 컨벤션 적용
- Prettier 자동 포맷팅
```

## 프로젝트 원칙 검증

계획이 프로젝트 원칙을 따르는지 확인:

```
[O] TDD 원칙: 테스트 먼저 작성 예정
[O] 단순함 우선: 최소한의 라이브러리만 사용
[O] 점진적 개발: Phase별로 나눠 구현
```

## 다음 단계

계획 완료 후 → `/tasks`로 태스크 분해

## 완료 조건

- [ ] spec.md 분석 완료
- [ ] 기술 스택 결정 (선택지 비교 제공)
- [ ] 아키텍처 설계
- [ ] 폴더 진입점 명세 링크 계획
- [ ] plan.md 생성
- [ ] 프로젝트 원칙 검증
- [ ] `/tasks` 안내
