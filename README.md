## Day 26 과제 요구 사항

1. 공통
    - [x]  완성된 `day26` 폴더를 활용하여 `day27` 을 완성해 주세요.
        - 폴더를 다시 생성할 필요는 없습니다 !
        - 해당 폴더에서 계속 작업해서 과제 제출해 주시면 됩니다.
        
2. 게시글 목록
    - [x]  게시글 목록 관련 페이지 및 컴포넌트에 이벤트 버블링을 처리해 주세요.
        - 게시글 내용 뿐 아니라, 삭제 버튼을 제외한 게시글 목록 영역을 클릭해도 클릭한 게시글의 상세 페이지로 이동시켜 주세요.
        - 페이지 경로: `src/app/boards/page.tsx`
    
3. 게시글 상세
    - [x]  게시글 상세 페이지에 사용될 댓글 영역 구현에 필요한 컴포넌트 2개를 추가로 만들어 주세요.
        - 아래 경로의 폴더는 생성해 주세요.
        - 댓글 목록 컴포넌트 경로: `src/components/boards-detail/comment-list`
        - 댓글 등록 컴포넌트 경로: `src/components/boards-detail/comment-write`
    - [x]  기존에 구현한 게시글 상세 컴포넌트 관련 파일들을 아래 폴더 경로로 이동시켜 주세요.
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
    => 별점, 아바타사진, 수정/삭제 아이콘은 아직 기능을 추가하진 않습니다.(따라서, 별점은 0점으로 보여줍니다.)x
6. 게시글상세[최종조립]
    - 게시글상세페이지 src/app/boards/[boardId]/page.tsx 경로의 파일을 수정합니다.
    => 해당 페이지에 위에서 만든 3개의 컴포넌트(게시글상세, 댓글등록, 댓글목록)를 불러와서 조립합니다.
7. 컴포넌트[리팩토링]
    - 게시글상세, 댓글등록, 댓글목록조회 컴포넌트의 파일을 보완해 주세요.
    => 타입에러가 감지되어 빨간 밑줄이 그어지는 부분에 타입스크립트를 적용하여 문제를 해결해 주세요.
    => 유지보수가 쉽도록 파일을 hook.ts, index.tsx, queries.ts, styles.ts, types.ts 로 분리해 주세요.

## Day 27 과제 요구사항

### 공통

- [x]  완성된 `day26` 폴더를 활용하여 `day27` 을 완성해 주세요.

---

### 게시글 목록 (공통)

- [x]  게시글 목록 컴포넌트 (`boards-list`)를 **게시글 목록**과 **배너** 두 개의 하위 컴포넌트로 분리해요.
    - 목록: `src/components/boards-list/list`
    - 배너: `src/components/boards-list/banner`
- [x]  기존 `boards-list` 컴포넌트의 모든 관련 파일을 새로 생성된 `src/components/boards-list/list` 폴더로 옮겨주세요.
    - **이동할 파일**:
        - `hook.ts`
        - `index.tsx`
        - `queries.ts`
        - `styles.module.css`
        - `types.ts`

### 게시글 목록 (조립)

- [x]  위에서 생성한 **배너**와 **게시글 목록** 컴포넌트를 불러와 완성된 게시글 목록 페이지를 구성해 주세요.
    - [x]  **경로:** `src/app/boards/page.tsx`

---

### 게시글 목록 (배너)

- [x]  배너 UI를 구현해 주세요.
    - [x]  경로: `src/components/boards-list/banner/index.tsx`
    - [x]  여러 이미지가 슬라이드 되도록 캐러셀(carousel) 라이브러리를 사용해 주세요. **Swiper** 또는 **react-slick**을 추천해요.

---

### 게시글 등록

- [x]  경로: `src/components/boards-write/index.tsx`
- [x]  우편번호 및 주소 등록 기능을 추가해 주세요.
    - [x]  해당 기능 구현을 위해 `react-daum-postcode` 라이브러리를 사용해 주세요.
    - [x]  `[우편번호 검색]` 버튼을 누르면 모달로 우편 번호 검색 화면이 나오도록 구현해 주세요.
    - [x]  우편 번호의 검색이 끝나면, ‘`우편 번호`’와 ‘`기본 주소`’ 2개는 각각의 인풋에 `value` 값으로 추가해 주세요.
    - [x]  상세 주소는 사용자가 직접 입력하도록 구현해 주세요.
    - [x]  게시글 등록 API `createBoard` 를 통해 우편 번호, 기본 주소, 상세 주소를 함께 전송하도록 추가해 주세요.
    - [x]  ‘`우편 번호`’, ‘`기본 주소`’, ‘`상세 주소`’는 필수입력이 아니므로, 입력되지 않아도 게시글은 등록되어야 합니다.
- [x]  유튜브 주소 등록 기능을 추가해 주세요.

### 게시글 수정

