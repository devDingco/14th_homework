"use client";

import BoardsWrite from "@/components/boards-write";
import { useParams } from "next/navigation";
import React from "react";

/**
 * 게시글 수정 페이지
 * URL에서 게시글 ID를 받아와 BoardsWrite 컴포넌트를 수정 모드로 렌더링
 */
export default function BoardsEditPage() {
  // useParams를 사용하여 URL에서 boardId를 가져옵니다.
  const { boardId } = useParams<{ boardId: string }>();

  return <BoardsWrite isEdit={true} boardId={boardId} />;
}
