'use client';

import { useState } from 'react';

export default function usePagination({ refetch, lastPage }) {
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPage = (event) => {
    const page = Number(event.target.id);
    setCurrentPage(page);
    refetch({ page });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;

    setStartPage(startPage - 10);
    setCurrentPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setCurrentPage(startPage + 10);
      refetch({ page: startPage + 10 });
    }
  };
}
