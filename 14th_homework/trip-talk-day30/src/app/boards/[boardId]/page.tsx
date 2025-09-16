"use client";
import CommentList from "@/components/boards-detail/comment-list";
import CommentWrite from "@/components/boards-detail/comment-write";
import BoardDetail from "@/components/boards-detail/detail";

export default function BoardsDetailPage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <BoardDetail />
      <CommentWrite />
      <CommentList />
    </div>
  );
}
