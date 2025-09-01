// ======================================================================
// graphql-API 문제
// ======================================================================
// http://backend-example.codebootcamp.co.kr/graphql 에서 제공하는 API를 사용하세요.
// ======================================================================

// 1) 철수의 나이는 몇살인가요?(나이만 조회해 주세요.) : 12
// query {
//     fetchProfile(name:"철수") {
//       age
//     }
//   }

// 2) 영희의 학교는 어디인가요?(학교만 조회해 주세요.) : 참새초등학교
// query {
//     fetchProfile(name:"영희") {
//       school
//     }
//   }

// 3) 3번 게시글의 내용과 작성일이 무엇인가요?(내용과 작성일만 조회해 주세요.) : null
// query {
//     fetchBoard(number:3) {
//       contents
//       createdAt
//     }
//   }

// 4) 본인의 이름으로 프로필을 작성해 보세요.
// mutation {
//     createProfile(
//       name: "신유진"
//       age: 26
//       school: "중앙대학교"
//   ) {
//       _id
//       number
//       message
//     }
//   }

//   {
//     "data": {
//       "createProfile": {
//         "_id": null,
//         "number": null,
//         "message": "프로필이 정상적으로 등록되었습니다."
//       }
//     }
//   }

// 5) 본인의 이름으로 게시글을 작성해 보세요.
// mutation {
// 	createBoard(
// 	writer: "신유진"
// 	title: "안녕하세요"
// 	contents: "반갑습니다"
// 	) {
// 	  _id
// 	  number
// 	  message
// 	}
// }

// {
//     "data": {
//       "createBoard": {
//         "_id": null,
//         "number": 386,
//         "message": "게시물이 정상적으로 등록되었습니다."
//       }
//     }
//   }

// 6) 자신의 프로필을 조회해 보세요.
// query {
// 	fetchProfile(name: "신유진") {
//     number
// 	    name
// 		age
// 		school
//   }
// }

// {
//     "data": {
//       "fetchProfile": {
//         "number": 76,
//         "name": "신유진",
//         "age": 26,
//         "school": "중앙대학교"
//       }
//     }
//   }

// 7) 자신의 게시글을 조회해 보세요.
// query {
// 	fetchBoard(number: 386) {
//     number
// 		writer
// 		title
// 		contents
// 		like
// 		createdAt
//   }
// }

// {
//     "data": {
//       "fetchBoard": {
//         "number": 386,
//         "writer": "신유진",
//         "title": "안녕하세요",
//         "contents": "반갑습니다",
//         "like": 0,
//         "createdAt": "2025-09-01T05:55:39.777Z"
//       }
//     }
//   }

// 8) 본인의 프로필에서, 학교를 자신이 졸업한 초등학교로 바꿔보세요.
// mutation {
//     updateProfile(
//           name: "신유진"
//         school: "명진초등학교") {
//       _id
//       number
//       message
//     }
//       }

// 9) 본인의 게시글에서, 제목과 내용을 바꿔보세요.
// mutation {
//     updateBoard(
//         number: 386
//         title: "수정된 제목입니다."
//     		contents: "수정된 내용입니다.") {
//       _id
//       number
//       message
//     }
//       }

// 10) 자신이 좋아하는 만화 주인공으로 프로필을 작성해 보세요.
// mutation {
//     createProfile(
//       name: "캐릭터"
//       age: 100
//       school: "멋진대학교"
//   ) {
//       _id
//       number
//       message
//     }
//   }

// 11) 위 10번에서 작성한 프로필을 삭제해 보세요.
// mutation {
//     deleteProfile(name: "캐릭터") {
//       _id
//       number
//       message
//     }
//   }

//   {
//     "data": {
//       "deleteProfile": {
//         "_id": null,
//         "number": null,
//         "message": "프로필이 정상적으로 삭제되었습니다."
//       }
//     }
//   }

// 12) 상품을 하나 만들어 보세요.
// mutation {
//     createProduct(
//       seller: "신유진"
//       createProductInput: {
//         name: "사과"
//         detail: "멋있음"
//         price: 1000
//       }
//     ) {
//       _id
//       number
//       message
//     }
//   }
  
//   {
//     "data": {
//       "createProduct": {
//         "_id": "d83d6610-7496-4fa0-ab1a-2ce413ce3fa5",
//         "number": null,
//         "message": "상품이 정상적으로 등록되었습니다."
//       }
//     }
//   }

// 13) 위 12번에서 만들었던 상품의 가격을 500원 인상해 보세요.
// mutation {
//     updateProduct(
//           productId: "d83d6610-7496-4fa0-ab1a-2ce413ce3fa5"
//           updateProductInput: {
//         price: 1500
//       }
//     ) {
//       _id
//       number
//       message
//     }
//   }

