import { gql } from '@apollo/client';

// 게시글 생성을 위한 GraphQL 뮤테이션
const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      # boardAddress {
      #   zipcode
      #   address
      #   addressDetail
      # }
      # user {
      #   _id
      #   email
      #   name
      # }
      # createdAt
      # updatedAt
      # deletedAt
    }
  }
`;
// 게시글 수정을 위한 GraphQL 뮤테이션
const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput! # 수정할 데이터
    $password: String # 비밀번호 검증용
    $boardId: ID! # 수정할 게시글 ID
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
