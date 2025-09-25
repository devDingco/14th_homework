"use client";

import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/gql/graphql";
// import BannerList from "@/commons/layout/banner";
// import Navigation from "@/commons/layout/navigation";
import BoardList from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useQuery } from "@apollo/client";
import styles from "./styles.module.css";
import { useState } from "react";
import { usePagination } from "@/components/boards-list/pagination/hook";

export default function BoardsPage() {
  const { data, refetch } = useQuery(FetchBoardsDocument);
  // -> useQuery(FETCH_BOARDS)를 실행하면 객체 하나가 리턴! => 여러 속성들 중 data랑 refetch만 꺼내서 쓴거임!(구조 분해 할당)
  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  // -> data라는 이름이 중복되니까 dataBoardsCount라는 별칭으로 받아온 거
  // -> 즉, dataBoardsCount?.fetchBoardsCount → 전체 게시글 개수 값.
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  const {
    startPage,
    currentPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  } = usePagination({ refetch, lastPage });

  return (
    <>
      <div className={styles.boardBody}>
        <div className={styles.boardFrame}>
          <BoardList page={currentPage} data={data} refetch={refetch} />
          <Pagination
            page={currentPage}
            data={data}
            refetch={refetch}
            lastPage={lastPage}
          />
        </div>
      </div>
    </>
  );
}
