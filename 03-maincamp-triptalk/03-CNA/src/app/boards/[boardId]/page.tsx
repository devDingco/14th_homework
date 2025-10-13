"use client"

import BoardsDetail from "@/components/boards-detail/detail";
import CommentWrite from "@/components/boards-detail/comment-write";
import CommentList from "@/components/boards-detail/comment-list";

export default function BoardsDetailPage() {
  return (
    <>
      <BoardsDetail />
      <CommentWrite />
      <CommentList />
    </>
  );
}