// {
//     "data": {
//       "updateProduct": {
//         "_id": "d83d6610-7496-4fa0-ab1a-2ce413ce3fa5",
//         "number": null,
//         "message": "상품이 정상적으로 수정되었습니다."
//       }
//     }
//   }

// 14) 위에서 만든 상품을 조회하되, 가격만 조회해 보세요.
// query {
//     fetchProduct(productId: "d83d6610-7496-4fa0-ab1a-2ce413ce3fa5") {
//        price
//      }
//    }

//  {
//   "data": {
//     "fetchProduct": {
//       "price": 1500
//     }
//   }
// }

// 15) 조회했던 상품을 삭제해 보세요.
// mutation {
//     deleteProduct(productId: "d83d6610-7496-4fa0-ab1a-2ce413ce3fa5") {
//       _id
//       number
//       message
//     }
//    }

// {
//     "data": {
//       "deleteProduct": {
//         "_id": "d83d6610-7496-4fa0-ab1a-2ce413ce3fa5",
//         "number": null,
//         "message": "상품이 정상적으로 삭제되었습니다."
//       }
//     }
//   }

// 16) 삭제한 상품이 정말로 삭제되었는지 다시 한번 조회해 보세요.
// query {
//     fetchProduct(productId: "d83d6610-7496-4fa0-ab1a-2ce413ce3fa5") {
//       _id
//       seller
//       name
//       detail
//       price
//       createdAt
//     }
//    }

//    {
//     "data": {
//       "fetchProduct": null
//     }
//   }

// 17) 게시물 목록 중, 2페이지를 조회해 보세요.
// query {
//     fetchBoards(page: 2) {
//       number
//       writer
//       title
//       contents
//       like
//       createdAt
//     }
//   }

//   {
//     "data": {
//       "fetchBoards": [
//         {
//           "number": 379,
//           "writer": "김라떼",
//           "title": "레벨2",
//           "contents": "레벨2 내용내용내용",
//           "like": 0,
//           "createdAt": "2025-09-01T05:24:46.524Z"
//         },
//         {
//           "number": 377,
//           "writer": "김소희",
//           "title": "오늘의 숙제",
//           "contents": "오늘의 숙제 제출",
//           "like": 0,
//           "createdAt": "2025-09-01T05:04:10.708Z"
//         },
//         {
//           "number": 376,
//           "writer": "성준",
//           "title": "제목변경",
//           "contents": "제목변경한내용",
//           "like": 0,
//           "createdAt": "2025-09-01T04:57:55.920Z"
//         },
//         {
//           "number": 375,
//           "writer": "익명",
//           "title": "점메추",
//           "contents": "분식집 없어져서 아쉽다 ㅇㅈ?",
//           "like": 0,
//           "createdAt": "2025-09-01T03:18:29.955Z"
//         },
//         {
//           "number": 374,
//           "writer": "금이",
//           "title": "ㄴㄴ 점심ㅇ은",
//           "contents": "비오니까 육전에 막걸리",
//           "like": 0,
//           "createdAt": "2025-09-01T03:13:20.204Z"
//         },
//         {
//           "number": 373,
//           "writer": "익명3",
//           "title": "점메추",
//           "contents": "칼국수",
//           "like": 0,
//           "createdAt": "2025-09-01T03:09:46.952Z"
//         },
//         {
//           "number": 372,
//           "writer": "익명",
//           "title": "배고파",
//           "contents": "ㅠㅠ",
//           "like": 0,
//           "createdAt": "2025-09-01T03:09:02.167Z"
//         },
//         {
//           "number": 371,
//           "writer": "익명2",
//           "title": "국밥ㄱㄱ",
//           "contents": "짜장면ㄱㄱ",
//           "like": 0,
//           "createdAt": "2025-09-01T03:07:35.203Z"
//         },
//         {
//           "number": 370,
//           "writer": "익명",
//           "title": "점심추천좀",
//           "contents": "국밥 or 짜장면",
//           "like": 0,
//           "createdAt": "2025-09-01T03:03:00.054Z"
//         },
//         {
//           "number": 369,
//           "writer": "철수",
//           "title": "안녕하세요",
//           "contents": "반갑습니다.",
//           "like": 0,
//           "createdAt": "2025-09-01T03:02:12.296Z"
//         }
//       ]
//     }
//   }
  
// 18) 게시물 목록을 조회할 때, page를 입력하지 않으면, 어떤 결과가 발생하나요?
// 가장 최근에 작성된 페이지가 보입니다.

// 19) 프로필이 전체 몇 개가 있는지 확인해 보세요.\
// query {
//     fetchProfilesCount
//     }

//     {
//         "data": {
//           "fetchProfilesCount": 70
//         }
//       }

// 20) 게시물은 몇 개가 있나요?
// query {
//     fetchBoardsCount
//     }

//     {
//         "data": {
//           "fetchBoardsCount": 137
//         }
//       }