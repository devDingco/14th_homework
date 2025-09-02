// ======================================================================
// graphql-API 문제
// ======================================================================
// http://backend-example.codebootcamp.co.kr/graphql 에서 제공하는 API를 사용하세요.
// ======================================================================

1. 철수의 나이는 몇살인가요?(나이만 조회해 주세요.) / 12살

2. 영희의 학교는 어디인가요?(학교만 조회해 주세요.) / 참새초등학교

3. 3번 게시글의 내용과 작성일이 무엇인가요?(내용과 작성일만 조회해 주세요.) /

4. 본인의 이름으로 프로필을 작성해 보세요.

mutation {
createProfile(
name: "양지윤",
age: 28,
school: "해바라기반"
){
\_id
number
message
}
}

5. 본인의 이름으로 게시글을 작성해 보세요.

mutation {
createBoard(
writer: "양지윤",
title: "안녕하세윤"
contents: "지윤입니다."
){
\_id
number
message
}
}

{
"data": {
"createBoard": {
"\_id": null,
"number": 398,
"message": "게시물이 정상적으로 등록되었습니다."
}
}
}

6. 자신의 프로필을 조회해 보세요.
   query{
   fetchProfile(name:"양지윤"){
   number,
   name,
   age,
   school
   }
   }

{
"data": {
"fetchProfile": {
"number": 90,
"name": "양지윤",
"age": 28,
"school": "해바라기반"
}
}
}

7. 자신의 게시글을 조회해 보세요.

8. 본인의 프로필에서, 학교를 자신이 졸업한 초등학교로 바꿔보세요.
   mutation{
   updateProfile(name:"양지윤",school:"일곡초등학교"){
   \_id,
   number,
   message
   }
   }

{
"data": {
"updateProfile": {
"\_id": null,
"number": null,
"message": "프로필이 정상적으로 수정되었습니다."
}
}
}

9. 본인의 게시글에서, 제목과 내용을 바꿔보세요.
   mutation{
   updateBoard(writer:"양지윤",
   title:"안니용하세뇽",
   contents:"키키키키코키"
   ){
   \_id
   number
   message
   }
   }

{
"data": {
"updateBoard": {
"\_id": null,
"number": null,
"message": "게시물이 정상적으로 수정되었습니다."
}
}
}

10. 자신이 좋아하는 만화 주인공으로 프로필을 작성해 보세요.
    mutation{
    createProfile(name:"마루코",
    age: 9,
    school:"떡잎초등학교"){
    \_id
    number
    message
    }
    }

{
"data": {
"createProfile": {
"\_id": null,
"number": null,
"message": "프로필이 정상적으로 등록되었습니다."
}
}
}

11. 위 10번에서 작성한 프로필을 삭제해 보세요.
    mutation{
    deleteProfile(name:"마루코"){
    \_id
    number
    message
    }
    }

{
"data": {
"deleteProfile": {
"\_id": null,
"number": null,
"message": "프로필이 정상적으로 삭제되었습니다."
}
}
}

12. 상품을 하나 만들어 보세요.
    mutation{
    createProduct(seller:"박광배",createProductInput:{
    name:"선풍기",
    detail:"잘 돌아가유",
    price: 30000000
    }
    ){
    \_id
    number
    message
    }
    }

{
"data": {
"createProduct": {
"\_id": "4fe84c11-8aaf-4e5f-847d-4d9dca2e75de",
"number": null,
"message": "상품이 정상적으로 등록되었습니다."
}
}
} 13. 위 12번에서 만들었던 상품의 가격을 500원 인상해 보세요.
mutation{
updateProduct(productId:"4fe84c11-8aaf-4e5f-847d-4d9dca2e75de",
updateProductInput:{
price: 30000500
}){
\_id
number
message
}
}

{
"data": {
"updateProduct": {
"\_id": "4fe84c11-8aaf-4e5f-847d-4d9dca2e75de",
"number": null,
"message": "상품이 정상적으로 수정되었습니다."
}
}
}

14. 위에서 만든 상품을 조회하되, 가격만 조회해 보세요.
    query{
    fetchProduct(productId: "4fe84c11-8aaf-4e5f-847d-4d9dca2e75de"){
    price
    }
    }

{
"data": {
"fetchProduct": {
"price": 30000500
}
}
}

15. 조회했던 상품을 삭제해 보세요.
    mutation{
    deleteProduct(productId:"4fe84c11-8aaf-4e5f-847d-4d9dca2e75de")
    {message}
    }

{
"data": {
"deleteProduct": {
"message": "상품이 정상적으로 삭제되었습니다."
}
}
} 16. 삭제한 상품이 정말로 삭제되었는지 다시 한번 조회해 보세요.
query{
fetchProduct(productId:"4fe84c11-8aaf-4e5f-847d-4d9dca2e75de"){
seller
name
detail
price
}
}

{
"data": {
"fetchProduct": null
}
}

