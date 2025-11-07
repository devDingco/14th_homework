"use client";

import { useState } from "react";
import { FECTH_BOARDS_COUNT, FETCH_BOARDS } from "./queries";
import { useQuery } from "@apollo/client";

interface PaginationProps {
  lastPage: number;
  setQueryVariables: (fn: (prev: any) => any) => void;
  currentPage: number;
}

export default function usePagination(props: PaginationProps) {
  const [startPage, setStartPage] = useState(1);
  // const { data, refetch } = useQuery(FETCH_BOARDS);
  // const { data: dataBoardsCount } = useQuery(FECTH_BOARDS_COUNT);

  // const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  const onClickPage = (event) => {
    // refetch 대신 queryVariables 업데이트
    props.setQueryVariables((prev) => ({
      ...prev,
      page: Number(event.target.id),
    }));
  };
  const onClickPrevPage = () => {
    if (startPage > 1) {
      setStartPage(startPage - 5);
      props.setQueryVariables((prev) => ({
        ...prev,
        page: startPage - 5,
      }));
    }
  };
  const onClickNextPage = () => {
    if (startPage + 5 <= props.lastPage) {
      setStartPage(startPage + 5);
      props.setQueryVariables((prev) => ({
        ...prev,
        page: startPage + 5,
      }));
    }
  };
  return { onClickPage, onClickPrevPage, onClickNextPage, startPage };
}
