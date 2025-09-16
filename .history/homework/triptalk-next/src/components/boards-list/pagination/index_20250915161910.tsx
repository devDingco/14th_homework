'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const FETCH_BOARDS_PAGINATION = gql`
  query fetchBoards($page: Int) {
    fetchBoards(page: $page) {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function Pagination() {
  const [startPage, setStartPage] = useState(1);
  const { data, refetch } = useQuery(FETCH_BOARDS_PAGINATION);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  const onClickPage = (event) => {
    refetch({ page: Number(event.target.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;

    setStartPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      refetch({ page: startPage + 10 });
    }
  };

  return (
    <div>
      {data?.fetchBoards.map((el) => (
        <div key={el.id}>
          <span>{el.title}</span>
          <span>{el.writer}</span>
        </div>
      ))}

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
