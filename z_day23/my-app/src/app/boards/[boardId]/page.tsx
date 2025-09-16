"use client";

import BoardsDetail from "@/components/boards-detail/detail";
import CommentWrite from "@/components/boards-detail/comment-write";
import CommentList from "@/components/boards-detail/comment-list";
import { useParams } from "next/navigation";

export default function BoardsDetailPage() {
  const params = useParams();
  const boardId = params.boardId;

  if (!boardId) {
    return <div>게시글 ID를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <BoardsDetail />
      <CommentWrite boardId={String(boardId)} />
      <CommentList boardId={String(boardId)} />
    </>
  );
}
