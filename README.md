### Day 23 기본 요구사항

## 과제 요구 사항

### 공통

- [x] 완성된 `day25` 폴더를 활용하여 `day26` 을 완성해 주세요.
  - 폴더를 다시 생성할 필요는 없습니다 !
  - 해당 폴더에서 계속 작업해서 과제 제출해 주시면 됩니다.

### 게시글 등록/수정

- [x] 게시글 등록/수정 페이지에서 렌더링 되는 게시글작성 컴포넌트를 리팩토링해요.
  - 주어진 폴더 경로에 파일을 만들고 코드를 적절히 이동합니다.
  - 폴더 경로: `src/components/boards-write`
  - 파일 목록:
    - hook.ts
    - index.tsx
    - queires.ts
    - styles.module.css
    - types.ts

### 게시글 상세

- [x] 게시글 상세 페이지에서 게시글 상세 컴포넌트를 불러오도록 리팩토링해요.
  - 주어진 폴더 경로에 파일을 만들고 코드를 적절히 이동합니다.
  - 폴더 경로: `src/component/boards-detail`
  - 파일 목록:
    - hook.ts
    - index.tsx
    - queires.ts
    - styles.module.css
    - types.ts
- [x] 게시글 상세 페이지는 새롭게 만든 컴포넌트가 렌더링 될 수 있도록 변경합니다.
  - 게시글 상세 페이지 경로: `app/boards/[boardId]/page.tsx`

### 게시글 목록

- [x] 게시글 목록 페이지에서 게시글 목록 컴포넌트를 불러오도록 리팩토링해요.
  - 주어진 폴더 경로에 파일을 만들고 코드를 적절히 이동합니다.
  - 폴더 경로: `src/component/boards-list`
  - 파일 목록:
    - hook.ts
    - index.tsx
    - queires.ts
    - styles.module.css
    - types.ts

### 타입 스크립트

- [x] GraphQL API와 관련된 데이터의 타입을 모두 보완해요.
- [x] graphql-codegen 을 설치해요.
  - 명령어: `pnpm add --dev @graphql-codegen/cli`
- [x] `codegen.ts` 파일을 복사 후 아래 내용을 변경하세요.
  - schema: `"http://main-practice.codebootcamp.co.kr/graphql"`
- [x] `package.json` 의 script에 실행 명령을 추가해 주세요.
  - `"codegen"`: `"graphql-codegen --config codegen.ts"`
- [x] codegen 을 통해 생성한 타입이 적용된 Document 를 통해 모든 `useQuery`, `useMutation` 을 변경해요.
  - `any` 타입으로 정의된 API 관련 데이터 타입은 없어야 합니다.
  - 예시:
    - 게시글등록 => useMutation(CreateBoardDocument)
    - 게시글수정 => useMutation(UpdateBoardDocument)


## 과제 요구 사항

1. 공통
    - [ ]  완성된 `day26` 폴더를 활용하여 `day27` 을 완성해 주세요.
        - 폴더를 다시 생성할 필요는 없습니다 !
        - 해당 폴더에서 계속 작업해서 과제 제출해 주시면 됩니다.
        
2. 게시글 목록
    - [ ]  게시글 목록 관련 페이지 및 컴포넌트에 이벤트 버블링을 처리해 주세요.
        - 게시글 내용 뿐 아니라, 삭제 버튼을 제외한 게시글 목록 영역을 클릭해도 클릭한 게시글의 상세 페이지로 이동시켜 주세요.
        - 페이지 경로: `src/app/boards/page.tsx`
    
3. 게시글 상세
    - [ ]  게시글 상세 페이지에 사용될 댓글 영역 구현에 필요한 컴포넌트 2개를 추가로 만들어 주세요.
        - 아래 경로의 폴더는 생성해 주세요.
        - 댓글 목록 컴포넌트 경로: `src/components/boards-detail/comment-list`
        - 댓글 등록 컴포넌트 경로: `src/components/boards-detail/comment-write`
    - [ ]  기존에 구현한 게시글 상세 컴포넌트 관련 파일들을 아래 폴더 경로로 이동시켜 주세요.
        - 아래 경로의 폴더는 생성해 주세요.
        - 이동할 폴더 경로: `src/components/boards-detail/detail`
        - 파일 목록:
            - hook.ts
            - index.tsx
            - queries.ts
            - styles.module.css
            - types.ts
            
4. 게시글 상세[댓글 등록]
    
    ![스크린샷 2024-10-04 오전 11.45.53.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/9c9b02bc-6cb6-4924-bf38-dad25e0fe77b/a93821e5-22a6-4544-b794-a55d95d8d191/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.45.53.png)
    
    - src/components/boards-detail/comment-write/index.tsx 경로에 위 이미지의 댓글 등록 부분을 완성해 주세요.
    => 댓글 입력 후, 댓글등록 버튼을 누르면 GRAPHQL-API(createBoardComment)를 사용하여 댓글을 등록해 주세요.
    => 댓글이 등록된 후, 댓글을 목록에서 조회하기 위해 GRAPHQL-API(fetchBoardComments)를 리페치해 주세요.
    => 댓글이 등록된 후, 댓글입력창을 모두 초기화 합니다.
    => 별점, 아바타사진, 수정/삭제 아이콘은 아직 기능을 추가하진 않습니다.(따라서, 별점은 0점으로 등록합니다.)
5. 게시글 상세[댓글 목록 조회]
    
    ![스크린샷 2024-10-04 오전 11.46.28.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/9c9b02bc-6cb6-4924-bf38-dad25e0fe77b/3bfd811e-0bf2-44d0-9b93-b49746cdd2f5/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-10-04_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_11.46.28.png)
    
    - src/components/boards-detail/comment-list/index.tsx 경로에 위 이미지의 댓글목록 부분을 완성해 주세요.
    => GRAPHQL-API(fetchBoardComments)를 사용하여 댓글목록을 완성합니다.
    => 별점, 아바타사진, 수정/삭제 아이콘은 아직 기능을 추가하진 않습니다.(따라서, 별점은 0점으로 보여줍니다.)
6. 게시글상세[최종조립]
    - 게시글상세페이지 src/app/boards/[boardId]/page.tsx 경로의 파일을 수정합니다.
    => 해당 페이지에 위에서 만든 3개의 컴포넌트(게시글상세, 댓글등록, 댓글목록)를 불러와서 조립합니다.
7. 컴포넌트[리팩토링]
    - 게시글상세, 댓글등록, 댓글목록조회 컴포넌트의 파일을 보완해 주세요.
    => 타입에러가 감지되어 빨간 밑줄이 그어지는 부분에 타입스크립트를 적용하여 문제를 해결해 주세요.
    => 유지보수가 쉽도록 파일을 hook.ts, index.tsx, queries.ts, styles.ts, types.ts 로 분리해 주세요.