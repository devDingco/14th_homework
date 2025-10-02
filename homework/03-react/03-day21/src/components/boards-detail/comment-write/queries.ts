import { gql } from "@apollo/client";

// 댓글 등록 Mutation
export const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $boardId: ID!
    $createBoardCommentInput: CreateBoardCommentInput!
  ) {
    createBoardComment(
      boardId: $boardId
      createBoardCommentInput: $createBoardCommentInput
    ) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;


// 댓글 수정 쿼리
export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $boardCommentId: ID!
    $password: String!
    $updateBoardCommentInput: UpdateBoardCommentInput!
  ){
    updateBoardComment(
      boardCommentId: $boardCommentId
      password: $password
      updateBoardCommentInput: $updateBoardCommentInput
    ) {
      _id
      contents
      rating
      updatedAt
    }
  }

`
