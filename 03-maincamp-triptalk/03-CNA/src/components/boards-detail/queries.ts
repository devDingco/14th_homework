import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoardDetail($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
      createdAt
    }
  }
`;