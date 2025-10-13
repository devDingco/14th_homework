import { gql } from "@apollo/client";

export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String!
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      title
      contents
      updatedAt
    }
  }
`;

export const FETCH_BOARD_WRITE = gql`
  query fetchBoardWrite($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const FETCH_BOARD_FOR_EDIT = gql`
  query fetchBoardForEdit($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;