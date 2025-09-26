"use client"

import styles from './styles.module.css'
import useFetchBoard from "@/commons/api/query/useFetchBoard"
import useFetchBoardComments from "@/commons/api/query/useFetchBoardComments"
import { FetchBoardCommentsQuery, FetchBoardQuery } from "@/commons/gql/graphql"
import BoardsCommentList from "@/components/boards-detail/comment-list"
import BoardsCommentWrite from "@/components/boards-detail/comment-write"
import BoardsDetail from "@/components/boards-detail/detail"
import { useParams } from "next/navigation"
import { useEffect } from 'react'
import { useIsBoardDetail } from '@/commons/provider/isBoardDetailProvider'

export interface IBoardDetailData {
    getBoard: FetchBoardQuery["fetchBoard"] | undefined,
    getBoardComments: FetchBoardCommentsQuery["fetchBoardComments"] | undefined
}

const BoardsDetailPage = () => {
    const param = useParams()

    const { isCommentEdit, commentInput, setCommentInput, setCommentErr } = useIsBoardDetail()

    const { boardDetail } = useFetchBoard(String(param.boardId))
    const { boardComments, boardCommentsFetchMore } = useFetchBoardComments({boardId: param.boardId})

    useEffect(()=>{
        setCommentInput({
            writer: "",
            contents: "",
            password: "",
            rating: 1,
        })
        setCommentErr({
            commentWriterErr: "",
            commentPasswordErr: "",
            commentContentsErr: ""
        })
    },[isCommentEdit.isUpdate])
    
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
                    gap: "40px",
                    opacity: "1"
                }}>
                    <div id="comment_write" className={`${styles.comment_write_container} flex_column flex_justi_sb`}>
                        <div className={`${styles.comment_icon} flex_row`}>
                            <img src="/svg/chat.png" alt="comment"></img>
                            <p className='sb_16_20'>댓글</p>
                        </div>
                        {
                            isCommentEdit.isUpdate
                            ? <></>
                            : <BoardsCommentWrite />
                        }
                    </div>
                    <BoardsCommentList boardComments={boardComments} boardCommentsFetchMore={boardCommentsFetchMore} />
                </div>
            </div>
        
    )
}

export default BoardsDetailPage