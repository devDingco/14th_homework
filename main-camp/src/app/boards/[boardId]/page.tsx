"use client"

import { Query } from "@/commons/gql/graphql"
import BoardsCommentList from "@/components/boards-detail/comment-list"
import useBoardCommentList from "@/components/boards-detail/comment-list/hook"
import BoardsCommentWrite from "@/components/boards-detail/comment-write"
import BoardsDetail from "@/components/boards-detail/detail"
import { useState } from "react"

// TODO - 댓글 만들기!!!!!!!!

const BoardsDetailPage = () => {
    const [ comments, setComments ] = useState<Query["fetchBoardComments"]>([])

    const { getBoardComments } = useBoardCommentList({setComments})
    
    return (
        <div id="main" style={{
            maxWidth: "1280px",
            minWidth: "781px",
            marginLeft: "320px",
            marginRight: "320px"
        }}>
            <BoardsDetail />
            <div style={{
                width: "1280px",
                height: "460px",
                gap: "40px",
                opacity: "1"
            }}>
                <BoardsCommentWrite getBoardComments={getBoardComments} comments={comments} />
                <BoardsCommentList getBoardComments={getBoardComments} comments={comments} />
            </div>
        </div>
    )
}

export default BoardsDetailPage