import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query FetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;


