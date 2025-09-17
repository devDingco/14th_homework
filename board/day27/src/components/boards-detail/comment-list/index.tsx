"use client"

import style from "./style.module.css"
import useCommentListPage from "./hooks";
import { Rate } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { gql, useQuery } from "@apollo/client";
import CommentItem from "../comment-list-item";




export default function CommentListPage() {
    const {data, fetchMore} = useCommentListPage()
    const [hasMore, setHasMore] = useState(true);


    const onNext = () => {
        console.log("11")
        if (data === undefined) return;
        fetchMore({
            variables: {
                page: Math.ceil((data?.fetchBoardComments.length ?? 10 ) / 10) + 1},
            updateQuery: (prev, {fetchMoreResult}) => {
                if(!fetchMoreResult?.fetchBoardComments?.length){
                    setHasMore(false);
                    return ;
                }return{
                    fetchBoardComments: [...prev.fetchBoardComments, ...fetchMoreResult.fetchBoardComments]
                }
            }
        })
    }

    return (
        <>
        <InfiniteScroll
            next={onNext}
            hasMore={hasMore}
            dataLength={data?.fetchBoardComments.length ?? 0}
            loader={<div>로딩중...</div>}
        >
            {data?.fetchBoardComments.map((el) => (
                <CommentItem key={el._id} el={el}/>

            ))
            }
            </InfiniteScroll>
        </>
    )





}