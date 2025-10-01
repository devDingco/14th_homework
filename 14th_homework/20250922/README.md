# Triptalk 모노레포

Triptalk 프로젝트의 모노레포 구조입니다. UI 컴포넌트와 프론트엔드 애플리케이션을 관리합니다.

## 📁 프로젝트 구조

```
triptalk-monorepo/
├── packages/                    # 공통 패키지들
│   └── ui-components/          # UI 전용 패키지
│       ├── src/
│       │   ├── components/     # 공통 UI 컴포넌트들
│       │   │   ├── Navigation/
│       │   │   ├── Banner/
│       │   │   ├── Pagination/
│       │   │   ├── Loading/
│       │   │   └── Error/
│       │   ├── styles/         # 공통 스타일
│       │   ├── types/          # 공통 타입 정의
│       │   └── index.ts        # 패키지 진입점
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── apps/                       # 애플리케이션들
│   └── frontend/              # Next.js 프론트엔드 프로젝트
│       ├── src/
│       │   ├── components/
│       │   │   └── ui/        # UI 패키지에서 복사된 컴포넌트들
│       │   ├── types/
│       │   │   └── ui-components.ts
│       │   └── styles/
│       │       └── ui-components.css
│       ├── package.json
│       └── ...
├── package.json               # 루트 워크스페이스 설정
├── pnpm-workspace.yaml        # pnpm 워크스페이스 설정
└── README.md
```

## 🚀 시작하기

### 필수 요구사항

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 설치

```bash
# 의존성 설치
pnpm install
```

### 개발

```bash
# 프론트엔드 개발 서버 시작
pnpm dev

# UI 패키지 빌드
pnpm build:ui

# 프론트엔드 빌드
pnpm build:frontend

# 전체 빌드
pnpm build
```

## 📦 패키지 설명

### @triptalk/ui-components

공통 UI 컴포넌트 라이브러리입니다.

**포함된 컴포넌트:**
- **Navigation**: 네비게이션 바 컴포넌트
- **Banner**: 배너 슬라이더 컴포넌트  
- **Pagination**: 페이지네이션 컴포넌트
- **Loading**: 로딩 컴포넌트
- **Error**: 에러 컴포넌트

**사용법:**
```tsx
import { Navigation, Banner, Pagination } from '@triptalk/ui-components';

function App() {
  return (
    <div>
      <Navigation 
        isLoggedIn={true}
        user={{ picture: "/profile.jpg" }}
        onLogout={() => console.log('logout')}
      />
      <Banner 
        images={bannerImages}
        autoplay={true}
        autoplayDelay={3000}
      />
      <Pagination 
        currentPage={1} 
        totalPage={10} 
        onChangePage={(page) => console.log(page)} 
      />
    </div>
  );
}
```

### Frontend App

Next.js 기반의 프론트엔드 애플리케이션입니다.

**기능:**
- 게시판 관리
- 사용자 인증
- OpenAPI 관리
- 반응형 디자인

## 🛠️ 개발 가이드

### UI 컴포넌트 추가

1. `packages/ui-components/src/components/`에 새 컴포넌트 폴더 생성
2. 컴포넌트와 타입 정의 작성
3. `packages/ui-components/src/index.ts`에서 export
4. `packages/ui-components/src/styles/index.css`에 스타일 추가
5. UI 패키지 빌드: `pnpm build:ui`
6. 프론트엔드에서 사용

### 스타일 가이드

- CSS Modules 사용 권장
- Tailwind CSS 유틸리티 클래스 활용
- 반응형 디자인 고려
- 접근성(a11y) 준수

## 📝 스크립트

```bash
# 개발
pnpm dev                    # 프론트엔드 개발 서버
pnpm build:ui              # UI 패키지 빌드
pnpm build:frontend        # 프론트엔드 빌드

# 유틸리티
pnpm lint                  # 전체 프로젝트 린트
pnpm type-check           # 타입 체크
pnpm clean                # 빌드 파일 정리
```

## 🔧 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: Apollo Client, Zustand
- **UI Library**: Material-UI, Ant Design
- **Package Manager**: pnpm
- **Build Tool**: TypeScript Compiler

## 📄 라이선스

MIT License