"use client";

import BoardWrite from "@/app/commons/components/boards-write";

// $author: String, $title: String, $content: String
export default function NewPage() {
  return <BoardWrite isEdit={false} />;
}
