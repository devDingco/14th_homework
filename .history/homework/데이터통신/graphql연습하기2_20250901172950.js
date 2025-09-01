// ======================================================================
// graphql-API 문제
// ======================================================================
// http://backend-practice.codebootcamp.co.kr/graphql 에서 제공하는 API를 사용하세요.
// ======================================================================

// 1) createBoard를 활용해, 게시물을 하나 등록해 주세요.
mutation{createBoard(
  createBoardInput:{
    writer:"익명의누군가"
    password:"1234"
    title:"첫번째게시글"
    contents:"과제...하는...중입니다..."
    youtubeUrl:"www.youtube.com"
   
  }
) {
_id
writer
title
contents
youtubeUrl
likeCount
dislikeCount
images
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
}}

{
  "data": {
    "createBoard": {
      "_id": "68b55092db66590029998661",
      "writer": "익명의누군가",
      "title": "첫번째게시글",
      "contents": "과제...하는...중입니다...",
      "youtubeUrl": "www.youtube.com",
      "likeCount": 0,
      "dislikeCount": 0,
      "images": [],
      "boardAddress": null,
      "user": null,
      "createdAt": "2025-09-01T07:51:46.784Z",
      "updatedAt": "2025-09-01T07:51:46.784Z",
      "deletedAt": null
    }
  }
}

// 2) 등록한 게시글의 제목과 내용은 무엇인가요?
query{fetchBoard(boardId:"68b55092db66590029998661") {
title
  contents
}}

{
  "data": {
    "fetchBoard": {
      "title": "첫번째게시글",
      "contents": "과제...하는...중입니다..."
    }
  }
}
// 3) 등록한 게시글에 좋아요를 1 올려주세요.

{
  "data": {
    "likeBoard": 1
  }
}

{
  "data": {
    "likeBoard": 1
  }
}



// 4) 등록한 게시글에 싫어요도 1 올려주세요.
mutation{dislikeBoard(boardId:"68b55092db66590029998661" )}

{
  "data": {
    "dislikeBoard": 1
  }
}

// 5) 등록한 게시글의 좋아요와 싫어요는 각각 몇 개 인가요? (fetchBoard를 활용해서 확인해 보세요.)
query{fetchBoard(boardId:"68b55092db66590029998661") {

    dislikeCount
  likeCount
}}

{
  "data": {
    "fetchBoard": {
      "dislikeCount": 1,
      "likeCount": 1
    }
  }
}

// 6) 현재 등록된 게시글의 총 갯수는 몇 개 인가요? (어떤 API를 활용하면 좋을지 찾아보세요!)
query{fetchBoardsCount}
{
  "data": {
    "fetchBoardsCount": 14308
  }
}

// 7) 등록한 게시글의 제목을 수정해 보세요!
mutation{updateBoard(
  boardId:"68b55092db66590029998661"
  password:"1234"
  updateBoardInput:{
    title:"수정된제목"
    contents: "수정된내용"
  }
) {
 title
  contents
}}

{
  "data": {
    "updateBoard": {
      "title": "수정된제목",
      "contents": "수정된내용"
    }
  }
}

// 8) fetchBoards 전체 게시물 조회를 활용하여 방금 쓴 게시물을 검색해 보세요.(search 변수를 활용해요!)

query {
  fetchBoards(search: "첫번째게시글") {
  
    writer
    title
  }
}

{
  "data": {
    "fetchBoards": [
      {
        "writer": "익명의누군가",
        "title": "첫번째게시글"
      }
    ]
  }
}

// 9) 등록한 게시글에 댓글을 3개 추가해 보세요.
mutation{createBoardComment(
  boardId:"68b55092db66590029998661"
  createBoardCommentInput:{
    writer: "댓글3"
password: "1234"
contents: "댓글3이에요"
rating: 4.5
  }
) {
 _id
writer
contents
rating
createdAt
updatedAt
deletedAt
}}

{
  "data": {
    "createBoardComment": {
      "_id": "68b55761db66590029998674",
      "writer": "댓글3",
      "contents": "댓글3이에요",
      "rating": 4.5,
      "createdAt": "2025-09-01T08:20:49.014Z",
      "updatedAt": "2025-09-01T08:20:49.014Z",
      "deletedAt": null
    }
  }
}

// 10) 첫번째 댓글의 내용을 수정해 보세요!
mutation{updateBoardComment(
updateBoardCommentInput: {contents: "수정했어요"
rating: 3.5}
password: "1234"
boardCommentId: "68b55736db66590029998670"
) {
_id
writer
contents
rating

createdAt
updatedAt
deletedAt
}}

// 11) 두번째 댓글을 삭제해 보세요!

// 12) 등록한 게시글에 달려있는 모든 댓글을 조회해 보세요.(작성자와 내용만 조회합니다.)
{
  "data": {
    "fetchBoardComments": [
      {
        "_id": "68b55761db66590029998674",
        "writer": "댓글3",
        "contents": "댓글3이에요",
        "rating": 4.5,
        "createdAt": "2025-09-01T08:20:49.014Z"
      },
      {
        "_id": "68b5575cdb66590029998673",
        "writer": "댓글2",
        "contents": "댓글2이에요",
        "rating": 4.5,
        "createdAt": "2025-09-01T08:20:44.416Z"
      },
      {
        "_id": "68b55752db66590029998671",
        "writer": "댓글1",
        "contents": "댓글1이에요",
        "rating": 4.5,
        "createdAt": "2025-09-01T08:20:34.186Z"
      },
      {
        "_id": "68b55736db66590029998670",
        "writer": "댓글1",
        "contents": "댓글1이에요",
        "rating": 4.5,
        "createdAt": "2025-09-01T08:20:06.147Z"
      }
    ]
  }
}

// 13) BEST게시글을 조회해 보세요! (API 이름을 잘 찾아보세요!)

// 14) 회원가입을 해보세요! 사용자, 즉 User를 만드는 API입니다!
// ​
