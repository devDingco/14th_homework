'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QueryFetchBoardCommentsArgs } from '@/commons/graphql/graphql';
import { FETCH_BOARD_COMMENTS } from './queries';
import { useParams } from 'next/navigation';

export default function useCommentList() {
  const url = useParams();
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      const result = await fetchMore({
        variables: {
          boardId: String(url.boardId),
          page: nextPage,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          // 더 이상 데이터가 없으면 무한 스크롤 중단
          if (!fetchMoreResult?.fetchBoardComments?.length) {
            setHasMore(false);
            return prev;
          }

          // 기존 댓글 ID들을 Set으로 관리하여 중복 방지
          const existingIds = new Set(
            (prev.fetchBoardComments || []).map((comment) => comment._id)
          );

          // 새로운 댓글 중 중복되지 않은 것만 필터링
          const newComments = fetchMoreResult.fetchBoardComments.filter(
            (comment) => !existingIds.has(comment._id)
          );

          // 중복 제거된 댓글들만 추가
          return {
            fetchBoardComments: [...(prev.fetchBoardComments || []), ...newComments],
          };
        },
      });

      // 새로 받아온 댓글이 10개 미만이면 더 이상 댓글이 없다고 판단
      if (result.data && result.data.fetchBoardComments) {
        const newCommentsCount =
          result.data.fetchBoardComments.length - (data?.fetchBoardComments?.length || 0);
        if (newCommentsCount < 10) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('댓글 추가 로딩 에러:', err);
      setHasMore(false);
    }
  };

  console.log('data: ', data, 'error: ', error);
  console.log('현재 페이지:', currentPage);
  console.log('댓글 개수:', data?.fetchBoardComments?.length);

  return {
    url,
    commentVariables,
    data,
    error,
    hasMore,
    loadMoreComments,
  };
}
