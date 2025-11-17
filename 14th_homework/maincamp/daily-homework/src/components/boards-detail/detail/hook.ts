'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  FetchBoardDocument,
  FetchBoardQuery,
  FetchBoardQueryVariables,
} from '@/commons/graphql/graphql';
import { LIKE_BOARD, DISLIKE_BOARD } from './queries';

export default function useDetail() {
  const url = useParams();
  const router = useRouter();
  const [koreaTime, setKoreaTime] = useState('');

  const boardId = String(url.boardId);

  // console.log('boardId:', url.boardId);
  const { data, loading, error, refetch } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(
    FetchBoardDocument,
    {
      variables: { boardId },
    }
  );
  console.log('GraphQL data:', data, 'loading:', loading, 'error:', error);

  const [likeBoard] = useMutation(LIKE_BOARD, {
    update: (cache) => {
      // 캐시에서 현재 보드 데이터 읽기
      const existingData = cache.readQuery<FetchBoardQuery, FetchBoardQueryVariables>({
        query: FetchBoardDocument,
        variables: { boardId },
      });

      if (existingData?.fetchBoard) {
        // Optimistic UI: likeCount를 1 증가
        cache.writeQuery<FetchBoardQuery, FetchBoardQueryVariables>({
          query: FetchBoardDocument,
          variables: { boardId },
          data: {
            fetchBoard: {
              ...existingData.fetchBoard,
              likeCount: existingData.fetchBoard.likeCount + 1,
            },
          },
        });
      }
    },
    optimisticResponse: {
      likeBoard: data?.fetchBoard?.likeCount ? data.fetchBoard.likeCount + 1 : 1,
    },
  });

  const [dislikeBoard] = useMutation(DISLIKE_BOARD, {
    update: (cache) => {
      // 캐시에서 현재 보드 데이터 읽기
      const existingData = cache.readQuery<FetchBoardQuery, FetchBoardQueryVariables>({
        query: FetchBoardDocument,
        variables: { boardId },
      });

      if (existingData?.fetchBoard) {
        // Optimistic UI: dislikeCount를 1 증가
        cache.writeQuery<FetchBoardQuery, FetchBoardQueryVariables>({
          query: FetchBoardDocument,
          variables: { boardId },
          data: {
            fetchBoard: {
              ...existingData.fetchBoard,
              dislikeCount: existingData.fetchBoard.dislikeCount + 1,
            },
          },
        });
      }
    },
    optimisticResponse: {
      dislikeBoard: data?.fetchBoard?.dislikeCount ? data.fetchBoard.dislikeCount + 1 : 1,
    },
  });

  const dt = data?.fetchBoard?.createdAt;

  // hydration 에러 방지를 위해 useEffect에서 날짜 포맷팅
  useEffect(() => {
    if (dt) {
      setKoreaTime(dayjs(dt).format('YYYY-MM-DD HH:mm:ss'));
    }
  }, [dt]);

  const handleLike = async () => {
    try {
      await likeBoard({
        variables: { boardId },
      });
      // Optimistic UI로 인해 refetch 불필요, 하지만 서버와 동기화를 위해 유지
      refetch();
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
      // 에러 발생 시 캐시 롤백을 위해 refetch
      refetch();
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeBoard({
        variables: { boardId },
      });
      // Optimistic UI로 인해 refetch 불필요, 하지만 서버와 동기화를 위해 유지
      refetch();
    } catch (error) {
      console.error('싫어요 처리 중 오류 발생:', error);
      // 에러 발생 시 캐시 롤백을 위해 refetch
      refetch();
    }
  };

  return {
    url,
    router,
    data,
    boardId,
    dt,
    koreaTime,
    loading,
    error,
    handleLike,
    handleDislike,
  };
}
