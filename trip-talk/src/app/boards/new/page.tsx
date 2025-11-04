"use client";
import { withAuth } from "@/commons/hocs/withAuth";
import BoardWrite from "@/components/boards-write";

export default withAuth(function BoardNew() {
  return (
    <div className="w-full max-w-3xl">
      <BoardWrite 수정_등록={false} />
    </div>
  );
});
