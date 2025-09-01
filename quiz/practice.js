// ======================================================================
// graphql-API 문제
// ======================================================================
// http://backend-practice.codebootcamp.co.kr/graphql 에서 제공하는 API를 사용하세요.
// ======================================================================

// 1) createBoard를 활용해, 게시물을 하나 등록해 주세요.
// mutation {
//     createBoard(createBoardInput: {
//       writer: "신유진"
//       password: "1234"
//       title: "제목입니다"
//       contents: "내용입니다"
//       youtubeUrl: "유튜브링크"
//       boardAddress: {
//         zipcode: "zipcode1"
//         address: "address1"
//         addressDetail: "detail1"
//       }
//       images: ["image1.png", "image2.png"]
//     }) {
//       _id
//       writer
//       title
//       contents
//       createdAt
//     }
//   }

// {
//     "data": {
//       "createBoard": {
//         "_id": "68b53e6cdb6659002999863d",
//         "writer": "신유진",
//         "title": "제목입니다",
//         "contents": "내용입니다",
//         "createdAt": "2025-09-01T06:34:20.647Z"
//       }
//     }
//   }

// 2) 등록한 게시글의 제목과 내용은 무엇인가요?
// 제목 : 제목입니다 / 내용 : 내용입니다

// 3) 등록한 게시글에 좋아요를 1 올려주세요.
// mutation {
//     likeBoard(boardId: "68b53e6cdb6659002999863d")
//   }

//   {
//     "data": {
//       "likeBoard": 1
//     }
//   }

// 4) 등록한 게시글에 싫어요도 1 올려주세요.
// mutation {
//     dislikeBoard(boardId: "68b53e6cdb6659002999863d")
//   }

//   {
//     "data": {
//       "dislikeBoard": 1
//     }
//   }

// 5) 등록한 게시글의 좋아요와 싫어요는 각각 몇 개 인가요? (fetchBoard를 활용해서 확인해 보세요.)
// query {
//     fetchBoard(boardId: "68b53e6cdb6659002999863d") {
//           likeCount
//       dislikeCount
//     }
//   }

//   {
//     "data": {
//       "fetchBoard": {
//         "likeCount": 1,
//         "dislikeCount": 1
//       }
//     }
//   }

// 6) 현재 등록된 게시글의 총 갯수는 몇 개 인가요? (어떤 API를 활용하면 좋을지 찾아보세요!)
// query {
// 	fetchBoardsCount
// }

// {
//     "data": {
//       "fetchBoardsCount": 14300
//     }
//   }

// 7) 등록한 게시글의 제목을 수정해 보세요!
// mutation {
// 	updateBoard(
// 		updateBoardInput: {title: "수정된 제목입니다."}
// 		password: "1234"
// 		boardId: "68b53e6cdb6659002999863d"
// ) {
// 	  writer
// 	  youtubeUrl
// 	  deletedAt
// 	}
// }

// 8) fetchBoards 전체 게시물 조회를 활용하여 방금 쓴 게시물을 검색해 보세요.(search 변수를 활용해요!)
// query {
//     fetchBoards(
//       search: "제목입니다"
//       startDate: "2025-09-01T00:00:00.000Z"
//       endDate: "2025-09-01T23:59:59.000Z"
//     ) {
//       _id
//       writer
//       title
//       contents
//       createdAt
//     }
//   }

//   {
//     "data": {
//       "fetchBoards": [
//         {
//           "_id": "68b53e6cdb6659002999863d",
//           "writer": "신유진",
//           "title": "수정된 제목입니다.",
//           "contents": "내용입니다",
//           "createdAt": "2025-09-01T06:34:20.647Z"
//         }
//       ]
//     }
//   }

// 9) 등록한 게시글에 댓글을 3개 추가해 보세요.
// mutation {
//     createBoardComment(
//           createBoardCommentInput: {
//             writer: "작성자1"
//               password: "1234"
//               contents: "이건 첫번째 댓글"
//               rating: 4.5}
//           boardId: "68b53e6cdb6659002999863d"
//   ) {
//       writer
//       deletedAt
//     }
//   }

