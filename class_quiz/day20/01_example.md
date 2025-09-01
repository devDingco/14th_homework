## 1. example 레벨1 GRAPHQL 연습하기

1. 철수의 나이는 몇살인가요?(나이만 조회해 주세요.)

   ```markdown
   12
   ```

2. 영희의 학교는 어디인가요?(학교만 조회해 주세요.)

   ```markdown
   "참새초등학교"
   ```

3. 3번 게시글의 내용과 작성일이 무엇인가요?(내용과 작성일만 조회해 주세요.)

   ```markdown
   null
   ```

4. 본인의 이름으로 프로필을 작성해 보세요.

   ```markdown
   mutation{
   createProfile(name: "최지호", age: 25, school:"코드캠프") {
   \_id
   number
   message
   }
   }
   ```

5. 본인의 이름으로 게시글을 작성해 보세요.

   ```markdown
   mutation{
   createBoard(writer: "최지호", title: "과제 5번 하는 중", contents: "내용 작성 중") {
   \_id
   number
   message
   }
   }
   ```

6. 자신의 프로필을 조회해 보세요.

   ```markdown
   {
   "data": {
   "fetchProfile": {
   "number": 77,
   "name": "최지호",
   "age": 25,
   "school": "코드캠프"
   }
   }
   }
   ```

7. 자신의 게시글을 조회해 보세요.

   ```markdown
   {
   "data": {
   "fetchBoard": {
   "number": 389,
   "writer": "최지호",
   "title": "과제 5번 하는 중",
   "contents": "내용 작성 중",
   "like": 0,
   "createdAt": "2025-09-01T05:59:20.793Z"
   }
   }
   }
   ```

8. 본인의 프로필에서, 학교를 자신이 졸업한 초등학교로 바꿔보세요.

   ```markdown
   mutation{
   updateProfile(
   name: "최지호"
   school:"남외초등학교"
   ) {
   \_id
   number
   message
   }
   }
   ```

9. 본인의 게시글에서, 제목과 내용을 바꿔보세요.

   ```markdown
   mutation{
   updateBoard(writer: "최지호"
   title: "제목 수정"
   contents: "내용 수정") {
   \_id
   number
   message
   }
   }
   ```

10. 자신이 좋아하는 만화 주인공으로 프로필을 작성해 보세요.

    ```markdown
    mutation{
    createProfile
    (name: "하쿠"
    age:12
    school:"모름"
    ) {
    \_id
    number
    message
    }
    }
    ```

11. 위 10번에서 작성한 프로필을 삭제해 보세요.

    ```markdown
    mutation{
    deleteProfile(name: "하쿠") {
    \_id
    number
    message
    }
    }
    ```

12. 상품을 하나 만들어 보세요.

    ```markdown
    mutation{
    createProduct(
    seller: "최지호",
    createProductInput: {
    name: "바밤바"
    detail: "바밤바 밤이 들어있난 바 바밤바"
    price: 600
    }
    ) {
    \_id
    number
    message
    }
    }

    {
    "data": {
    "createProduct": {
    "\_id": "789de63b-1b74-40d8-8786-29bfa8dc5b49",
    "number": null,
    "message": "상품이 정상적으로 등록되었습니다."
    }
    }
    }
    ```

13. 위 12번에서 만들었던 상품의 가격을 500원 인상해 보세요.

    ```markdown
    mutation{
    updateProduct(productId: "789de63b-1b74-40d8-8786-29bfa8dc5b49"
    updateProductInput: {
    price: 1100
    }
    ) {
    \_id
    number
    message
    }
    }

    {
    "data": {
    "updateProduct": {
    "\_id": "789de63b-1b74-40d8-8786-29bfa8dc5b49",
    "number": null,
    "message": "상품이 정상적으로 수정되었습니다."
    }
    }
    }
    ```

14. 위에서 만든 상품을 조회하되, 가격만 조회해 보세요.

    ```markdown
    query{
    fetchProduct(productId: "789de63b-1b74-40d8-8786-29bfa8dc5b49"){
    price
    }
    }

    {
    "data": {
    "fetchProduct": {
    "price": 1100
    }
    }
    }
    ```

