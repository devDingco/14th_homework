"use client";
import usePagination from "./hook";
import Image from "next/image";
import styles from "./styles.module.css";

interface PaginationProps {
  lastPage: number;
  setQueryVariables: (fn: (prev: any) => any) => void;
  currentPage: number;
}

export default function Pagination(props: PaginationProps) {
  const { onClickPage, onClickPrevPage, onClickNextPage, startPage } =
    usePagination(props);

  return (
    <div className={styles.pagenations}>
      {/* <div> */}
      <Image
        src={"/images/left_arrow.png"}
        onClick={onClickPrevPage}
        alt="이전페이지"
        width={12}
        height={12}
      />
      {/* </div> */}

      <div className={styles.pagination}>
        {new Array(5).fill(0).map((el, index) => {
          const pageNumber = index + startPage;
          if (pageNumber <= props.lastPage)
            return (
              <button
                key={pageNumber}
                id={String(pageNumber)}
                onClick={onClickPage}
                className={pageNumber === props.currentPage ? styles.active : ""}
              >
                {pageNumber}
              </button>
            );
        })}
      </div>
      {/* <div> */}
      <Image
        src={"/images/right_arrow.png"}
        onClick={onClickNextPage}
        alt="이전페이지"
        width={12}
        height={12}
      />
      {/* </div> */}
    </div>
  );
}
