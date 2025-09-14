'use client';

import { useQuery } from '@apollo/client';
import { QueryFetchBoardCommentsArgs } from '@/commons/graphql/graphql';
import { FETCH_BOARD_COMMENTS } from './queries';
import { useParams } from 'next/navigation';

export default function useCommentList() {
  const url = useParams();
  //   console.log(url.boardId);

  const commentVariables = {
    boardId: String(url.boardId),
  };

  const { data, error } = useQuery(FETCH_BOARD_COMMENTS, { variables: commentVariables });

  console.log('data: ', data, 'error: ', error);

  return {
    url,
    commentVariables,
    data,
    error,
  };
}
