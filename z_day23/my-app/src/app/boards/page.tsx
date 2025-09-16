"use client";

import BoardsListBanner from "@/components/boards-list/banner";
import BoardList from "@/components/boards-list/list";

export default function BoardsPage() {
  return (
    <>
      <BoardsListBanner />
      <BoardList />
    </>
  );
}
