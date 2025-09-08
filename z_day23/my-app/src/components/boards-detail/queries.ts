import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoardDetail($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoardDetail(
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
      createdAt
    }
  }
`;
