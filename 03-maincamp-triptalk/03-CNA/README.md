## To-Do

1. 공통
    - [x]  완성된 day23 폴더를 활용하여 day24 완성
2. 게시글수정
    - [x]  아래 경로에 수정페이지를 만들고 수정 기능 완성
        - [x]  수정페이지 경로: `src/app/boards/[boardId]/edit/page.tsx`
        - [x]  기존 등록페이지 내용을 수정페이지와 재사용 가능하도록 아래 컴포넌트 구현 경로에 코드 복사
            - [x]  기존 등록 페이지 경로: `src/app/boards/new/page.tsx`
            - [x]  컴포넌트 구현 경로: `src/components/boards-write/index.tsx`
        - [x]  등록하기와 수정하기를 1개의 컴포넌트로 재사용하기 위해 아래 경로에 컴포넌트 구현
            - [x]  경로: `src/components/boards-write/index.tsx`
            - [x]  등록하기 화면에 구현한 컴포넌트 렌더링
            - [x]  수정하기 화면에 구현한 컴포넌트 렌더링
            - [x]  해당 컴포넌트가 등록하기, 수정하기 페이지에서 의도대로 동작하는지 각각 테스트
        - [x]  상세 페이지에서 `[수정하기]` 버튼 클릭 시, 해당 게시글을 수정하는 화면으로 이동 기능 구현
        - [x]  수정페이지 접속 시, 수정을 위한 초기값을 보여주기 위해 GRAPHQL-API(fetchBoard)를 사용하여 기존 입력값 불러오기
            - [x]  수정 페이지 경로: `src/app/boards/[boardId]/edit/page.tsx`
            - [x]  제목, 내용만 수정 가능하며, 수정되지 않은 값은 제외하고 수정된 값만 API 요청에 포함
            - [x]  작성자와 비밀번호는 수정 불가, 수정하기 페이지에서는 input 태그 disabled 처리
        - [x]  게시글작성 컴포넌트에서 수정하기 버튼 클릭 시 GRAPHQL-API(updateBoard)를 사용하여 데이터 수정
            - [x]  게시글 작성 페이지 경로: `src/components/boards-write/index.tsx`
            - [x]  수정을 위해 글 입력 시 설정했던 비밀번호 입력 필요
            - [x]  prompt 창으로 비밀번호 입력 처리, 비밀번호가 틀린 경우 수정 불가, `try ~ catch` 문으로 예외처리
            - [x]  catch 문에서 `error.graphQLErrors` 확인, 비밀번호가 틀린 경우 alert 창으로 안내