17. 게시물 목록 중, 2페이지를 조회해 보세요.
    query{
    fetchBoards(page:2){
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
"number": 388,
"writer": "최장원",
"title": "이건 수정된 제목",
"contents": "이건 수정된 내용",
"like": 0,
"createdAt": "2025-09-01T05:58:13.787Z"
},
{
"number": 387,
"writer": "한지연",
"title": "안녕하세용오늘먹은메뉴는~",
"contents": "칼국수?아니 돈가스였답니다~",
"like": 0,
"createdAt": "2025-09-01T05:56:43.542Z"
},
{
"number": 386,
"writer": "신유진",
"title": "수정된 제목입니다.",
"contents": "수정된 내용입니다.",
"like": 0,
"createdAt": "2025-09-01T05:55:39.777Z"
},
{
"number": 385,
"writer": "김가람",
"title": "하이",
"contents": "반가워요",
"like": 0,
"createdAt": "2025-09-01T05:54:52.030Z"
},
{
"number": 384,
"writer": "소준석",
"title": "graphql 과제 중, 바뀐 제목입니다",
"contents": "과제 중이고 내용 수정 테스트입니다",
"like": 0,
"createdAt": "2025-09-01T05:41:00.668Z"
},
{
"number": 383,
"writer": "김은경",
"title": "벌써 과제 9번 문제",
"contents": "얼른 끝나겠지?(๑•́o•̀๑)",
"like": 0,
"createdAt": "2025-09-01T05:38:20.174Z"
},
{
"number": 382,
"writer": "김가람",
"title": "안녕하세요",
"contents": "반갑습니다~~",
"like": 0,
"createdAt": "2025-09-01T05:32:17.753Z"
},
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
}
]
}
} 18. 게시물 목록을 조회할 때, page를 입력하지 않으면, 어떤 결과가 발생하나요?
query{
fetchBoards(){
number
writer
title
contents
like
createdAt
}
}

{
"errors": [
{
"message": "Syntax Error: Expected Name, found \")\".",
"locations": [
{
"line": 2,
"column": 15
}
],
"extensions": {
"code": "GRAPHQL_PARSE_FAILED",
"exception": {
"stacktrace": [
"GraphQLError: Syntax Error: Expected Name, found \")\".",
" at syntaxError (/frontend-api-example/node_modules/graphql/error/syntaxError.js:15:10)",
" at Parser.expectToken (/frontend-api-example/node_modules/graphql/language/parser.js:1413:40)",
" at Parser.parseName (/frontend-api-example/node_modules/graphql/language/parser.js:98:22)",
" at Parser.parseArgument (/frontend-api-example/node_modules/graphql/language/parser.js:332:21)",
" at Parser.optionalMany (/frontend-api-example/node_modules/graphql/language/parser.js:1503:28)",
" at Parser.parseArguments (/frontend-api-example/node_modules/graphql/language/parser.js:323:17)",
" at Parser.parseField (/frontend-api-example/node_modules/graphql/language/parser.js:310:23)",
" at Parser.parseSelection (/frontend-api-example/node_modules/graphql/language/parser.js:284:81)",
" at Parser.many (/frontend-api-example/node_modules/graphql/language/parser.js:1523:26)",
" at Parser.parseSelectionSet (/frontend-api-example/node_modules/graphql/language/parser.js:271:24)"
]
}
}
}
]
} 19. 프로필이 전체 몇 개가 있는지 확인해 보세요.
query{
fetchProfilesCount
}
{
"data": {
"fetchProfilesCount": 72
}
} 20. 게시물은 몇 개가 있나요?
query{
fetchBoardsCount
}
{
"data": {
"fetchBoardsCount": 144
}
}
// ======================================================================
// graphql-API 문제
// ======================================================================
// http://backend-practice.codebootcamp.co.kr/graphql 에서 제공하는 API를 사용하세요.
// ======================================================================

1. createBoard를 활용해, 게시물을 하나 등록해 주세요.
   mutation{
   createBoard(createBoardInput:{
   writer:"양지윤"
   password:"낑깡깡"
   title:"안녕하세윤"
   contents:"반갑습니데"
   }){
   \_id
   title
   contents
   likeCount
   dislikeCount
   createdAt
   updatedAt
   }
   }

{
"data": {
"createBoard": {
"\_id": "68b55665e43aaf00291522ee",
"title": "안녕하세윤",
"contents": "반갑습니데",
"likeCount": 0,
"dislikeCount": 0,
"createdAt": "2025-09-01T08:16:37.226Z",
"updatedAt": "2025-09-01T08:16:37.226Z"
}
}
}

2. 등록한 게시글의 제목과 내용은 무엇인가요?
   query{
   fetchBoard(boardId: "68b55665e43aaf00291522ee") {
   title
   contents
   }
   }

{
"data": {
"fetchBoard": {
"title": "안녕하세윤",
"contents": "반갑습니데"
}
}
}

3. 등록한 게시글에 좋아요를 1 올려주세요.
   mutation{
   likeBoard(boardId:"68b55665e43aaf00291522ee")
   }

{
"data": {
"likeBoard": 1
}
}

4. 등록한 게시글에 싫어요도 1 올려주세요.
   mutation{
   dislikeBoard(boardId:"68b55665e43aaf00291522ee")
   }

{
"data": {
"dislikeBoard": 1
}
}

