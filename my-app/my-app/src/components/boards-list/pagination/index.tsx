"use client";

import styles from "./styles.module.css";
import { usePagination } from "./hook";
import Image from "next/image";
import { IPaginationProps } from "./types";

import PrevPageImg from "../pagination/assets/chevron_right_24dp_5F6368_FILL1_wght400_GRAD0_opsz24 2.svg";
import NextPageImg from "../pagination/assets/chevron_right_24dp_5F6368_FILL1_wght400_GRAD0_opsz24 1.svg";

export default function Pagination(props: IPaginationProps) {
  const { startPage, onClickPage, onClickPrevPage, onClickNextPage } =
    usePagination(props);

  return (
    <div className={styles.pagination}>
      <button onClick={onClickPrevPage}>
        <Image src={PrevPageImg} alt="PrevPageImg" />
      </button>
      <div className={styles.paginationNum}>
        {new Array(5).fill("희주").map(
          (_, index) =>
            index + startPage <= props.lastPage && (
              // <= lastPage 의미
              // 마지막 페이지 번호(lastPage)를 넘어가면 안 되니까 조건을 써둔 거!
              <button
                key={index + startPage}
                id={String(index + startPage)}
                className={styles.paginationNum_Button}
                onClick={onClickPage}
              >
                {index + startPage}
              </button>
            )
        )}
      </div>
      <button onClick={onClickNextPage}>
        <Image src={NextPageImg} alt="NextPageImg" />
      </button>
    </div>
  );
}
