### 1. example 레벨1 GRAPHQL 연습하기
1) 철수의 나이는 몇 살 인가요?
```
query{
  fetchProfile(name: "철수") {
     age
   }
}

// 12살
```

2) 영희의 학교는 어디인가요? 참새초등학교
```
query{
  fetchProfile(name: "영희"){
    school
  }
}

// 참새초등학교
```

3) 3번 게시글의 내용과 작성일이 무엇인가요?
```
query{
  fetchBoard(
    number:3
  ) {
    contents
    createdAt
  }
}

// null
```

4) 본인의 이름으로 프로필을 작성해 보세요.
```
mutation{
  createProfile(
    name:"김은경"
    age: 31
    school: "코드캠프"
  ) {
    _id
    number
    message
  }
}
```

5) 본인의 이름으로 게시글을 작성해 보세요. 
```
mutation{
  createBoard(
    writer: "김은경"
  	title: "과제중"
    contents: "*⸜( •ᴗ• )⸝*"
  ){
    number
    message
  }
}
// 383번 게시글
```

6) 자신의 프로필을 조회해 보세요.
```
query{
  fetchProfile(
    name:"김은경"
  ){
    number
    school
  }
}
```

7) 자신의 게시글을 조회해 보세요.
```
query{
  fetchBoard(
    number: 383
  ){
    writer
    title
    contents
    like
  }
}
```

8) 본인의 프로필에서, 학교를 자신이 졸업한 초등학교로 바꿔보세요.
```
mutation{
  updateProfile(
    name:"김은경"
    age: 31
    school: "약수초등학교"
  ){
    _id
    number
    message
  }
}
```

9) 본인의 게시글에서, 제목과 내용을 바꿔보세요.
```
mutation{
  updateBoard(
    number: 383
    title: "벌써 과제 9번 문제"
    contents: "얼른 끝나겠지?(๑•́o•̀๑)"
  ) {
    _id
    number
    message
  }
}
```

10) 자신이 좋아하는 만화 주인공으로 프로필을 작성해 보세요.
```
mutation{
  createProfile(
    name:"아카자"
    age: 140
    school:"십이귀월초등학교"
  )
  {
   	_id
  	number
    message
  }
}
```

11) 위 10번에서 작성한 프로필을 삭제해 보세요.
```
mutation{
  deleteProfile(
    name:"아카자"
  ) {
    _id
    number
    message
  }
}
```


12) 상품을 하나 만들어 보세요. 
```
mutation{
  createProduct(
  	seller:"김은경"
    createProductInput:{
      name:"떡볶이"
      detail: "둘이 먹고 하나 죽어도 모르는 맛"
      price: 500
    }
  ){
    _id
    number
    message
  }
}

// "_id": "97f94690-4132-4e3c-a098-dedeafd92e03"
```

13) 위 12번에서 만들었던 상품의 가격을 500원 인상해 보세요.
```
mutation{
  updateProduct(
    productId:"97f94690-4132-4e3c-a098-dedeafd92e03"
    updateProductInput:{
      price: 1000
    }
  ) {
    _id
    number
    message
  }
}
```

14) 위에서 만든 상품을 조회하되, 가격만 조회해 보세요.
```
query{
  fetchProduct(productId:"97f94690-4132-4e3c-a098-dedeafd92e03"){
    price
  }
}
```

15) 조회했던 상품을 삭제해 보세요.
```
mutation{
  deleteProduct(productId:"97f94690-4132-4e3c-a098-dedeafd92e03") {
    _id
    number
    message
  }
}
```

16) 삭제한 상품이 정말로 삭제되었는지 다시 한 번 조회해보세요.
```
query{
  fetchProduct(productId:"97f94690-4132-4e3c-a098-dedeafd92e03"){
    seller
    name
    detail
    price
  }
}
```

17) 게시물 목록 중, 2페이지를 조회해 보세요.
```
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
```

18) 게시물 목록을 조회할 때, page를 입력하지 않으면, 어떤 결과가 발생하나요?
```
query{
  fetchBoards() {
    number
    writer
    title
    contents
    like
    createdAt
  }
}

// "message": "Syntax Error: Expected Name, found \")\"."
```

19) 프로필이 전체 몇 개가 있는지 확인해 보세요.
```
query{
  fetchProfilesCount
}

// 69개
```


20) 게시물은 몇 개가 있나요?
```
query{
  fetchBoardsCount
}

// 135개
```


