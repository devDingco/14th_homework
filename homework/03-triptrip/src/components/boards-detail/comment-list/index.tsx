"use client"

import useBoardCommentList from "./hook"
import styles from "./style.module.css"
import BoardCommentListItem from "../comment-list-item"
import InfiniteScroll from "react-infinite-scroll-component"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { FETCH_BOARD_COMMENTS } from "./queries"
import { IFetchBoardComments } from "./types"


interface IProps {
    boardId: string
}

export default function BoardCommentList({ boardId }: IProps) {
    const [ hasMore, setHasMore ] = useState(true)
    const { data, fetchMore } = useQuery<IFetchBoardComments>(FETCH_BOARD_COMMENTS, {
        variables: { boardId, page: 1 },
    })

    const onNext = () => {
        if(data === undefined) return
        
        fetchMore({
            variables: { boardId, page: Math.ceil(data.fetchBoardComments.length / 10) + 1 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult?.fetchBoardComments?.length) {
                    setHasMore(false)
                    return
                }

                return {
                    fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments]
                }
            }
        })
    }

    return (
        <div className={styles.layout}>
                <InfiniteScroll
                    dataLength={data?.fetchBoardComments.length ?? 0}
                    next={onNext}
                    hasMore={hasMore}
                    loader={<div>댓글을 불러오는 중...</div>}
                >

            {data?.fetchBoardComments?.map((el) => (
                // ✅ 분리된 컴포넌트 사용
                 <BoardCommentListItem key={el._id} el={el} />                
            ))}
            </InfiniteScroll>
        </div>
    )
}