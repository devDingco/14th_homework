import { gql } from "@apollo/client";

export const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      title
      writer
      contents
      createdAt
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
        deletedAt
      }
      updatedAt
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;
