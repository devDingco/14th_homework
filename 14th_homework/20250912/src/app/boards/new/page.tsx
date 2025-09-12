"use client";

import BoardsWrite from "@/components/boards-write/";
import React from "react";

/**
 * 게시글 등록 페이지
 * 모든 작성 관련 로직은 BoardsWrite 컴포넌트에서 처리
 */
export default function BoardsNewPage() {
  return (
    <BoardsWrite isEdit={false} />
  );
}
