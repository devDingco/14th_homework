'use client';

import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from '@/apis/graphql/board';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import _ from 'lodash';

export const usePagination = () => {
  const [keyword, setKeyword] = useState('');
  const [startPage, setStartPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date('2026-01-01'));

  console.log(endDate);
  // Current page
  const [page, setPage] = useState(1);

  // fetch 데이터
  const { data, loading, error, refetch } = useQuery(FETCH_BOARDS, {
    variables: { search: keyword, page, startDate, endDate },
  });
  const { data: countData } = useQuery(FETCH_BOARDS_COUNT, {
    variables: { search: keyword, startDate, endDate },
  });

  // 파생상태
  const maxPage = Math.ceil((countData?.fetchBoardsCount ?? 0) / 10);

  const refetchBoards = () => {
    refetch({ search: keyword, page, startDate, endDate });
  };

  const getDebounce = _.debounce((value) => {
    setKeyword(value);
    setStartPage(1);
    setPage(1);
    refetch({ search: value, page: 1, startDate, endDate });
  }, 500);

  const onPrevPage = () => {
    if (startPage === 1) return;
    setStartPage((prev) => prev - 5);
    setPage(startPage - 5);
    refetch({ search: keyword, page: startPage - 5 });
  };

  const onNextPage = () => {
    if (startPage + 5 > maxPage) return;
    setStartPage((prev) => prev + 5);
    setPage(startPage + 5);
    refetch({ search: keyword, page: startPage + 5 });
  };

  return {
    keyword,
    setKeyword,
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
    getDebounce,
    refetchBoards,
    //
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  };
};
