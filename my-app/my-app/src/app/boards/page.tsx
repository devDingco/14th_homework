"use client";

import BannerList from "@/commons/layout/banner";
import Navigation from "@/commons/layout/navigation";
import BoardList from "@/components/boards-list/list";

export default function BoardsPage() {
  return (
    <>
      <Navigation />
      <BannerList />
      <BoardList />
    </>
  );
}
