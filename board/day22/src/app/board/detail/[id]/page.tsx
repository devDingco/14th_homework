"use client"

import CommentListPage from "@/components/boards-detail/comment-list"
import CommentWritePage from "@/components/boards-detail/comment-write"
import BoardsDetail from "@/components/boards-detail/detail"




const BoardDetail = () => {


    return (
        <>
            <BoardsDetail />
            <CommentWritePage />
            <CommentListPage/>
        </>
    )

}

export default BoardDetail