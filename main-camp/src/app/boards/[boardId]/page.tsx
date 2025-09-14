"use client"

import BoardsCommentList from "@/components/boards-detail/comment-list"
import BoardsCommentWrite from "@/components/boards-detail/comment-write"
import BoardsDetail from "@/components/boards-detail/detail"

// TODO - 댓글 만들기!!!!!!!!

const BoardsDetailPage = () => {
    return (
        <div id="main" style={{
            maxWidth: "1280px",
            minWidth: "781px",
            marginLeft: "320px",
            marginRight: "320px"
        }}>
            <BoardsDetail />
            <BoardsCommentWrite />
            <BoardsCommentList />
        </div>
    )
}

export default BoardsDetailPage