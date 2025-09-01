// ======================================================================
// graphql-API 문제
// ======================================================================
// http://backend-example.codebootcamp.co.kr/graphql 에서 제공하는 API를 사용하세요.
// ======================================================================

// 1) 철수의 나이는 몇살인가요?(나이만 조회해 주세요.)
query{
  fetchProfile(name : "철수"){
    age
  }
}

{
  "data": {
    "fetchProfile": {
      "age": 12
    }
  }
}


//2) 영희의 학교는 어디인가요?(학교만 조회해 주세요.)
query{
  fetchProfile(name : "영희"){
    school
  }
}

{
  "data": {
    "fetchProfile": {
      "school": "참새초등학교"
    }
  }
}

//3) 3번 게시글의 내용과 작성일이 무엇인가요?(내용과 작성일만 조회해 주세요.)
query {
  fetchBoard (number:3){
    contents
    createdAt
  }
}

{
  "data": {
    "fetchBoard": null
  }
}

//4) 본인의 이름으로 프로필을 작성해 보세요.
mutation{
  createProfile(
    name:"박초롱",
    age:28,
    school:"쑥쑥새싹학교"
    
  ){
    _id
    number
    message
    
  }
}

{
  "data": {
    "createProfile": {
      "_id": null,
      "number": null,
      "message": "프로필이 정상적으로 등록되었습니다."
    }
  }
}


//5) 본인의 이름으로 게시글을 작성해 보세요.
mutation {
  createBoard(
    writer: "박초롱",
    title: "제목입니다",
    contents: "게시글 내용입니다"
  ) {
    _id
    number
    message
  }
}

{
  "data": {
    "createBoard": {
      "_id": null,
      "number": 390,
      "message": "게시물이 정상적으로 등록되었습니다."
    }
  }
}


//6) 자신의 프로필을 조회해 보세요.
query{fetchProfile(name:"박초롱") {
  number
  name
  age
  school
}}

{
  "data": {
    "fetchProfile": {
      "number": 78,
      "name": "박초롱",
      "age": 28,
      "school": "쑥쑥새싹학교"
    }
  }
}
//7) 자신의 게시글을 조회해 보세요.
query{fetchBoard(number:390) {
  number
  writer
  title
  contents
  like
  createdAt
}}

{
  "data": {
    "fetchBoard": {
      "number": 390,
      "writer": "박초롱",
      "title": "제목입니다",
      "contents": "게시글 내용입니다",
      "like": 0,
      "createdAt": "2025-09-01T06:13:23.184Z"
    }
  }
}
//8) 본인의 프로필에서, 학교를 자신이 졸업한 초등학교로 바꿔보세요.
mutation{updateProfile(
  name:"박초롱",
  age:28,
  school:"새싹학교"
) {
  _id
  number
  message
}
}

{
  "data": {
    "updateProfile": {
      "_id": null,
      "number": null,
      "message": "프로필이 정상적으로 수정되었습니다."
    }
  }
}


//9) 본인의 게시글에서, 제목과 내용을 바꿔보세요.
mutation{updateBoard(
number: 390
writer: "박초롱"
title: "제목이지롱"
contents: "내용이지롱") {
  _id
  number
  message
}
}

{
  "data": {
    "updateBoard": {
      "_id": null,
      "number": 390,
      "message": "게시물이 정상적으로 수정되었습니다."
    }
  }
}


//10) 자신이 좋아하는 만화 주인공으로 프로필을 작성해 보세요.
mutation{createProfile(
name: "남도일"
age: 17
school: "청솔고등학교"
) {
  _id
  number
  message
} 
}

{
  "data": {
    "createProfile": {
      "_id": null,
      "number": null,
      "message": "프로필이 정상적으로 등록되었습니다."
    }
  }
}

//11) 위 10번에서 작성한 프로필을 삭제해 보세요.
mutation{deleteProfile(name:"남도일")
{
  _id
  number
  message
}}

{
  "data": {
    "deleteProfile": {
      "_id": null,
      "number": null,
      "message": "프로필이 정상적으로 삭제되었습니다."
    }
  }
}


//12) 상품을 하나 만들어 보세요.
mutation {
  createProduct(
    seller: "박초롱",
    createProductInput: {
      name: "맛있는 애플망고",
      detail: "제주산 애플망고 비싸요",
      price: 100000
    }
  ) {
    _id
    number
    message
  }
}

{
  "data": {
    "createProduct": {
      "_id": "ac668c90-331c-4f5d-bd49-702d9f266d16",
      "number": null,
      "message": "상품이 정상적으로 등록되었습니다."
    }
  }
}

//13) 위 12번에서 만들었던 상품의 가격을 500원 인상해 보세요.
mutation {
  updateProduct(
productId: "ac668c90-331c-4f5d-bd49-702d9f266d16"
updateProductInput: {
  name:"제주산 애플망고"
  detail: "맛있는 제주산 애플망고"
  price: 100500
}
  ){_id
  number
    message
  }
}

{
  "data": {
    "updateProduct": {
      "_id": "ac668c90-331c-4f5d-bd49-702d9f266d16",
      "number": null,
      "message": "상품이 정상적으로 수정되었습니다."
    }
  }
}

//14) 위에서 만든 상품을 조회하되, 가격만 조회해 보세요.
query{fetchProduct(productId:"ac668c90-331c-4f5d-bd49-702d9f266d16" )
   {price}}


   {
  "data": {
    "fetchProduct": {
      "price": 100500
    }
  }
}

//15) 조회했던 상품을 삭제해 보세요.
mutation{deleteProduct(productId: "ac668c90-331c-4f5d-bd49-702d9f266d16")
  {
    _id
    number
    message
  }}

  {
  "data": {
    "deleteProduct": {
      "_id": "ac668c90-331c-4f5d-bd49-702d9f266d16",
      "number": null,
      "message": "상품이 정상적으로 삭제되었습니다."
    }
  }
}
//16) 삭제한 상품이 정말로 삭제되었는지 다시 한번 조회해 보세요.
query{fetchProduct(productId:"ac668c90-331c-4f5d-bd49-702d9f266d16" )
   {_id
    seller
    name
    detail
    price
    createdAt
  }}

  {
  "data": {
    "fetchProduct": null
  }
}

//17) 게시물 목록 중, 2페이지를 조회해 보세요.
query {
  fetchBoards(page: 2){
    number
writer
title
contents
like
createdAt}}
{
  "data": {
    "fetchBoards": [
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
      },
      {
        "number": 375,
        "writer": "익명",
        "title": "점메추",
        "contents": "분식집 없어져서 아쉽다 ㅇㅈ?",
        "like": 0,
        "createdAt": "2025-09-01T03:18:29.955Z"
      }
    ]
  }
}
//18) 게시물 목록을 조회할 때, page를 입력하지 않으면, 어떤 결과가 발생하나요?
첫번째 페이지가 나온다(기본값인듯)
//19) 프로필이 전체 몇 개가 있는지 확인해 보세요.

//20) 게시물은 몇 개가 있나요?