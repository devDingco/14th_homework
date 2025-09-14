"use client";

import { useParams } from "next/navigation";
import BoardsDetail from "@/components/boards-detail/detail";
import CommentWrite from "@/components/boards-detail/comment-write";
import CommentList from "@/components/boards-detail/comment-list";

export default function BoardsDetailPage() {
  const { boardId } = useParams() as { boardId: string };
  return (
    <>
      <BoardsDetail boardId={boardId} />
      <CommentWrite boardId={boardId} />
      <CommentList boardId={boardId} />
    </>
  );
}
