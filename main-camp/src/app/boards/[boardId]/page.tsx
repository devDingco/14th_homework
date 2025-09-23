"use client"

import useFetchBoard from "@/commons/api/useFetchBoard"
import useFetchBoardComments from "@/commons/api/useFetchBoardComments"
import { FetchBoardCommentsQuery, FetchBoardQuery, Query } from "@/commons/gql/graphql"
import BoardsCommentList from "@/components/boards-detail/comment-list"
import BoardsCommentWrite from "@/components/boards-detail/comment-write"
import BoardsDetail from "@/components/boards-detail/detail"
import { useParams } from "next/navigation"
import { useState } from "react"

export interface IBoardDetailData {
    getBoard: FetchBoardQuery["fetchBoard"] | undefined,
    getBoardComments: FetchBoardCommentsQuery["fetchBoardComments"] | undefined
}

const BoardsDetailPage = () => {
    const param = useParams()
    const [boardDetailData, setBoardDetailData] = useState<IBoardDetailData>()

    const { boardDetail, boardLoading, boardError, boardRefetch } = useFetchBoard({boardId: param.boardId})
    const { boardComments, boardCommentsLoading, boardCommentsError, boardCommentsRefetch } = useFetchBoardComments({boardId: param.boardId})

    return (
        <div id="main" style={{
            maxWidth: "1280px",
            minWidth: "781px",
            marginLeft: "320px",
            marginRight: "320px"
        }}>
            <BoardsDetail 
                boardDetail={boardDetail}
            />
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "1280px",
                minHeight: "460px",
                gap: "40px",
                opacity: "1"
            }}>
                <BoardsCommentWrite />
                <BoardsCommentList boardComments={boardComments}/>
            </div>
        </div>
    )
}

export default BoardsDetailPage