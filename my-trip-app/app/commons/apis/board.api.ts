"use client";

import { apolloClient } from '../graphql/apollo-client';
import { CreateBoardInput } from '../graphql/__generated__/graphql';
import { CREATE_BOARD_MUTATION, UPLOAD_FILE_MUTATION, LIKE_BOARD_MUTATION, DISLIKE_BOARD_MUTATION } from '../graphql/mutations/board';
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