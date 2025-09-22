"use client"

import useFetchBoard from "@/commons/api/useFetchBoard"
import { FetchBoardCommentsQuery, FetchBoardQuery, Query } from "@/commons/gql/graphql"
import BoardsCommentList from "@/components/boards-detail/comment-list"
import useBoardCommentList from "@/components/boards-detail/comment-list/hook"
import BoardsCommentWrite from "@/components/boards-detail/comment-write"
import BoardsDetail from "@/components/boards-detail/detail"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export interface IBoardDetailData {
    getBoard: FetchBoardQuery | undefined,
    getBoardComment: FetchBoardCommentsQuery | undefined
}

const BoardsDetailPage = () => {
    const param = useParams()
    const [ comments, setComments ] = useState<Query["fetchBoardComments"]>([])

    const { board, loading, error, refetch } = useFetchBoard({boardId: param.boardId})
    console.log('상세페이지 진입', board, error)

    const { getBoardComments } = useBoardCommentList({setComments})

    const [boardDetailData, setBoardDetailData] = useState<IBoardDetailData>()

    useEffect(()=>{
        (async()=>{
            const comments = await getBoardComments()
            setBoardDetailData({getBoard: board, getBoardComment: comments})
        })()
    },[board])

    return (
        <div id="main" style={{
            maxWidth: "1280px",
            minWidth: "781px",
            marginLeft: "320px",
            marginRight: "320px"
        }}>
            <BoardsDetail 
                // getBoardComments={getBoardComments}
                setComments={setComments}
                boardDetailData={boardDetailData}
            />
            <div style={{
                display: "flex",
                flexDirection: "column",
                width: "1280px",
                minHeight: "460px",
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