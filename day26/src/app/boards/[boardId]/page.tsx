"use client"

import BoardDetail from "@/components/boards-detail/detail";
import CommentList from "@/components/boards-detail/comment-list"
import CommentWrite from "@/components/boards-detail/comment-write"

export default  function BoardsDetailPage() {
    return (
        <>
        <BoardDetail />
         {/* 댓글 작성 컴포넌트 추가 */}
        <CommentWrite />
        {/* 댓글 목록 컴포넌트 추가 */}
        <CommentList />

        </>
    );
}