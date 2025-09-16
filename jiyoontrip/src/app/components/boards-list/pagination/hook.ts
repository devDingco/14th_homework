"use client";

import { useQuery } from "@apollo/client";
import { FERTCH_BOARDS_COUNT, FETCH_BOARDS } from "./queires";
import { useState } from "react";

export default function usePagination() {
  const { refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FERTCH_BOARDS_COUNT);
  const [startPage, setStartPage] = useState(1);
  const lastPage = Math.ceil(dataBoardsCount?.fetchBoardsCount ?? 10 / 10);
  const onClickPage = (event) => {
    refetch({ page: Number(event?.target.id) });
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

  return {
    onClickNextPage,
    onClickPrevPage,
    onClickPage,
    lastPage,
    startPage,
  };
}
