'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QueryFetchBoardCommentsArgs } from '@/commons/graphql/graphql';
import { FETCH_BOARD_COMMENTS } from './queries';
import { useParams } from 'next/navigation';

export default function useCommentList() {
  const url = useParams();
  const [hasMore, setHasMore] = useState(true);

  const commentVariables = {
    boardId: String(url.boardId),
    page: 1, // 첫 페이지부터 시작
  };

  const { data, error, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: commentVariables,
    notifyOnNetworkStatusChange: true,
  });

  // 댓글 불러오기
  const loadMoreComments = async () => {
    if (!data?.fetchBoardComments) return;

    try {
      const currentPage = Math.ceil(data.fetchBoardComments.length / 10) + 1;

      const result = await fetchMore({
        variables: {
          boardId: String(url.boardId),
          page: currentPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          // 더 이상 데이터가 없으면 무한 스크롤 중단
          if (!fetchMoreResult?.fetchBoardComments?.length) {
            setHasMore(false);
            return prev;
          }

          // 기존 댓글과 새 댓글을 합치기
          return {
            fetchBoardComments: [
              ...(prev.fetchBoardComments || []),
              ...fetchMoreResult.fetchBoardComments,
            ],
          };
        },
      });

      // 받아온 댓글이 10개 미만이면 더 이상 댓글이 없다고 판단
      if (result.data.fetchBoardComments.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('댓글 추가 로딩 에러:', err);
      setHasMore(false);
    }
  };

  console.log('data: ', data, 'error: ', error);

  return {
    url,
    commentVariables,
    data,
    error,
    hasMore,
    loadMoreComments,
  };
}
