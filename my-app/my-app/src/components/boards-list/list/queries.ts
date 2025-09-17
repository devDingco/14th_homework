import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
export const FERTCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;
