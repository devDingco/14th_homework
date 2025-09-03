### Day 21 기본 요구사항

1. 공통
    - [x]  완성된 day19 폴더를 활용하여 day21을 완성해 주세요.(day20 없음)
    - [x]  GRAPHQL 통신이 가능하도록 layout.tsx 파일에 과제자료(apollo-setting.tsx)를 설치해 주세요.
        - [x]  설치경로: src/commons/settings/apollo-setting.tsx
        - [x]  적용방법: src/app/layout.tsx 파일을 열어, 수업에서 배운대로 적용해 주세요.
        - [x]  GraphQL 서버 주소: http://main-practice.codebootcamp.co.kr/graphql
2. 게시글등록
    - [x]  src/app/boards/new/page.tsx 파일에 아래의 기능이 작동하도록 수정해 주세요.
        - [x]  GRAPHQL-API(createBoard)를 사용하여 작성자, 비밀번호, 제목, 내용을 입력한 후, 등록하기 버튼을 클릭하면 게시글이 등록 되도록 기능을 완성해 주세요.
        - [x]  네트워크 탭을 활용하여 게시글 전송이 에러 없이 잘 되었는지 확인해 주세요.
        - [x]  전송이 잘 되었다면, 해당 게시글의 번호를 graphql playground에 접속하여 조회해 보세요.


### Day 22 기본 요구사항

1. 공통
    - [x]  완성된 day21 폴더를 활용하여 day22 을 완성해 주세요.
2. 게시글등록
    - [x]  `src/app/boards/new/page.tsx` 파일의 코드를 보완해 주세요.
        - [x]  게시글 등록하기 버튼을p 클릭했을 때, 게시글 등록에 실패할 경우를 대비하여 try-catch 코드를 추가하고 에러가 나면, "에러가 발생하였습니다. 다시 시도해 주세요." 라는 메시지를 띄워주세요.
        - [x]  게시글 등록에 성공한 경우, 해당 게시글 페이지로 이동시켜 주세요.
3. 게시글조회
    - [x]  `src/app/boards/detail/page.tsx` 파일의 경로를 다이나믹하게 변경하기 위해 `src/app/boards/[boardId]/page.tsx` 경로로 변경해 주세요.
        - [x]  해당 페이지에 접속하였을 때 주소 부분의 boardId 값을 꺼내오고, 꺼낸 id의 게시물을 GRAPHQL-API(fetchBoard)로 조회해 보세요.
        - [x]  조회된 게시물의 작성자, 제목, 내용을 알맞은 위치에 보여주세요.
        - [x]  데이터를 받아오는데 시간이 걸리는 이유로, 받아오기 전의 존재하지 않는 데이터를 그리는 과정에서 에러가 발생하게 됩니다. 이 문제를 해결해 주세요.