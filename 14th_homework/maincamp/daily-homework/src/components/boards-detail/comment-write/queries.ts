import { gql } from '@apollo/client';

// 댓글달기 mutation
export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {
    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {
      _id
      contents
      rating
      createdAt
    }
  }
`;
