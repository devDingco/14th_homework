"use client";

import { useParams } from "next/navigation";
import BoardsWrite from "@/components/boards-write";

export default function BoardEditPage() {
  const { boardId } = useParams() as { boardId: string };

  return <BoardsWrite isEdit={true} boardId={boardId} />;
}