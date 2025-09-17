"use client";

import useBoardPage from "../components/boards-list/hook";
import BoardsPageComponent from "../components/boards-list/list";
import PaginationComponent from "../components/boards-list/pagination";

export default function BoardsPage() {
  const boardPage = useBoardPage();
  return (
    <>
      <BoardsPageComponent {...boardPage} />
      <PaginationComponent {...boardPage} />
    </>
  );
}
