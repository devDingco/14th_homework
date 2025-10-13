## To-Do

1. 공통
    - [x]  완성된 `day26` 폴더를 활용하여 `day27` 완성
        - 폴더 재생성 불필요
        - 동일 폴더에서 과제 계속 진행 및 제출
2. 게시글 목록
    - [x]  게시글 목록 페이지 및 컴포넌트에 이벤트 버블링 처리
        - 게시글 내용뿐 아니라 삭제 버튼을 제외한 영역 클릭 시 해당 게시글 상세 페이지로 이동
        - 페이지 경로: `src/app/boards/page.tsx`
3. 게시글 상세
    - [x]  게시글 상세 페이지에 댓글 영역 구현용 컴포넌트 2개 추가
        - 댓글 목록 컴포넌트 경로: `src/components/boards-detail/comment-list`
        - 댓글 등록 컴포넌트 경로: `src/components/boards-detail/comment-write`
    - [x]  기존 게시글 상세 관련 파일 이동
        - 이동할 폴더 경로: `src/components/boards-detail/detail`
        - 파일 목록:
            - hook.ts
            - index.tsx
            - queries.ts
            - styles.module.css
            - types.ts
4. 게시글 상세 [댓글 등록]
    - [x]  `src/components/boards-detail/comment-write/index.tsx` 경로에 댓글 등록 UI 구현
    - [x]  댓글 등록 시 `createBoardComment` API 사용
    - [x]  등록 후 `fetchBoardComments` 리페치
    - [x]  등록 완료 후 입력창 초기화
    - [x]  별점, 아바타, 수정/삭제 아이콘 기능 미구현 (별점 0점으로 등록)
5. 게시글 상세 [댓글 목록 조회]
    - [x]  `src/components/boards-detail/comment-list/index.tsx` 경로에 댓글 목록 UI 구현
    - [x]  `fetchBoardComments` API로 목록 조회
    - [x]  별점, 아바타, 수정/삭제 아이콘 기능 미구현 (별점 0점으로 표시)
6. 게시글 상세 [최종 조립]
    - [x]  `src/app/boards/[boardId]/page.tsx` 파일 수정
    - [x]  게시글 상세, 댓글 등록, 댓글 목록 컴포넌트 조립
7. 컴포넌트 [리팩토링]
    - [x]  게시글 상세, 댓글 등록, 댓글 목록 조회 컴포넌트 보완
    - [x]  타입스크립트 적용으로 타입 에러 해결
    - [x]  유지보수를 위해 파일 분리: hook.ts, index.tsx, queries.ts, styles.ts, types.ts