"use client";

import Image from "next/image";
import styles from "./styles.module.css";

export default function PaginationComponent({
  onClickNextPage,
  onClickPrevPage,
  onClickPage,
  startPage,
  lastPage,
  currnetPage,
}: any) {
  return (
    <>
      <div className={styles.pagination}>
        <button className={styles.prevButton} onClick={onClickPrevPage}>
          <Image
            src="/icons/outline/left_arrow.svg"
            alt="ProfileIcon"
            width={24}
            height={24}
            sizes="100vw"
          />
        </button>
        <div className={styles.buttonEnroll}>
          {new Array(10).fill("지윤").map(
            (_, index) =>
              index + startPage <= lastPage && ( // 마지막 페이지가 13페이지이고 스타트페이지가 11이면 11,12,13만 출력한다 ~
                <button
                  className={`${styles.button} ${
                    currnetPage === index + startPage ? styles.currentButton : ""
                  } `}
                  id={String(index + startPage)}
                  key={index + startPage}
                  onClick={onClickPage}
                >
                  {index + startPage}
                </button>
              )
          )}
        </div>
        <button className={styles.nextButton} onClick={onClickNextPage}>
          <Image
            src="/icons/outline/right_arrow.svg"
            alt="ProfileIcon"
            width={24}
            height={24}
            sizes="100vw"
          />
        </button>
      </div>
    </>
  );
}
