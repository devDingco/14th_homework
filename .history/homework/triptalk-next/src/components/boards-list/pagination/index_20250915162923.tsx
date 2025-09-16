'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function Pagination({ onPageChange }) {
  const [startPage, setStartPage] = useState(1);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  const onClickPage = (event) => {
    onPageChange({ page: Number(event.target.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;

    setStartPage(startPage - 10);
    onPageChange({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      onPageChange({ page: startPage + 10 });
    }
  };

  return (
    <div>
      <button onClick={onClickPrevPage}>이전페이지</button>
      {new Array(10).fill('철수').map(
        (_, index) =>
          index + startPage <= lastPage && (
            <button
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
            >
              {index + startPage}
            </button>
          )
      )}
      <button onClick={onClickNextPage}>다음페이지</button>
    </div>
  );
}
