'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { 
  FetchBoardDocument, 
  FetchBoardQuery, 
  FetchBoardQueryVariables } from '@/commons/graphql/graphql';

export default function useDetail() {
  const url = useParams();
  const router = useRouter();
  const [koreaTime, setKoreaTime] = useState('');

  const boardId = String(url.boardId);

  // console.log('boardId:', url.boardId);
  const { data, loading, error } = useQuery<
  FetchBoardQuery,
  FetchBoardQueryVariables
>(FetchBoardDocument, {
  variables: { boardId },
});
  console.log('GraphQL data:', data, 'loading:', loading, 'error:', error);

  const dt = data?.fetchBoard?.createdAt;

  // hydration 에러 방지를 위해 useEffect에서 날짜 포맷팅
  useEffect(() => {
    if (dt) {
      setKoreaTime(dayjs(dt).format('YYYY-MM-DD HH:mm:ss'));
    }
  }, [dt]);

  return {
    url,
    router,
    data,
    boardId,
    dt,
    koreaTime,
    loading,
    error,
  };
}
