import { gql } from "@apollo/client";

export const FETCH_BORAD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      createdAt
      youtubeUrl
    }
  }
`;
