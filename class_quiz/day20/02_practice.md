### 2. practice 레벨2 GRAPHQL 연습하기

1. createBoard를 활용해, 게시물을 하나 등록해 주세요.

   ```markdown
   mutation{
   createBoard(
   createBoardInput: {
   writer: "최지호"
   password: "0987"
   title: "제목"
   contents: "내용"
   youtubeUrl: "https://youtu.be/xU8mQMLx0tk?si=qz_rZySwIqmbOG7Z"
   boardAddress: {
   zipcode: "12345"
   address: "주소주소"
   addressDetail: "디테일"
   }
   images: ["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.canva.com%2Fko_kr%2Fphotos%2Fs%2Fcat%2F&psig=AOvVaw1boRsYeWFkK2W1jIa7jSmQ&ust=1756795252540000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNDvr7n6to8DFQAAAAAdAAAAABAE"]
   }
   ) {
   \_id
   }
   }

   {
   "data": {
   "createBoard": {
   "\_id": "68b54097db66590029998649"
   }
   }
   }
   ```

2. 등록한 게시글의 제목과 내용은 무엇인가요?

   ```markdown
   {
   "data": {
   "fetchBoard": {
   "title": "제목",
   "contents": "내용"
   }
   }
   }
   ```

3. 등록한 게시글에 좋아요를 1 올려주세요.

   ```markdown
   mutation{
   likeBoard(boardId: "68b54097db66590029998649")
   }

   {
   "data": {
   "likeBoard": 1
   }
   }
   ```

4. 등록한 게시글에 싫어요도 1 올려주세요.

   ```markdown
   mutation{
   dislikeBoard(boardId: "68b54097db66590029998649")
   }

   {
   "data": {
   "dislikeBoard": 1
   }
   }
   ```

5. 등록한 게시글의 좋아요와 싫어요는 각각 몇 개 인가요? (fetchBoard를 활용해서 확인해 보세요.)

   ```markdown
   query{
   fetchBoard(boardId:"68b54097db66590029998649"){
   likeCount
   dislikeCount
   }
   }

   {
   "data": {
   "fetchBoard": {
   "likeCount": 1,
   "dislikeCount": 1
   }
   }
   }
   ```

6. 현재 등록된 게시글의 총 갯수는 몇 개 인가요? (어떤 API를 활용하면 좋을지 찾아보세요!)

   ```markdown
   query{
   fetchBoardsCount
   }

   {
   "data": {
   "fetchBoardsCount": 14300
   }
   }
   ```

7. 등록한 게시글의 제목을 수정해 보세요!

   ```markdown
   mutation{
   updateBoard(boardId: "68b54097db66590029998649"
   updateBoardInput: {
   title: "제목 수정"
   }
   password: "0987"
   )
   }

   {
   "data": {
   "updateBoard": {
   "\_id": mutation{
   createBoardComment(boardId: "68b54097db66590029998649"
   createBoardCommentInput: {
   writer: "최지호"
   password: "0987"
   contents: "댓글1"
   rating: 5
   }
   ) {
   writer
   deletedAt
   }
   }
   }
   }
   }
   ```

8. fetchBoards 전체 게시물 조회를 활용하여 방금 쓴 게시물을 검색해 보세요.(search 변수를 활용해요!)

   ```markdown
   query{
   fetchBoards(search: "") {
   writer
   title
   contents
   }
   }

   {
   "data": {
   "fetchBoards": [
   {
   "writer": "최지호",
   "title": "제목 수정",
   "contents": "내용"
   },
   {
   "writer": "신유진",
   "title": "제목입니다",
   "contents": "내용입니다"
   },
   {
   "writer": "김가람",
   "title": "안녕하세요",
   "contents": "반갑습니다요"
   },
   {
   "writer": "김가람",
   "title": "안녕하세요",
   "contents": "반갑습니다요"
   },
   {
   "writer": "김가람",
   "title": "안녕하세요",
   "contents": "반갑습니다요"
   },
   {
   "writer": "김은경",
   "title": "피곤하당",
   "contents": "고양이 보고 힘내"
   },
   {
   "writer": "라뗴",
   "title": "라뗴의게시판수정된제목",
   "contents": "라떼의게시그 ㄹ내ㅛㅇㅇ내용내ㅛㅇㅇ"
   },
   {
   "writer": "소준석",
   "title": "수정된 제목",
   "contents": "과제중! 내용입니다."
   },
   {
   "writer": "김소희",
   "title": "오늘의 숙제를..!",
   "contents": "완성해봅시다."
   },
   {
   "writer": "라뗴",
   "title": "라뗴의게시판수정된제목",
   "contents": "라떼의게시그 ㄹ내ㅛㅇㅇ내용내ㅛㅇㅇ"
   }
   ]
   }
   }
   ```

