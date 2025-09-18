'use client';

import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from '@/apis/graphql/board';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export const usePagination = () => {
  const [startPage, setStartPage] = useState(1);

  // Current page
  const [page, setPage] = useState(1);

  const { data: countData } = useQuery(FETCH_BOARDS_COUNT);
  const maxPage = Math.ceil((countData?.fetchBoardsCount ?? 0) / 10);

  const { data, loading, error, refetch } = useQuery(FETCH_BOARDS, {
    variables: { page },
  });

  const onPrevPage = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 5);
    setPage(startPage - 5);
    refetch({ page: startPage - 5 });
  };
  const onNextPage = () => {
    if (startPage + 5 > maxPage) return;
    setStartPage((prev) => prev + 5);
    setPage(startPage + 5);
    refetch({ page: startPage + 5 });
  };

  return {
    startPage,
    setStartPage,
    page,
    setPage,
    maxPage,
    data,
    loading,
    error,
    onPrevPage,
    onNextPage,
  };
};
