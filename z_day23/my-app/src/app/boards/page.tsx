"use client";

import { useState } from "react";
import BoardList from "@/components/boards-list/list";
import Pagination from "@/components/boards-list/pagination";
import { useBoardList } from "@/components/boards-list/list/hook";

export default function BoardsPage() {
  const [startPage, setStartPage] = useState(1);
  const {
    data,
    loading,
    error,
    onClickTitle,
    onClickDelete,
    formatDate,
    refetch,
    currentPage,
    setCurrentPage,
    lastPage,
  } = useBoardList();

  const onClickPage = (page: number) => {
    setCurrentPage(page);
    refetch({ page });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setCurrentPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setCurrentPage(startPage + 10);
      refetch({ page: startPage + 10 });
    }
  };

  return (
    <>
      <BoardList
        data={data}
        loading={loading}
        error={error}
        currentPage={currentPage}
        onClickTitle={onClickTitle}
        onClickDelete={onClickDelete}
        formatDate={formatDate}
      />

      <div
        className="paginationWrapper"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          startPage={startPage}
          onClickPage={onClickPage}
          onClickPrevPage={onClickPrevPage}
          onClickNextPage={onClickNextPage}
        />
      </div>
    </>
  );
}
