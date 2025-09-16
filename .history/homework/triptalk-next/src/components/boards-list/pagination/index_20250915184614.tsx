'use client';

import { useState } from 'react';
import styles from './pagination.module.css';
import Image from 'next/image';

export default function Pagination({ props }) {
  const { startPage, onClickPage, currentPage, onClickNextPage };

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.navButton} onClick={onClickPrevPage}>
        <Image
          src="/icons/arrow.png"
          alt="화살표"
          width={24}
          height={24}
          style={{ transform: 'scaleX(-1)' }}
        ></Image>
      </button>
      {new Array(5).fill('철수').map(
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
        <Image
          src="/icons/arrow.png"
          alt="화살표"
          width={24}
          height={24}
        ></Image>
      </button>
    </div>
  );
}
