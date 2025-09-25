## ** day 30 과제 요구 사항 **

### **공통**

- [x] `day29` 폴더의 코드를 기반으로 `day30` 을 완성해 주세요.

### **게시글 목록**

- [x] 게시글 목록과 페이지네이션을 **두 개의 컴포넌트로 분리**해 주세요.
  - [x] **게시글 목록 컴포넌트**
    - **경로:** `src/components/boards-list/list`
    - 이미 존재하는 컴포넌트입니다.
  - [x] **페이지네이션 컴포넌트**
    - **새 파일 경로:** `src/components/boards-list/pagination`
    - 새로 추가해 주세요.

### **게시글 목록 – 페이지네이션**

- [x] 페이지네이션 컴포넌트를 구현해 주세요.
  - **경로:** `src/components/boards-list/pagination/index.tsx`
  - [x] **이전 페이지**와 **다음 페이지** 이동 기능이 정상 작동해야 합니다.
  - [x] **마지막 페이지**를 계산하여, 이전/다음 버튼 클릭 시 페이지 한계를 제한해 주세요.
  - [x] 페이지 번호는 **마지막 페이지까지만** 노출되도록 해 주세요.
  - [x] 현재 선택된 페이지 번호에 **색상을 적용**하여 사용자가 현재 페이지를 인지할 수 있도록 해 주세요.

### **게시글 목록 – 최종 조립**

- [x] 게시글 목록 페이지에 두 컴포넌트를 조립해 주세요.
  - **경로:** `src/app/boards/page.tsx`
  - 위에서 만든 **게시글 목록**과 **페이지네이션** 컴포넌트를 불러와서 조립합니다.
  - `state` 를 페이지 단으로 끌어올려 `data`, `refetch`, `lastPage` 등의 **변수 및 함수**를 두 컴포넌트가 적절히 공유할 수 있도록 해 주세요.

### **컴포넌트 리팩토링**

- [x] 페이지네이션 컴포넌트의 **타입스크립트 적용 및 파일 분리**를 진행해 주세요.
  - 타입 에러로 빨간 밑줄이 생기는 부분을 **타입 정의**로 해결해 주세요.
  - 유지보수를 위해 아래처럼 파일을 분리합니다.
    - hook.ts
    - index.tsx
    - queries.ts
    - styles.ts
    - types.ts

## ** day 31 과제 요구 사항 **

### 공통

- [x] `day30` 폴더의 코드를 기반으로 `day31` 를 완성해 주세요.

### 게시글 상세

- [x] 무한 스크롤 구현
  - **경로:** `src/components/boards-detail/comment-list/index.tsx`
  - [x] 스크롤을 내릴 때마다 추가 댓글을 불러오는 무한 스크롤 기능을 구현해 주세요.
  - [x] `react-infinite-scroll-component` 또는 `react-infinite-scroller` 라이브러리를 사용해 보세요.
- [x] 컴포넌트 분리 및 수정 기능 추가
  - [x] 경로: `src/components/boards-detail/comment-list/index.tsx`
  - [x] 댓글 목록 아이템을 별도의 컴포넌트로 분리해 주세요.
    - **새 파일 경로:** `src/components/boards-detail/comment-list-item/index.tsx`
  - [x] 댓글 아이템의 연필 아이콘을 클릭하면 수정 모드로 전환되도록 만들어 주세요.
    - 클릭 시, 해당 아이템이 **댓글 작성 컴포넌트**(`src/components/boards-detail/comment-write/index.tsx`)로 변경되어야 합니다.
    - 이때, 댓글 작성 컴포넌트에 `isEdit`과 같은 적절한 `props`를 전달하여 **수정 모드**임을 알려주세요.
- [x] 댓글 작성 컴포넌트 보완
  - **경로:** `src/components/boards-detail/comment-write/index.tsx`
  - [x] 전달받은 `props`(예: `isEdit`)에 따라 **'등록'**과 **'수정'** 기능을 분기 처리해 주세요.
  - [x] `[수정하기]` 버튼을 클릭하면 `GRAPHQL-API`의 `updateBoardComment`를 호출하여 댓글을 수정하세요.
  - [x] 댓글 수정 후, `fetchBoardComments`를 `refetch`하여 화면에 최신 댓글 목록을 표시해 주세요.



## ** day 32 과제 요구 사항 **

### **공통**

- [x]  `day31` 폴더의 코드를 기반으로 `day32` 을 완성해 주세요.

### **게시글 작성**

- [x]  게시글 작성 컴포넌트를 **리팩토링**해 주세요.
    - **경로:** `src/components/boards-write/index.tsx`
    - **제목·내용·글쓴이** 3개의 input을 **하나의 state**로 통합합니다.
    - 각 input의 변경을 처리하던 **세 개의 함수**도 하나의 함수로 통합합니다.

### **나만의 컨텐츠 목록 – 오픈 API**

- [x]  오픈 API를 사용해 **나만의 컨텐츠 목록** 페이지를 구현해 주세요.
    - **페이지 경로:** `src/app/openapis/page.tsx`
    - **컴포넌트 경로:** `src/components/openapis-list/index.tsx`
    - 오픈 API 종류는 자유입니다. (예: 강아지 목록, 고양이 목록 등)
    - 디자인, 무한 스크롤, 페이지네이션 등 기능에 **제한 없이 자유롭게 구현**합니다.
    - 페이지에서 직접 작성하지 말고, **컴포넌트를 만들어 조립**해 주세요.

### **컴포넌트 리팩토링**

- [x]  나만의 컨텐츠(오픈 API) 컴포넌트를 **타입스크립트 적용 및 파일 분리**로 보완해 주세요.
    - 타입 에러가 감지되는 부분을 타입 정의로 해결합니다.
    - 유지보수를 위해 아래와 같이 파일을 분리합니다.
        - hook.ts
        - index.tsx
        - queries.ts
        - styles.module.css
        - types.ts

        ## 과제 요구사항


## ** day 34 과제 요구 사항 **

- [x]  완성된 `day32` 폴더를 활용하여 `day34` 를 완성해 주세요. (day33 없어요 !)

### 나만의 컨텐츠 목록 만들기 (Supabase)

- [x]  **Supabase**를 이용해서 나만의 콘텐츠 목록을 만들고 아래 기능을 구현해 주세요.
    - [x]  목록 조회
    - [ ]  상세 조회
    - [x]  등록
    - [ ]  수정
    - [ ]  삭제
- [x ]  디자인이나 무한 스크롤, 페이지네이션 같은 추가 기능은 자유롭게 선택해서 구현하시면 됩니다.
- [x]  단, 페이지별 경로 및 컴포넌트 분리는 기존에 배운대로 진행해 주세요.
    - 목록 페이지: `src/app/myapis/page.tsx`
        - 목록 컴포넌트: `src/components/myapis-list/index.tsx`
    - 나머지 등록, 수정, 상세 페이지 및 컴포넌트도 동일해요.

### 컴포넌트 리팩토링

- [x]  작성한 컴포넌트 파일에 발생하는 타입 에러를 해결해 주세요.
- [x]  유지보수가 쉽도록 컴포넌트 파일을 아래 규칙에 맞춰 분리해 주세요.
    - `hooks.ts`
    - `index.tsx`
    - `queries.ts`
    - `styles.ts`
    - `types.ts`