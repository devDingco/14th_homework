"use client";

import { useParams } from "next/navigation";
import BoardsDetail from "@/components/boards-detail";

export default function BoardsDetailPage() {
  const { boardId } = useParams() as { boardId: string };
  return <BoardsDetail boardId={boardId} />;
}
