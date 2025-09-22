## ** day 30 과제 요구 사항 **

### **공통**

- [x]  `day29` 폴더의 코드를 기반으로 `day30` 을 완성해 주세요.

### **게시글 목록**

- [x]  게시글 목록과 페이지네이션을 **두 개의 컴포넌트로 분리**해 주세요.
    - [x]  **게시글 목록 컴포넌트**
        - **경로:** `src/components/boards-list/list`
        - 이미 존재하는 컴포넌트입니다.
    - [x]  **페이지네이션 컴포넌트**
        - **새 파일 경로:** `src/components/boards-list/pagination`
        - 새로 추가해 주세요.

### **게시글 목록 – 페이지네이션**

- [ ]  페이지네이션 컴포넌트를 구현해 주세요.
    - **경로:** `src/components/boards-list/pagination/index.tsx`
    - [ ]  **이전 페이지**와 **다음 페이지** 이동 기능이 정상 작동해야 합니다.
    - [ ]  **마지막 페이지**를 계산하여, 이전/다음 버튼 클릭 시 페이지 한계를 제한해 주세요.
    - [ ]  페이지 번호는 **마지막 페이지까지만** 노출되도록 해 주세요.
    - [ ]  현재 선택된 페이지 번호에 **색상을 적용**하여 사용자가 현재 페이지를 인지할 수 있도록 해 주세요.

### **게시글 목록 – 최종 조립**

- [ ]  게시글 목록 페이지에 두 컴포넌트를 조립해 주세요.
    - **경로:** `src/app/boards/page.tsx`
    - 위에서 만든 **게시글 목록**과 **페이지네이션** 컴포넌트를 불러와서 조립합니다.
    - `state` 를 페이지 단으로 끌어올려 `data`, `refetch`, `lastPage` 등의 **변수 및 함수**를 두 컴포넌트가 적절히 공유할 수 있도록 해 주세요.

### **컴포넌트 리팩토링**

- [ ]  페이지네이션 컴포넌트의 **타입스크립트 적용 및 파일 분리**를 진행해 주세요.
    - 타입 에러로 빨간 밑줄이 생기는 부분을 **타입 정의**로 해결해 주세요.
    - 유지보수를 위해 아래처럼 파일을 분리합니다.
        - hook.ts
        - index.tsx
        - queries.ts
        - styles.ts
        - types.ts




## ** day 30 과제 요구 사항 **

### 공통

- [ ]  `day30` 폴더의 코드를 기반으로 `day31` 를 완성해 주세요.

### 게시글 상세

- [ ]  무한 스크롤 구현
    - **경로:** `src/components/boards-detail/comment-list/index.tsx`
    - [ ]  스크롤을 내릴 때마다 추가 댓글을 불러오는 무한 스크롤 기능을 구현해 주세요.
    - [ ]  `react-infinite-scroll-component` 또는 `react-infinite-scroller` 라이브러리를 사용해 보세요.
- [ ]  컴포넌트 분리 및 수정 기능 추가
    - [ ]  경로: `src/components/boards-detail/comment-list/index.tsx`
    - [ ]  댓글 목록 아이템을 별도의 컴포넌트로 분리해 주세요.
        - **새 파일 경로:** `src/components/boards-detail/comment-list-item/index.tsx`
    - [ ]  댓글 아이템의 연필 아이콘을 클릭하면 수정 모드로 전환되도록 만들어 주세요.
        - 클릭 시, 해당 아이템이 **댓글 작성 컴포넌트**(`src/components/boards-detail/comment-write/index.tsx`)로 변경되어야 합니다.
        - 이때, 댓글 작성 컴포넌트에 `isEdit`과 같은 적절한 `props`를 전달하여 **수정 모드**임을 알려주세요.
- [ ]  댓글 작성 컴포넌트 보완
    - **경로:** `src/components/boards-detail/comment-write/index.tsx`
    - [ ]  전달받은 `props`(예: `isEdit`)에 따라 **'등록'**과 **'수정'** 기능을 분기 처리해 주세요.
    - [ ]  `[수정하기]` 버튼을 클릭하면 `GRAPHQL-API`의 `updateBoardComment`를 호출하여 댓글을 수정하세요.
    - [ ]  댓글 수정 후, `fetchBoardComments`를 `refetch`하여 화면에 최신 댓글 목록을 표시해 주세요.