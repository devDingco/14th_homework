"use client";

import { useParams } from "next/navigation";
import Layout from "@/commons/layout";
import BoardsDetail from "@/components/boards-detail/detail";
import CommentWrite from "@/components/boards-detail/comment-write";
import CommentList from "@/components/boards-detail/comment-list";

export default function BoardsDetailPage() {
  const { boardId } = useParams() as { boardId: string };
  return (
    <Layout>
      <BoardsDetail boardId={boardId} />
      <CommentWrite
        boardId={boardId}
        boardCommentId=""
        isEdit={false}
      />
      <CommentList boardId={boardId} />
    </Layout>
  );
}