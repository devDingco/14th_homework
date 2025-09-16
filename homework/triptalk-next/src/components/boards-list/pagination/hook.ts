'use client';

import { useState } from 'react';

export const usePagination = (props) => {
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickPage = (event) => {
    const page = Number(event.target.id);
    setCurrentPage(page);
    props.refetch({ page });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;

    setStartPage(startPage - 5);
    setCurrentPage(startPage - 5);
    props.refetch({ page: startPage - 5 });
  };

  const onClickNextPage = () => {
    if (startPage + 5 <= props.lastPage) {
      setStartPage(startPage + 5);
      setCurrentPage(startPage + 5);
      props.refetch({ page: startPage + 5 });
    }
  };

  return {
    startPage,
    currentPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};
