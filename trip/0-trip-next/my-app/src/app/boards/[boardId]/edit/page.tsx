"use client";

import BoardWrite from "@/components/boards-write";

export default function BoardComponentEditPage({ params }: { params: { boardId: string } }) {
  return <BoardWrite isEdit={true} boardId={params.boardId} />;
}