// mutation {
//   createBoardComment(
//         createBoardCommentInput: {
//           writer: "작성자2"
//             password: "1234"
//             contents: "이건 두번째 댓글"
//             rating: 4.3}
//         boardId: "68b53e6cdb6659002999863d"
// ) {
//     writer
//     deletedAt
//   }
// }

// mutation {
//     createBoardComment(
//           createBoardCommentInput: {
//             writer: "작성자3"
//               password: "1234"
//               contents: "이건 세번째 댓글"
//               rating: 4.1}
//           boardId: "68b53e6cdb6659002999863d"
//   ) {
//        id
//       writer
//       deletedAt
//     }
//   }

// 10) 첫번째 댓글의 내용을 수정해 보세요!
// query {
//     fetchBoardComments(
// 	boardId: "68b53e6cdb6659002999863d"
//   ) {
//     _id
// 		writer
//     contents
//   }
//   }

//   {
//     "data": {
//       "fetchBoardComments": [
//         {
//           "_id": "68b54f4fdb6659002999865c",
//           "writer": "작성자3",
//           "contents": "이건 세번째 댓글"
//         },
//         {
//           "_id": "68b54f2edb6659002999865b",
//           "writer": "작성자2",
//           "contents": "이건 두번째 댓글"
//         },
//         {
//           "_id": "68b54f0edb6659002999865a",
//           "writer": "작성자1",
//           "contents": "이건 첫번째 댓글"
//         }
//       ]
//     }
//   }

//   mutation {
//     updateBoardComment(
// 			updateBoardCommentInput: {contents: "이건 첫번째 레슨"}
// 			password: "1234"
// 			boardCommentId: "68b54f0edb6659002999865a"
// ) {
//       writer
//       deletedAt
//     }
//   }

// 11) 두번째 댓글을 삭제해 보세요!

// mutation {
//     deleteBoardComment(
// 			password: "1234"
// 			boardCommentId: "68b54f2edb6659002999865b"
// )
//   }

// 12) 등록한 게시글에 달려있는 모든 댓글을 조회해 보세요.(작성자와 내용만 조회합니다.)
// query {
//     fetchBoardComments(
// 	boardId: "68b53e6cdb6659002999863d"
//   ) {
//     _id
// 		writer
//     contents
//   }
//   }

//   {
//     "data": {
//       "fetchBoardComments": [
//         {
//           "_id": "68b54f4fdb6659002999865c",
//           "writer": "작성자3",
//           "contents": "이건 세번째 댓글"
//         },
//         {
//           "_id": "68b54f0edb6659002999865a",
//           "writer": "작성자1",
//           "contents": "이건 첫번째 레슨"
//         }
//       ]
//     }
//   }

// 13) BEST게시글을 조회해 보세요! (API 이름을 잘 찾아보세요!)
// query {
//     fetchBoardsOfTheBest {
//       writer
//       youtubeUrl
//       deletedAt
//     }
//   }

//   {
//     "data": {
//       "fetchBoardsOfTheBest": [
//         {
//           "writer": "철수",
//           "youtubeUrl": "https://www.youtube.com/watch?v=8dus2AAbz6I",
//           "deletedAt": null
//         },
//         {
//           "writer": "철수",
//           "youtubeUrl": null,
//           "deletedAt": null
//         },
//         {
//           "writer": "테스트",
//           "youtubeUrl": "https://www.youtube.com/watch?v=Z4OSg3VDGfk",
//           "deletedAt": null
//         },
//         {
//           "writer": "123",
//           "youtubeUrl": null,
//           "deletedAt": null
//         }
//       ]
//     }
//   }

// 14) 회원가입을 해보세요! 사용자, 즉 User를 만드는 API입니다!
// mutation {
//     createUser(createUserInput: {
//       email: "example@naver.com"
//   password: "1357"
//   name: "신유진"
//     }) {
//       picture
//       deletedAt
//     }
// }