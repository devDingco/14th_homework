## To-Do

1. 공통
    - [x]  GRAPHQL 통신 설정
        - [x]  설치 경로: `src/commons/settings/apollo-setting.tsx`
        - [x]  적용 방법: `src/app/layout.tsx` 파일에 Apollo 설정 적용
        - [x]  GraphQL 서버 주소: `http://main-practice.codebootcamp.co.kr/graphql`
2. 게시글 등록
    - [x]  `src/app/boards/new/page.tsx` 기능 수정
        - [x]  GRAPHQL API(`createBoard`)를 사용하여 작성자, 비밀번호, 제목, 내용 입력 후 등록하기 버튼 클릭 시 게시글 등록 기능 완성
        - [x]  네트워크 탭에서 게시글 전송이 에러 없이 작동하는지 확인
        - [x]  전송이 성공하면 게시글 번호를 GraphQL Playground에서 조회