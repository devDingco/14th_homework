"use client";

import BoardsWrite from "@/components/boards-write";
import { useParams } from "next/navigation";

export default function BoardsEditPage() {
  const params = useParams();
  const boardId = String(params.boardId);

  return <BoardsWrite isEdit={true} boardId={boardId} />;
}
