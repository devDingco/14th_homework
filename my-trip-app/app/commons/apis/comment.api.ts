"use client";

import { apolloClient } from '@/commons/graphql/apollo-client';
import { CreateBoardCommentInput, UpdateBoardCommentInput } from '@/commons/graphql/__generated__/graphql';
import { 
  CREATE_BOARD_COMMENT_MUTATION, 
  UPDATE_BOARD_COMMENT_MUTATION, 
  DELETE_BOARD_COMMENT_MUTATION 
} from '@/commons/graphql/mutations/comment';
import { FETCH_BOARD_COMMENTS_QUERY } from '@/commons/graphql/queries/comment';

export async function fetchBoardCommentsApi(boardId: string, page?: number) {
  const { data } = await apolloClient.query({
    query: FETCH_BOARD_COMMENTS_QUERY,
    variables: { boardId, page },
    fetchPolicy: 'network-only', // 항상 최신 데이터 가져오기
  });
  return data?.fetchBoardComments ?? [];
}

export async function createBoardCommentApi(boardId: string, input: CreateBoardCommentInput) {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_BOARD_COMMENT_MUTATION,
    variables: { boardId, createBoardCommentInput: input },
    refetchQueries: [
      {
        query: FETCH_BOARD_COMMENTS_QUERY,
        variables: { boardId }
      }
    ]
  });
  return data?.createBoardComment ?? null;
}

export async function updateBoardCommentApi(
  boardCommentId: string, 
  input: UpdateBoardCommentInput, 
  password?: string,
  boardId?: string
) {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_BOARD_COMMENT_MUTATION,
    variables: { boardCommentId, updateBoardCommentInput: input, password },
    refetchQueries: boardId ? [
      {
        query: FETCH_BOARD_COMMENTS_QUERY,
        variables: { boardId }
      }
    ] : []
  });
  return data?.updateBoardComment ?? null;
}

export async function deleteBoardCommentApi(boardCommentId: string, password?: string, boardId?: string) {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_BOARD_COMMENT_MUTATION,
    variables: { boardCommentId, password },
    refetchQueries: boardId ? [
      {
        query: FETCH_BOARD_COMMENTS_QUERY,
        variables: { boardId }
      }
    ] : []
  });
  return data?.deleteBoardComment ?? null;
}
