## To-Do

1. 공통
    - [x]  완성된 day22 폴더를 활용한 day23 완성
2. 게시글 등록
    - [x]  `src/app/boards/page.tsx` 경로에 파일 생성 및 게시글목록 페이지 완성
    - [x]  피그마 첫번째 화면과 동일한 결과물 구현
    - [x]  페이지 접속 시 GRAPHQL-API(fetchBoards)를 통한 목록 데이터 조회
    - [x]  게시글 번호 index 값 활용
    - [x]  게시글 내용 클릭 시 해당 게시글 상세 페이지 이동
3. 게시글 조회
    - [x]  `src/app/boards/detail/page.tsx` 경로를 `src/app/boards/[boardId]/page.tsx` 경로로 변경
    - [x]  주소의 boardId 값 추출 및 GRAPHQL-API(fetchBoard)를 통한 게시물 조회
    - [x]  조회된 게시물의 작성자, 제목, 내용 출력
    - [x]  데이터 로딩 전 비어 있는 상태에서 발생하는 에러 해결
    - [x]  GRAPHQL-API(deleteBoard)에 id 값을 variables로 포함한 삭제 요청
    - [x]  서버에서 삭제된 게시글 삭제 후 GRAPHQL-API(fetchBoards)를 재요청하여 게시물 목록 갱신