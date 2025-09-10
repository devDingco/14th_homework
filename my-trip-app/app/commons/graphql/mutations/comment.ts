import { gql } from '@apollo/client';

export const CREATE_BOARD_COMMENT_MUTATION = gql`
  mutation CreateBoardComment($boardId: ID!, $createBoardCommentInput: CreateBoardCommentInput!) {
    createBoardComment(boardId: $boardId, createBoardCommentInput: $createBoardCommentInput) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BOARD_COMMENT_MUTATION = gql`
  mutation UpdateBoardComment($boardCommentId: ID!, $updateBoardCommentInput: UpdateBoardCommentInput!, $password: String) {
    updateBoardComment(boardCommentId: $boardCommentId, updateBoardCommentInput: $updateBoardCommentInput, password: $password) {
      _id
      writer
      contents
      rating
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BOARD_COMMENT_MUTATION = gql`
  mutation DeleteBoardComment($boardCommentId: ID!, $password: String) {
    deleteBoardComment(boardCommentId: $boardCommentId, password: $password)
  }
`;