15. 조회했던 상품을 삭제해 보세요.

    ```markdown
    mutation{
    deleteProduct(productId: "789de63b-1b74-40d8-8786-29bfa8dc5b49") {
    \_id
    number
    message
    }
    }

    {
    "data": {
    "deleteProduct": {
    "\_id": "789de63b-1b74-40d8-8786-29bfa8dc5b49",
    "number": null,
    "message": "상품이 정상적으로 삭제되었습니다."
    }
    }
    }
    ```

16. 삭제한 상품이 정말로 삭제되었는지 다시 한번 조회해 보세요.

    ```markdown
    query{
    fetchProduct(productId: "789de63b-1b74-40d8-8786-29bfa8dc5b49") {
    \_id
    seller
    name
    detail
    price
    createdAt
    }
    }

    {
    "data": {
    "fetchProduct": null
    }
    }
    ```

17. 게시물 목록 중, 2페이지를 조회해 보세요.

    ```markdown
    query{
    fetchBoards(page: 2) {
    number
    writer
    title
    contents
    like
    createdAt
    }
    }

    {
    "data": {
    "fetchBoards": [
    {
    "number": 379,
    "writer": "김라떼",
    "title": "레벨2",
    "contents": "레벨2 내용내용내용",
    "like": 0,
    "createdAt": "2025-09-01T05:24:46.524Z"
    },
    {
    "number": 377,
    "writer": "김소희",
    "title": "오늘의 숙제",
    "contents": "오늘의 숙제 제출",
    "like": 0,
    "createdAt": "2025-09-01T05:04:10.708Z"
    },
    {
    "number": 376,
    "writer": "성준",
    "title": "제목변경",
    "contents": "제목변경한내용",
    "like": 0,
    "createdAt": "2025-09-01T04:57:55.920Z"
    },
    {
    "number": 375,
    "writer": "익명",
    "title": "점메추",
    "contents": "분식집 없어져서 아쉽다 ㅇㅈ?",
    "like": 0,
    "createdAt": "2025-09-01T03:18:29.955Z"
    },
    {
    "number": 374,
    "writer": "금이",
    "title": "ㄴㄴ 점심ㅇ은",
    "contents": "비오니까 육전에 막걸리",
    "like": 0,
    "createdAt": "2025-09-01T03:13:20.204Z"
    },
    {
    "number": 373,
    "writer": "익명3",
    "title": "점메추",
    "contents": "칼국수",
    "like": 0,
    "createdAt": "2025-09-01T03:09:46.952Z"
    },
    {
    "number": 372,
    "writer": "익명",
    "title": "배고파",
    "contents": "ㅠㅠ",
    "like": 0,
    "createdAt": "2025-09-01T03:09:02.167Z"
    },
    {
    "number": 371,
    "writer": "익명2",
    "title": "국밥ㄱㄱ",
    "contents": "짜장면ㄱㄱ",
    "like": 0,
    "createdAt": "2025-09-01T03:07:35.203Z"
    },
    {
    "number": 370,
    "writer": "익명",
    "title": "점심추천좀",
    "contents": "국밥 or 짜장면",
    "like": 0,
    "createdAt": "2025-09-01T03:03:00.054Z"
    },
    {
    "number": 369,
    "writer": "철수",
    "title": "안녕하세요",
    "contents": "반갑습니다.",
    "like": 0,
    "createdAt": "2025-09-01T03:02:12.296Z"
    }
    ]
    }
    }
    ```

18. 게시물 목록을 조회할 때, page를 입력하지 않으면, 어떤 결과가 발생하나요?

    ```markdown
    query{
    fetchBoards {
    number
    writer
    title
    contents
    like
    createdAt
    }
    }

    -> (page: 1)과 동일하게 조회됨
    ```

19. 프로필이 전체 몇 개가 있는지 확인해 보세요.

    ```markdown
    query{
    fetchProfilesCount
    }

    {
    "data": {
    "fetchProfilesCount": 70
    }
    }
    ```

20. 게시물은 몇 개가 있나요?

    ```markdown
    query{
    fetchBoardsCount
    }

    {
    "data": {
    "fetchBoardsCount": 137
    }
    }
    ```
