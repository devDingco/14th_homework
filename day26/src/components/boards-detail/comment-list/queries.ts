import { gql } from "@apollo/client";

// [요청서 1] 게시글 목록 조회 (Query)
export const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      createdAt
    }
  }
`;

// [요청서 2] 게시글 삭제 (Mutation)
export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;