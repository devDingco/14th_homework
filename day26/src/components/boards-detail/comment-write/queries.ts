import { gql } from "@apollo/client";


export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $createBoardCommentInput: CreateBoardCommentInput!
    $boardId: ID!
  ) {
    createBoardComment(
      createBoardCommentInput: $createBoardCommentInput
      boardId: $boardId
    ) {
      _id
    }
  }
`;

// 아래 쿼리는 댓글 목록을 다시 불러올 때 필요합니다.
export const FETCH_BOARD_COMMENTS = gql`
  query FetchBoardComments($boardId: ID!) {
    fetchBoardComments(boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;
// queries.ts: fetchBoardComments API 요청서를 보관하는 곳