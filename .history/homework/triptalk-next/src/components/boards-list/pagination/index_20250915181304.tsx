'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import styles from './pagination.module.css';
import Image from 'next/image';

const FETCH_BOARDS_COUNT = gql`
  query {
    fetchBoardsCount
  }
`;

export default function Pagination({ refetch }) {
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

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

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.navButton} onClick={onClickPrevPage}>
        <Image
          src="/icons/arrow.png"
          alt="화살표"
          width={24}
          height={24}
        ></Image>
      </button>
      {new Array(10).fill('철수').map(
        (_, index) =>
          index + startPage <= lastPage && (
            <button
              key={index + startPage}
              id={String(index + startPage)}
              onClick={onClickPage}
              className={
                currentPage === index + startPage
                  ? styles.pageButtonActive
                  : styles.pageButton
              }
            >
              {index + startPage}
            </button>
          )
      )}
      <button className={styles.navButton} onClick={onClickNextPage}>
        다음페이지
      </button>
    </div>
  );
}
