"use client";

import BoardsPageComponent from "../components/boards-list/list";
import PaginationComponent from "../components/boards-list/pagination";

export default function BoardsPage() {
  return (
    <>
      <BoardsPageComponent />
      <PaginationComponent />
    </>
  );
}
