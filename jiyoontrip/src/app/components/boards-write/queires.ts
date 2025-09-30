import { gql } from "@apollo/client";

export const CREAT_BOARD = gql`
  # ↓↓↓↓↓↓↓↓↓↓변수 타입 정하는 곳 ↓↓↓↓↓↓↓↓↓↓↓↓
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    # ↓↓↓↓↓↓↓↓↓↓ 실제로 내가 입력하는 곳 ↓↓↓↓↓↓↓↓↓↓↓↓
    createBoard(createBoardInput: $createBoardInput) {
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
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
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
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      _id
      url
      createdAt
      updatedAt
      isUsed
    }
  }
`;
