import { gql } from "@apollo/client";

export const FETCH_BOARD_DETAIL = gql`
  query fetchBoardDetail($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      createdAt
      updatedAt
    }
  }
`;