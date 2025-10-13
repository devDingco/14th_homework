"use client";

import BoardList from "@/components/board-list/list";
import BoardBanner from "@/components/board-list/banner";

export default function BoardListPage() {
  return (
    <>
      <BoardBanner />
      <BoardList />
    </>
  );
}
