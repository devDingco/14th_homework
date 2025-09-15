"use client";
import BoardsListPage from "@/components/boards-list/list";
import CarouselPage from "@/components/boards-list/banner";

export default function BoardsPage() {
  return (
    <>
      <CarouselPage />
      <BoardsListPage />
    </>
  );
}
