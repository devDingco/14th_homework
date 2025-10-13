## To-Do

### 게시글 등록/수정

- [x]  게시글 등록/수정 페이지에서 렌더링되는 게시글작성 컴포넌트 리팩토링
    - 주어진 폴더 경로에 파일을 만들고 코드를 적절히 이동
    - 폴더 경로: `src/components/boards-write`
    - 파일 목록:
        - hook.ts
        - index.tsx
        - queries.ts
        - styles.module.css
        - types.ts

### 게시글 상세

- [x]  게시글 상세 페이지에서 게시글 상세 컴포넌트를 불러오도록 리팩토링
    - 주어진 폴더 경로에 파일을 만들고 코드를 적절히 이동
    - 폴더 경로: `src/component/boards-detail`
    - 파일 목록:
        - hook.ts
        - index.tsx
        - queries.ts
        - styles.module.css
        - types.ts
- [x]  게시글 상세 페이지를 새롭게 만든 컴포넌트가 렌더링되도록 변경
    - 게시글 상세 페이지 경로: `app/boards/[boardId]/page.tsx`

### 게시글 목록

- [x]  게시글 목록 페이지에서 게시글 목록 컴포넌트를 불러오도록 리팩토링
    - 주어진 폴더 경로에 파일을 만들고 코드를 적절히 이동
    - 폴더 경로: `src/component/boards-list`
    - 파일 목록:
        - hook.ts
        - index.tsx
        - queries.ts
        - styles.module.css
        - types.ts

### 타입 스크립트

- [x]  GraphQL API와 관련된 데이터 타입 보완
- [x]  graphql-codegen 설치
- [x]  `codegen.ts` 파일 복사 후 아래 내용 변경
    - schema: `"http://main-practice.codebootcamp.co.kr/graphql"`
- [x]  `package.json`의 script에 실행 명령 추가
    - `"codegen"`: `"graphql-codegen --config codegen.ts"`
- [x]  codegen으로 생성된 타입이 적용된 Document로 모든 `useQuery`, `useMutation` 변경
    - `any` 타입으로 정의된 API 관련 데이터 타입 제거