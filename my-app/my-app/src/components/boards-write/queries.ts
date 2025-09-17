import { gql } from "@apollo/client";

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
        zipcode
        address
        addressDetail
      }
      user {
        _id
        email
        name
        picture
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
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
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
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
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;
