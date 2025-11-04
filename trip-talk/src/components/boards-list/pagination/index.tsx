"use client";
import usePagination from "./hook";
import Image from "next/image";
import styles from "./styles.module.css";
export default function Pagination(props) {
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
          if (index + startPage <= props.lastPage)
            return (
              <button
                key={index + startPage}
                id={String(index + startPage)}
                onClick={onClickPage}
              >
                {index + startPage}
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