### 2. practice 레벨2 GRAPHQL 연습하기
1) createBoard를 활용해, 게시물을 하나 등록해 주세요. 
```
mutation {
  createBoard(
    createBoardInput: 
    {
      writer: "김은경"
      password: "1234"
      title: "레벨 2 과제도 한가득"
      contents: "고양이 보고 힘내"
      youtubeUrl:"https://youtu.be/UdyPF1SHlW0?si=__x84RnkwLHaAQ3u"
    }
  ){
    _id
    writer
    title
    contents
    youtubeUrl
  }
}

// "_id": "68b53919db6659002999862f"
```

2) 등록한 게시글의 제목과 내용은 무엇인가요?
```
query{
  fetchBoard(
    boardId:"68b53919db6659002999862f"
  ){
    title
    contents
  }
}
```

3) 등록한 게시글에 좋아요를 1 올려주세요.
```
mutation{
  likeBoard
  (
    boardId:"68b53919db6659002999862f"
  )
}
```

4) 등록한 게시글에 싫어요도 1 올려주세요.
```
mutation{
  dislikeBoard
  (
    boardId:"68b53919db6659002999862f"
  )
}
```

5) 등록한 게시글의 좋아요와 싫어요는 각각 몇 개 인가요?
```
query{
  fetchBoard(
    boardId:"68b53919db6659002999862f"
  ){
    likeCount
    dislikeCount
  }
}

// 좋아요 1개, 싫어요 1개
```

6) 현재 등록된 게시글의 총 갯수는 몇 개 인가요? 
```
query{
  fetchBoardsCount
}

// 14295개
```

7) 등록한 게시글의 제목을 수정해 보세요!
```
mutation{
  updateBoard(
    updateBoardInput:{
      title: "피곤하당"
    }
    password: "1234"
    boardId: "68b53919db6659002999862f"
  ) {
    writer
    title
    youtubeUrl
    deletedAt
}
```

8) fetchBoards 전체 게시물 조회를 활용하여 방금 쓴 게시물을 검색해 보세요.
```
query{
  fetchBoards(
    search: "피곤하당"
  ) {
    writer
    title
    contents
    youtubeUrl
    deletedAt
  }
}
```

9) 등록한 게시글에 댓글을 3개 추가해 보세요.
```
// 첫번째 댓글
mutation{
  createBoardComment(
    createBoardCommentInput: {
      writer: "고양이1"
      password: "2345"
      contents:"퍼가요~"
      rating:5
    }
    boardId:"68b53919db6659002999862f"
  ) {
    writer
    deletedAt
  }
}

// 두번째 댓글
mutation{
  createBoardComment(
    createBoardCommentInput: {
      writer: "고양이2"
      password: "3456"
      contents:"먼치킨 다리가 짧아서 귀엽다"
      rating:4
    }
    boardId:"68b53919db6659002999862f"
  ) {
    writer
    deletedAt
  }
}

// 세번째 댓글
mutation{
  createBoardComment(
    createBoardCommentInput: {
      writer: "아카자"
      password: "3456"
      contents:"귀멸의칼날 보러 가고싶다"
      rating:3
    }
    boardId:"68b53919db6659002999862f"
  ) {
    writer
    deletedAt
  }
}
```

10) 첫번째 댓글의 내용을 수정해 보세요!
```
mutation{
  updateBoardComment(
    updateBoardCommentInput:{
      contents:"퍼가요~🩷"
    }
    password:"2345"
    boardCommentId: "68b53c71db66590029998634"
    
  ) {
    writer
    contents
  }
}
```

11) 두번째 댓글을 삭제해 보세요!
```
mutation{
  deleteBoardComment(
    password:"3456"
    boardCommentId:"68b53c99db66590029998635"
  )
}
```

12) 등록한 게시글에 달려있는 모든 댓글을 조회해 보세요.
```
query{
  fetchBoardComments(boardId:"68b53919db6659002999862f") {
    writer
    contents
  }
}
```

13) BEST 게시글을 조회해 보세요! (API 이름을 잘 찾아보세요!)
```
query{
  fetchBoardsOfTheBest {
    writer
    youtubeUrl
    deletedAt
    likeCount
  }
}
```

14) 회원가입을 해보세요! 사용자, 즉 User를 만드는 API입니다!
```
mutation{
  createUser(
    createUserInput:{
      email:"szeunkk@gmail.com"
      password: "qwer"
      name: "김은경"
    }
  ) {
    _id
    email
    name
  }
}
```