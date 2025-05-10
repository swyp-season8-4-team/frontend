# 🐝 프로젝트 개요

### [디저비(Desserbee)](https://test.desserbee.com/ko/map)는

**지도를 통해 주변 가게를 탐색하고, 개인 취향에 맞는 가게 필터링을 제공하는 플랫폼**입니다.

- **카카오 맵 연동**을 통해 가까운 매장을 지도에서 직접 찾아볼 수 있습니다.
- 사용자는 회원가입 후 취향 설문을 하게되며, 이에 따라 지도에서 **선호 태그에 해당하는 가게를 필터링**할 수 있습니다.
- **검색 키워드에 따른 필터링** 또한 제공합니다.
- **커뮤니티 리뷰, 메이트 모집, 즐겨찾기 기능**으로 다른 사용자들과 경험을 공유하거나 새로운 가게를 발굴할 수 있습니다.
- **사장님 전용 대시보드**에서는 **매장 등록과 운영 관리, 쿠폰·공지 설정** 등이 가능해 비즈니스 측면에서도 활용할 수 있습니다.
- **Apple과 Kakao 소셜 로그인, 개인화된 마이페이지, 리뷰·댓글 기능** 등 다양한 요소들이 결합되어 **디저트 가게 탐색부터 커뮤니티 활동까지** 한곳에서 즐길 수 있는 통합 플랫폼을 제공합니다.

### 주요 기술적 특징

- **모노레포 기반 대규모 프론트엔드 프로젝트**
- **Next.js 기반 웹 애플리케이션**
- 디자인 시스템, 공통 유틸리티, API 통신 레이어, 서비스 레이어 등 모듈화된 구조
- 클린 아키텍처 적용
- 다국어(i18n) 지원
- Vercel 배포 환경 사용

---

# 🛠️ 사용 기술 스택

#### 프레임워크 / 라이브러리

![Next.js](https://img.shields.io/badge/Nextjs-000000?style=for-the-badge&logo=next&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge)

#### 빌드 및 개발 환경 도구

![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white) ![TurboRepo](https://img.shields.io/badge/TurboRepo-000000?style=for-the-badge) ![MSW](https://img.shields.io/badge/MSW-FF6A6A?style=for-the-badge)

#### 배포

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

# 📦 주요 패키지 및 역할

| 패키지                       | 역할 설명                                                        |
| ---------------------------- | ---------------------------------------------------------------- |
| `frontend`                   | 최종 사용자에게 보여지는 메인 프론트엔드 앱 (Next.js App Router) |
| `packages/api`               | API 요청 타입, 공통 fetcher, 비즈니스 API 정의                   |
| `packages/design-system`     | 공통 UI 컴포넌트 모음 (Button, Icon, Modal 등)                   |
| `packages/entity`            | 공통 데이터 타입 및 비즈니스 엔티티 정의                         |
| `packages/infrastructures`   | 외부 모듈과 통신하는 어댑터, 컨트롤러, 리포지토리                |
| `packages/locale`            | 다국어 번역 데이터 관리                                          |
| `packages/tailwind-config`   | Tailwind CSS 중앙 설정                                           |
| `packages/typescript-config` | TypeScript 설정 및 공유 config                                   |
| `packages/ui`                | 공통 UI 요소, hooks, context 등                                  |
| `packages/usecase`           | 서비스 로직 (예: authService, reviewService)                     |
| `packages/utility`           | 공통 유틸리티 함수 모음 (debounce, throttle 등)                  |

---

# 🔑 주요 기능 모듈

✅ **회원가입/로그인**

- Apple, Kakao 소셜 로그인 (OAuth)
- 일반 회원가입/로그인
- 비밀번호 찾기
- 일반/사장님 유저 통합 회원가입
  → 관련 경로: `/auth`, `/sign-up`, `/sign-in`, `/sign-out`

✅ **커뮤니티**

- 함께 디저트를 즐길 '디저트 메이트' 모집 게시판
- 먹어본 디저트 리뷰 게시판
- 커뮤니티 내 북마크, 카테고리 검색  
  → 관련 경로: `/community/dessert`, `/community/mate`, `/community/review`

✅ **지도 기반 기능**

- 카카오 맵 연동
- 매장 검색, 필터링, 위치 기반 탐색
- 매장 세부 정보, 메뉴, 리뷰, 즐겨찾기  
  → 관련 경로: `/map`, `/store`

✅ **마이페이지**

- 개인 정보 조회/수정
- 북마크 리스트
  → 관련 경로: `/my`

✅ **사장님 대시보드**

- 매장 등록
- 매장 기본 정보, 운영 시간, 메뉴 관리
- 대시보드용 공지, 쿠폰 관리  
  → 관련 경로: `/owner`, `/dashboard`

✅ **사용자 취향 등록**

- 취향 설문 기반 맞춤 추천  
  → 관련 경로: `/preference`

✅ **리뷰, 디저트 메이트**

- 매장 및 디저트에 대한 리뷰 작성/수정
- 댓글 기능, 북마크 기능
- 디저트 메이트 참여하기 기능
  → 관련 경로: `/review`, `/mate`

---

# 🌍 다국어 (i18n)

- `locale/src` 폴더에 `ko`, `en` 폴더로 언어별 JSON 파일 관리
- `i18nService`로 서비스 계층에서 언어 처리

---

# 📁 폴더 및 컴포넌트 관리 방식

- 페이지 단위 레이아웃 분리: `layout.tsx`
- 서버 컴포넌트 / 클라이언트 컴포넌트 구분
- `_components`, `_hooks`, `_contexts`로 모듈화
- `@repo` alias를 활용한 내부 패키지 참조

---

# 🚀 빌드 / 배포

- Vercel 배포: `vercel.json` 설정
- TurboRepo 기반 다중 패키지 빌드 관리
- pnpm workspace 기반 의존성 관리
