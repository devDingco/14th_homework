## To-Do

1. 공통
    - [x]  day21 폴더를 활용하여 day22 완성
2. 게시글 등록
    - [x]  `src/app/boards/new/page.tsx` 코드 보완
    - [x]  게시글 등록 실패 시 try-catch 적용 및 에러 메시지 출력
    - [x]  게시글 등록 성공 시 해당 게시글 상세 페이지로 이동
3. 게시글 조회
    - [x]  `src/app/boards/detail/page.tsx` 경로를 `src/app/boards/[boardId]/page.tsx`로 변경
    - [x]  주소의 boardId 값을 꺼내와 GraphQL API(fetchBoard)로 조회
    - [x]  조회된 게시물의 작성자, 제목, 내용 출력
    - [x]  데이터 로딩 전 비어 있는 상태에서 발생하는 에러 해결