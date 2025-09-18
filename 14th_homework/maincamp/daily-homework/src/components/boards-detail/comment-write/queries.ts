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

// 댓글수정 mutation
export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $password: String!
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      updateBoardCommentInput: $updateBoardCommentInput
      password: $password
      boardCommentId: $boardCommentId
    ) {
      _id
      contents
      rating
      updatedAt
    }
  }
`;
