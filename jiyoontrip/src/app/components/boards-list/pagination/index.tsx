"use client";

import usePagination from "./hook";

export default function PaginationComponent() {
  const { onClickNextPage, onClickPrevPage, onClickPage, lastPage, startPage } =
    usePagination();

  return (
    <>
      <div>
        <button onClick={onClickPrevPage}>이전페이지</button>
        {new Array(10).fill("지윤").map(
          (_, index) =>
            index + startPage <= lastPage && ( // 마지막 페이지가 13페이지이고 스타트페이지가 11이면 11,12,13만 출력한다 ~
              <button
                id={String(index + startPage)}
                key={index + startPage}
                onClick={onClickPage}
              >
                {index + startPage}
              </button>
            )
        )}
        <button onClick={onClickNextPage}>다음페이지</button>
      </div>
    </>
  );
}