- [x]  **경로:** `src/app/boards/[boardId]/edit/page.tsx` or `관련 컴포넌트 경로`
- [x]  우편번호 및 주소 수정 기능을 추가해 주세요.
    - [x]  게시글 등록 시 입력 되었던 값을 `fetchBoard` API를 사용하여 불러와 주세요.
    - [x]  우편 번호, 기본 주소, 상세 주소가 존재하는 경우 해당 인풋에 초기 값으로 데이터를 바인딩 해주세요.
    - [x]  우편 번호 검색을 다시 클릭하여 변경한 경우 기존에 입력된 값이 변경돼야해요.
    - [x]  `[수정하기]` 버튼 클릭 시 `updateBoard` API를 통해 우편 번호, 기본 주소, 상세 주소가 함께 전송되어 수정 사항에 반영돼야 해요.
- [x]  유튜브 주소 수정 기능을 추가해 주세요.

---

### 게시글 상세

- [x]  게시글 상세 페이지의 **좋아요, 싫어요 아이콘**을 수정해 주세요.
    - [x]  **경로:** `src/app/boards/[boardId]/page.tsx` or `관련 컴포넌트 경로`
    - [x]  기존 이미지로 구현한 아이콘이 아닌 UI 라이브러리의 아이콘 컴포넌트를 활용해 주세요.
        - 라이브러리 제한은 없으며, MUI 또는 Ant Design 사용을 추천해요.
        - 개인의 취향에 맞는 아이콘으로 자유롭게 변경해도 좋아요.
- [x]  우편번호 및 주소 조회 기능을 추가해 주세요.
    - [x]  우편번호, 기본주소, 상세 주소가 조회될 수 있도록 구현해 주세요.
        - [x]  주소 아이콘에 마우스를 올리면, 라이브러리를 사용하여 주소를 `tooltip` 으로 보여주세요.
            - 라이브러리 제한은 없어요.
        - [x]  우편 번호, 기본 주소, 상세 주소 중 사용자에게 필요한 정보가 무엇인지 고민해보고, 보여주고 싶은 내용을 선택하여 보여주세요.
- [x]  게시글 등록 시 작성한 유튜브 주소의 영상을 볼 수 있도록 구현해 주세요.
    - 라이브러리 선택에는 제한이 없으며, 스스로 찾아서 적용해 보세요.
    - 유튜브 영상은 게시글 상세 페이지의 컨텐츠 내용 아랫 부분에 위치시켜 줍니다.
        - 피그마 참고

### 게시글 상세 (댓글 등록)

- [x]  댓글 등록 시 별점을 줄 수 있도록 기능을 추가해 주세요.
    - [x]  경로: `src/components/boards-detail/comment-write/index.tsx`
    - 라이브러리 제한은 없으며, MUI 또는 Ant Design 사용을 추천해요.
- [x]  댓글 조회 시 등록된 별점을 볼 수 있도록 구현해 주세요.
    - [x]  경로: `src/components/boards-detail/comment-list/index.tsx`
    - [x]  댓글 등록 시 사용한 라이브러리를 그대로 사용해요.**기본 스타일**: 모든 HTML 태그에 `margin: 0`, `padding: 0`, `box-sizing: border-box`를 적용하여 초기 스타일을 설정해 주세요.



## Day 29 과제 요구사항

### 공통

- [x]  완성된 `day27` 폴더를 활용하여 `day29` 를 완성해 주세요.
- [x]  `src/app/globals.css` 파일을 아래와 같이 보완해 주세요.
    - [x]  모든 HTML 태그에 `margin: 0`, `padding: 0`, `box-sizing: border-box`를 적용하여 초기 스타일을 설정해 주세요.
    - [x]  `Pretendard-Regular.woff2` 폰트 파일을 적용하여 웹페이지의 기본 폰트로 사용해 주세요.
- [x]  현재까지 작성된 모든 `alert` 경고창을 사용자 경험을 개선하기 위해 모달(Modal) 형태의 경고창으로 변경해 주세요.
    - 라이브러리 제한은 없으며, MUI 또는 Ant Design 사용을 추천해요.
- [ ]  레이아웃과 관련된 컴포넌트를 그룹화하기 위해 아래 경로의 폴더에 컴포넌트를 구현해 주세요.
    - [x]  **경로:** `src/commons/layout`
    - [x]  네비게이션 UI를 새롭게 작성해 주세요.
    - [x]  게시글 목록에 만든 배너 코드를 아래로 이동시켜 주세요.
        - [x]  경로: `src/commons/layout/banner/index.tsx`
    - [x]  네비게이션, 배너 컴포넌트를 조립하여 레이아웃 컴포넌트를 만들어 주세요.
        - [x]  경로:  `src/commons/layout/index.tsx`
    - [x]  완성된 레이아웃 앱 레이아웃에 조립해 주세요.
        - [x]  **경로:** `src/app/layout.tsx`

### 레이아웃 컴포넌트 리팩토링

네비게이션 및 배너 컴포넌트를 리팩토링 해주세요.

- [x]  타입 에러가 감지된 부분에 타입 스크립트를 적용하여 문제를 해결해 주세요.
- [x]  유지보수 및 탐색이 쉽도록 파일을 분리해 주세요.
    - [x]  파일 목록:
        - [x]  `hook.ts`
        - [x]  `index.tsx`
        - [x]  `queries.ts`
        - [x]  `styles.ts`
        - [x]  `types.ts`


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

        ## 과제 요구 사항


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