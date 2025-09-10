
# TRip TRip ✈️🏨

![Next.js](https://img.shields.io/badge/Next.js-14.2.8-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18.3.1-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?logo=typescript&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?logo=graphql&logoColor=white)
![Apollo Client](https://img.shields.io/badge/Apollo%20Client-3.11.8-311C87?logo=apollo-graphql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.10-06B6D4?logo=tailwindcss&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)
![License](https://img.shields.io/badge/Copyright-CodeCamp-blue)

---

## 📌 프로젝트 개요
**TRip TRip**은 여행자와 숙소 제공자를 연결하는 **여행 커뮤니티 & 커머스 플랫폼**입니다.

### 🎯 주요 기능
- **🗣️ 트립토크**: 여행지 소식 공유 & 커뮤니티 기능
- **🏨 숙소 예약**: 원하는 숙소를 검색·예약
- **💼 숙소 등록**: 숙소 제공자를 위한 등록 및 판매 기능
- **👤 마이페이지**: 개인 정보 관리, 예약 내역, 포인트 관리
- **🔐 인증 시스템**: JWT 토큰 기반 로그인/회원가입

---

## 🏗️ 아키텍처

### 📁 프로젝트 구조
```
my-trip-app/
├── app/                          # Next.js 13+ App Router
│   ├── _types/                   # TypeScript 타입 정의
│   ├── (components)/             # 재사용 가능한 컴포넌트
│   │   ├── banner/              # 배너 컴포넌트
│   │   ├── cardList/            # 카드 리스트 컴포넌트
│   │   ├── comment/             # 댓글 시스템
│   │   ├── header/              # 헤더 컴포넌트
│   │   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── modal/               # 모달 컴포넌트들
│   │   └── pagination/          # 페이지네이션
│   ├── auth/                    # 인증 페이지 (로그인/회원가입)
│   ├── board/                   # 게시판 기능
│   │   ├── [id]/               # 게시글 상세
│   │   ├── edit/               # 게시글 수정
│   │   └── post/               # 게시글 작성
│   ├── commons/                 # 공통 유틸리티
│   │   ├── apis/               # API 호출 함수들
│   │   ├── graphql/            # GraphQL 설정 및 쿼리
│   │   ├── hooks/              # 커스텀 훅
│   │   └── services/           # 비즈니스 로직
│   ├── mypage/                  # 마이페이지
│   └── product/                 # 상품(숙소) 관련 페이지
├── public/                      # 정적 파일
│   ├── icons/                  # SVG 아이콘
│   └── images/                 # 이미지 파일
└── 설정 파일들
```

### 🔧 기술 스택

#### Frontend
- **Framework**: Next.js 14.2.8 (App Router)
- **Language**: TypeScript 5.6.2
- **UI Library**: React 18.3.1
- **Styling**: TailwindCSS 3.4.10, CSS Modules
- **State Management**: Apollo Client Cache
- **Form Handling**: React Hook Form 7.53.0

#### Backend Integration
- **API**: GraphQL with Apollo Client 3.11.8
- **Authentication**: JWT Token 기반 인증
- **File Upload**: Apollo Upload Client
- **Data Fetching**: Server-Side Rendering (SSR)

#### Development Tools
- **Code Generation**: GraphQL Code Generator
- **Testing**: Jest, React Testing Library, MSW
- **Linting**: ESLint
- **Package Manager**: npm/yarn

#### UI/UX Features
- **Responsive Design**: Desktop, Tablet, Mobile 대응
- **Rich Text Editor**: React Quill
- **Infinite Scroll**: React Infinite Scroll Component
- **Address Search**: Daum Postcode API
- **Virtualization**: React Window (성능 최적화)

---

## 🚀 시작하기

### 설치 및 실행
```bash
# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev

# GraphQL 코드 생성
npm run codegen
```

### 환경 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:
```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://main-practice.codebootcamp.co.kr/graphql
```

---

## 🧪 테스트

### 테스트 실행
```bash
# 단위 테스트 실행
npm test

# 테스트 커버리지 확인
npm run test:coverage
```

### 테스트 도구
- **Jest**: JavaScript 테스트 프레임워크
- **React Testing Library**: React 컴포넌트 테스트
- **MSW**: API 모킹

### 로그인 테스트 계정
```
이메일: user1@example.com
비밀번호: P@ssword123!
```

---

## 📋 주요 기능 상세

### 🏠 메인 페이지
- 베스트 게시글 카드 리스트
- 트립토크 게시판 목록
- 페이지네이션 지원

### 🗣️ 트립토크 (게시판)
- 게시글 작성/수정/삭제
- 댓글 및 대댓글 시스템
- 로그인 필수 기능
- 실시간 데이터 바인딩

### 🏨 숙소 관리 (작업중)
- 숙소 목록 조회
- 숙소 상세 정보
- 숙소 등록 (판매자용)
- 지역별 필터링

### 👤 마이페이지 (작업중)
- 예약 내역 & 북마크 관리
- 포인트 관리
- 비밀번호 변경
- 개인정보 수정

### 🔐 인증 시스템
- JWT 토큰 기반 인증
- 자동 로그인 유지
- 권한별 접근 제어
- 로그인 필수 모달

---

## 📈 개발 히스토리

### 최근 업데이트 (2024년 9월)
- **2024.09.08**: 댓글 작성 시 로그인 필수 기능 및 로그인 필요 모달 추가
- **2024.09.08**: 게시글 상세 페이지에 링크 및 주소 정보 모달 기능 추가
- **2024.09.08**: 헤더 컴포넌트에 토큰 기반 유저 인증 및 실시간 데이터 바인딩 구현
- **2024.09.08**: 댓글 CRUD 기능 구현 및 API 연동

### 주요 개발 단계
- **2024.09.04**: 페이지네이션 게시글 리스트 API 연동
- **2024.09.04**: 로그인 API 연동, 게시글 작성/상세 불러오기 연동, 베스트게시글 컴포넌트 API 연동
- **2024.09.03**: 마이페이지 레이아웃, 테이블 컴포넌트 구현
- **2024.08.28**: 댓글, 대댓글 컴포넌트 구현, 상품등록페이지 UI 작업
- **2024.08.27**: 상품 상세페이지 UI, TypeScript 마이그레이션 (.jsx → .tsx)
- **2024.08.26**: 상품 페이지 데스크탑 UI 구현
- **2024.08.21**: 게시글 작성, 게시글 상세페이지 UI 추가
- **2024.08.19**: 메인페이지 UI, 로그인, 회원가입 페이지 UI 구현완료

---

## 📂 코딩 컨벤션

### 네이밍 규칙
- **CSS 클래스명**: `snake_case`
- **파일명**: `camelCase`
- **컴포넌트명**: `PascalCase`
- **변수/함수명**: `camelCase`

### 폴더 구조 규칙
- 기능별로 폴더 분리
- 컴포넌트는 `(components)` 폴더에 집중
- 타입 정의는 `_types` 폴더에 관리
- 공통 유틸리티는 `commons` 폴더에 배치

### Commit 규칙
```bash
git commit -m "[YY:MM:DD] 추가된 기능 설명"

# 예시
git commit -m "[24:09:08] 댓글 작성 시 로그인 필수 기능 추가"
```

---

## 🔗 관련 링크
- **GraphQL Endpoint**: https://main-practice.codebootcamp.co.kr/graphql
- **개발 환경**: http://localhost:3000

---

## 📄 라이센스
Copyright © CodeCamp. All rights reserved.
