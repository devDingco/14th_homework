import { gql } from '@apollo/client';

export const FETCH_BOARD_COMMENTS_QUERY = gql`
  query FetchBoardComments($boardId: ID!, $page: Int) {
    fetchBoardComments(boardId: $boardId, page: $page) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;
