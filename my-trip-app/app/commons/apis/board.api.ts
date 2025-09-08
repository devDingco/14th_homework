"use client";

import { apolloClient } from '../graphql/apollo-client';
import { CreateBoardInput, UpdateBoardInput } from '../graphql/__generated__/graphql';
import { CREATE_BOARD_MUTATION, UPLOAD_FILE_MUTATION, LIKE_BOARD_MUTATION, DISLIKE_BOARD_MUTATION, UPDATE_BOARD_MUTATION } from '../graphql/mutations/board';
import { FETCH_BOARD_QUERY } from '../graphql/queries/board';
import { gql } from '@apollo/client';

export async function fetchBoardApi(boardId: string) {
  const { data } = await apolloClient.query({
    query: gql`${FETCH_BOARD_QUERY}`,
    variables: { boardId },
    fetchPolicy: 'cache-first',
  });
  return data?.fetchBoard ?? null;
}

export async function createBoardApi(input: CreateBoardInput) {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_BOARD_MUTATION,
    variables: { createBoardInput: input },
  });
  return data?.createBoard ?? null;
}

export async function uploadFileApi(file: File) {
  const { data } = await apolloClient.mutate({
    mutation: UPLOAD_FILE_MUTATION,
    variables: { file },
    context: {
      useMultipart: true,
    },
  });
  return data?.uploadFile ?? null;
}

export async function likeBoardApi(boardId: string) {
  const { data } = await apolloClient.mutate({
    mutation: LIKE_BOARD_MUTATION,
    variables: { boardId },
  });
  return data?.likeBoard ?? 0;
}

export async function dislikeBoardApi(boardId: string) {
  const { data } = await apolloClient.mutate({
    mutation: DISLIKE_BOARD_MUTATION,
    variables: { boardId },
  });
  return data?.dislikeBoard ?? 0;
}

export async function updateBoardApi(boardId: string, password: string, input: UpdateBoardInput) {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_BOARD_MUTATION,
    variables: { boardId, password, updateBoardInput: input },
  });
  return data?.updateBoard ?? null;
}