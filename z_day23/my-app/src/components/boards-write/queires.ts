import { gql } from "@apollo/client";

// Mutation for creating a board
export const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

// Query for fetching a single board
export const FETCH_BOARD = gql`
  query fetchBoardWrite($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

// Mutation for updating a board
export const UPDATE_BOARD = gql`
  mutation updateBoardWrite(
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
      title
      contents
      writer
    }
  }
`;