5. 등록한 게시글의 좋아요와 싫어요는 각각 몇 개 인가요? (fetchBoard를 활용해서 확인해 보세요.)
   query{
   fetchBoard(boardId:"68b55665e43aaf00291522ee"){
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

6. 현재 등록된 게시글의 총 갯수는 몇 개 인가요? (어떤 API를 활용하면 좋을지 찾아보세요!)
   query{
   fetchBoardsCount(
   endDate:"2025-09-01T09:33:22.843Z"
   )  
   }

{
"data": {
"fetchBoardsCount": 928
}
}

7. 등록한 게시글의 제목을 수정해 보세요!
   mutation{
   updateBoard(updateBoardInput:{
   title:"변경했어윤"
   contents:"반갑습니데"
   },
   password: "낑깡깡"
   boardId:"68b55665e43aaf00291522ee"){
   \_id
   title
   }
   }

{
"data": {
"updateBoard": {
"\_id": "68b55665e43aaf00291522ee",
"title": "변경했어윤"
}
}
}

8. fetchBoards 전체 게시물 조회를 활용하여 방금 쓴 게시물을 검색해 보세요.(search 변수를 활용해요!)
   query{
   fetchBoards(search:"변경했어윤"){
   \_id
   writer
   title
   contents
   }
   }

{
"data": {
"fetchBoards": [
{
"_id": "68b55665e43aaf00291522ee",
"writer": "양지윤",
"title": "변경했어윤", // 검색어 일부 결과 찾음
"contents": "반갑습니데"
}
]
}
} 9. 등록한 게시글에 댓글을 3개 추가해 보세요.
mutation{
createBoardComment(createBoardCommentInput:{
contents:"1빠",rating: 1
},
boardId:"68b55665e43aaf00291522ee"){
contents
}
}

{
"data": {
"createBoardComment": {
"\_id": "68b56eb0e43aaf002915231c",
"contents": "1빠"
}
}
} 10. 첫번째 댓글의 내용을 수정해 보세요!
mutation{
updateBoardComment(updateBoardCommentInput:{contents:"바꿔써요"},
boardCommentId:"68b56eb0e43aaf002915231c"){
\_id
contents
}
}

{
"data": {
"updateBoardComment": {
"\_id": "68b56eb0e43aaf002915231c",
"contents": "바꿔써요"
}
}
} 11. 두번째 댓글을 삭제해 보세요!
mutation{
deleteBoardComment(boardCommentId:"68b56d1de43aaf0029152312")
}

{
"data": {
"deleteBoardComment": "68b56d1de43aaf0029152312"
}
} 12. 등록한 게시글에 달려있는 모든 댓글을 조회해 보세요.(작성자와 내용만 조회합니다.)
query{
fetchBoardComments(
boardId:"68b55665e43aaf00291522ee"){
\_id
writer
contents
}
}
{
"data": {
"fetchBoardComments": [
{
"_id": "68b56eb0e43aaf002915231c",
"writer": null,
"contents": "바꿔써요"
},
{
"_id": "68b56eaae43aaf002915231b",
"writer": null,
"contents": "1빠"
},
{
"_id": "68b56e57e43aaf002915231a",
"writer": null,
"contents": "1빠"
},
{
"_id": "68b56c8de43aaf0029152311",
"writer": null,
"contents": "3빠"
},
{
"_id": "68b56c8ae43aaf0029152310",
"writer": null,
"contents": "2빠"
},
{
"_id": "68b56c80e43aaf002915230f",
"writer": null,
"contents": "1빠"
},
{
"_id": "68b56c6ae43aaf002915230e",
"writer": null,
"contents": "1빠"
}
]
}
}

13. BEST게시글을 조회해 보세요! (API 이름을 잘 찾아보세요!)
    query{
    fetchBoardsOfTheBest{
    title
    contents
    writer
    }
    }
    {
    "data": {
    "fetchBoardsOfTheBest": [
    {
    "title": "rr",
    "contents": "<p>테스<strong>트중입니다</strong></p>",
    "writer": "rr"
    },
    {
    "title": "귀여운 고양이",
    "contents": "커엽다",
    "writer": "ㅇㅇ"
    },
    {
    "title": "이미지 업로드 테스트",
    "contents": "이미지 업로드 테스트",
    "writer": "이미지"
    },
    {
    "title": "마비노기 모바일 재밌습니다",
    "contents": "다같이 마비노기 모바일! 같이 어떠신가요, 신규 클래스 도적도 나왔답니다.",
    "writer": "ㅇㅇ"
    }
    ]
    }
    }
14. 회원가입을 해보세요! 사용자, 즉 User를 만드는 API입니다!
    mutation{
    createUser(createUserInput:{
    email:"kikiki@naver.com"
    password:"kyokoy"
    name:"키키카카코코"
    }){
    \_id
    email
    name
    createdAt

}
}

{
"data": {
"createUser": {
"\_id": "68b5760ce43aaf002915231d",
"email": "kikiki@naver.com",
"name": "키키카카코코",
"createdAt": "2025-09-01T10:31:40.160Z"
}
}
}
