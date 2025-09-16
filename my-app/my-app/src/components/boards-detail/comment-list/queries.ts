import { gql } from "@apollo/client";

export const FETCH_BOARD_COMMENTS = gql`
  query FetchBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
