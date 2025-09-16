"use client";

import styles from "./styles.module.css";
import { IPropsPagination } from "./types";

export default function Pagination({
  currentPage,
  lastPage,
  startPage,
  onClickPage,
  onClickPrevPage,
  onClickNextPage,
}: IPropsPagination) {
  return (
    <div className={styles.pagination}>
      <button className={styles.arrow} onClick={onClickPrevPage}>
        {"<<"}
      </button>
      {new Array(10).fill(1).map(
        (_, index) =>
          startPage + index <= lastPage && (
            <button
              key={startPage + index}
              onClick={() => onClickPage(startPage + index)}
              className={
                currentPage === startPage + index
                  ? styles.activePage
                  : styles.page
              }
            >
              {startPage + index}
            </button>
          )
      )}
      <button className={styles.arrow} onClick={onClickNextPage}>
        {">>"}
      </button>
    </div>
  );
}
