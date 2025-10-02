"use client";
import BoardWrite from "@/components/boards-write";

export default function BoardNew() {
  return (
    <div className="w-full max-w-3xl">
      <BoardWrite 수정_등록={false} />
    </div>
  );
}