9. 등록한 게시글에 댓글을 3개 추가해 보세요.

   ```markdown
   mutation{
   createBoardComment(boardId: "68b54097db66590029998649"
   createBoardCommentInput: {
   writer: "최지호"
   password: "0987"
   contents: "댓글1"
   rating: 5
   }
   )
   }

   mutation{
   createBoardComment(boardId: "68b54097db66590029998649"
   createBoardCommentInput: {
   writer: "최지호"
   password: "0987"
   contents: "댓글2"
   rating: 5
   }
   )
   }

   mutation{
   createBoardComment(boardId: "68b54097db66590029998649"
   createBoardCommentInput: {
   writer: "최지호"
   password: "0987"
   contents: "댓글3"
   rating: 4
   }
   )
   }
   ```

10. 첫번째 댓글의 내용을 수정해 보세요!

    ```markdown
    mutation{
    updateBoardComment(boardCommentId: "68b543d2db6659002999864c"
    password: "0987"
    updateBoardCommentInput: {
    contents: "11111"
    }
    )
    }

    {
    "data": {
    "fetchBoardComments": [
    {
    "_id": "68b543d2db6659002999864c",
    "contents": "11111"
    },
    {
    "_id": "68b543b3db6659002999864b",
    "contents": "댓글2"
    },
    {
    "_id": "68b54397db6659002999864a",
    "contents": "댓글1"
    }
    ]
    }
    }
    ```

11. 두번째 댓글을 삭제해 보세요!

    ```markdown
    mutation{
    deleteBoardComment(boardCommentId: "68b543b3db6659002999864b"
    password:"0987"
    )
    }

    {
    "data": {
    "deleteBoardComment": "68b543b3db6659002999864b"
    }
    }
    ```

12. 등록한 게시글에 달려있는 모든 댓글을 조회해 보세요.(작성자와 내용만 조회합니다.)

    ```markdown
    query{
    fetchBoardComments(boardId: "68b54097db66590029998649") {
    writer
    contents
    }
    }

    {
    "data": {
    "fetchBoardComments": [
    {
    "writer": "최지호",
    "contents": "11111"
    },
    {
    "writer": "최지호",
    "contents": "댓글1"
    }
    ]
    }
    }
    ```

13. BEST게시글을 조회해 보세요! (API 이름을 잘 찾아보세요!)

    ```markdown
    query{
    fetchBoardsOfTheBest {
    \_id
    writer
    title
    contents
    likeCount
    dislikeCount
    boardAddress {
    zipcode
    address
    addressDetail
    deletedAt
    }
    user {
    picture
    deletedAt
    }
    createdAt
    updatedAt
    deletedAt
    }
    }

    {
    "data": {
    "fetchBoardsOfTheBest": [
    {
    "_id": "666ae8b25d6eaa0029f7f74d",
    "writer": "철수",
    "title": "짱구에서 편지 받고 우는 철수",
    "contents": "극장판 짱구에서 편지 받고 우는 철수",
    "likeCount": 169,
    "dislikeCount": 15,
    "boardAddress": {
    "zipcode": "27011",
    "address": "충북 단양군 단양읍 삼봉로 308-1",
    "addressDetail": "투니버스",
    "deletedAt": null
    },
    "user": null,
    "createdAt": "2024-06-13T12:40:18.662Z",
    "updatedAt": "2024-06-13T12:40:18.662Z",
    "deletedAt": null
    },
    {
    "_id": "68ad89cddb66590029998617",
    "writer": "철수",
    "title": "안녕핫에ㅛ",
    "contents": "<h1><em>반값스빈다다</em></h1>",
    "likeCount": 93,
    "dislikeCount": 0,
    "boardAddress": null,
    "user": null,
    "createdAt": "2025-08-26T10:17:49.227Z",
    "updatedAt": "2025-08-26T10:17:49.227Z",
    "deletedAt": null
    },
    {
    "_id": "652a2ce25d6eaa0029f7bc51",
    "writer": "테스트",
    "title": "다들 점심은 뭘 드셨나요?",
    "contents": "<p>저는 그냥 대충 먹었어요...</p>",
    "likeCount": 92,
    "dislikeCount": 3,
    "boardAddress": {
    "zipcode": "13536",
    "address": "경기 성남시 분당구 판교역로 4",
    "addressDetail": "1층",
    "deletedAt": null
    },
    "user": null,
    "createdAt": "2023-10-14T05:53:38.766Z",
    "updatedAt": "2023-10-14T05:53:38.766Z",
    "deletedAt": null
    },
    {
    "_id": "65bdbadc5d6eaa0029f7dc1c",
    "writer": "123",
    "title": "123",
    "contents": "213",
    "likeCount": 69,
    "dislikeCount": 42,
    "boardAddress": null,
    "user": null,
    "createdAt": "2024-02-03T04:02:36.557Z",
    "updatedAt": "2024-02-03T04:02:36.557Z",
    "deletedAt": null
    }
    ]
    }
    }
    ```

14. 회원가입을 해보세요! 사용자, 즉 User를 만드는 API입니다!

    ```markdown
    mutation{
    createUser(createUserInput:{
    email: "1129jiho@naver.com"
    password: "0987"
    name: "최지호"
    }) {
    \_id
    createdAt
    }
    }
    ```
